## Context

O projeto é uma aplicação JavaScript de tarefas baseada em Vue 2, Vuetify 2, Vue Router 3, Vuex 3 e Vue CLI 5. O runtime declarado é Node.js `^22.0.0`, o gerenciador é Yarn `^1.22.22`, e os artefatos de dependência ficam em `app/package.json` e `app/yarn.lock`.

A execução suportada é containerizada. O `Dockerfile` usa `node:22-alpine`, instala dependências com Yarn e define `ENTRYPOINT ["yarn", "serve"]`. O `docker-compose.yaml` monta `./app:/app`, expõe a porta `8080` e inicia o servidor de desenvolvimento. Por causa do entrypoint, comandos de manutenção como `yarn audit`, `yarn outdated`, `yarn install` e `yarn build` precisam ser executados com entrypoint sobrescrito quando usados via `docker compose run`, ou com `docker compose exec app ...` quando o serviço já estiver ativo.

O baseline atual mostra lockfile inconsistente. `yarn outdated` falha com `Outdated lockfile. Please run yarn install and try again`, e a instalação avisa que a entrada de `glob-parent@^6.0.1` no lockfile está incorreta. A auditoria local em container encontrou 103 vulnerabilidades em 814 pacotes auditados: 4 críticas, 46 altas, 43 médias e 10 baixas.

O Dependabot reporta 58 alertas abertos no GitHub: 2 críticos, 26 altos, 23 médios e 7 baixos. Os pacotes afetados são majoritariamente transitivos do toolchain Vue CLI/Webpack/Vuetify, mas também incluem alertas diretos ou próximos da stack legada, como `vue`, `vue-template-compiler` e `vuetify`.

Não há scripts de lint, typecheck ou testes automatizados no manifesto atual. A validação precisa usar instalação, build, inicialização da aplicação e teste funcional manual dos fluxos críticos.

## Goals / Non-Goals

**Goals:**

- Normalizar `app/yarn.lock` para permitir auditoria e inspeção de versões confiáveis.
- Atualizar dependências diretas e transitivas ao máximo tecnicamente seguro.
- Corrigir alertas Dependabot aplicáveis e vulnerabilidades locais aplicáveis.
- Avaliar atualizações major, especialmente Vue/Vuetify, quando forem necessárias para remover alertas sem patch na linha atual.
- Preservar o comportamento existente da aplicação de tarefas.
- Validar com os mecanismos existentes: instalação, build, inicialização e fluxo funcional manual.
- Documentar vulnerabilidades residuais, dependências não atualizadas e riscos aceitos.

**Non-Goals:**

- Adicionar funcionalidades novas à aplicação.
- Redesenhar layout ou alterar comportamento sem exigência de compatibilidade.
- Reestruturar arquitetura fora do necessário para migração de dependências.
- Instalar lint, typecheck ou testes automatizados sem autorização explícita.
- Forçar instalações que ignorem conflitos sem justificativa técnica.
- Ocultar vulnerabilidades por estarem em dependências de desenvolvimento sem analisar exposição.
- Afirmar funcionamento completo sem evidência de build e validação funcional.

## Decisions

### 1. Estratégia de inspeção inicial

O baseline será estabelecido antes de qualquer alteração funcional. A implementação deve registrar:

- Node.js e Yarn declarados em `app/package.json`;
- imagem base e entrypoint no `Dockerfile`;
- serviço, volume e porta no `docker-compose.yaml`;
- scripts disponíveis em `app/package.json`;
- dependências diretas de produção, desenvolvimento e `resolutions`;
- falha atual de `yarn outdated`;
- resultado inicial de `yarn audit`;
- alertas abertos do Dependabot via GitHub API/CLI.

Comandos de Yarn serão executados no container. Para comandos pontuais com `docker compose run`, a forma preferencial é `docker compose run --rm --entrypoint yarn app <comando>`.

**Alternatives considered:**

- Atualizar diretamente sem baseline: rejeitada porque impediria diferenciar problemas preexistentes de regressões introduzidas pela manutenção.
- Usar somente o Dependabot como baseline: rejeitada porque a auditoria local já mostra vulnerabilidades adicionais e problemas de lockfile.

### 2. Estratégia de atualização do ambiente

O Node 22 declarado e a imagem `node:22-alpine` serão mantidos inicialmente, porque já são atuais e compatíveis com o objetivo de manutenção. O Yarn 1.22 será mantido enquanto a aplicação permanecer no padrão atual de lockfile e `resolutions`.

O Dockerfile só deve mudar se a atualização de dependências exigir alteração concreta, como ajuste de entrypoint, remoção de instalação global redundante ou compatibilidade com build. Caso contrário, a manutenção deve concentrar alterações em `app/package.json` e `app/yarn.lock`.

