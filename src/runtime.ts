import { createPluginRuntimeStore } from "openclaw/plugin-sdk/runtime-store";
import type { PluginRuntime } from "openclaw/plugin-sdk/core";

const { setRuntime: setVkRuntime, getRuntime: getVkRuntime } =
  createPluginRuntimeStore<PluginRuntime>("VK runtime not initialized");

export { getVkRuntime, setVkRuntime };
