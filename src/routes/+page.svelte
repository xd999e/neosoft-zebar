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
    MediaOutput
  } from "zebar";

  import { Effect } from "@tauri-apps/api/window";

  import "$src/app.css";
  import Group from "../components/Group.svelte";
  import LeftGroup from "../components/LeftGroup.svelte";
  import RightGroup from "../components/RightGroup.svelte";
  import Workspaces from "../components/Workspaces.svelte";
  import { isOnPrimaryMonitor } from "$src/lib/utils/glazeWmUtils.svelte";
  import ProcessIcons from "../components/ProcessIcons.svelte";
  import { initProviders, providers } from "$lib/providers.svelte";

  let glazewm = $derived(providers.glazewm);

  onMount(() => {
    initProviders();   

    /*     
    Found a way to set window effects
    Requires adding the following line to packages/desktop/capabilities/widget.json under permissions (zebar source code):
        "core:window:allow-set-effects"
    Then rebuild and install zebar.
    
    It is then possible to set window effects like so:
    const window = zebar?.currentWidget()?.tauriWindow;
    window.setEffects({ effects: [Effect.Acrylic] });

    This is a temporary solution while waiting for https://github.com/glzr-io/zebar/pull/133 (one might say it's even better)
 */
    const window = zebar?.currentWidget()?.tauriWindow;
    window.setEffects({ effects: [Effect.Acrylic] });
  });
</script>

<div
  class="relative h-bar font-monst text-zb-text text-zb-size font-base bg-opacity-0"
>
  <div class="absolute inset-0 bg-gradient-to-t from-gray-400/40 to-zb-base/0 {!glazewm?.currentMonitor.hasFocus ? 'opacity-0' : ''}"></div>
  <div class="absolute inset-0 bg-gradient-to-t from-zb-base/50 to-zb-base/0 {glazewm?.currentMonitor.hasFocus ? 'opacity-0' : ''}"></div>
  <div class="relative z-10 my-zby h-full grid grid-cols-[1fr_auto_1fr] items-center">
    <Group
      leftCurve={false}
      class="justify-self-start h-full px-4 {isOnPrimaryMonitor()
        ? 'pl-zlby'
        : ''}"
    >
      <LeftGroup
      />
    </Group>
    <div class="h-full w-full grid grid-cols-[1fr_auto_1fr] items-center">
      <Group rightCurve={false} class="justify-self-end pl-3">
        <Workspaces />
      </Group>
      <Group leftCurve={false} class="pr-4">
        <ProcessIcons />
      </Group>
    </div>
    <Group
      rightCurve={false}
      class="justify-self-end px-4 {isOnPrimaryMonitor()
        ? 'pr-zrby'
        : ''}"
    >
      <RightGroup
      />
    </Group>
  </div>
</div>
