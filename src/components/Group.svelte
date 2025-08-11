<script lang="ts">
  import type { Snippet } from "svelte";
  import SmoothDiv from "./SmoothDiv.svelte";
  import { config, ATTACHMENT_DIRECTION } from "$lib/config_loader.svelte";
  type Props = {
    children: Snippet;
    outerClass?: string;
    innerClass?: string;
    leftCurve?: boolean;
    rightCurve?: boolean;
  };

  let {
    children,
    outerClass,
    innerClass,
    leftCurve = true,
    rightCurve = true
  }: Props = $props();

  const curve = (
    left: boolean,
    right: boolean,
    direction: ATTACHMENT_DIRECTION
  ) => {
    switch (direction) {
      case ATTACHMENT_DIRECTION.BOTTOM:
        if (left && right) return "rounded-t-base";
        if (left) return "rounded-tl-base";
        if (right) return "rounded-tr-base";
        return "";
      case ATTACHMENT_DIRECTION.TOP:
        if (left && right) return "rounded-b-base";
        if (left) return "rounded-bl-base";
        if (right) return "rounded-br-base";
        return "";
      case ATTACHMENT_DIRECTION.FLOATING:
        if (left && right) return "rounded-l-base";
        if (left) return "rounded-l-base";
        if (right) return "rounded-r-base";
        return "";
    }
  };
</script>

<div
  class="relative flex items-center h-full bg-zb-base border-zb-border {curve(
    leftCurve,
    rightCurve,
    config.direction
  )} {outerClass}"
>
  {#if leftCurve && config.direction != ATTACHMENT_DIRECTION.FLOATING}
    <div
      class="absolute {config.direction == ATTACHMENT_DIRECTION.BOTTOM
        ? 'bottom-0 rounded-br-base'
        : 'top-0 rounded-tr-base'} -left-[calc(var(--radius)*2)] h-radius w-[calc(var(--radius)*2)] bg-transparent shadow-inverted-l"
    ></div>
  {/if}
  <div
    class="overflow-hidden z-10 {curve(
      leftCurve,
      rightCurve
    )} py-1 {innerClass}"
  >
    {@render children()}
  </div>
  {#if rightCurve && config.direction != ATTACHMENT_DIRECTION.FLOATING}
    <div
      class="absolute {config.direction == ATTACHMENT_DIRECTION.BOTTOM
        ? 'bottom-0 rounded-bl-base'
        : 'top-0 rounded-tl-base'} -right-[calc(var(--radius)*2)] h-radius w-[calc(var(--radius)*2)] bg-transparent shadow-inverted-r"
    ></div>
  {/if}
</div>
