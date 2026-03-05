<script lang="ts">
    import { About } from "$lib/components/about";
    import { Experiences } from "$lib/components/experiences";
    import { TechStack } from "$lib/components/tech-stack";
    import { Projects } from "$lib/components/projects";
    import { Contacts } from "$lib/components/contacts";
    import { Resume } from "$lib/components/resume";
    import { Spotify } from "$lib/components/spotify";

    import type { Experience } from "$lib/components/experiences";
    import type { Project } from "$lib/components/projects";
    import type { CurrentlyPlayingTrack } from "$lib/types/spotify";

    import X from "@lucide/svelte/icons/x";
    import { fly, fade } from "svelte/transition";

    import { onDestroy, onMount } from "svelte";

    let { data } = $props();
    let { topTracks } = data;

    let nowPlaying: CurrentlyPlayingTrack | null = $state(data.nowPlaying || null);
    let hasError = $state(data.type === "error");

    // detail overlay state
    let selectedExperience: Experience | null = $state(null);
    let selectedProject: Project | null = $state(null);

    let intervalID: ReturnType<typeof setInterval>;

    async function refreshNowPlaying() {
        const res = await fetch("now-playing");
        const data = await res.json();
        nowPlaying = data || null;
    }

    function handleVisibilityChange() {
        if (document.visibilityState === "visible") {
            refreshNowPlaying();
            intervalID = setInterval(refreshNowPlaying, 30 * 1000);
        } else {
            clearInterval(intervalID);
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape") {
            selectedExperience = null;
            selectedProject = null;
        }
    }

    onMount(() => {
        if (document.visibilityState === "visible") {
            refreshNowPlaying();
            intervalID = setInterval(refreshNowPlaying, 30000);
        }
    });

    onDestroy(() => {
        clearInterval(intervalID);
    });
</script>

<svelte:document
    onkeydown={handleKeydown}
    onvisibilitychange={handleVisibilityChange}
/>

