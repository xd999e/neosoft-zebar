<script lang="ts">
  // This component is used to create a smooth size transition
  // when the content changes size or added/deleted. (otherwise, the size change is abrupt)
  import type { Snippet } from "svelte";

  type Props = {
    innerClass?: string;
    outerClass?: string;
    children: Snippet;
  };

  let { innerClass, outerClass, children }: Props = $props();
  let width: number | undefined = $state();
  let height: number | undefined = $state();
</script>

<div
  class="relative transition-[width,height] {outerClass}"
  style="width: {width}px; height: {height}px;"
>
  <div
    class="w-fit h-fit {innerClass}"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    {@render children()}
  </div>
</div>
