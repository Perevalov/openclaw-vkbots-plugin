# Releasing

This repository uses Changesets for versioning, changelog updates, npm
publishing, and GitHub release notes.

## Normal Contributor Flow

For a normal feature or fix PR:

1. Make your changes
2. Run local checks

```bash
pnpm check
pnpm test
```

3. If the change is user-visible, add a changeset

```bash
pnpm changeset
```

4. Commit and open a PR

The PR CI checks:

- typecheck
- tests
- version schema
- changeset presence for user-facing changes

## After Merge

When a PR with one or more changesets is merged to `main`:

1. The release workflow runs
2. Changesets opens or updates a release PR
3. That release PR updates:
   - `package.json` version
   - `CHANGELOG.md`

## Publishing a Release

To publish a release:

1. Review the release PR
2. Merge the release PR
3. The release workflow runs again on `main`
4. The package is published to npm
5. A GitHub Release is created

## Who Assigns the Release Tag?

In the current setup, releases are not triggered by manually creating a Git tag.

The source of truth is the merged Changesets release PR. The automation derives
the release version from that PR and handles the release process.

So, in practice:

- contributors add changesets
- a maintainer reviews and merges the release PR
- automation handles the publish/release step

If you later switch to a tag-driven workflow, then a maintainer would be the one
to create and push the release tag.

## Version Format

Package versions must use:

- `YYYY.M.K`
- `YYYY.M.K-beta.N`

Examples:

- `2026.3.1`
- `2026.3.2-beta.1`

If tags are used manually in the future, they should use:

- `vYYYY.M.K`
- `vYYYY.M.K-beta.N`

Examples:

- `v2026.3.1`
- `v2026.3.2-beta.1`

## Required Secrets

GitHub Actions publishing requires:

- `NPM_TOKEN`

Without it, the release workflow can still prepare the version PR, but npm
publish will fail.
