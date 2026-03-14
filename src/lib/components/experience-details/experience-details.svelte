<script lang="ts">
    import { List, Item, Group, Separator } from "$lib/components/ui/command";

    import type { Experience } from "$lib/components/experiences";
    import ChevronLeft from "@lucide/svelte/icons/chevron-left";

    let {
        experience,
        onClose,
        onEscPress
    } = $props<{
        experience: Experience | null;
        onClose: () => void;
        onEscPress: (e: KeyboardEvent) => void;
    }>();
</script>

<svelte:document onkeydown={onEscPress} />

<List class="max-h-full">
    <Group heading={experience.company}>
        <Item
            value="title"
            keywords={["title", "role", "position"]}
            class="flex items-center justify-between gap-2 w-full pointer-events-none"
        >
            <div class="flex items-center gap-2 truncate">
                <span>{experience.title}</span>
            </div>
            <p class="text-xs text-muted-foreground min-w-0 truncate">
                {experience.date}
            </p>
        </Item>
    </Group>

    <Separator />

    <Group heading="summary">
        {#each experience.summary as point, i}
            <Item
                value={`summary-${i}`}
                keywords={["summary", "work", "details", "description"]}
                class="pointer-events-none items-start justify-between"
            >
                <p class="text-sm text-wrap min-w-0 flex-1">{point}</p>
                <span class="text-xs text-muted-foreground mt-0.5 shrink-0">{i + 1}</span>
            </Item>
        {/each}
    </Group>
    
    <Separator />

    <Group heading="back">
        <Item
            value="exit"
            keywords={["back", "close", "exit", "return", "home"]}
            class="group flex items-center justify-between gap-2 w-full hover:cursor-pointer"
            onSelect={onClose}
        >
            <div class="flex items-center gap-2">
                <ChevronLeft class="size-4 text-amber-500 transition-transform group-hover:-translate-x-1 group-hover:scale-110" />
                <div class="flex items-center gap-2 truncate">
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
