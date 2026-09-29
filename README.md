# sagr.work

Portfolio site for Sagar Panchal. Vite + React, prerendered to static HTML at build time and served by a Cloudflare Worker (static assets). `worker/index.js` only answers search-engine verification URLs (see `run_worker_first` in `wrangler.jsonc`).

```bash
npm install
npm run dev         # local dev server
npm run build       # production build -> dist/
npm run cf:preview  # build + run the Worker locally (wrangler dev)
npm run deploy      # build + deploy to Cloudflare (wrangler runs the build itself)
npm run images      # regenerate public/images/ from assets-src/
```

Cloudflare Workers Builds (Git integration) settings:

- Build command: leave empty (`wrangler.jsonc` runs `npm run build` before every deploy)
- Deploy command: `npx wrangler deploy`
