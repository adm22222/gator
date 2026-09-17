import { readConfig } from "../config.js";
import { getFeedFollowsForUser } from "../db/queries/feeds.js";
import { getUserByName } from "../db/queries/users.js";

export const handlerFollowing = async (
    cmdName: string,
    ...args: string[]
) => {
    if (args.length !== 0) {
        throw new Error(`usage: ${cmdName}`);
    }

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

    const feedFollows = await getFeedFollowsForUser(user.id);

    for (const feedFollow of feedFollows) {
        console.log(feedFollow.feedName);
    }
};