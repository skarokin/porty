<script lang="ts">
    import { Command as CommandPrimitive } from 'bits-ui';
    import { cn } from '$lib/utils.js';
    import ExternalLink from "@lucide/svelte/icons/external-link";
    import Search from "@lucide/svelte/icons/search";

    let {
        ref = $bindable(null),
        class: className,
        value = $bindable(''),
        ...restProps
    }: CommandPrimitive.InputProps = $props();
</script>

<div class="flex items-center border-b px-3" data-command-input-wrapper="">
    <div class="pr-3 mr-3 border-r h-full flex items-center">
        <Search class="sm:hidden size-4 text-muted-foreground" />
        <kbd
            class="hidden sm:inline-flex bg-muted text-muted-foreground pointer-events-none h-5 select-none items-center gap-1 rounded border px-1.5 text-xs"
        >
            <span>⌘</span><span>k</span>
        </kbd>
    </div>
    <CommandPrimitive.Input
        class={cn(
            'placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className
        )}
        bind:ref
        bind:value
        {...restProps}
    />
    <div class="pl-3 h-full flex items-center">
        <kbd
            class="hidden sm:inline-flex bg-muted text-muted-foreground pointer-events-none h-5 select-none items-center gap-1 rounded border px-1.5 text-xs mr-2"
        >
            <span>↑</span><span>↓</span>
        </kbd>
        <kbd
            class="hidden sm:inline-flex bg-muted text-muted-foreground pointer-events-none h-5 select-none items-center gap-1 rounded border px-1.5 text-xs"
        >
            <ExternalLink class="size-3 text-muted-foreground" />
            <span>enter</span>
        </kbd>
    </div>
</div>