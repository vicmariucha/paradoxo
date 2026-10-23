#!/usr/bin/env node
/**
 * Post-build fix for a real bug in the TanStack Start + Nitro "static" preset
 * combo (nitro@3.0.260603-beta, @tanstack/start-plugin-core@1.171.39, as of
 * this writing — verify this is still needed after upgrading either).
 *
 * WHAT'S BROKEN
 * --------------
 * Every prerendered `index.html` under `.output/public/**` ships with its
 * hydration script pointing at a Vite dev-only virtual module that does not
 * exist in a static build:
 *
 *   <link rel="modulepreload" href="/@id/virtual:tanstack-start-dev-client-entry"/>
 *   <script type="module" async src="/@id/virtual:tanstack-start-dev-client-entry"></script>
 *
 * That 404s on any static host, so the client JS bundle never loads and
 * nothing that depends on it (in this app: the `.reveal`/`.reveal-in`
 * IntersectionObserver scroll-reveal system in src/hooks/use-reveal.ts) ever
 * runs — most of the page stays invisible even though the raw prerendered
 * HTML is fully populated.
 *
 * ROOT CAUSE (traced, not guessed)
 * ---------------------------------
 * TanStack Start's own prerender step
 * (@tanstack/start-plugin-core/dist/esm/vite/prerender.js -> prerenderWithVite)
 * does the actual page rendering by starting a *second*, freshly re-loaded
 * `vite preview` server (re-evaluating vite.config.ts from scratch) and
 * crawling routes from it over HTTP.
 *
 * The start-manifest virtual module's `load()` hook
 * (@tanstack/start-plugin-core/dist/esm/vite/start-manifest-plugin/plugin.js)
 * decides which client entry URL to bake into the HTML, and it special-cases
 * `this.environment.config.command === "serve"` to always emit the dev-only
 * `/@id/virtual:tanstack-start-dev-client-entry` URL. Vite's `preview`
 * command resolves with `command: "serve"` too (identical to `vite dev`; see
 * vite/dist/node/chunks/config.js `async function preview()`), so this
 * branch fires even though the preview server is actually serving a real,
 * already-built production client bundle, not doing dev SSR. There's a
 * `bundledDev`/`isBundled` escape hatch in that same file, but it's only
 * ever set by TanStack Start's Rsbuild adapter (see the `@rsbuild/core` peer
 * dependency) — nothing wires it up on the Vite side, so it's dead code for
 * a Vite project and there's no supported way to opt out of the dev branch.
 * Confirmed empirically: setting `environments.client.isBundled = true` in
 * vite.config.ts (even gated on Vite's `isPreview` config-env flag, which
 * *is* true during this internal preview server) has zero effect — the
 * emitted HTML is unchanged.
 *
 * Also confirmed NOT viable:
 *   - Upgrading nitro (tried 3.0.260610-beta, the latest published build as
 *     of this writing): same broken output.
 *   - Upgrading @tanstack/react-start / start-plugin-core / router-plugin:
 *     already pinned to the latest published versions.
 *
 * So until upstream fixes this, we patch the *output*: every prerendered
 * HTML file's dev-entry reference is swapped for the real, hashed client
 * entry chunk that the same build actually produced — discovered
 * programmatically from Vite's own build manifest (never hardcoded, since
 * the hash changes every build), never guessed.
 *
 * HOW
 * ---
 * vite.config.ts turns on `build.manifest: true` for the client environment
 * during `npm run build` only, which makes Vite write
 * `.output/public/.vite/manifest.json` — a real, first-party mapping from
 * each build input to its actual hashed output file. This script:
 *
 *   1. Reads that manifest and finds the one chunk marked `isEntry: true`
 *      (this build's actual production client entry — confirmed by
 *      inspecting its contents: it's the chunk that calls
 *      `hydrateRoot`/`createRoot`).
 *   2. Rewrites every `.html` file under `.output/public/**`, replacing all
 *      occurrences of the broken `/@id/virtual:tanstack-start-dev-client-entry`
 *      URL with `/assets/<real-hashed-name>.js`.
 *   3. Verifies the real file it just pointed HTML at actually exists on
 *      disk, and that zero broken references remain anywhere in the output
 *      — if either check fails, it throws and fails the build loudly rather
 *      than silently shipping broken HTML again.
 *   4. Deletes the manifest (`.output/public/.vite/`) afterwards — it's a
 *      build-time-only artifact, not meant to ship to production.
 *
 * Wired into `npm run build` as: "vite build && node scripts/fix-static-client-entry.mjs"
 */

