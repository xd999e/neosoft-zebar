<script lang="ts">
  import {
    startWidget,
    type BatteryOutput,
    type CpuOutput,
    type GlazeWmOutput,
    type MemoryOutput,
    type NetworkOutput
  } from "zebar";

  import Button from "./Button.svelte";
  import Meter from "./Meter.svelte";
  import { isOnPrimaryMonitor } from "../utils/glazeWmUtils";
  import MemoryStick from "@lucide/svelte/icons/memory-stick";
  import Cpu from "@lucide/svelte/icons/cpu";
  import BatteryCharging from "@lucide/svelte/icons/battery-charging";
  import BatteryWarning from "@lucide/svelte/icons/battery-warning";
  import BatteryLow from "@lucide/svelte/icons/battery-low";
  import BatteryMedium from "@lucide/svelte/icons/battery-medium";
  import BatteryFull from "@lucide/svelte/icons/battery-full";
  import Battery from "@lucide/svelte/icons/battery";
  import EthernetPort from "@lucide/svelte/icons/ethernet-port";
  import Wifi from "@lucide/svelte/icons/wifi";
  import WifiHigh from "@lucide/svelte/icons/wifi-high";
  import WifiLow from "@lucide/svelte/icons/wifi-low";
  import WifiZero from "@lucide/svelte/icons/wifi-zero";
  import WifiOff from "@lucide/svelte/icons/wifi-off";
  import ChevronsDown from "@lucide/svelte/icons/chevrons-down";
  import ChevronsUp from "@lucide/svelte/icons/chevrons-up";

  import IconHeartFilled from "@tabler/icons-svelte/icons/heart-filled";

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

  import { RemoteState } from "$lib/remote_state.svelte";
  import { onDestroy, onMount } from "svelte";

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
</script>

<div class="flex flex-row gap-3 items-center">
  <Button class="text-zb-icon"><IconHeartFilled class="text-zb-icon" /></Button>
  <Meter class="stroke-zb-memory h-8" percent={Math.round(memory?.usage ?? 0)}>
    <MemoryStick />
  </Meter>
  <Meter class="stroke-zb-cpu h-8" percent={Math.round(cpu?.usage ?? 0)}>
    <Cpu />
  </Meter>
  {#if battery?.state}
    <Meter
      class="stroke-zb-battery-good h-8"
      percent={Math.round(battery?.chargePercent ?? 100)}
    >
      {#if battery?.state === "charging"}
        <BatteryCharging />
      {:else if battery?.chargePercent! < 20}
        <BatteryWarning />
      {:else if battery?.chargePercent! < 50}
        <BatteryLow />
      {:else if battery?.chargePercent! < 80}
        <BatteryMedium />
      {:else if battery?.chargePercent! <= 100}
        <BatteryFull />
      {:else}
        <Battery />
      {/if}
    </Meter>
  {/if}
  {#if isOnPrimaryMonitor(glazewm)}
    <div class="flex flex-row pl-2 items-center gap-1">
      {#if network?.defaultInterface?.type === "ethernet"}
        <EthernetPort />
      {:else if network?.defaultInterface!.type === "wifi"}
        {#if network.defaultGateway!.signalStrength! >= 75}
          <Wifi />
        {:else if network.defaultGateway!.signalStrength! >= 50}
          <WifiHigh />
        {:else if network.defaultGateway!.signalStrength! >= 25}
          <WifiLow />
        {:else}
          <WifiZero />
        {/if}
        {network.defaultGateway?.ssid}
      {:else}
        <WifiOff />
      {/if}
    </div>
    {#if network?.traffic}
      <div class="flex flex-row items-center gap-2 font-mono">
        {#if network.traffic.received}
          <div class="flex flex-row items-center">
            <ChevronsDown />
            <div class="flex flex-row items-center gap-1">
              <span class="inline-block text-right align-middle min-w-12">
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
            <ChevronsUp />
            <div class="flex flex-row items-center gap-1">
              <span class="inline-block text-right align-middle min-w-12">
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
  <!-- <Button
    class="rounded-full bg-zb-muted"
    callback={() => {
      startWidget("test", {
        anchor: "bottom_left",
        offsetX: "250px",
        offsetY: "-50px",
        width: "400px",
        height: "300px",
        dockToEdge: {
          edge: "top",
          enabled: false,
          windowMargin: "40px"
        },
        monitorSelection: { type: "primary" }
      });
    }}
  >
    Test
  </Button>
  <Button
    class="text-zb-icon"
    callback={() => {
      counter.value.nested.counter++;
    }}
  >
    <ChevronsUp />
    {counter.value.nested.counter}
  </Button>
  <Button
    class="text-zb-icon"
    callback={() => {
      counter.value.nested.counter--;
    }}
  >
    <ChevronsDown />
    {counter.value.nested.counter}
  </Button>
  <div class="text-zb-text">
    {JSON.stringify(counter.value, null, 2)}
  </div> -->
</div>
