import { createFileRoute, Link } from "@tanstack/react-router";
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
  { icon: MessageCircle, label: "WhatsApp", value: "Conversar agora", href: "https://wa.me/5511984431907?text=Vim%20pelo%20site%20da%20Paradoxo.%20Gostaria%20de%20conversar%20sobre%20um%20projeto!", external: true },
  { icon: Mail, label: "E-mail", value: "salomao@suporteparadoxo.com.br", href: "mailto:salomao@suporteparadoxo.com.br", external: false },
  { icon: MapPin, label: "Atelier", value: "São Paulo, Brasil", href: "#", external: false },
];

const PROJECT_TYPES = [
  "Impressos Premium",
  "Marketing, SEO & Campanhas",
  "Finanças & Suporte",
  "Outro",
];

type FormState = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  tipo: string;
  outro: string;
  mensagem: string;
  aceite: boolean;
};

const EMPTY: FormState = {
  nome: "",
  empresa: "",
  email: "",
  telefone: "",
  tipo: PROJECT_TYPES[0],
  outro: "",
  mensagem: "",
  aceite: false,
};

function Contato() {
  useReveal();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const update = (key: keyof FormState, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.nome.trim()) next.nome = "Informe o seu nome.";
    else if (/\d/.test(form.nome)) next.nome = "O nome não pode conter números.";

    if (!form.empresa.trim()) next.empresa = "Informe a sua empresa.";

    if (!form.email.trim()) next.email = "Informe o seu e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "E-mail inválido.";

    if (!form.telefone.trim()) next.telefone = "Informe o seu telefone.";
    else if (form.telefone.replace(/\D/g, "").length < 10) next.telefone = "Telefone inválido.";

    if (form.tipo === "Outro" && !form.outro.trim())
      next.outro = "Descreva qual o tipo de projeto.";

    if (!form.mensagem.trim()) next.mensagem = "Escreva a sua mensagem.";

    if (!form.aceite) next.aceite = "Você precisa aceitar as políticas antes de enviar.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  return (
    <SiteLayout>
      <section className="px-6 pb-16 pt-44 lg:px-10 lg:pt-52">
        <div className="mx-auto max-w-[1400px]">
          <p className="overline reveal">Contato</p>
          <h1 className="reveal mt-6 max-w-4xl font-display text-5xl leading-[1.05] lg:text-7xl" data-delay="100">
            Vamos criar algo <span className="italic text-gold-gradient">memorável.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg text-muted-foreground" data-delay="200">
            Compartilhe a visão do seu projeto. Retribuiremos com foco, disciplina
            e o refinamento que a sua demanda requer.
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
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-border rounded-full text-gold transition-colors group-hover:border-gold">
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
          <form className="reveal" data-delay="120" noValidate onSubmit={handleSubmit}>
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
                <Field
                  label="Nome"
                  value={form.nome}
                  error={errors.nome}
                  onChange={(v) => update("nome", v.replace(/[0-9]/g, ""))}
                  className="sm:col-span-1"
                />
                <Field
                  label="Empresa"
                  value={form.empresa}
                  error={errors.empresa}
                  onChange={(v) => update("empresa", v)}
                  className="sm:col-span-1"
                />
                <Field
                  label="E-mail"
                  type="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(v) => update("email", v)}
                  className="sm:col-span-1"
                />
                <Field
                  label="Telefone"
                  type="tel"
                  inputMode="numeric"
                  value={form.telefone}
                  error={errors.telefone}
                  onChange={(v) => update("telefone", v.replace(/\D/g, ""))}
                  className="sm:col-span-1"
                />
                <div className="sm:col-span-2">
                  <label className="overline">Tipo de projeto</label>
                  <select
                    value={form.tipo}
                    onChange={(e) => update("tipo", e.target.value)}
                    className="mt-3 w-full border border-border bg-transparent rounded-xl py-3 px-4 text-foreground outline-none transition-colors focus:border-gold"
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} className="bg-background">{t}</option>
                    ))}
                  </select>
                </div>
                {form.tipo === "Outro" && (
                  <Field
                    label="Qual tipo de projeto?"
                    value={form.outro}
                    error={errors.outro}
                    onChange={(v) => update("outro", v)}
                    className="sm:col-span-2"
                  />
                )}
                <div className="sm:col-span-2">
                  <label className="overline">Mensagem</label>
                  <textarea
                    value={form.mensagem}
                    onChange={(e) => update("mensagem", e.target.value)}
                    rows={4}
                    placeholder="Conte-nos sobre o seu projeto…"
                    className={`mt-3 w-full resize-none border bg-transparent rounded-xl py-3 px-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold ${errors.mensagem ? "border-destructive" : "border-border"}`}
                  />
                  {errors.mensagem && <p className="mt-2 text-xs text-destructive">{errors.mensagem}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={form.aceite}
                      onChange={(e) => update("aceite", e.target.checked)}
                      className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-md border border-border bg-transparent accent-gold"
                    />
                    <span>
                      Li e concordo com a{" "}
                      <Link to="/privacidade" className="text-gold underline-offset-2 hover:underline">
                        Política de Privacidade
                      </Link>{" "}
                      e os{" "}
                      <Link to="/termos" className="text-gold underline-offset-2 hover:underline">
                        Termos de Uso
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.aceite && <p className="mt-2 text-xs text-destructive">{errors.aceite}</p>}
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
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="overline">{label}</label>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-3 w-full border bg-transparent rounded-xl py-3 px-4 text-foreground outline-none transition-colors focus:border-gold ${error ? "border-destructive" : "border-border"}`}
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
