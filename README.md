# OpenClaw VK bots plugin

Community VK Bots channel plugin for OpenClaw.

## Install

From npm:

```bash
openclaw plugins install openclaw-vkbots-plugin
```

From a local checkout:

```bash
openclaw plugins install /path/to/openclaw-vkbots-plugin
```

## Configure

After installing the plugin:

```bash
openclaw channels add vk
```

The setup flow supports a VK group token from:

- an environment variable such as `VK_GROUP_TOKEN`
- direct config input
- a token file reference

## What it supports

- VK direct messages through the VK Long Poll API
- direct-message allowlists and pairing
- outbound text replies

Current scope boundary:

- direct messages only
- no VK group-chat inbound handling

## Local development

```bash
pnpm install
pnpm test
pnpm check
```

To test against a local OpenClaw checkout:

```bash
openclaw plugins install /path/to/openclaw-vkbots-plugin
openclaw channels add vk
openclaw gateway run --force
```

## Publish

This package is intended to be published to npm so it can be installed with:

```bash
openclaw plugins install openclaw-vkbots-plugin
```

After publish, submit it for listing on the OpenClaw community plugins page:

https://docs.openclaw.ai/plugins/community
