<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar/index.js";

    import gopherDance from "$lib/assets/gopher-dance.gif";
    import Typescript from "$lib/assets/typescript.svelte";
    import Svelte from "$lib/assets/svelte.svelte";
    import Postgres from "$lib/assets/postgres.svelte";
    import AWS from "$lib/assets/aws.svelte";
    import Cloudflare from "$lib/assets/cloudflare.svelte";
    import Terraform from "$lib/assets/terraform.svelte";
    import Jenkins from "$lib/assets/jenkins.svelte";

    import type { Component } from "svelte";

    type Tech = {
        name: string;
        logoPath?: string;
        logo?: Component;   
        started: string;
        hiddenKeywords?: string[];
    }

    const techStack: Tech[] = [ 
        {
            name: "go",
            logoPath: gopherDance,
            started: "05/24",
            hiddenKeywords: ["golang", "programming language", "backend", "server", "api"]
        },
        {
            name: "typescript",
            logo: Typescript,
            started: "03/25",
            hiddenKeywords: ["typescript", "programming language", "ts", "js", "javascript"],
        },   
        {
            name: "sveltekit",
            logo: Svelte,
            started: "05/24",
            hiddenKeywords: ["framework", "frontend", "react", "vue", "angular", "nextjs", "next"]
        },
        {
            name: "postgres",
            logo: Postgres,
            started: "03/25",
            hiddenKeywords: ["database", "sql", "nosql", "mongodb", "mysql", "db", "postgresql"]
        },
        {
            name: "cloudflare",
            logo: Cloudflare,
            started: "04/25",
            hiddenKeywords: ["cloudflare", "vercel", "hosting", "cdn"]
        },
        {
            name: "aws",
            logo: AWS,
            started: "11/23",
            hiddenKeywords: ["cloud", "aws", "amazon", "azure", "cloudflare", "google", "gcp"] 
        },
        {
            name: "terraform",
            logo: Terraform,
            started: "05/25",
            hiddenKeywords: ["infrastructure as code", "iac", "sre", "devops", "kubernetes", "k8s"]
        },
        {
            name: "jenkins",
            logo: Jenkins,
            started: "05/25",
            hiddenKeywords: ["ci", "cd", "cicd", "sre", "devops", "kubernetes", "k8s"]
        }
    ];

    function monthsSince(dateStr: string): string {
        const [month, year] = dateStr.split('/').map(Number);
        const start = new Date(2000 + year, month - 1);
        const now = new Date();
        const months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
        if (months >= 12) {
            const y = Math.floor(months / 12);
            const m = months % 12;
            return m > 0 ? `${y}y ${m}m` : `${y}y`;
        }
        return `${months}m`;
    }
</script>

<div class="panel h-full">
    <div class="panel-header">
        <span class="panel-title">tech stack</span>
        <span class="text-[10px] text-muted-foreground">{techStack.length} technologies</span>
    </div>
    <div class="panel-body grid grid-cols-2 gap-2">
        {#each techStack as tech}
            <div class="flex items-center gap-2 rounded px-2 py-1.5 bg-muted/20 hover:bg-muted/40 transition-colors">
                {#if tech.logoPath}
                    <Avatar.Root class="size-4 rounded-none flex-shrink-0" loadingStatus="loaded">
                        <Avatar.Image src={tech.logoPath} alt={tech.name} />
                        <Avatar.Fallback class="text-[10px] bg-muted rounded-full size-4">
                            {tech.name[0].toUpperCase()}
                        </Avatar.Fallback>
                    </Avatar.Root>
                {:else if tech.logo}
                    <span class="inline-flex items-center justify-center size-4 flex-shrink-0 overflow-hidden"><tech.logo class="size-4 w-4 h-4 max-w-4 max-h-4" /></span>
                {:else}
                    <span class="size-4 flex-shrink-0 bg-muted rounded-full text-[10px] flex items-center justify-center">
                        {tech.name[0].toUpperCase()}
                    </span>
                {/if}
                <div class="flex flex-col min-w-0">
                    <span class="text-xs">{tech.name}</span>
                    <span class="text-[10px] text-muted-foreground">{monthsSince(tech.started)}</span>
                </div>
            </div>
        {/each}
    </div>
</div>