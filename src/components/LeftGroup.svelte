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
  import { isOnPrimaryMonitor } from "../utils/glazeWmUtils";

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

<div class="flex flex-row gap-3 items-center">
  <Button class="text-zb-icon" iconClass="heart-filled" />
  <Meter
    class="stroke-zb-memory h-8"
    percent={Math.round(memory?.usage ?? 0)}
  >
    <i class="ti ti-ruler-2"></i>
  </Meter>
  <Meter class="stroke-zb-cpu h-8" percent={Math.round(cpu?.usage ?? 0)}>
    <i class="ti ti-cpu"></i>
  </Meter>
  {#if battery?.state}
    <Meter
      class="stroke-zb-battery-good h-8"
      percent={Math.round(battery?.chargePercent ?? 100)}
    >
      <i class="ti ti-bolt"></i>
    </Meter>
  {/if}
  {#if isOnPrimaryMonitor(glazewm)}
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
      <div class="flex flex-row items-center gap-2 font-mono">
        {#if network.traffic.received}
          <div class="flex flex-row items-center">
            <i class="ti ti-arrow-down"></i>
            <div class="flex flex-row items-center gap-1">
              <span
                class="inline-block text-right align-middle min-w-12"
              >
                {formatNetworkValue(network.traffic.received.iecValue)}
              </span>
              <span class="inline-block align-middle min-w-7">
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
                class="inline-block text-right align-middle min-w-12"
              >
                {formatNetworkValue(network.traffic.transmitted.iecValue)}
              </span>
              <span class="inline-block align-middle min-w-7">
                {network.traffic.transmitted.iecUnit}
              </span>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  {/if}
</div>
