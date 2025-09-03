# envmate-cli

[![npm version](https://img.shields.io/npm/v/envmate-cli.svg?logo=npm&style=flat-square)](https://www.npmjs.com/package/envmate-cli)
[![npm downloads](https://img.shields.io/npm/dm/envmate-cli.svg?style=flat-square)](https://www.npmjs.com/package/envmate-cli)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
![node-current](https://img.shields.io/badge/node-%3E%3D18-green?style=flat-square&logo=node.js)
![Made with Love](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20in-India-orange?style=flat-square)

> ⚡️ A simple and powerful CLI to create, manage, and validate `.env` files for your projects.

---

## 📖 Table of Contents

- [Installation](#-installation)
- [Usage](#-usage)
- [Commands](#-commands)
- [Examples](#-examples)
- [Project Structure](#-project-structure)
- [Why envmate?](#-why-envmate)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Installation

```bash
# Using npm
npm install -g envmate-cli

# Or with Yarn
yarn global add envmate-cli


📦 Usage

Run the CLI with:
envmate <command> [options]

🛠 Commands -> <command>

init → Initialize a new .env setup with schema support.

generate → Generate .env files from schema or templates.

switch → Switch between multiple .env environments (development, production, etc.).

validate → Validate existing .env files against the schema.

guard → Ensure required environment variables exist before running your app.


⚡ Examples

Initialize environment setup:
envmate init
Creates:

.env.example

envschema.json

Generate a .env file from schema:
envmate generate

Switch environments:
envmate switch

Validate environment variables:
envmate validate

Guard environment before running app:
envmate guard -- node server.js
Ensures all required environment variables exist before starting.


📂 Project Structure (Generated)
.env
.env.example
.env.development
.env.production
envschema.json

🔑 Why envmate?

✅ Prevents missing or invalid environment variables

✅ Smoothly switch between environments

✅ Simple schema-based validation

✅ Zero-config setup




🤝 Contributing

Fork this repo

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add feature')

Push to your branch (git push origin feature-name)

Open a Pull Request 🚀

📜 License

MIT © Avishek Mukherjee



