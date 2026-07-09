import portCards from "@/assets/port-cards.jpg";
import portCatalog from "@/assets/port-catalog.jpg";
import portPackaging from "@/assets/port-packaging.jpg";
import portUniforms from "@/assets/port-uniforms.jpg";
import portKits from "@/assets/port-kits.jpg";
import portFacade from "@/assets/port-facade.jpg";
import portDisplay from "@/assets/port-display.jpg";

export type PortfolioItem = {
  title: string;
  category: string;
  image: string;
  tall?: boolean;
};

export const PORTFOLIO: PortfolioItem[] = [
  { title: "Embalagens de Assinatura", category: "Embalagens", image: portPackaging },
  { title: "Cartões em Hot Stamping", category: "Comunicação Visual", image: portCards, tall: true },
  { title: "Catálogo Institucional", category: "Catálogos", image: portCatalog },
  { title: "Uniformes Corporativos", category: "Uniformes", image: portUniforms, tall: true },
  { title: "Kits Corporativos Premium", category: "Kits", image: portKits },
  { title: "Fachada & Sinalização", category: "Fachadas", image: portFacade },
  { title: "Displays para Eventos", category: "Comunicação Visual", image: portDisplay, tall: true },
];

export type HomePortfolioItem = {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  details: string[];
};

export const HOME_PORTFOLIO: HomePortfolioItem[] = [
  {
    slug: "embalagens-de-assinatura",
    title: "Embalagens de Assinatura",
    category: "Embalagens",
    image: portPackaging,
    description:
      "Embalagens premium que transformam o ato de abrir em uma experiência memorável de marca.",
    details: [
      "Acabamentos em hot stamping e relevo seco",
      "Papéis e cartões nobres selecionados",
      "Projeto estrutural sob medida",
    ],
  },
  {
    slug: "catalogo-institucional",
    title: "Catálogo Institucional",
    category: "Catálogos",
    image: portCatalog,
    description:
      "Catálogos corporativos que comunicam autoridade e cuidado em cada página.",
    details: [
      "Editorial e diagramação de alto padrão",
      "Encadernação premium",
      "Tratamento de imagem profissional",
    ],
  },
  {
    slug: "kits-corporativos-premium",
    title: "Kits Corporativos Premium",
    category: "Kits",
    image: portKits,
    description:
      "Kits que encantam clientes e colaboradores com curadoria e acabamento impecáveis.",
    details: [
      "Curadoria de itens exclusivos",
      "Personalização completa da marca",
      "Montagem e logística cuidadas",
    ],
  },
  {
    slug: "comunicacao-visual",
    title: "Comunicação Visual",
    category: "Comunicação Visual",
    image: portFacade,
    description:
      "Sinalização e comunicação visual que dão presença e identidade ao seu espaço.",
    details: [
      "Fachadas e sinalização interna",
      "Materiais resistentes e duráveis",
      "Instalação profissional",
    ],
  },
  {
    slug: "displays-e-eventos",
    title: "Displays & Eventos",
    category: "Comunicação Visual",
    image: portDisplay,
    description:
      "Displays e estruturas para eventos que colocam sua marca no centro das atenções.",
    details: [
      "Estruturas modulares e portáteis",
      "Impressão de grande formato",
      "Projeto pensado para impacto",
    ],
  },
  {
    slug: "portfolio-completo",
    title: "Portfólio Completo",
    category: "Todos",
    image: portUniforms,
    description:
      "Explore a amplitude de tudo o que a PARADOXO pode criar para a sua marca.",
    details: [
      "Soluções completas de comunicação",
      "Do impresso à estratégia",
      "Um único parceiro de excelência",
    ],
  },
];

export const PORTFOLIO_CATEGORIES = [
  "Todos",
  "Embalagens",
  "Catálogos",
  "Comunicação Visual",
  "Uniformes",
  "Kits",
  "Fachadas",
] as const;

export type Service = {
  id: string;
  slug: string;
  rank: string;
  title: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  items: string[];
};

