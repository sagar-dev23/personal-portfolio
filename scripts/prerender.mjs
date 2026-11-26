// Prerenders every route to static HTML:
//   /                -> dist/index.html
//   /automation      -> dist/automation.html      (served at /automation by the
//   /work/<slug>     -> dist/work/<slug>.html       Worker's auto-trailing-slash mode)
//   404              -> dist/404.html
// Each page gets its own <title>, meta description, canonical, Open Graph tags and
// JSON-LD; the stylesheet is inlined and the hero/body fonts are preloaded.
// sitemap.xml is generated from the same route list.
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE = "https://sagr.work";
const dist = path.resolve("dist");
const ssrDir = path.resolve("dist-ssr");

const { render, ROUTES, NOT_FOUND } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
let template = await fs.readFile(path.join(dist, "index.html"), "utf8");
for (const marker of ["<!--head-->", "<!--app-html-->"]) {
  if (!template.includes(marker)) throw new Error(`dist/index.html is missing ${marker}`);
}

// Inline the stylesheet.
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (!cssLink) throw new Error("stylesheet link not found in dist/index.html");
const css = await fs.readFile(path.join(dist, cssLink[1]), "utf8");
template = template.replace(cssLink[0], () => `<style>${css}</style>`);

// Preload the fonts used above the fold.
const assets = await fs.readdir(path.join(dist, "assets"));
const preloads = ["space-grotesk-latin-500-normal", "inter-latin-400-normal"].map(name => {
  const file = assets.find(f => f.startsWith(name) && f.endsWith(".woff2"));
  if (!file) throw new Error(`font ${name} not found in dist/assets`);
  return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`;
});

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function head(route) {
  const url = route.path === "/" ? `${SITE}/` : `${SITE}${route.path}`;
  const image = `${SITE}${route.image || "/og-image.jpg"}`;
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    route.noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.ogType || "website"}" />`,
    `<meta property="og:site_name" content="Sagar Panchal" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="${route.image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...preloads,
  ];
  if (route.schema?.length) {
    const json = JSON.stringify({ "@context": "https://schema.org", "@graph": route.schema }).replace(/</g, "\\u003c");
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }
  // Tells the client which route to hydrate (the 404 page is served at any URL).
  tags.push(`<script>window.__ROUTE__=${JSON.stringify(route.path)}</script>`);
  return tags.join("\n");
}

function outFile(route) {
  if (route.path === "/") return "index.html";
  if (route === NOT_FOUND) return "404.html";
  return `${route.path.slice(1)}.html`;
}

for (const route of [...ROUTES, NOT_FOUND]) {
  const html = template
    .replace("<!--head-->", () => head(route))
    .replace(/<html lang="en">/, `<html lang="en" data-theme="${route.theme || "home"}">`)
    .replace("<!--app-html-->", () => render(route));
  const file = path.join(dist, outFile(route));
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(r => `  <url><loc>${r.path === "/" ? `${SITE}/` : `${SITE}${r.path}`}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`prerendered ${ROUTES.length} pages + 404, sitemap.xml with ${ROUTES.length} URLs`);
