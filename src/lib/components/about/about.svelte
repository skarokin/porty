<script>
    import sean from "$lib/assets/IMG_3707.jpg";

    import House from "@lucide/svelte/icons/house";

    import { Item } from "$lib/components/ui/command";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
</script>

<Item
    class="flex flex-row gap-2 items-center justify-between"
    value="whoami-about-sean-taemin-kim-skarokin-new-jersey-bio-biography"
>
    <div class="flex flex-row gap-2 items-center">
        <Avatar.Root class="size-24 border">
            <Avatar.Image
                src={sean}
                alt="Sean Kim"
            />
            <Avatar.Fallback>lil milk</Avatar.Fallback>
        </Avatar.Root>
        <div class="flex flex-col gap-2 items-start">
            <div class="flex flex-col items-start">
                <p
                    class="text-lg font-semibold flex flex-row gap-2 items-center"
                >
                    sean kim
                    <span class="text-sm font-normal opacity-50">/ skarokin</span>
                </p>
                <p class="text-sm font-sans">김태민</p>
            </div>
            <div class="flex flex-row gap-1 items-center text-sm">
                <House size="14" />
                new jersey
            </div>
        </div>
    </div>
    <div class="text-xs text-muted-foreground flex flex-col sm:flex-row gap-1">
        <div class="flex items-center gap-1">
            <span class="sm:hidden">•</span>
            <span>svelte</span>
            <span class="hidden sm:inline">•</span>
        </div>
        <div class="flex items-center gap-1">
            <span class="sm:hidden">•</span>
            <span>go</span>
            <span class="hidden sm:inline">•</span>
        </div>
        <div class="flex items-center gap-1">
            <span class="sm:hidden">•</span>
            <span>typescript</span>
            <span class="hidden sm:inline">•</span>
        </div>
        <div class="flex items-center gap-1">
            <span class="sm:hidden">•</span>
            <span>gcp</span>
        </div>
    </div>
</Item>