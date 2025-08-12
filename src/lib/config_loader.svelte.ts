import defaultConfig from "$static/config.json";
import schema from "$static/schema.json"
import JSON5 from "json5";
import { Validator } from "jsonschema"
import deepMergeObjects from "$lib/utils/deepmerge";

export interface Config {
  /**
   * The visual direction of the widget.
   *
   * top- The top of the widget has inverted corner radius,
   * and the bottom has normal corner radius.
   *
   * bottom- The bottom of the widget has inverted corner radius,
   * and the top has normal corner radius.
   *
   * floating- All corners of the widget have normal corner radius.
   */
  direction: ATTACHMENT_DIRECTION;
  /**
   * The direction of the background gradient.
   *
   * top- From top to transparent bottom.
   *
   * bottom- From bottom to transparent top.
   *
   * solid- Solid color background.
   *
   * disabled- Background color is disabled.
   */
  gradient: GRADIENT_DIRECTION;
};

export enum ATTACHMENT_DIRECTION {
  /**
   * The top of the widget has inverted corner radius,
   * and the bottom has normal corner radius.
   */
  TOP = "top",
  /**
   * The bottom of the widget has inverted corner radius,
   * and the top has normal corner radius.
   */
  BOTTOM = "bottom",
  /**
   * All corners of the widget have normal corner radius.
   */
  FLOATING = "floating"
}

export enum GRADIENT_DIRECTION {
  /**
   * From top to transparent bottom.
   */
  TOP = "top",
  /**
   * From bottom to transparent top.
   */
  BOTTOM = "bottom",
  /**
   * Solid color background.
   */
  SOLID = "solid",
  /**
   * Background color is disabled.
   */
  DISABLED = "disabled"
}

const config = $state(defaultConfig as Config);
const validator = new Validator();

function loadConfig() {
  console.log("Fetching config...");
  fetch("/config.json")
    .then((response) => response.text())
    .then((data) => {
      const newConfig = JSON5.parse(data);
      const result = validator.validate(newConfig, schema);
      if (!result.valid) {
        console.error("Config validation failed:", result.errors);
        return;
      }
      Object.assign(config, deepMergeObjects(config, newConfig));
      console.log("Config loaded:", data);
    })
    .catch((error) => {
      console.error("Error loading config:", error);
    });
}

export { config, loadConfig };
