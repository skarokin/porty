<script lang="ts">
    import { Item, LinkItem } from "$lib/components/ui/command";
    import * as Avatar from "$lib/components/ui/avatar/index.js";

    let { topTracks, hasError } = $props();
</script>

{#if hasError}
    <Item
        value="spotify-error"
        keywords={["spotify", "error", "music", "track"]}
        class="flex items-center justify-between gap-2 w-full"
    >
        <div class="flex items-center justify-between gap-2 max-w-36 sm:max-w-none">
            <Avatar.Root class="size-4">
                <Avatar.Fallback>♪</Avatar.Fallback>
            </Avatar.Root>
            <div class="flex flex-row gap-2 items-baseline truncate">
                <span>are u srs</span>
                <span class="text-muted-foreground text-xs truncate">/ right neow bro</span>
            </div>
        </div>
        <span class="text-muted-foreground text-xs truncate max-w-36 sm:max-w-none">
            spotiy api error... bruh
        </span>
    </Item>
{:else}
    {#each topTracks as track, index}
        <LinkItem
            href={track.url}
            target="_blank"
            value={`pos=${index}-${track.title}-${track.artist}`}
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
{/if}