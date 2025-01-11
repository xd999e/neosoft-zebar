<script lang="ts">
  import type { GlazeWmOutput, MediaOutput } from "zebar";

  let { glazewm, media }: { glazewm: GlazeWmOutput, media: MediaOutput } = $props();

  const secondsToHms = (d: number) => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    return `${h > 0 ? h + ':' : ''}${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };
</script>

{#if glazewm?.allMonitors && glazewm?.currentMonitor?.id === glazewm.allMonitors[0]?.id && media?.currentSession}
  <div class="flex items-center gap-3">
    <button class="transition hover:text-zb-accent hover:scale-125 duration-150" aria-label="Previous" onclick={() => media.previous()}>
      <i class="ti ti-player-skip-back"></i>
    </button>
    <button class="relative gap-x-2 inline-flex items-center justify-center group transition duration-150 hover:text-zb-accent"  aria-label="Toggle" onclick={() => media.togglePlayPause()}>
      <i class="ti ti-{media.currentSession.isPlaying ? 'player-pause' : 'player-play'}"></i>
      <span class="min-w-24 transition duration-300 ease-in-out group-hover:translate-y-full group-hover:opacity-0">
        <span class="max-w-md truncate">
          {media.currentSession.title}
        </span>
      </span>
      <span class="absolute ml-5 inset-0 flex items-center justify-center transform -translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
        {secondsToHms(media.currentSession.position)}/{secondsToHms(media.currentSession.endTime)}
      </span>
    </button>
    <button class="transition hover:text-zb-accent hover:scale-125 duration-150" aria-label="Next" onclick={() => media.next()}>
      <i class="ti ti-player-skip-forward"></i>
    </button>
  </div>
{/if}
