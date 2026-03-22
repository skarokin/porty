<script>
    import sean from "$lib/assets/sean1.jpg";

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
        <Avatar.Root class="size-16 sm:size-20 border" loadingStatus="loaded">
            <Avatar.Image
                src={sean}
                alt="Sean Kim"
            />
            <Avatar.Fallback>skim</Avatar.Fallback>
        </Avatar.Root>
        <div class="flex flex-col items-start gap-1 truncate">
            <span>sean kim</span>
            <span class="text-muted-foreground text-xs font-sans truncate">김태민</span>
        </div>
    </div>
    <div class="text-xs">
        {#if nowPlaying && nowPlaying.isPlaying}
            <div class="flex flex-col items-start gap-1">
                <span class="text-muted-foreground text-xs text-right w-full">now playing</span>
                <a href={nowPlaying.songURL} target="_blank" rel="noopener noreferrer" class="flex flex-col items-end w-full gap-1 hover:underline">
                    <Avatar.Root class="size-8 sm:size-12 rounded-sm border">
                        <Avatar.Image
                            src={nowPlaying.albumImageURL}
                            alt={nowPlaying.album}
                        />
                        <Avatar.Fallback>♪</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="flex items-center gap-2 truncate">
                        <span class="truncate">{nowPlaying.title}</span>
                        <span class="text-muted-foreground text-xs truncate">/ {nowPlaying.artist}</span>
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
                <span>nothing</span>
            </div>
        {/if}
    </div>
</Item>