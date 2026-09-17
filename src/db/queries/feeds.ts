import { eq } from "drizzle-orm";
import { db } from "../index.js"
import { feeds, feedFollows, users } from "../schema.js"


export const createFeed = async (name: string, url: string, userId: string) => {
    const [feedData] = await db.insert(feeds).values({ name, url, userId }).returning();
    return feedData;
}

export const getAllFeeds = async () => {
    const feedsData = await db.select({
        id: feeds.id,
        name: feeds.name,
        url: feeds.url,
        userId: feeds.userId,
        userName: users.name,
    }).from(feeds).innerJoin(users, eq(feeds.userId, users.id)).execute();
    return feedsData;
}