import {
    getNextFeedToFetch,
    markFeedFetched,
} from "./db/queries/feeds.js";
import { createPost } from "./db/queries/posts.js";
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
        const publishedAt = new Date(item.pubDate);

        await createPost(
            item.title,
            item.link,
            item.description,
            Number.isNaN(publishedAt.getTime())
                ? null
                : publishedAt,
            feed.id
        );
    }
};