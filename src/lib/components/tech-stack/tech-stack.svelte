<script lang="ts">
    import { Item } from "$lib/components/ui/command"
    import * as Avatar from "$lib/components/ui/avatar/index.js";

    import gopherDance from "$lib/assets/gopher-dance.gif";
    import Typescript from "$lib/assets/typescript.svelte";
    import Svelte from "$lib/assets/svelte.svelte";
    import Postgres from "$lib/assets/postgres.svelte";
    import AWS from "$lib/assets/aws.svelte";
    import Kafka from "$lib/assets/kafka.svelte";
    import Cloudflare from "$lib/assets/cloudflare.svelte";

    import type { Component } from "svelte";

    type Tech = {
        name: string;
        purpose: string;
        logoPath?: string;  // for non-svg
        logo?: Component;   
        started: string;
        hiddenKeywords?: string[];
    }

    const techStack: Tech[] = [ 
        {
            name: "go",
            purpose: "literally everything",
            logoPath: gopherDance,
            started: "05/24",
            hiddenKeywords: ["golang", "programming language", "backend", "server", "api"]
        },
        {
            name: "typescript",
            purpose: "ts pmo 🥀💔",
            logo: Typescript,
            started: "03/25",
            hiddenKeywords: ["typescript", "programming language", "ts", "js", "javascript"],
        },   
        {
            name: "sveltekit",
            purpose: "the future",
            logo: Svelte,
            started: "05/24",
            hiddenKeywords: ["framework", "frontend", "react", "vue", "angular", "nextjs", "next"]
        },
        {
            name: "cloudflare",
            purpose: "vercel bills were crazy",
            logo: Cloudflare,
            started: "04/25",
            hiddenKeywords: ["cloudflare", "vercel", "hosting", "cdn"]
        },
        {
            name: "postgres",
            purpose: "tried to love nosql",
            logo: Postgres,
            started: "03/25",
            hiddenKeywords: ["database", "sql", "nosql", "mongodb", "mysql", "db", "postgresql"]
        },
        {
            name: "aws",
            purpose: "but i love gcp",
            logo: AWS,
            started: "11/23",
            hiddenKeywords: ["cloud", "aws", "amazon", "azure", "cloudflare", "google", "gcp"] 
        },
        {
            name: "kafka",
            purpose: "flow like water",
            logo: Kafka,
            started: "05/25",
            hiddenKeywords: ["streaming", "kafka", "pubsub", "message queue", "queue", "rabbitmq"]
        },
    ];
</script>

{#each techStack as tech, index}
    <Item
        value={`pos=${index}-${tech.name}`}
        keywords={["technology", "technologies", "tech", "tech stack", "stack"].concat(tech.hiddenKeywords || [])}
        class="flex items-center justify-between gap-2 w-full"
    >
        <div class="flex items-center gap-2 truncate max-w-48 sm:max-w-none">
            <Avatar.Root class="size-4 rounded-none" loadingStatus={tech.logoPath ? "loaded" : "error"}>
                {#if tech.logoPath}
                    <Avatar.Image
                        src={tech.logoPath}
                        alt={tech.name}
                    />
                {:else if tech.logo}
                    <tech.logo class="size-4" />
                {:else}
                    <Avatar.Fallback class="text-xs bg-muted rounded-full">
                        {tech.name[0].toUpperCase()}
                    </Avatar.Fallback>
                {/if}
            </Avatar.Root>
            <div class="flex items-baseline gap-2 truncate">
                <span>{tech.name}</span>
                <span class="text-muted-foreground text-xs truncate">/ {tech.purpose}</span>
            </div>
        </div>
        <p class="text-xs text-muted-foreground max-w-36 sm:max-w-none truncate">since {tech.started}</p>
    </Item>
{/each}