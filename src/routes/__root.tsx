import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Paradoxo - Suporte, Finanças e Branding | Impressos de Luxo e Papelaria Corporativa" },
      { name: "description", content: "Paradoxo: impressos corporativos de luxo, pastas institucionais, kits executivos e catálogos de alto padrão para clínicas, construtoras, startups, agronegócio e escritórios." },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Paradoxo - Suporte, Finanças e Branding" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.suporteparadoxo.com.br/" },
      { property: "og:title", content: "Paradoxo - Suporte, Finanças e Branding | Impressos de Luxo" },
      { property: "og:description", content: "Pastas comerciais de luxo, envelopes executivos, catálogos e papelaria de autoridade sob medida para empresas que exigem sofisticação." },
      { property: "og:site_name", content: "Paradoxo - Suporte, Finanças e Branding" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@paradoxo" },
      { name: "twitter:title", content: "Paradoxo - Suporte, Finanças e Branding | Impressos de Luxo" },
      { name: "twitter:description", content: "Pastas comerciais de luxo, envelopes executivos, catálogos e papelaria de autoridade sob medida para empresas que exigem sofisticação." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/078418e2-b6b8-40ca-b8da-39ee75dbb0cc/id-preview-77e7af35--987c8892-bed9-4854-8ed1-ba00f196ef53.lovable.app-1781413802099.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/078418e2-b6b8-40ca-b8da-39ee75dbb0cc/id-preview-77e7af35--987c8892-bed9-4854-8ed1-ba00f196ef53.lovable.app-1781413802099.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.suporteparadoxo.com.br/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Paradoxo - Suporte, Finanças e Branding",
          alternateName: ["Paradoxo", "Suporte Paradoxo", "Paradoxo Atelier"],
          url: "https://www.suporteparadoxo.com.br",
          logo: "https://www.suporteparadoxo.com.br/logo.png",
          image: "https://www.suporteparadoxo.com.br/banner-institucional.jpg",
          description:
            "Ateliê e consultoria especializada em impressos corporativos de luxo, papelaria executiva de alto padrão, pastas comerciais, kits de autoridade/onboarding, branding e suporte estratégico.",
          knowsAbout: [
            "Impressos de Luxo",
            "Pastas Comerciais Corporativas",
            "Papelaria Institucional Executiva",
            "Envelopes Ofício e Saco Personalizados",
            "Catálogos Institucionais e Lookbooks",
            "Kits de Boas-Vindas e Onboarding RH",
            "Branding e Identidade Visual",
            "Suporte Estratégico e Finanças",
          ],
          serviceType: [
            "Produção Gráfica de Alto Padrão",
            "Impressos de Autoridade Corporativa",
            "Kits de Apresentação e Fechamento de Contratos",
            "Consultoria de Branding e Posicionamento",
            "Suporte em Gestão e Viabilidade Financeira",
          ],
          audience: {
            "@type": "Audience",
            audienceType: [
              "Startups",
              "Recursos Humanos (RH)",
              "Concessionárias de Veículos e Máquinas",
              "Construtoras e Incorporadoras",
              "Instituições Financeiras e Gestoras",
              "Hotéis e Resorts de Luxo",
              "Projetistas e Designers Industriais",
              "Clínicas Médicas, Estéticas e Hospitais",
              "Laboratórios de Análises Clínicas",
              "Escritórios de Advocacia e Jurídico",
              "Empresas do Agronegócio",
              "Escritórios de Arquitetura, Engenharia e Interiores",
              "Contabilidades e Consultorias Fiscais",
              "Colégios, Faculdades e Universidades Privadas",
            ],
          },
          areaServed: "BR",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
