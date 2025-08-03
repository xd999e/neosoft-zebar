<script lang="ts">
  import "$src/app.css";
  import { RemoteState } from "$lib/remote_state.svelte";
  import { onDestroy, onMount } from "svelte";
  import Button from "$src/components/Button.svelte";

  type Nested = {
    name: string;
    nested: {
      name: string;
      counter: number;
    };
  };

  let counter = RemoteState<Nested>(
    "test",
    {
      name: "Counter",
      nested: {
        name: "Nested Counter",
        counter: 0
      }
    },
    onMount,
    onDestroy
  );

  let derivedTest = $derived(counter.value.nested.counter + 100);
</script>

<div
  class="bg-zb-base border-8 border-red-600 h-screen w-screen font-monst text-zb-text text-lg"
>
  Counter: {JSON.stringify(counter.value, null, 2)}
  Derived: {derivedTest}
  <Button
    callback={() => {
      counter.value.nested.counter = 0;
    }}
  >
    Reset Counter
  </Button>
</div>
