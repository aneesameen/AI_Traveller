import { createClient } from '@sanity/client';

export const sanityClient = createClient({
    projectId: 'h3t3nzom',
    dataset: 'production',
    apiVersion: '2023-01-01',
    // token: 'skxcwuN6Yvk69I0aY0TegvyCLo2YTuInjzbbHUM1ueg2hV4WhpoteOQHwLGJymVI8YDZrFke738rjlWBKrJugc2emqgHU23aXNRcb6GhciyhO5lU1nX86mp0dV6cgAg7UneLXOfM2IX6lrH3v7QnaFLk9G2G68PQMxbKIeTeS5hCgZbQ2cg0',
    token: 'skrltAGWX6kOsPmpY2DMUL68CuXXxIFBeJe4M6cz9naUgHb3kFFFMfBtR923ST7eSko6BwL7WFNfCrx5SqEOT6ces2COsHvve2H7F2xqOFic8T9JqSsD7tBGnJXhJ1hFHLRLwOlrrmSDzM4BVtrCb7rSQjJ57nPrFj0vrwe9GzwhKH9bmDqq',
    useCdn: false,
});
