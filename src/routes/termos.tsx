import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso | Paradoxo - Suporte, Finanças e Branding" },
      { name: "description", content: "Termos de Uso da Paradoxo. Leia as condições de acesso e utilização do site." },
    ],
  }),
  component: Termos,
});

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
            Última atualização: 02 de setembro de 2026
          </p>
        </div>
      </section>

      <section className="px-6 pb-28 lg:px-10">
        <div className="mx-auto max-w-[900px] space-y-12">
          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <p className="text-base leading-relaxed text-muted-foreground">
              Estes Termos de Uso regulam o acesso e a utilização do site <a href="https://suporteparadoxo.com.br" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4 hover:text-gold-soft">https://suporteparadoxo.com.br</a>, mantido pela <strong>PARADOXO SUPORTE ADMINISTRATIVO FINANCEIRO E COMUNICACAO LTDA - ME</strong>, inscrita no CNPJ sob nº <strong>65.754.885/0001-60</strong>, doravante denominada <strong>“Paradoxo - Suporte, Finanças e Branding”</strong>, <strong>“empresa”</strong>, <strong>“nós”</strong> ou <strong>“site”</strong>.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Ao acessar ou utilizar este site, você declara que leu e compreendeu estes Termos de Uso. Caso não concorde com qualquer disposição, recomendamos que não utilize o site.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">1. Uso do site</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              O usuário compromete-se a utilizar o site de forma lícita, ética e de acordo com a legislação vigente.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">Não é permitido:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
              <li>Utilizar o site para fins ilegais, fraudulentos ou não autorizados;</li>
              <li>Tentar acessar áreas restritas, sistemas, dados ou informações de terceiros;</li>
              <li>Inserir ou transmitir vírus, códigos maliciosos ou qualquer conteúdo capaz de comprometer o funcionamento do site;</li>
              <li>Interferir na segurança, disponibilidade ou operação do site;</li>
              <li>Utilizar conteúdos, informações ou materiais do site para finalidade que viole direitos de terceiros;</li>
              <li>Reproduzir, copiar, distribuir ou explorar comercialmente qualquer conteúdo do site sem autorização prévia e expressa.</li>
            </ul>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">2. Conteúdo e informações do site</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              As informações disponibilizadas no site possuem caráter geral e informativo. Embora empreguemos esforços razoáveis para manter o conteúdo atualizado, não garantimos que todas as informações estejam sempre completas, precisas ou atualizadas.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A disponibilização de informações no site não constitui, por si só, proposta comercial formal, contrato, promessa de resultado ou garantia de contratação.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Valores, prazos, condições de pagamento, escopo, entregas e demais condições dos serviços serão definidos em proposta comercial, orçamento ou contrato específico.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">3. Serviços e contratação</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A contratação de qualquer serviço dependerá de negociação e formalização próprias entre o interessado e a <strong>Paradoxo - Suporte, Finanças e Branding</strong>.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A contratação poderá ser formalizada por meio de proposta comercial, contrato, ordem de serviço, aceite eletrônico ou outro instrumento válido.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              As condições específicas de cada contratação, incluindo escopo, prazos, valores, forma de pagamento, alterações, aprovações, cancelamento e entrega, prevalecerão sobre informações genéricas apresentadas neste site.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Nenhum serviço será considerado contratado exclusivamente pelo preenchimento de formulário, envio de mensagem ou navegação no site, salvo se houver confirmação expressa da empresa.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">4. Responsabilidades do usuário</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              O usuário é responsável pelas informações que fornecer à empresa e declara que possui autorização para compartilhar quaisquer dados, documentos, imagens, marcas, textos ou materiais enviados.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">O usuário também se compromete a:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
              <li>Fornecer informações verdadeiras, completas e atualizadas;</li>
              <li>Não enviar materiais que violem direitos autorais, marcas, imagem, privacidade ou quaisquer direitos de terceiros;</li>
              <li>Obter as autorizações necessárias para utilização de conteúdos fornecidos à empresa;</li>
              <li>Analisar e aprovar os materiais encaminhados para sua conferência dentro dos prazos acordados;</li>
              <li>Utilizar os materiais entregues de acordo com as condições estabelecidas na proposta ou contrato.</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A empresa não será responsável por problemas decorrentes de informações incorretas, incompletas ou não autorizadas fornecidas pelo usuário.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">5. Propriedade intelectual do site</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Todo o conteúdo disponível neste site, incluindo textos, imagens, fotografias, logotipos, identidade visual, layouts, elementos gráficos, códigos, marcas e demais materiais, pertence à <strong>Paradoxo - Suporte, Finanças e Branding</strong> ou a terceiros que autorizaram seu uso.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Esses conteúdos são protegidos pela legislação brasileira aplicável, incluindo a Lei nº 9.610/1998 — Lei de Direitos Autorais — e a legislação relativa à propriedade industrial e à proteção de marcas.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              É proibida a reprodução, cópia, publicação, distribuição, alteração, venda ou exploração comercial do conteúdo do site sem autorização prévia e por escrito, salvo quando houver permissão legal expressa.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">6. Projetos e materiais desenvolvidos para clientes</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A titularidade, a licença de uso e as condições de utilização de projetos, artes, marcas, peças gráficas, textos, arquivos editáveis e demais materiais desenvolvidos para clientes serão definidas na respectiva proposta comercial ou contrato.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Salvo disposição expressa em contrário, a autorização de uso ou eventual transferência de direitos sobre os materiais desenvolvidos ocorrerá somente após o pagamento integral dos valores contratados.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Arquivos, versões, conceitos, estudos, rascunhos, elementos não aprovados e materiais não incluídos no escopo contratado poderão permanecer de titularidade da empresa ou de seus respectivos licenciadores.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A utilização de imagens, fontes, fotografias, ilustrações, modelos, bancos de imagens, softwares ou outros elementos de terceiros estará sujeita às respectivas licenças e condições de uso.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">7. Portfólio e divulgação de trabalhos</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Salvo acordo escrito em sentido contrário, o cliente autoriza a empresa a divulgar o nome comercial, a marca e imagens dos trabalhos concluídos exclusivamente para fins de portfólio, apresentação institucional e divulgação de seus serviços.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Quando houver informações confidenciais, materiais ainda não publicados ou solicitação expressa de sigilo pelo cliente, a divulgação não será realizada enquanto durar a obrigação de confidencialidade ou até nova autorização.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">8. Links e serviços de terceiros</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              O site poderá conter links, integrações ou referências a sites, plataformas e serviços de terceiros.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Esses links são disponibilizados por conveniência. A <strong>Paradoxo - Suporte, Finanças e Branding</strong> não controla os conteúdos, políticas, práticas de segurança ou funcionamento de sites de terceiros e não se responsabiliza por danos ou prejuízos decorrentes de sua utilização.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              O acesso a serviços de terceiros estará sujeito aos termos e às políticas próprios desses fornecedores.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">9. Disponibilidade e limitações técnicas</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Empregamos esforços razoáveis para manter o site disponível e funcionando adequadamente. Entretanto, o site poderá ficar temporariamente indisponível em razão de manutenção, atualizações, falhas técnicas, problemas de hospedagem, interrupções de internet, ataques cibernéticos, caso fortuito, força maior ou outros eventos fora do controle razoável da empresa.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Não garantimos que o site funcionará de maneira ininterrupta, livre de erros ou compatível com todos os dispositivos, navegadores ou sistemas.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">10. Limitação de responsabilidade</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Na medida permitida pela legislação aplicável, a empresa não será responsável por:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
              <li>Danos decorrentes de falhas, interrupções ou indisponibilidade temporária do site;</li>
              <li>Decisões tomadas exclusivamente com base nas informações apresentadas no site;</li>
              <li>Conteúdos, serviços, produtos ou práticas de terceiros;</li>
              <li>Informações, arquivos ou materiais fornecidos pelo usuário sem autorização ou em desacordo com a legislação;</li>
              <li>Uso indevido do site ou dos materiais por parte do usuário;</li>
              <li>Eventos decorrentes de caso fortuito, força maior ou fatos fora do controle razoável da empresa.</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              As limitações desta cláusula não têm a finalidade de afastar responsabilidades que não possam ser excluídas ou limitadas por lei, especialmente aquelas previstas em normas de proteção ao consumidor e demais normas obrigatórias aplicáveis.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">11. Privacidade e proteção de dados</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              O tratamento de dados pessoais realizado por meio deste site está descrito na <em>Política de Privacidade</em>, disponível em: <a href="https://suporteparadoxo.com.br/privacidade" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4 hover:text-gold-soft">https://suporteparadoxo.com.br/privacidade</a>
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A Política de Privacidade é parte integrante destes Termos de Uso e apresenta informações sobre coleta, utilização, armazenamento, compartilhamento, segurança e direitos dos titulares de dados pessoais.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">12. Comunicações</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Ao entrar em contato conosco, o usuário poderá receber comunicações relacionadas ao atendimento, à solicitação apresentada, à proposta comercial, à execução de serviços ou à relação contratual.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Comunicações comerciais serão realizadas de acordo com a legislação aplicável. Quando disponibilizado mecanismo de descadastro ou oposição, o usuário poderá utilizá-lo para deixar de receber esse tipo de comunicação.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">13. Idade e capacidade para utilização</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              O site não é direcionado intencionalmente à coleta de dados pessoais de crianças.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              O usuário declara possuir capacidade legal para utilizar o site e contratar serviços ou, quando aplicável, estar devidamente autorizado, representado ou assistido por seu responsável legal.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">14. Alterações destes Termos</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Estes Termos de Uso poderão ser atualizados a qualquer momento para refletir alterações legais, operacionais, comerciais ou tecnológicas.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A versão vigente estará sempre disponível nesta página, com indicação da data da última atualização. O uso continuado do site após a publicação de alterações poderá ser interpretado como ciência dos termos atualizados, sem prejuízo dos direitos assegurados pela legislação aplicável.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">15. Suspensão ou encerramento do acesso</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A <strong>Paradoxo - Suporte, Finanças e Branding</strong> poderá suspender ou restringir o acesso ao site quando necessário para manutenção, segurança ou cumprimento da legislação.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Também poderá adotar medidas cabíveis em caso de uso do site em desacordo com estes Termos de Uso, com a Política de Privacidade ou com a legislação aplicável.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">16. Legislação aplicável e foro</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Fica eleito o foro da comarca de <strong>São Paulo, Estado de São Paulo</strong>, para dirimir controvérsias decorrentes destes Termos de Uso, ressalvadas as hipóteses em que a legislação aplicável determine foro diverso ou assegure ao consumidor o direito de escolher o foro competente.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">17. Contato</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Em caso de dúvidas sobre estes Termos de Uso, entre em contato:
            </p>
            <address className="mt-4 not-italic text-base leading-relaxed text-muted-foreground">
              <strong>PARADOXO SUPORTE ADMINISTRATIVO FINANCEIRO E COMUNICACAO LTDA - ME</strong><br />
              CNPJ: 65.754.885/0001-60<br />
              Nome comercial: Paradoxo - Suporte, Finanças e Branding<br />
              E-mail: <a href="mailto:salomao@suporteparadoxo.com.br" className="text-gold underline underline-offset-4 hover:text-gold-soft">salomao@suporteparadoxo.com.br</a>
            </address>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
