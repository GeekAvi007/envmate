import fs from "fs";
import { p, fileExists, writeFileSafe } from "../utils.js";

export async function initCommand() {
  // 1) .env
  if (!fileExists(p(".env"))) {
    writeFileSafe(p(".env"), "# Your environment variables\n");
    console.log("✔ Created .env");
  } else {
    console.log("• .env already exists");
  }

  // 2) .env.example
  if (!fileExists(p(".env.example"))) {
    const example = `# Example env file (no secrets!)
# Copy values here without real secrets so others know what to set.
# For example:
# PORT=3000
# DATABASE_URL=postgres://user:pass@host:5432/dbname
# JWT_SECRET=your-secret-here
`;
    writeFileSafe(p(".env.example"), example);
    console.log("✔ Created .env.example");
  } else {
    console.log("• .env.example already exists");
  }

  // 3) .gitignore
  const gi = p(".gitignore");
  let giContent = fileExists(gi) ? fs.readFileSync(gi, "utf-8") : "";
  const needed = [
    ".env",
    ".env.*",
    "!.env.example"  // allow example file
  ];
  let changed = false;
  for (const line of needed) {
    if (!giContent.split(/\r?\n/).includes(line)) {
      giContent += (giContent.endsWith("\n") ? "" : "\n") + line + "\n";
      changed = true;
    }
  }
  if (changed) {
    writeFileSafe(gi, giContent);
    console.log("✔ Updated .gitignore to ignore .env files (but keep .env.example)");
  } else {
    console.log("• .gitignore already ignores .env files");
  }

  // 4) envschema.json
  const schemaPath = p("envschema.json");
  if (!fileExists(schemaPath)) {
    const schema = {
      "$schema": "https://example/envbuddy.schema.json",
      "environments": ["development", "production"],
      "required": ["PORT"],
      "optional": ["DATABASE_URL", "JWT_SECRET"],
      "descriptions": {
        "PORT": "Server port (number)",
        "DATABASE_URL": "Database connection string",
        "JWT_SECRET": "Secret used to sign tokens"
      },
      "defaults": { "PORT": "3000" },
      "types": { "PORT": "number" }
    };
    writeFileSafe(schemaPath, JSON.stringify(schema, null, 2) + "\n");
    console.log("✔ Created envschema.json");
  } else {
    console.log("• envschema.json already exists");
  }
}