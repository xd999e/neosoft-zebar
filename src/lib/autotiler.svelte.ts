import { untrack } from "svelte";
import { providers } from "./providers.svelte";
import { ContainerType, type Window } from "glazewm";

// Each autotiler is only responsible for one monitor

const MIN_RATIO = 1.4; // Minimum aspect ratio for switching tiling direction

const currentMonitor = $derived(providers.glazewm?.currentMonitor || null);
const focusedWindow: Window | null = $derived.by(() => {
  const glazewm = providers.glazewm;
  const focusedContainer = glazewm?.focusedContainer;
  if (!focusedContainer) {
    return null;
  }
  if (!currentMonitor || glazewm?.focusedMonitor?.id !== currentMonitor.id) {
    return null;
  }
  if (focusedContainer.type === ContainerType.WINDOW) {
    return focusedContainer as Window;
  }
  return null;
});

export function initializeAutotiler() {
  $effect(() => {
    if (!currentMonitor || !focusedWindow) {
      return;
    }

    const height = focusedWindow.height;
    const width = focusedWindow.width;

    const aspectRatio = width / height;
    const glazewm = untrack(() => providers.glazewm);
    if (!glazewm) {
      return;
    }
    if (aspectRatio < MIN_RATIO && glazewm.tilingDirection !== "vertical") {
      glazewm.runCommand("set-tiling-direction vertical");
    } else if (
      aspectRatio >= MIN_RATIO &&
      glazewm.tilingDirection !== "horizontal"
    ) {
      glazewm.runCommand("set-tiling-direction horizontal");
    }
  });
}
