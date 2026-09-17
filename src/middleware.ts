import { CommandHandler, UserCommandHandler } from "./commands/index.js";
import { readConfig } from "./config.js";
import { getUserByName } from "./db/queries/users.js";

export const middlewareLoggedIn = (
    handler: UserCommandHandler
): CommandHandler => {
    return async (cmdName: string, ...args: string[]) => {
        const config = readConfig();
        const userName = config.currentUserName;

        if (!userName) {
            throw new Error(
                "No current user set. Please login first."
            );
        }

        const user = await getUserByName(userName);

        if (!user) {
            throw new Error(`User ${userName} not found`);
        }

        await handler(cmdName, user, ...args);
    };
};