import { defineConfig } from "drizzle-kit";
import { readConfig } from "./src/config.js";

const config = readConfig();

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: config.dbUrl,
    },
});