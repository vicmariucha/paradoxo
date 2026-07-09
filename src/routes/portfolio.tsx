import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";
import { PORTFOLIO, PORTFOLIO_CATEGORIES } from "@/lib/site-data";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfólio — PARADOXO" },
      { name: "description", content: "Showcase de impressos premium: embalagens, catálogos, comunicação visual, uniformes, kits corporativos e fachadas." },
      { property: "og:title", content: "Portfólio — PARADOXO" },
      { property: "og:description", content: "Galeria de projetos de impressos de alto padrão." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [active, setActive] = useState<string>("Todos");
  useReveal([active]);

  const items = useMemo(
    () => (active === "Todos" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === active)),
    [active],
  );

  return (
    <SiteLayout>
      <section className="px-6 pb-16 pt-44 lg:px-10 lg:pt-52">
        <div className="mx-auto max-w-[1400px]">
          <p className="overline reveal">Portfólio</p>
          <h1 className="reveal mt-6 max-w-4xl font-display text-5xl leading-[1.05] lg:text-7xl" data-delay="100">
            Uma galeria de <span className="italic text-gold-gradient">excelência tangível.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg text-muted-foreground" data-delay="200">
            Cada projeto é uma prova de que o padrão PARADOXO se reconhece ao
            primeiro toque.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap gap-3 border-y border-border/60 py-6">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-5 py-2 text-[0.72rem] uppercase tracking-[0.18em] transition-all duration-300 ${
                active === cat
                  ? "border-gold bg-gold text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <div
              key={p.title}
              data-delay={(i % 3) * 90}
              className={`reveal group relative overflow-hidden ${p.tall ? "row-span-2" : ""}`}
            >
              <div className={p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}>
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-7 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">{p.category}</p>
                <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 py-28 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="reveal font-display text-4xl leading-tight lg:text-5xl">
            Imagine sua marca neste padrão.
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
