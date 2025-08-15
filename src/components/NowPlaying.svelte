<script lang="ts">
  import { config } from "$lib/config.svelte";
  import { providers } from "$lib/providers.svelte";
  import { isOnPrimaryMonitor } from "$lib/utils/glaze_wm_utils.svelte";
  import Pause from "@lucide/svelte/icons/pause";
  import Play from "@lucide/svelte/icons/play";
  import SkipBack from "@lucide/svelte/icons/skip-back";
  import SkipForward from "@lucide/svelte/icons/skip-forward";
  import { fly } from "svelte/transition";
  import Meter from "./Meter.svelte";
  import SmoothDiv from "./SmoothDiv.svelte";

  let glazewm = $derived(providers.glazewm);
  let media = $derived(providers.media);

  const secondsToHms = (d: number) => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    return `${h > 0 ? h + ":" : ""}${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };
</script>

<SmoothDiv outerClass="flex justify-end">
  {#if isOnPrimaryMonitor() && media?.currentSession}
    <div transition:fly={{ y: 20, duration: config.transitionDuration }} class="flex items-center gap-3 mr-2">
      <button
        class="transition hover:text-zb-accent hover:scale-125"
        aria-label="Previous"
        onclick={() => media.previous()}
      >
        <SkipBack />
      </button>
      <button
        class="relative gap-x-2 inline-flex items-center justify-center group transition hover:text-zb-accent"
        aria-label="Toggle"
        onclick={() => media.togglePlayPause()}
      >
        <Meter
          animate={false}
          class="stroke-zb-accent h-8"
          percent={Math.round(
            (media.currentSession.position / media.currentSession.endTime) * 100
          )}
        >
          {#if media.currentSession.isPlaying}
            <Pause class="transition transform group-hover:scale-125" />
          {:else}
            <Play class="transition transform group-hover:scale-125" />
          {/if}
        </Meter>
        <SmoothDiv
          outerClass="ml-2"
          innerClass="relative flex items-center justify-center min-w-24 max-w-md"
        >
          <span
            class="transition truncate group-hover:translate-y-full group-hover:opacity-0"
          >
            <p class="truncate">
              {media.currentSession.title}
            </p>
          </span>
          <span
            class="absolute inset-0 inline-flex items-center justify-center transform -translate-y-full {media
              .currentSession.title
              ? 'opacity-0'
              : ''} transition-all group-hover:translate-y-0 group-hover:opacity-100"
          >
            {secondsToHms(media.currentSession.position)}/{secondsToHms(
              media.currentSession.endTime
            )}
          </span>
        </SmoothDiv>
      </button>
      <button
        class="transition hover:text-zb-accent hover:scale-125"
        aria-label="Next"
        onclick={() => media.next()}
      >
        <SkipForward />
      </button>
    </div>
  {/if}
</SmoothDiv>
