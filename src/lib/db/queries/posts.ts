import { db } from "..";
import { posts,feed_follows } from "../schema";
import { eq, desc } from "drizzle-orm";

export async function createPost(post: {
  title: string;
  url: string;
  description?: string | null;
  publishedAt?: Date | null;
  feedId: string;
}) {
  const [result] = await db.insert(posts).values(post).returning();
  return result;
}
export async function getPostsForUser(userId: string, limit: number) {
  return db
    .select({
      title: posts.title,
      url: posts.url,
    })
    .from(posts)
    .innerJoin(feed_follows, eq(posts.feedId, feed_follows.feedId))
    .where(eq(feed_follows.userId, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
}
