import { createFeed, createFeedFollow } from "../db/queries/feeds.js";
import { User } from "../db/schema.js";



export const handlerAddFeed = async (cmdName: string, user: User, ...args: string[]) => {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <name> <url>`);
    }

    const [name, url] = args;

    
    const feed = await createFeed(name, url, user.id);
    const feedFollow = await createFeedFollow(user.id, feed.id);
    console.log(`Feed created: ${feed.name} (${feed.url}) for user ${feed.userId}`);
    console.log(`${feedFollow.userName} is now following ${feedFollow.feedName}`);
}