<script lang=ts>
    import { LinkItem } from "$lib/components/ui/command"

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

{#each contacts as contact, index}
    <LinkItem
        href={contact.href}
        target="_blank"
        value={`pos=${index}-${contact.type}-${contact.value}`}
        keywords={["contacts", "contact", "call", "speak", "message", "connect", "reach", "social"]}
        class="flex items-center justify-between gap-2 w-full hover:cursor-pointer"
    >
        <div class="flex items-center gap-2">
            {#if contact.iconLight}
                <contact.iconLight
                    class="size-4" 
                />
            {/if}
            <contact.icon
                class="block size-4 text-muted-foreground"
            />

            <div class="flex items-baseline gap-2 truncate max-w-48 sm:max-w-none">
                <span>{contact.type}</span>
                <span class="text-muted-foreground text-xs truncate">/ {contact.value}</span>
            </div>
        </div>
        <span class="flex flex-row gap-2 text-muted-foreground text-xs max-w-36 sm:max-w-none truncate">
            pref:
            <contact.pref class="text-amber-500 size-4" />
        </span>
    </LinkItem>
{/each}