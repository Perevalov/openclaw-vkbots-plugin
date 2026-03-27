import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import pluginEntry from "../index.js";
import { vkPlugin } from "./channel.js";

type PackageJson = {
  name?: string;
};

type PluginManifest = {
  id?: string;
  channels?: string[];
};

describe("plugin package metadata", () => {
  it("keeps npm package name separate from the registered vk channel id", () => {
    const packageJson = JSON.parse(
      readFileSync(join(import.meta.dirname, "..", "package.json"), "utf8"),
    ) as PackageJson;
    const manifest = JSON.parse(
      readFileSync(join(import.meta.dirname, "..", "openclaw.plugin.json"), "utf8"),
    ) as PluginManifest;

    expect(packageJson.name).toBe("openclaw-vkbots-plugin");
    expect(manifest.id).toBe("vk");
    expect(pluginEntry.id).toBe("vk");
    expect(vkPlugin.id).toBe("vk");
    expect(vkPlugin.meta.id).toBe("vk");
    expect(manifest.channels).toEqual(["vk"]);
  });
});
