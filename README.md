# Paradoxo

Site institucional da Paradoxo — impressos corporativos de luxo, papelaria
executiva, catálogos institucionais e branding para empresas de alto padrão.

Construído com [TanStack Start](https://tanstack.com/start) (React 19) e
[Tailwind CSS v4](https://tailwindcss.com/), usando [Vite](https://vite.dev/)
e [Nitro](https://nitro.build/) como build engine.

## Stack

- React 19 + TypeScript
- TanStack Start / TanStack Router (roteamento por arquivos em `src/routes`)
- Tailwind CSS v4 + componentes [shadcn/ui](https://ui.shadcn.com/) (`src/components/ui`)
- Vite 7 + Nitro (build estático — veja abaixo)

## Site 100% estático

Este site não tem backend, banco de dados, autenticação ou qualquer lógica
dependente de requisição — todo o conteúdo (portfólio, serviços, etc.) é
dados estáticos definidos em `src/lib/site-data.ts`. Por isso o build gera
um site totalmente estático: HTML pré-renderizado para cada página, mais
CSS/JS/imagens, sem exigir um runtime Node.js no servidor.

Isso significa que o site pode ser hospedado em qualquer plano de hospedagem
compartilhada tradicional (cPanel/FTP, sem suporte a Node.js) — veja o guia
completo de deploy em [`DEPLOY.md`](./DEPLOY.md).

## Desenvolvimento local

Requer Node.js 18+ e npm.

```sh
git clone <url-deste-repositorio>
cd paradoxo
npm install
npm run dev
```

## Build de produção

```sh
npm run build
```

Gera o site estático completo em `.output/public/` — esse é o diretório
cujo conteúdo deve ser enviado para a hospedagem (veja
[`DEPLOY.md`](./DEPLOY.md)).

## Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Build de produção estático (`.output/public/`) |
| `npm run preview` | Serve localmente o build gerado, para conferência |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Estrutura

- `src/routes/` — páginas (roteamento por arquivo do TanStack Router)
- `src/components/` — componentes de UI e seções de página
- `src/lib/site-data.ts` — todo o conteúdo textual/estrutural do site (serviços, portfólio, etc.)
- `src/assets/` — imagens e fontes
- `scripts/fix-static-client-entry.mjs` — corrige um bug do build estático do TanStack Start/Nitro (roda automaticamente como parte de `npm run build`, ver comentários no arquivo)
