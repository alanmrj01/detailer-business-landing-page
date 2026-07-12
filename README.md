# Detailer Business — Landing Page comercial 2.1

Landing page em React + Vite + TypeScript criada para apresentar o Detailer Business a criadores de conteúdo da estética automotiva.

## Arquitetura desta versão

O app e a landing são projetos independentes:

- **Landing page:** este repositório.
- **App/jogo:** projeto próprio publicado em outro endereço do Netlify.

A landing carrega a URL pública do app em um `iframe`. Portanto, depois que a integração é configurada uma vez, qualquer atualização publicada no projeto do app aparece automaticamente na demonstração, sem recompilar ou republicar a landing.

O build local do jogo deixou de existir em `public/game`.

## Configurar a URL do app no Netlify

Depois de publicar o app e obter um endereço como:

```text
https://nome-do-app.netlify.app
```

No projeto da **landing page** no Netlify:

1. Abra **Project configuration**.
2. Entre em **Environment variables**.
3. Crie a variável:

```text
VITE_GAME_URL=https://nome-do-app.netlify.app
```

4. Não coloque barra no final da URL.
5. Faça um novo deploy da landing usando **Deploys → Trigger deploy**.

O código adiciona automaticamente `?embed=1&source=landing` ao iframe. O parâmetro não quebra versões antigas do app e poderá ativar o modo incorporado quando ele for implementado no jogo.

### Configuração alternativa por arquivo

Também é possível preencher a URL em:

```text
public/app-config.js
```

Exemplo:

```js
window.DETAILER_CONFIG = {
  gameUrl: 'https://nome-do-app.netlify.app',
};
```

A variável `VITE_GAME_URL` tem prioridade sobre esse arquivo.

## Comportamento da demonstração

- No desktop, o app aparece diretamente dentro da seção **Experiência ao vivo**.
- No celular, a landing mostra uma prévia e abre o app em um iframe que ocupa toda a tela.
- Ao fechar a demonstração no celular, o visitante volta ao mesmo ponto da landing.
- O botão **Abrir em nova guia** leva para o projeto independente do app.
- Se a URL ainda não estiver configurada, a landing apresenta uma orientação de configuração em vez de carregar um iframe quebrado.

## Atualizações independentes

```text
Alteração somente no app
→ publique o repositório do app
→ o mesmo endereço do Netlify recebe a nova versão
→ a landing passa a mostrar a atualização automaticamente

Alteração somente na landing
→ publique este repositório
→ o app não é recompilado nem alterado
```

## Executar localmente

Requer Node.js 20.

1. Copie `.env.example` para `.env.local`.
2. Preencha a URL do app:

```text
VITE_GAME_URL=https://nome-do-app.netlify.app
```

3. Execute:

```bash
npm install
npm run dev
```

Acesse o endereço indicado pelo Vite, normalmente `http://localhost:5173`.

## Deploy da landing no Netlify

As configurações estão registradas em `netlify.toml`:

```text
Diretório base: vazio
Comando de construção: npm run build
Diretório de publicação: dist
Diretório de funções: vazio
Node: 20
```

## Formulário de leads

A página continua preparada para **Netlify Forms**, sem backend adicional.

- Nome do formulário: `detailer-leads`
- Os envios aparecem no painel do projeto em **Forms**.
- Notificações por e-mail podem ser ativadas em **Project configuration → Notifications**.

## Estrutura principal

```text
src/
  App.tsx              Conteúdo, componentes e integração do iframe
  styles.css           Identidade visual, responsividade e overlay mobile
  runtime-config.d.ts  Tipagem da configuração pública
  assets/              Capturas reais do produto
public/
  app-config.js        Configuração alternativa da URL do app
  _redirects           Fallback da landing no Netlify
.env.example           Exemplo da variável VITE_GAME_URL
netlify.toml           Build e publicação no Netlify
```
