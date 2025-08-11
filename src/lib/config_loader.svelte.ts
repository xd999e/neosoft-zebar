import defaultConfig from "$static/config.json";
import JSON5 from "json5";
import deepMergeObjects from "$lib/utils/deepmerge";

export interface Config {
  direction: ATTACHMENT_DIRECTION;
};

enum ATTACHMENT_DIRECTION {
  TOP = "top",
  BOTTOM = "bottom",
  FLOATING = "floating"
}

const config = $state(defaultConfig as Config);

function loadConfig() {
  console.log("Fetching config...");
  fetch("/config.json")
    .then((response) => response.text())
    .then((data) => {
      console.log("Config loaded:", data);
      Object.assign(config, deepMergeObjects(config, JSON5.parse(data)));
    })
    .catch((error) => {
      console.error("Error loading config:", error);
    });
}

export { config, loadConfig, ATTACHMENT_DIRECTION };
