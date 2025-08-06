import {
  createProviderGroup,
  type ProviderGroup,
  type ProviderGroupConfig
} from "zebar";

const config = {
  battery: { type: "battery" },
  cpu: { type: "cpu", refreshInterval: 2000 },
  date: { type: "date", formatting: "HH:mm" },
  glazewm: { type: "glazewm" },
  memory: { type: "memory" },
  network: { type: "network", refreshInterval: 2000 },
  weather: { type: "weather" },
  media: { type: "media" }
} satisfies ProviderGroupConfig;

const providers: ProviderGroup<typeof config>["outputMap"] = $state({
  battery: null,
  cpu: null,
  date: null,
  glazewm: null,
  memory: null,
  network: null,
  weather: null,
  media: null
});

function initProviders() {
  const providerGroup = createProviderGroup(config);

  providerGroup.onOutput((outputMap) => {
    Object.assign(providers, outputMap);
  });

  providerGroup.onError((error) => {
    console.error("Provider error:", error);
  });
}

export { initProviders, providers };
