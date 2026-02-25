import { readConfig } from "./config.js";
import { createFeed } from "./lib/db/queries/feeds.js";
import{ getUser} from "./lib/db/queries/users.js";
import { Feed, User } from "./lib/db/schema";
import { createFeedFollow } from "./lib/db/queries/feed_follows.js";

// Add Feed command handler
export async function handlerAddFeed(cmdName: string,user:User, ...args: string[]) {
  if (args.length !==2) {
    throw new Error("Name and URL are required.");
  }

  const name = args[0];
const url =args[1];
//should use config to get logged in user and then use create feed!!!!!!!!!!!
 

  if (!user) {
    throw new Error("User does not exists.");
  }

const feed = await createFeed(name, url, user.id);
if (!feed) throw new Error("Failed to create feed");
const feedFollow = await createFeedFollow(user.id, feed.id);

printFeed(feed,user); 
}

function printFeed (feed: Feed, user:User){
 console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* Name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}
