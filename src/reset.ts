
import { deleteUsers } from "./lib/db/queries/reset.js";

// Login command handler
export async function handlerReset(cmdName: string){


   await deleteUsers();

  console.log(`Database reset`);}


