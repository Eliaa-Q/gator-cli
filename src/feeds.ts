//do not forget to add to registry 
import { readConfig } from "./config.js";
import { getUserById } from "./lib/db/queries/users.js";
import { getFeeds} from "./lib/db/queries/feeds.js";

// Register command handler
export async function handlerFeeds(cmdName: string) {
  const result = await getFeeds();

  if (result.length===0) {
    throw new Error("Error fetching feeds");
  }


  for (const feed of result) {
    const user= await getUserById(feed.userId)
  if (!user) {
    throw new Error("Error fetching user");
  }
      console.log(`* ${feed.name} : ${feed.url} by:${user.name}  `);
  }
}



