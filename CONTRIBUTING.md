# Contributing to openclaw-vkbots-plugin

Thanks for contributing.

This repository contains a community VK Bots channel plugin for OpenClaw. It is
smaller in scope than the main OpenClaw monorepo, so the contribution process
is intentionally simpler.

## Before You Start

- Read the plugin README first.
- For bug fixes and small improvements, open a PR directly.
- For larger feature changes or architecture changes, open an issue or start a
  discussion first so the direction is clear.

## Development Setup

Requirements:

- Node.js 22+
- pnpm

Install dependencies:

```bash
pnpm install
```

## Local Checks

Run these before opening or updating a PR:

```bash
pnpm check
pnpm test
```

What they do:

- `pnpm check` runs TypeScript typechecking (`tsc --noEmit`)
- `pnpm test` runs the plugin’s Vitest suite

If you changed plugin loading, setup, or runtime behavior, also verify the real
OpenClaw install flow locally:

```bash
openclaw plugins install /path/to/openclaw-vkbots-plugin
openclaw channels add --channel vk
openclaw gateway run --force
```

Then test a real VK direct-message roundtrip if you have credentials available.

## Scope Guidelines

Keep PRs focused.

Good PRs for this repo:

- VK channel bug fixes
- setup/config improvements
- docs improvements for this plugin
- tests for plugin behavior
- release/process improvements for this plugin repo

Avoid mixing unrelated changes in one PR.

## Code Style

- Use TypeScript
- Prefer strict typing
- Avoid `any`
- Keep imports on public OpenClaw plugin SDK surfaces (`openclaw/plugin-sdk/*`)
- Do not depend on OpenClaw internal `src/**` paths from this repo
- Use American English in code, comments, and docs

## Testing Expectations

At minimum:

- Add or update tests when behavior changes
- Keep `pnpm check` and `pnpm test` passing

For setup/runtime changes, manual verification is strongly recommended:

- plugin installs from a local path
- plugin loads successfully in OpenClaw
- `openclaw channels add --channel vk` works
- gateway starts
- VK direct messages still roundtrip

## Pull Requests

Please include:

- what changed
- why it changed
- how you tested it
- any scope boundaries or known follow-ups

If the PR was AI-assisted, say so clearly in the PR description.

## Commit Messages

Use concise conventional commit messages:

```text
type(scope): summary
```

Examples:

- `feat(vk): add long poll reconnect guard`
- `fix(setup): handle secret input correctly`
- `docs(readme): clarify local install flow`

Rules:

- allowed types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`
- use lowercase
- add a short scope when possible
- keep the summary imperative and concise
- do not end the subject with a period

This repo enforces the policy with a local Git `commit-msg` hook.

## Releases

This plugin is intended to be released independently from the main OpenClaw
repo.

Versioning policy:

- stable releases use `YYYY.M.K`
- beta releases use `YYYY.M.K-beta.N`

Examples:

- `2026.3.1`
- `2026.3.2`
- `2026.3.3-beta.1`
- `2026.3.3-beta.2`

Release tags must use:

- `vYYYY.M.K`
- `vYYYY.M.K-beta.N`

This repo uses Changesets for release notes and changelog management.

For user-visible changes, add a changeset:

```bash
pnpm changeset
```

When a release is prepared, Changesets updates package versions and
`CHANGELOG.md`.

When preparing a release:

- update the changelog/release notes
- make sure `pnpm check` and `pnpm test` pass
- verify local plugin install still works
- publish the package
- create a GitHub Release with concise notes

If the plugin is published publicly, follow the OpenClaw community plugin
submission guidance:

- https://docs.openclaw.ai/plugins/community#submit-your-plugin

## Security

Do not commit:

- real VK tokens
- real user IDs unless clearly intended for tests/examples
- private configuration values

If you discover a security issue in the plugin, open a private report through
the appropriate repository/security channel instead of filing a public issue
with sensitive details.
