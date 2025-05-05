import type { PageServerLoad } from "./$types";
import type { PageLoadProps } from "$lib/types/page";
import { getAccessToken, getTopTracks, currentlyPlaying } from "$lib/server/spotify.server";

export const load: PageServerLoad = async (): Promise<PageLoadProps> => {
	try {
        const accessToken = await getAccessToken();
        const topTracks = await getTopTracks(accessToken);
        const [nowPlaying] = await Promise.all([
            // getTopTracks(accessToken),
            currentlyPlaying(accessToken)
        ]);

        return {
            topTracks,
            nowPlaying,
            type: "success"
        }
    } catch (error) {
        console.error('Failed to fetch Spotify data:', error);

        return {
            topTracks: [],
            nowPlaying: null,
            type: "error"
        };
    }
};