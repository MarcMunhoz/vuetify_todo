## Why

O projeto possui uma base Vue 2/Vuetify 2 com dependências diretas e transitivas antigas, além de alertas de segurança abertos no GitHub. A manutenção é necessária para reduzir risco de vulnerabilidades, alinhar o lockfile ao manifesto e avaliar até onde é tecnicamente seguro atualizar a stack sem quebrar o comportamento atual da aplicação.

O Dependabot reporta 58 alertas abertos no repositório `MarcMunhoz/vuetify_todo`: 2 críticos, 26 altos, 23 médios e 7 baixos. A auditoria local com Yarn também aponta 103 vulnerabilidades em `app/yarn.lock`: 4 críticas, 46 altas, 43 médias e 10 baixas.

## Current State

- Linguagem/runtime: JavaScript com Node.js `^22.0.0`.
- Gerenciador de pacotes: Yarn `^1.22.22`.
- Manifesto e lockfile: `app/package.json` e `app/yarn.lock`.
- Containerização: Docker e Docker Compose.
- Imagem base: `node:22-alpine`.
- Serviço principal: `app`, exposto em `localhost:8080`.
- Scripts existentes: `yarn serve` e `yarn build`.
- Validações automatizadas declaradas: não há scripts de lint, typecheck ou testes em `app/package.json`.
- Dependências principais atuais:
  - Vue `^2.6.11`
  - Vuetify `^2.4.0`
  - Vue Router `^3.2.0`
  - Vuex `^3.4.0`
  - vuedraggable `^2.24.3`
  - Vue CLI `~5.0.8`/`^5.0.8`
- Dependências com versões major mais novas disponíveis no registry:
  - Vue `3.5.40`
  - Vuetify `4.1.6`
  - Vue Router `5.2.0`
  - Vuex `4.1.0`
  - core-js `3.49.0`
  - ejs `6.0.1`
  - tough-cookie `6.0.2`
  - less `4.8.1`
  - less-loader `13.0.0`
  - sass-loader `17.0.0`
  - css-select `7.0.0`
- Dependências diretas já no maior release observado ou sem atualização direta útil:
  - vuedraggable `2.24.3`
  - Vue CLI service/plugins `5.0.9`
  - vue-cli-plugin-vuetify `2.5.8`
  - vuetify-loader `1.9.2`
  - glob-parent `6.0.2`
- O comando `yarn outdated` falha atualmente com `Outdated lockfile. Please run yarn install and try again`.
- Durante instalação em container, o Yarn avisa que a entrada de lockfile para `glob-parent@^6.0.1` está incorreta.
- Há avisos de peer dependency relacionados a loaders e Webpack, especialmente `less-loader`, `sass-loader`, `null-loader`, `vuetify-loader` e `file-loader`.
- Tentativas iniciais de `docker compose run --rm app yarn ...` foram interpretadas pelo entrypoint como argumentos de `yarn serve`; comandos de manutenção precisam sobrescrever o entrypoint, por exemplo com `--entrypoint yarn`.

## What Changes

- Atualizar o lockfile de forma consistente com `app/package.json`.
- Avaliar e aplicar atualizações patch/minor compatíveis para reduzir vulnerabilidades transitivas sem migração ampla quando possível.
- Atualizar dependências diretas compatíveis com Vue 2/Vuetify 2, incluindo Vue `2.7.x`, `vue-template-compiler` correspondente, Vue CLI `5.0.9`, `vue-cli-plugin-vuetify` `2.5.x`, `vuetify-loader` `1.9.x`, `core-js`, `ejs`, `tough-cookie`, `less`, `sass` e outros pacotes auxiliares quando compatíveis.
- Corrigir vulnerabilidades transitivas preferencialmente pela atualização das dependências diretas responsáveis.
- Revisar o bloco `resolutions` existente e manter overrides somente quando necessários e justificados.
- Avaliar a migração major para Vue 3/Vuetify 3 ou 4 como caminho para corrigir alertas que não tenham patch seguro na linha Vue 2/Vuetify 2.
- Implementar adaptações de código/configuração exigidas por breaking changes apenas quando forem necessárias para manter a aplicação funcionando.
- Atualizar `Dockerfile` somente se houver necessidade técnica, mantendo o uso de Node 22 quando compatível.

