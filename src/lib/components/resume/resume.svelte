<script lang=ts>
    import FileText from "@lucide/svelte/icons/file-text";
    import { LinkItem } from "$lib/components/ui/command";
    import resume from "$lib/assets/SeanKimResume.pdf";
</script>

<LinkItem
    href={resume}
    target="_blank"
    value="resume"
    keywords={["resume", "cv", "curriculum vitae", "SeanKimResume", "pdf", "Sean Kim"]}
    class="flex items-center justify-between gap-2 w-full cursor-pointer"
>
        <div class="flex items-center gap-2">
        <FileText class="size-4 opacity-50" />
        <div>
            <span>SeanKimResume</span>
            <span class="text-muted-foreground text-xs">/ pdf</span>
        </div>
    </div>
    <span class="text-muted-foreground text-xs">latest - 04/30/2025</span>
</LinkItem>
