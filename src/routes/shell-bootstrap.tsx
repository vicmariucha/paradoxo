import { createFileRoute } from "@tanstack/react-router";

/**
 * Internal, non-content route used only as the build-time target for the
 * SPA fallback shell (see `spa.maskPath` in vite.config.ts). It is never
 * linked to from real pages. At runtime on HostGator, public/.htaccess
 * serves this prerendered page (as "_shell.html") for any URL that has no
 * prerendered snapshot of its own — /admin, and the blog routes, which are
 * rendered entirely client-side (ssr: false) so publishing never needs a
 * rebuild. The shell boots the client JS, which takes over routing and
 * renders the real page in the browser.
 */
export const Route = createFileRoute("/shell-bootstrap")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: () => null,
});
