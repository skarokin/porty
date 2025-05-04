<script lang="ts">
    import "../app.css";
    import { ModeWatcher, toggleMode, mode } from "mode-watcher";
    import { Switch } from "$lib/components/ui/switch";
    import { Label } from "$lib/components/ui/label";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    let { children } = $props();

    let themeLoaded = $state(false);
    let checked = $state(false);

    onMount(() => {
        if (browser) {
            checked = mode.current === "dark";
            themeLoaded = true;
        }
    });

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            toggleMode();
            checked = !checked;
        }
    };
</script>

<svelte:document onkeydown={handleKeydown} />

<ModeWatcher />
<div class="h-dvh flex flex-col font-mono overflow-hidden">
	<header class="flex-none border-zinc-700 border-b border-dashed w-full">
		<div class="h-full flex justify-between border-zinc-700 border-none sm:border-x sm:border-dashed mx-auto container p-4">
			<h1 class="text-xs font-bold">&#123;skarokin&#125;</h1>
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
        class="flex-1 overflow-auto border-zinc-700 container p-4 w-full border-none sm:border-x sm:border-dashed flex flex-col justify-center"
    >
        {@render children()}
    </main>
    <footer class="flex-none border-zinc-700 border-t border-dashed w-full">
		<div class="h-full flex flex-row justify-between border-zinc-700 border-none sm:border-x sm:border-dashed mx-auto container p-4">
            <p class="text-xs text-muted-foreground">
        	    &#123;&copy; lil milk&#125;
            </p>
            <a 
                class="text-xs text-muted-foreground hover:underline"
                href="https://github.com/skarokin/porty"
                target="_blank"
                rel="noopener noreferrer"
            >
                &#123;gyatthub repo&#125;
            </a>
        </div>
    </footer>
</div>
