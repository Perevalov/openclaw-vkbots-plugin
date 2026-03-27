import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_ACCOUNT_ID } from "openclaw/plugin-sdk/account-id";
import { resolveVkToken } from "./token.js";
import type { VkConfig } from "./types.js";

const originalEnvToken = process.env.VK_GROUP_TOKEN;
const tempDirs: string[] = [];

function writeTokenFile(name: string, value: string): string {
  const dir = mkdtempSync(join(tmpdir(), "openclaw-vk-token-test-"));
  tempDirs.push(dir);
  const path = join(dir, name);
  writeFileSync(path, `${value}\n`, "utf8");
  return path;
}

afterEach(() => {
  if (originalEnvToken === undefined) {
    delete process.env.VK_GROUP_TOKEN;
  } else {
    process.env.VK_GROUP_TOKEN = originalEnvToken;
  }
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true });
  }
});

describe("resolveVkToken", () => {
  it("prefers default-account config over base config and env", () => {
    process.env.VK_GROUP_TOKEN = "env-token";
    const config: VkConfig = {
      botToken: "base-token",
      accounts: {
        [DEFAULT_ACCOUNT_ID]: {
          botToken: "account-token",
        },
      },
    };

    expect(resolveVkToken(config, DEFAULT_ACCOUNT_ID)).toEqual({
      token: "account-token",
      source: "config",
    });
  });

  it("prefers default-account tokenFile over base config and env when no account botToken is present", () => {
    process.env.VK_GROUP_TOKEN = "env-token";
    const accountTokenFile = writeTokenFile("account-token.txt", "account-file-token");
    const config: VkConfig = {
      botToken: "base-token",
      tokenFile: writeTokenFile("base-token.txt", "base-file-token"),
      accounts: {
        [DEFAULT_ACCOUNT_ID]: {
          tokenFile: accountTokenFile,
        },
      },
    };

    expect(resolveVkToken(config, DEFAULT_ACCOUNT_ID)).toEqual({
      token: "account-file-token",
      source: "configFile",
    });
  });

  it("falls back from base config to base tokenFile to env for the default account", () => {
    process.env.VK_GROUP_TOKEN = "env-token";

    expect(resolveVkToken({ botToken: "base-token" }, DEFAULT_ACCOUNT_ID)).toEqual({
      token: "base-token",
      source: "config",
    });

    expect(
      resolveVkToken(
        {
          tokenFile: writeTokenFile("base-token.txt", "base-file-token"),
        },
        DEFAULT_ACCOUNT_ID,
      ),
    ).toEqual({
      token: "base-file-token",
      source: "configFile",
    });

    expect(resolveVkToken({}, DEFAULT_ACCOUNT_ID)).toEqual({
      token: "env-token",
      source: "env",
    });
  });

  it("prefers non-default account config over base config and ignores env fallback", () => {
    process.env.VK_GROUP_TOKEN = "env-token";
    const config: VkConfig = {
      botToken: "base-token",
      accounts: {
        team: {
          botToken: "account-token",
        },
      },
    };

    expect(resolveVkToken(config, "team")).toEqual({
      token: "account-token",
      source: "config",
    });

    expect(resolveVkToken(undefined, "team")).toEqual({
      token: "",
      source: "none",
    });
  });

  it("prefers non-default account tokenFile over base config and tokenFile", () => {
    process.env.VK_GROUP_TOKEN = "env-token";
    const config: VkConfig = {
      botToken: "base-token",
      tokenFile: writeTokenFile("base-token.txt", "base-file-token"),
      accounts: {
        team: {
          tokenFile: writeTokenFile("team-token.txt", "team-file-token"),
        },
      },
    };

    expect(resolveVkToken(config, "team")).toEqual({
      token: "team-file-token",
      source: "configFile",
    });
  });

  it("preserves unresolved env-template strings only when explicitly allowed", () => {
    const config: VkConfig = {
      botToken: "${VK_CONFIG_TOKEN}",
    };

    expect(resolveVkToken(config, DEFAULT_ACCOUNT_ID, { allowUnresolvedSecretRef: true })).toEqual({
      token: "${VK_CONFIG_TOKEN}",
      source: "config",
    });

    expect(resolveVkToken(config, DEFAULT_ACCOUNT_ID)).toEqual({
      token: "${VK_CONFIG_TOKEN}",
      source: "config",
    });
  });

  it("fails closed on unresolved SecretRef objects unless they are resolved elsewhere", () => {
    const config: VkConfig = {
      botToken: {
        source: "env",
        provider: "default",
        id: "VK_CONFIG_TOKEN",
      },
    };

    expect(resolveVkToken(config, DEFAULT_ACCOUNT_ID, { allowUnresolvedSecretRef: true })).toEqual({
      token: "",
      source: "none",
    });

    expect(() => resolveVkToken(config, DEFAULT_ACCOUNT_ID)).toThrow(
      'channels.vk.botToken: unresolved SecretRef "env:default:VK_CONFIG_TOKEN"',
    );
  });
});
