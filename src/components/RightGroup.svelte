<script lang="ts">
  import { providers } from "$lib/providers.svelte";
  import { isOnPrimaryMonitor } from "$lib/utils/glaze_wm_utils.svelte";
  import PointFilled from "@tabler/icons-svelte/icons/point-filled";
  import NowPlaying from "./NowPlaying.svelte";

  let glazewm = $derived(providers.glazewm);
  let media = $derived(providers.media);
  let date = $derived(providers.date);
  let weather = $derived(providers.weather);
</script>

<div class="flex flex-row items-center">
  <NowPlaying />
  {#if weather}
    <div class="truncate flex items-center mr-2">
      <span class="text-2xl">
        {#if weather.status === "clear_day"}
          <i class="nf nf-weather-day_sunny"></i>
        {:else if weather.status === "clear_night"}
          <i class="nf nf-weather-night_clear"></i>
        {:else if weather.status === "cloudy_day"}
          <i class="nf nf-weather-day_cloudy"></i>
        {:else if weather.status === "cloudy_night"}
          <i class="nf nf-weather-night_alt_cloudy"></i>
        {:else if weather.status === "light_rain_day"}
          <i class="nf nf-weather-day_sprinkle"></i>
        {:else if weather.status === "light_rain_night"}
          <i class="nf nf-weather-night_alt_sprinkle"></i>
        {:else if weather.status === "heavy_rain_day"}
          <i class="nf nf-weather-day_rain"></i>
        {:else if weather.status === "heavy_rain_night"}
          <i class="nf nf-weather-night_alt_rain"></i>
        {:else if weather.status === "snow_day"}
          <i class="nf nf-weather-day_snow"></i>
        {:else if weather.status === "snow_night"}
          <i class="nf nf-weather-night_alt_snow"></i>
        {:else if weather.status === "thunder_day"}
          <i class="nf nf-weather-day_lightning"></i>
        {:else if weather.status === "thunder_night"}
          <i class="nf nf-weather-night_alt_lightning"></i>
        {/if}
      </span>
      {Math.round(weather.celsiusTemp)}°
    </div>
  {/if}
  {#if !isOnPrimaryMonitor()}
    <PointFilled class="mr-2" />
    {date?.formatted}
  {/if}
</div>
