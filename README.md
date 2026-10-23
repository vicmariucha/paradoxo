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

## Site estático (com um pedaço dinâmico: o blog)

A maior parte do site (portfólio, serviços, etc.) é dados estáticos
definidos em `src/lib/site-data.ts`, pré-renderizados em HTML no build —
sem exigir um runtime Node.js no servidor. Isso significa que o site pode
ser hospedado em qualquer plano de hospedagem compartilhada tradicional
(cPanel/FTP, sem suporte a Node.js) — veja o guia completo de deploy em
[`DEPLOY.md`](./DEPLOY.md).

O blog (`/blog` e `/admin`) é a exceção: os posts vivem no
[Supabase](https://supabase.com) e são buscados direto do navegador
(client-side), não em build time, para que publicar um post pelo painel em
`/admin` apareça no site na hora — sem rebuild. `public/.htaccess` é o que
faz essas duas rotas funcionarem em hospedagem estática pura (ver
comentários no arquivo). Veja [`BLOG-ADMIN.md`](./BLOG-ADMIN.md) para
configurar o Supabase e usar o painel.

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
- `scripts/copy-htaccess.mjs` — copia `public/.htaccess` para a saída do build (ver comentários no arquivo)
- `supabase/migration.sql` e `supabase/seed.sql` — schema e dados iniciais do blog (ver [`BLOG-ADMIN.md`](./BLOG-ADMIN.md))
- `src/routes/admin.tsx` — painel de edição do blog (`/admin`)
