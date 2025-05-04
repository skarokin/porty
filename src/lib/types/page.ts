import type { TopTrack, CurrentlyPlayingTrack } from "$lib/types/spotify";

export interface PageLoadProps {
    topTracks: TopTrack[];
    nowPlaying: CurrentlyPlayingTrack | null;
    type: "success" | "error";
}