**Alternatives considered:**

- Atualizar dependências sem avaliar o runtime: rejeitada quando versões mais recentes dos pacotes exigirem um ambiente mais atual.
- Atualizar o runtime além do suportado pela imagem base: rejeitada por incompatibilidade ambiental.
- Migrar Yarn 1 para outro gerenciador nesta mudança: rejeitada por aumentar o escopo e trocar o formato de lockfile durante uma correção de vulnerabilidades.

### 3. Estratégia de atualização das dependências

A atualização deve ser progressiva:

1. Normalizar o lockfile com instalação dentro do container.
2. Rodar `yarn outdated` novamente para obter uma lista confiável.
3. Atualizar primeiro dependências compatíveis com Vue 2/Vuetify 2:
   - Vue para a maior versão `2.7.x` compatível;
   - `vue-template-compiler` para a mesma versão de Vue;
   - Vuetify para a maior versão compatível na linha `2.x`, se disponível;
   - Vue CLI service/plugins para `5.0.9`;
   - `vue-cli-plugin-vuetify` e `vuetify-loader` para maiores versões compatíveis;
   - utilitários diretos como `core-js`, `ejs`, `tough-cookie`, `less`, `sass` e loaders quando compatíveis com Webpack/Vue CLI.
4. Atualizar dependências transitivas por meio das diretas responsáveis.
5. Revisar `resolutions`, removendo entradas que se tornarem desnecessárias e mantendo apenas overrides justificados.
6. Rodar build e auditoria.
7. Avaliar migrações major restantes quando alertas críticos/altos continuarem sem correção na linha atual.

As alterações devem ser agrupadas de forma que regressões possam ser isoladas: primeiro lockfile/baseline, depois atualizações compatíveis, depois migração major se necessária.

**Alternatives considered:**

- Atualizar todos os pacotes de uma única vez: rejeitada porque dificultaria identificar a origem de regressões.
- Limitar todas as atualizações às versões minor e patch: rejeitada porque o objetivo inclui atualizações major tecnicamente viáveis e alguns alertas podem exigir migração.
- Ir direto para Vue 3/Vuetify 4: rejeitada como primeira etapa porque há risco alto de mudança ampla sem antes esgotar correções compatíveis.

### 4. Tratamento de breaking changes

Breaking changes serão tratados por impacto real:

- Vue 2.6 para 2.7 deve ser avaliado como atualização compatível, mantendo `vue-template-compiler` alinhado.
- Vue 3 implica troca de APIs de inicialização, compatibilidade de Vuex/Router e revisão de plugins.
- Vuetify 3 ou 4 implica mudanças significativas em componentes, tema, plugin e possivelmente markup.
- Loaders modernos podem exigir Webpack/Vue CLI compatível; se o peer dependency não for atendido, a atualização deve ser descartada ou acompanhada da dependência responsável.

Migração major só deve ser aplicada se:

- for necessária para corrigir vulnerabilidade aplicável sem alternativa segura;
- couber no escopo de manutenção;
- o build e os fluxos críticos puderem ser validados.

**Alternatives considered:**

- Evitar automaticamente qualquer atualização major: rejeitada porque pode manter dependências obsoletas ou vulneráveis.
- Aplicar a atualização major sem migração: rejeitada porque pode comprometer o funcionamento da aplicação.

### 5. Tratamento de dependências transitivas

Dependências transitivas vulneráveis serão tratadas nesta ordem:

1. Atualizar a dependência direta que introduz o pacote vulnerável.
2. Substituir a dependência direta se ela estiver abandonada e bloquear correção crítica.
3. Usar `resolutions` somente quando a versão forçada for compatível com a árvore instalada.

Cada override mantido em `resolutions` precisa de justificativa por pacote, especialmente para pacotes do toolchain como `postcss`, `node-forge`, `webpack-dev-server`, `minimatch`, `brace-expansion`, `shell-quote`, `svgo`, `fast-uri`, `qs`, `lodash`, `uuid`, `serialize-javascript` e `follow-redirects`.

**Alternatives considered:**

- Ignorar dependências transitivas: rejeitada porque elas compõem a maior parte dos alertas.
- Aplicar overrides indiscriminadamente: rejeitada porque pode introduzir incompatibilidades silenciosas.

### 6. Estratégia de correção das vulnerabilidades

Os alertas serão correlacionados entre três fontes:

- GitHub Dependabot;
- `yarn audit`;
- árvore instalada/lockfile após atualização.

Cada vulnerabilidade será classificada como:

- corrigida;
- não aplicável à árvore final;
- mitigada por limitação de exposição;
- pendente por limitação técnica.

