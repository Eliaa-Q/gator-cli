// src/lib/rss.ts

import { XMLParser } from "fast-xml-parser";

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const res = await fetch(feedURL, {
    headers: {
      "User-Agent": "gator",
    },
  });

  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    parseTagValue: true,
  });

  const parsed = parser.parse(xml);

  if (!parsed?.rss?.channel) {
    throw new Error("Invalid RSS feed: missing channel");
  }

  const channel = parsed.rss.channel;

  const title = channel.title;
  const link = channel.link;
  const description = channel.description;

  if (!title || !link || !description) {
    throw new Error("Invalid RSS feed: missing channel metadata");
  }

  let items: RSSItem[] = [];

  if (channel.item) {
    const rawItems = Array.isArray(channel.item)
      ? channel.item
      : [channel.item];

    items = rawItems
      .map((item: any) => {
        if (!item.title || !item.link || !item.description || !item.pubDate) {
          return null;
        }

        return {
          title: item.title,
          link: item.link,
          description: item.description,
          pubDate: item.pubDate,
        };
      })
      .filter((i): i is RSSItem => i !== null);
  }

  return {
    channel: {
      title,
      link,
      description,
      item: items,
    },
  };
}
