import { scrapeFeeds } from "../aggregator.js";
import { parseDuration } from "../lib/duration.js";

export const handlerAgg = async (cmdName: string, ...args: string[]) => {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <time_between_reqs>`);
    }
    const timeArg = args[0];
    const timeBetweenRequests = parseDuration(timeArg);

    console.log(`Collecting feeds every ${timeArg}`);

    await scrapeFeeds().catch(handleError);

    const interval = setInterval(() => {
        scrapeFeeds().catch(handleError);
    }, timeBetweenRequests);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");

            clearInterval(interval);
            resolve();
        });
    });
};

const handleError = (error: unknown) => {
    console.error("Error scraping feeds:", error);

    if (error instanceof Error) {
        console.error("Message:", error.message);
        console.error("Cause:", error.cause);
    }
};