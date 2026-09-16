import { deleteUsers } from "../db/queries/users.js";

export const handleReset = async (cmdName: string, ...args: string[]) => {
    if (args.length !== 0) {
        throw new Error(`usage: ${cmdName}`);
    }

    await deleteUsers();
    console.log("All users deleted");
} 