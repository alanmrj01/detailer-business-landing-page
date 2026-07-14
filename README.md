# Detailer Business — Landing Page comercial 2.3

Landing page em React + Vite + TypeScript para apresentar o Detailer Business a criadores de conteúdo da estética automotiva.

## O que mudou na versão 2.3

- Comunicação mais direta na primeira dobra.
- Demonstração posicionada logo no início da página.
- Menos seções e menos repetição de argumentos.
- Benefício comercial explícito sem desvalorizar o conteúdo do criador.
- Explicação clara de como escopo e investimento são definidos.
- Formulário mais próximo da decisão de contato.
- Ilustrações próprias para os exemplos de Duolingo, Codecademy e Kahoot!.
- Aviso explícito de que as plataformas citadas são referências públicas, não clientes ou parceiros.

O histórico detalhado está em `ALTERACOES_2.3.txt`.

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
