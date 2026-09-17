import type { User } from "../db/schema.js";
import { getPostsForUser } from "../db/queries/posts.js";

export const handlerBrowse = async (
    cmdName: string,
    user: User,
    ...args: string[]
) => {
    if (args.length > 1) {
        throw new Error(`usage: ${cmdName} [limit]`);
    }

    const limit = args.length === 0 ? 2 : Number(args[0]);

    if (!Number.isInteger(limit) || limit <= 0) {
        throw new Error(`Invalid limit: ${args[0]}`);
    }

    const posts = await getPostsForUser(
        user.id,
        limit
    );

    for (const post of posts) {
        console.log(`* ${post.title}`);
        console.log(`  URL: ${post.url}`);
        console.log(`  Description: ${post.description ?? ""}`);
        console.log(`  Published: ${post.publishedAt ?? "Unknown"}`);
        console.log(`  Feed: ${post.feedName}`);
        console.log();
    }
};