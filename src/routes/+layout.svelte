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
<div class="h-screen flex flex-col items-center w-full font-mono">
	<header class="shrink-0 border-zinc-700 border-b border-dashed w-full">
		<div class="flex justify-between border-zinc-700 border-none sm:border-x sm:border-dashed mx-auto container p-4">
			<h1 class="text-xs font-bold">[skarokin]</h1>
            <div class="flex items-center gap-2">
                <Switch 
                    id="theme-switch"
                    onclick={toggleMode}
                    bind:checked={checked}
                    loaded={themeLoaded}
                />
                <Label for="theme-switch" class="text-xs">
                    <kbd
                        class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 text-[10px]"
                    >
                        <span class="text-xs">⌘</span>l
                    </kbd>
                </Label>
            </div>
		</div>
	</header>
    <main
        class="grow border-zinc-700 container p-4 w-full overflow-auto border-none sm:border-x sm:border-dashed"
    >
        {@render children()}
    </main>
    <footer class="shrink-0 flex-none border-zinc-700 border-t border-dashed w-full">
		<div class="flex flex-row justify-between border-zinc-700 border-none sm:border-x sm:border-dashed mx-auto container p-4">
            <p class="text-xs text-muted-foreground">
        	    [&copy; lil milk]
            </p>
            <a 
                class="text-xs text-muted-foreground hover:underline"
                href="https://github.com/skarokin/porty"
                target="_blank"
                rel="noopener noreferrer"
            >
                [gyatthub repo]
            </a>
        </div>
    </footer>
</div>
