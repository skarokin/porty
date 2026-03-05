<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    let canvas: HTMLCanvasElement;
    let animId: number;

    // Orb configuration
    const orbs = [
        { x: 0.3, y: 0.3, radius: 350, color: [16, 185, 129], speed: 0.0003, phase: 0 },      // emerald
        { x: 0.7, y: 0.6, radius: 300, color: [6, 182, 212], speed: 0.0004, phase: 2 },        // cyan
        { x: 0.5, y: 0.8, radius: 280, color: [99, 102, 241], speed: 0.00035, phase: 4 },      // indigo
        { x: 0.2, y: 0.7, radius: 260, color: [16, 185, 129], speed: 0.00025, phase: 1 },      // emerald 2
        { x: 0.8, y: 0.2, radius: 240, color: [20, 184, 166], speed: 0.00045, phase: 3 },      // teal
    ];

    function draw(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
        ctx.clearRect(0, 0, w, h);

        for (const orb of orbs) {
            const x = w * (orb.x + 0.15 * Math.sin(time * orb.speed * 1000 + orb.phase));
            const y = h * (orb.y + 0.1 * Math.cos(time * orb.speed * 800 + orb.phase));
            const r = orb.radius * (w / 1400); // scale with viewport

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
            gradient.addColorStop(0, `rgba(${orb.color.join(",")}, 0.08)`);
            gradient.addColorStop(0.5, `rgba(${orb.color.join(",")}, 0.03)`);
            gradient.addColorStop(1, `rgba(${orb.color.join(",")}, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);
        }
    }

    onMount(() => {
        if (!browser) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resize();
        window.addEventListener("resize", resize);

        function animate(time: number) {
            resize();
            draw(ctx!, canvas.width, canvas.height, time);
            animId = requestAnimationFrame(animate);
        }

        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    });
</script>

<canvas
    bind:this={canvas}
    class="fixed inset-0 pointer-events-none z-0"
    aria-hidden="true"
></canvas>
