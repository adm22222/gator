import { CommandsRegistry, registerCommand, runCommand } from "./commands/index.js";
import { handlerLogin } from "./commands/login.js";
import { handleRegister } from "./commands/register.js";
import { handleReset } from "./commands/reset.js";

const main = async () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("No command provided");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handleRegister);
  registerCommand(registry, "reset", handleReset);

  try {
    await runCommand(registry, cmdName, ...cmdArgs);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error running command ${cmdName}: ${error.message}`);
    } else {
      console.error(`Error running command ${cmdName}: ${error}`);
    }
    process.exit(1);
  }
  process.exit(0);
};

main();