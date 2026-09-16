import { XMLParser } from "fast-xml-parser";

import { RSSFeed, RSSItem } from "./types.js";

export const fetchFeed = async (
    feedURL: string
): Promise<RSSFeed> => {
    const response = await fetch(feedURL, {
        headers: {
            "User-Agent": "gator",
        },
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch feed: ${response.status} ${response.statusText}`
        );
    }

    const text = await response.text();

    const parser = new XMLParser({
        processEntities: false,
    });

    const parsed = parser.parse(text);

    if (!parsed?.rss?.channel) {
        throw new Error("Invalid RSS feed: missing channel");
    }

    const { title, link, description, item } = parsed.rss.channel;

    if (
        typeof title !== "string" ||
        typeof link !== "string" ||
        typeof description !== "string"
    ) {
        throw new Error("Invalid RSS feed: missing channel metadata");
    }

    const rawItems = item
        ? Array.isArray(item)
            ? item
            : [item]
        : [];

    const items: RSSItem[] = [];

    for (const rawItem of rawItems) {
        if (
            typeof rawItem.title !== "string" ||
            typeof rawItem.link !== "string" ||
            typeof rawItem.description !== "string" ||
            typeof rawItem.pubDate !== "string"
        ) {
            continue;
        }

        items.push({
            title: rawItem.title,
            link: rawItem.link,
            description: rawItem.description,
            pubDate: rawItem.pubDate,
        });
    }

    return {
        channel: {
            title,
            link,
            description,
            item: items,
        },
    };
};