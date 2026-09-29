// Injects the server-rendered app into dist/index.html so the shipped page
// contains real content (visible to crawlers and with JavaScript disabled).
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssrDir = path.resolve("dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-html-->")) throw new Error("dist/index.html is missing the <!--app-html--> placeholder");

await fs.writeFile(path.join(dist, "index.html"), template.replace("<!--app-html-->", render()));
await fs.rm(ssrDir, { recursive: true, force: true });
console.log("prerendered dist/index.html");
