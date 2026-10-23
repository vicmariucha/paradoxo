#!/usr/bin/env node
/**
 * Generates public/sitemap.xml.
 *
 * Static routes are hardcoded below (the site's whole non-blog structure
 * rarely changes). Blog post URLs are fetched from Supabase at build time
 * (best-effort: if VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY aren't set —
 * e.g. running this locally without a .env — blog posts are simply left
 * out of the sitemap rather than failing the build; search engines still
 * find them by following links from /blog).
 *
 * Runs as a prebuild step ("build": "node scripts/generate-sitemap.mjs && vite build && ...")
 * so the freshly written public/sitemap.xml gets copied into
 * .output/public/sitemap.xml by Vite's normal public-dir copy behavior.
 */

import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_PATH = join(ROOT, "public", "sitemap.xml");

const DOMAIN = "https://www.suporteparadoxo.com.br";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/servicos", changefreq: "monthly", priority: "0.9" },
  { path: "/portfolio", changefreq: "monthly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/sobre", changefreq: "monthly", priority: "0.7" },
  { path: "/contato", changefreq: "monthly", priority: "0.8" },
];

async function getBlogRoutes() {
  const url = process.env["VITE_SUPABASE_URL"];
  const anonKey = process.env["VITE_SUPABASE_ANON_KEY"];
  if (!url || !anonKey) {
    console.warn("[generate-sitemap] VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY not set — skipping blog posts in sitemap.");
    return [];
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/posts?select=slug&published=eq.true&published_at=lte.${encodeURIComponent(new Date().toISOString())}`,
      { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } },
    );
    if (!res.ok) throw new Error(`Supabase respondeu ${res.status}`);
    const rows = await res.json();
    return rows.map((row) => ({ path: `/blog/${row.slug}`, changefreq: "monthly", priority: "0.6" }));
  } catch (err) {
    console.warn(`[generate-sitemap] Falha ao buscar posts no Supabase, seguindo sem eles: ${err.message || err}`);
    return [];
  }
}

function buildXml(routes) {
  const urls = routes
    .map(
      (r) =>
        `  <url>\n` +
        `    <loc>${DOMAIN}${r.path}</loc>\n` +
        `    <changefreq>${r.changefreq}</changefreq>\n` +
        `    <priority>${r.priority}</priority>\n` +
        `  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  const blogRoutes = await getBlogRoutes();
  const allRoutes = [...STATIC_ROUTES, ...blogRoutes];
  const xml = buildXml(allRoutes);
  await writeFile(OUT_PATH, xml, "utf8");
  console.log(`[generate-sitemap] Wrote ${allRoutes.length} URL(s) (${blogRoutes.length} blog post(s)) to ${OUT_PATH}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
