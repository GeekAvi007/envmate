import fs from "fs";
import { p, fileExists, readEnvFile } from "../utils.js";

export async function validateCommand() {
  const schemaPath = p("envschema.json");
  if (!fileExists(schemaPath)) {
    console.warn("! No envschema.json found. Run `envbuddy init` to create one.");
    process.exit(0);
  }

  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
  const env = readEnvFile(p(".env"));

  let ok = true;
  // Required present?
  for (const key of schema.required || []) {
    if (!env[key] || String(env[key]).trim() === "") {
      ok = false;
      console.error(`✖ Missing required key: ${key}`);
      const hint = schema.descriptions?.[key];
      if (hint) console.error(`  hint: ${hint}`);
    }
  }

  // Types
  for (const [k, t] of Object.entries(schema.types || {})) {
    const val = env[k];
    if (val == null) continue;
    if (t === "number" && Number.isNaN(Number(val))) {
      ok = false;
      console.error(`✖ ${k} should be a number (got "${val}")`);
    }
  }

  if (ok) {
    console.log("✔ .env looks good ✅");
    process.exit(0);
  } else {
    console.error("\nFix the above issues and run `envbuddy validate` again.");
    process.exit(2);
  }
}