<script>
    import recentPic from "$lib/assets/recent.jpg";

    import { Item } from "$lib/components/ui/command";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
</script>

<Item
    class="flex flex-col gap-3 w-full"
    value='pos=2-recent-pic'
    keywords={["recent", "photo", "picture", "image", "latest", "camera", "photography"]}
>
    <div class="w-full">
        <Avatar.Root class="w-full h-48 sm:h-96 rounded-lg border" loadingStatus="loaded">
            <Avatar.Image
                src={recentPic}
                alt="Recent photo"
                class="object-contain w-full h-full"
            />
            <Avatar.Fallback class="rounded-lg w-full h-full flex items-center justify-center">📸</Avatar.Fallback>
        </Avatar.Root>
    </div>
</Item>