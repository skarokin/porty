import type { PageServerLoad } from "./$types";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } from "$env/static/private";
import * as SpotifyTypes from "$lib/types/spotify"
import { getAccessToken, currentlyPlaying, getTopTracks } from "$lib/server/spotify";

export const load: PageServerLoad = async (): Promise<{
	topTracks: SpotifyTypes.TopTrack[];
	nowPlaying: SpotifyTypes.CurrentlyPlayingTrack | null;
}> => {
	
	if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
		throw new Error("Spotify credentials are not set in environment variables.");
	}

    const accessToken = await getAccessToken();

    const topTracks = await getTopTracks(accessToken);
    const nowPlaying = await currentlyPlaying(accessToken);
	
    return {
        topTracks,
        nowPlaying,
    };
};