import { db } from "../index.js"
import { feed, Feed } from "../schema.js"





export const createFeed = async (name: string, url: string, userId: string) => {
    const [feedData] = await db.insert(feed).values({ name, url, userId }).returning();
    return feedData;
}