export const SERVICES: Service[] = [
  {
    id: "impressos",
    slug: "impressos",
    rank: "01",
    title: "Impressos Premium",
    tagline: "Nosso métier",
    description:
      "Produtos de comunicação visual e materiais impressos de altíssima qualidade — onde o papel encontra a percepção de valor.",
    ctaLabel: "Ver mais sobre impressos premium",
    items: [
      "Embalagens premium",
      "Cartões de visita de luxo",
      "Catálogos corporativos",
      "Materiais institucionais",
      "Brindes corporativos",
      "Uniformes personalizados",
      "Comunicação visual",
      "Displays",
      "Fachadas",
      "Kits corporativos",
      "Materiais para eventos",
      "Impressos especiais",
    ],
  },
  {
    id: "marketing",
    slug: "marketing",
    rank: "02",
    title: "Marketing, SEO & Campanhas",
    tagline: "Posicionamento",
    description:
      "Estratégias de presença e crescimento que colocam sua marca onde o cliente certo a encontra.",
    ctaLabel: "Ver mais sobre marketing & SEO",
    items: [
      "SEO",
      "Gestão de tráfego",
      "Campanhas publicitárias",
      "Estratégias de posicionamento",
      "Branding",
      "Marketing digital",
    ],
  },
  {
    id: "financas",
    slug: "financas",
    rank: "03",
    title: "Finanças & Suporte Empresarial",
    tagline: "Estrutura",
    description:
      "Organização, processo e clareza financeira para que sua operação cresça com solidez.",
    ctaLabel: "Ver mais sobre finanças & suporte",
    items: [
      "Gestão financeira",
      "Organização administrativa",
      "Consultoria operacional",
      "Estruturação de processos",
      "Suporte empresarial",
    ],
  },
];

