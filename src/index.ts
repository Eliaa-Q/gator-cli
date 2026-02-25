import { runCommand } from "./commands.js";
import { createRegistry } from "./registry.js";

async function main() {
  const registry = createRegistry();

  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Not enough arguments provided.");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);

  try {
   await runCommand(registry, cmdName, ...cmdArgs);
process.exit(0);
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
}

main();
