import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown, Pause, Play, Search } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";
import { useScrollBg } from "@/hooks/use-scroll-bg";
import { HOME_PORTFOLIO } from "@/lib/site-data";

import heroImg from "@/assets/hero.jpg";
import portPackaging from "@/assets/port-packaging.jpg";
import portCatalog from "@/assets/port-catalog.jpg";
import portKits from "@/assets/port-kits.jpg";
import portCards from "@/assets/port-cards.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PARADOXO — Quando qualidade não é negociável" },
      { name: "description", content: "Empresa premium de impressos de alto padrão, marketing e consultoria. Transformamos impressão em percepção de valor." },
      { property: "og:title", content: "PARADOXO — Quando qualidade não é negociável" },
      { property: "og:description", content: "Impressos premium, marketing e consultoria para clientes exigentes." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const SHOWCASE = [
  {
    signature: "Impressos",
    image: portPackaging,
    tag: "Nosso métier",
    desc: "Embalagens, cartões e materiais de altíssimo padrão. Onde o papel encontra a percepção de valor.",
    to: "/servicos" as const,
    hash: "impressos",
  },
  {
    signature: "Marketing",
    image: portCards,
    tag: "Posicionamento",
    desc: "SEO, gestão de tráfego e campanhas que colocam sua marca onde o cliente certo a encontra.",
    to: "/servicos" as const,
    hash: "marketing",
  },
  {
    signature: "Finanças",
    image: portCatalog,
    tag: "Estrutura",
    desc: "Organização, processo e clareza financeira para que sua operação cresça com solidez.",
    to: "/servicos" as const,
    hash: "financas",
  },
];



function Home() {
  useReveal();
  // Porsche-style smooth background color transition driven by scroll.
  useScrollBg(
    [
      [5, 5, 5], // near-black (hero)
      [40, 38, 35], // warm charcoal
      [255, 255, 255], // pure white (mid-scroll highlight)
      [40, 38, 35], // warm charcoal
      [5, 5, 6], // back to near-black (CTA)
    ],
    2.5,
    "#jornada",
  );
  const [paused, setPaused] = useState(false);

  return (
    <SiteLayout>
      <div
        className="pointer-events-none fixed inset-0 -z-10 transition-colors duration-700 ease-out"
        style={{ backgroundColor: "var(--scroll-bg, var(--background))" }}
        aria-hidden
      />

      {/* HERO — fullscreen, headline bottom-left (Porsche style) */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Material premium PARADOXO em preto e dourado"
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[8s] ease-out ${
            paused ? "scale-100" : "scale-110"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background/30" />

        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1600px] px-6 pb-20 lg:px-12 lg:pb-24">
          <h1 className="font-display text-5xl leading-[0.95] text-foreground sm:text-7xl lg:text-[7rem]">
            Quando qualidade
            <br />
            <span className="text-gold-gradient italic">não é negociável.</span>
          </h1>
          <Link
            to="/servicos"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground/95 px-9 py-4 text-[0.78rem] uppercase tracking-[0.18em] text-background transition-all duration-300 hover:bg-gold hover:text-primary-foreground"
          >
            Saiba mais
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 lg:block">
          <ArrowDown size={22} className="animate-bounce text-foreground/70" />
        </div>

        <button
          aria-label={paused ? "Reproduzir" : "Pausar"}
          onClick={() => setPaused((v) => !v)}
          className="absolute bottom-10 right-8 flex h-12 w-12 items-center justify-center rounded-full border border-foreground/30 text-foreground/80 backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </section>

      {/* SHOWCASE — services grid (Porsche model grid style) */}
      <section id="jornada" className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SHOWCASE.map((s, i) => (
              <Link
                key={s.signature}
                to={s.to}
                hash={s.hash}
                data-delay={i * 100}
                className="reveal group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl"
              >
                <img
                  src={s.image}
                  alt={s.signature}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                {/* Black gradient at the bottom for text legibility */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/70 to-transparent" />

                <div className="relative p-7">
                  <p className="font-display text-3xl tracking-[0.12em] text-white">{s.signature}</p>
                  <p className="mt-3 text-[0.7rem] uppercase tracking-[0.25em] text-gold">{s.tag}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">{s.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-white transition-colors group-hover:text-gold">
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    Explorar
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO INTRO TITLE */}
      <section className="pt-12 pb-6 lg:pt-20">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <h2 className="reveal text-center font-display text-4xl leading-tight lg:text-5xl">
            Sua jornada com a PARADOXO começa agora.
          </h2>
        </div>
      </section>

      {/* PORTFOLIO GRID — expanding rows of 2 (60/40 on hover) */}
      <section className="py-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-6 lg:gap-14 lg:px-12">
          {Array.from({ length: Math.ceil(HOME_PORTFOLIO.length / 2) }).map((_, row) => {
            const rowItems = HOME_PORTFOLIO.slice(row * 2, row * 2 + 2);
            return (
              <div key={row} className="flex flex-col gap-10 md:flex-row lg:gap-14">
                {rowItems.map((item, i) => (
                  <Link
                    key={item.slug}
                    to="/portfolio/$slug"
                    params={{ slug: item.slug }}
                    data-delay={i * 90}
                    className="reveal group relative aspect-[4/3] grow basis-0 overflow-hidden rounded-2xl transition-[flex-grow] duration-500 ease-out md:aspect-[16/9] md:hover:grow-[1.5]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <h3 className="absolute bottom-6 left-6 font-display text-2xl text-foreground">{item.title}</h3>

                    {/* Expand-on-hover explore button (bottom-right) */}
                    <span className="absolute bottom-6 right-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-3.5 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-primary-foreground transition-all duration-300">
                      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[8rem] group-hover:opacity-100">
                        Explorar
                      </span>
                      <ArrowRight size={16} className="shrink-0" />
                    </span>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </section>



      {/* FINDER CTA — search-style band */}
      <section className="border-y border-border/60 bg-card/30 py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
          <div className="reveal">
            <h2 className="font-display text-4xl leading-tight lg:text-5xl">
              Encontre a solução exata para a sua marca.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Ficou mais fácil iniciar um projeto de alto padrão. Conte o que você
              precisa e nossa curadoria desenha a proposta ideal para você.
            </p>
            <div className="mt-10 flex max-w-md items-center gap-3 rounded-full border border-border bg-background px-5 py-4">
              <Search size={18} className="text-gold" />
              <span className="text-sm text-muted-foreground">Descreva o seu projeto…</span>
            </div>
            <Link
              to="/contato"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-9 py-4 text-[0.78rem] uppercase tracking-[0.18em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft"
            >
              Solicitar projeto
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="reveal aspect-[4/3] overflow-hidden rounded-2xl" data-delay="120">
            <img src={portKits} alt="Projeto premium PARADOXO" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border/60 py-28 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(200,169,106,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="reveal font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Seu próximo projeto merece mais do que fornecedores.
            <br />
            <span className="italic text-gold-gradient">Merece parceiros.</span>
          </h2>
          <Link
            to="/contato"
            data-delay="160"
            className="reveal group mt-12 inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-[0.75rem] uppercase tracking-[0.24em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft"
          >
            Solicitar orçamento
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
