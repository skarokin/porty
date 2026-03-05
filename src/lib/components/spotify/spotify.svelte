<script lang="ts">
    let { topTracks, hasError } = $props();
</script>

<div class="panel h-full">
    <div class="panel-header">
        <span class="panel-title">top tracks</span>
        <span class="text-[10px] text-muted-foreground">spotify</span>
    </div>
    {#if hasError}
        <div class="panel-body">
            <p class="text-xs text-muted-foreground">spotiy api error... bruh</p>
        </div>
    {:else}
        <div class="divide-y divide-[hsl(var(--panel-border))]">
            {#each topTracks as track, index}
                <a
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2.5 px-3 py-1.5 row-hover"
                >
                    <span class="text-[10px] text-muted-foreground/50 w-3 text-right flex-shrink-0">{index + 1}</span>
                    <img src={track.coverImage.url} alt={track.title} class="size-6 rounded flex-shrink-0" />
                    <div class="flex flex-col min-w-0 flex-1">
                        <span class="text-xs truncate">{track.title}</span>
                        <span class="text-[10px] text-muted-foreground truncate">{track.artist}</span>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</div>