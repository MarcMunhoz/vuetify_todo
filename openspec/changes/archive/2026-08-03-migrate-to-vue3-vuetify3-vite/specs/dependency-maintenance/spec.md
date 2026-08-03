## MODIFIED Requirements

### Requirement: Dependabot alert remediation

A implementação SHALL analisar e tratar os alertas abertos do Dependabot para o repositório GitHub, e SHALL concluir sem CVEs acionáveis abertas para a árvore de dependências da aplicação.

#### Scenario: Dependabot alert collection

- **WHEN** houver acesso autenticado ao GitHub
- **THEN** os alertas SHALL ser consultados pela API ou CLI do GitHub
- **AND** o total por severidade SHALL ser registrado
- **AND** os pacotes afetados SHALL ser correlacionados com `app/package.json` e `app/yarn.lock`

#### Scenario: Applicable alert remediation

- **WHEN** um alerta aberto corresponder à árvore de dependências usada pelo projeto
- **THEN** a vulnerabilidade SHALL ser corrigida por atualização, substituição, remoção da dependência vulnerável ou override justificado
- **AND** a versão final SHALL ser validada por auditoria, Dependabot ou inspeção do lockfile

#### Scenario: Alert requiring major migration

- **WHEN** um alerta aberto não tiver correção segura na linha atual Vue 2/Vuetify 2
- **THEN** a migração major necessária SHALL ser aplicada dentro desta change
- **AND** a implementação SHALL remover a dependência vulnerável ou atualizar para uma versão corrigida
- **AND** o alerta SHALL permanecer bloqueante até ser resolvido ou comprovadamente não aplicável

#### Scenario: Non-applicable alert disposition

- **WHEN** um alerta Dependabot aberto for comprovadamente não aplicável à aplicação entregue
- **THEN** a evidência SHALL ser documentada
- **AND** o alerta SHALL ser fechado ou dispensado com justificativa compatível no GitHub
- **AND** a finalização SHALL NOT deixar o alerta aberto sem ação

### Requirement: Final security and outcome documentation

A implementação SHALL produzir um resumo verificável do resultado da manutenção e SHALL demonstrar que não restam CVEs acionáveis abertas na árvore de dependências da aplicação.

#### Scenario: Final audit comparison

- **WHEN** as alterações forem concluídas
- **THEN** `yarn audit` SHALL ser executado novamente dentro do container quando aplicável
- **AND** o resultado SHALL ser comparado com o baseline conhecido
- **AND** novas vulnerabilidades introduzidas SHALL ser identificadas e corrigidas antes da conclusão

#### Scenario: Dependabot outcome

- **WHEN** as alterações forem concluídas
- **THEN** os alertas Dependabot SHALL ser consultados ou reavaliados quando possível
- **AND** alertas corrigidos, não aplicáveis e dispensados SHALL ser documentados
- **AND** alertas acionáveis SHALL NOT permanecer abertos

#### Scenario: Maintenance summary

- **WHEN** a manutenção for finalizada
- **THEN** o resumo SHALL informar versões principais anteriores e novas
- **AND** SHALL informar comandos executados e resultados
- **AND** SHALL registrar evidências de que CVEs acionáveis não permaneceram abertas
- **AND** SHALL registrar dependências que foram removidas, substituídas ou atualizadas para eliminar alertas
