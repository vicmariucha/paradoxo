import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";
import {
  PORTFOLIO,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_GROUPS,
  IMPRESSOS_CURADORIA_EXCLUDE,
  type PortfolioGroup,
} from "@/lib/site-data";

type Group = "Todos" | PortfolioGroup;

const GROUPS: Group[] = ["Todos", ...PORTFOLIO_GROUPS];

export const Route = createFileRoute("/portfolio")({
  validateSearch: (search: Record<string, unknown>): { g?: string; c?: string; curadoria?: boolean } => ({
    g: typeof search.g === "string" ? search.g : undefined,
    c: typeof search.c === "string" ? search.c : undefined,
    curadoria: search.curadoria === true ? true : undefined,
  }),
  head: () => ({
    meta: [],
  }),
  component: Portfolio,
});

function Portfolio() {
  const search = Route.useSearch();
  const initialGroup: Group =
    search.g === "Todos" || PORTFOLIO_GROUPS.includes(search.g as PortfolioGroup)
      ? (search.g as Group)
      : "Impressos";
  const [group, setGroup] = useState<Group>(initialGroup);
  const [active, setActive] = useState<string>("Todos");
  useReveal([active, group]);

  const curadoria = search.curadoria === true && group === "Impressos";

  const categories = useMemo(() => {
    const base =
      group === "Todos"
        ? [...new Set(PORTFOLIO.map((p) => p.category))]
        : PORTFOLIO_CATEGORIES[group].filter((c) => c !== "Todos");
    const visible = base.filter((cat) =>
      PORTFOLIO.some(
        (p) =>
          p.category === cat &&
          (group === "Todos" || p.group === group) &&
          !(curadoria && IMPRESSOS_CURADORIA_EXCLUDE.includes(p.title)),
      ),
    );
    return ["Todos", ...visible];
  }, [group, curadoria]);

  const items = useMemo(
    () =>
      PORTFOLIO.filter(
        (p) =>
          (group === "Todos" || p.group === group) &&
          (active === "Todos" || p.category === active) &&
          !(curadoria && IMPRESSOS_CURADORIA_EXCLUDE.includes(p.title)),
      ),
    [active, group, curadoria],
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

      {/* TABS + FILTERS */}
      <section className="px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px] border-y border-border/60 py-6">
          <div className="flex flex-wrap gap-3">
            {GROUPS.map((g) => (
              <button
                key={g}
                onClick={() => {
                  setGroup(g);
                  setActive("Todos");
                }}
                className={`rounded-full px-7 py-2.5 font-display text-base tracking-wide transition-all duration-300 ${
                  group === g
                    ? "bg-foreground text-background"
                    : "bg-transparent text-muted-foreground hover:text-gold"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {categories.map((cat) => (
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
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => {
            const isIdentidade = p.category === "Identidade Visual";
            return (
              <div
                key={p.title}
                data-delay={(i % 3) * 90}
                className={`reveal group relative overflow-hidden rounded-2xl ${!isIdentidade && p.tall ? "row-span-2" : ""}`}
              >
                <div className={isIdentidade ? "bg-muted" : p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}>
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className={`w-full ${isIdentidade ? "h-auto object-contain" : "h-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110"}`}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-7 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">{p.category}</p>
                  <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                </div>
              </div>
            );
          })}
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
