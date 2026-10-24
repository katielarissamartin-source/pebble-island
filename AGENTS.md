# Pebble Island: rules for every tool that edits this repo

Claude and ChatGPT both edit this app. Neither can see the other's chat. This file is the shared source of truth. Read it before changing anything, and update it in the same pull request when a rule or the file list changes.

Real children use this app every day on tablets. Do not break the live site.

## Where things live
- Repo: `katielarissamartin-source/pebble-island`. Branch `main` is the live site.
- Live: https://pebble-island.vercel.app (Vercel project `pebble-island`, team `kt1010101`). Every push to `main` makes a production deployment.
- Files sit at the repo root. A `src/` prefix breaks the whole site.
- There is no build step. `index.html` loads each script with a `<script>` tag.

## Hard rules
1. **No direct Vercel deployments.** Never use `create_deployment`, `assign_alias`, rollbacks, `vercel deploy` or a dashboard upload to change the live site. They bypass `main` and have already wiped other work once.
2. **Never push to `main`.** Work on a branch, open a pull request, and merge only when KT says to in that chat.
3. **Start from the latest `main`.** Pull it before you branch. Pull it again before you merge; if it changed, merge it into your branch and re-test.
4. **Never commit** the family code, the hub password or any child data.

## The service worker cache
`sw.js` caches files cache-first. A changed file does not reach tablets unless the cache name changes.
- When any existing app file changes, set `CACHE` in `sw.js` to one more than the number on `main` **at merge time**, not when you branched. If `main` moved, re-check before merging.
- New app files go in the `CORE` list in `sw.js` and get a `<script>` tag in `index.html`.
- Docs-only changes (like this file) need no bump.
- Edit only the lines you need in `index.html` and `sw.js`.

## File ownership
Prefer a new file over editing a shared one.
- Claude: `hub-plus.js` (Audrey's Hub), `lesson-journey.js`, `themed-engine.js`, `kid-mascots.js`, `theme-ivy.js`, `theme-hayden.js`.
- ChatGPT: `island-subjects.js`, `parent-clarity.js`, `curriculum-audit.js`, `year6-curriculum.js`, and files it adds.
- Shared, one tool at a time: `index.html`, `sw.js`, `care.js`, `part-a.js`, `part-b.js`, `curriculum-pack.js`, `learning-studio.js`, `lessons-extra.js`, the `x-y*-*.js` lesson files.

If you need to change a file owned by the other tool, say so in the pull request and keep the change minimal.

## Going live
Merging to `main` puts the change live within about a minute (Vercel auto-assigns `pebble-island.vercel.app` to each `main` production build). Do not point the domain by hand. If a build shows "Staged" instead of live, stop and tell KT; she promotes it once in the Vercel dashboard.

## Before you merge
- Check the Vercel preview for your branch loads and its `/sw.js` shows your cache name.
- After merging, fetch `/sw.js` and one changed file from the live site and confirm they match `main`.

## Pull request description (this is the handoff)
Every pull request description must include:
- What changed and why
- Files touched
- New cache name (or "no bump, docs only")
- Anything unfinished or untested

KT pastes the PR link into the other tool's chat as the handoff. Before starting work, read the most recent merged pull requests.

## Unmerged work
- ChatGPT's sticker atlas (`sticker-atlas.js`) was built from an old copy (sw v49). Rebuild it on top of current `main` before opening a pull request.

## Kids' content
- Very short sentences, small numbers, read-aloud, tapping not typing, calm visuals. Australian English, Australian Curriculum v9.
- No snails anywhere.
- First Nations lessons keep the standard respectful wording and are not themed.

## Roll back
Revert the commit on `main` through a pull request. Do not hand-edit or re-pin a deployment.
