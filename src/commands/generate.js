import { p, readEnvFile, stringifyEnv, writeFileSafe, genSecret } from "../utils.js";

export async function generateCommand(args) {
  const key = args[0];
  const lengthFlagIndex = args.indexOf("--length");
  const len = lengthFlagIndex !== -1 ? parseInt(args[lengthFlagIndex + 1] || "32", 10) : 32;

  if (!key) {
    console.error("Usage: envbuddy generate <KEY> [--length 32]");
    process.exit(1);
  }

  const env = readEnvFile(p(".env"));
  env[key] = genSecret(len);
  writeFileSafe(p(".env"), stringifyEnv(env));
  console.log(`✔ Set ${key} in .env (length=${len})`);
}