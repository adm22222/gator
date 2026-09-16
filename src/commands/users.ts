import { readConfig } from "../config.js";
import { getAllUsers } from "../db/queries/users.js";

export const handlerUsers = async (cmdName: string, ...args: string[]) => {
    if (args.length !== 0) {
        throw new Error(`usage: ${cmdName}`);
    }

    const users = await getAllUsers();
    const config = readConfig();

    users.forEach((user) => {
        if (user.name === config.currentUserName) {
            console.log(`* ${user.name} (current)`);
        } else {
            console.log(`* ${user.name}`);
        }
    });

}