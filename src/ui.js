const inquirer = require("inquirer");
const { initEnv } = require("./commands/init");
const { generateSecret } = require("./commands/generate");
const { validateEnv } = require("./commands/validate");
const { switchEnv } = require("./commands/switch");
const { guardEnv } = require("./commands/guard");

async function runUI() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        "Init project",
        "Generate secret",
        "Validate env",
        "Switch environment",
        "Guard env"
      ]
    }
  ]);

  if (action === "Init project") initEnv();
  if (action === "Generate secret") {
    const { key, length } = await inquirer.prompt([
      { type: "input", name: "key", message: "Enter key name:" },
      { type: "number", name: "length", message: "Length of secret:", default: 32 }
    ]);
    generateSecret(key, length);
  }
  if (action === "Validate env") validateEnv();
  if (action === "Switch environment") {
    const { env } = await inquirer.prompt([
      { type: "input", name: "env", message: "Enter environment (development/production):" }
    ]);
    switchEnv(env);
  }
  if (action === "Guard env") guardEnv();
}

runUI();