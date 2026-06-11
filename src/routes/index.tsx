import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";
import { SERVICES, DIFFERENTIALS, PORTFOLIO } from "@/lib/site-data";
import heroImg from "@/assets/hero.jpg";
import manifestoImg from "@/assets/manifesto.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PARADOXO — Quando qualidade não é negociável" },
      { name: "description", content: "Empresa premium de impressos de alto padrão, marketing e consultoria. Transformamos impressão em percepção de valor." },
      { property: "og:title", content: "PARADOXO — Quando qualidade não é negociável" },
      { property: "og:description", content: "Impressos premium, marketing e consultoria para clientes exigentes." },
    ],
  }),
  component: Home,
});

const CLIENTS = ["AURÉLIA", "MONTPLAINE", "VIENNE & CO", "ORSINI", "LUMEN", "CASA NOIR"];

function Home() {
  useReveal();

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Embalagem premium em preto e dourado com acabamento em hot stamping"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-24 lg:px-10">
          <div className="max-w-2xl">
            <p className="overline reveal">Soluções empresariais de alto padrão</p>
            <h1 className="reveal mt-6 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl" data-delay="120">
              Quando qualidade <br />
              <span className="text-gold-gradient italic">não é negociável.</span>
            </h1>
            <p className="reveal mt-8 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg" data-delay="240">
              Transformamos impressão em percepção de valor. Materiais de
              altíssimo padrão para marcas que entendem que o detalhe é a
              diferença entre o comum e o memorável.
            </p>
            <div className="reveal mt-12 flex flex-wrap items-center gap-5" data-delay="360">
              <Link
                to="/servicos"
                className="group inline-flex items-center gap-3 bg-gold px-8 py-4 text-[0.75rem] uppercase tracking-[0.22em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft"
              >
                Conheça nossos serviços
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contato"
                className="inline-flex items-center gap-3 border border-border px-8 py-4 text-[0.75rem] uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:border-gold hover:text-gold"
              >
                Solicitar projeto
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">Role</span>
          <span className="h-12 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative overflow-hidden py-28 lg:py-40">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
          <div className="reveal relative aspect-[4/5] overflow-hidden">
            <img
              src={manifestoImg}
              alt="Textura de papel preto com aplicação de dourado"
              width={1200}
              height={1400}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.4s] hover:scale-105"
            />
          </div>
          <div>
            <p className="overline reveal">Manifesto</p>
            <h2 className="reveal mt-6 font-display text-4xl leading-tight lg:text-5xl" data-delay="100">
              Excelência não é um <span className="italic text-gold-gradient">acabamento.</span>
              <br /> É um princípio.
            </h2>
            <div className="reveal mt-8 space-y-6 text-base leading-relaxed text-muted-foreground" data-delay="200">
              <p>
                Na PARADOXO, acreditamos que cada material que carrega o nome de
                uma marca é uma declaração. Um cartão, uma embalagem, uma
                fachada — todos comunicam antes mesmo da primeira palavra.
              </p>
              <p>
                Por isso tratamos precisão como obsessão e percepção de valor
                como ofício. O resultado é simples de reconhecer e difícil de
                imitar: a sensação inconfundível de que algo foi feito com
                inteireza.
              </p>
            </div>
            <div className="reveal mt-10 grid grid-cols-3 gap-6" data-delay="300">
              {[
                { n: "15+", l: "Anos de ofício" },
                { n: "600+", l: "Projetos entregues" },
                { n: "100%", l: "Sob medida" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-4xl text-gold">{s.n}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-y border-border/60 bg-card/30 py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="overline reveal">O que fazemos</p>
              <h2 className="reveal mt-5 max-w-xl font-display text-4xl leading-tight lg:text-5xl" data-delay="100">
                Três frentes. Um único padrão de excelência.
              </h2>
            </div>
            <Link
              to="/servicos"
              className="reveal group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-gold"
              data-delay="200"
            >
              Ver todos os serviços
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-border/60 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Link
                key={s.id}
                to="/servicos"
                hash={s.id}
                data-delay={i * 100}
                className={`reveal group relative flex flex-col justify-between bg-background p-10 transition-colors duration-500 hover:bg-card ${
                  i === 0 ? "lg:row-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl text-gold/70">{s.rank}</span>
                    {i === 0 && (
                      <span className="border border-gold/40 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold">
                        Principal
                      </span>
                    )}
                  </div>
                  <p className="mt-8 text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">{s.tagline}</p>
                  <h3 className="mt-3 font-display text-3xl leading-tight">{s.title}</h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
                <div className="mt-10 flex flex-wrap gap-2">
                  {s.items.slice(0, i === 0 ? 6 : 4).map((it) => (
                    <span key={it} className="border border-border px-3 py-1 text-xs text-muted-foreground">
                      {it}
                    </span>
                  ))}
                </div>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="overline reveal">Portfólio</p>
              <h2 className="reveal mt-5 font-display text-4xl leading-tight lg:text-5xl" data-delay="100">
                Materiais que se sentem <span className="italic text-gold-gradient">antes de se verem.</span>
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="reveal group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-gold"
              data-delay="200"
            >
              Explorar portfólio
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="mt-14 grid auto-rows-[260px] grid-cols-2 gap-4 lg:grid-cols-4">
            {PORTFOLIO.slice(0, 6).map((p, i) => (
              <Link
                key={p.title}
                to="/portfolio"
                data-delay={i * 80}
                className={`reveal group relative overflow-hidden ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                } ${i === 3 ? "lg:row-span-2" : ""}`}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">{p.category}</p>
                  <h3 className="mt-1 font-display text-xl">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIALS */}
      <section className="border-y border-border/60 bg-card/30 py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline reveal">Por que PARADOXO</p>
          <h2 className="reveal mt-5 max-w-2xl font-display text-4xl leading-tight lg:text-5xl" data-delay="100">
            O que nos torna a escolha de quem não aceita o ordinário.
          </h2>
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIALS.map((d, i) => (
              <div key={d.title} data-delay={i * 80} className="reveal group">
                <div className="hairline w-12 transition-all duration-500 group-hover:w-20" />
                <h3 className="mt-6 font-display text-2xl">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline reveal text-center">Confiança de marcas exigentes</p>
          <div className="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {CLIENTS.map((c, i) => (
              <span
                key={c}
                data-delay={i * 60}
                className="reveal text-center font-display text-xl tracking-[0.2em] text-muted-foreground/70 transition-colors duration-300 hover:text-gold"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border/60 py-32 lg:py-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(200,169,106,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="overline reveal">Vamos começar</p>
          <h2 className="reveal mt-6 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl" data-delay="120">
            Seu próximo projeto merece mais do que fornecedores.
            <br />
            <span className="italic text-gold-gradient">Merece parceiros.</span>
          </h2>
          <Link
            to="/contato"
            data-delay="240"
            className="reveal group mt-12 inline-flex items-center gap-3 bg-gold px-10 py-5 text-[0.75rem] uppercase tracking-[0.24em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft"
          >
            Solicitar orçamento
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
