<script lang="ts">
  import type { Snippet } from "svelte";

  type ButtonProps = {
    children?: Snippet;
    label?: string;
    callback?: () => void;
    class?: string;
  };
  let { children, label, callback, ...rest }: ButtonProps = $props();
</script>

<button
  class="flex items-center justify-center transition-colors bg-blend-30 border border-zb-border rounded-base shadow-button hover:border-blend-40 active:border-blend-70 p-1 {rest.class}"
  onclick={callback}
  aria-label={label}
>
  {#if children}
    {@render children()}
  {:else}
    <span class="text-sm">{label}</span>
  {/if}
</button>
