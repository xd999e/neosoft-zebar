<script lang="ts">
  import { onMount } from "svelte";
  import * as zebar from "zebar";

  import { Effect } from "@tauri-apps/api/window";

  import { initProviders, providers } from "$lib/providers.svelte";
  import { isOnPrimaryMonitor } from "$lib/utils/glaze_wm_utils.svelte";
  import Group from "../components/Group.svelte";
  import LeftGroup from "../components/LeftGroup.svelte";
  import ProcessIcons from "../components/ProcessIcons.svelte";
  import RightGroup from "../components/RightGroup.svelte";
  import Workspaces from "../components/Workspaces.svelte";
  import { initializeAutotiler } from "$lib/autotiler.svelte";
  import { GRADIENT_DIRECTION, config } from "$lib/config_loader.svelte";

  let glazewm = $derived(providers.glazewm);
  initializeAutotiler();

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

<div class="flex items-center h-full w-full">
  <div
    class="relative flex items-center h-bar w-full font-monst text-zb-text text-zb-size font-base bg-opacity-0"
  >
    {#if config.gradient !== GRADIENT_DIRECTION.SOLID && config.gradient !== GRADIENT_DIRECTION.DISABLED}
    <div
      class="absolute inset-0 {config.gradient === GRADIENT_DIRECTION.BOTTOM
        ? 'bg-gradient-to-t'
        : config.gradient === GRADIENT_DIRECTION.TOP
          ? 'bg-gradient-to-b'
          : ''} from-gray-400/40 to-zb-base/0 {!glazewm?.currentMonitor.hasFocus
        ? 'opacity-0'
        : ''}"
    ></div>
    <div
      class="absolute inset-0 {config.gradient === GRADIENT_DIRECTION.BOTTOM
        ? 'bg-gradient-to-t'
        : config.gradient === GRADIENT_DIRECTION.TOP
          ? 'bg-gradient-to-b'
          : ''} from-zb-base/50 to-zb-base/0 {glazewm
        ?.currentMonitor.hasFocus
        ? 'opacity-0'
        : ''}"
    ></div>
    {:else if config.gradient === GRADIENT_DIRECTION.SOLID}
      <div
        class="absolute inset-0 bg-gray-400/40 {!glazewm
          ?.currentMonitor.hasFocus
          ? 'opacity-0'
          : ''}"
      ></div>
    {/if}
    <div
      class="relative z-10 my-zby h-full w-full grid grid-cols-[1fr_auto_1fr] items-center"
    >
      <Group
        leftCurve={false}
        outerClass="justify-self-start h-full"
        innerClass="px-4 {isOnPrimaryMonitor() ? 'pl-zlby' : ''}"
      >
        <LeftGroup />
      </Group>
      <div class="h-full w-full grid grid-cols-[1fr_auto_1fr] items-center">
        <Group
          rightCurve={false}
          outerClass="justify-self-end"
          innerClass="pl-1"
        >
          <Workspaces />
        </Group>
        <Group leftCurve={false} outerClass="px-2">
          <ProcessIcons />
        </Group>
      </div>
      <Group
        rightCurve={false}
        outerClass="justify-self-end"
        innerClass="px-4 {isOnPrimaryMonitor() ? 'pr-zrby' : ''}"
      >
        <RightGroup />
      </Group>
    </div>
  </div>
</div>
