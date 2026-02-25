import {and, eq } from "drizzle-orm";
import { db } from "..";
import { users,feeds,feed_follows } from "../schema";

export async function createFeedFollow(userId: string, feedId: string) {
  // Insert follow record
  const [newFeedFollow] = await db
    .insert(feed_follows)
    .values({
      userId,
      feedId,
    })
    .returning();

  // Join to get user + feed info
  const [result] = await db
    .select({
      id: feed_follows.id,
      createdAt: feed_follows.createdAt,
	updatedAt: feed_follows.updatedAt,
	userId:users.id,
	feedId:feeds.id,
      userName: users.name,
      feedName: feeds.name,
      feedUrl: feeds.url,
    })
    .from(feed_follows)
    .innerJoin(users, eq(feed_follows.userId, users.id))
    .innerJoin(feeds, eq(feed_follows.feedId, feeds.id))
    .where(eq(feed_follows.id, newFeedFollow.id));

  return result;
}

export async function getFeedFollowsForUser(userId: string) {

  // Join to get user + feed info
  const result= await db
    .select({
      id: feed_follows.id,
      createdAt: feed_follows.createdAt,
        updatedAt: feed_follows.updatedAt,
userId:users.id,
      userName: users.name,
feedId:feeds.id,
      feedName: feeds.name,
    })
    .from(feed_follows)
    .innerJoin(users, eq(feed_follows.userId, users.id))
 .innerJoin(feeds, eq(feed_follows.feedId, feeds.id))
    .where(eq(feed_follows.userId, userId));

  return result;
}

export async function deleteFeedFollow(userId, feedId){
const deleted = await db.delete(feed_follows).where(and(eq(feed_follows.userId, userId),
 eq(feed_follows.feedId, feedId))).returning();
return deleted;
}
