# Painel do blog (/admin)

O blog trocou de motor: em vez do Decap CMS (que salvava posts como
arquivos `.md` no GitHub, com um editor só de formatação básica), agora
existe um painel próprio em `/admin`, com um editor visual (WYSIWYG) real —
alinhamento, negrito, links, imagens, tudo com o estilo do próprio site — e
os posts ficam guardados no [Supabase](https://supabase.com) (um banco de
dados gratuito). Publicar um post é uma gravação no banco, então aparece no
site **na hora**, sem precisar rodar `npm run build` nem esperar o GitHub
Actions.

Se você já tinha configurado o Decap CMS + Cloudflare Worker antes, pode
ignorar/excluir aquele Worker — ele não é mais usado.

## 1. Criar o projeto no Supabase (gratuito)

1. Crie uma conta em [supabase.com](https://supabase.com) e clique em "New
   project".
2. Dê um nome (ex: `paradoxo-blog`), escolha uma senha de banco (guarde-a,
   mas você não vai precisar dela no dia a dia) e a região mais próxima
   (ex: São Paulo/`sa-east-1`, se disponível).
3. Aguarde o projeto ser criado (leva 1-2 minutos).

## 2. Criar as tabelas

1. No painel do projeto, abra **SQL Editor** (menu lateral) > **New query**.
2. Abra o arquivo [`supabase/migration.sql`](./supabase/migration.sql) deste
   repositório, copie o conteúdo inteiro, cole no editor e clique em **Run**.
3. Isso cria a tabela de posts, as regras de segurança e o espaço de
   armazenamento das imagens. Só precisa rodar essa vez.

## 3. (Opcional) Trazer os 2 posts que já existiam

Se quiser já ver o blog com os 2 artigos que tinham sido escritos antes:

1. Ainda no SQL Editor, abra [`supabase/seed.sql`](./supabase/seed.sql),
   copie e rode.
2. Depois de logar no `/admin` (passo 5), abra cada um desses 2 posts e
   defina a imagem de capa (os arquivos originais estão em
   `src/assets/kit-corporativo.jpeg` e `src/assets/catalogo-institucional.jpeg`
   — é só fazer upload deles pelo próprio painel). Leva uns 30 segundos por post.

## 4. Pegar suas credenciais

1. No painel do Supabase: **Project Settings** (ícone de engrenagem) >
   **API**.
2. Copie dois valores: **Project URL** e a chave **anon public** (em "Project
   API keys").

Você vai usar esses dois valores em dois lugares:

### Local (para testar no seu computador)

Na raiz do projeto, copie `.env.example` para um novo arquivo chamado
`.env` e preencha:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

O `.env` nunca é enviado ao GitHub (já está no `.gitignore`).

### Produção (GitHub Actions, para o site publicado)

No GitHub: **Settings > Secrets and variables > Actions > New repository
secret**, crie dois secrets (os mesmos que você já tem para FTP,
`FTP_SERVER` etc., ficam junto):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Sem isso, o build de produção (GitHub Actions) não vai saber falar com o
Supabase, e a página `/blog` vai ficar em branco no site publicado.

> A chave "anon public" não é secreta de verdade — ela só permite o que as
> regras do banco (RLS, já criadas pelo `migration.sql`) autorizam: qualquer
> visitante consegue **ler** posts publicados, e só uma conta marcada como
> admin consegue **criar/editar/excluir**. Ainda assim, mantê-la como secret
> no GitHub evita que fique visível direto no histórico do repositório.

## 5. Criar seu login e virar admin

1. Rode `npm run dev` (ou acesse o site já publicado) e vá em `/admin`.
2. Na tela de login, clique em "Ainda não tem conta? Criar uma" e crie sua
   conta com e-mail e senha.
3. Volte ao SQL Editor do Supabase e rode (trocando pelo seu e-mail):

   ```sql
   insert into public.user_roles (user_id, role)
   select id, 'admin' from auth.users where email = 'seu-email@exemplo.com';
   ```

4. Volte para `/admin` e recarregue a página — agora você tem acesso ao
   painel completo.

Só precisa fazer esse passo 5 uma vez, para a sua própria conta.

## Usando o painel no dia a dia

Em `/admin`: "Novo post" cria um post do zero (título, resumo, imagem de
capa, tags, o conteúdo no editor visual) e a lista mostra todos os posts
com um selo "Publicado"/"Rascunho". Deixe "Publicado" desmarcado para
deixar um post pronto sem que ele apareça no site ainda (ex: revisar antes
de lançar), ou defina uma data de publicação no futuro. Publicar, editar ou
excluir um post tem efeito imediato no site — não precisa rodar nada.

## E o deploy do código continua automático?

Sim — nada mudou aí. Sempre que você (ou eu) alterar código do site
(design, novas páginas, etc.) e isso for enviado (`git push`) para `main`,
o GitHub Actions builda e publica na HostGator, como já estava configurado.
A diferença é que **posts do blog não fazem mais parte desse processo** —
eles vivem no Supabase e aparecem na hora.
