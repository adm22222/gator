import { CommandsRegistry, registerCommand, runCommand } from "./commands/index.js";
import { handlerLogin } from "./commands/login.js";

const main = () => {

  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("No command provided");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);

  try {
    runCommand(registry, cmdName, ...cmdArgs);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error running command ${cmdName}: ${error.message}`);
    } else {
      console.error(`Error running command ${cmdName}: ${error}`);
    }
    process.exit(1);
  }
}

main();