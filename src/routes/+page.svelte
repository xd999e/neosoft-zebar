<script lang="ts">
  import { onMount } from "svelte";
  import * as zebar from "zebar";
  import type {
    BatteryOutput,
    CpuOutput,
    GlazeWmOutput,
    MemoryOutput,
    DateOutput,
    NetworkOutput,
    WeatherOutput,
    MediaOutput,
  } from "zebar";

  import "../app.css";
  import Group from "../components/Group.svelte";
  import LeftGroup from "../components/LeftGroup.svelte";
  import RightGroup from "../components/RightGroup.svelte";
  import Workspaces from "../components/Workspaces.svelte";

  let battery = $state<BatteryOutput | null>();
  let cpu = $state<CpuOutput | null>();
  let date = $state<DateOutput | null>();
  let glazewm = $state<GlazeWmOutput | null>();
  let memory = $state<MemoryOutput | null>();
  let network = $state<NetworkOutput | null>();
  let weather = $state<WeatherOutput | null>();
  let media = $state<MediaOutput | null>();

  onMount(() => {
    const providers = zebar.createProviderGroup({
      battery: { type: "battery" },
      cpu: { type: "cpu" },
      date: { type: "date", formatting: "HH:mm" },
      glazewm: { type: "glazewm" },
      memory: { type: "memory" },
      network: { type: "network" },
      weather: { type: "weather" },
      media: { type: "media" }
    });

    providers.onOutput(() => {
      battery = providers.outputMap.battery;
      cpu = providers.outputMap.cpu;
      date = providers.outputMap.date;
      glazewm = providers.outputMap.glazewm;
      memory = providers.outputMap.memory;
      network = providers.outputMap.network;
      weather = providers.outputMap.weather;
      media = providers.outputMap.media;
    });
  });
</script>

<div class="backdrop-blur-sm">
  <div
    class="grid grid-cols-3 items-center h-bar my-zby mx-zbx text-zb-text text-zb-size font-base"
  >
    <Group class="justify-self-start">
      <LeftGroup battery={battery!} cpu={cpu!} memory={memory!} />
    </Group>
    <Group
      class="justify-self-center {glazewm?.currentMonitor.hasFocus
        ? '!border-zb-accent border-4'
        : ''}"
    >
      <Workspaces glazewm={glazewm!} />
    </Group>
    <Group class="justify-self-end">
      <RightGroup
        date={date!}
        glazewm={glazewm!}
        network={network!}
        weather={weather!}
        media={media!}
      />
    </Group>
  </div>
</div>
