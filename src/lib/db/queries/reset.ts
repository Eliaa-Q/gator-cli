
import { db } from "..";
import { users } from "../schema";

export async function deleteUsers() {
//we use array because drizzle returns an array as response even if it is one result
  await db.delete(users);
  
}


