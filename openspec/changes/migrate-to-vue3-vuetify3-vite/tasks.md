## 1. Baseline e coordenação

- [ ] 1.1 Coletar baseline de alertas Dependabot abertos por severidade, pacote, versão vulnerável, versão corrigida e manifesto afetado
- [ ] 1.2 Coletar baseline local de dependências, scripts, Docker, Makefile, Netlify e build atual
- [ ] 1.3 Definir subagentes especialistas, arquivos de provável responsabilidade e pontos de integração antes de editar código
- [ ] 1.4 Confirmar que comandos de package manager, build, auditoria e validação serão executados somente dentro do container

## 2. Subagente de dependências e segurança

- [ ] 2.1 Mapear quais dependências diretas puxam `vue`, `vue-template-compiler`, `vuetify`, `webpack-dev-server`, `brace-expansion` e `http-proxy-middleware`
- [ ] 2.2 Propor o conjunto alvo de dependências Vue 3, Vuetify 3, Vite, vue-router 4 e drag-and-drop compatível com Vue 3
- [ ] 2.3 Remover dependências Vue 2-only, Vue CLI e Webpack obsoletas do manifesto
- [ ] 2.4 Regenerar o lockfile dentro do container e confirmar que pacotes vulneráveis removidos não permanecem na árvore ativa
- [ ] 2.5 Reexecutar auditoria e Dependabot quando possível e tratar todos os alertas acionáveis restantes

## 3. Subagente de build e plataforma

- [ ] 3.1 Substituir scripts Vue CLI por scripts Vite equivalentes em `app/package.json`
- [ ] 3.2 Criar ou atualizar configuração Vite necessária para Vue 3 e Vuetify 3
- [ ] 3.3 Atualizar Docker/Docker Compose para expor e executar corretamente o servidor Vite
- [ ] 3.4 Atualizar Makefile se os comandos de desenvolvimento, build ou auditoria mudarem
- [ ] 3.5 Validar e ajustar `netlify.toml` para base, comando e diretório de publicação do build Vite

## 4. Subagente de Vue, router e Vuetify

- [ ] 4.1 Migrar bootstrap de `main.js` para Vue 3 com `createApp`
- [ ] 4.2 Migrar `app/src/router/index.js` para vue-router 4 com histórico equivalente
- [ ] 4.3 Migrar plugin Vuetify para Vuetify 3, incluindo estilos, aliases ou configuração de ícones necessários
- [ ] 4.4 Migrar `App.vue` e `Navigation.vue` para APIs/componentes Vuetify 3 preservando layout, drawer, app bar e diálogo de usuário
- [ ] 4.5 Migrar `About.vue` para componentes Vuetify 3 preservando links externos existentes

## 5. Subagente de comportamento Todo

- [ ] 5.1 Migrar `Todo.vue` para componentes Vuetify 3 preservando entrada, lista, menu, diálogo, date picker e snackbar
- [ ] 5.2 Substituir ou atualizar drag-and-drop para uma opção compatível com Vue 3
- [ ] 5.3 Preservar formato dos objetos de tarefa e compatibilidade com `localStorage.tasks`
- [ ] 5.4 Preservar compatibilidade com `localStorage.tasksUser`
- [ ] 5.5 Validar cálculo de vencimento e marcação de tarefas expiradas após a migração

## 6. Integração e validação

- [ ] 6.1 Integrar os patches dos subagentes e resolver conflitos de API, estilo ou dependência
- [ ] 6.2 Executar instalação/atualização de dependências dentro do container
- [ ] 6.3 Executar build dentro do container e corrigir falhas introduzidas
- [ ] 6.4 Inicializar a aplicação via Docker Compose e validar que a tela principal renderiza
- [ ] 6.5 Validar fluxos de criar, editar, concluir, definir vencimento, ordenar e excluir tarefa
- [ ] 6.6 Validar persistência de tarefas e nome do usuário após recarregar a aplicação
- [ ] 6.7 Validar navegação entre Todo e About

## 7. Gate final de CVEs

- [ ] 7.1 Consultar Dependabot após a migração e registrar o resultado final por severidade
- [ ] 7.2 Corrigir qualquer alerta acionável ainda aberto antes de concluir a implementação
- [ ] 7.3 Fechar ou dispensar apenas alertas comprovadamente não aplicáveis, documentando a evidência
- [ ] 7.4 Confirmar que a change não deixa CVEs acionáveis soltas na árvore de dependências da aplicação

## 8. Documentação e conclusão

- [ ] 8.1 Atualizar README, documentação de execução ou metadados que ainda mencionarem Vue 2, Vue CLI ou comandos antigos
- [ ] 8.2 Registrar comandos executados, resultados de build/auditoria e status final dos alertas
- [ ] 8.3 Preparar resumo de migração com versões principais antigas e novas
- [ ] 8.4 Validar a change OpenSpec antes de solicitar aplicação ou revisão
