# Execução no StackBlitz

O projeto está preparado para rodar diretamente no StackBlitz.

## Importação

1. Abra o StackBlitz e escolha **Upload Project**.
2. Envie o ZIP sem criar uma pasta intermediária.
3. Aguarde a execução automática de:

```bash
npm install
npm run dev
```

A preview será publicada na porta **5173**.

## Correção aplicada

A versão anterior continha um `package-lock.json` com URLs internas de um ambiente de build. Essas URLs não eram acessíveis pelo StackBlitz e faziam o `npm install` permanecer carregando.

Nesta versão:

- todas as dependências apontam para `https://registry.npmjs.org/`;
- o `.npmrc` fixa o registro público do npm;
- os scripts `dev` e `start` usam a porta 5173;
- o ZIP possui `package.json` diretamente na raiz.
