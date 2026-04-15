<script lang="ts">
    import "../app.css";
    import { ModeWatcher, toggleMode, mode } from "mode-watcher";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    
    import { themeLoaded, darkChecked} from "$lib/stores/darkMode";
    
    let { children } = $props();

    onMount(() => {
        if (browser) {
            darkChecked.update((v) => mode.current === "dark");
            themeLoaded.update((v) => true);
        }
    });

    function handleKeydownTheme(e: KeyboardEvent) {
        if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            toggleMode();
            darkChecked.update((v) => !v);
        }
    };
</script>

<svelte:document onkeydown={handleKeydownTheme} />

<ModeWatcher />
<div class="h-dvh w-dvh font-mono">
    <main
        class="h-full w-full"
    >
        {@render children()}
    </main>
</div>