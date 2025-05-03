<script lang=ts>
    import { LinkItem } from "$lib/components/ui/command"
    import Phone from "@lucide/svelte/icons/phone";
    import Mail from "@lucide/svelte/icons/mail";
    import LinkedIn from "@lucide/svelte/icons/linkedin";
    import SignalZero from "@lucide/svelte/icons/signal-zero";
    import SignalLow from "@lucide/svelte/icons/signal-low";
    import SignalMedium from "@lucide/svelte/icons/signal-medium";
    import SignalHigh from "@lucide/svelte/icons/signal-high";
    import GitHub from "@lucide/svelte/icons/github";
    import type { Component } from "svelte";

    type Contact = {
        type: string;
        value: string;
        href: string;
        icon: Component;
        priority: Component;
    }

    const contacts: Contact[] = [
        {
            type: 'email',
            value: '/ taemin.kim0327@gmail.com',
            href: 'mailto:taemin.kim0327@gmail.com',
            icon: Mail,
            priority: SignalHigh,
        },
        {
            type: 'linkedin',
            value: '/ kimtaemin',
            href: 'https://linkedin.com/in/kimtaemin',
            icon: LinkedIn,
            priority: SignalMedium,
        },
        {
            type: 'phone',
            value: '/ 201-937-7441',
            href: 'tel:2019377441',
            icon: Phone,
            priority: SignalLow,
        },
        {
            type: 'github',
            value: '/ skarokin',
            href: 'https://github.com/skarokin',
            icon: GitHub,
            priority: SignalZero,
        },
    ];
</script>

{#each contacts as contact}
    <LinkItem
        href={contact.href}
        target="_blank"
        value={`contacts-${contact.type}-${contact.value}`}
        class="flex items-center justify-between gap-2 w-full hover:cursor-pointer"
    >
        <div class="flex items-center gap-2">
            <svelte:component this={contact.icon} class="size-4 text-muted-foreground" />
            <div>
                <span>{contact.type}</span>
                <span class="text-muted-foreground text-xs">{contact.value}</span>
            </div>
        </div>
        <span class="flex flex-row gap-2 text-muted-foreground text-xs">
            pref:
            <svelte:component this={contact.priority} class="text-amber-500 size-4" />
        </span>
    </LinkItem>
{/each}