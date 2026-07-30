---
trigger: always_on
---

## Regras obrigatórias
- Quando necessário, rodar build ou scripts de package manager APENAS no contexto do container, não no host.
- Ao solicitar commit, usar padrão GitHub com mensagem em português e acentuação correta.
- No título do commit, usar verbo no presente do indicativo, iniciar com letra maiúscula e concordar com o escopo da alteração.
- Preferir títulos no formato `tipo(escopo): Ajusta ...`, `Adiciona ...`, `Corrige ...`, `Remove ...`, `Atualiza ...`.
- Não usar imperativo no título, como `Ajuste ...`, `Adicione ...`, `Corrija ...`.
- Na descrição do commit, não inserir linha em branco entre os itens.
- O título do commit deve ficar apenas na primeira linha, sem descrição anexada.
- A descrição deve ficar no corpo do commit, usando `-m` separado para não grudar ao título.
- Formato obrigatório da mensagem de commit:
  `tipo(escopo): Mensagem resumida`
  `- Descrição explicativa 01`
  `- Descrição explicativa 02`
- Tipos permitidos de commit:
  `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
