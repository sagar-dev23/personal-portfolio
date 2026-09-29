# sagr.work

Portfolio site for Sagar Panchal. Vite + React, prerendered to static HTML at build time and served by a Cloudflare Worker (static assets).

```bash
npm install
npm run dev         # local dev server
npm run build       # production build -> dist/
npm run cf:preview  # build + run the Worker locally (wrangler dev)
npm run deploy      # build + deploy to Cloudflare
npm run images      # regenerate public/images/ from assets-src/
```

Cloudflare Workers Builds (Git integration) settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
