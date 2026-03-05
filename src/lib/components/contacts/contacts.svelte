<script lang=ts>
    import Phone from "@lucide/svelte/icons/phone";
    import SignalZero from "@lucide/svelte/icons/signal-zero";
    import SignalLow from "@lucide/svelte/icons/signal-low";
    import SignalMedium from "@lucide/svelte/icons/signal-medium";
    import SignalHigh from "@lucide/svelte/icons/signal-high";
    import Signal from "@lucide/svelte/icons/signal";
    import GitHub from "@lucide/svelte/icons/github";
    import Email from "@lucide/svelte/icons/mail";
    import Linkedin from "@lucide/svelte/icons/linkedin";

    import DiscordDark from "$lib/assets/discord-dark.svelte";
    import DiscordLight from "$lib/assets/discord-light.svelte";

    import type { Component } from "svelte";

    type Contact = {
        type: string;
        value: string;
        href: string;
        icon: Component;
        iconLight?: Component;
        pref: Component;
    }

    const contacts: Contact[] = [
        {
            type: 'discord',
            value: 'skarokin',
            href: 'https://discord.com/users/257628157237133313',
            icon: DiscordDark,
            iconLight: DiscordLight,
            pref: Signal,
        },
        {
            type: 'email',
            value: 'taemin.kim0327@gmail.com',
            href: 'mailto:taemin.kim0327@gmail.com',
            icon: Email,
            pref: SignalHigh,
        },
        {
            type: 'linkedin',
            value: 'kimtaemin',
            href: 'https://linkedin.com/in/kimtaemin',
            icon: Linkedin,
            pref: SignalMedium,
        },
        {
            type: 'phone',
            value: '201-937-7441',
            href: 'tel:2019377441',
            icon: Phone,
            pref: SignalLow,
        },
        {
            type: 'github',
            value: 'skarokin',
            href: 'https://github.com/skarokin',
            icon: GitHub,
            pref: SignalZero,
        },
    ];
    
</script>

<div class="panel h-full">
    <div class="panel-header">
        <span class="panel-title">contacts</span>
        <span class="text-[10px] text-muted-foreground">pref ↓</span>
    </div>
    <div class="divide-y divide-[hsl(var(--panel-border))]">
        {#each contacts as contact}
            <a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between gap-2 w-full px-3 py-2 row-hover"
            >
                <div class="flex items-center gap-2.5 min-w-0 flex-1">
                    {#if contact.iconLight}
                        <span class="inline-flex items-center justify-center size-4 flex-shrink-0 overflow-hidden"><contact.iconLight class="w-4 h-4" /></span>
                    {/if}
                    <span class="inline-flex items-center justify-center size-4 flex-shrink-0 overflow-hidden"><contact.icon class="block w-4 h-4 text-muted-foreground" /></span>
                    <div class="flex items-center gap-2 min-w-0">
                        <span class="text-sm">{contact.type}</span>
                        <span class="text-muted-foreground text-xs truncate hidden sm:inline">/ {contact.value}</span>
                    </div>
                </div>
                <contact.pref class="text-emerald-400 size-4 flex-shrink-0" />
            </a>
        {/each}
    </div>
</div>