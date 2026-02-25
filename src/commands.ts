import { getUser } from "./lib/db/queries/users.js";
import { readConfig } from "./config.js";
// Command function type
export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;
//with logged in user: 
type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;
//check if user is logged in:
export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {

return async (cmdName: string, ...args: string[]): Promise<void> => {
 
  const config = readConfig();
   const  userName=config.currentUserName;
if (!userName) {
  throw new Error("User not logged in");
}
const user = await getUser(userName);
if (!user) {
  throw new Error("User does not exist");
}
return handler(cmdName, user, ...args);
};
}


// Registry type using Record
export type CommandsRegistry = Record<string, CommandHandler>;

// Register a command
export function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler
) {
  registry[cmdName] = handler;
}

// Run a command
export async function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {
  const handler = registry[cmdName];

  if (!handler) {
    throw new Error(`Unknown command: ${cmdName}`);
  }

await  handler(cmdName, ...args);
}
