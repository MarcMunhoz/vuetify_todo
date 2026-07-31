# Vuetify Todo

![Vue](https://img.shields.io/badge/Vue-2.6.11-42b883?logo=vuedotjs&logoColor=white)
![Vuetify](https://img.shields.io/badge/Vuetify-2.4.0-1867c0?logo=vuetify&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22-5fa04e?logo=nodedotjs&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-1.22.22-2c8ebb?logo=yarn&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ed?logo=docker&logoColor=white)

Aplicação de tarefas simples feita com Vue 2, Vuetify e Docker. O app permite criar, editar, concluir, excluir e reordenar tarefas, além de definir datas de vencimento e persistir os dados no `localStorage` do navegador.

## Recursos

- Criação e edição de tarefas.
- Marcação de tarefas concluídas.
- Definição de data de vencimento.
- Alerta visual para tarefas vencidas.
- Reordenação por arrastar e soltar com `vuedraggable`.
- Persistência local no navegador.
- Execução isolada com Docker Compose.

## Stack

- Vue `2.6.11`
- Vuetify `2.4.0`
- Vue Router `3`
- Vuex `3`
- Vue CLI `5`
- Node.js `22`
- Yarn `1.22`
- Docker e Docker Compose

## Requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Como executar

Suba o container de desenvolvimento:

```bash
docker compose up -d
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
docker compose down
```

## Build de produção

Os comandos do projeto devem ser executados dentro do container:

```bash
docker compose exec app yarn build
```

O build gerado pelo Vue CLI fica em `app/dist/`.

## Estrutura

```text
.
|-- app/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- plugins/
|   |   |-- router/
|   |   `-- views/
|   |-- package.json
|   `-- yarn.lock
|-- Dockerfile
`-- docker-compose.yaml
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `yarn serve` | Inicia o servidor de desenvolvimento do Vue CLI. |
| `yarn build` | Gera o build de produção. |

Execute esses scripts pelo container, por exemplo:

```bash
docker compose exec app yarn serve
```

## Validação

O projeto não declara scripts de lint, typecheck ou testes automatizados em `app/package.json`. Para validar alterações, use os comandos existentes:

```bash
docker compose exec app yarn build
```

Quando aplicável, também valide manualmente o fluxo principal no navegador: criar tarefa, editar, marcar como concluída, definir vencimento, reordenar e excluir.

## Configuração

A configuração padrão do Vue CLI pode ser ajustada em `app/vue.config.js`.

Referência: [Vue CLI Configuration](https://cli.vuejs.org/config/).
