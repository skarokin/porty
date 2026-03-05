<script lang=ts>
    import FileText from "@lucide/svelte/icons/file-text";
    import Download from "@lucide/svelte/icons/download";
    import resume from "$lib/assets/SeanKimResume.pdf";
</script>

<div class="panel h-full">
    <div class="panel-header">
        <span class="panel-title">resume</span>
        <span class="text-[10px] text-muted-foreground">pdf</span>
    </div>
    <div class="panel-body">
        <a
            href={resume}
            target="_blank"
            class="flex items-center gap-3 rounded px-2 py-2 hover:bg-muted/30 transition-colors group"
        >
            <FileText class="size-5 text-muted-foreground group-hover:text-emerald-400 transition-colors" />
            <div class="flex flex-col min-w-0 flex-1">
                <span class="text-sm">SeanKimResume</span>
                <span class="text-[10px] text-muted-foreground">latest - 10/14/2025</span>
            </div>
            <Download class="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </a>
    </div>
</div>
