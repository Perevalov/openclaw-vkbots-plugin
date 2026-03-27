# Changesets

Use Changesets for user-visible changes.

Create a changeset:

```bash
pnpm changeset
```

This creates a Markdown file in `.changeset/` that describes:

- the release type
- the user-facing summary

Release flow:

1. Contributors add changesets in PRs
2. GitHub Actions opens or updates a version PR
3. Merging that PR updates package versions and `CHANGELOG.md`
4. The release workflow publishes to npm and creates a GitHub release
