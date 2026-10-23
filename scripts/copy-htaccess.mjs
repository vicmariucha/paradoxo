#!/usr/bin/env node
/**
 * Copies public/.htaccess into .output/public/.htaccess after the build.
 *
 * WHY THIS EXISTS
 * ----------------
 * Everything else in public/ is copied into the static build output
 * automatically — but that copy step (somewhere in the Vite/Nitro "static"
 * preset pipeline) silently drops dotfiles, so .htaccess never made it into
 * .output/public on its own (confirmed empirically: it's present in
 * public/, absent in .output/public/ after a plain `vite build`). Without
 * it, HostGator has no rewrite rules, so /admin and every /blog/<slug> URL
 * (client-only routes with no prerendered HTML — see vite.config.ts) would
 * 404 instead of falling back to the SPA shell.
 *
 * Wired into `npm run build` as one of the post-build steps, after `vite
 * build` has produced .output/public.
 */

import { copyFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "public", ".htaccess");
const DEST = join(__dirname, "..", ".output", "public", ".htaccess");

await copyFile(SRC, DEST);
console.log(`[copy-htaccess] Copied .htaccess to ${DEST}`);
