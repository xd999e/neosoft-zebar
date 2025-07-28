<script lang="ts">
  import type { Snippet } from "svelte";
  type Props = {
    children: Snippet;
    class: string;
  };
  let { children, ...rest }: Props = $props();
</script>

<div
  class="relative flex items-center h-full w-fit py-1 px-3 bg-zb-base border-zb-border rounded-t-base {rest.class}"
>
  <div class="absolute bottom-0 -left-[calc(var(--radius)*2)] h-radius w-[calc(var(--radius)*2)] rounded-br-base bg-transparent shadow-inverted-l"></div>
  <div class="overflow-hidden">{@render children()}</div>
  <div class="absolute bottom-0 -right-[calc(var(--radius)*2)] h-radius w-[calc(var(--radius)*2)] rounded-bl-base bg-transparent shadow-inverted-r"></div>
</div>
