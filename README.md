# Detailer Business — Landing Page comercial 1.1

Landing page em React + Vite + TypeScript criada para apresentar o Detailer Business a criadores de conteúdo da estética automotiva.

A demonstração completa do jogo está incorporada no projeto em `public/game` e aparece dentro de um `iframe` na seção **Experiência ao vivo**.

## Executar localmente

Requer Node.js 18.18 ou superior.

```bash
npm install
npm run dev
```

Acesse o endereço indicado pelo Vite, normalmente `http://localhost:5173`.


## Importar no StackBlitz

Este pacote foi preparado para importação direta no StackBlitz:

1. Crie um projeto por **Upload Project**.
2. Selecione o arquivo ZIP inteiro.
3. O StackBlitz executará `npm install` e `npm run dev`.
4. A aplicação será aberta na porta 5173.

O `package-lock.json` usa exclusivamente o registro público do npm. O arquivo `.npmrc` também fixa esse registro para evitar travamentos durante a instalação.

## Gerar produção

```bash
npm run build
npm run preview
```

A pasta final será `dist`.

## Formulário de leads

O formulário foi reduzido para nome, WhatsApp, perfil/canal, fase da oferta e uma descrição opcional do método. A página está preparada para **Netlify Forms**, sem necessidade de backend:

1. Publique o projeto no Netlify.
2. O formulário `detailer-leads` será detectado pelo formulário estático existente em `index.html`.
3. Os envios aparecerão em **Forms** no painel do site.

Em hospedagens que não processam Netlify Forms, conecte a função `submitLead` em `src/App.tsx` ao endpoint de sua preferência.

## Jogo incorporado

O jogo foi compilado com base `/game/` e está dentro de `public/game`.

- Landing page: `/`
- Jogo isolado: `/game/index.html`

Não altere o caminho do iframe sem também ajustar a base usada na compilação do jogo.

## Estrutura principal

```text
src/
  App.tsx          Conteúdo, componentes e interações da landing
  styles.css       Identidade visual e responsividade
  assets/          Capturas reais do produto e imagem de apoio
public/
  game/            Build completo do Detailer Business 1.3.3
  _redirects       Fallback de SPA para Netlify
index.html         SEO e formulário estático do Netlify
```

## Conteúdo comercial

A página foi construída para posicionar o produto como:

- ferramenta didática profissional;
- extensão do método do criador;
- aplicação para cursos, mentorias e comunidades;
- experiência baseada em decisão, consequência e diagnóstico;
- produto personalizável, e não um jogo genérico de oficina;
- implantação sob medida, com escopo e valor definidos antes do desenvolvimento;
- possibilidade de começar por uma versão essencial e evoluir após validação.

## Referências de mercado

A landing cita Duolingo, Codecademy e Kahoot! apenas como referências públicas do princípio de aprendizagem interativa. A própria página deixa explícito que essas marcas não são clientes, parceiros ou cases do Detailer Business.
