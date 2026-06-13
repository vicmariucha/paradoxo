import { useEffect } from "react";

/**
 * Porsche-style scroll-driven background transition.
 * Smoothly interpolates the page background through a list of color stops
 * as the user scrolls, writing the result to a CSS variable (--scroll-bg).
 */
type RGB = [number, number, number];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mix(a: RGB, b: RGB, t: number): RGB {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

export function useScrollBg(stops: RGB[], speed = 1, startSelector?: string) {
  useEffect(() => {
    if (stops.length < 2) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      // Start the transition only once the anchor element enters the viewport.
      let startY = 0;
      if (startSelector) {
        const el = document.querySelector(startSelector);
        if (el) {
          const rect = el.getBoundingClientRect();
          startY = rect.top + window.scrollY - window.innerHeight * 0.5;
        }
      }
      const max = doc.scrollHeight - window.innerHeight - startY;
      const raw = max > 0 ? (window.scrollY - startY) / max : 0;
      const progress = Math.min(1, Math.max(0, raw * speed));

      const scaled = progress * (stops.length - 1);
      const i = Math.min(stops.length - 2, Math.floor(scaled));
      const t = scaled - i;
      const [r, g, b] = mix(stops[i], stops[i + 1], t);

      doc.style.setProperty(
        "--scroll-bg",
        `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`,
      );
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.style.removeProperty("--scroll-bg");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, startSelector]);
}
