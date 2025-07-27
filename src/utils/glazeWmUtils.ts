import type { GlazeWmOutput } from "zebar";

/**
 * Checks if the current monitor is the primary monitor (first in allMonitors)
 */
export function isOnPrimaryMonitor(glazewm: GlazeWmOutput | undefined | null): boolean {
  return !!glazewm?.allMonitors && 
         !!glazewm?.currentMonitor?.id && 
         glazewm.currentMonitor.id === glazewm.allMonitors[0]?.id;
}
