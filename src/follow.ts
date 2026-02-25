  import { readConfig } from "./config.js";
import { createUser, getUser } from "./lib/db/queries/users.js";
import { getFeedByUrl } from "./lib/db/queries/feeds.js";
import { createFeedFollow } from "./lib/db/queries/feed_follows.js";

import { eq } from "drizzle-orm";
// Register command handler
export async function handlerFollow(cmdName: string,user:User, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("url is required.");
  }

  const url = args[0];
const feed = await getFeedByUrl(url);
  if (!feed) {
    throw new Error("Feed for url not found.");
  }

 
const userId = user.id; 
  const result = await createFeedFollow(userId, feed.id);

  console.log(`${result.userName} followed feed ${result.feedName}`);
}


