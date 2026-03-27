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

describe("plugin identity", () => {
  it("keeps package, manifest, entry, and channel plugin ids aligned", () => {
    const packageJson = JSON.parse(
      readFileSync(join(import.meta.dirname, "..", "package.json"), "utf8"),
    ) as PackageJson;
    const manifest = JSON.parse(
      readFileSync(join(import.meta.dirname, "..", "openclaw.plugin.json"), "utf8"),
    ) as PluginManifest;

    expect(packageJson.name).toBe("openclaw-vkbots-plugin");
    expect(manifest.id).toBe("openclaw-vkbots-plugin");
    expect(pluginEntry.id).toBe("openclaw-vkbots-plugin");
    expect(vkPlugin.id).toBe("openclaw-vkbots-plugin");
    expect(vkPlugin.meta.id).toBe("openclaw-vkbots-plugin");
    expect(manifest.channels).toEqual(["vk"]);
  });
});
