<script>
    import sean from "$lib/assets/sean1.jpg";
    import MapPin from "@lucide/svelte/icons/map-pin";
    import * as Avatar from "$lib/components/ui/avatar/index.js";

    let { nowPlaying = null, hasError = false } = $props();
</script>

<div class="panel h-full">
    <div class="panel-header">
        <span class="panel-title">whoami</span>
        <span class="text-[10px] text-muted-foreground">sre / ai agents</span>
    </div>
    <div class="panel-body">
        <div class="flex items-start gap-4">
            <Avatar.Root class="size-16 sm:size-20 rounded-md border border-border/50 flex-shrink-0" loadingStatus="loaded">
                <Avatar.Image src={sean} alt="Sean Kim" />
                <Avatar.Fallback>skim</Avatar.Fallback>
            </Avatar.Root>
            <div class="flex flex-col gap-2 min-w-0">
                <div class="flex flex-col">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-semibold">sean kim</span>
                        <span class="text-muted-foreground text-xs">/ skarokin</span>
                    </div>
                    <p class="text-xs font-sans text-muted-foreground">김태민</p>
                </div>
                <div class="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin class="size-3" />
                    new jersey
                </div>
                <div class="flex items-center gap-2 text-[10px] text-muted-foreground/60">
                    <span class="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    available
                </div>
            </div>
        </div>
        <!-- inline now-playing for mobile, hidden on lg (shown in its own panel) -->
        <div class="mt-3 pt-3 border-t border-[hsl(var(--panel-border))] lg:hidden">
            {#if nowPlaying && nowPlaying.isPlaying}
                <a href={nowPlaying.songURL} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <img src={nowPlaying.albumImageURL} alt={nowPlaying.album} class="size-8 rounded" />
                    <div class="flex flex-col min-w-0">
                        <span class="text-[11px] truncate">{nowPlaying.title}</span>
                        <span class="text-[10px] text-muted-foreground truncate">{nowPlaying.artist}</span>
                    </div>
                    <span class="flex items-end gap-px h-3 ml-auto">
                        <span class="w-0.5 bg-emerald-400 rounded-full animate-eq-1"></span>
                        <span class="w-0.5 bg-emerald-400 rounded-full animate-eq-2"></span>
                        <span class="w-0.5 bg-emerald-400 rounded-full animate-eq-3"></span>
                    </span>
                </a>
            {:else if hasError}
                <p class="text-[10px] text-muted-foreground">bruh spotify api error</p>
            {:else}
                <p class="text-[10px] text-muted-foreground">not listening rn</p>
            {/if}
        </div>
    </div>
</div>