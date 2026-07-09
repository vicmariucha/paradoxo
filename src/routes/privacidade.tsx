import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — PARADOXO" },
      { name: "description", content: "Saiba como a PARADOXO coleta, utiliza e protege os seus dados pessoais." },
      { property: "og:title", content: "Política de Privacidade — PARADOXO" },
      { property: "og:description", content: "Como a PARADOXO trata e protege os seus dados pessoais." },
    ],
  }),
  component: Privacidade,
});

const SECTIONS = [
  {
    t: "1. Informações que coletamos",
    d: "Coletamos as informações que você nos fornece voluntariamente ao entrar em contato ou solicitar um orçamento — como nome, empresa, e-mail, telefone e a descrição do seu projeto. Também podemos coletar dados de navegação anônimos para melhorar a experiência do site.",
  },
  {
    t: "2. Como utilizamos os dados",
    d: "Utilizamos as suas informações para responder às suas solicitações, elaborar propostas, executar projetos contratados e manter uma comunicação de qualidade. Não vendemos nem comercializamos os seus dados pessoais.",
  },
  {
    t: "3. Compartilhamento",
    d: "Seus dados podem ser compartilhados apenas com parceiros e prestadores estritamente necessários à execução dos serviços contratados, sempre sob obrigação de confidencialidade, ou quando exigido por lei.",
  },
  {
    t: "4. Armazenamento e segurança",
    d: "Adotamos medidas técnicas e organizacionais razoáveis para proteger os seus dados contra acesso não autorizado, perda ou uso indevido. Mantemos as informações apenas pelo tempo necessário às finalidades descritas.",
  },
  {
    t: "5. Seus direitos",
    d: "Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode solicitar a qualquer momento o acesso, a correção, a portabilidade ou a exclusão dos seus dados, bem como revogar consentimentos concedidos.",
  },
  {
    t: "6. Cookies",
    d: "Podemos utilizar cookies e tecnologias semelhantes para melhorar o funcionamento do site e entender como ele é utilizado. Você pode gerenciar as preferências de cookies diretamente no seu navegador.",
  },
  {
    t: "7. Contato",
    d: "Para exercer os seus direitos ou tirar dúvidas sobre esta política, entre em contato pelo e-mail salomao@suporteparadoxo.com.br.",
  },
];

function Privacidade() {
  useReveal();
  return (
    <SiteLayout>
      <section className="px-6 pb-16 pt-44 lg:px-10 lg:pt-52">
        <div className="mx-auto max-w-[900px]">
          <p className="overline reveal">Legal</p>
          <h1 className="reveal mt-6 font-display text-5xl leading-[1.05] lg:text-6xl" data-delay="100">
            Política de <span className="italic text-gold-gradient">Privacidade.</span>
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
