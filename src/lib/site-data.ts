import portCards from "@/assets/port-cards.jpg";
import portCatalog from "@/assets/port-catalog.jpg";
import portPackaging from "@/assets/port-packaging.jpg";
import portUniforms from "@/assets/port-uniforms.jpg";
import portKits from "@/assets/port-kits.jpg";
import portFacade from "@/assets/port-facade.jpg";
import portDisplay from "@/assets/port-display.jpg";
import pastaNuzzo from "@/assets/pasta-alessandra-nuzzo.jpg.asset.json";
import pastaAlide from "@/assets/pasata-alide.jpg.asset.json";
import pastaJopak from "@/assets/pasta-jopak.jpg.asset.json";
import pastaLins from "@/assets/pasta-linsborsatti.jpg.asset.json";
import pastaMetta from "@/assets/pasta-metta.jpg.asset.json";
import pastaRenova from "@/assets/pasta-renova.jpg.asset.json";
import envJopak from "@/assets/envelope-jopak.jpg.asset.json";
import envAlessandra from "@/assets/envelope-alessandra.jpg.asset.json";
import envAllide from "@/assets/envelope-allide.jpg.asset.json";
import envAna from "@/assets/envelope-ana.jpg.asset.json";
import envOfSheila from "@/assets/envelope-oficio-sheila.jpg.asset.json";
import envOfAllide from "@/assets/envelope-oficio-allide.jpg.asset.json";
import envOfInova from "@/assets/envelope-oficio-inova.jpg.asset.json";
import envOfJopak from "@/assets/envelope-oficio-jopak.jpg.asset.json";
import envOfAlessandra from "@/assets/envelope-oficio-alessandra.jpg.asset.json";
import envOfRenova from "@/assets/envelope-oficio-renova.jpg.asset.json";
import timbradoDigcont from "@/assets/papel-timbrado-digcont.jpg.asset.json";
import timbradoEcoga from "@/assets/papel-timbrado-ecoga.jpg.asset.json";
import timbradoInova from "@/assets/papel-timbrado-inova.jpg.asset.json";
import timbradoAlessandra from "@/assets/papel-timbrado-alessandra.jpg.asset.json";
import timbradoConforma from "@/assets/papel-timbrado-conforma.jpg.asset.json";
import timbradoCredvic from "@/assets/papel-timbrado-credivic.jpg.asset.json";
import catElpak from "@/assets/catalogo-elpak.jpg.asset.json";
import catInoxfer from "@/assets/catalogo-inoxfer.jpg.asset.json";
import catJopak from "@/assets/catalogo-jopak.jpg.asset.json";
import catMetta from "@/assets/catalogo-metta.jpg.asset.json";
import catPro from "@/assets/catalogo-pro.jpg.asset.json";
import evStandJopak from "@/assets/stand-feira-jopak.jpg.asset.json";
import evCalendario from "@/assets/calendario-fs-contabil.jpg.asset.json";
import evCamiseta from "@/assets/camiseta-custom-body.jpg.asset.json";
import evBackdrop from "@/assets/backdrop-acaert-2018.jpg.asset.json";
import evConvite from "@/assets/convite-caneta-iwm.jpg.asset.json";
import evCaneta from "@/assets/caneta-personalizada-gg.jpg.asset.json";
import evBannerLion from "@/assets/wind-banner-lion.jpg.asset.json";
import evBannerHomeo from "@/assets/wind-banner-homeo.jpg.asset.json";

export type PortfolioGroup = "Impressos" | "Design";

export type PortfolioItem = {
  title: string;
  category: string;
  group: PortfolioGroup;
  image: string;
  tall?: boolean;
};

