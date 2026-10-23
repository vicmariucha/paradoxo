import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Blog content pipeline — Supabase-backed.
 *
 * Posts live in the "posts" table (see supabase/migration.sql), edited
 * through the visual editor at /admin. Publishing a post is a plain
 * database write, so it appears on the live site immediately — no site
 * rebuild/redeploy needed (unlike the previous Markdown-file approach).
 */

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_html: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  tags: string[];
  published: boolean;
  published_at: string;
  updated_at: string;
};

const POST_COLUMNS =
  "id, slug, title, excerpt, body_html, cover_image_url, cover_image_alt, tags, published, published_at, updated_at";

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function readTime(html: string) {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function fetchPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_COLUMNS)
    .eq("published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_COLUMNS)
    .eq("slug", slug)
    .eq("published", true)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();
  if (error) throw error;
  return (data as Post | null) ?? null;
}

export async function fetchAllPostsForAdmin(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_COLUMNS)
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

export const postsQuery = queryOptions({
  queryKey: ["posts", "published"],
  queryFn: fetchPublishedPosts,
});

export const postQuery = (slug: string) =>
  queryOptions({ queryKey: ["post", slug], queryFn: () => fetchPostBySlug(slug) });

export const adminPostsQuery = queryOptions({
  queryKey: ["posts", "admin"],
  queryFn: fetchAllPostsForAdmin,
});
