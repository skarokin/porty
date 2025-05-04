import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } from "$env/static/private";
import * as SpotifyTypes from "$lib/types/spotify"

export const getAccessToken = async (): Promise<string> => {
    const refresh_token = SPOTIFY_REFRESH_TOKEN;
    const clientID = SPOTIFY_CLIENT_ID;
    const clientSecret = SPOTIFY_CLIENT_SECRET;
    
    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${clientID}:${clientSecret}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch access token");
    }

    const accessTokenData = await res.json();
    const accessToken = accessTokenData.access_token;

    if (!accessToken) {
        throw new Error("Failed to fetch access token");
    }

    return accessToken;
}

export const currentlyPlaying = async (accessToken: string): Promise<SpotifyTypes.CurrentlyPlayingTrack | null> => {
    const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    // successful response but nothing returned
    if (res.status === 204) {
        return null;
    }

    // actual error with the request
    if (!res.ok) {
        throw new Error("Failed to fetch currently playing track");
    }

    const data = await res.json() as SpotifyTypes.CurrentlyPlayingResponse;

    // nothing is playing
    if (data.item === null) {
        return null; 
    }

    const isPlaying = data.is_playing;
    const title = data.item.name;
    const artist = data.item.artists.map((_artist: SpotifyTypes.Artist) => _artist.name).join(", ");
    const albumImageURL = data.item.album.images[0].url;
    const songURL = data.item.external_urls.spotify;

    return {
        isPlaying,
        title,
        artist,
        albumImageURL,
        songURL,
    };
};

export const getTopTracks = async (accessToken: string): Promise<SpotifyTypes.TopTrack[]> => {
    const res = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch top tracks");
    }

    if (res.status === 204) {
        return [];
    }

    const data = await res.json() as SpotifyTypes.TopTracksResponse;
    const { items } = data;

    if (!items || items.length === 0) {
        return [];
    }

    const tracks = items.map((track: SpotifyTypes.Track) => ({
        title: track.name,
        artist: track.artists.map((_artist: SpotifyTypes.Artist) => _artist.name).join(", "),
        url: track.external_urls.spotify,
        coverImage: track.album.images[1],
        albumName: track.album.name
    }));

    return tracks;
};