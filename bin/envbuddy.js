#!/usr/bin/env node
import("../src/index.js").catch((e) => {
  console.error("envbuddy failed:", e.message);
  process.exit(1);
});