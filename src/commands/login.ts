import { setUser } from "../config.js";
import { getUserByName } from "../db/queries/users.js";

export const handlerLogin = async (cmdName: string, ...args: string[]) => {

    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }

    const username = args[0];
    const existingUser = await getUserByName(username);

    if (!existingUser) {
        throw new Error(`User ${username} does not exist`);
    }
    setUser(username);
    console.log(`User ${username} logged in`);
} 