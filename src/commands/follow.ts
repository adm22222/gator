import {
    createFeedFollow,
    deleteFeedFollow,
    getFeedbyURL,
} from "../db/queries/feeds.js";
import { User } from "../db/schema.js";

export const handlerFollow = async (
    cmdName: string,
    user: User,
    ...args: string[]
) => {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }
    const [url] = args;

    const feed = await getFeedbyURL(url);
    if (!feed) {
        throw new Error(`Feed with URL ${url} not found`);
    }

    const feedFollow = await createFeedFollow(user.id, feed.id);

    console.log(`${feedFollow.userName} is now following ${feedFollow.feedName}`);
};