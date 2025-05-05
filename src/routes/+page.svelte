<script lang="ts">
    import { Contacts } from "$lib/components/contacts";
    import { Experiences } from "$lib/components/experiences";
    import { About } from "$lib/components/about";
    import { Projects } from "$lib/components/projects";
    import { Resume } from "$lib/components/resume";
    import { Spotify } from "$lib/components/spotify";
    import { TechStack } from "$lib/components/tech-stack";

    import * as Command from "$lib/components/ui/command";

    import { customFilter } from "$lib/fts";

    import { onDestroy, onMount } from "svelte";
    
    let { data } = $props();
    let { topTracks } = data;

    // set this separately so that we can use $state() since we poll; might succeed once but fail later
    let nowPlaying = $state(data.nowPlaying || '');
    let hasError = $state(data.type === "error");

    let intervalID: ReturnType<typeof setInterval>;

    let inputRef: HTMLInputElement | null = null;

    async function refreshNowPlaying() {
        const res = await fetch("now-playing");
        const updatedNowPlaying = await res.json();
        nowPlaying = updatedNowPlaying;
    }

    // only refresh now playing when user is currently viewing the page
    function handleVisibilityChange() {
        if (document.visibilityState === "visible") {
            refreshNowPlaying();
            intervalID = setInterval(refreshNowPlaying, 30 * 1000);
        } else {
            clearInterval(intervalID);
        }
    }

    function handleKeydownSearch(e: KeyboardEvent) {
        if (document.activeElement === inputRef) {
            return;
        }

        if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            inputRef?.focus();
        }
    };

    onMount(() => {
        inputRef = document.getElementById("inputref") as HTMLInputElement;
        
        // initial setup based on current visibility
        if (document.visibilityState === 'visible') {
            refreshNowPlaying();
            intervalID = setInterval(refreshNowPlaying, 60000);
        }
    });

    onDestroy(() => {
        clearInterval(intervalID);
    });
</script>

<svelte:document onkeydown={handleKeydownSearch} onvisibilitychange={handleVisibilityChange} />

<div class="flex flex-col gap-4 justify-center items-center h-full">
    <Command.Root class="max-w-4xl rounded-lg border shadow-md h-full" filter={customFilter} loop={true} vimBindings={false} >
        <Command.Input
            placeholder="search for stuff about me..."
            id="inputref"
            autofocus
        />
        <!-- absolute to allow the list to go under the input for frosted glass effect -->
        <Command.List class="max-h-full">
            <Command.Empty>
                no results found baka ૮₍ ˃ ⤙ ˂ ₎ა
            </Command.Empty>
            <Command.Group heading="whoami">
                <About
                    nowPlaying={nowPlaying}
                    hasError={hasError}
                />
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="contacts">
                <Contacts />
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="tech stack">
                <TechStack />
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="experiences">
                <Experiences />
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="projects">
                <Projects />
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="resume">
                <Resume />
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="spotify (top 5 tracks)">
                <Spotify
                    topTracks={topTracks}
                    hasError={hasError}
                />
            </Command.Group>
        </Command.List>
    </Command.Root>
</div>