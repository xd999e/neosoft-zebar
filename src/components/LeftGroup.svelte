<script lang="ts">
  import type { BatteryOutput, CpuOutput, MemoryOutput } from "zebar";

  import Button from "./Button.svelte";
  import Meter from "./Meter.svelte";

  type LeftGroupProps = {
    battery: BatteryOutput;
    cpu: CpuOutput;
    memory: MemoryOutput;
  };

  let { battery, cpu, memory }: LeftGroupProps = $props();
</script>

<div class="flex flex-row gap-3 items-center overflow-hidden">
  <Button class="text-zb-icon" iconClass="heart-filled" />
  <div class="w-10 h-8">
    <Meter class="stroke-zb-memory" percent={Math.round(memory?.usage ?? 0)}>
      <i class="ti ti-ruler-2"></i>
    </Meter>
  </div>
  <div class="w-10 h-8">
    <Meter class="stroke-zb-cpu" percent={Math.round(cpu?.usage ?? 0)}>
      <i class="ti ti-cpu"></i>
    </Meter>
  </div>
  <div class="w-10 h-8">
    <Meter
      class="stroke-zb-battery-good"
      percent={Math.round(battery?.chargePercent ?? 100)}
    >
      <i class="ti ti-bolt"></i>
    </Meter>
  </div>
</div>
