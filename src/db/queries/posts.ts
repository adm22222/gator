import { desc, eq } from "drizzle-orm";
import { db } from "../index.js";
import { feedFollows, feeds, posts } from "../schema.js";

export const createPost = async (
    title: string,
    url: string,
    description: string | null,
    publishedAt: Date | null,
    feedId: string
) => {
    const [post] = await db.insert(posts)
        .values({
            title,
            url,
            description,
            publishedAt,
            feedId,
        })
        .onConflictDoNothing()
        .returning();

    return post;
};

export const getPostsForUser = async (
    userId: string,
    limit: number
) => {
    return await db
        .select({
            id: posts.id,
            createdAt: posts.createdAt,
            updatedAt: posts.updatedAt,
            title: posts.title,
            url: posts.url,
            description: posts.description,
            publishedAt: posts.publishedAt,
            feedId: posts.feedId,
            feedName: feeds.name,
        })
        .from(posts)
        .innerJoin(
            feeds,
            eq(posts.feedId, feeds.id)
        )
        .innerJoin(
            feedFollows,
            eq(feedFollows.feedId, feeds.id)
        )
        .where(eq(feedFollows.userId, userId))
        .orderBy(desc(posts.publishedAt))
        .limit(limit);
};