import { getAllFeeds } from "../db/queries/feeds.js";


export const handlerFeeds = async (_: string) => {

    const feeds = await getAllFeeds();

    console.log("Feeds:");
    feeds.forEach((feed) => {
        console.log(`* ${feed.name} (${feed.url}) - User: ${feed.userName}`);
    });

}