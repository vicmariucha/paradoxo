import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, Phone, ArrowUp, Building2 } from "lucide-react";

export function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-card/40">
      {/* Back to top */}
      <div className="border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <button
            onClick={scrollToTop}
            className="group flex w-full items-center justify-center gap-3 py-6 text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-gold"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors group-hover:border-gold">
              <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
            </span>
            Voltar ao topo
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-baseline gap-[2px]">
              <span className="font-brand text-4xl tracking-[0.18em]">PARADOXO</span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Soluções empresariais de alto padrão. Transformamos impressão em
              percepção de valor — para clientes que não negociam excelência.
            </p>
            <div className="mt-8 flex gap-4">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/in/salom%C3%A3o-junior-81111b1b/", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:salomao@suporteparadoxo.com.br", label: "E-mail" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="overline">Navegação</h4>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                { to: "/servicos", label: "Serviços" },
                { to: "/portfolio", label: "Portfólio" },
                { to: "/sobre", label: "Sobre" },
                { to: "/contato", label: "Contato" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="overline">Contato</h4>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="https://wa.me/5511984431907?text=Vim%20pelo%20site%20da%20Paradoxo.%20Gostaria%20de%20conversar%20sobre%20um%20projeto!" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Phone size={15} className="text-gold" /> +55 (11) 98443-1907
                </a>
              </li>
              <li>
                <a href="mailto:salomao@suporteparadoxo.com.br" className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Mail size={15} className="text-gold" /> salomao@suporteparadoxo.com.br
                </a>
              </li>
              <li className="flex items-center gap-3 pt-2 text-xs uppercase tracking-[0.12em]">
                <Building2 size={15} className="text-gold" /> CNPJ: 65.754.885/0001-60
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground lg:flex-row lg:text-left">
          <span>© {new Date().getFullYear()} PARADOXO. Todos os direitos reservados.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.65rem] tracking-[0.15em]">
            <Link to="/privacidade" className="transition-colors hover:text-gold">
              Política de Privacidade
            </Link>
            <span className="text-border">•</span>
            <Link to="/termos" className="transition-colors hover:text-gold">
              Termos de Uso
            </Link>
            <span className="text-border">•</span>
            <span>Excelência visível em cada detalhe.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
