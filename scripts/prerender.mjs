// Injects the server-rendered app into dist/index.html so the shipped page
// contains real content (visible to crawlers and with JavaScript disabled),
// then inlines the stylesheet and preloads the above-the-fold fonts so the
// first paint needs no extra round trips.
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssrDir = path.resolve("dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
let html = await fs.readFile(path.join(dist, "index.html"), "utf8");
if (!html.includes("<!--app-html-->")) throw new Error("dist/index.html is missing the <!--app-html--> placeholder");
html = html.replace("<!--app-html-->", render());

// Inline the (single, ~25KB) stylesheet.
const cssLink = html.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (!cssLink) throw new Error("stylesheet link not found in dist/index.html");
const css = await fs.readFile(path.join(dist, cssLink[1]), "utf8");
html = html.replace(cssLink[0], () => `<style>${css}</style>`);

// Preload the fonts used by the hero headline and body copy.
const assets = await fs.readdir(path.join(dist, "assets"));
const preloads = ["space-grotesk-latin-500-normal", "inter-latin-400-normal"].map(name => {
  const file = assets.find(f => f.startsWith(name) && f.endsWith(".woff2"));
  if (!file) throw new Error(`font ${name} not found in dist/assets`);
  return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`;
});
html = html.replace("</title>", () => `</title>\n${preloads.join("\n")}`);

await fs.writeFile(path.join(dist, "index.html"), html);
await fs.rm(ssrDir, { recursive: true, force: true });
console.log("prerendered dist/index.html");
