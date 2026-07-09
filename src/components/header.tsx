import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SERVICES } from "@/lib/site-data";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/servicos", label: "Serviços" },
  { to: "/portfolio", label: "Portfólio" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/70 bg-background/80 py-4 backdrop-blur-xl"
          : "border-b border-transparent py-7"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-baseline gap-[2px]" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-[0.3em] text-foreground">PARADOXO</span>
          <span className="h-1 w-1 translate-y-[-2px] rounded-full bg-gold transition-transform duration-300 group-hover:scale-150" />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV.map((item) =>
            item.to === "/servicos" ? (
              <div key={item.to} className="group relative">
                <Link
                  to={item.to}
                  className="relative text-[0.82rem] font-light uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground group-hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-border/70 bg-background/95 p-2 backdrop-blur-xl">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        to="/servicos/$slug"
                        params={{ slug: s.slug }}
                        className="block rounded-xl px-4 py-3 text-[0.8rem] font-light tracking-[0.06em] text-muted-foreground transition-colors hover:bg-card hover:text-gold"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="group relative text-[0.82rem] font-light uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ),
          )}
        </nav>

        <Link
          to="/contato"
          className="hidden rounded-full border border-gold/50 px-6 py-3 text-[0.72rem] uppercase tracking-[0.22em] text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground lg:inline-block"
        >
          Solicitar Projeto
        </Link>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 top-0 z-40 flex flex-col bg-background transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-1 flex-col justify-center gap-2 px-8">
          {NAV.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="font-display text-4xl tracking-wide text-foreground"
              style={{ transitionDelay: `${i * 40}ms` }}
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contato"
            onClick={() => setOpen(false)}
            className="mt-10 inline-block w-fit rounded-full border border-gold/50 px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-gold"
          >
            Solicitar Projeto
          </Link>
        </div>
      </div>
    </header>
  );
}
