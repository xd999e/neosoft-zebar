<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { config, loadConfig } from "$lib/config.svelte";

  let { children } = $props();

  onMount(() => {
    loadConfig();
  });
</script>

<div style="--transition-duration: {config.transition_duration}ms;">{@render children()}</div>