<div class="max-w-7xl mx-auto px-4 py-6 w-full">
    <!-- Dashboard grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

        <!-- Row 1: profile (2 cols), now playing (1), stats (1) -->
        <div class="md:col-span-2">
            <About {nowPlaying} {hasError} />
        </div>

        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">now playing</span>
                {#if nowPlaying && nowPlaying.isPlaying}
                    <span class="flex items-end gap-px h-3">
                        <span class="w-0.5 bg-emerald-400 rounded-full animate-eq-1"></span>
                        <span class="w-0.5 bg-emerald-400 rounded-full animate-eq-2"></span>
                        <span class="w-0.5 bg-emerald-400 rounded-full animate-eq-3"></span>
                    </span>
                {/if}
            </div>
            <div class="panel-body">
                {#if nowPlaying && nowPlaying.isPlaying}
                    <a href={nowPlaying.songURL} target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <img src={nowPlaying.albumImageURL} alt={nowPlaying.title} class="size-12 rounded" />
                        <div class="flex flex-col min-w-0">
                            <span class="text-sm truncate">{nowPlaying.title}</span>
                            <span class="text-xs text-muted-foreground truncate">{nowPlaying.artist}</span>
                        </div>
                    </a>
                {:else}
                    <div class="flex items-center gap-3 text-muted-foreground">
                        <div class="size-12 rounded bg-muted flex items-center justify-center text-lg">♪</div>
                        <div class="flex flex-col">
                            <span class="text-sm">nothing</span>
                            <span class="text-xs text-muted-foreground/60">not listening rn</span>
                        </div>
                    </div>
                {/if}
            </div>
        </div>

        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">uptime</span>
                <span class="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <div class="panel-body flex flex-col gap-3">
                <div>
                    <p class="stat-value text-emerald-400">~2y</p>
                    <p class="stat-label mt-1">coding since 11/23</p>
                </div>
                <div class="flex gap-4">
                    <div>
                        <p class="text-lg font-bold">7</p>
                        <p class="stat-label">projects</p>
                    </div>
                    <div>
                        <p class="text-lg font-bold">8</p>
                        <p class="stat-label">technologies</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Row 2: experiences (full width) -->
        <div class="lg:col-span-4 md:col-span-2">
            <Experiences onSelect={(exp) => selectedExperience = exp} />
        </div>

        <!-- Row 3: tech stack (2 cols), projects (2 cols) -->
        <div class="lg:col-span-2">
            <TechStack />
        </div>
        <div class="lg:col-span-2">
            <Projects onSelect={(proj) => selectedProject = proj} />
        </div>

        <!-- Row 4: contacts (2 cols), resume (1), top tracks (1) -->
        <div class="lg:col-span-2">
            <Contacts />
        </div>
        <div>
            <Resume />
        </div>
        <div>
            <Spotify {topTracks} {hasError} />
        </div>
    </div>
</div>

<!-- Experience detail overlay -->
{#if selectedExperience}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4" transition:fade={{ duration: 150 }}>
        <!-- backdrop -->
        <button class="absolute inset-0 bg-background/80 backdrop-blur-sm" onclick={() => selectedExperience = null} aria-label="Close"></button>
        <!-- modal panel -->
        <div class="relative panel w-full max-w-2xl max-h-[80vh] overflow-auto" in:fly={{ y: 20, duration: 200 }}>
            <div class="panel-header sticky top-0 bg-[hsl(var(--panel))] z-10">
                <div class="flex items-center gap-2">
                    <span class="panel-title">{selectedExperience.company}</span>
                    <span class="text-[10px] text-muted-foreground">/ {selectedExperience.title}</span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-[10px] text-muted-foreground">{selectedExperience.date}</span>
                    <button onclick={() => selectedExperience = null} class="text-muted-foreground hover:text-foreground transition-colors">
                        <X class="size-4" />
                    </button>
                </div>
            </div>
            <div class="panel-body space-y-3">
                {#each selectedExperience.summary as point, i}
                    <div class="flex gap-3 text-sm">
                        <span class="text-emerald-400/50 text-xs mt-0.5 select-none">{String(i + 1).padStart(2, '0')}</span>
                        <p class="text-foreground/90 leading-relaxed">{point}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}

<!-- Project detail overlay -->
{#if selectedProject}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4" transition:fade={{ duration: 150 }}>
        <button class="absolute inset-0 bg-background/80 backdrop-blur-sm" onclick={() => selectedProject = null} aria-label="Close"></button>
        <div class="relative panel w-full max-w-2xl max-h-[80vh] overflow-auto" in:fly={{ y: 20, duration: 200 }}>
            <div class="panel-header sticky top-0 bg-[hsl(var(--panel))] z-10">
                <div class="flex items-center gap-2">
                    <span class="panel-title">{selectedProject.name}</span>
                    <span class="text-[10px] text-muted-foreground">{selectedProject.date}</span>
                </div>
                <div class="flex items-center gap-3">
                    {#if selectedProject.link}
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" class="text-[10px] text-emerald-400 hover:underline">site</a>
                    {/if}
                    {#if selectedProject.github}
                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" class="text-[10px] text-muted-foreground hover:text-foreground transition-colors">src</a>
                    {/if}
                    <button onclick={() => selectedProject = null} class="text-muted-foreground hover:text-foreground transition-colors">
                        <X class="size-4" />
                    </button>
                </div>
            </div>
            <div class="panel-body space-y-4">
                <p class="text-sm text-foreground/80 leading-relaxed">{selectedProject.description}</p>
                <div>
                    <p class="stat-label mb-2">tech stack</p>
                    <div class="space-y-2">
                        {#each selectedProject.techStack as tech}
                            <div class="flex flex-col gap-0.5 rounded bg-muted/30 px-3 py-2">
                                <div class="flex items-center gap-2">
                                    <span class="text-xs font-medium">{tech.tech}</span>
                                    <span class="text-[10px] text-muted-foreground">/ {tech.purpose}</span>
                                </div>
                                <p class="text-[11px] text-muted-foreground">{tech.results}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