import { readFile, writeFile, readdir, rm, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", ".output", "public");
const MANIFEST_PATH = join(PUBLIC_DIR, ".vite", "manifest.json");

const BROKEN_ENTRY_URL = "/@id/virtual:tanstack-start-dev-client-entry";
// Also guard against a basePath-prefixed variant, in case one is ever added.
const BROKEN_ENTRY_RE = /\/@id\/virtual:tanstack-start-dev-client-entry/g;

async function findRealClientEntry() {
  let manifestRaw;
  try {
    manifestRaw = await readFile(MANIFEST_PATH, "utf8");
  } catch (error) {
    throw new Error(
      `fix-static-client-entry: could not read the Vite build manifest at ` +
        `${MANIFEST_PATH}. Make sure vite.config.ts sets ` +
        `\`environments.client.build.manifest: true\` during \`npm run build\`. ` +
        `(underlying error: ${error.message})`,
    );
  }

  const manifest = JSON.parse(manifestRaw);
  const entries = Object.values(manifest).filter((entry) => entry.isEntry);

  if (entries.length === 0) {
    throw new Error(
      "fix-static-client-entry: no entry chunk (isEntry: true) found in the " +
        "Vite build manifest — cannot determine the real client entry file. " +
        "Refusing to guess.",
    );
  }
  if (entries.length > 1) {
    throw new Error(
      `fix-static-client-entry: expected exactly one client entry chunk in ` +
        `the build manifest, found ${entries.length} ` +
        `(${entries.map((e) => e.file).join(", ")}). The client build's ` +
        `rollup input may have changed — update this script's assumptions.`,
    );
  }

  const entry = entries[0];
  if (!entry.file || !entry.file.startsWith("assets/")) {
    throw new Error(
      `fix-static-client-entry: entry chunk has an unexpected file path ` +
        `"${entry.file}" — expected something under "assets/".`,
    );
  }

  const realFilePath = join(PUBLIC_DIR, entry.file);
  try {
    const fileStat = await stat(realFilePath);
    if (!fileStat.isFile() || fileStat.size === 0) {
      throw new Error("not a non-empty file");
    }
  } catch (error) {
    throw new Error(
      `fix-static-client-entry: the manifest points at "${entry.file}" as ` +
        `the real client entry, but ${realFilePath} doesn't exist (or is ` +
        `empty) on disk. Refusing to write a still-broken reference into ` +
        `the HTML. (underlying error: ${error.message})`,
    );
  }

  return `/${entry.file}`;
}

async function listHtmlFiles(dir) {
  const results = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".vite") continue; // build manifest dir, not page output
      results.push(...(await listHtmlFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      results.push(fullPath);
    }
  }
  return results;
}

async function main() {
  const realEntryUrl = await findRealClientEntry();
  console.log(
    `[fix-static-client-entry] Real client entry: ${realEntryUrl}`,
  );

  const htmlFiles = await listHtmlFiles(PUBLIC_DIR);
  if (htmlFiles.length === 0) {
    throw new Error(
      `fix-static-client-entry: found no .html files under ${PUBLIC_DIR} — ` +
        "did prerendering run?",
    );
  }

  let patchedCount = 0;
  for (const filePath of htmlFiles) {
    const html = await readFile(filePath, "utf8");
    if (!BROKEN_ENTRY_RE.test(html)) continue;
    BROKEN_ENTRY_RE.lastIndex = 0;
    const fixed = html.replace(BROKEN_ENTRY_RE, realEntryUrl);
    await writeFile(filePath, fixed);
    patchedCount += 1;
  }

  console.log(
    `[fix-static-client-entry] Patched ${patchedCount}/${htmlFiles.length} HTML file(s).`,
  );

  // Verify: nothing broken left behind anywhere in the output.
  const stillBroken = [];
  for (const filePath of htmlFiles) {
    const html = await readFile(filePath, "utf8");
    if (html.includes(BROKEN_ENTRY_URL)) stillBroken.push(filePath);
  }
  if (stillBroken.length > 0) {
    throw new Error(
      `fix-static-client-entry: ${stillBroken.length} file(s) still contain ` +
        `the broken dev-client-entry reference after patching:\n` +
        stillBroken.join("\n"),
    );
  }

  // Clean up the build-time-only manifest dir so it doesn't ship to prod.
  await rm(join(PUBLIC_DIR, ".vite"), { recursive: true, force: true });

  console.log("[fix-static-client-entry] Done — no broken references remain.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
