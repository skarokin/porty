<script lang="ts">
    import "../app.css";
    import { ModeWatcher, toggleMode, mode } from "mode-watcher";
    import { Switch } from "$lib/components/ui/switch";
    import { Label } from "$lib/components/ui/label";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { blur, fade } from "svelte/transition";
    import { sineInOut, cubicInOut } from "svelte/easing";

    let { children } = $props();

    let themeLoaded = $state(false);
    let checked = $state(false);

    let layoutLoaded = $state(false);
    let contentReady = $state(false);

    onMount(() => {
        if (browser) {
            checked = mode.current === "dark";
            themeLoaded = true;

            setTimeout(() => {
                layoutLoaded = true;

                setTimeout(() => {
                    contentReady = true;
                }, 700);
            }, 100);
        }
    });

    function handleKeydownTheme(e: KeyboardEvent) {
        if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            toggleMode();
            checked = !checked;
        }
    };

    function scaleX(node: any, options: any) {
        return {
            duration: options.duration,
            easing: cubicInOut,
            css: (t: any) => `transform:scaleX(${t}); transform-origin: center;`
        }
    } 
</script>

<svelte:document onkeydown={handleKeydownTheme} />

<ModeWatcher />
<div class="h-dvh flex flex-col font-mono overflow-hidden">
    {#if layoutLoaded}
        <header
            class="flex-none border-zinc-700 border-b border-dashed w-full"
            in:scaleX={{ duration: 300, start: 0.1, easing: sineInOut }}
        >
            <div class="h-full flex items-center justify-between border-zinc-700 border-none sm:border-x sm:border-dashed mx-auto container p-4">
                <a class="text-xs font-bold hover:underline" href="/">
                    &#123;skarokin&#125;
                </a>
                <div class="flex items-center gap-2">
                    <Switch 
                        id="theme-switch"
                        onclick={toggleMode}
                        bind:checked={checked}
                        loaded={themeLoaded}
                    />
                    <Label for="theme-switch" class="text-xs">
                        <kbd
                            class="hidden sm:inline-flex bg-muted text-muted-foreground pointer-events-none h-5 select-none items-center gap-1 rounded border px-1.5 text-xs"
                        >
                            <span>⌘</span><span>l</span>
                        </kbd>
                    </Label>
                </div>
            </div>
        </header>
        <main
            class="flex-1 border-zinc-700 container p-4 w-full border-none sm:border-x sm:border-dashed flex flex-col justify-center"
            class:overflow-auto={contentReady}
            class:overflow-hidden={!contentReady}
            in:scaleX={{ duration: 300, start: 0.1, easing: sineInOut }}
        >
            {#if contentReady}
                <!--  in:blur delay overlaps with out:blur of loading state for smooth transition --> 
                <div
                    class="w-full h-full"
                    in:blur={{ duration: 200, easing: cubicInOut, delay: 100 }}
                >
                    {@render children()}
                </div>

            {:else}
                <!-- preload all children to avoid flicker -->
                <div class="fixed invisible pointer-events-none">
                    {@render children()}
                </div>
            {/if}
        </main>
        <footer
            class="flex-none border-zinc-700 border-t border-dashed w-full"
            in:scaleX={{ duration: 300, start: 0.1, easing: sineInOut }}
        >
            <div class="h-full flex flex-row items-center justify-between border-zinc-700 border-none sm:border-x sm:border-dashed mx-auto container p-4">
                <p class="text-xs text-muted-foreground">
                    &#123;&copy; skim&#125;
                </p>
                <a 
                    class="text-xs text-muted-foreground hover:underline"
                    href="https://github.com/skarokin/porty"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    &#123;git repo&#125;
                </a>
            </div>
        </footer>
    {/if}
    {#if !contentReady && layoutLoaded}
        <div 
            class="absolute inset-0 flex items-center justify-center"
            in:fade={{ duration: 200, easing: cubicInOut, delay: 100 }}
            out:fade={{ duration: 200, easing: cubicInOut }}
        >
            <div
                class="text-sm font-mono text-muted-foreground"
            >
                <span class="text-purple-400">import</span> <span class="text-emerald-400">"github.com/skarokin/porty"</span><br/>
                <br/>
                <span class="text-purple-400">func</span> <span class="text-blue-400">main</span>() &#123;
                <br/>
                &nbsp;&nbsp;porty.<span class="text-blue-400">Serve</span>(<span class="text-emerald-400">":8080"</span>)
                <br/>
                &#125;
            </div>
        </div>
    {/if}
</div>