<script lang="ts">
  import type {
    BatteryOutput,
    CpuOutput,
    GlazeWmOutput,
    MemoryOutput,
    NetworkOutput
  } from "zebar";

  import Button from "./Button.svelte";
  import Meter from "./Meter.svelte";

  type LeftGroupProps = {
    battery: BatteryOutput;
    cpu: CpuOutput;
    memory: MemoryOutput;
    network: NetworkOutput;
    glazewm: GlazeWmOutput;
  };

  let { battery, cpu, memory, network, glazewm }: LeftGroupProps = $props();

  // Format network values with adaptive decimal places
  function formatNetworkValue(value: number): string {
    let expanded = value.toFixed(4);
    if (value >= 1000) {
      return " " + expanded.slice(0, 4);
    } else {
      return expanded.slice(0, 5);
    }
  }
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
  {#if battery?.state}
    <div class="w-10 h-8">
      <Meter
        class="stroke-zb-battery-good"
        percent={Math.round(battery?.chargePercent ?? 100)}
      >
        <i class="ti ti-bolt"></i>
      </Meter>
    </div>
  {/if}
  {#if glazewm?.allMonitors && glazewm?.currentMonitor?.id === glazewm.allMonitors[0]?.id}
    <div class="flex flex-row items-center gap-1">
      {#if network?.defaultInterface?.type === "ethernet"}
        <i class="ti ti-network"></i>
      {:else if network?.defaultInterface!.type === "wifi"}
        {#if network.defaultGateway!.signalStrength! >= 75}
          <i class="ti ti-wifi"></i>
        {:else if network.defaultGateway!.signalStrength! >= 50}
          <i class="ti ti-wifi-2"></i>
        {:else if network.defaultGateway!.signalStrength! >= 25}
          <i class="ti ti-wifi-1"></i>
        {:else}
          <i class="ti ti-wifi-off"></i>
        {/if}
        {network.defaultGateway?.ssid}
      {:else}
        <i class="ti ti-wifi-off"></i>
      {/if}
    </div>
    {#if network?.traffic}
      <div class="flex flex-row items-center gap-2">
        {#if network.traffic.received}
          <div class="flex flex-row items-center">
            <i class="ti ti-arrow-down"></i>
            <div class="flex flex-row items-center gap-1">
              <span
                class="inline-block text-right font-mono align-middle min-w-12"
              >
                {formatNetworkValue(network.traffic.received.iecValue)}
              </span>
              <span class="inline-block align-middle min-w-6">
                {network.traffic.received.iecUnit}
              </span>
            </div>
          </div>
        {/if}
        {#if network.traffic.transmitted}
          <div class="flex flex-row items-center">
            <i class="ti ti-arrow-up"></i>
            <div class="flex flex-row items-center gap-1">
              <span
                class="inline-block text-right font-mono align-middle min-w-12"
              >
                {formatNetworkValue(network.traffic.transmitted.iecValue)}
              </span>
              <span class="inline-block align-middle min-w-6">
                {network.traffic.transmitted.iecUnit}
              </span>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  {/if}
</div>
