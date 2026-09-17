import {
    getNextFeedToFetch,
    markFeedFetched,
} from "./db/queries/feeds.js";
import { fetchFeed } from "./rrs/index.js";

export const scrapeFeeds = async () => {
    const feed = await getNextFeedToFetch();

    if (!feed) {
        throw new Error("No feeds available to fetch");
    }

    console.log(`Fetching feed: ${feed.name} (${feed.url})`);

    const rssFeed = await fetchFeed(feed.url);

    await markFeedFetched(feed.id);

    for (const item of rssFeed.channel.item) {
        console.log(`* ${item.title}`);
    }
};