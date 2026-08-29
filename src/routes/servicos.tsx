import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [],
  }),
  component: Servicos,
});

const PROCESS = [
  { n: "01", t: "Imersão", d: "Entendemos sua marca, seu público e a percepção que você deseja construir." },
  { n: "02", t: "Concepção", d: "Curadoria de materiais, acabamentos e direção criativa sob medida." },
  { n: "03", t: "Produção", d: "Execução com controle obsessivo de qualidade em cada etapa." },
  { n: "04", t: "Entrega", d: "Resultado impecável, no prazo, com acompanhamento dedicado." },
];

function Servicos() {
  useReveal();

  return (
    <SiteLayout>
      <section className="px-6 pb-20 pt-44 lg:px-10 lg:pt-52">
        <div className="mx-auto max-w-[1400px]">
          <p className="overline reveal">Serviços</p>
          <h1 className="reveal mt-6 max-w-4xl font-display text-5xl leading-[1.05] lg:text-7xl" data-delay="100">
            Soluções completas com <span className="italic text-gold-gradient">obsessão pelo detalhes.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg text-muted-foreground" data-delay="200">
            Do impresso de luxo à estratégia de marca — um único parceiro para
            elevar toda a comunicação da sua empresa.
          </p>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-28 border-t border-border/60 py-24 lg:py-32 ${i === 0 ? "bg-card/30" : ""}`}
        >
          <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
            <div className="reveal">
              <div className="flex items-center gap-4">
                <span className="font-display text-5xl text-gold/60">{s.rank}</span>
              </div>
              <p className="mt-8 text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">{s.tagline}</p>
              <h2 className="mt-3 font-display text-4xl leading-tight lg:text-5xl">{s.title}</h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">{s.description}</p>
              <Link
                to="/servicos/$slug"
                params={{ slug: s.slug }}
                className="group mt-10 inline-flex items-center gap-3 rounded-full border border-gold/50 px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground"
              >
                {s.ctaLabel}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="reveal" data-delay="150">
              <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 sm:grid-cols-2">
                {s.items.map((it) => (
                  <div key={it} className="flex items-center gap-3 bg-background p-5 text-sm">
                    <Check size={15} className="shrink-0 text-gold" />
                    <span className="text-muted-foreground">{it}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* PROCESS */}
      <section className="border-t border-border/60 bg-card/30 py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline reveal">Como trabalhamos</p>
          <h2 className="reveal mt-5 max-w-xl font-display text-4xl leading-tight lg:text-5xl" data-delay="100">
            Um processo desenhado para a excelência.
          </h2>
          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={p.n} data-delay={i * 100} className="reveal">
                <span className="font-display text-5xl text-gold/50">{p.n}</span>
                <div className="hairline mt-6 w-12" />
                <h3 className="mt-6 font-display text-2xl">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
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
            Solicitar orçamento
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
