<script lang=ts>
    import { LinkItem } from "$lib/components/ui/command"

    import SignalZero from "@lucide/svelte/icons/signal-zero";
    import SignalLow from "@lucide/svelte/icons/signal-low";
    import SignalMedium from "@lucide/svelte/icons/signal-medium";
    import SignalHigh from "@lucide/svelte/icons/signal-high";

    import type { Component } from "svelte";

    type Contact = {
        type: string;
        value: string;
        href: string;
        icon?: Component;
        iconLight?: Component;
        pref: Component;
    }

    const contacts: Contact[] = [
        {
            type: 'email',
            value: 'taemin.kim0327@gmail.com',
            href: 'mailto:taemin.kim0327@gmail.com',
            pref: SignalHigh,
        },
        {
            type: 'linkedin',
            value: 'kimtaemin',
            href: 'https://linkedin.com/in/kimtaemin',
            pref: SignalMedium,
        },
        {
            type: 'phone',
            value: '201-937-7441',
            href: 'tel:2019377441',
            pref: SignalLow,
        },
        {
            type: 'github',
            value: 'skarokin',
            href: 'https://github.com/skarokin',
            pref: SignalZero,
        },
    ];
    
</script>

{#each contacts as contact, index}
    <LinkItem
        href={contact.href}
        target="_blank"
        rel="noopener noreferrer"
        value={`pos=${index}-${contact.type}-${contact.value}`}
        keywords={["contacts", "contact", "call", "speak", "message", "connect", "reach", "social"]}
        class="flex items-center justify-between gap-2 w-full hover:cursor-pointer"
    >
        <div class="flex items-center gap-2 min-w-0 flex-1">
            <div class="flex items-center gap-2 min-w-0">
                <span>{contact.type}</span>
                <span class="text-muted-foreground text-xs truncate">/ {contact.value}</span>
            </div>
        </div>
        <span class="flex flex-row items-center gap-2 text-muted-foreground text-xs">
            pref:
            <contact.pref class="text-amber-500 size-4" />
        </span>
    </LinkItem>
{/each}