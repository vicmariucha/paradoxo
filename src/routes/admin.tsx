import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { ExternalLink, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RichTextEditor } from "@/components/rich-text-editor";
import { supabase } from "@/integrations/supabase/client";
import { adminPostsQuery, formatDate, slugify, type Post } from "@/lib/blog";
import { createPost, deletePost, updatePost, uploadImage, type PostInput } from "@/lib/blog-admin";
import { ConfirmDialog } from "@/components/confirm-dialog";

/**
 * Visual admin panel for the blog: create/edit/publish/delete posts with a
 * rich-text (WYSIWYG) editor, backed directly by Supabase. `ssr: false`
 * keeps this route out of the static prerendered build (see vite.config.ts)
 * — it only ever runs in the visitor's browser, gated by their Supabase
 * login, never baked into the public HTML.
 */
export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Painel — Paradoxo" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    try {
      supabase.auth.getSession().then(({ data }) => {
        setSession(data.session);
        setReady(true);
      });
      const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
      return () => sub.subscription.unsubscribe();
    } catch (err) {
      // Thrown synchronously by src/integrations/supabase/client.ts when
      // VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY aren't set — show a clear
      // setup message instead of crashing to the app's generic error page.
      setConfigError(err instanceof Error ? err.message : String(err));
      setReady(true);
    }
  }, []);

  const checkedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!session) {
      checkedUserId.current = null;
      setIsAdmin(false);
      setAdminChecked(true);
      return;
    }
    if (checkedUserId.current === session.user.id) {
      return;
    }
    setAdminChecked(false);
    supabase.rpc("is_admin").then(({ data }) => {
      checkedUserId.current = session.user.id;
      setIsAdmin(Boolean(data));
      setAdminChecked(true);
    });
  }, [session]);

  if (configError) {
    return (
      <Shell>
        <p className="text-destructive">{configError}</p>
        <p className="mt-4 text-muted-foreground">
          Configure as variáveis de ambiente do Supabase (veja BLOG-ADMIN.md) e recarregue a página.
        </p>
      </Shell>
    );
  }
  if (!ready || (session && !adminChecked)) return <Shell>Carregando…</Shell>;
  if (!session) return <AuthScreen />;
  if (!isAdmin)
    return (
      <Shell>
        <p className="text-muted-foreground">
          Você entrou, mas esta conta não é a dona do site. Peça para promover este e-mail a admin
          (veja BLOG-ADMIN.md) ou entre com a conta certa.
        </p>
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="mt-6 rounded-full border border-border px-5 py-2 text-sm text-foreground transition-colors hover:border-gold"
        >
          Sair
        </button>
      </Shell>
    );

  return <Dashboard />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md">
        <p className="overline">Painel</p>
        <div className="mt-6 font-body text-sm">{children}</div>
      </div>
    </div>
  );
}

const field =
  "w-full rounded-sm border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold";
const label = "block text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground";

