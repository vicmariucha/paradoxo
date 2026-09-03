import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowDown, Pause, Play, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";
import { useScrollBg } from "@/hooks/use-scroll-bg";
import { HOME_PORTFOLIO, PORTFOLIO } from "@/lib/site-data";
import type { PortfolioItem } from "@/lib/site-data";

import heroImg from "@/assets/hero.jpg";
import heroVideo from "@/assets/hero-section-background.mp4.asset.json";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import portKits from "@/assets/port-kits.jpg";
import ctaHomeImg from "@/assets/cta-home.jpg.asset.json";
import showcaseImpressos from "@/assets/showcase-impressos-v2.png.asset.json";
import showcaseMarketing from "@/assets/showcase-marketing-v2.png.asset.json";
import showcaseFinancas from "@/assets/showcase-financas-v2.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const SHOWCASE = [
  {
    signature: "Impressos",
    image: showcaseImpressos.url,
    tag: "Nosso métier",
    desc: "Pastas comerciais, envelopes, timbrados, cartões e demais papelarias corporativas de altíssimo padrão. Onde o papel encontra a percepção de valor.",
    slug: "impressos",
    cta: "Ver papéis e acabamentos",
  },
  {
    signature: "Marketing",
    image: showcaseMarketing.url,
    tag: "Posicionamento",
    desc: "SEO, gestão de tráfego e campanhas que colocam sua marca onde o cliente certo a encontra.",
    slug: "marketing",
    cta: "Ver como atraímos o cliente certo",
  },
  {
    signature: "Finanças",
    image: showcaseFinancas.url,
    tag: "Estrutura",
    desc: "Organização, processo e clareza financeira para que sua operação cresça com solidez.",
    slug: "financas",
    cta: "Ver como organizamos sua operação",
  },
];



function PortfolioSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate({ from: "/" });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalized = query
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const results = useMemo<PortfolioItem[]>(() => {
    if (!normalized) return [];
    return PORTFOLIO.filter((item) => {
      const hay = `${item.title} ${item.category} ${item.group}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return hay.includes(normalized);
    }).slice(0, 6);
  }, [normalized]);

  const handleSelect = (item: PortfolioItem) => {
    setQuery(item.title);
    setOpen(false);
    navigate({ to: "/portfolio", search: { g: item.group, c: item.category } });
  };

  return (
    <div ref={wrapperRef} className="relative mt-10 max-w-md">
      <div className="flex items-center gap-3 rounded-full border border-border bg-background px-5 py-4 transition-colors focus-within:border-gold">
        <Search size={18} className="text-gold" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "Enter" && results[0]) handleSelect(results[0]);
          }}
          placeholder="Descreva o seu projeto…"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          aria-label="Buscar no portfólio"
          aria-expanded={open}
          aria-controls="portfolio-search-results"
          autoComplete="off"
        />
      </div>

      {open && query.trim() && (
        <div
          id="portfolio-search-results"
          className="absolute z-20 mt-3 w-full overflow-hidden rounded-2xl border border-border bg-background shadow-xl"
        >
          {results.length > 0 ? (
            <ul>
              {results.map((item) => (
                <li key={`${item.title}-${item.category}`}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-muted"
                  >
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.category} · {item.group}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-4 text-sm text-muted-foreground">
              Nenhum resultado encontrado. Tente “cartão”, “pasta” ou “identidade”.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Home() {
  useReveal();
  // Porsche-style smooth background color transition driven by scroll.
  useScrollBg(
    [
      [5, 5, 5], // near-black (hero)
      [255, 255, 255], // pure white (mid-scroll highlight)
      [5, 5, 6], // back to near-black (CTA)
    ],
    1.5,
    "#jornada",
  );
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <SiteLayout>
      <div
        className="pointer-events-none fixed inset-0 -z-10 transition-colors duration-[1100ms] ease-out"
        style={{ backgroundColor: "var(--scroll-bg, var(--background))" }}
        aria-hidden
      />

      {/* HERO — fullscreen, headline bottom-left (Porsche style) */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={heroVideo.url}
          poster={heroPoster.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Contrast layers — keep navbar, h1 and CTAs legible over any video */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1600px] px-6 pb-20 lg:px-12 lg:pb-24">
          <h1 className="font-display text-5xl leading-[0.95] text-foreground sm:text-7xl lg:text-[7rem]">
            Quando qualidade
            <br />
            <span className="text-gold-gradient italic">não é negociável.</span>
          </h1>
          <Link
            to="/servicos"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-foreground/95 px-9 py-4 text-[0.78rem] uppercase tracking-[0.18em] text-background transition-all duration-300 hover:bg-gold hover:text-primary-foreground"
          >
            Descubra o que nos torna diferentes
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 lg:block">
          <ArrowDown size={22} className="animate-bounce text-foreground/70" />
        </div>

        <button
          aria-label={paused ? "Reproduzir" : "Pausar"}
          onClick={togglePlay}
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
                to="/servicos/$slug"
                params={{ slug: s.slug }}
                data-delay={i * 100}
                className="reveal group relative flex min-h-[30rem] translate-y-0 flex-col justify-end overflow-hidden rounded-2xl opacity-100 md:min-h-0 md:aspect-[4/5] md:translate-y-9 md:opacity-0 md:[&.reveal-in]:translate-y-0 md:[&.reveal-in]:opacity-100"
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
                    {s.cta}
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
          <h2 className="reveal text-center font-display text-4xl leading-tight text-white mix-blend-difference lg:text-5xl">
            Sua jornada com a PARADOXO começa agora.
          </h2>
        </div>
      </section>

      {/* PORTFOLIO GRID — expanding rows of 2 (60/40 on hover) */}
      <section className="py-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 lg:gap-8 lg:px-12">
          {Array.from({ length: Math.ceil(HOME_PORTFOLIO.length / 2) }).map((_, row) => {
            const rowItems = HOME_PORTFOLIO.slice(row * 2, row * 2 + 2);
            return (
              <div key={row} className="flex flex-col gap-6 md:flex-row lg:gap-8">
                {rowItems.map((item, i) => {
                  const card = (
                    <>
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <h3 className="absolute bottom-6 left-6 font-display text-2xl text-foreground">{item.title}</h3>

                      {/* Expand-on-hover explore button (bottom-right) */}
                      <span className="absolute bottom-6 right-6 inline-flex items-center justify-center gap-0 overflow-hidden rounded-full bg-gold px-3 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-primary-foreground transition-all duration-300 group-hover:gap-2 group-hover:px-3.5">
                        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[12rem] group-hover:opacity-100">
                          Ver este trabalho
                        </span>
                        <ArrowRight size={16} className="shrink-0" />
                      </span>
                    </>
                  );
                  const cls =
                    "reveal group relative aspect-[4/3] basis-auto translate-y-0 overflow-hidden rounded-2xl opacity-100 transition-[flex-grow,opacity,transform] duration-500 ease-out md:aspect-[16/9] md:grow md:basis-0 md:translate-y-9 md:opacity-0 md:hover:grow-[1.5] md:[&.reveal-in]:translate-y-0 md:[&.reveal-in]:opacity-100";

                  if (item.slug === "impressos")
                    return (
                      <Link key={item.slug} to="/portfolio" search={{ g: "Impressos", curadoria: true }} data-delay={i * 90} className={cls}>
                        {card}
                      </Link>
                    );
                  if (item.slug === "portfolio-completo")
                    return (
                      <Link key={item.slug} to="/portfolio" search={{ g: "Todos" }} data-delay={i * 90} className={cls}>
                        {card}
                      </Link>
                    );
                  if (item.slug === "identidade-visual")
                    return (
                      <Link key={item.slug} to="/portfolio" search={{ g: "Design", c: "Identidade Visual" }} data-delay={i * 90} className={cls}>
                        {card}
                      </Link>
                    );
                  if (item.slug === "design")
                    return (
                      <Link key={item.slug} to="/portfolio" search={{ g: "Design" }} data-delay={i * 90} className={cls}>
                        {card}
                      </Link>
                    );
                  return (
                    <Link key={item.slug} to="/portfolio/$slug" params={{ slug: item.slug }} data-delay={i * 90} className={cls}>
                      {card}
                    </Link>
                  );
                })}
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
              A solução exata para a sua marca está aqui.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Agora ficou mais fácil iniciar um projeto de alto padrão. Conte-nos o
              que precisa e nossa curadoria desenhará a proposta ideal para você.
            </p>
            <PortfolioSearch />
            <Link
              to="/contato"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-9 py-4 text-[0.78rem] uppercase tracking-[0.18em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft"
            >
              Contar o que eu preciso
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="reveal aspect-[4/3] overflow-hidden rounded-2xl" data-delay="120">
            <img src={ctaHomeImg.url} alt="Toque premium PARADOXO" loading="lazy" className="h-full w-full object-cover" />
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
          <a
            href="https://wa.me/5511984431907?text=Ol%C3%A1%2C%20Paradoxo.%20Vim%20pelo%20site%20e%20quero%20a%20Paradoxo%20no%20meu%20pr%C3%B3ximo%20projeto.%20Estou%20buscando%20ajuda%20com%3A%20%5Bimpressos%20premium%20%2F%20marketing%20%2F%20finan%C3%A7as%20%2F%20ainda%20n%C3%A3o%20tenho%20certeza%5D.%20Podemos%20conversar%3F"
            target="_blank"
            rel="noopener noreferrer"
            data-delay="160"
            className="reveal group mt-12 inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-[0.75rem] uppercase tracking-[0.24em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft"
          >
            Quero a PARADOXO no meu próximo projeto.
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
