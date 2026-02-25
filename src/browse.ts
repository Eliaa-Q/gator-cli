  import { readConfig } from "./config.js";
import { getUser } from "./lib/db/queries/users.js";
import {  getPostsForUser } from "./lib/db/queries/posts.js";
export async function handlerBrowse(cmdName: string, ...args: string[]) {
  const limit = args.length ? parseInt(args[0]) : 2;

  const config = readConfig();
  const user = await getUser(config.currentUserName);

  const posts = await getPostsForUser(user.id, limit);

  for (const post of posts) {
    console.log(`* ${post.title}`);
    console.log(`  ${post.url}`);
  }
}
