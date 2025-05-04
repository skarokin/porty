import type { PageServerLoad } from "./$types";
import type { PageLoadProps } from "$lib/types/page";
import { getAccessToken, currentlyPlaying, getTopTracks } from "$lib/server/spotify";

export const load: PageServerLoad = async (): Promise<PageLoadProps> => {
	try {
        const accessToken = await getAccessToken();

        const [topTracks, nowPlaying] = await Promise.all([
            getTopTracks(accessToken),
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