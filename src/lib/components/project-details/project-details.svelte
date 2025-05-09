<script lang="ts">
    import { List, Item, LinkItem, Group } from "$lib/components/ui/command";

    import type { Project } from "$lib/components/projects";
    import GitHub from "@lucide/svelte/icons/github";
    import Link from "@lucide/svelte/icons/link";
    import ChevronLeft from "@lucide/svelte/icons/chevron-left";

    let {
        project,
        onClose,
        onEscPress
    } = $props<{
        project: Project;
        onClose: () => void;
        onEscPress: (e: KeyboardEvent) => void;
    }>();
</script>

<svelte:document onkeydown={onEscPress} />

<List class="max-h-full">
    <Group heading={project.name}>
        <Item
            value="description"
            keywords={["description", "details", "info", "about"]}
            disabled={true}
        >
            {project.description}
        </Item>
    </Group>

    <Group heading={"links"}>
        {#if project.link}
            <LinkItem
                href={project.link}
                value="site"
                keywords={["link", "website", "site", "url"]}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between gap-2 w-full hover:cursor-pointer"
            >
                <div class="flex items-center gap-2">
                    <Link class="size-4" />
                    <div class="flex items-baseline gap-2 truncate">
                        <span>visit</span>
                        <span class="text-muted-foreground text-xs truncate">/ site</span>
                    </div>
                </div>
                <p
                    class="text-xs text-muted-foreground max-w-36 sm:max-w-none truncate"
                >
                    {project.link}
                </p>
            </LinkItem>
        {/if}

        {#if project.github}
            <LinkItem
                href={project.github}
                value="github"
                keywords={["repository", "code", "source", "src"]}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between gap-2 w-full hover:cursor-pointer"
            >
                <div class="flex items-center gap-2">
                    <GitHub class="size-4" />
                    <div class="flex items-baseline gap-2 truncate">
                        <span>src</span>
                        <span class="text-muted-foreground text-xs truncate">/ github</span>
                    </div>
                </div>
                <p
                    class="text-xs text-muted-foreground max-w-36 sm:max-w-none truncate"
                >
                    {project.github}
                </p>
            </LinkItem>
        {/if}
    </Group>

    <Group heading={"back"}>
        <Item
            value="back"
            keywords={["close", "exit", "back", "return"]}
            class="group flex items-center justify-between gap-2 w-full hover:cursor-pointer"
            onSelect={onClose}
        >
            <div class="flex items-center gap-2">
                <ChevronLeft class="size-4 text-amber-500" />
                <div class="flex items-baseline gap-2 truncate">
                    <span>back</span>
                    <span class="text-muted-foreground text-xs truncate"
                        >/ to home</span
                    >
                </div>
            </div>
            <kbd
                class="group-data-[selected]:bg-background sm:inline-flex bg-muted text-muted-foreground pointer-events-none h-5 select-none items-center gap-1 rounded border px-1.5 text-xs"
            >
                <span>esc</span>
            </kbd>
        </Item>
    </Group>
</List>