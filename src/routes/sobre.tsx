import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";
import manifestoImg from "@/assets/manifesto.jpg";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — PARADOXO" },
      { name: "description", content: "A história da PARADOXO: autoridade, experiência e visão estratégica aplicadas a impressos de altíssimo padrão." },
      { property: "og:title", content: "Sobre — PARADOXO" },
      { property: "og:description", content: "Autoridade e excelência em soluções empresariais de alto padrão." },
    ],
  }),
  component: Sobre,
});

const VALUES = [
  { t: "Precisão", d: "Nada é deixado ao acaso. Cada milímetro e cada tom são intencionais." },
  { t: "Exclusividade", d: "Não replicamos. Criamos peças que pertencem a uma única marca." },
  { t: "Visão Estratégica", d: "Beleza com propósito — cada decisão serve ao negócio do cliente." },
];

function Sobre() {
  useReveal();

  return (
    <SiteLayout>
      <section className="px-6 pb-20 pt-44 lg:px-10 lg:pt-52">
        <div className="mx-auto max-w-[1400px]">
          <p className="overline reveal">Sobre</p>
          <h1 className="reveal mt-6 max-w-4xl font-display text-5xl leading-[1.05] lg:text-7xl" data-delay="100">
            O paradoxo de tornar o <span className="italic text-gold-gradient">complexo, impecável.</span>
          </h1>
        </div>
      </section>

      <section className="px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 border-t border-border/60 py-24 lg:grid-cols-2 lg:py-32">
          <div className="reveal relative aspect-[5/6] overflow-hidden">
            <img
              src={manifestoImg}
              alt="Detalhe de material premium em preto e dourado"
              width={1200}
              height={1400}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="reveal space-y-6 text-base leading-relaxed text-muted-foreground" data-delay="150">
            <h2 className="font-display text-3xl text-foreground lg:text-4xl">
              Nascemos para resolver uma contradição.
            </h2>
            <p>
              Empresas exigentes buscavam materiais à altura da sua reputação,
              mas encontravam fornecedores — não parceiros. Encontravam preço,
              não percepção de valor. A PARADOXO nasceu para reconciliar o que
              parecia inconciliável: a sofisticação de uma casa de luxo com a
              eficiência de uma operação de elite.
            </p>
            <p>
              Há mais de 15 anos transformamos impressão em linguagem de marca.
              Reunimos artesãos, estrategistas e curadores de materiais num só
              propósito: entregar excelência que se vê, se sente e se lembra.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/30 py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="overline reveal">Nossos valores</p>
          <h2 className="reveal mt-5 max-w-xl font-display text-4xl leading-tight lg:text-5xl" data-delay="100">
            Princípios que nunca entram em negociação.
          </h2>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <div key={v.t} data-delay={i * 100} className="reveal border-t border-border/60 pt-8">
                <span className="font-display text-5xl text-gold/50">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-2xl">{v.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-32 lg:py-44">
        <img src={heroImg} alt="" aria-hidden width={1920} height={1080} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="reveal font-display text-4xl leading-tight lg:text-5xl">
            Construímos reputações <span className="italic text-gold-gradient">um detalhe por vez.</span>
          </h2>
          <Link
            to="/contato"
            data-delay="120"
            className="reveal mt-10 inline-flex items-center gap-3 bg-gold px-10 py-5 text-[0.75rem] uppercase tracking-[0.24em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft"
          >
            Falar com a PARADOXO
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
