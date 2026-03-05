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
                "via CyberArk acq, transitioned into the newly-created Foundry team, writing automation and agents for the whole company, not just Identity.",
                "continued work on the SRE & incident management agent - made it enterprise ready with RBAC, multi-tenancy, better security, better guardrails, \
                and strict observability and cost control. many success stories, demos to executives, and company-wide adoption.",
                "onboarded 5 new engineers to help scale the project, leading the design and architecture effort on scaling to more teams and use cases across the company.",
                "architecting an A2A gateway to centralize LLM infrastructure — brokers inference between teams' agents and tools \
                while keeping auth, data, and deployments isolated. unified observability, billing, security, and performance optimizations across all tenants.",
                "continued work on the auto-remediation platform - added a phased QA -> staging -> prod rollout process, replaced logs with traces, and made workflow more robust and extendible with Step Functions. \
                implemented more playbooks, eventually handing off the project to the Identity team to focus deeply on AI agent work; still closely collaborating on the platform.",
                "serve as the primary technical lead in the Production Engineering AI Guild, a cross-team effort to adopt AI agents in production engineering."
            ],
        },
        {
            company: "rutgers",
            title: "cs",
            hiddenKeywords: ["computer science", "rutgers university", "major", "education", "school"],
            date: "09/22 - 12/25",
            logoPath: rutgers,
            summary: [
                "bachelor's in computer science.",
                "really enjoyed my deep learning class - final paper was evaluating different RL methods on Street Fighter II. proud to say I did all the model training on my 4070.",
                "struggled a lot in intro CS... my first time ever programming. ended up being the only CS class i didn't get an A in."
            ],
        },
        {
            company: "cyberark",
            title: "sre intern",
            hiddenKeywords: ["site reliability engineer", "site reliability", "cyberark"],
            date: "05/25 - 08/25",
            logoPath: cyberark,
            summary: [
                "worked in the Identity team, responsible for automation and agent development.",
                "main intern project - an SRE & incident management AI agent with deep integrations to internal systems, code, observability, and knowledge bases.",
                "secondary intern project - an auto-remediation platform where developers write Python playbooks to remediate alerts with deep observability and monitoring of automation performance.",
                "developed many internal tools, dashboards, and one-off automations.",
                "contributed performance optimizations & bug fixes to internal tenant management tool."
            ],
        },
        {
            company: "acl agency",
            title: "swe intern",
            hiddenKeywords: ["software engineer", "software engineering"],
            date: "05/24 - 08/24",
            summary: [
                "re-built company website in SvelteKit.",
                "migrated legacy infra to autoscaling EC2.",
                "implemented OCR service in Go."
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