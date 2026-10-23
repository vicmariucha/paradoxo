import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client used by the blog (public reads) and the /admin panel
 * (auth + writes). Credentials come from Vite env vars, set in a local
 * `.env` file for development and as build-time env vars in the GitHub
 * Actions workflow for production — see BLOG-ADMIN.md for the full setup.
 *
 * The "anon" key is safe to ship in the client bundle: it only grants
 * whatever the database's Row Level Security policies allow (public read
 * of published posts; writes require a signed-in admin). It is NOT a
 * secret and is not the same as the Supabase "service role" key, which
 * must never appear in frontend code.
 */
function createSupabaseClient() {
  const url = import.meta.env["VITE_SUPABASE_URL"];
  const anonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"];

  if (!url || !anonKey) {
    const missing = [
      ...(!url ? ["VITE_SUPABASE_URL"] : []),
      ...(!anonKey ? ["VITE_SUPABASE_ANON_KEY"] : []),
    ];
    throw new Error(
      `Faltam variáveis de ambiente do Supabase: ${missing.join(", ")}. Veja BLOG-ADMIN.md.`,
    );
  }

  return createClient(url, anonKey, {
    auth: {
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

// Lazily created so a missing env var only throws when the blog/admin code
// actually runs (not for every page of the site, most of which never touch
// Supabase at all).
let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
