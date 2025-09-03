import fs from "fs";
import { p, fileExists } from "../utils.js";

export async function switchCommand(args) {
  const envName = args[0];
  if (!envName) {
    console.error("Usage: envbuddy switch <environment>");
    process.exit(1);
  }

  const src = p(`.env.${envName}`);
  if (!fileExists(src)) {
    console.error(`✖ ${src} not found. Create it first.`);
    process.exit(1);
  }

  fs.copyFileSync(src, p(".env"));
  console.log(`✔ Switched to ${envName} (.env <- .env.${envName})`);
}