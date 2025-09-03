import fs from "fs";
import path from "path";
import { cwd } from "../utils.js";

export async function guardCommand() {
  // ensure .git exists
  const gitDir = path.join(cwd, ".git");
  if (!fs.existsSync(gitDir)) {
    console.error("✖ Not a git repository. Run `git init` first.");
    process.exit(1);
  }
  const hookPath = path.join(gitDir, "hooks", "pre-commit");
  const script = `#!/bin/sh
# envbuddy pre-commit hook
STAGED="$(git diff --cached --name-only)"
echo "$STAGED" | grep -E '^\\.env(\\..*)?$' | grep -v '^\\.env\\.example$' >/dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✖ Refusing to commit .env files. Use .env.example for sharing."
  exit 1
fi
exit 0
`;
  fs.mkdirSync(path.dirname(hookPath), { recursive: true });
  fs.writeFileSync(hookPath, script, { mode: 0o755 });
  console.log("✔ Installed pre-commit hook to block committing .env files");
}