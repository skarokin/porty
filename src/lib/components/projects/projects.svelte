<script lang="ts">
    import { Item } from "$lib/components/ui/command";
    import Link from "@lucide/svelte/icons/link";
    import GitHub from "@lucide/svelte/icons/github";
    import ChevronRight from "@lucide/svelte/icons/chevron-right";

    export type TechDetail = {
        tech: string;
        purpose: string;
        results: string;
    };

    export type Project = {
        name: string;
        description: string;
        date: string;
        link?: string;
        github: string;
        techStack: TechDetail[];
    };

    let {
        saveViewStateAndSelectProject,
    } = $props<{
        saveViewStateAndSelectProject: (project: Project) => void;
    }>();

    const projects: Project[] = [
        {
            name: "copium.dev",
            description: `your win condition in the tech career game. connect with recruiters, find opportunities as soon as they drop, 
             access powerful application management tools and data-driven insights, share your journey with friends, review company data, 
             and get hired-faster.`,
            date: "01/25 - 06/25",
            link: "https://copium.dev/",
            github: "https://github.com/copium-dev/copium",
            techStack: [
                {
                    tech: "sveltekit & cloudflare",
                    purpose: "frontend development",
                    results: "cool ui, great ux, easy dev, and fast.",
                },
                {
                    tech: "algolia",
                    purpose: "search engine",
                    results: "real-time search and filtering on internship postings or user's tracked applications."
                },
                {
                    tech: "go & firestore",
                    purpose: "rest api & storage",
                    results: "front-facing rest api for authentication, algolia searching, and data analytics."
                },
                {
                    tech: "gcp pub/sub",
                    purpose: "messaging",
                    results: "decoupled and fault-tolerant algolia indexing and bigquery analytics with compensating transactions and retries for eventual consistency."
                },
                {
                    tech: "bigquery & cqrs",
                    purpose: "real-time analytics",
                    results: "personalized insights by tracking monthly trends, leveraging a denormalized schema and CQRS for fast queries."
                },
                {
                    tech: "docker & gcp",
                    purpose: "deployment",
                    results: "containerized, scalable, and fault-tolerant deployment across VM instances and cloud run services."
                },
                {
                    tech: "python",
                    purpose: "data scraping",
                    results: "scheduled tech internship posting scraping for focused and fresh data on a compute engine instance."
                }
            ],
        },
        {
            name: "ref:note",
            description: `student-focused note sharing platform with real-time collaboration, leveraging horizontally-scaling websocket servers.`,
            date: "08/24 - 09/24",
            link: "https://refnote.app/",
            github: "https://github.com/skarokin/ref-note",
            techStack: [
                {
                    tech: "next.js & vercel",
                    purpose: "frontend development",
                    results:
                        "combination of csr and ssr, api routes for authentication, and dynamic routing.",
                },
                {
                    tech: "go & firestore",
                    purpose: "rest api & crud",
                    results:
                        "front-facing rest api for crud and granular note sharing.",
                },
                {
                    tech: "node.js & websocket",
                    purpose: "real-time",
                    results:
                        "horizontally scalable websocket servers for real-time collaboration.",
                },
                {
                    tech: "redis & redis pub/sub",
                    purpose: "caching & syncing",
                    results:
                        "note content caching and eventually-consistent architecture between instances with CRDTs.",
                },
                {
                    tech: "gcp & docker",
                    purpose: "deployment",
                    results:
                        "containerized, scalable, and fault-tolerant deployment.",
                },
            ],
        },
        {
            name: "grammaCy",
            description: `generate dependency tree-based grammar checkers for any language, any dataset, and any domain.`,
            date: "03/24 - 07/24",
            link: "https://grammacy.com/",
            github: "https://github.com/skarokin/grammaCy",
            techStack: [
                {
                    tech: "python",
                    purpose: "augmentation pipeline",
                    results:
                        "injects real-world grammar errors via inflection into datasets by analyzing dependency trees, pos tags, and morphological features.",
                },
                {
                    tech: "flask",
                    purpose: "rest api",
                    results:
                        "easy api development to serve our fully-featured english grammar and spell checker.",
                },
                {
                    tech: "aws & docker & nginx",
                    purpose: "deployment",
                    results:
                        "fault-tolerant and https-secured api calls for quick, accurate, and interpretable grammar and spell checking.",
                },
                {
                    tech: "sveltekit & firebase",
                    purpose: "documentation & api reference",
                    results:
                        "interactive api reference, extensive integration guides, detailed documentation, and devblog.",
                },
            ],
        },
        {
            name: "pycaptcha",
            description: `CAPTCHA system that fetches Google Street View images to generate image-based tests.`,
            date: "01/24 - 02/24",
            github: "https://github.com/skarokin/pycaptcha",
            techStack: [
                {
                    tech: "numpy, opencv, matplotlib",
                    purpose: "image augmentation",
                    results:
                        "augmentation pipeline for more robust and diverse image-based CAPTCHAs.",
                },
                {
                    tech: "YOLOv4",
                    purpose: "object detection",
                    results:
                        "detect objects for grid-based object selection CAPTCHAs.",
                },
                {
                    tech: "pandas",
                    purpose: "data preprocessing",
                    results:
                        "process and filter images before test generation for higher quality CAPTCHAs.",
                },
            ],
        },
        {
            name: "ref:type",
            description: `competitive typing platform with real-time leaderboards.`,
            date: "11/23 - 01/24",
            link: "https://steam-link-409216.web.app/",
            github: "https://github.com/skarokin/ref-type",
            techStack: [
                {
                    tech: "react.js & firebase",
                    purpose: "frontend development",
                    results: "state management and real-time updates.",
                },
                {
                    tech: "node.js & firebase cloud functions",
                    purpose: "backend development",
                    results: "real-time leaderboards and user data.",
                },
                {
                    tech: "google cloud sql",
                    purpose: "db",
                    results: "persistent data storage for user data.",
                },
            ],
        },
        {
            name: "MYnote.md",
            description: `electron-based Markdown note-taking app with LaTeX and code block support.`,
            date: "05/23 - 06/23",
            github: "https://github.com/skarokin/MYnote.md",
            techStack: [
                {
                    tech: "node.js & electron",
                    purpose: "desktop app development",
                    results:
                        "cross-platform desktop app with native file system access.",
                },
                {
                    tech: "markdown.it",
                    purpose: "markdown parsing",
                    results:
                        "parse and render markdown with latex and code block support.",
                },
                {
                    tech: "codemirror",
                    purpose: "note editing",
                    results: "syntax highlighting and code block editing.",
                },
            ],
        },
    ];

    // prevents dialog from opening when clicking on github/link icons
    function stopPropagation(e: MouseEvent) {
        e.stopPropagation();
    }
</script>

{#each projects as project, index (project.name)}
    <Item
        value={`pos=${index}-${project.name}`}
        keywords={["projects", "project"]}
        class="group flex items-center justify-between gap-2 w-full hover:cursor-pointer"
        onSelect={() => saveViewStateAndSelectProject(project)}
    >
        <!-- THIS SPECIFICALLY SHOULD BE ITEMS-CENTER NOT BASELINE -->
        <div class="flex items-center gap-2">
            <div
                class="flex items-center gap-2 truncate max-w-48 sm:max-w-none"
            >
                {project.name}
                <span class="text-muted-foreground text-xs">/</span>
            </div>

            {#if project.link}
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-muted-foreground hover:text-primary"
                    onclick={stopPropagation}
                >
                    <Link class="size-4" />
                </a>
            {/if}

            {#if project.github}
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-muted-foreground hover:text-primary"
                    onclick={stopPropagation}
                >
                    <GitHub class="size-4" />
                </a>
            {/if}
        </div>
        <p
            class="flex flex-row items-center gap-2 text-muted-foreground text-xs"
        >
            {project.date}
            <ChevronRight class="size-4 text-amber-500 transition-transform group-hover:translate-x-1 group-hover:scale-110"/>
        </p>
    </Item>
{/each}
