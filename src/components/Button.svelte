<script lang="ts">
  type ButtonProps = {
    iconClass?: string;
    label?: string;
    callback?: () => void;
    class: string;
    text?: string;
  };
  let { iconClass, label, callback, text, ...rest }: ButtonProps = $props();
</script>

<button
  class="flex bg-blend-30 border border-zb-border rounded-base shadow-button hover:border-blend-40 active:border-blend-70 p-1 {rest.class}"
  onclick={callback}
  aria-label={label}
>
  {#if iconClass}
    <i class="ti ti-{iconClass}"></i>
  {/if}
  {#if text}
    <span class="inline leading-tight">{text}</span>
  {/if}
</button>
