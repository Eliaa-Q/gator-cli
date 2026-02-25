// src/commands/aggregate.ts

import { fetchFeed } from "./lib/rss.js";

import { getNextFeedToFetch, markFeedFetched } from "./lib/db/queries/feeds.js";
import { createPost } from "./lib/db/queries/posts.js";
 async function scrapeFeeds() {
  const feed = await getNextFeedToFetch();

  if (!feed) {
    console.log("No feeds found.");
    return;
  }

  console.log(`Fetching feed: ${feed.name}`);

  await markFeedFetched(feed.id);

  const feedData = await fetchFeed(feed.url);

  for (const item of feedData.channel.item) {
  const published = item.pubDate ? new Date(item.pubDate) : null;

  await createPost({
    title: item.title,
    url: item.link,
    description: item.description,
    publishedAt: published && !isNaN(published.getTime()) ? published : null,
    feedId: feed.id,
  });

  console.log(`Saved post: ${item.title}`);
}
}
 function parseDuration(durationStr: string): number {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);

  if (!match) {
    throw new Error("Invalid duration format");
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "ms": return value;
    case "s": return value * 1000;
    case "m": return value * 60 * 1000;
    case "h": return value * 60 * 60 * 1000;
    default: throw new Error("Invalid duration unit");
  }
}
export async function handlerAggregate(cmdName: string, ...args: string[]) {
     if (args.length !== 1) {
    throw new Error("Time between requests is required.");
  }

  const timeBetweenRequests = parseDuration(args[0]);

  console.log(`Collecting feeds every ${args[0]}`);

  await scrapeFeeds().catch(handleError);

  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, timeBetweenRequests);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
}
function handleError(err: unknown) {
  console.error("Error scraping feeds:", err);
}
