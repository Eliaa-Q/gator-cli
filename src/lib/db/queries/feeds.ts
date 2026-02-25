
import { db } from "..";
import { feeds } from "../schema";
import { eq,sql } from "drizzle-orm";
import {users} from "../schema";

export async function createFeed(name: string, url:string, userId) {
//we use array because drizzle returns an array as response even if it is one result
 const [result] = await db.insert(feeds).values({ name, url,userId }).returning();
  return result;
}


export async function getFeeds(){

const result = await db.select().from(feeds);
return result;
}


export async function getFeedByUrl(url:string){
 const result = await db.select().from(feeds).where(eq(feeds.url,url)); 
return result[0]; }


export async function markFeedFetched(feedId: string) {
  const [updated] = await db
    .update(feeds)
    .set({
      lastFetchedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(feeds.id, feedId))
    .returning();

  return updated;
}

export async function getNextFeedToFetch() {
  const [feed] = await db
    .select()
    .from(feeds)
    .orderBy(sql`${feeds.lastFetchedAt} NULLS FIRST`)
    .limit(1);

  return feed;
}
