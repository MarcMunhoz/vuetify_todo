## Implementation Tasks

### 1. Inspeção e baseline

- [x] 1.1 Confirmar que o branch de trabalho está limpo ou registrar alterações preexistentes antes da implementação.
- [x] 1.2 Registrar Node.js `^22.0.0`, Yarn `^1.22.22`, imagem `node:22-alpine`, Docker Compose e porta `8080`.
- [x] 1.3 Registrar `app/package.json` e `app/yarn.lock` como manifesto e lockfile.
- [x] 1.4 Registrar scripts existentes: `yarn serve` e `yarn build`.
- [x] 1.5 Registrar que `app/package.json` não declara lint, typecheck ou testes automatizados.
- [x] 1.6 Executar `docker compose run --rm --entrypoint yarn app audit --groups dependencies --groups devDependencies` e registrar o baseline de 103 vulnerabilidades.
- [x] 1.7 Executar `docker compose run --rm --entrypoint yarn app outdated` e registrar a falha atual por lockfile desatualizado.
- [x] 1.8 Consultar alertas Dependabot com GitHub CLI/API e registrar o baseline de 58 alertas abertos por severidade.
- [x] 1.9 Registrar avisos de instalação existentes, incluindo entrada incorreta de `glob-parent@^6.0.1` no lockfile e peer dependencies de loaders/Webpack.

### 2. Normalização do lockfile

- [x] 2.1 Executar instalação no container com Yarn para regenerar `app/yarn.lock` de forma consistente com `app/package.json`.
- [x] 2.2 Revisar o diff inicial do lockfile e confirmar que não houve alteração de código-fonte não relacionada.
- [x] 2.3 Reexecutar `docker compose run --rm --entrypoint yarn app outdated` e registrar as dependências diretas desatualizadas.
- [x] 2.4 Reexecutar `docker compose run --rm --entrypoint yarn app audit --groups dependencies --groups devDependencies` e registrar a contagem pós-normalização.

### 3. Atualizações compatíveis com Vue 2/Vuetify 2

- [x] 3.1 Atualizar Vue para a maior versão segura da linha `2.7.x`.
- [x] 3.2 Atualizar `vue-template-compiler` para a mesma versão final de Vue.
- [x] 3.3 Atualizar Vuetify para a maior versão segura da linha `2.x`, se disponível.
- [x] 3.4 Atualizar `@vue/cli-service` e plugins `@vue/cli-plugin-*` para a maior versão compatível da linha `5.x`.
- [x] 3.5 Atualizar `vue-cli-plugin-vuetify` e `vuetify-loader` para as maiores versões compatíveis com Vue 2/Vuetify 2.
- [x] 3.6 Atualizar dependências diretas auxiliares compatíveis, incluindo `core-js`, `ejs`, `tough-cookie`, `less`, `sass`, `css-select` e `glob-parent`.
- [x] 3.7 Avaliar `less-loader` e `sass-loader` contra a versão de Webpack usada pelo Vue CLI antes de aplicar majors.
- [x] 3.8 Revisar `@achrinza/node-ipc` porque a consulta de registry indicou linha disponível diferente da declarada, e documentar a decisão.
- [x] 3.9 Executar instalação limpa no container após o primeiro grupo de atualizações.
- [x] 3.10 Executar `docker compose run --rm --entrypoint yarn app build` após o primeiro grupo de atualizações.

### 4. Dependências transitivas e `resolutions`

- [x] 4.1 Mapear alertas abertos para dependências diretas responsáveis usando lockfile e árvore instalada.
- [x] 4.2 Atualizar dependências diretas responsáveis por `postcss`, `node-forge`, `webpack-dev-server`, `minimatch`, `brace-expansion`, `shell-quote`, `svgo`, `fast-uri`, `qs`, `lodash`, `uuid`, `serialize-javascript`, `follow-redirects`, `launch-editor`, `on-headers`, `@babel/core` e `websocket-driver` quando houver caminho compatível.
- [x] 4.3 Remover entradas de `resolutions` que deixarem de ser necessárias após atualizações diretas.
- [x] 4.4 Manter ou adicionar `resolutions` somente quando a atualização direta não resolver a vulnerabilidade e a versão forçada for compatível.
- [x] 4.5 Para cada `resolution` remanescente, registrar pacote, vulnerabilidade tratada e motivo técnico.
- [x] 4.6 Executar auditoria local após ajustes transitivos e registrar vulnerabilidades corrigidas e remanescentes.

### 5. Avaliação de atualizações major

- [x] 5.1 Identificar alertas que exigem Vue 3, Vuetify 3 ou Vuetify 4 para correção.
- [x] 5.2 Avaliar breaking changes de Vue 3, Vue Router, Vuex e Vuetify antes de alterar código.
- [x] 5.3 Decidir se a migração major cabe no escopo desta manutenção com base em severidade, esforço e risco.
- [x] 5.4 Se a migração major for aplicada, adaptar `app/src/main.js`, `app/src/plugins/vuetify.js`, `app/src/router/index.js`, views e componentes afetados.
- [x] 5.5 Se a migração major não for aplicada, documentar os alertas residuais com pacote, severidade, versão corrigida exigida, exposição e recomendação futura.

### 6. Validação funcional e build

- [x] 6.1 Executar instalação limpa final dentro do container.
- [x] 6.2 Executar `docker compose run --rm --entrypoint yarn app build` e corrigir regressões de build.
- [x] 6.3 Inicializar a aplicação com Docker Compose.
- [x] 6.4 Inspecionar logs do serviço para confirmar ausência de erro de inicialização.
- [x] 6.5 Validar manualmente o modal inicial de nome do usuário.
- [x] 6.6 Validar criação de tarefa.
- [x] 6.7 Validar edição de tarefa.
- [x] 6.8 Validar definição de data de vencimento.
- [x] 6.9 Validar alternância entre tarefa concluída e incompleta.
- [x] 6.10 Validar reordenação de tarefas por drag-and-drop.
- [x] 6.11 Validar exclusão de tarefa.
- [x] 6.12 Validar persistência de usuário e tarefas em `localStorage` após reload.
- [x] 6.13 Registrar que lint, typecheck e testes automatizados não foram executados porque não existem scripts declarados.

### 7. Auditoria final

- [x] 7.1 Executar `docker compose run --rm --entrypoint yarn app audit --groups dependencies --groups devDependencies`.
- [x] 7.2 Comparar a auditoria final com o baseline de 103 vulnerabilidades.
- [x] 7.3 Consultar novamente os alertas Dependabot quando possível.
- [x] 7.4 Comparar alertas finais com o baseline de 58 alertas abertos.
- [x] 7.5 Confirmar que o lockfile final está consistente e que `yarn outdated` executa sem falha de lockfile.
- [x] 7.6 Verificar se as atualizações introduziram novas vulnerabilidades ou warnings críticos.

### 8. Revisão de escopo e documentação do resultado

- [x] 8.1 Revisar `git diff` e confirmar que as alterações estão limitadas a dependências, lockfile, configuração necessária e documentação de resultado.
- [x] 8.2 Registrar versões principais anteriores e novas.
- [x] 8.3 Registrar vulnerabilidades corrigidas, não aplicáveis, mitigadas e pendentes.
- [x] 8.4 Registrar dependências que não puderam alcançar a versão mais recente com segurança.
- [x] 8.5 Registrar comandos executados e seus resultados.
- [x] 8.6 Registrar limitações de validação manual, se houver.
- [x] 8.7 Registrar riscos residuais e recomendações futuras, especialmente para migração Vue/Vuetify major se não for aplicada.
