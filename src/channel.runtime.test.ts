import { describe, expect, it, vi } from "vitest";

const sendVkText = vi.fn(async () => ({ ok: true }));

vi.mock("./send.js", () => ({
  sendVkText,
}));

describe("notifyVkPairingApproval", () => {
  it("uses the non-default account token when accountId is provided", async () => {
    const { notifyVkPairingApproval } = await import("./channel.runtime.js");

    await notifyVkPairingApproval({
      cfg: {
        channels: {
          vk: {
            botToken: "default-token",
            accounts: {
              team: {
                botToken: "team-token",
              },
            },
          },
        },
      },
      id: "12345",
      accountId: "team",
    });

    expect(sendVkText).toHaveBeenCalledWith("12345", "OpenClaw: your access has been approved.", {
      token: "team-token",
    });
  });
});
