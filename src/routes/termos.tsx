import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — PARADOXO" },
      { name: "description", content: "Conheça os termos e condições de uso do site e dos serviços da PARADOXO." },
      { property: "og:title", content: "Termos de Uso — PARADOXO" },
      { property: "og:description", content: "Termos e condições de uso do site e serviços da PARADOXO." },
    ],
  }),
  component: Termos,
});

const SECTIONS = [
  {
    t: "1. Aceitação dos termos",
    d: "Ao acessar e utilizar este site, você concorda com os presentes Termos de Uso. Caso não concorde com qualquer condição, recomendamos que não utilize o site.",
  },
  {
    t: "2. Uso do site",
    d: "Você se compromete a utilizar este site de forma lícita e responsável, sem praticar atos que possam comprometer o seu funcionamento, a segurança ou os direitos de terceiros.",
  },
  {
    t: "3. Propriedade intelectual",
    d: "Todo o conteúdo deste site — textos, imagens, marcas, layout e materiais — é de propriedade da PARADOXO ou de seus licenciadores, sendo protegido pela legislação aplicável. É vedada a reprodução sem autorização prévia.",
  },
  {
    t: "4. Serviços e orçamentos",
    d: "As informações sobre serviços têm caráter informativo. Propostas, prazos e valores são formalizados individualmente após contato e alinhamento com o cliente.",
  },
  {
    t: "5. Limitação de responsabilidade",
    d: "A PARADOXO empenha-se em manter as informações do site precisas e atualizadas, mas não se responsabiliza por eventuais imprecisões, indisponibilidades temporárias ou pelo uso indevido do conteúdo por terceiros.",
  },
  {
    t: "6. Links externos",
    d: "Este site pode conter links para páginas de terceiros. Não nos responsabilizamos pelo conteúdo, políticas ou práticas desses sites externos.",
  },
  {
    t: "7. Alterações",
    d: "Estes termos podem ser atualizados a qualquer momento. Recomendamos a consulta periódica desta página. O uso contínuo do site após alterações implica na aceitação das novas condições.",
  },
  {
    t: "8. Contato",
    d: "Em caso de dúvidas sobre estes termos, entre em contato pelo e-mail salomao@suporteparadoxo.com.br.",
  },
];

function Termos() {
  useReveal();
  return (
    <SiteLayout>
      <section className="px-6 pb-16 pt-44 lg:px-10 lg:pt-52">
        <div className="mx-auto max-w-[900px]">
          <p className="overline reveal">Legal</p>
          <h1 className="reveal mt-6 font-display text-5xl leading-[1.05] lg:text-6xl" data-delay="100">
            Termos de <span className="italic text-gold-gradient">Uso.</span>
          </h1>
          <p className="reveal mt-6 text-sm text-muted-foreground" data-delay="150">
            Última atualização: {new Date().getFullYear()}
          </p>
        </div>
      </section>

      <section className="px-6 pb-28 lg:px-10">
        <div className="mx-auto max-w-[900px] space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.t} className="reveal rounded-2xl border border-border/60 bg-card/30 p-8">
              <h2 className="font-display text-2xl">{s.t}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