function AuthScreen() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (mode === "signup") {
      setInfo(
        "Conta criada. Se a confirmação por e-mail estiver ativa no Supabase, confirme antes de entrar.",
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <form onSubmit={submit} className="w-full max-w-sm">
        <p className="overline text-center">Painel — Paradoxo</p>
        <h1 className="mt-4 text-center font-display text-3xl">
          {mode === "signin" ? "Entrar" : "Criar conta"}
        </h1>

        <div className="mt-8 space-y-4">
          <div>
            <label className={label}>E-mail</label>
            <input
              className={`${field} mt-2`}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <label className={label}>Senha</label>
            <input
              className={`${field} mt-2`}
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        {info && <p className="mt-4 text-sm text-muted-foreground">{info}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-8 w-full rounded-full bg-gold px-6 py-3 text-[0.75rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-gold-soft disabled:opacity-50"
        >
          {busy ? "Aguarde…" : mode === "signin" ? "Entrar" : "Criar conta"}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "signin" ? "Ainda não tem conta? Criar uma" : "Já tem conta? Entrar"}
        </button>
      </form>
    </div>
  );
}

function emptyInput(): PostInput {
  const now = new Date();
  now.setSeconds(0, 0);
  return {
    slug: "",
    title: "",
    excerpt: "",
    body_html: "",
    cover_image_url: null,
    cover_image_alt: null,
    tags: [],
    published: false,
    published_at: now.toISOString(),
  };
}

function toDatetimeLocal(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function Dashboard() {
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useQuery(adminPostsQuery);
  const [editing, setEditing] = useState<Post | "new" | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [input, setInput] = useState<PostInput>(emptyInput());
  const [tagsText, setTagsText] = useState("");
  const [coverBusy, setCoverBusy] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Post | null>(null);

  function openNew() {
    setInput(emptyInput());
    setTagsText("");
    setSlugTouched(false);
    setSaveError(null);
    setEditing("new");
  }

  function openEdit(post: Post) {
    setInput({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      body_html: post.body_html,
      cover_image_url: post.cover_image_url,
      cover_image_alt: post.cover_image_alt,
      tags: post.tags,
      published: post.published,
      published_at: post.published_at,
    });
    setTagsText(post.tags.join(", "));
    setSlugTouched(true);
    setSaveError(null);
    setEditing(post);
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload: PostInput = {
        ...input,
        tags: tagsText
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      if (editing === "new") return createPost(payload);
      if (editing) return updatePost(editing.id, payload);
      throw new Error("Nada para salvar");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setEditing(null);
    },
    onError: (err) => setSaveError(err instanceof Error ? err.message : "Falha ao salvar"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  return (
    <div className="min-h-screen bg-background px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="overline">Painel</p>
            <h1 className="mt-2 font-display text-3xl">Blog da Paradoxo</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/blog"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
            >
              Ver blog <ExternalLink size={14} />
            </a>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              title="Sair"
              aria-label="Sair"
              className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {editing ? (
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">
                {editing === "new" ? "Novo post" : "Editar post"}
              </h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                Cancelar
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveMutation.mutate();
              }}
              className="mt-6 space-y-5"
            >
              <div>
                <label className={label}>Título</label>
                <input
                  className={`${field} mt-2`}
                  required
                  value={input.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setInput((p) => ({ ...p, title, slug: slugTouched ? p.slug : slugify(title) }));
                  }}
                />
              </div>

              <div>
                <label className={label}>Slug (parte final da URL: /blog/slug-aqui)</label>
                <input
                  className={`${field} mt-2`}
                  required
                  value={input.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setInput((p) => ({ ...p, slug: slugify(e.target.value) }));
                  }}
                />
              </div>

              <div>
                <label className={label}>Resumo (aparece na listagem e no compartilhamento)</label>
                <textarea
                  className={`${field} mt-2 min-h-20`}
                  required
                  value={input.excerpt}
                  onChange={(e) => setInput((p) => ({ ...p, excerpt: e.target.value }))}
                />
              </div>

              <div>
                <label className={label}>Imagem de capa</label>
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  {input.cover_image_url && (
                    <img
                      src={input.cover_image_url}
                      alt=""
                      className="h-20 w-32 rounded-sm object-cover"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={coverBusy}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setCoverBusy(true);
                      try {
                        const url = await uploadImage(file);
                        setInput((p) => ({ ...p, cover_image_url: url }));
                      } finally {
                        setCoverBusy(false);
                      }
                    }}
                    className="text-sm text-foreground"
                  />
                </div>
                {input.cover_image_url && (
                  <input
                    className={`${field} mt-3`}
                    placeholder="Texto alternativo da imagem de capa (SEO)"
                    value={input.cover_image_alt ?? ""}
                    onChange={(e) => setInput((p) => ({ ...p, cover_image_alt: e.target.value }))}
                  />
                )}
              </div>

              <div>
                <label className={label}>Tags (separadas por vírgula)</label>
                <input
                  className={`${field} mt-2`}
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="Branding, Impressos de Luxo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={input.published}
                    onChange={(e) => setInput((p) => ({ ...p, published: e.target.checked }))}
                  />
                  Publicado
                </label>
                <div>
                  <label className={label}>Data de publicação</label>
                  <input
                    type="datetime-local"
                    className={`${field} mt-2`}
                    value={toDatetimeLocal(input.published_at)}
                    onChange={(e) =>
                      setInput((p) => ({
                        ...p,
                        published_at: new Date(e.target.value).toISOString(),
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <label className={label}>Conteúdo</label>
                <div className="mt-2">
                  <RichTextEditor
                    value={input.body_html}
                    onChange={(html) => setInput((p) => ({ ...p, body_html: html }))}
                  />
                </div>
              </div>

              {saveError && <p className="text-sm text-destructive">{saveError}</p>}

              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="rounded-full bg-gold px-8 py-3 text-[0.75rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-gold-soft disabled:opacity-50"
              >
                {saveMutation.isPending ? "Salvando…" : "Salvar"}
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-10">
            <button
              type="button"
              onClick={openNew}
              className="flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.75rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-gold-soft"
            >
              <Plus size={16} /> Novo post
            </button>

            <div className="mt-8 divide-y divide-border/60 border-t border-border/60">
              {isLoading && <p className="py-6 text-sm text-muted-foreground">Carregando…</p>}
              {!isLoading && posts?.length === 0 && (
                <p className="py-6 text-sm text-muted-foreground">
                  Nenhum post ainda. Crie o primeiro acima.
                </p>
              )}
              {posts?.map((post) => (
                <div key={post.id} className="flex items-center justify-between gap-4 py-5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="truncate font-display text-lg">{post.title}</h3>
                      <span
                        className={`shrink-0 rounded-full px-3 py-0.5 text-[0.65rem] uppercase tracking-[0.14em] ${
                          post.published ? "bg-gold/15 text-gold" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {post.published ? "Publicado" : "Rascunho"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      /blog/{post.slug} · {formatDate(post.published_at)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(post)}
                      title="Editar"
                      aria-label="Editar"
                      className="rounded-sm border border-border p-2 text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(post)}
                      title="Excluir"
                      aria-label="Excluir"
                      className="rounded-sm border border-border p-2 text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ConfirmDialog
        open={pendingDelete !== null}
        title="Excluir este post?"
        description={
          pendingDelete
            ? `"${pendingDelete.title}" será removido permanentemente. Isso não pode ser desfeito.`
            : ""
        }
        confirmLabel="Excluir post"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) deleteMutation.mutate(pendingDelete.id);
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
