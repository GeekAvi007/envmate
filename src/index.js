import { initCommand } from "./commands/init.js";
import { generateCommand } from "./commands/generate.js";
import { validateCommand } from "./commands/validate.js";
import { switchCommand } from "./commands/switch.js";
import { guardCommand } from "./commands/guard.js";

const [,, cmd, ...args] = process.argv;

const table = {
  init: initCommand,
  generate: generateCommand,
  validate: validateCommand,
  switch: switchCommand,
  guard: guardCommand,
  help: () => {
    console.log(`
envbuddy – .env creator & manager

Usage:
  envbuddy init
  envbuddy generate <KEY> [--length 32]
  envbuddy validate
  envbuddy switch <environment>     # e.g. development, production, staging
  envbuddy guard

Tips:
  • Keep secrets out of git.
  • Use .env.example for collaborators.
  • Define required keys in envschema.json
`);
  }
};

(async () => {
  if (!table[cmd]) return table.help();
  await table[cmd](args);
})();