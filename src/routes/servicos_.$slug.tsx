import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";
import { SERVICE_DETAILS } from "@/lib/site-data";

export const Route = createFileRoute("/servicos_/$slug")({
  loader: ({ params }) => {
    const service = SERVICE_DETAILS[params.slug];
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    return {
      meta: [
        { property: "og:image", content: service.hero },
      ],
    };
  },
  component: ServiceDetail,
  errorComponent: ServiceError,
  notFoundComponent: ServiceNotFound,
});

function ServiceDetail() {
  useReveal();
  const { service } = Route.useLoaderData();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-16 pt-44 lg:px-10 lg:pt-52">
        <img src={service.hero} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full rounded-b-[2rem] object-cover opacity-20" />
        <div className="absolute inset-0 rounded-b-[2rem] bg-background/80" />
        <div className="relative mx-auto max-w-[1400px]">
          <p className="overline reveal">{service.tagline}</p>
          <h1 className="reveal mt-6 max-w-4xl font-display text-5xl leading-[1.05] lg:text-7xl" data-delay="100">
            {service.title}
          </h1>
          <p className="reveal mt-8 max-w-2xl text-lg text-muted-foreground" data-delay="200">
            {service.intro}
          </p>
          <Link
            to="/contato"
            data-delay="300"
            className="reveal group mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-9 py-4 text-[0.75rem] uppercase tracking-[0.24em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft"
          >
            {service.ctaLabel}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* CONTEXTO / MANIFESTO DO SERVIÇO */}
      {service.context && (
        <section className="border-t border-border/60 px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="reveal lg:col-span-5">
                <h2 className="font-display text-3xl leading-tight text-foreground lg:text-4xl">
                  {service.context.heading}
                </h2>
              </div>
              <div className="reveal space-y-6 lg:col-span-6 lg:col-start-8" data-delay="100">
                {service.context.intro.map((p, idx) => (
                  <p key={idx} className="text-base leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="reveal mt-16 rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-12" data-delay="150">
              <p className="mx-auto max-w-4xl text-center font-display text-xl leading-snug text-foreground lg:text-2xl">
                {service.context.objective}
              </p>
            </div>

            <div className="reveal mt-20" data-delay="200">
              <p className="text-base leading-relaxed text-muted-foreground">{service.context.helpsIntro}</p>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {service.context.helps.map((h, i) => (
                  <div
                    key={i}
                    data-delay={(i % 3) * 80}
                    className="reveal flex items-start gap-4 rounded-2xl border border-border/60 bg-background p-6"
                  >
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/50 text-gold">
                      <Check size={15} />
                    </span>
                    <p className="text-base leading-relaxed text-muted-foreground">{h}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal mt-20 text-center" data-delay="250">
              <p className="mx-auto max-w-2xl font-display text-2xl italic leading-snug text-gold/90 lg:text-3xl">
                {service.context.closing}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* O QUE É */}
      <section className="border-t border-border/60 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-4">
            <p className="overline">O que é</p>
          </div>
          <div className="reveal lg:col-span-8" data-delay="100">
            <p className="font-display text-2xl leading-snug text-foreground lg:text-3xl">{service.whatIs}</p>
          </div>
        </div>
      </section>

      {/* PARA QUEM SERVE */}
      <section className="border-t border-border/60 bg-card/30 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="overline reveal">Para quem serve</p>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {service.audience.map((a: string, i: number) => (
              <div
                key={a}
                data-delay={(i % 2) * 90}
                className="reveal flex items-start gap-4 rounded-2xl border border-border/60 bg-background p-6"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/50 text-gold">
                  <Check size={15} />
                </span>
                <p className="text-base leading-relaxed text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="border-t border-border/60 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="overline reveal">Como funciona</p>
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {service.how.map((step: { n: string; t: string; d: string }, i: number) => (
              <div key={step.n} data-delay={i * 100} className="reveal">
                <span className="font-display text-5xl text-gold/50">{step.n}</span>
                <div className="hairline mt-6 w-12" />
                <h3 className="mt-6 font-display text-2xl">{step.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFÓLIO / EXEMPLOS */}
      <section className="border-t border-border/60 bg-card/30 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="overline reveal">Portfólio & Exemplos</p>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.showcase.map((item: { title: string; image: string }, i: number) => (
              <div
                key={item.title}
                data-delay={(i % 4) * 80}
                className="reveal group relative aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <h3 className="absolute inset-x-0 bottom-0 p-6 font-display text-xl text-foreground">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/60 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[900px]">
          <p className="overline reveal">Perguntas frequentes</p>
          <div className="mt-12 space-y-4">
            {service.faq.map((item: { q: string; a: string }, i: number) => (
              <div key={item.q} data-delay={(i % 4) * 70} className="reveal overflow-hidden rounded-2xl border border-border/60">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-card/40"
                >
                  <span className="font-display text-xl text-foreground">{item.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/50 text-gold">
                    {open === i ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>
                {open === i && (
                  <p className="px-6 pb-6 text-base leading-relaxed text-muted-foreground">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border/60 py-28 text-center lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(200,169,106,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-2xl px-6">
          <h2 className="reveal font-display text-4xl leading-tight lg:text-5xl">
            Pronto para começar o seu projeto de <span className="italic text-gold-gradient">{service.title}?</span>
          </h2>
          <Link
            to="/contato"
            data-delay="120"
            className="reveal group mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-[0.75rem] uppercase tracking-[0.24em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft"
          >
            {service.ctaLabel}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function ServiceError({ reset }: { reset: () => void }) {
  const router = useRouter();
  return (
    <SiteLayout>
      <section className="px-6 py-44 text-center">
        <h1 className="font-display text-4xl">Algo deu errado.</h1>
        <button
          onClick={() => {
            reset();
            router.invalidate();
          }}
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[0.75rem] uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-gold-soft"
        >
          Tentar novamente
        </button>
      </section>
    </SiteLayout>
  );
}

function ServiceNotFound() {
  return (
    <SiteLayout>
      <section className="px-6 py-44 text-center">
        <p className="overline">404</p>
        <h1 className="mt-6 font-display text-4xl">Serviço não encontrado.</h1>
        <Link
          to="/servicos"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[0.75rem] uppercase tracking-[0.24em] text-primary-foreground transition-all hover:bg-gold-soft"
        >
          Ver todos os serviços
        </Link>
      </section>
    </SiteLayout>
  );
}
