import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  title: string;
  items: FaqItem[];
}

export function FaqSection({ title, items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-border/60 px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[900px]">
        <h2 className="overline reveal">{title}</h2>
        <div className="mt-12 space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <details
                key={item.q}
                open={isOpen}
                className="reveal overflow-hidden rounded-2xl border border-border/60"
                data-delay={(i % 4) * 70}
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenIndex(isOpen ? null : i);
                  }}
                  className="flex w-full cursor-pointer list-none items-center justify-between gap-4 p-6 transition-colors hover:bg-card/40"
                >
                  <h3 className="font-display text-xl text-foreground">{item.q}</h3>
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/50 text-gold"
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-base leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
