import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

export const cwd = process.cwd();
export const p = (...xs) => path.join(cwd, ...xs);

export function fileExists(filepath) {
  try { fs.accessSync(filepath); return true; } catch { return false; }
}

export function readEnvFile(filepath) {
  if (!fileExists(filepath)) return {};
  const text = fs.readFileSync(filepath, "utf-8");
  return parseEnv(text);
}

export function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

export function stringifyEnv(obj) {
  const lines = Object.entries(obj).map(([k, v]) => `${k}=${escapeValue(v)}`);
  return lines.join("\n") + "\n";
}

function escapeValue(v) {
  if (v == null) return "";
  if (/[\s#"'=]/.test(String(v))) return JSON.stringify(String(v));
  return String(v);
}

export function writeFileSafe(filepath, content) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
}

export function genSecret(len = 32) {
  // URL-safe base64 without padding
  return crypto.randomBytes(Math.ceil((len * 3) / 4))
    .toString("base64")
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/,"")
    .slice(0, len);
}