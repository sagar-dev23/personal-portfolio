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

## Content

All copy and project facts live in `src/content/`:

- `projects.js`: website and automation case studies. A project with `caseStudy: false` is listed by name only until there's enough detail for a page. Add a project here and it gets a card, a `/work/<slug>` page and a sitemap entry automatically.
- `site.js`: services, process, toolbox, About-page content. `TIMELINE` is empty until real dates and roles are added; the About page hides the section until then.
- `config.js`: name, contact links, navigation.

Pages are in `src/pages/`, shared components in `src/components/`, and every route (with its title, description and structured data) is declared in `src/routes.js`.
