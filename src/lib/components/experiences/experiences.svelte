<script lang="ts">
    import { Item } from "$lib/components/ui/command"
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import ChevronRight from "@lucide/svelte/icons/chevron-right";

    import rutgers from "$lib/assets/rutgers.png";
    import cyberark from "$lib/assets/cyberark.png";
    import panw from "$lib/assets/panw.svelte";
    
    import type { Component } from "svelte";

    export type Experience = {
        company: string;
        title: string;
        hiddenKeywords?: string[];
        date: string;
        logoPath?: string;
        logoComponent?: Component;
        summary: string[];
    }

    let {
        saveViewStateAndSelectExperience,
    } = $props<{
        saveViewStateAndSelectExperience: (experience: Experience) => void;
    }>();

    const experiences: Experience[] = [
        {
            "company": "palo alto networks",
            "title": "associate sre",
            "hiddenKeywords": ["site reliability engineer", "site reliability", "palo alto", "networks", "panw"],
            "date": "02/26 - today",
            "logoComponent": panw,
            "summary": [
                "via CyberArk acq (was technically full-time in CyberArk but only for a month)",
                "technical lead for AI agents in production engineering (SRE, devops, etc) teams",
                "enterprise-ready AI agents: secure, compliant, auditable, accurate - already transforming how SREs work",
                "production-safe autoremediations: observable, resilient, strict, idempotent, and easy to write - scaling self-healing infrastructure safely"
            ],
        },
        {
            company: "rutgers",
            title: "cs",
            hiddenKeywords: ["computer science", "rutgers university", "major", "education", "school"],
            date: "09/22 - 12/25",
            logoPath: rutgers,
            summary: [
                "twas school"
            ],
        },
        {
            company: "cyberark",
            title: "sre intern",
            hiddenKeywords: ["site reliability engineer", "site reliability", "cyberark"],
            date: "05/25 - 08/25",
            logoPath: cyberark,
            summary: [
                "RnD on AI agents in SRE: foundational work, rolled out internally",
                "autoremediation platform for toil-heavy alerts: QA-ready, with strictly defined production rollout criteria"
            ],
        },
        {
            company: "acl agency",
            title: "swe intern",
            hiddenKeywords: ["software engineer", "software engineering"],
            date: "05/24 - 08/24",
            summary: [
                "basic full stack work (SvelteKit, Go) and small infra migration to EC2 w/ autoscaling groups."
            ],
        }
    ];
</script>

{#each experiences as experience, index}
    <Item
        value={`pos=${index}-${experience.company}-${experience.title}`}
        keywords={["career", "experiences", "experience", "work", "job"].concat(experience.hiddenKeywords || [])}
        class="group flex items-center justify-between gap-2 w-full hover:cursor-pointer"
        onSelect={() => saveViewStateAndSelectExperience(experience)}
    >
        <div class="flex items-center gap-2 min-w-0 flex-1">
            <!-- since these are all local images, no need to wait for loading -->
            <Avatar.Root class="size-4 rounded-none" loadingStatus={experience.logoPath ? "loaded" : "error"}>
                {#if experience.logoPath}
                    <Avatar.Image
                        src={experience.logoPath}
                        alt={experience.company}
                    />
                {:else if experience.logoComponent}
                    <experience.logoComponent class="block size-4 text-muted-foreground" />
                {:else}
                    <Avatar.Fallback class="text-xs bg-muted rounded-full">
                        {experience.company[0].toUpperCase()}
                    </Avatar.Fallback>
                {/if}
            </Avatar.Root>
            <div class="flex items-center gap-2 truncate">
                <span>{experience.company}</span>
                <span class="text-muted-foreground text-xs truncate">/ {experience.title}</span>
            </div>
        </div>
        <p class="flex flex-row items-center gap-2 text-xs text-muted-foreground max-w-36 sm:max-w-none truncate">
            {experience.date}
            <ChevronRight class="size-4 text-amber-500 transition-transform group-hover:translate-x-1 group-hover:scale-110"/>
        </p>
    </Item>
{/each}