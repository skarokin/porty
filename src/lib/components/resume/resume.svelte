<script lang=ts>
    import FileText from "@lucide/svelte/icons/file-text";
    import { LinkItem } from "$lib/components/ui/command";
    import resume from "$lib/assets/SeanKimResume.pdf";
</script>

<LinkItem
    href={resume}
    target="_blank"
    value="pos=1-resume"
    keywords={["cv, curriculum vitae, seankimresume, pdf, download, hire, employment"]}
    class="flex items-center justify-between gap-2 w-full cursor-pointer"
>
    <div class="flex items-center gap-2 min-w-0 flex-1">
        <FileText class="size-4 opacity-50" />
        <div class="flex flex-row items-baseline gap-2">
            <span>SeanKimResume</span>
            <span class="text-muted-foreground text-xs">/ pdf</span>
        </div>
    </div>
    <span class="text-muted-foreground text-xs truncate max-w-36 sm:max-w-none">latest - 09/12/2025</span>
</LinkItem>
