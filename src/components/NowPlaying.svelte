<script lang="ts">
  import type { GlazeWmOutput, MediaOutput } from "zebar";

  let { glazewm, media }: { glazewm: GlazeWmOutput, media: MediaOutput } = $props();
</script>

{#if glazewm?.allMonitors && glazewm?.currentMonitor?.id === glazewm.allMonitors[0]?.id && media?.currentSession}
  <div class="flex items-center gap-3">
    <button class="transition hover:text-zb-accent hover:scale-125 duration-150" aria-label="Previous" onclick={() => media.previous()}>
      <i class="ti ti-player-skip-back"></i>
    </button>
    <button class="transition hover:text-zb-accent hover:scale-105 duration-150"  aria-label="Toggle" onclick={() => media.togglePlayPause()}>
      <i class="ti ti-{media.currentSession.isPlaying ? 'player-pause' : 'player-play'}"></i>
      <span class="max-w-md truncate">
        {media.currentSession.title}
      </span>
    </button>
    <button class="transition hover:text-zb-accent hover:scale-125 duration-150" aria-label="Next" onclick={() => media.next()}>
      <i class="ti ti-player-skip-forward"></i>
    </button>
  </div>
{/if}
