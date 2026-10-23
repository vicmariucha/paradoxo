import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";
import { formatDate, postQuery, postsQuery, readTime } from "@/lib/blog";

/**
 * Fetched live from Supabase in the browser (ssr: false), not prerendered —
 * the slug isn't known at build time and, more importantly, this keeps
 * publishing instant: a post created/edited in /admin shows up here without
 * a site rebuild.
 */
export const Route = createFileRoute("/blog_/$slug")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Blog | Paradoxo" }],
  }),
  component: BlogDetail,
});

function BlogDetail() {
  const { slug } = Route.useParams();
  const { data: post, isError } = useQuery(postQuery(slug));
  const { data: allPosts } = useQuery(postsQuery);
  const isLoading = post === undefined && !isError;
  useReveal([isLoading, slug]);
  // See the comment in src/routes/blog.tsx: checking `=== undefined` instead
  // of react-query's `isLoading` is what makes this correctly show "Carregando…"
  // instead of jumping straight to "not found" while the first fetch is
  // still in flight but not (by v5's isLoading definition) "isFetching" yet.
  const related = (allPosts ?? []).filter((p) => p.slug !== slug).slice(0, 3);

  if (isLoading) {
    return (
      <SiteLayout>
        <section className="px-6 py-44 text-center">
          <p className="text-sm text-muted-foreground">Carregando…</p>
        </section>
      </SiteLayout>
    );
  }

  if (isError || !post) return <BlogNotFound />;

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-16 pt-44 lg:px-10 lg:pt-52">
        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full rounded-b-[2rem] object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 rounded-b-[2rem] bg-background/80" />
        <div className="relative mx-auto max-w-[1000px]">
          <Link
            to="/blog"
            className="reveal inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold"
          >
            <ArrowLeft size={16} /> Blog
          </Link>

          <p className="overline reveal mt-8" data-delay="60">
            {formatDate(post.published_at)} · {readTime(post.body_html)} min de leitura
          </p>
          <h1
            className="reveal mt-4 max-w-3xl font-display text-4xl leading-[1.08] lg:text-6xl"
            data-delay="120"
          >
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <div className="reveal mt-6 flex flex-wrap gap-2" data-delay="180">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* COVER */}
      {post.cover_image_url && (
        <section className="px-6 lg:px-10">
          <div className="reveal mx-auto max-w-[1000px] overflow-hidden rounded-2xl">
            <img
              src={post.cover_image_url}
              alt={post.cover_image_alt ?? post.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </section>
      )}

      {/* BODY */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div
          className="article-prose reveal mx-auto max-w-[1000px]"
          data-delay="100"
          dangerouslySetInnerHTML={{ __html: post.body_html }}
        />
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="border-t border-border/60 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1400px]">
            <p className="overline reveal">Outros artigos</p>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  data-delay={(i % 3) * 90}
                  className="reveal group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/30 transition-colors duration-300 hover:border-gold/50"
                >
                  {r.cover_image_url && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={r.cover_image_url}
                        alt={r.cover_image_alt ?? r.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">
                      {formatDate(r.published_at)}
                    </p>
                    <h3 className="mt-2 font-display text-xl leading-snug text-foreground">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
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

function BlogNotFound() {
  return (
    <SiteLayout>
      <section className="px-6 pb-24 pt-44 text-center lg:pt-52">
        <p className="overline">404</p>
        <h1 className="mt-6 font-display text-4xl">Artigo não encontrado.</h1>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[0.75rem] uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-gold-soft"
        >
          Ver todos os artigos
        </Link>
      </section>
    </SiteLayout>
  );
}