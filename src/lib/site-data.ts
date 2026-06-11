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
  rank: string;
  title: string;
  tagline: string;
  description: string;
  items: string[];
};

export const SERVICES: Service[] = [
  {
    id: "impressos",
    rank: "01",
    title: "Impressos Premium",
    tagline: "Nosso métier",
    description:
      "Produtos de comunicação visual e materiais impressos de altíssima qualidade — onde o papel encontra a percepção de valor.",
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
    rank: "02",
    title: "Marketing, SEO & Campanhas",
    tagline: "Posicionamento",
    description:
      "Estratégias de presença e crescimento que colocam sua marca onde o cliente certo a encontra.",
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
    rank: "03",
    title: "Finanças & Suporte Empresarial",
    tagline: "Estrutura",
    description:
      "Organização, processo e clareza financeira para que sua operação cresça com solidez.",
    items: [
      "Gestão financeira",
      "Organização administrativa",
      "Consultoria operacional",
      "Estruturação de processos",
      "Suporte empresarial",
    ],
  },
];

export const DIFFERENTIALS = [
  { title: "Atendimento Personalizado", text: "Cada cliente é tratado como um projeto único, com curadoria dedicada do início ao fim." },
  { title: "Produção de Alta Qualidade", text: "Materiais nobres, acabamentos especiais e controle obsessivo de cada detalhe." },
  { title: "Soluções Completas", text: "Do impresso à estratégia — um único parceiro para toda a sua comunicação." },
  { title: "Agilidade", text: "Processos enxutos e prazos respeitados, sem comprometer o padrão de excelência." },
  { title: "Exclusividade", text: "Projetos sob medida que diferenciam sua marca da concorrência." },
  { title: "Consultoria Estratégica", text: "Visão de negócio aplicada a cada decisão criativa e operacional." },
];
