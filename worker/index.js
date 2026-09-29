// Static assets are served by Cloudflare directly; this script only runs for the
// paths listed in `assets.run_worker_first` in wrangler.jsonc.
//
// Google Search Console's HTML-file verification must be served at its exact
// .html URL, but the assets `auto-trailing-slash` mode would 307-redirect it to
// the extensionless path, so it is answered here instead.
const VERIFICATION_FILES = {
  "/google141e7734458b5ef6.html": "google-site-verification: google141e7734458b5ef6.html",
};

export default {
  async fetch(request, env) {
    const body = VERIFICATION_FILES[new URL(request.url).pathname];
    if (body) return new Response(body, { headers: { "content-type": "text/html; charset=utf-8" } });
    return env.ASSETS.fetch(request);
  },
};
