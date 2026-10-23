import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";
import { formatDate, postsQuery } from "@/lib/blog";

/**
 * Fetched live from Supabase in the browser (ssr: false — see
 * vite.config.ts's prerender filter) instead of baked in at build time, so
 * a post published through /admin appears here immediately, with no site
 * rebuild/redeploy needed.
 */
export const Route = createFileRoute("/blog")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Blog | Paradoxo - Suporte, Finanças e Branding" },
      {
        name: "description",
        content:
          "Artigos sobre impressos de luxo, papelaria executiva e branding corporativo — o ponto de vista da Paradoxo sobre o que transforma percepção de marca em resultado.",
      },
    ],
  }),
  component: Blog,
});

function Blog() {
  useReveal();
  const { data: posts, isError } = useQuery(postsQuery);
  // Deliberately NOT using react-query's `isLoading` here: in v5, `isLoading`
  // is `isPending && isFetching`, which can be `false` even while `posts` is
  // still `undefined` (no data has arrived yet) — that combination fell
  // through every branch below to the final one, which rendered an empty
  // grid with nothing in it (no cards, no "loading", no "empty" message —
  // exactly the blank section that was reported). Checking `posts ===
  // undefined` directly is unambiguous: react-query guarantees it stays
  // undefined until the first fetch actually resolves (success or error),
  // and is always a real (possibly empty) array after that, including
  // during background refetches.
  const isLoading = posts === undefined && !isError;

  return (
    <SiteLayout>
      <section className="px-6 pb-16 pt-44 lg:px-10 lg:pt-52">
        <div className="mx-auto max-w-[1400px]">
          <p className="overline reveal">Blog</p>
          <h1
            className="reveal mt-6 max-w-4xl font-display text-5xl leading-[1.05] lg:text-7xl"
            data-delay="100"
          >
            Ideias sobre <span className="italic text-gold-gradient">percepção de marca.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg text-muted-foreground" data-delay="200">
            Notas e bastidores sobre impressos de luxo, papelaria executiva e o que realmente
            constrói autoridade institucional.
          </p>
        </div>
      </section>

      <section className="px-6 pb-28 lg:px-10">
        <div className="mx-auto max-w-[1400px] border-t border-border/60 pt-16">
          {isError ? (
            <div className="reveal text-center">
              <p className="font-display text-2xl text-muted-foreground">
                Não foi possível carregar os artigos agora.
              </p>
            </div>
          ) : isLoading ? (
            <div className="reveal text-center">
              <p className="text-sm text-muted-foreground">Carregando artigos…</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="reveal text-center">
              <p className="font-display text-2xl text-muted-foreground">Novos artigos em breve.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  data-delay={(i % 3) * 90}
                  className="reveal group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/30 transition-colors duration-300 hover:border-gold/50"
                >
                  {post.cover_image_url && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.cover_image_url}
                        alt={post.cover_image_alt ?? post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">
                      {formatDate(post.published_at)}
                    </p>
                    <h2 className="mt-3 font-display text-2xl leading-snug text-foreground">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-gold">
                      Ler mais
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border/60 py-28 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="reveal font-display text-4xl leading-tight lg:text-5xl">
            Pronto para elevar a percepção da sua marca?
          </h2>
          <Link
            to="/contato"
            data-delay="120"
            className="reveal mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-[0.75rem] uppercase tracking-[0.24em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft"
          >
            Iniciar um projeto
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}