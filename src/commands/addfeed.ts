import { readConfig } from "../config.js";
import { createFeed } from "../db/queries/feeds.js";
import { getUserByName } from "../db/queries/users.js";



export const handlerAddFeed = async (cmdName: string, ...args: string[]) => {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <name> <url>`);
    }

    const [name, url] = args;
    const config = readConfig();
    const currentUserName = config.currentUserName;
    if (!currentUserName) {
        throw new Error("No current user set. Please login first.");
    }
    const user = await getUserByName(currentUserName);
    if (!user) {
        throw new Error(`User ${currentUserName} not found in the database.`);
    }

    const feed = await createFeed(name, url, user.id);
    console.log(`Feed created: ${feed.name} (${feed.url}) for user ${feed.userId}`);
}