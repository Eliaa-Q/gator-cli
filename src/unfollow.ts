
import { createUser, getUser } from "./lib/db/queries/users.js";
import { getFeedByUrl } from "./lib/db/queries/feeds.js";
import { deleteFeedFollow } from "./lib/db/queries/feed_follows.js";
import { User } from "./lib/db/schema.js";

import { eq } from "drizzle-orm";
// Register command handler
export async function handlerUnfollow(cmdName: string,user:User, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("url is required.");
  }

  const url = args[0];
const feed = await getFeedByUrl(url);
  if (!feed) {
    throw new Error("Feed for url not found.");
  }
const userId = user.id;
  const result = await deleteFeedFollow(userId, feed.id);
if (!result){
    throw new Error("Error Deleting");
  }
  console.log(`unfollowed feed `);
}
