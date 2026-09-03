# Guia de Deploy — Hospedagem Compartilhada (HostGator)

Este site é **100% estático** depois do build: não precisa de Node.js, banco
de dados ou qualquer coisa rodando no servidor. Basta gerar os arquivos e
enviá-los por FTP para a hospedagem. Siga os passos abaixo em ordem.

## 1. Instalar o Node.js

Baixe e instale o Node.js (versão 18 ou mais recente) em
https://nodejs.org — escolha a versão "LTS". Isso é feito uma vez, no seu
computador (não na hospedagem).

Para conferir se instalou corretamente, abra o Terminal (Mac/Linux) ou
Prompt de Comando/PowerShell (Windows) e digite:

```sh
node -v
```

Deve aparecer algo como `v20.x.x` ou similar.

## 2. Instalar as dependências do projeto

Dentro da pasta do projeto (onde está o arquivo `package.json`), rode:

```sh
npm install
```

Isso baixa tudo que o projeto precisa para funcionar. Pode demorar um ou
dois minutos.

## 3. Recuperar as imagens e a fonte reais do site

O projeto foi originalmente criado na plataforma Lovable.dev. As imagens do
portfólio e a fonte personalizada ainda apontam para o CDN da Lovable e
**precisam ser baixadas para dentro do projeto antes do build final**, ou o
site vai gerar com imagens quebradas/placeholder.

Rode:

```sh
node scripts/download-lovable-assets.mjs
```

O script vai baixar automaticamente todas as imagens (cerca de 129 arquivos)
e a fonte "Rosnoc" do projeto na Lovable, salvando cada uma na pasta
`src/assets/`. No final ele mostra um resumo:

- Se **tudo** foi baixado com sucesso, pode seguir para o próximo passo.
- Se algum arquivo **falhar** (por exemplo, se o projeto na Lovable não
  estiver mais acessível), o script lista exatamente quais arquivos
  falharam. Nesse caso, abra o projeto no editor da Lovable, clique com o
  botão direito na imagem em questão → "Salvar imagem como" (ou use o
  painel de assets do editor), e salve o arquivo na pasta `src/assets/`
  com exatamente o nome indicado pelo script.

Esse script só precisa ser rodado uma vez (ou de novo, se você trocar
alguma imagem depois — nesse caso é só rodar de novo, ele sobrescreve os
arquivos existentes).

## 4. Gerar o build de produção

```sh
npm run build
```

Isso gera o site final, já pronto para publicar, dentro da pasta:

```
.output/public/
```

Esse comando recria essa pasta do zero a cada vez — não edite nada dentro
dela manualmente.

## 5. Enviar para a HostGator via FTP

1. No cPanel da HostGator, anote os dados de acesso FTP (ou use o **Gerenciador de Arquivos**, que já vem pronto no cPanel — nesse caso pule o FTP e use o passo 5b abaixo).
2. Abra um cliente de FTP (por exemplo, [FileZilla](https://filezilla-project.org/), gratuito) e conecte usando host, usuário e senha do FTP.
3. Navegue até a pasta `public_html` (essa é a pasta raiz do seu site — se quiser publicar em um subdomínio ou subpasta, navegue até a pasta correspondente).
4. Envie **todo o conteúdo de dentro de** `.output/public/` (os arquivos e pastas que estão dentro dela, não a pasta `.output/public` em si) para dentro de `public_html`.

### 5b. Alternativa: Gerenciador de Arquivos do cPanel

Se preferir não usar FTP:

1. Compacte o conteúdo de `.output/public/` em um `.zip` (selecione todos os arquivos de dentro da pasta, não a pasta em si, e compacte).
2. No cPanel, abra o **Gerenciador de Arquivos**, entre em `public_html`.
3. Clique em "Carregar" e envie o `.zip`.
4. Depois de enviado, clique com o botão direito no arquivo `.zip` e escolha "Extrair", extraindo o conteúdo direto em `public_html`.
5. Apague o arquivo `.zip` depois de extrair.

## 6. Pronto

Depois de enviados os arquivos, o site já está no ar em qualquer plano de
hospedagem compartilhada padrão — não é necessário nenhum plano com
suporte a Node.js, já que tudo é HTML/CSS/JS estático.

Sempre que o conteúdo do site mudar (novos textos, imagens, serviços, itens
de portfólio em `src/lib/site-data.ts`), repita os passos 4 e 5 (não
precisa repetir os passos 1 a 3, a menos que troque de computador ou adicione
imagens novas vindas da Lovable).
