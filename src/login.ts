import { setUser } from "./config.js";
import { getUser } from "./lib/db/queries/users.js";

// Login command handler
export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("Username is required.");
  }

  const username = args[0];

  if (!await getUser(username)) {
    throw new Error("User does not exist.");
  }
else {
  setUser(username);

  console.log(`User set to ${username}`);
}}
