import { createClient } from '@sanity/client';

export const sanityClient = createClient({
    projectId: 'h3t3nzom',
    dataset: 'production',
    apiVersion: '2023-01-01',
    token: 'skxcwuN6Yvk69I0aY0TegvyCLo2YTuInjzbbHUM1ueg2hV4WhpoteOQHwLGJymVI8YDZrFke738rjlWBKrJugc2emqgHU23aXNRcb6GhciyhO5lU1nX86mp0dV6cgAg7UneLXOfM2IX6lrH3v7QnaFLk9G2G68PQMxbKIeTeS5hCgZbQ2cg0',
    useCdn: false,
});
