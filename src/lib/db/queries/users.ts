import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";

export async function createUser(name: string) {
//we use array because drizzle returns an array as response even if it is one result 
 const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name:string){
const result = await db.select().from(users).where(eq(users.name,name));
return result[0];
}


export async function getUserById(id:string){
const result = await db.select().from(users).where(eq(users.id,id));
return result[0];
}
export async function getUsers(){

const result = await db.select().from(users);
return result;
}

