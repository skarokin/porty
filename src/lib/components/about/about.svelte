<script>
    import sean from "$lib/assets/IMG_3774.jpg";

    import MapPin from "@lucide/svelte/icons/map-pin";

    import { Item } from "$lib/components/ui/command";
    import * as Avatar from "$lib/components/ui/avatar/index.js";

    let { nowPlaying, hasError } = $props();
</script>

<Item
    class="flex flex-row gap-2 items-center justify-between"
    value='pos=1-whoami'
    keywords={["about", "sean", "taemin", "kim", "skarokin", "new jersey", "bio", "biography", "location"]}
>
    <div class="flex flex-row gap-2 items-center">
        <Avatar.Root class="size-16 sm:size-24 border" loadingStatus="loaded">
            <Avatar.Image
                src={sean}
                alt="Sean Kim"
            />
            <Avatar.Fallback>lil milk</Avatar.Fallback>
        </Avatar.Root>
        <div class="flex flex-col gap-2 items-start">
            <div class="flex flex-col items-start">
                <div class="text-sm sm:text-base flex items-baseline gap-2 truncate max-w-48 sm:max-w-none">
                    <span>sean kim</span>
                    <span class="text-muted-foreground text-xs truncate">/ skarokin</span>
                </div>
                <p class="text-xs sm:text-sm font-sans">김태민</p>
            </div>
            <div class="flex flex-row gap-1 items-center text-xs text-muted-foreground">
                <MapPin />
                new jersey
            </div>
        </div>
    </div>
    <div class="text-xs">
        {#if nowPlaying && nowPlaying.isPlaying}
            <div class="flex flex-col items-start gap-1">
                <span class="text-muted-foreground text-xs">now playing</span>
                <a href={nowPlaying.songURL} target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 hover:underline">
                    <Avatar.Root class="size-8 rounded-sm border">
                        <Avatar.Image
                            src={nowPlaying.albumImageURL}
                            alt={nowPlaying.album}
                        />
                        <Avatar.Fallback>♪</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="flex flex-col max-w-16 sm:max-w-none truncate">
                        <span class="truncate">{nowPlaying.title}</span>
                        <span class="text-muted-foreground truncate">{nowPlaying.artist}</span>
                    </div>
                </a>
            </div>
        {:else if hasError}
            <div class="flex flex-col items-end gap-1 max-w-32 sm:max-w-none text-xs text-muted-foreground truncate">
                <span>bruh r u srs</span>
                <span>spotify api error</span>
            </div>
        {:else}
            <div class="flex flex-col items-end gap-1 max-w-32 sm:max-w-none text-xs text-muted-foreground truncate">
                <span>now playing</span>
                <span>nothing lol</span>
            </div>
        {/if}
    </div>
</Item>