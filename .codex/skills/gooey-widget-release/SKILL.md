---
name: gooey-widget-release
description: Release the Gooey web widget from this repo. Use when asked to bump the widget version, publish with scripts/publish.sh, verify the jsDelivr URLs, or purge jsDelivr cache aliases after a release.
---

# Gooey Widget Release

Use this skill for releases of `/Users/dev/Projects/dara/gooey-web-widget`.

## Workflow

1. Confirm the repo is on `master` and the worktree is clean before changing the version.
2. Update the version in `package.json`.
   Treat the bump type explicitly:
   - patch: `2.8.5 -> 2.8.6`
   - minor: `2.8.5 -> 2.9.0`
   - major: `2.8.5 -> 3.0.0`
3. Run `npm install` from the repo root so `package-lock.json` picks up the same version metadata.
4. Review the diff. For a normal release prep, only `package.json` and `package-lock.json` should change.
5. Commit the version bump with the version string as the message, for example `v2.9.0`.
6. Publish with `./scripts/publish.sh`.

## What `scripts/publish.sh` Does

Read [scripts/publish.sh](/Users/dev/Projects/dara/gooey-web-widget/scripts/publish.sh) if behavior matters. As of this repo state, it:

- reads the version from `package.json`
- checks out a detached `HEAD`
- runs `npm install`
- runs `npm run build`
- force-adds `dist/`
- creates a detached-head commit `publish: $VERSION`
- tags that publish commit with `$VERSION`
- pushes `master` and tags to `origin`
- checks out the previous branch
- verifies jsDelivr for `@$VERSION` and `@2`

Important consequence:
- the version bump commit lands on `master`
- the publish commit contains built `dist/` artifacts and is only reachable by the release tag

## Post-Publish Verification

After `./scripts/publish.sh`, verify:

- the script exited successfully
- `master` is checked out again
- `git status --short --branch` shows `master` aligned with `origin/master`
- jsDelivr headers for the release URL include the expected `x-jsd-version`

Primary release URL pattern:

```text
https://cdn.jsdelivr.net/gh/GooeyAI/gooey-web-widget@VERSION/dist/lib.js
```

Alias URL patterns that may need purging:

```text
https://cdn.jsdelivr.net/gh/GooeyAI/gooey-web-widget@MAJOR/dist/lib.js
https://cdn.jsdelivr.net/gh/GooeyAI/gooey-web-widget@MAJOR.MINOR/dist/lib.js
```

## jsDelivr Purge

If the user asks to purge cache, purge aliased URLs with `https://purge.jsdelivr.net/...`, not the fixed version URL. Example for `2.9.0`:

```text
https://purge.jsdelivr.net/gh/GooeyAI/gooey-web-widget@2/dist/lib.js
https://purge.jsdelivr.net/gh/GooeyAI/gooey-web-widget@2.9/dist/lib.js
```

Then verify both CDN aliases resolve with `x-jsd-version: 2.9.0`.

## Command Checklist

```bash
git checkout master
git status --short --branch
```

```bash
npm install
git add -A
git commit -m "vX.Y.Z"
./scripts/publish.sh
```

```bash
curl -fsSL https://purge.jsdelivr.net/gh/GooeyAI/gooey-web-widget@X/dist/lib.js
curl -fsSL https://purge.jsdelivr.net/gh/GooeyAI/gooey-web-widget@X.Y/dist/lib.js
curl -I -s https://cdn.jsdelivr.net/gh/GooeyAI/gooey-web-widget@X/dist/lib.js
curl -I -s https://cdn.jsdelivr.net/gh/GooeyAI/gooey-web-widget@X.Y/dist/lib.js
```

## Guardrails

- Do not publish from a dirty tree unless the user explicitly wants unrelated changes included.
- Do not assume patch bumps; use the bump type the user requests.
- If `npm install` changes anything besides version metadata unexpectedly, inspect before committing.
- Expect `./scripts/publish.sh` to require network and elevated git access.
