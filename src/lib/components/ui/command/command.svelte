<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		value = $bindable(""),
		ref = $bindable(null),
		primitiveRef = $bindable(null),
		class: className,
		...restProps
	}: CommandPrimitive.RootProps & { 
		primitiveRef?: CommandPrimitive.Root | null
	} = $props();
</script>

<CommandPrimitive.Root
	class={cn(
		"bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
		className
	)}
	bind:ref
	bind:value
	bind:this={primitiveRef}
	{...restProps}
/>
