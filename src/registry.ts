import { CommandsRegistry, registerCommand } from "./commands.js";
import { handlerLogin } from "./login.js";
import {handlerRegister} from "./register.js";
import {handlerReset} from "./reset.js";
import {handlerList} from "./list.js";
import {handlerAggregate} from  "./aggregate.js";
import {handlerAddFeed} from  "./add_feed.js";
import {handlerFeeds} from "./feeds.js";
import {handlerFollow} from  "./follow.js";
import {handlerFollowing} from  "./following.js";
import {handlerUnfollow} from  "./unfollow.js";
import { middlewareLoggedIn } from "./commands.js";

import {handlerBrowse} from  "./browse.js";
// Creates and returns the CLI registry
export function createRegistry(): CommandsRegistry {
  const registry: CommandsRegistry = {};

  // Map commands to handlers here
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
 registerCommand(registry, "reset", handlerReset);
 registerCommand(registry, "users", handlerList);
 registerCommand(registry, "agg", handlerAggregate);
 registerCommand(registry, "feeds", handlerFeeds); 
 registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));
registerCommand(registry, "browse", middlewareLoggedIn(handlerBrowse));
return registry;
}