export const PORTFOLIO: PortfolioItem[] = [
  { title: "Pasta Alessandra Nuzzo", category: "Pastas Personalizadas", group: "Impressos", image: pastaNuzzo.url, tall: true },
  { title: "Pasta Allide", category: "Pastas Personalizadas", group: "Impressos", image: pastaAlide.url, tall: true },
  { title: "Pasta Jopak", category: "Pastas Personalizadas", group: "Impressos", image: pastaJopak.url, tall: true },
  { title: "Pasta Lins Borsatti", category: "Pastas Personalizadas", group: "Impressos", image: pastaLins.url, tall: true },
  { title: "Pasta Metta Pisos", category: "Pastas Personalizadas", group: "Impressos", image: pastaMetta.url, tall: true },
  { title: "Pasta Renova Sun", category: "Pastas Personalizadas", group: "Impressos", image: pastaRenova.url, tall: true },
  { title: "Envelope Saco Jopak", category: "Envelopes Corporativos", group: "Impressos", image: envJopak.url },
  { title: "Envelope Saco Alessandra Nuzzo", category: "Envelopes Corporativos", group: "Impressos", image: envAlessandra.url, tall: true },
  { title: "Envelope Saco Allide", category: "Envelopes Corporativos", group: "Impressos", image: envAllide.url, tall: true },
  { title: "Envelope Saco Ana Luiza", category: "Envelopes Corporativos", group: "Impressos", image: envAna.url, tall: true },
  { title: "Envelope Ofício Dra. Sheila Lobo", category: "Envelopes Corporativos", group: "Impressos", image: envOfSheila.url, tall: true },
  { title: "Envelope Ofício Allide", category: "Envelopes Corporativos", group: "Impressos", image: envOfAllide.url, tall: true },
  { title: "Envelope Ofício Inova Cursos", category: "Envelopes Corporativos", group: "Impressos", image: envOfInova.url, tall: true },
  { title: "Envelope Ofício Jopak", category: "Envelopes Corporativos", group: "Impressos", image: envOfJopak.url, tall: true },
  { title: "Envelope Ofício Alessandra Nuzzo", category: "Envelopes Corporativos", group: "Impressos", image: envOfAlessandra.url, tall: true },
  { title: "Envelope Ofício Renova Sun", category: "Envelopes Corporativos", group: "Impressos", image: envOfRenova.url, tall: true },
  { title: "Papel Timbrado Digcont", category: "Papel Timbrado", group: "Impressos", image: timbradoDigcont.url, tall: true },
  { title: "Papel Timbrado Eco G.A", category: "Papel Timbrado", group: "Impressos", image: timbradoEcoga.url, tall: true },
  { title: "Papel Timbrado Inova Cursos", category: "Papel Timbrado", group: "Impressos", image: timbradoInova.url, tall: true },
  { title: "Papel Timbrado Alessandra Nuzzo", category: "Papel Timbrado", group: "Impressos", image: timbradoAlessandra.url, tall: true },
  { title: "Papel Timbrado Confarma", category: "Papel Timbrado", group: "Impressos", image: timbradoConforma.url, tall: true },
  { title: "Papel Timbrado Credvic", category: "Papel Timbrado", group: "Impressos", image: timbradoCredvic.url, tall: true },
  { title: "Papelaria de Escritório", category: "Papelaria de Escritório", group: "Impressos", image: portCatalog },
  { title: "Catálogo Elpak Embalagens", category: "Catálogos e Manuais", group: "Impressos", image: catElpak.url, tall: true },
  { title: "Catálogo Inoxfer Design", category: "Catálogos e Manuais", group: "Impressos", image: catInoxfer.url, tall: true },
  { title: "Catálogo Jopak", category: "Catálogos e Manuais", group: "Impressos", image: catJopak.url, tall: true },
  { title: "Catálogo Metta Pisos", category: "Catálogos e Manuais", group: "Impressos", image: catMetta.url, tall: true },
  { title: "Catálogo Pró Eventos", category: "Catálogos e Manuais", group: "Impressos", image: catPro.url, tall: true },
  { title: "Materiais Informacionais", category: "Materiais Informacionais", group: "Impressos", image: portDisplay, tall: true },
  { title: "Stand de Feira Jopak", category: "Materiais para Eventos", group: "Impressos", image: evStandJopak.url, tall: true },
  { title: "Backdrop Debate ACAERT", category: "Materiais para Eventos", group: "Impressos", image: evBackdrop.url },
  { title: "Wind Banner Lion Assessoria", category: "Materiais para Eventos", group: "Impressos", image: evBannerLion.url, tall: true },
  { title: "Wind Banner Homeo Ervas", category: "Materiais para Eventos", group: "Impressos", image: evBannerHomeo.url, tall: true },
  { title: "Camisetas Custom Body", category: "Materiais para Eventos", group: "Impressos", image: evCamiseta.url, tall: true },
  { title: "Calendário FS Contábil", category: "Materiais para Eventos", group: "Impressos", image: evCalendario.url },
  { title: "Convite e Caneta IMW", category: "Materiais para Eventos", group: "Impressos", image: evConvite.url },
  { title: "Canetas Personalizadas G&G", category: "Materiais para Eventos", group: "Impressos", image: evCaneta.url, tall: true },
  { title: "Impressões Especiais", category: "Impressões Especiais", group: "Impressos", image: portCards },
  { title: "Convites e Cartões Comerciais", category: "Convites e Cartões Comerciais", group: "Impressos", image: portCards, tall: true },
  { title: "Sacolas Premium", category: "Sacolas Premium", group: "Impressos", image: portPackaging },
  { title: "Brindes Corporativos", category: "Brindes Corporativos", group: "Impressos", image: portKits },
  { title: "Kits Corporativos", category: "Kits Corporativos", group: "Impressos", image: portKits, tall: true },

  { title: "Identidade Visual", category: "Identidade Visual", group: "Design", image: portCards },
  { title: "Comunicação Visual", category: "Comunicação Visual", group: "Design", image: portFacade, tall: true },
  { title: "Catálogo", category: "Catálogo", group: "Design", image: portCatalog, tall: true },
  { title: "Cartão Digital", category: "Cartão Digital", group: "Design", image: portDisplay },
  { title: "Brindes", category: "Brindes", group: "Design", image: portKits, tall: true },
  { title: "Uniformes", category: "Uniformes", group: "Design", image: portUniforms },
  { title: "Rótulos", category: "Rótulos", group: "Design", image: portPackaging },
  { title: "Sites", category: "Sites", group: "Design", image: portDisplay, tall: true },
  { title: "Imagens de Produto", category: "Imagens de Produto", group: "Design", image: portPackaging },
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

export const PORTFOLIO_GROUPS = ["Impressos", "Design"] as const;

export const PORTFOLIO_CATEGORIES: Record<PortfolioGroup, readonly string[]> = {
  Impressos: [
    "Todos",
    "Pastas Personalizadas",
    "Envelopes Corporativos",
    "Papel Timbrado",
    "Papelaria de Escritório",
    "Catálogos e Manuais",
    "Materiais Informacionais",
    "Materiais para Eventos",
    "Impressões Especiais",
    "Convites e Cartões Comerciais",
    "Sacolas Premium",
    "Brindes Corporativos",
    "Kits Corporativos",
  ],
  Design: [
    "Todos",
    "Identidade Visual",
    "Comunicação Visual",
    "Catálogo",
    "Cartão Digital",
    "Brindes",
    "Uniformes",
    "Rótulos",
    "Sites",
    "Imagens de Produto",
  ],
};

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
    rank: "Comunicação impressa",
    title: "Impressos Premium",
    tagline: "Nosso métier",
    description:
      "Produtos de comunicação corporativa através de materiais impressos de altíssima qualidade — onde o papel se transforma em mensageiro de percepção agregada.",
    ctaLabel: "Ver mais sobre impressos premium",
    items: [
      "Pastas e Envelopes Corporativos",
      "Papelaria de Escritório",
      "Catálogo de Corporativos",
      "Materiais Informacionais",
      "Materiais para Eventos",
      "Impressões Especiais",
      "Convites e Cartões de Visita linha luxo",
      "Sacolas Premium",
      "Brindes Corporativos",
      "Kits Corporativos",
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
      "Negócios que necessitam de papelaria corporativa no seu dia a dia",
      "Empresas que fortificam sua marca através de propagandas e publicidade",
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
      { q: "Qual a tiragem mínima?", a: "Cada produto possui sua própria quantidade mínima de produção. Por exemplo:\n\nPastas Comerciais Personalizadas: a partir de 25 unidades\n\nPapel Timbrado: a partir de 100 unidades\n\nNo orçamento padrão, já informamos a tiragem mínima de cada item. Não há limite máximo: você pode solicitar quantidades maiores conforme a sua necessidade." },
      { q: "Vocês criam o design ou só imprimem?", a: "Ofertamos as duas opções: criação e impressão. Nossa equipe pode desenvolver o design completo e entregar o material pronto a partir da ideia inicial do seu projeto ou realizar as impressões a partir da sua arte. Flexibilidade total para que sua marca tenha o resultado que deseja, sem etapas desnecessárias." },
      { q: "Quais acabamentos estão disponíveis?", a: "Ofertamos uma ampla gama de acabamentos para valorizar seus materiais: hot stamping, relevo seco, laminações especiais, papéis nobres e cortes diferenciados, além de todas as opções comerciais tradicionais. Você escolhe o acabamento que traduz melhor a identidade da sua marca, sem abrir mão da qualidade." },
      { q: "Qual o prazo médio de entrega?", a: "Cada projeto tem seu ritmo e complexidade. Definimos o cronograma em nossos orçamentos e cumprimos os prazos acordados. No prazo comunicado, tudo aquilo que esteja dentro da nossa estrutura interna será cumprido. Ações externas, muitas vezes necessárias, como transportadoras, correios e afins, seguem suas demandas internas." },
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
      { q: "Em quanto tempo vejo resultado?", a: "O tempo de retorno depende da estratégia escolhida. Campanhas de tráfego pago costumam gerar resultados a médio prazo. Não existem respostas imediatistas. Trabalhamos com inteligência, consistência e continuidade para que os resultados sejam sólidos e sustentáveis." },
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
