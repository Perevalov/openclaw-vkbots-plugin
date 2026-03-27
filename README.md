# OpenClaw VK bots plugin

Community VK Bots channel plugin for OpenClaw.

## Install

From npm:

```bash
openclaw onboard --install-daemon
openclaw plugins install vk-plugin
```

From a local checkout:

```bash
openclaw onboard --install-daemon
openclaw plugins install /path/to/openclaw-vkbots-plugin
```

## Configure

After installing the plugin, create a token file:

```bash
mkdir -p ~/.openclaw/workspace/secrets/
$EDITOR ~/.openclaw/workspace/secrets/vk-token.txt
```

The file should contain only the VK group token.

Then add the VK channel using that token file:

```bash
openclaw channels add --channel vk --token-file ~/.openclaw/workspace/secrets/vk-token.txt
```

The setup flow supports a VK group token from:

- an environment variable such as `VK_GROUP_TOKEN`
- direct config input
- a token file reference

If you want to compare against the interactive flow first, you can also run:

```bash
openclaw channels add --channel vk
```

## Verify

Check channel status:

```bash
openclaw channels status
```

Expected outcome:

- `vk` is listed
- the channel does not report missing token configuration
- no plugin id mismatch warning is shown for `vk`

Then message your VK bot on `vk.com`. The bot should respond with a pairing code.

Approve that pairing request:

```bash
openclaw pairing approve vk APPROVALCODE
```

Expected outcome:

- the pairing request is approved without CLI errors
- the VK user receives the approval notification
- subsequent inbound messages from that user are accepted

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
mkdir -p ~/.openclaw/workspace/secrets/
openclaw plugins install /path/to/openclaw-vkbots-plugin
openclaw channels add --channel vk --token-file ~/.openclaw/workspace/secrets/vk-token.txt
openclaw gateway run --force
```

## Publish

This package is intended to be published to npm so it can be installed with:

```bash
openclaw plugins install vk-plugin
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
