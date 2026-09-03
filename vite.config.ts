// This project used to be built via @lovable.dev/vite-tanstack-config, a wrapper
// that bundled Lovable's own sandbox/dev-console tooling (asset proxy, componentTagger,
// HMR gate, dev-server-bridge, build-error diagnostics, sandbox port/host detection, etc.)
// on top of the plain Vite/TanStack Start plugins. None of that sandbox tooling is
// relevant once self-hosted, so this file wires up only the genuinely necessary plugins
// directly against the upstream packages, and configures TanStack Start / Nitro to
// prerender the whole site to static HTML/CSS/JS — this app has no server-side
// logic (no DB, no auth, no per-request data), so a fully static build lets it be
// hosted on plain FTP/shared hosting (e.g. HostGator) with no Node.js runtime required.
//
// The static/prerender settings below are gated on `command === "build"`. Nitro's
// "static" preset does not register a dev-time SSR environment (only a build-time
// prerender pass), so if it were always-on `npm run dev` would fail immediately with
// "Vite environment 'ssr' is unavailable". Gating it means `npm run dev` still runs a
// normal SSR dev server (fast HMR, no prerendering) and `npm run build` still produces
// a fully static site in `.output/public`.
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    css: { transformer: "lightningcss" },
    ...(isBuild
      ? {
          // Emit a Vite build manifest (input -> real hashed output file) for
          // the client build. This is read by scripts/fix-static-client-entry.mjs
          // after the build — see that file for why it's needed.
          environments: { client: { build: { manifest: true } } },
        }
      : {}),
    resolve: {
      // Matches the "@/*" -> "./src/*" alias used throughout the app (see
      // tsconfig.json "paths" and components.json "aliases").
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        // Custom SSR entry (src/server.ts) wraps the default TanStack Start
        // handler with nicer error pages; keep pointing at it explicitly like
        // the original Lovable config did.
        server: { entry: "server" },
        // Prerender every route to static HTML at build time, crawling <Link>
        // references from the index pages to discover the dynamic-looking
        // /portfolio/$slug and /servicos/$slug routes automatically.
        // Only enabled for `npm run build` — see note above.
        ...(isBuild
          ? {
              prerender: {
                enabled: true,
                crawlLinks: true,
              },
              // The homepage only links to /portfolio/$slug for 2 of the 6 entries
              // in HOME_PORTFOLIO (src/lib/site-data.ts) — the other 4 slugs are
              // only reachable in the UI via filtered /portfolio?g=... links, so
              // the crawler never visits their dedicated detail pages. The route
              // is still live at those URLs (portfolio.$slug.tsx has no other
              // gate), so list them explicitly to make sure they're prerendered.
              pages: [
                { path: "/portfolio/identidade-visual" },
                { path: "/portfolio/impressos" },
                { path: "/portfolio/portfolio-completo" },
                { path: "/portfolio/design" },
              ],
            }
          : {}),
      }),
      nitro(
        isBuild
          ? {
              preset: "static",
              entry: "src/server.ts",
              prerender: { crawlLinks: false, routes: [] },
            }
          : { entry: "src/server.ts" },
      ),
      viteReact(),
    ],
  };
});
