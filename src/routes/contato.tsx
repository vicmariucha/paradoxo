import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — PARADOXO" },
      { name: "description", content: "Solicite seu projeto premium. Fale com a PARADOXO por formulário, WhatsApp, e-mail ou telefone." },
      { property: "og:title", content: "Contato — PARADOXO" },
      { property: "og:description", content: "Solicite um orçamento de impressos premium e soluções de alto padrão." },
    ],
  }),
  component: Contato,
});

const CHANNELS = [
  { icon: Phone, label: "Telefone", value: "+55 (11) 90000-0000", href: "tel:+5511900000000" },
  { icon: MessageCircle, label: "WhatsApp", value: "Conversar agora", href: "https://wa.me/5511900000000" },
  { icon: Mail, label: "E-mail", value: "contato@paradoxo.com", href: "mailto:contato@paradoxo.com" },
  { icon: MapPin, label: "Atelier", value: "São Paulo, Brasil", href: "#" },
];

function Contato() {
  useReveal();
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="px-6 pb-16 pt-44 lg:px-10 lg:pt-52">
        <div className="mx-auto max-w-[1400px]">
          <p className="overline reveal">Contato</p>
          <h1 className="reveal mt-6 max-w-4xl font-display text-5xl leading-[1.05] lg:text-7xl" data-delay="100">
            Vamos criar algo <span className="italic text-gold-gradient">memorável.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg text-muted-foreground" data-delay="200">
            Conte-nos sobre o seu projeto. Respondemos com a atenção que cada
            marca exigente merece.
          </p>
        </div>
      </section>

      <section className="px-6 pb-28 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-16 pt-16 lg:grid-cols-[1fr_1.2fr]">
          {/* CHANNELS */}
          <div className="reveal space-y-3">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group flex items-center gap-5 border border-border/60 rounded-xl p-6 transition-colors duration-300 hover:border-gold/60 hover:bg-card/40"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-border rounded-lg text-gold transition-colors group-hover:border-gold">
                  <c.icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">{c.label}</span>
                  <span className="block truncate text-lg text-foreground">{c.value}</span>
                </span>
              </a>
            ))}
          </div>

          {/* FORM */}
          <form
            className="reveal"
            data-delay="120"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center border border-gold/40 rounded-2xl p-10 text-center">
                <h3 className="font-display text-3xl text-gold">Recebido com excelência.</h3>
                <p className="mt-4 max-w-sm text-muted-foreground">
                  Obrigado. Nossa equipe entrará em contato em breve para dar
                  início ao seu projeto.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Nome" name="nome" className="sm:col-span-1" />
                <Field label="Empresa" name="empresa" className="sm:col-span-1" />
                <Field label="E-mail" name="email" type="email" className="sm:col-span-1" />
                <Field label="Telefone" name="telefone" className="sm:col-span-1" />
                <div className="sm:col-span-2">
                  <label className="overline">Tipo de projeto</label>
                  <select
                    name="tipo"
                    className="mt-3 w-full border border-border bg-transparent rounded-xl py-3 px-4 text-foreground outline-none transition-colors focus:border-gold"
                  >
                    <option className="bg-background">Impressos Premium</option>
                    <option className="bg-background">Marketing, SEO & Campanhas</option>
                    <option className="bg-background">Finanças & Suporte</option>
                    <option className="bg-background">Outro</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="overline">Mensagem</label>
                  <textarea
                    name="mensagem"
                    rows={4}
                    placeholder="Conte-nos sobre o seu projeto…"
                    className="mt-3 w-full resize-none border border-border bg-transparent rounded-xl py-3 px-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold"
                  />
                </div>
                <button
                  type="submit"
                  className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-gold px-10 py-4 text-[0.75rem] uppercase tracking-[0.24em] text-primary-foreground transition-all duration-300 hover:bg-gold-soft sm:col-span-2"
                >
                  Enviar solicitação
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="overline">{label}</label>
      <input
        type={type}
        name={name}
        className="mt-3 w-full border border-border bg-transparent rounded-xl py-3 px-4 text-foreground outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}
