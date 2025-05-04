<script lang="ts">
    import { LinkItem } from "$lib/components/ui/command";
    import * as Avatar from "$lib/components/ui/avatar/index.js";

    let { topTracks } = $props();
</script>

{#each topTracks as track}
    <LinkItem
        href={track.url}
        target="_blank"
        value={`${track.title}-${track.artist}`}
        keywords={["spotify", "music", "track", "song", "artist", "album", "listening", "top tracks"]}
        class="flex items-center justify-between gap-2 w-full hover:cursor-pointer"
    >
        <div class="flex items-center justify-between gap-2 max-w-36 sm:max-w-none truncate">
            <Avatar.Root class="size-4">
                <Avatar.Image
                    src={track.coverImage.url}
                    alt={track.title}
                />
                <Avatar.Fallback>♪</Avatar.Fallback>
            </Avatar.Root>
            <div class="flex flex-row gap-2 items-baseline truncate">
                <span>{track.title}</span>
                <span class="text-muted-foreground text-xs truncate">/ {track.artist}</span>
            </div>
        </div>
        <span class="text-muted-foreground text-xs truncate max-w-36 sm:max-w-none">
            {track.albumName}
        </span>
    </LinkItem>
{/each}