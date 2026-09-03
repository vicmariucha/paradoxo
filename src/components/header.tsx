import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Close the mobile menu when the viewport grows to desktop.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleNavClick = () => {
    setOpen(false);
    setServicesOpen(false);
  };


  const mobileOverlay = (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.currentTarget === e.target) setOpen(false);
      }}
      className={`fixed inset-0 z-40 flex flex-col bg-background pt-24 transition-all duration-500 lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex flex-1 flex-col justify-center gap-2 overflow-y-auto px-8 pb-8 md:px-16">
        {NAV.map((item, i) =>
          item.to === "/servicos" ? (
            <div key={item.to} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <Link
                  to={item.to}
                  onClick={handleNavClick}
                  className="font-display text-3xl tracking-wide text-foreground md:text-4xl"
                  style={{ transitionDelay: `${i * 40}ms` }}
                  activeProps={{ className: "text-gold" }}
                >
                  {item.label}
                </Link>
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services-subitems"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 md:h-11 md:w-11"
                >
                  {servicesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              <div
                id="mobile-services-subitems"
                className={`flex flex-col gap-1.5 overflow-hidden border-l border-border/60 pl-4 transition-all duration-300 md:pl-5 ${
                  servicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    to="/servicos/$slug"
                    params={{ slug: s.slug }}
                    onClick={handleNavClick}
                    className="text-[0.82rem] font-light uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-gold md:text-[0.9rem]"
                    activeProps={{ className: "text-gold" }}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              className="font-display text-3xl tracking-wide text-foreground md:text-4xl"
              style={{ transitionDelay: `${i * 40}ms` }}
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ),
        )}


        <Link
          to="/contato"
          onClick={handleNavClick}
          className="mt-8 inline-block w-fit rounded-full border border-gold/50 px-7 py-3.5 text-[0.72rem] uppercase tracking-[0.22em] text-gold md:mt-10 md:px-8 md:py-4"
        >
          Começar meu projeto
        </Link>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        open
          ? "border-b border-border/70 bg-background py-3 lg:py-4"
          : scrolled
            ? "border-b border-border/70 bg-background/80 py-3 backdrop-blur-xl lg:py-4"
            : "border-b border-transparent py-5 lg:py-7"
      }`}
    >
      <div className="relative z-50 mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex shrink-0 items-baseline gap-[2px]" onClick={handleNavClick}>
          <span className="font-brand text-2xl tracking-[0.18em] text-foreground lg:text-[1.6rem] xl:text-3xl">PARADOXO</span>
          <span className="h-1 w-1 translate-y-[-2px] rounded-full bg-gold transition-transform duration-300 group-hover:scale-150" />
        </Link>

        <nav className="hidden items-center lg:flex lg:gap-6 xl:gap-10">
          {NAV.map((item) =>
            item.to === "/servicos" ? (
              <div key={item.to} className="group relative">
                <Link
                  to={item.to}
                  className="relative text-[0.75rem] font-light uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground group-hover:text-foreground xl:text-[0.82rem] xl:tracking-[0.18em]"
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
                className="group relative text-[0.75rem] font-light uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground xl:text-[0.82rem] xl:tracking-[0.18em]"
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
          className="hidden rounded-full border border-gold/50 px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground lg:inline-block xl:px-6 xl:py-3 xl:text-[0.72rem] xl:tracking-[0.22em]"
        >
          Começar meu projeto
        </Link>

        <button
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 text-foreground lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mounted ? createPortal(mobileOverlay, document.body) : null}
    </header>
  );
}
