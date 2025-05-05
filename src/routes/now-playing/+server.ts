import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAccessToken, currentlyPlaying } from '$lib/server/spotify.server';

export const GET: RequestHandler = async () => {
    const accessToken = await getAccessToken();
    const nowPlaying = await currentlyPlaying(accessToken);
    
    return json(nowPlaying);
};