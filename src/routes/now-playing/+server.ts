import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAccessToken, currentlyPlaying } from '$lib/server/spotify';

// to poll, simply set up an onMount that sets interval on an async function that calls this endpoint every X milliseconds
// then, change let { topTracks, nowPlaying } = data; to let { topTracks } = data; let nowPlaying = $state(data.nowPlaying);

export const GET: RequestHandler = async () => {
    const accessToken = await getAccessToken();
    const nowPlaying = await currentlyPlaying(accessToken);
    
    return json(nowPlaying);
};