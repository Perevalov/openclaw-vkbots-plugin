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

## Versioning

This plugin uses calendar-style versions:

- stable: `YYYY.M.K`
- beta: `YYYY.M.K-beta.N`

Examples:

- `2026.3.1`
- `2026.3.2-beta.1`

Release tags should use:

- `vYYYY.M.K`
- `vYYYY.M.K-beta.N`

## Changelog and Releases

This repo uses Changesets for changelog entries and release notes.

For user-visible changes:

```bash
pnpm changeset
```

When preparing a release locally:

```bash
pnpm version-packages
```

That updates package versions and `CHANGELOG.md`.

Publishing is handled by the GitHub release workflow after merge to `main`.

After publish, submit it for listing on the OpenClaw community plugins page:

https://docs.openclaw.ai/plugins/community
