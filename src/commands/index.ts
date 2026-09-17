import { User } from "../db/schema.js";
import { middlewareLoggedIn } from "../middleware.js";
import { handlerAddFeed } from "./addfeed.js";
import { handlerAgg } from "./agg.js";
import { handlerFeeds } from "./feeds.js";
import { handlerFollow } from "./follow.js";
import { handlerFollowing } from "./following.js";
import { handlerLogin } from "./login.js";
import { handlerRegister } from "./register.js";
import { handlerReset } from "./reset.js";
import { handlerUsers } from "./users.js";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type UserCommandHandler = (cmdName: string, user: User, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

export const registerCommand = (registry: CommandsRegistry, cmdName: string, handler: CommandHandler) => {
    registry[cmdName] = handler;
}

export const runCommand = async (registry: CommandsRegistry, cmdName: string, ...args: string[]) => {
    const handler = registry[cmdName];
    if (!handler) {
        throw new Error(`Command ${cmdName} not found`);
    }
    await handler(cmdName, ...args);
}

export const createCommandsRegistry = (): CommandsRegistry => {
    const registry: CommandsRegistry = {};

    registerCommand(registry, "login", handlerLogin);
    registerCommand(registry, "register", handlerRegister);
    registerCommand(registry, "reset", handlerReset);
    registerCommand(registry, "users", handlerUsers);
    registerCommand(registry, "agg", handlerAgg);
    registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
    registerCommand(registry, "feeds", handlerFeeds);
    registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
    registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
    return registry;
};
