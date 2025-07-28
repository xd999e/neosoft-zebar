import { ContainerType, type SplitContainer, type Window, type Workspace } from "glazewm";
import type { GlazeWmOutput } from "zebar";

/**
 * Checks if the current monitor is the primary monitor (first in allMonitors)
 */
export function isOnPrimaryMonitor(glazewm: GlazeWmOutput | undefined | null): boolean {
  return !!glazewm?.allMonitors && 
         !!glazewm?.currentMonitor?.id && 
         glazewm.currentMonitor.id === glazewm.allMonitors[0]?.id;
}


/**
 * Returns all windows in the given workspace
 */
export function getWindows(workspace: Workspace | SplitContainer): Window[] {
    const allWindows: Window[] = [];
    for (const child of workspace.children) {
      if (child.type === ContainerType.WINDOW) {
        allWindows.push(child as Window);
      } else if (child.type === ContainerType.SPLIT) {
        allWindows.push(...getWindows(child));
      }
    }
    return allWindows;
}