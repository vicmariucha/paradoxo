import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";
import manifestoImg from "@/assets/manifesto.jpg";
import heroImg from "@/assets/hero.jpg";
import portCards from "@/assets/port-cards.jpg";
import portCatalog from "@/assets/port-catalog.jpg";
import portFacade from "@/assets/port-facade.jpg";
import portKits from "@/assets/port-kits.jpg";
import portPackaging from "@/assets/port-packaging.jpg";

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

const PILLARS = [
  {
    rank: "01",
    title: "Impressão Gráfica",
    text: "O centro de tudo. Onde a marca se torna tangível, o valor ganha forma, textura e permanência. Criamos materiais de alta performance que posicionam, não apenas representam.",
    image: portPackaging,
  },
  {
    rank: "02",
    title: "Marketing, Suporte & Finanças",
    text: "Presença, por si só, não sustenta crescimento. Planejamos e operamos a presença digital com inteligência, e organizamos a base financeira e administrativa com clareza, controle e segurança.",
    image: portCatalog,
  },
  {
    rank: "03",
    title: "Ambiente Institucional",
    text: "Conectamos posicionamento a experiências digitais e físicas coerentes, sofisticadas e homologadas. Traduzimos marca em ambiente.",
    image: portFacade,
  },
];

function Sobre() {
  useReveal();

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="px-6 pb-12 pt-44 lg:px-10 lg:pt-52">
        <div className="mx-auto max-w-[1400px]">
          <p className="overline reveal">Sobre</p>
          <p className="reveal mt-8 max-w-3xl font-display text-2xl italic leading-snug text-gold/90 lg:text-3xl" data-delay="80">
            Criação, desenvolvimento e produções admiráveis!
          </p>
          <h1 className="reveal mt-6 max-w-4xl font-display text-5xl leading-[1.05] lg:text-7xl" data-delay="160">
            O paradoxo de tornar o <span className="italic text-gold-gradient">complexo, tangível e impecável.</span>
          </h1>
        </div>
      </section>

      {/* ORIGEM */}
      <section className="px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 border-t border-border/60 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
          <div className="reveal relative aspect-[5/6] overflow-hidden rounded-2xl">
            <img
              src={manifestoImg}
              alt="Detalhe de material premium em preto e dourado"
              width={1200}
              height={1400}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="reveal space-y-8" data-delay="150">
            <h2 className="font-display text-3xl leading-tight text-foreground lg:text-4xl">
              Nascemos para resolver uma falha silenciosa do mercado.
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Empresas exigentes buscam excelência, mas encontram apenas fornecedores.
                Obtinham preço — não valor. Entrega — não presença. Foi nessa lacuna que surgiu a PARADOXO.
              </p>
              <p>
                Uma gestão sofisticada como uma casa de luxo, com a precisão e eficiência de uma operação de elite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEGADO / FUNDADOR */}
      <section className="border-y border-border/60 bg-card/30 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="reveal lg:col-span-5">
              <p className="overline">Legado</p>
              <h2 className="mt-5 font-display text-3xl leading-tight lg:text-4xl">
                Há mais de duas décadas, o gestor Salomão Junior transforma a impressão gráfica em linguagem corporativa elevada.
              </h2>
            </div>
            <div className="reveal space-y-6 self-end text-base leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7" data-delay="120">
              <p>
                Não como produto, mas como expressão de posicionamento. Cada material carrega intenção, cada detalhe comunica com autoridade, cada entrega constrói percepção.
              </p>
              <p className="font-display text-xl italic leading-snug text-foreground lg:text-2xl">
                Porque no fim, o que permanece não é apenas o que foi dito — é o que foi sentido e eternizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILOSOFIA — IMPRESSÃO COMO CENTRO */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="reveal lg:col-span-7">
              <h2 className="font-display text-3xl leading-tight lg:text-5xl">
                Na PARADOXO, a impressão gráfica é o centro de tudo.
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  É onde a marca se torna tangível. Onde o valor ganha forma, textura e permanência.
                </p>
                <p>
                  Criamos materiais de alta performance que não representam apenas empresas — nos a posicionamos. Impressões que atravessam o olhar, permanecem na memória e elevam a forma como uma marca é percebida.
                </p>
              </div>
            </div>
            <div className="reveal grid grid-cols-2 gap-4 lg:col-span-4 lg:col-start-9" data-delay="120">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <img src={portCards} alt="Cartões em hot stamping" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-2xl">
                <img src={portKits} alt="Kits corporativos premium" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRÊS BRAÇOS */}
      <section className="border-y border-border/60 bg-card/30 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="reveal max-w-2xl">
            <p className="overline">Estrutura</p>
            <h2 className="mt-5 font-display text-3xl leading-tight lg:text-4xl">
              Mas presença, por si só, não sustenta crescimento.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Por isso, além das operações gráficas, ofertamos mais dois braços de ações: Suporte e Finanças.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div
                key={p.rank}
                data-delay={i * 120}
                className="reveal group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="font-display text-4xl text-gold/40">{p.rank}</span>
                  <h3 className="mt-4 font-display text-2xl">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-16 grid gap-8 md:grid-cols-3" data-delay="120">
            <p className="font-display text-2xl leading-tight text-foreground">Nada é isolado.</p>
            <p className="font-display text-2xl leading-tight text-foreground">Nada é genérico.</p>
            <p className="font-display text-2xl leading-tight text-gold/90">Cada elemento existe para fortalecer o outro.</p>
          </div>
        </div>
      </section>

      {/* POSICIONAMENTO FINAL */}
      <section className="px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="reveal space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                A PARADOXO não atua como fornecedora. Atua como estrutura auxiliar nas atividades de sua empresa.
              </p>
              <p>
                Uma estrutura pensada para marcas que entenderam que crescer não é apenas aparecer — é ser percebida, lembrada e escolhida.
              </p>
            </div>
            <div className="reveal" data-delay="120">
              <h2 className="font-display text-3xl leading-tight lg:text-4xl">
                PARADOXO.
              </h2>
              <div className="mt-6 space-y-2 font-display text-2xl italic leading-snug text-gold/90 lg:text-3xl">
                <p>Presença que se vê.</p>
                <p>Valor que se sente.</p>
                <p>Memória que permanece.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-32 lg:py-44">
        <img src={heroImg} alt="" aria-hidden width={1920} height={1080} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="reveal font-display text-4xl leading-tight lg:text-5xl">
            Construímos reputações <span className="italic text-gold-gradient">um<br />detalhe por vez.</span>
          </h2>
          <Link
            to="/contato"
            data-delay="120"
            className="reveal mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-[0.75rem] uppercase tracking-[0.24em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft"
          >
            Falar com a PARADOXO
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
