import { readConfig } from "./config.js";
import { getUsers } from "./lib/db/queries/users.js";

// Register command handler
export async function handlerList(cmdName: string) {
  const result = await getUsers();

  if (!result) {
    throw new Error("Error fetching users");
  }

  const config = readConfig();

  for (const user of result) {
    if (config.currentUserName === user.name) {
      console.log(`* ${user.name} (current)`);
    } else {
      console.log(`* ${user.name}`);
    }
  }
}
