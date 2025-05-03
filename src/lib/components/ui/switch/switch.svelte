<script lang="ts">
	import Sun from "@lucide/svelte/icons/sun";
	import Moon from "@lucide/svelte/icons/moon";

	import { Switch as SwitchPrimitive, type WithoutChildrenOrChild } from "bits-ui";
	import { cn } from "$lib/utils.js";

	import { scale } from "svelte/transition";
	import { cubicOut } from "svelte/easing";

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		class: className,
		loaded = $bindable(false),
		...restProps
	}: WithoutChildrenOrChild<SwitchPrimitive.RootProps> & {
		loaded?: boolean;
	} = $props();
</script>

<SwitchPrimitive.Root
	bind:ref
	bind:checked
	class={cn(
		"focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{...restProps}
>
	{#if loaded}
		<!-- transition elements can only be used in DOM elements, not on components, so wrap it in a div -->
		<div in:scale={{duration: 150, start: 0.5, easing: cubicOut}}>
			<SwitchPrimitive.Thumb
				class={cn(
					"bg-background pointer-events-none block size-4 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
				)}
			>
				{#if checked}
					<Moon class="size-4 text-indigo-300" />
				{:else}
					<Sun class="size-4 text-amber-500" />
				{/if}
			</SwitchPrimitive.Thumb>
		</div>
	{/if}
</SwitchPrimitive.Root>
