import { eq } from "drizzle-orm";

import { db } from "../index.js";
import { users } from "../schema.js";

export const createUser = async (name: string) => {
    const [user] = await db
        .insert(users)
        .values({ name })
        .returning();

    return user;
}

export const getUserByName = async (name: string) => {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.name, name))
        .limit(1);

    return user;
}

export const deleteUsers = async () => {
    await db.delete(users).execute();
}