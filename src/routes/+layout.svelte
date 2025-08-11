<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { loadConfig } from "$lib/config_loader.svelte";

  let { children } = $props();

  onMount(() => {
    loadConfig();
  });
</script>

{@render children()}