<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import { Item } from "$lib/components/ui/command";
    import Link from "@lucide/svelte/icons/link";
    import GitHub from "@lucide/svelte/icons/github";
    import { Separator } from "$lib/components/ui/separator";
    import { Avatar } from "$lib/components/ui/avatar";

    type TechDetail = {
        tech: string;
        purpose: string;
        results: string;
    };

    type Project = {
        name: string;
        description: string;
        date: string;
        link?: string;
        github: string;
        techStack: TechDetail[];
    };

    const projects: Project[] = [
        {
            name: "copium.dev",
            description: `your win condition in the tech career game. connect with recruiters, find opportunities as soon as they drop, 
             access powerful application management tools and data-driven insights, share your journey with friends, review company data, 
             and get hired-faster.`,
            date: "jan 2025 - now",
            link: "https://copium.dev/",
            github: "https://github.com/copium-dev/copium",
            techStack: [
                {
                    tech: "tech stack is a secret for now :)",
                    purpose: "i wonder what it's all for...",
                    results: "we'll see soon enough!",
                }
            ]
        },
        {
            name: "ref:note",
            description: `student-focused note sharing platform with real-time collaboration, leveraging horizontally-scaling websocket servers.`,
            date: "aug 2024 - sep 2024",
            link: "https://refnote.app/",
            github: "https://github.com/skarokin/ref-note",
            techStack: [
                {
                    tech: "next.js & vercel",
                    purpose: "frontend development",
                    results: "combination of CSR and SSR, API routes for authentication, and dynamic routing."
                },
                {
                    tech: "go & firestore",
                    purpose: "REST API",
                    results: "front-facing REST API for CRUD and granular note sharing."
                },
                {
                    tech: "node.js & websocket",
                    purpose: "real-time",
                    results: "horizontally scalable WebSocket servers for real-time collaboration."
                },
                {
                    tech: "redis & redis pub/sub",
                    purpose: "caching & syncing",
                    results: "note content caching and eventually-consistent architecture between instances with CRDTs."
                },
                {
                    tech: "gcp & docker",
                    purpose: "deployment",
                    results: "containerized, scalable, and fault-tolerant deployment."
                }
            ]
        },
        {
            name: "grammaCy",
            description: `generate dependency tree-based grammar checkers for any language, any dataset, and any domain.`,
            date: "mar 2024 - jul 2024",
            link: "https://grammacy.com/",
            github: "https://github.com/skarokin/grammaCy",
            techStack: [
                {
                    tech: "python",
                    purpose: "augmentation pipeline",
                    results: "injects real-world grammar errors via inflection into datasets by analyzing dependency trees, POS tags, and morphological features."
                },
                {
                    tech: "Flask",
                    purpose: "REST API",
                    results: "easy API development to serve our fully-featured english grammar and spell checker."
                },
                {
                    tech: "aws & docker & nginx",
                    purpose: "deployment",
                    results: "fault-tolerant and HTTPS-secured API calls for quick, accurate, and interpretable grammar and spell checking.",
                },
                {
                    tech: "sveltekit & firebase",
                    purpose: "documentation & API Reference",
                    results: "interactive API reference, extensive integration guides, detailed documentation, and devblog.",
                }
            ]
        },
        {
            name: "pycaptcha",
            description: `CAPTCHA system that fetches Google Street View images to generate image-based tests.`,
            date: "jan 2024 - feb 2024",
            github: "https://github.com/skarokin/pycaptcha",
            techStack: [
                {
                    tech: "numpy, opencv, matplotlib",
                    purpose: "image augmentation",
                    results: "augmentation pipeline for more robust and diverse image-based CAPTCHAs."
                },
                {
                    tech: "YOLOv4",
                    purpose: "object detection",
                    results: "detect objects for grid-based object selection CAPTCHAs."
                },
                {
                    tech: "pandas",
                    purpose: "data preprocessing",
                    results: "process and filter images before test generation for higher quality CAPTCHAs."
                }
            ]
        },
        {
            name: "ref:type",
            description: `competitive typing platform with real-time leaderboards.`,
            date: "nov 2023 - jan 2024",
            link: "https://steam-link-409216.web.app/",
            github: "https://github.com/skarokin/ref-type",
            techStack: [
                {
                    tech: "react.js & firebase",
                    purpose: "frontend development",
                    results: "sstate management and real-time updates."
                },
                {
                    tech: "node.js & firebase cloud functions",
                    purpose: "backend development",
                    results: "real-time leaderboards and user data."
                },
                {
                    tech: "google cloud sql",
                    purpose: "Data Storage",
                    results: "persistent data storage for user data."
                }
            ]
        },
        {
            name: "MYnote.md",
            description: `electron-based Markdown note-taking app with LaTeX and code block support.`,
            date: "may 2023 - jun 2023",
            github: "https://github.com/skarokin/MYnote.md",
            techStack: [
                {
                    tech: "node.js & electron",
                    purpose: "desktop app development",
                    results: "cross-platform desktop app with native file system access."
                },
                {
                    tech: "markdown.it",
                    purpose: "markdown parsing",
                    results: "parse and render markdown with LaTeX and code block support."
                },
                {
                    tech: "codemirror",
                    purpose: "note editing",
                    results: "syntax highlighting and code block editing."
                }
            ]
        },
    ];

    // prevents dialog from opening when clicking on github/link icons
    function stopPropagation(e: MouseEvent) {
        e.stopPropagation();
    }
</script>

{#each projects as project (project.name)}
    <div class="flex flex-col">
        <Dialog.Root>
            <Dialog.Trigger>
                <Item
                    value={`projects-${project.name}`}
                    keywords={[]}
                    class="flex items-center justify-between gap-2 w-full hover:cursor-pointer"
                >
                    <div class="flex items-center items-center gap-2">
                        {project.name}
                        <span class="text-muted-foreground text-xs">/</span>

                        {#if project.link}
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-muted-foreground hover:text-primary"
                                onclick={stopPropagation}
                            >
                                <svelte:component this={Link} class="size-4" />
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
                                <svelte:component this={GitHub} class="size-4" />
                            </a>
                        {/if}
                    </div>
                    <p class="text-xs text-muted-foreground">{project.date}</p>
                </Item>
            </Dialog.Trigger>
            <Dialog.Content class="flex flex-col gap-4">
                <h1 class="text-lg font-semibold">{project.name}</h1>
                <p class="text-sm text-muted-foreground">{project.description}</p>
                <Separator orientation="horizontal" />
                    <div class="flex flex-col gap-2">
                        {#each project.techStack as tech (tech.tech)}
                            <div class="flex flex-col gap-2"> 
                                <p class="text-sm font-semibold">{tech.tech}
                                    <span class="text-xs text-muted-foreground">/ {tech.purpose}</span>
                                </p>
                                <p class="text-xs text-muted-foreground">{tech.results}</p>
                            </div>
                        {/each}
                    </div>
            </Dialog.Content>
        </Dialog.Root>
    </div>
{/each}
