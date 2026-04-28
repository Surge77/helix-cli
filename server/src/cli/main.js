#!/usr/bin/env node

import dotenv from "dotenv";

import chalk from "chalk";
import figlet from "figlet";

import { Command } from "commander";

import { login, logout, whoami } from "./commands/auth/login.js";
import { wakeUp } from "./commands/ai/wakeUp.js";

dotenv.config({ quiet: true });

async function main() {
  console.log(
    chalk.cyan(
      figlet.textSync("Helix", {
        font: "Standard",
        horizontalLayout: "default",
      })
    )
  );
  console.log(chalk.gray("An AI CLI with device authentication and chat modes\n"));

  const program = new Command("helix");

  program
    .version("0.0.1")
    .description("Helix CLI - AI chat and device authentication");

  program.addCommand(wakeUp);
  program.addCommand(login);
  program.addCommand(logout);
  program.addCommand(whoami);

  program.action(() => {
    program.help();
  });
  program.parse();
}

main().catch((error) => {
  console.error(chalk.red("Error running Helix CLI:"), error);
  process.exit(1);
});
