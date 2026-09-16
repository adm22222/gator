import { eq } from "drizzle-orm";

import { db } from "../index.js";
import { users } from "../schema.js";

export async function createUser(name: string) {
    const [user] = await db
        .insert(users)
        .values({ name })
        .returning();

    return user;
}

export async function getUserByName(name: string) {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.name, name))
        .limit(1);

    return user;
}