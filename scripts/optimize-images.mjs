// Converts the original assets in assets-src/ into web-ready files in public/images/
// and writes src/images.json (paths + intrinsic dimensions) for width/height attributes.
// Run with: npm run images
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SRC = "assets-src";
const OUT = "public/images";
const MANIFEST = "src/images.json";

// kind: "shot" = responsive WebP at `widths` (default 800w + 1600w)
//       "logo"  = raster logo, resized to `width` or `height`
//       "svg"   = copied untouched
const JOBS = [
  { key: "work-phi",        src: "Phi _ Browser_ centered.png",       kind: "shot" },
  { key: "work-devx",       src: "DevX _ Browser_ centered.png",      kind: "shot" },
  { key: "work-momentum91", src: "momentum91.png",                    kind: "shot" },
  { key: "work-allevents",  src: "AllEvents _ Browser_ centered.png", kind: "shot" },
  { key: "portrait",        src: "portrait.png",                      kind: "shot", widths: [400, 800] },

  { key: "logo-webflow",    src: "webflow logo.svg",            kind: "svg" },
  { key: "logo-github",     src: "github_PNG25.png",            kind: "logo", width: 320 },
  { key: "logo-clickup",    src: "ClickUp_Logo.png",            kind: "logo", width: 320 },
  { key: "logo-notion",     src: "Notion_logo.png",             kind: "logo", width: 320 },
  { key: "logo-clarity",    src: "MICROSOFT-CLARITY-LOGO.webp", kind: "logo", width: 320 },
  { key: "logo-hubspot",    src: "HubSpot_Logo.png",            kind: "logo", width: 320 },
  { key: "logo-zapier",     src: "zapier.svg",                  kind: "svg" },
  { key: "logo-make",       src: "Make-Logo-RGB@2x-1.webp",     kind: "logo", width: 320 },
  { key: "logo-n8n",        src: "N8n-logo-new.svg",            kind: "svg" },
  { key: "logo-ga4",        src: "Logo_Google_Analytics.png",   kind: "logo", width: 320 },
  { key: "logo-gtm",        src: "google tag manager.png",      kind: "logo", width: 320 },
  { key: "logo-figma",      src: "Figma-Logo.png",              kind: "logo", width: 320 },

  { key: "client-tixa",      src: "tixa.svg",                    kind: "svg" },
  { key: "client-altiushub", src: "altiushub.svg",               kind: "svg" },
  { key: "client-bestbid",   src: "bestbid.svg",                 kind: "svg" },
  { key: "client-devyami",   src: "devyami.webp",                kind: "logo", height: 64 },
  { key: "client-knockout",  src: "knockout-fightclub-copy.png", kind: "logo", height: 64 },
  { key: "client-ironman",   src: "ironman lifestyle.png",       kind: "logo", height: 64 },
];

const kb = n => (n / 1024).toFixed(0) + "KB";

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const manifest = {};
  for (const job of JOBS) {
    const input = path.join(SRC, job.src);
    const meta = await sharp(input).metadata();
    const inSize = (await fs.stat(input)).size;

    if (job.kind === "svg") {
      const file = `${job.key}.svg`;
      await fs.copyFile(input, path.join(OUT, file));
      manifest[job.key] = { src: `/images/${file}`, width: meta.width, height: meta.height };
      console.log(`${job.key}: copied svg`);
      continue;
    }

    if (job.kind === "shot") {
      const sizes = job.widths || [800, 1600];
      const variants = [];
      for (const w of sizes) {
        const file = `${job.key}-${w}.webp`;
        const info = await sharp(input).resize({ width: w }).webp({ quality: 86, effort: 6 }).toFile(path.join(OUT, file));
        variants.push({ file, w, h: info.height, size: info.size });
      }
      const big = variants[variants.length - 1];
      manifest[job.key] = {
        src: `/images/${big.file}`,
        srcSet: variants.map(v => `/images/${v.file} ${v.w}w`).join(", "),
        width: big.w,
        height: big.h,
      };
      console.log(`${job.key}: ${kb(inSize)} png -> ${variants.map(v => `${v.w}w ${kb(v.size)}`).join(", ")}`);
      continue;
    }

    const file = `${job.key}.webp`;
    let pipeline = sharp(input);
    if (job.width && meta.width > job.width) pipeline = pipeline.resize({ width: job.width });
    if (job.height && meta.height > job.height) pipeline = pipeline.resize({ height: job.height });
    const info = await pipeline.webp({ quality: 92, alphaQuality: 100, effort: 6 }).toFile(path.join(OUT, file));
    manifest[job.key] = { src: `/images/${file}`, width: info.width, height: info.height };
    console.log(`${job.key}: ${kb(inSize)} -> ${kb(info.size)} (${info.width}x${info.height})`);
  }

  // Social preview image: JPEG for maximum crawler compatibility.
  await sharp(path.join(SRC, "portrait.png")).jpeg({ quality: 88, mozjpeg: true }).toFile("public/og-image.jpg");

  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`wrote ${MANIFEST}`);
}

main().catch(err => { console.error(err); process.exit(1); });
