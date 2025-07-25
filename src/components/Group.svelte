<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = {
    children: Snippet;
    class: string;
  };
  let { children, ...rest }: Props = $props();
</script>

<div
  class="overflow-hidden flex items-center w-fit py-1 px-3 bg-zb-base border-zb-border rounded-base border shadow-bar {rest.class}"
>
  {@render children()}
</div>
