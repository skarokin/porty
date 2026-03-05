<script lang="ts">
    import "../app.css";
    import { ModeWatcher, toggleMode, mode } from "mode-watcher";
    import { Switch } from "$lib/components/ui/switch";
    import { Label } from "$lib/components/ui/label";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { fade } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    
    let { children } = $props();

    let themeLoaded = $state(false);
    let checked = $state(false);
    let ready = $state(false);

    onMount(() => {
        if (browser) {
            checked = mode.current === "dark";
            themeLoaded = true;
            setTimeout(() => { ready = true; }, 100);
        }
    });

    function handleKeydownTheme(e: KeyboardEvent) {
        if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            toggleMode();
            checked = !checked;
        }
    };
</script>

<svelte:document onkeydown={handleKeydownTheme} />

<ModeWatcher />
<div class="h-dvh flex flex-col overflow-hidden">
    {#if ready}
        <header
            class="flex-none border-b w-full bg-card/80 backdrop-blur-sm z-10"
            in:fade={{ duration: 300, easing: cubicInOut }}
        >
            <div class="flex items-center justify-between mx-auto max-w-7xl px-4 py-2">
                <div class="flex items-center gap-4">
                    <a class="text-xs font-bold hover:text-primary transition-colors flex items-center gap-2" href="/">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        skarokin / dashboard
                    </a>
                    <span class="hidden sm:inline text-border">│</span>
                    <span class="hidden sm:inline-flex text-[10px] text-muted-foreground tracking-wider">SRE · AI AGENTS · INFRA</span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span class="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        us-east-1
                    </span>
                    <Switch 
                        id="theme-switch"
                        onclick={toggleMode}
                        bind:checked={checked}
                        loaded={themeLoaded}
                    />
                    <Label for="theme-switch" class="text-xs">
                        <kbd class="hidden sm:inline-flex bg-muted text-muted-foreground pointer-events-none h-5 select-none items-center gap-1 rounded border px-1.5 text-[10px]">
                            <span>⌘</span><span>l</span>
                        </kbd>
                    </Label>
                </div>
            </div>
        </header>
        <main
            class="flex-1 overflow-auto z-10"
            in:fade={{ duration: 300, easing: cubicInOut, delay: 100 }}
        >
            {@render children()}
        </main>
        <footer
            class="flex-none border-t w-full bg-card/80 backdrop-blur-sm z-10"
            in:fade={{ duration: 300, easing: cubicInOut }}
        >
            <div class="flex items-center justify-between mx-auto max-w-7xl px-4 py-1.5">
                <div class="flex items-center gap-3">
                    <p class="text-[10px] text-muted-foreground">&copy; skim</p>
                    <span class="hidden sm:inline text-border">│</span>
                    <span class="hidden sm:inline text-[10px] text-muted-foreground">svelte · go · ts</span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-500/60">
                        <span class="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        all systems operational
                    </span>
                    <span class="hidden sm:inline text-border">│</span>
                    <a class="text-[10px] text-muted-foreground hover:text-primary transition-colors"
                        href="https://github.com/skarokin/porty" target="_blank" rel="noopener noreferrer">
                        src
                    </a>
                </div>
            </div>
        </footer>
    {/if}
</div>