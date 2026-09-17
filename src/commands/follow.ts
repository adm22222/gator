import { readConfig } from "../config.js";
import {
    createFeedFollow,
    getFeedbyURL,
} from "../db/queries/feeds.js";
import { getUserByName } from "../db/queries/users.js";

export const handlerFollow = async (
    cmdName: string,
    ...args: string[]
) => {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <url>`);
    }
    const [url] = args;
    const config = readConfig();
    if (!config.currentUserName) {
        throw new Error("No current user set. Please login first.");
    }
    const user = await getUserByName(
        config.currentUserName
    );
    if (!user) {
        throw new Error(`User ${config.currentUserName} not found`);
    }
    const feed = await getFeedbyURL(url);
    if (!feed) {
        throw new Error(`Feed with URL ${url} not found`);
    }

    const feedFollow = await createFeedFollow(user.id, feed.id);

    console.log(`${feedFollow.userName} is now following ${feedFollow.feedName}`);
};