<script lang="ts">
  import type { Window, Workspace } from "glazewm";

  import iconMap from "$lib/icon_loader";
  import ignoredApps from "$lib/ignored_apps.json";
  import { providers } from "$lib/providers.svelte";
  import { getWindows } from "$lib/utils/glaze_wm_utils.svelte";
  import ArrowRightLeft from "@lucide/svelte/icons/arrow-right-left";
  import Background from "@tabler/icons-svelte/icons/background";
  import type { Icon as IconType } from "@tabler/icons-svelte";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import Button from "./Button.svelte";
  import SmoothDiv from "./SmoothDiv.svelte";

  const getProcessIcon = (child: Window): IconType => {
    const possibleAppNames = [
      child.title.toLowerCase(),
      child.processName.toLowerCase()
    ];

    if (
      ignoredApps.some((app) =>
        possibleAppNames.includes(app.name.toLowerCase())
      )
    ) {
      return Background;
    }

    let entry = iconMap.find((entry) =>
      entry.appNames
        .map((name) => name.toLowerCase())
        .some((name) => possibleAppNames.includes(name))
    );

    if (entry) {
      return entry.icon;
    }

    // Fallback
    return Background;
  };
  let glazewm = $derived(providers.glazewm);

  const workspaceEquals = (ws1: Workspace, ws2: Workspace) => {
    return ws1.id === ws2.id;
  };
</script>

{#if glazewm}
  <div class="flex items-center">
    <!-- We're using flex-row-reverse to make the flip animation more correct,
    since this div is attached to the right (otherwise the animation would treat it as entering from the left).
    To cancel out the effect, we're using a reverse order for the children. -->
    <SmoothDiv outerClass="" innerClass="flex flex-row-reverse items-center">
      {#each glazewm.currentWorkspaces.slice().reverse() as workspace, i (workspace.id)}
        {@const globalIndex = glazewm.allWorkspaces.findIndex((ws) =>
          workspaceEquals(ws, workspace)
        )}
        <div
          transition:fly={{ y: 20, duration: 400 }}
          animate:flip={{ duration: 400 }}
          class="mx-1"
        >
          <Button
            class="box-border mx-1 px-6 text-zb-ws-{globalIndex} {workspace.isDisplayed
              ? `border-zb-ws-${globalIndex} hover:border-blend-80`
              : ''}"
            callback={() =>
              glazewm!.runCommand(`focus --workspace ${workspace.name}`)}
          >
            {workspace.name}
          </Button>
        </div>
      {/each}
    </SmoothDiv>
    <button
      aria-label="tiling-direction"
      class="flex items-center justify-center mx-1 text-zb-tiling-direction"
      onclick={() => glazewm!.runCommand("toggle-tiling-direction")}
    >
      <ArrowRightLeft
        class="transition transform {glazewm?.tilingDirection === 'vertical'
          ? 'rotate-90'
          : 'rotate-0'}"
      />
    </button>
    <SmoothDiv innerClass="flex items-center">
      {#each glazewm.bindingModes as bindingMode, i (bindingMode.name)}
        <button
          transition:fly={{ y: 20, duration: 400 }}
          animate:flip={{ duration: 400 }}
          class="mx-[0.5rem]"
          onclick={() => {
            switch (bindingMode.name.toLowerCase()) {
              case "pause":
                glazewm!.runCommand("wm-disable-binding-mode --name pause");
                break;

              case "resize":
                glazewm!.runCommand("wm-disable-binding-mode --name resize");
                break;

              default:
                break;
            }
          }}
        >
          {bindingMode.displayName ?? bindingMode.name}
        </button>
      {/each}
    </SmoothDiv>
    {#if glazewm.displayedWorkspace}
      <SmoothDiv innerClass="flex items-center h-full">
        {#each getWindows(glazewm.displayedWorkspace) as child (child.id)}
          {@const icon = getProcessIcon(child as Window)}
          <span
            transition:fly|global={{ y: 20, duration: 400 }}
            animate:flip={{ duration: 400 }}
            class="flex items-center text-xl ml-1 {child.hasFocus
              ? 'text-zb-focused-process'
              : 'text-zb-process'}"
          >
            <!-- svelte-ignore svelte_component_deprecated -->
            <!-- actually stupid, svelte doesn't render correctly when doing `{icon}` -->
            <svelte:component this={icon} />
          </span>
        {/each}
      </SmoothDiv>
    {/if}
  </div>
{/if}
