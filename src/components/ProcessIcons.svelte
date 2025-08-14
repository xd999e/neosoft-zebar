<script lang="ts">
  import { config } from "$lib/config.svelte";
  import { providers } from "$lib/providers.svelte";
  import { getWindows, isOnPrimaryMonitor } from "$lib/utils/glaze_wm_utils.svelte";
  import type { Window } from "glazewm";
  import type { GlazeWmOutput } from "zebar";
  import SmoothDiv from "./SmoothDiv.svelte";

  type ProcessIconsProps = {
    glazewm: GlazeWmOutput;
  };

  let glazewm = $derived(providers.glazewm);

  const uniqueWindows = (windows: Window[]) => {
    const seen = new Set();
    return windows.filter((window) => {
      const key = window.processName;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
  };

  const getWindowCount = (glazewm: GlazeWmOutput) => {
    const currentMonitor = glazewm.currentMonitor;
    if (!currentMonitor) return 0;

    if (isOnPrimaryMonitor()) {
      return uniqueWindows(glazewm.allWindows).length;
    }

    const workspaces = currentMonitor.children;
    let windows: Window[] = [];
    for (const workspace of workspaces) {
      windows.push(...getWindows(workspace));
    }
    return uniqueWindows(windows).length;
  };
</script>

<SmoothDiv>
  {#if glazewm}
    <div class="flex items-center" style="width: calc({config.taskbar_integration.extra_icons + getWindowCount(glazewm)} * var(--process-icon-width));"></div>
  {/if}
</SmoothDiv>
