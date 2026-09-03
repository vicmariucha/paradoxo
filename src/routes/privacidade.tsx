import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Paradoxo - Suporte, Finanças e Branding" },
      { name: "description", content: "Política de Privacidade da Paradoxo. Saiba como tratamos seus dados pessoais em conformidade com a LGPD." },
    ],
  }),
  component: Privacidade,
});

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
            Última atualização: 02 de setembro de 2026
          </p>
        </div>
      </section>

      <section className="px-6 pb-28 lg:px-10">
        <div className="mx-auto max-w-[900px] space-y-12">
          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <p className="text-base leading-relaxed text-muted-foreground">
              A <strong>PARADOXO SUPORTE ADMINISTRATIVO FINANCEIRO E COMUNICACAO LTDA - ME</strong>, inscrita no CNPJ sob nº <strong>65.754.885/0001-60</strong>, doravante denominada <strong>“Paradoxo - Suporte, Finanças e Branding”</strong>, valoriza a privacidade e a proteção dos dados pessoais tratados em suas atividades.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Esta Política de Privacidade explica como tratamos dados pessoais coletados por meio do site <a href="https://suporteparadoxo.com.br" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4 hover:text-gold-soft">https://suporteparadoxo.com.br</a> e de seus canais digitais, em conformidade com a Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais (“LGPD”).
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">1. Quem é responsável pelo tratamento dos dados?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A <strong>PARADOXO SUPORTE ADMINISTRATIVO FINANCEIRO E COMUNICACAO LTDA - ME</strong>, inscrita no CNPJ sob nº <strong>65.754.885/0001-60</strong>, atua como <strong>Controladora</strong> dos dados pessoais tratados por meio deste site, sendo responsável por definir as finalidades e os meios de tratamento desses dados.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Para assuntos relacionados à privacidade e à proteção de dados pessoais, entre em contato pelo e-mail: <a href="mailto:salomao@suporteparadoxo.com.br" className="text-gold underline underline-offset-4 hover:text-gold-soft">salomao@suporteparadoxo.com.br</a>
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">2. Quais dados pessoais podemos coletar?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Dependendo de como você utiliza o site e entra em contato conosco, podemos tratar os seguintes dados pessoais:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
              <li>Dados de identificação e contato, como nome, e-mail, telefone, empresa e outras informações enviadas voluntariamente em formulários, WhatsApp ou e-mail;</li>
              <li>Dados relacionados à solicitação, como mensagem, necessidade apresentada, informações de projeto, pedido de orçamento e demais conteúdos encaminhados por você;</li>
              <li>Dados técnicos e de navegação, como endereço IP, tipo de navegador, dispositivo utilizado, páginas acessadas, data e horário de acesso e registros técnicos necessários à segurança e ao funcionamento do site;</li>
              <li>Dados fornecidos durante a relação comercial, necessários para elaboração de propostas, contratação, execução de serviços, emissão de documentos fiscais, suporte e comunicação profissional.</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Não solicitamos intencionalmente dados pessoais sensíveis por meio deste site. Recomendamos que você evite encaminhar informações sensíveis, como dados de saúde, origem racial ou étnica, convicções religiosas, opiniões políticas ou dados biométricos, salvo quando forem estritamente necessários e solicitados por canal apropriado.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">3. Para quais finalidades utilizamos os dados?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Os dados pessoais poderão ser utilizados para:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
              <li>Receber, responder e acompanhar solicitações de contato, orçamento, informações ou suporte;</li>
              <li>Avaliar demandas e elaborar propostas comerciais;</li>
              <li>Comunicar-nos com clientes, potenciais clientes, fornecedores e parceiros;</li>
              <li>Executar contratos, projetos e serviços solicitados;</li>
              <li>Cumprir obrigações legais, fiscais, regulatórias e contábeis;</li>
              <li>Manter registros administrativos e comprovar comunicações ou operações;</li>
              <li>Proteger direitos, prevenir fraudes, incidentes e usos indevidos do site;</li>
              <li>Melhorar a segurança, estabilidade, desempenho e experiência de navegação no site;</li>
              <li>Enviar comunicações institucionais ou comerciais relacionadas aos serviços, quando permitido pela legislação e respeitado o direito de oposição ou descadastro.</li>
            </ul>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">4. Bases legais para o tratamento</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Tratamos dados pessoais somente quando houver uma base legal prevista na LGPD. Conforme o caso, o tratamento poderá estar fundamentado em:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
              <li>Consentimento do titular, quando necessário e solicitado de forma adequada;</li>
              <li>Realização de procedimentos preliminares relacionados a contrato, a pedido do titular, como solicitações de orçamento ou proposta;</li>
              <li>Execução de contrato ou de procedimentos relacionados à contratação de serviços;</li>
              <li>Cumprimento de obrigação legal ou regulatória;</li>
              <li>Exercício regular de direitos em processo judicial, administrativo ou arbitral;</li>
              <li>Legítimo interesse da empresa, como atendimento, segurança, prevenção a fraudes, gestão administrativa e melhoria dos serviços, sempre observando os direitos e as liberdades fundamentais do titular.</li>
            </ul>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">5. Compartilhamento de dados pessoais</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A <strong>Paradoxo - Suporte, Finanças e Branding</strong> não comercializa nem vende dados pessoais.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Se necessário, os dados poderão ser compartilhados com terceiros que auxiliem na operação da empresa, sempre para finalidades legítimas e compatíveis com esta Política, tais como:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
              <li>Provedores de hospedagem, e-mail, armazenamento em nuvem, ferramentas de comunicação e suporte tecnológico;</li>
              <li>Plataformas utilizadas para formulários, agendamentos, gestão de relacionamento, propostas ou atendimento;</li>
              <li>Profissionais, fornecedores e parceiros envolvidos na execução de serviços contratados;</li>
              <li>Instituições financeiras, contabilidade, assessorias e prestadores necessários à gestão empresarial;</li>
              <li>Órgãos públicos, autoridades competentes ou terceiros, quando houver obrigação legal, regulatória, ordem judicial ou necessidade de defesa de direitos.</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Sempre que aplicável, buscamos adotar medidas razoáveis para que os terceiros envolvidos tratem os dados pessoais de maneira segura e compatível com a legislação aplicável.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">6. Transferência internacional de dados</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Alguns fornecedores de tecnologia, hospedagem, armazenamento, e-mail, comunicação ou análise de desempenho podem processar dados em servidores localizados fora do Brasil.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Quando isso ocorrer, a <strong>Paradoxo - Suporte, Finanças e Branding</strong> adotará medidas razoáveis para que a transferência internacional observe as hipóteses e garantias previstas na LGPD, incluindo a utilização de fornecedores que adotem padrões adequados de segurança e proteção de dados.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">7. Cookies e tecnologias semelhantes</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              O site poderá utilizar cookies e tecnologias semelhantes para permitir seu funcionamento, lembrar preferências, melhorar a navegação, reforçar a segurança e, quando aplicável, medir o desempenho das páginas.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Cookies são pequenos arquivos armazenados no dispositivo do usuário durante a navegação. Você pode gerenciá-los ou bloqueá-los nas configurações do seu navegador. A desativação de determinados cookies poderá afetar alguns recursos e funcionalidades do site.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Caso o site utilize cookies não essenciais, ferramentas de publicidade, remarketing, pixels ou análises comportamentais, poderá ser apresentado um aviso ou mecanismo de consentimento específico, conforme aplicável.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">8. Por quanto tempo os dados são armazenados?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Os dados pessoais serão mantidos somente pelo tempo necessário para cumprir as finalidades descritas nesta Política, atender solicitações, executar contratos, prestar suporte, cumprir obrigações legais e defender direitos da empresa.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Os prazos poderão variar conforme a natureza do dado e a finalidade do tratamento. Após o término da necessidade de uso ou do prazo legal aplicável, os dados poderão ser eliminados, anonimizados ou mantidos de forma segura quando sua conservação for permitida ou exigida por lei.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">9. Segurança dos dados</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Adotamos medidas técnicas, administrativas e organizacionais razoáveis para proteger os dados pessoais contra acessos não autorizados, destruição, perda, alteração, comunicação ou divulgação indevida.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Apesar dos esforços empregados, nenhum ambiente digital é totalmente livre de riscos. Por isso, recomendamos que os usuários também adotem boas práticas de segurança, como proteger suas senhas, manter seus dispositivos atualizados e não compartilhar informações desnecessárias por canais inseguros.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">10. Direitos do titular dos dados pessoais</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Nos termos da LGPD, o titular poderá solicitar, conforme aplicável:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
              <li>Confirmação da existência de tratamento de dados pessoais;</li>
              <li>Acesso aos dados pessoais tratados;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a legislação;</li>
              <li>Portabilidade dos dados, observadas as regras aplicáveis;</li>
              <li>Eliminação dos dados tratados com base no consentimento, quando cabível;</li>
              <li>Informação sobre as entidades públicas e privadas com as quais compartilhamos dados;</li>
              <li>Informação sobre a possibilidade de não fornecer consentimento e as consequências dessa escolha;</li>
              <li>Revogação do consentimento, quando o tratamento depender dessa base legal;</li>
              <li>Oposição a tratamentos realizados em desconformidade com a LGPD ou, quando aplicável, com base em legítimo interesse.</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Para exercer seus direitos, encaminhe sua solicitação para: <a href="mailto:salomao@suporteparadoxo.com.br" className="text-gold underline underline-offset-4 hover:text-gold-soft">salomao@suporteparadoxo.com.br</a>
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Para proteger a segurança dos dados, poderemos solicitar informações adicionais para confirmar a identidade do solicitante antes de atender determinados pedidos.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">11. Dados de crianças e adolescentes</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Este site não é direcionado intencionalmente à coleta de dados pessoais de crianças e adolescentes.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Caso seja necessário tratar dados pessoais de crianças ou adolescentes, serão observadas as disposições da LGPD e, quando aplicável, serão adotadas medidas para obtenção de consentimento específico e em destaque de pelo menos um dos pais ou responsável legal.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">12. Relação com os Termos de Uso</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Esta Política de Privacidade deve ser lida em conjunto com os <em>Termos de Uso</em>, disponíveis em: <a href="https://suporteparadoxo.com.br/termos" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4 hover:text-gold-soft">https://suporteparadoxo.com.br/termos</a>
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">13. Alterações desta Política</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Esta Política de Privacidade poderá ser atualizada a qualquer momento para refletir alterações legais, regulatórias, operacionais ou tecnológicas.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A versão vigente estará sempre disponível nesta página, com indicação da data de sua última atualização. Recomendamos que você consulte este documento periodicamente.
            </p>
          </div>

          <div className="reveal rounded-2xl border border-border/60 bg-card/30 p-8 lg:p-10">
            <h2 className="font-display text-2xl">14. Contato</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Para dúvidas, solicitações relacionadas a dados pessoais ou para exercer seus direitos como titular, entre em contato com:
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
