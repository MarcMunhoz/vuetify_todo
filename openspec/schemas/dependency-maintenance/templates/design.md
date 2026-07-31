## Context

<!--
Descreva o contexto técnico identificado no projeto antes das alterações.

Inclua, quando aplicável:

- linguagem e runtime;
- versão atual do runtime;
- gerenciador de pacotes;
- arquivo de lock;
- uso de Docker, Docker Compose ou outro ambiente containerizado;
- imagem base utilizada;
- comandos existentes para instalação, execução, build e validação;
- dependências críticas;
- versões desatualizadas;
- alertas do Dependabot;
- vulnerabilidades encontradas pela auditoria local;
- limitações técnicas ou de infraestrutura.

Não presuma que lint, typecheck ou testes automatizados estejam disponíveis.
-->

## Goals / Non-Goals

**Goals:**

<!--
Liste objetivos concretos, como:

- atualizar o runtime e o gerenciador de pacotes quando aplicável;
- atualizar dependências diretas e transitivas ao máximo tecnicamente possível;
- avaliar e aplicar atualizações major viáveis;
- corrigir CVEs reportadas pelo Dependabot;
- corrigir vulnerabilidades adicionais encontradas localmente;
- preservar o comportamento existente da aplicação;
- validar a aplicação usando os mecanismos disponíveis;
- documentar dependências ou vulnerabilidades que não possam ser resolvidas.
-->

**Non-Goals:**

<!--
Liste explicitamente o que não faz parte desta manutenção, como:

- adicionar funcionalidades não relacionadas;
- alterar layout ou comportamento sem necessidade;
- reestruturar a arquitetura sem relação com as atualizações;
- instalar ferramentas de lint ou testes inexistentes sem autorização;
- forçar instalações ignorando incompatibilidades;
- ocultar vulnerabilidades sem analisar sua exposição;
- afirmar funcionamento total sem evidências suficientes.
-->

## Decisions

### 1. Estratégia de inspeção inicial

<!--
Defina como será estabelecido o baseline do projeto.

Considere:

- identificação do runtime e gerenciador;
- inspeção dos manifestos e arquivos de lock;
- identificação da containerização;
- inventário das dependências;
- auditoria inicial;
- execução inicial dos mecanismos de validação existentes;
- registro de falhas preexistentes.
-->

**Alternatives considered:**

- Atualizar diretamente sem baseline: rejeitada porque impediria diferenciar problemas preexistentes de regressões introduzidas pela manutenção.

### 2. Estratégia de atualização do ambiente

<!--
Defina se será necessário atualizar:

- imagem base;
- runtime;
- gerenciador de pacotes;
- configurações de container;
- arquivos de CI/CD.

Quando o projeto estiver containerizado, os comandos relacionados ao runtime,
instalação, auditoria, build e testes devem ser executados no ambiente
apropriado do projeto.
-->

**Alternatives considered:**

- Atualizar dependências sem avaliar o runtime: rejeitada quando versões mais recentes dos pacotes exigirem um ambiente mais atual.
- Atualizar o runtime além do suportado pela imagem base: rejeitada por incompatibilidade ambiental.

### 3. Estratégia de atualização das dependências

<!--
Defina a ordem de atualização.

Uma estratégia possível é:

1. runtime e imagem base, quando necessário;
2. gerenciador de pacotes;
3. ferramentas de build;
4. dependências diretas;
5. dependências transitivas;
6. adaptações por breaking changes;
7. regeneração consistente do arquivo de lock.

Explique se as atualizações serão aplicadas individualmente ou em grupos
controlados e como regressões serão isoladas.
-->

**Alternatives considered:**

- Atualizar todos os pacotes de uma única vez: rejeitada quando dificultar a identificação da origem de regressões.
- Limitar todas as atualizações às versões minor e patch: rejeitada porque o objetivo inclui atualizações major tecnicamente viáveis.

### 4. Tratamento de breaking changes

<!--
Descreva como serão analisadas atualizações major e alterações incompatíveis.

Considere:

- changelogs e guias de migração;
- APIs removidas ou alteradas;
- mudanças de configuração;
- alterações em scripts;
- requisitos mínimos de runtime;
- adaptações necessárias no código;
- impacto nos fluxos existentes.
-->

**Alternatives considered:**

