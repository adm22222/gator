import { eq } from "drizzle-orm";
import { db } from "../index.js"
import { feed, users } from "../schema.js"


export const createFeed = async (name: string, url: string, userId: string) => {
    const [feedData] = await db.insert(feed).values({ name, url, userId }).returning();
    return feedData;
}

export const getAllFeeds = async () => {
    const feedsData = await db.select({
        id: feed.id,
        name: feed.name,
        url: feed.url,
        userId: feed.userId,
        userName: users.name,
    }).from(feed).innerJoin(users, eq(feed.userId, users.id)).execute();
    return feedsData;
}