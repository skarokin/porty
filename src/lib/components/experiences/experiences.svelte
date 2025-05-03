<script lang="ts">
    import { Item } from "$lib/components/ui/command"

    type Experience = {
        company: string;
        title: string;
        date: string;
    }

    const experiences = [
        {
            company: "rutgers",
            title: "cs",
            date: "sep 2022 - dec 2025",
        },
        {
            company: "cyberark",
            title: "sre intern",
            date: "may 2025 - aug 2025",
        },
        {
            company: "copium.dev",
            title: "founder",
            date: "jan 2025 - now",
        },
        {
            company: "acl agency",
            title: "swe intern",
            date: "may 2024 - aug 2024",
        }
    ];
</script>

{#each experiences as experience}
    <Item
        value={`experiences-${experience.company}-${experience.title}`}
        class="flex items-center justify-between gap-2 w-full"
    >
        <!-- <svelte:component this={contact.icon} class="size-4 opacity-50" /> -->
        <div>
            <span>{experience.company}</span>
            <span class="text-muted-foreground text-xs">/ {experience.title}</span>
        </div>
        <p class="text-xs text-muted-foreground">{experience.date}</p>
    </Item>
{/each}