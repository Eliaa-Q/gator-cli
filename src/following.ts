
import { getUser } from "./lib/db/queries/users.js";
import { getFeedFollowsForUser} from "./lib/db/queries/feed_follows.js";
// Register command handler
export async function handlerFollowing(cmdName: string,user:User) {
 
const result = await getFeedFollowsForUser(user.id); 
if (!result) {
  throw new Error("Error fetching feeds");
}
  for (const userFeed of result) {
    
      console.log(`* ${userFeed.feedName}`);
    } 
  
}



