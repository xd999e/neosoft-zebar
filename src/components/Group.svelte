<script lang="ts">
  import type { Snippet } from "svelte";
  import SmoothDiv from "./SmoothDiv.svelte";
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

  const curve = (left: boolean, right: boolean) => {
    if (left && right) return "rounded-t-base";
    if (left) return "rounded-tl-base";
    if (right) return "rounded-tr-base";
    return "";
  };
</script>

<div
  class="relative flex items-center h-full bg-zb-base border-zb-border {curve(
    leftCurve,
    rightCurve
  )} {outerClass}"
>
  {#if leftCurve}
    <div
      class="absolute bottom-0 -left-[calc(var(--radius)*2)] h-radius w-[calc(var(--radius)*2)] rounded-br-base bg-transparent shadow-inverted-l"
    ></div>
  {/if}
  <div class="overflow-hidden z-10 {curve(leftCurve, rightCurve)} py-1 {innerClass}">
    {@render children()}
  </div>
  {#if rightCurve}
    <div
      class="absolute bottom-0 -right-[calc(var(--radius)*2)] h-radius w-[calc(var(--radius)*2)] rounded-bl-base bg-transparent shadow-inverted-r"
    ></div>
  {/if}
</div>
