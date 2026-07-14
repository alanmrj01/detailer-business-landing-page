# Detailer Business — Landing Page comercial 2.4

Landing page em React + Vite + TypeScript para apresentar o Detailer Business a criadores de conteúdo da estética automotiva.

## O que mudou na versão 2.4

- Codecademy substituída por Electude, aproximando as referências do setor automotivo.
- Oferta reorganizada em torno de um piloto de 14 dias antes do investimento.
- CTAs e FAQ com linguagem mais simples, próxima e orientada à ação.
- Processo de implantação apresentado como rápido e guiado.
- FAQ otimizado sem animação de altura e isolado do restante da página.
- Lazy loading, dimensões explícitas de imagens e renderização progressiva de seções.
- Hero mais compacto, preservando a ilustração do aplicativo no celular.
- Cabeçalhos de segurança para Netlify e validação da URL externa do app.
- Direitos reservados adicionados ao rodapé.

O histórico detalhado está em `ALTERACOES_2.4.txt`.

## Arquitetura

O app e a landing são projetos independentes:

- **Landing page:** este projeto.
- **App/jogo:** projeto próprio publicado em outro endereço do Netlify.

A landing carrega a URL pública do app em um `iframe`. Depois da configuração inicial, novos deploys do app aparecem automaticamente na demonstração sem exigir uma nova publicação da landing.

## Configurar a URL do app no Netlify

No projeto da landing, crie a variável:

```text
VITE_GAME_URL=https://nome-do-app.netlify.app
```

Não coloque barra no final. Depois faça um novo deploy da landing.

Como alternativa, preencha `public/app-config.js`:

```js
window.DETAILER_CONFIG = {
  gameUrl: 'https://nome-do-app.netlify.app',
};
```

A variável `VITE_GAME_URL` tem prioridade.

## Comportamento da demonstração

- Desktop: app incorporado diretamente na página.
- Celular: prévia com abertura do iframe em tela cheia.
- O visitante retorna ao mesmo ponto da landing ao fechar.
- O botão de nova guia abre o projeto independente do app.
- Sem URL configurada, a página mostra uma orientação de conexão.

## Segurança e desempenho

- O arquivo `public/_headers` configura CSP, HSTS, proteção contra MIME sniffing, restrições de permissões e proteção contra enquadramento da landing.
- A URL do app aceita apenas HTTPS; HTTP é permitido somente para `localhost` no desenvolvimento.
- Assets versionados recebem cache longo, enquanto `app-config.js` permanece sem cache para permitir atualização segura da configuração.
- O formulário mantém o honeypot do Netlify e limites de tamanho nos campos.

## Executar localmente

Requer Node.js 20.

```bash
npm ci
npm run dev
```

Para carregar o app localmente, copie `.env.example` para `.env.local` e informe `VITE_GAME_URL`.

## Deploy no Netlify

```text
Diretório base: vazio
Comando de construção: npm run build
Diretório de publicação: dist
Diretório de funções: vazio
Node: 20
```

As configurações já estão registradas em `netlify.toml`.

## Formulário de leads

- Nome: `detailer-leads`
- Processamento: Netlify Forms
- Sem backend adicional
- Envios disponíveis no painel do Netlify em **Forms**

O formulário estático de detecção permanece no `index.html`.

## Atualização 2.5

A versão 2.5 preserva todos os assets visuais da 2.4 e aplica somente ajustes de copy, desempenho, segurança, posicionamento do hero, FAQ e iframe. Consulte `ALTERACOES_2.5.txt`.
