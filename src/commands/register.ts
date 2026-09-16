import { setUser } from "../config.js";
import { createUser, getUserByName } from "../db/queries/users.js";

export async function handleRegister(
    cmdName: string,
    ...args: string[]
) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }

    const username = args[0];

    const existingUser = await getUserByName(username);

    if (existingUser) {
        throw new Error(`User ${username} already exists`);
    }

    const user = await createUser(username);

    setUser(username);

    console.log(`User ${username} registered`);
}