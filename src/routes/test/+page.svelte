<script lang="ts">
  import "$src/app.css";
  import { RemoteState } from "$lib/remote_state.svelte";
  import { onDestroy, onMount } from "svelte";
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import Button from "$src/components/Button.svelte";

  let counter = RemoteState("counter", 0, onMount, onDestroy);
  let enabled = RemoteState("enabled", true, onMount, onDestroy);
  let shown = RemoteState("shown", true, onMount, onDestroy);

  $effect(() => {
    const window = getCurrentWindow();
    console.log(enabled.value);
    window.setEnabled(enabled.value);
  });

  $effect(() => {
    const window = getCurrentWindow();
    if (shown.value) {
      window.show();
    } else {
      window.hide();
    }
  });

  let derivedTest = $derived(counter.value + 100);
</script>

<div
  class="bg-zb-base border-8 border-red-600 h-screen w-screen font-monst text-zb-text text-lg"
>
  Counter: {JSON.stringify(counter, null, 2)}
  Derived: {derivedTest}
  <Button
    callback={() => {
      counter.value = 0;
    }}
  >
    Reset Counter
  </Button>
</div>
