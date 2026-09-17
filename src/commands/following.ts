import { getFeedFollowsForUser } from "../db/queries/feeds.js";
import { User } from "../db/schema.js";

export const handlerFollowing = async (
    cmdName: string,
    user: User,
    ...args: string[]
) => {
    if (args.length !== 0) {
        throw new Error(`usage: ${cmdName}`);
    }


    const feedFollows = await getFeedFollowsForUser(user.id);

    for (const feedFollow of feedFollows) {
        console.log(feedFollow.feedName);
    }
};