export type ServiceDetail = {
  slug: string;
  title: string;
  tagline: string;
  hero: string;
  intro: string;
  ctaLabel: string;
  whatIs: string;
  audience: string[];
  how: { n: string; t: string; d: string }[];
  showcase: { title: string; image: string }[];
  faq: { q: string; a: string }[];
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  impressos: {
    slug: "impressos",
    title: "Impressos Premium",
    tagline: "Nosso métier",
    hero: portPackaging,
    intro:
      "Materiais impressos de altíssimo padrão onde o papel encontra a percepção de valor. Cada peça é pensada para posicionar a sua marca, não apenas representá-la.",
    ctaLabel: "Criar meus impressos premium",
    whatIs:
      "É a produção gráfica de alta performance da PARADOXO: embalagens, cartões, catálogos, kits e comunicação visual com acabamentos nobres — hot stamping, relevo seco, papéis especiais e projeto estrutural sob medida. Impressos que atravessam o olhar e permanecem na memória.",
    audience: [
      "Marcas premium que tratam cada ponto de contato como parte da experiência",
      "Empresas que lançam produtos e querem embalagens memoráveis",
      "Negócios que buscam cartões, catálogos e kits que comunicam autoridade",
      "Times de marketing que exigem acabamento impecável e prazo respeitado",
    ],
    how: [
      { n: "01", t: "Imersão", d: "Entendemos sua marca, seu público e a percepção que você deseja construir." },
      { n: "02", t: "Concepção", d: "Curadoria de materiais, acabamentos e direção criativa sob medida." },
      { n: "03", t: "Produção", d: "Execução com controle obsessivo de qualidade em cada etapa." },
      { n: "04", t: "Entrega", d: "Resultado impecável, no prazo, com acompanhamento dedicado." },
    ],
    showcase: [
      { title: "Embalagens de Assinatura", image: portPackaging },
      { title: "Cartões em Hot Stamping", image: portCards },
      { title: "Kits Corporativos Premium", image: portKits },
      { title: "Catálogo Institucional", image: portCatalog },
    ],
    faq: [
      { q: "Qual a tiragem mínima?", a: "Trabalhamos desde pequenas tiragens exclusivas até grandes volumes, sempre com o mesmo padrão de acabamento." },
      { q: "Vocês criam o design ou só imprimem?", a: "Ambos. Oferecemos direção criativa completa ou produzimos a partir da sua arte." },
      { q: "Quais acabamentos estão disponíveis?", a: "Hot stamping, relevo seco, laminações especiais, papéis nobres, cortes especiais e projeto estrutural personalizado." },
      { q: "Qual o prazo médio de entrega?", a: "Depende da complexidade, mas trabalhamos com cronogramas claros e prazos respeitados desde a primeira conversa." },
    ],
  },
  marketing: {
    slug: "marketing",
    title: "Marketing, SEO & Campanhas",
    tagline: "Posicionamento",
    hero: portCatalog,
    intro:
      "Estratégias de presença e crescimento que colocam sua marca exatamente onde o cliente certo a encontra — com inteligência, dados e sofisticação.",
    ctaLabel: "Impulsionar minha marca",
    whatIs:
      "É a frente de posicionamento digital da PARADOXO: SEO, gestão de tráfego, campanhas publicitárias, branding e marketing digital. Planejamos e operamos a presença da sua marca para que ela seja percebida, lembrada e escolhida.",
    audience: [
      "Empresas que querem ser encontradas pelos clientes certos no Google",
      "Marcas prontas para escalar com tráfego pago bem gerido",
      "Negócios que precisam de posicionamento e branding consistentes",
      "Times que buscam campanhas com estratégia, não apenas anúncios",
    ],
    how: [
      { n: "01", t: "Diagnóstico", d: "Analisamos mercado, concorrência e a percepção atual da sua marca." },
      { n: "02", t: "Estratégia", d: "Desenhamos posicionamento, canais e metas mensuráveis." },
      { n: "03", t: "Execução", d: "Colocamos campanhas, SEO e conteúdo para rodar com acompanhamento contínuo." },
      { n: "04", t: "Otimização", d: "Medimos, ajustamos e escalamos o que traz resultado real." },
    ],
    showcase: [
      { title: "Campanhas de Performance", image: portDisplay },
      { title: "Identidade & Branding", image: portCards },
      { title: "Presença Institucional", image: portFacade },
      { title: "Conteúdo & SEO", image: portCatalog },
    ],
    faq: [
      { q: "Em quanto tempo vejo resultado?", a: "Tráfego pago traz retorno rápido; SEO e branding constroem resultado sólido e crescente ao longo dos meses." },
      { q: "Vocês trabalham com qual investimento mínimo?", a: "Montamos a estratégia de acordo com o seu momento e orçamento, sempre priorizando eficiência." },
      { q: "Cuidam das redes sociais também?", a: "Sim, integramos conteúdo, campanhas e presença digital de forma coerente com a marca." },
      { q: "Há relatórios de resultado?", a: "Sim. Você acompanha métricas claras e recebe análises periódicas do desempenho." },
    ],
  },
  financas: {
    slug: "financas",
    title: "Finanças & Suporte Empresarial",
    tagline: "Estrutura",
    hero: portFacade,
    intro:
      "Organização, processo e clareza financeira para que a sua operação cresça com solidez, controle e segurança.",
    ctaLabel: "Estruturar minha operação",
    whatIs:
      "É o braço de estrutura da PARADOXO: gestão financeira, organização administrativa, consultoria operacional, estruturação de processos e suporte empresarial. Construímos a base para que a sua empresa cresça sem perder o controle.",
    audience: [
      "Empresas em crescimento que precisam organizar a base financeira",
      "Negócios sem processos administrativos claros e escaláveis",
      "Gestores que querem tomar decisões com dados confiáveis",
      "Operações que buscam eficiência e redução de retrabalho",
    ],
    how: [
      { n: "01", t: "Raio-X", d: "Mapeamos a situação financeira e operacional atual da empresa." },
      { n: "02", t: "Estruturação", d: "Organizamos processos, controles e rotinas administrativas." },
      { n: "03", t: "Implantação", d: "Colocamos a nova estrutura para funcionar com acompanhamento próximo." },
      { n: "04", t: "Acompanhamento", d: "Monitoramos indicadores e ajustamos para crescimento sustentável." },
    ],
    showcase: [
      { title: "Gestão Financeira", image: portCatalog },
      { title: "Processos & Controles", image: portPackaging },
      { title: "Consultoria Operacional", image: portKits },
      { title: "Suporte Empresarial", image: portFacade },
    ],
    faq: [
      { q: "Atendem empresas de qualquer porte?", a: "Atendemos de pequenas operações em estruturação a empresas consolidadas que buscam eficiência." },
      { q: "Substituem meu contador?", a: "Não. Complementamos com gestão, processos e controle, trabalhando em conjunto com sua contabilidade." },
      { q: "Como é o acompanhamento?", a: "Definimos rotinas e indicadores, com reuniões periódicas de análise e ajuste." },
      { q: "É um serviço pontual ou contínuo?", a: "Oferecemos tanto projetos de estruturação pontuais quanto suporte contínuo." },
    ],
  },
};

export const DIFFERENTIALS = [
  { title: "Atendimento Personalizado", text: "Cada cliente é tratado como um projeto único, com curadoria dedicada do início ao fim." },
  { title: "Produção de Alta Qualidade", text: "Materiais nobres, acabamentos especiais e controle obsessivo de cada detalhe." },
  { title: "Soluções Completas", text: "Do impresso à estratégia — um único parceiro para toda a sua comunicação." },
  { title: "Agilidade", text: "Processos enxutos e prazos respeitados, sem comprometer o padrão de excelência." },
  { title: "Exclusividade", text: "Projetos sob medida que diferenciam sua marca da concorrência." },
  { title: "Consultoria Estratégica", text: "Visão de negócio aplicada a cada decisão criativa e operacional." },
];