- Evitar automaticamente qualquer atualização major: rejeitada porque pode manter dependências obsoletas ou vulneráveis.
- Aplicar a atualização major sem migração: rejeitada porque pode comprometer o funcionamento da aplicação.

### 5. Tratamento de dependências transitivas

<!--
Defina como vulnerabilidades ou versões obsoletas em dependências transitivas
serão tratadas.

Priorize:

1. atualização da dependência direta responsável;
2. substituição da dependência direta, quando necessário;
3. uso de overrides, resolutions ou mecanismo equivalente somente quando
   tecnicamente justificado.

Registre possíveis riscos de forçar versões transitivas incompatíveis.
-->

**Alternatives considered:**

- Ignorar dependências transitivas: rejeitada porque elas podem conter vulnerabilidades aplicáveis.
- Aplicar overrides indiscriminadamente: rejeitada porque pode introduzir incompatibilidades silenciosas.

### 6. Estratégia de correção das vulnerabilidades

<!--
Descreva como serão correlacionados:

- alertas do Dependabot;
- advisories e CVEs fornecidas;
- resultados da auditoria local;
- árvore real de dependências;
- dependências de produção e desenvolvimento;
- exposição efetiva da aplicação.

Cada vulnerabilidade deve ser classificada como:

- corrigida;
- não aplicável;
- mitigada;
- pendente por limitação técnica.

Para vulnerabilidades não corrigidas, registre severidade, exposição,
justificativa e recomendação futura.
-->

**Alternatives considered:**

- Considerar apenas o Dependabot: rejeitada porque a auditoria local pode identificar vulnerabilidades adicionais.
- Considerar apenas a contagem da auditoria: rejeitada porque é necessário analisar a árvore e a exposição real.

### 7. Estratégia de validação

<!--
Defina a validação com base no que realmente existe no projeto.

Considere, quando disponíveis:

- instalação limpa;
- inicialização da aplicação;
- build de produção;
- lint;
- verificação de tipos;
- testes unitários;
- testes de integração;
- testes E2E;
- validação funcional dos fluxos críticos;
- inspeção de logs e erros de runtime.

Não proponha instalar novas ferramentas apenas para esta manutenção sem
autorização explícita.
-->

**Alternatives considered:**

- Exigir uma suíte padrão de validação para todos os projetos: rejeitada porque projetos antigos podem não possuir lint, typecheck ou testes.
- Considerar apenas a instalação bem-sucedida: rejeitada porque isso não comprova o funcionamento da aplicação.

### 8. Validação sem testes automatizados

<!--
Quando não houver testes automatizados suficientes, descreva:

- como a aplicação será inicializada;
- quais fluxos críticos serão verificados;
- quais páginas, comandos, endpoints ou funcionalidades serão exercitados;
- quais limitações impedem uma validação mais completa;
- quais evidências serão registradas.

Não afirme que o funcionamento total foi garantido quando a execução completa
não for possível.
-->

**Alternatives considered:**

- Não validar por ausência de testes: rejeitada porque ainda é necessário realizar a melhor verificação funcional possível.
- Instalar automaticamente uma nova ferramenta de testes: rejeitada por ampliar o escopo sem autorização.

### 9. Estratégia de reversão

<!--
Descreva como reverter as alterações caso ocorram regressões.

Considere:

- restauração dos manifestos;
- restauração do arquivo de lock;
- restauração da imagem base;
- reversão das adaptações de código;
- retorno às versões anteriores;
- separação das atualizações em commits ou grupos recuperáveis.
-->

**Alternatives considered:**

- Manter apenas o estado final sem estratégia de reversão: rejeitada porque atualizações de dependências podem introduzir regressões difíceis de isolar.

## Risks / Trade-offs

<!--
Liste riscos concretos e suas mitigações.

Exemplos:

- breaking changes em atualizações major;
- incompatibilidade com runtime antigo;
- dependências abandonadas;
- alterações inesperadas em dependências transitivas;
- conflitos de peer dependencies;
- diferenças entre ambiente local e produção;
- lockfile inconsistente;
- ausência de testes automatizados;
- falhas preexistentes no projeto;
- auditoria com falsos positivos ou vulnerabilidades sem correção disponível;
- atualização parcial deixando riscos residuais;
- limitações de execução por serviços externos.

Para cada risco relevante, indique:

- impacto;
- probabilidade;
- estratégia de mitigação;
- evidência necessária para aceitar o risco residual.
-->
