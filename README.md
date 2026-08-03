# Vuetify Todo

![Version](https://img.shields.io/badge/version-0.2.0-111827)
![Vue](https://img.shields.io/badge/Vue-3.5.40-42b883?logo=vuedotjs&logoColor=white)
![Vuetify](https://img.shields.io/badge/Vuetify-3.13.0-1867c0?logo=vuetify&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.2.0-646cff?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22-5fa04e?logo=nodedotjs&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-1.22.22-2c8ebb?logo=yarn&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ed?logo=docker&logoColor=white)

Aplicação de tarefas simples feita com Vue 3, Vuetify 3, Vite e Docker. O app permite criar, editar, concluir, excluir e reordenar tarefas, além de definir datas de vencimento e persistir os dados no `localStorage` do navegador.

## Destaques

- Stack atualizada para Vue 3, Vuetify 3, Vite e Vue Router 4.
- Fluxo de desenvolvimento e validação executado por Docker Compose.
- Persistência compatível com as chaves existentes `localStorage.tasks` e `localStorage.tasksUser`.
- Dependências legadas de Vue 2, Vue CLI e Webpack removidas da árvore ativa.

## Recursos

- Criação e edição de tarefas.
- Marcação de tarefas concluídas.
- Definição de data de vencimento.
- Alerta visual para tarefas vencidas.
- Reordenação por arrastar e soltar com `vuedraggable`.
- Persistência local no navegador.
- Execução isolada com Docker Compose.

## Stack

- Vue `3.5.40`
- Vuetify `3.13.0`
- Vue Router `4`
- Vite `8.2.0`
- Node.js `22`
- Yarn `1.22`
- Docker e Docker Compose

## Requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Como executar

Suba o container de desenvolvimento:

```bash
make dev
```

Acesse a aplicação em:

```text
http://localhost:8080
```

Para acompanhar os logs:

```bash
docker compose logs -f app
```

Para parar o ambiente:

```bash
make down
```

## Build de produção

Os comandos do projeto devem ser executados dentro do container:

```bash
docker compose exec app yarn build
```

O build gerado pelo Vite fica em `app/dist/`.

## Estrutura

```text
.
|-- app/
|   |-- index.html
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- plugins/
|   |   |-- router/
|   |   `-- views/
|   |-- package.json
|   |-- vite.config.mjs
|   `-- yarn.lock
|-- Dockerfile
`-- docker-compose.yaml
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `yarn serve` | Inicia o servidor de desenvolvimento do Vite. |
| `yarn dev` | Alias para o servidor de desenvolvimento do Vite. |
| `yarn build` | Gera o build de produção. |
| `yarn test` | Executa os testes automatizados com Vitest. |

Execute esses scripts pelo container, por exemplo:

```bash
docker compose exec app yarn serve
```

Também há atalhos no `Makefile`:

| Comando | Descrição |
| --- | --- |
| `make dev` | Sobe o container de desenvolvimento. |
| `make build` | Executa `yarn build` dentro do container. |
| `make test` | Executa `yarn test` dentro do container. |
| `make audit` | Executa `yarn audit` dentro do container. |
| `make down` | Remove container, volumes e imagem local do app. |

## Validação

Para validar alterações, use os comandos pelo container:

```bash
make test
make build
make audit
```

Quando aplicável, também valide manualmente o fluxo principal no navegador: criar tarefa, editar, marcar como concluída, definir vencimento, reordenar e excluir.

## Configuração

A configuração do Vite pode ser ajustada em `app/vite.config.mjs`.

Referência: [Vite Configuration](https://vite.dev/config/).