## Validation

- Executar instalação limpa no ambiente Docker suportado.
- Executar `yarn build` dentro do container.
- Executar `yarn audit` dentro do container antes e depois das alterações.
- Executar `yarn outdated` dentro do container após regenerar o lockfile.
- Inicializar a aplicação pelo Docker Compose.
- Validar manualmente os fluxos principais no navegador:
  - informar nome do usuário;
  - criar tarefa;
  - editar tarefa;
  - definir data de vencimento;
  - marcar tarefa como concluída;
  - reordenar tarefas;
  - excluir tarefa;
  - confirmar persistência em `localStorage`.
- Registrar explicitamente que lint, typecheck e testes automatizados não existem no manifesto atual.

## Constraints

- Comandos de package manager e build devem ser executados no contexto do container.
- O projeto usa Vue 2/Vuetify 2; migrar para Vue 3/Vuetify 3 ou 4 pode exigir mudanças substanciais em componentes, plugins, roteamento, Vuex e configuração do build.
- Vue 2 está em linha legada; algumas vulnerabilidades podem exigir migração major para serem encerradas pelo Dependabot.
- `vuetify-loader`, `vue-template-compiler` e Vue precisam permanecer compatíveis entre si se a aplicação continuar em Vue 2.
- O lockfile inconsistente impede `yarn outdated` até que a instalação seja normalizada.
- Não há suíte automatizada de testes para cobrir regressões funcionais.
- O Dockerfile usa `ENTRYPOINT ["yarn", "serve"]`; comandos pontuais devem sobrescrever o entrypoint para não serem tratados como argumentos do servidor de desenvolvimento.
- Não se deve instalar novas ferramentas de lint/testes nesta manutenção sem autorização explícita.

## Impact

- `app/package.json`
- `app/yarn.lock`
- Possíveis ajustes em `Dockerfile` ou `docker-compose.yaml` se a estratégia de execução exigir mudança.
- Possíveis ajustes em `app/src/plugins/vuetify.js`, `app/src/main.js`, `app/src/router/index.js`, componentes e views se houver migração major.
- README ou documentação de validação, caso as versões e comandos suportados mudem.
- Comportamento da aplicação de tarefas, especialmente componentes Vuetify, drag-and-drop, datas, diálogos e persistência local.

## Security References

- Repositório remoto: `https://github.com/MarcMunhoz/vuetify_todo`.
- API consultada: `repos/MarcMunhoz/vuetify_todo/dependabot/alerts`.
- Alertas Dependabot abertos: 58 no total.
- Distribuição dos alertas abertos:
  - críticos: 2
  - altos: 26
  - médios: 23
  - baixos: 7
- Pacotes destacados nos alertas abertos incluem `websocket-driver`, `shell-quote`, `postcss`, `brace-expansion`, `svgo`, `fast-uri`, `webpack-dev-server`, `http-proxy-middleware`, `lodash`, `node-forge`, `minimatch`, `vuetify`, `vue`, `vue-template-compiler`, `qs`, `webpack`, `uuid`, `serialize-javascript`, `follow-redirects`, `launch-editor`, `on-headers` e `@babel/core`.
- Auditoria local executada com `docker compose run --rm --entrypoint yarn app audit --groups dependencies --groups devDependencies`.
- Resultado da auditoria local: 103 vulnerabilidades em 814 pacotes auditados, com 4 críticas, 46 altas, 43 médias e 10 baixas.
- `yarn outdated` foi tentado com `docker compose run --rm --entrypoint yarn app outdated`, mas falhou por lockfile desatualizado.
