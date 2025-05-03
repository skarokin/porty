<script lang="ts">
    import { Contacts } from "$lib/components/contacts";
    import { Experiences } from "$lib/components/experiences";
    import { About } from "$lib/components/about";
    import { Projects } from "$lib/components/projects";
    import { Resume } from "$lib/components/resume";
    import * as Command from "$lib/components/ui/command/index.js";
    import { computeCommandScore } from "bits-ui";

    import { onMount } from "svelte";

    let inputRef: HTMLInputElement | null = null;

    function handleKeydown(e: KeyboardEvent) {
        if (document.activeElement === inputRef) {
            return;
        }

        if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            inputRef?.focus();
        }
    };

    function customFilter(commandValue: string, search: string, commandKeywords?: string[]): number {
        // for some reason, 'copium' comes up when searching 'resume'. so give it a score of 0
        if (search.toLowerCase() === "resume") {
            if (commandValue.includes("copium.dev")) {
                return 0
            }
        }
        
        return computeCommandScore(commandValue, search, commandKeywords);
    }


    onMount(() => {
        inputRef = document.getElementById("inputref") as HTMLInputElement;
    });
</script>

<svelte:document onkeydown={handleKeydown} />

<div class="flex flex-col gap-4 justify-center items-center h-full">
    <Command.Root class="max-w-4xl rounded-lg border shadow-md" filter={customFilter} loop={true} vimBindings={false} >
        <Command.Input
            placeholder="search for stuff about me..."
            id="inputref"
            autofocus
        />
        <Command.List class="max-h-full">
            <Command.Empty>
                no results found baka ૮₍ ˃ ⤙ ˂ ₎ა
            </Command.Empty>
            <Command.Group heading="whoami" >
                <About />
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="contacts">
                <Contacts />
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
        </Command.List>
    </Command.Root>
</div>
