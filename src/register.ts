import { setUser } from "./config.js";
import { createUser, getUser } from "./lib/db/queries/users.js";

// Register command handler
export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("Username is required.");
  }

  const username = args[0];

  if (await getUser(username)) {
    throw new Error("User already exists.");
  }

  const result = await createUser(username);

  console.log(result);

  setUser(username);

  console.log(`User ${username} is created`);
}
