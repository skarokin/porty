<script lang="ts">
    import { Item } from "$lib/components/ui/command"
    import * as Avatar from "$lib/components/ui/avatar/index.js";

    import rutgers from "$lib/assets/rutgers.png";
    import cyberark from "$lib/assets/cyberark.png";
    import copium from "$lib/assets/copium.png";

    type Experience = {
        company: string;
        title: string;
        hiddenKeywords?: string[];
        date: string;
        logoPath?: string;
    }

    const experiences: Experience[] = [
        {
            company: "rutgers",
            title: "cs",
            hiddenKeywords: ["computer science", "rutgers university", "major", "education", "school"],
            date: "09/22 - 12/25",
            logoPath: rutgers,
        },
        {
            company: "cyberark",
            title: "sre intern",
            hiddenKeywords: ["site reliability engineer", "site reliability"],
            date: "05/25 - 08/25",
            logoPath: cyberark,
        },
        {
            company: "copium.dev",
            title: "founder",
            date: "01/25 - today",
            logoPath: copium,
        },
        {
            company: "acl agency",
            title: "swe intern",
            hiddenKeywords: ["software engineer", "software engineering"],
            date: "05/24 - 08/24",
        }
    ];
</script>

{#each experiences as experience, index}
    <Item
        value={`pos=${index}-${experience.company}-${experience.title}`}
        keywords={["experiences", "experience", "work", "job"].concat(experience.hiddenKeywords || [])}
        class="flex items-center justify-between gap-2 w-full"
    >
        <div class="flex items-center gap-2 truncate max-w-48 sm:max-w-none">
            <Avatar.Root class="size-4 rounded-none">
                {#if experience.logoPath}
                    <Avatar.Image
                        src={experience.logoPath}
                        alt={experience.company}
                    />
                {:else}
                    <Avatar.Fallback class="text-xs bg-muted rounded-full">
                        {experience.company[0].toUpperCase()}
                    </Avatar.Fallback>
                {/if}
            </Avatar.Root>
            <div class="flex items-baseline gap-2 truncate">
                <span>{experience.company}</span>
                <span class="text-muted-foreground text-xs truncate">/ {experience.title}</span>
            </div>
        </div>
        <p class="text-xs text-muted-foreground max-w-36 sm:max-w-none truncate">{experience.date}</p>
    </Item>
{/each}