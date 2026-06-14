import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";
import { HOME_PORTFOLIO } from "@/lib/site-data";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const item = HOME_PORTFOLIO.find((p) => p.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.item.title} — PARADOXO` },
          { name: "description", content: loaderData.item.description },
          { property: "og:title", content: `${loaderData.item.title} — PARADOXO` },
          { property: "og:description", content: loaderData.item.description },
          { property: "og:image", content: loaderData.item.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <section className="px-6 pb-24 pt-44 text-center lg:pt-52">
        <h1 className="font-display text-4xl">Item não encontrado</h1>
        <Link to="/portfolio" className="mt-8 inline-flex items-center gap-2 text-gold">
          <ArrowLeft size={16} /> Voltar ao portfólio
        </Link>
      </section>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <section className="px-6 pb-24 pt-44 text-center lg:pt-52">
        <h1 className="font-display text-4xl">Algo deu errado</h1>
      </section>
    </SiteLayout>
  ),
  component: PortfolioDetail,
});

function PortfolioDetail() {
  useReveal();
  const { item } = Route.useLoaderData();

  return (
    <SiteLayout>
      <section className="px-6 pb-20 pt-36 lg:px-10 lg:pt-44">
        <div className="mx-auto max-w-[1400px]">
          <Link
            to="/portfolio"
            className="reveal inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold"
          >
            <ArrowLeft size={16} /> Portfólio
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="reveal overflow-hidden rounded-2xl" data-delay="100">
              <img
                src={item.image}
                alt={item.title}
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>

            <div className="reveal" data-delay="200">
              <p className="text-[0.7rem] uppercase tracking-[0.25em] text-gold">{item.category}</p>
              <h1 className="mt-4 font-display text-4xl leading-tight lg:text-6xl">{item.title}</h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              <ul className="mt-8 space-y-3">
                {item.details.map((d: string) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-foreground/90">
                    <Check size={18} className="mt-0.5 shrink-0 text-gold" />
                    {d}
                  </li>
                ))}
              </ul>

              <Link
                to="/contato"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-9 py-4 text-[0.78rem] uppercase tracking-[0.18em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft"
              >
                Solicitar projeto
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
