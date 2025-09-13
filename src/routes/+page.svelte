<script lang="ts">
    import { Contacts } from "$lib/components/contacts";
    import { Experiences } from "$lib/components/experiences";
    import { About } from "$lib/components/about";
    import { Projects } from "$lib/components/projects";
    import { Resume } from "$lib/components/resume";
    import { Spotify } from "$lib/components/spotify";
    import { TechStack } from "$lib/components/tech-stack";
    import { ProjectDetails } from "$lib/components/project-details";
    import { RecentPic } from "$lib/components/recent-pic";
    import type { Project } from "$lib/components/projects";
    import * as Command from "$lib/components/ui/command";

	import { Command as CommandPrimitive } from "bits-ui";

    import { customFilter } from "$lib/fts";

    import { onDestroy, onMount } from "svelte";
    import { fly } from "svelte/transition";

    let { data } = $props();
    let { topTracks } = data;

    let viewState = $state<{
        inputValue: string;
        prevInputValue: string;
        projectSelected: boolean;
        selectedProjectIndex: number;
    }>({
        inputValue: "",
        prevInputValue: "",
        projectSelected: false,
        selectedProjectIndex: 0,
    });

    let selectedProject: Project | null = $state(null);

    // set this separately so that we can use $state() since we poll; might succeed once but fail later
    let nowPlaying = $state(data.nowPlaying || "");
    let hasError = $state(data.type === "error");

    let intervalID: ReturnType<typeof setInterval>;
    let inputRef: HTMLInputElement | null = $state(null);
    let commandListElementRef: HTMLDivElement | null = $state(null);
    let commandRootPrimitiveRef: CommandPrimitive.Root | null = $state(null);

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
        if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            inputRef?.focus();
        }
    }

    function saveViewStateAndSelectProject(project: Project) {
        selectedProject = project;
        viewState.projectSelected = true;
        viewState.prevInputValue = viewState.inputValue;
        viewState.inputValue = "";  // you can search inside a project detail so clear the input

        const items = commandRootPrimitiveRef?.getValidItems();
        if (!items) return;

        viewState.selectedProjectIndex = items.findIndex((item: HTMLElement) => item.hasAttribute('data-selected'));
    }

    async function closeProjectDetails() {
        viewState.projectSelected = false;
        viewState.inputValue = viewState.prevInputValue;

        // wait for DOM to update before updating selected index
        requestAnimationFrame(() => {
            commandRootPrimitiveRef?.updateSelectedToIndex(viewState.selectedProjectIndex);
        });
    }

    onMount(() => {
        // initial setup based on current visibility
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
    onkeydown={handleKeydownSearch}
    onvisibilitychange={handleVisibilityChange}
/>

<div class="flex flex-col gap-4 justify-center items-center h-full">
    <Command.Root
        class="max-w-4xl rounded-lg border shadow-md h-full"
        filter={customFilter}
        loop={true}
        vimBindings={false}
        bind:primitiveRef={commandRootPrimitiveRef}
    >
        <!-- value state is only updated on a keyboard input. we want it to also be updated if viewState.inputValue changes -->
        <Command.Input
            placeholder={viewState.projectSelected ? `search for stuff about ${selectedProject?.name}...` : "search for stuff about me..."}
            bind:ref={inputRef}
            bind:value={viewState.inputValue}
            autofocus
        />
        <Command.List class="max-h-full" bind:ref={commandListElementRef}>
            {#if viewState.projectSelected}
                <div in:fly={{ x: 150, duration: 200 }}>
                    <ProjectDetails
                        project={selectedProject}
                        onClose={closeProjectDetails}
                        onEscPress={(e: KeyboardEvent) => {
                            if (e.key === "Escape") {
                                closeProjectDetails();
                            }
                        }}
                    />
                </div>
            {:else}
                <div in:fly={{ x: -150, duration: 200 }}>
                    <Command.Empty>no results found baka ૮₍ ˃ ⤙ ˂ ₎ა</Command.Empty>
                    <Command.Group heading="whoami">
                        <About
                            nowPlaying={nowPlaying}
                            hasError={hasError}
                        />
                    </Command.Group>
                    <Command.Separator />
                    <Command.Group heading="recent pic">
                        <RecentPic />
                    </Command.Group>
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
                        <Projects
                            saveViewStateAndSelectProject={saveViewStateAndSelectProject}
                        />
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
                </div>
            {/if}
        </Command.List>
    </Command.Root>
</div>