Vulnerabilidades em dependências de desenvolvimento não serão descartadas automaticamente, porque o servidor de desenvolvimento, Webpack e Vue CLI fazem parte da superfície usada para desenvolvimento e build. Quando a vulnerabilidade estiver em ferramenta não empacotada para produção, a exposição deve ser registrada, mas a correção ainda deve ser buscada quando tecnicamente segura.

**Alternatives considered:**

- Considerar apenas o Dependabot: rejeitada porque a auditoria local pode identificar vulnerabilidades adicionais.
- Considerar apenas a contagem da auditoria: rejeitada porque é necessário analisar a árvore e a exposição real.

### 7. Estratégia de validação

A validação será baseada no que existe:

- instalação limpa no container;
- `yarn build` dentro do container;
- `yarn audit` antes e depois;
- `yarn outdated` após lockfile normalizado;
- inicialização da aplicação via Docker Compose;
- inspeção de logs do serviço;
- validação manual dos fluxos críticos no navegador.

Lint, typecheck e testes automatizados não serão adicionados nem exigidos nesta mudança, porque não existem no manifesto atual.

**Alternatives considered:**

- Exigir uma suíte padrão de validação para todos os projetos: rejeitada porque este projeto não possui lint, typecheck ou testes.
- Considerar apenas a instalação bem-sucedida: rejeitada porque isso não comprova funcionamento da aplicação.

### 8. Validação sem testes automatizados

Sem testes automatizados, a validação funcional deve cobrir:

- modal inicial de nome de usuário;
- criação de tarefa;
- edição do título;
- definição de vencimento;
- indicação de tarefa vencida quando aplicável;
- alternância de concluída/incompleta;
- reordenação via drag-and-drop;
- exclusão;
- persistência de usuário e tarefas em `localStorage` após reload.

Se a interface não puder ser testada por restrição do ambiente, a implementação deve registrar o que foi validado e o que ficou pendente.

**Alternatives considered:**

- Não validar por ausência de testes: rejeitada porque ainda é necessário realizar a melhor verificação funcional possível.
- Instalar automaticamente uma nova ferramenta de testes: rejeitada por ampliar o escopo sem autorização.

### 9. Estratégia de reversão

A reversão deve preservar separação lógica:

- reverter apenas normalização de lockfile se ela introduzir inconsistência;
- reverter grupo de atualizações compatíveis se o build falhar;
- reverter migração major separadamente, caso ela seja aplicada;
- manter registros de versões anteriores e novas no resumo final para facilitar rollback.

Antes de encerrar, `git diff` deve ser revisado para garantir que só arquivos relacionados a dependências, configuração de execução ou documentação de resultado foram alterados.

**Alternatives considered:**

- Manter apenas o estado final sem estratégia de reversão: rejeitada porque atualizações de dependências podem introduzir regressões difíceis de isolar.

## Risks / Trade-offs

- Breaking changes em Vue/Vuetify major:
  - impacto: alto;
  - probabilidade: alta se Vue 3/Vuetify 3 ou 4 forem aplicados;
  - mitigação: tentar primeiro correções compatíveis com Vue 2/Vuetify 2 e migrar major só com necessidade demonstrada;
  - evidência para aceitar risco residual: build, validação funcional e lista de alertas remanescentes.

- Lockfile inconsistente:
  - impacto: alto para auditoria e reprodutibilidade;
  - probabilidade: já confirmado;
  - mitigação: regenerar lockfile no container antes de `yarn outdated`;
  - evidência: `yarn install` sem erro e `yarn outdated` executável.

- Dependências transitivas antigas do toolchain:
  - impacto: alto para alertas de segurança;
  - probabilidade: alta;
  - mitigação: atualizar dependências diretas e usar `resolutions` somente quando necessário;
  - evidência: auditoria final e inspeção do lockfile.

- Ausência de testes automatizados:
  - impacto: médio/alto para regressões funcionais;
  - probabilidade: confirmada;
  - mitigação: build e validação manual dos fluxos críticos;
  - evidência: lista de comandos e fluxos testados.

- Vulnerabilidades sem correção na linha Vue 2/Vuetify 2:
  - impacto: médio/alto conforme severidade;
  - probabilidade: média, especialmente para alertas diretos de Vue/Vuetify;
  - mitigação: avaliar migração major ou documentar risco residual;
  - evidência: alerta, pacote, versão vulnerável, versão corrigida exigida e justificativa.

- Diferença entre ambiente de desenvolvimento e produção:
  - impacto: médio;
  - probabilidade: média porque o projeto usa servidor de desenvolvimento por padrão;
  - mitigação: validar `yarn build` e revisar se `Dockerfile`/Compose continuam coerentes;
  - evidência: build final e inicialização do serviço.
