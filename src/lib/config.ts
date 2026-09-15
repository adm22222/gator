import { readFileSync, writeFileSync } from "fs";
import os from "os";
import path from "path";


type Config = {
    dbUrl: String;
    currentUserName?: String;
}


export const setConfig = async (username: string) => {
    const file = await readConfig();
    file.currentUserName = username;
    await writeConfig(file);
}


export const readConfig = (): Config => {
    const configPath = getConfigFilePath();


    const config = readFileSync(configPath, "utf-8");
    const parsed = JSON.parse(config);
    return validateConfig(parsed);
}

const getConfigFilePath = (): string => {
    return path.join(os.homedir(), ".gatorconfig.json");
}

const writeConfig = (config: Config): void => {
    const path = getConfigFilePath();

    const rawConfig = {
        db_url: config.dbUrl,
        current_user_name: config.currentUserName,
    };

    const data = JSON.stringify(rawConfig, null, 2);
    writeFileSync(path, data, { encoding: "utf-8" });
}

const validateConfig = (config: any) => {
    if (!config.db_url || typeof config.db_url !== "string") {
        throw new Error("db_url is required in config file");
    }
    return {
        dbUrl: config.db_url,
        currentUserName: config.current_user_name ?? "",
    };
}