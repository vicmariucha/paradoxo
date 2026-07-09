import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card/40">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-baseline gap-[2px]">
              <span className="font-display text-3xl tracking-[0.3em]">PARADOXO</span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Soluções empresariais de alto padrão. Transformamos impressão em
              percepção de valor — para clientes que não negociam excelência.
            </p>
            <div className="mt-8 flex gap-4">
              {[Instagram, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                  aria-label="Social"
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
                <a href="tel:+5511984431907" className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Phone size={15} className="text-gold" /> +55 (11) 98443-1907
                </a>
              </li>
              <li>
                <a href="mailto:salomao@suporteparadoxo.com.br" className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Mail size={15} className="text-gold" /> salomao@suporteparadoxo.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} PARADOXO. Todos os direitos reservados.</span>
          <span>Excelência visível em cada detalhe.</span>
        </div>
      </div>
    </footer>
  );
}
