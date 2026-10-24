# Pebble Island

Learning app for Ivy and Hayden, with a grown-ups' dashboard (Audrey's Hub). Plain JavaScript web app (PWA), hosted on Vercel, cloud sync on Supabase.

Live: https://pebble-island.vercel.app

## Rules for anyone editing (Claude, ChatGPT, people)
- Work on a branch, open a pull request, merge to `main`. Vercel deploys `main`.
- Bump the `CACHE` name in `sw.js` whenever an existing file changes (the service worker is cache-first). Use a number higher than the one on `main`.
- Add new files to the `CORE` list in `sw.js` and a script tag in `index.html`. Keep edits to those two files to the lines needed.
- Prefer a new file over editing a shared one.
- Do not commit the family code, the hub password or any child data.
- Test on a preview deployment before merging.
