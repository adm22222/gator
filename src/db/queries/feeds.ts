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
export const createFeedFollow = async (userId: string, feedId: string) => {
    const [feedFollow] = await db
        .insert(feedFollows)
        .values({
            userId,
            feedId,
        })
        .returning();

    const result = await db
        .select({
            id: feedFollows.id,
            userId: feedFollows.userId,
            feedId: feedFollows.feedId,
            userName: users.name,
            feedName: feeds.name,
        })
        .from(feedFollows)
        .innerJoin(users, eq(feedFollows.userId, users.id))
        .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
        .where(eq(feedFollows.id, feedFollow.id));

    return result[0];
};

export const getFeedbyURL = async (url: string) => {
    const [data] = await db.select().from(feeds).where(eq(feeds.url, url)).limit(1);
    return data;
}
