<script lang="ts">
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
        onSelect,
    } = $props<{
        onSelect: (experience: Experience) => void;
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

<div class="panel h-full">
    <div class="panel-header">
        <span class="panel-title">experiences</span>
        <span class="text-[10px] text-muted-foreground">{experiences.length} entries</span>
    </div>
    <div class="divide-y divide-[hsl(var(--panel-border))]">
        {#each experiences as experience}
            <button
                class="flex items-center justify-between gap-2 w-full px-3 py-2.5 text-left row-hover group cursor-pointer"
                onclick={() => onSelect(experience)}
            >
                <div class="flex items-center gap-2.5 min-w-0 flex-1">
                    <Avatar.Root class="size-5 rounded-none flex-shrink-0" loadingStatus={experience.logoPath ? "loaded" : "error"}>
                        {#if experience.logoPath}
                            <Avatar.Image src={experience.logoPath} alt={experience.company} />
                        {:else if experience.logoComponent}
                            <experience.logoComponent class="block size-5 text-muted-foreground" />
                        {:else}
                            <Avatar.Fallback class="text-[10px] bg-muted rounded-full size-5">
                                {experience.company[0].toUpperCase()}
                            </Avatar.Fallback>
                        {/if}
                    </Avatar.Root>
                    <div class="flex items-center gap-2 min-w-0 truncate">
                        <span class="text-sm">{experience.company}</span>
                        <span class="text-muted-foreground text-xs truncate">/ {experience.title}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                    <span class="text-[11px] text-muted-foreground hidden sm:inline">{experience.date}</span>
                    <ChevronRight class="size-3.5 text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                </div>
            </button>
        {/each}
    </div>
</div>