import { getVkGroupsById } from "./api.js";
import type { ResolvedVkAccount, VkProbeResult } from "./types.js";

export async function probeVkAccount(params: {
  account: ResolvedVkAccount;
  timeoutMs?: number;
}): Promise<VkProbeResult> {
  const controller = new AbortController();
  const timeoutMs = params.timeoutMs ?? 2500;
  const timeoutMessage = `VK probe timed out after ${String(timeoutMs)}ms`;
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const groups = await getVkGroupsById(params.account.token, controller.signal);
    const group = groups[0];
    if (!group) {
      return {
        ok: false,
        error: "VK token did not resolve a group",
      };
    }
    return {
      ok: true,
      group: {
        id: group.id,
        name: group.name,
        screenName: group.screen_name,
      },
    };
  } catch (err) {
    if (
      controller.signal.aborted ||
      (err instanceof DOMException && err.name === "AbortError") ||
      (err instanceof Error && err.name === "AbortError")
    ) {
      return {
        ok: false,
        error: timeoutMessage,
      };
    }
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  } finally {
    clearTimeout(timer);
    controller.abort();
  }
}
