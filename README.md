# Detailer Business Landing Page 2.6

Versão consolidada com a composição visual da 2.3 e a linguagem comercial aprovada da 2.5.

## Rodar localmente

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

## Netlify

- Diretório base: vazio
- Comando de build: `npm run build`
- Diretório de publicação: `dist`
- Node: 20

Crie a variável pública:

```text
VITE_GAME_URL=https://app-detailer-business.netlify.app
```

O formulário reconhecido pelo Netlify chama-se `detailer-leads`.
