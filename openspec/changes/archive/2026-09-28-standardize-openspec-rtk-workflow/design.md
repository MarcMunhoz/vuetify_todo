## Context

See `proposal.md` for motivation. The repository already has root `AGENTS.md` and `RTK.md`, two main specifications, archived OpenSpec history, a generic `spec-driven` configuration, one loose rule file under `.agents/`, and eight generated workflows under `.codex/skills/`. The target layout demonstrated by the related tooling changes uses five repository-native workflows under `.agents/skills/` and requires sync before archive.

The application uses Vue 3, Vuetify 3, Vite, Node.js 22, Yarn 1, and Docker Compose. Package-manager scripts may run only inside the application container. No application or dependency change is needed.

## Goals / Non-Goals

**Goals:**

- Establish one authoritative root entry point and one repository-native skill layout.
- Make OpenSpec artifact generation aware of the verified project context.
- Encode synchronization as a mandatory precondition for archiving delta specs.
- Preserve existing specifications and archive history while adding an `agent-workflow` contract.
- Keep all new content repository-relative and free of sensitive or machine-specific data.

**Non-Goals:**

- Change application behavior, source files, dependencies, manifests, or the lockfile.
- Introduce additional OpenSpec workflows beyond the five named by the issue.
- Rewrite historical OpenSpec artifacts or application specifications.
- Install, upgrade, or pin the OpenSpec or RTK executables.

## Decisions

### Use `.agents/skills/` as the only repository-local workflow directory

Move the existing propose, explore, apply, sync, and archive skill directories without rewriting their generated content except where archive semantics must change. Remove all repository-local `.codex/skills/` directories, including workflows outside the issue's supported set, so discovery has no competing source.

Keeping both layouts was rejected because duplicate skills can drift and produce ambiguous agent behavior. Retaining the extra generated workflows was rejected because the issue explicitly defines a five-workflow lifecycle.

### Reduce root guidance to repository-owned entry points

Keep `AGENTS.md` concise and reference `@RTK.md`. Remove the loose `.agents/commit-rules.md` file after confirming its relevant behavior is already supplied by the governing agent instructions; do not copy global behavioral policy into project memory.

Preserving the loose rule structure was rejected because related repositories treat root guidance as authoritative and the completion criteria prohibit obsolete alternative rule structures.

### Put durable project context in `openspec/config.yaml`

Replace placeholder comments with verified stack, container, scope, validation, language, and sanitization guidance. Add artifact rules that keep proposals scoped, require testable specs, and keep tasks explicit about container-only validation and sync before archive.

Embedding this context in each skill was rejected because it would duplicate project facts across workflows and increase drift.

### Enforce sync inside the archive workflow

For changes with delta specs, the archive skill will invoke the sync workflow and verify the result before moving the change. It will not present an archive-without-sync option. Changes without delta specs may continue after explicitly recording that sync is not applicable.

A warning-only approach was rejected because it does not satisfy the mandatory lifecycle and can leave main specifications stale.

### Represent the workflow as an OpenSpec capability

Add an `agent-workflow` delta spec so repository guidance, workflow availability, sanitization, and archive ordering become durable, testable requirements. Synchronization during completion will create the corresponding main spec.

Treating the work as `skip_specs` was rejected because this issue changes behavior that future agents and maintainers rely on.

## Risks / Trade-offs

- [Agents configured to discover only `.codex/skills/` may stop seeing repository-local workflows] → Use the current repository-native `.agents/skills/` convention established by the related tooling migrations and verify all five files exist after moving.
- [Removing loose commit guidance could discard a project-specific rule] → Compare it with governing instructions before removal and retain only genuinely project-specific guidance in the root entry point if needed.
- [Archive may synchronize a partially implemented change] → Preserve existing artifact and task completion checks before running mandatory sync.
- [Configuration may become stale as dependencies evolve] → Describe stable stack families and execution constraints, while keeping exact versions only where they are already project invariants.
- [Sanitization checks may miss encoded local references] → Search changed artifacts for absolute paths, usernames, hostnames, temporary directories, private URLs, and credential-like material before completion.

## Migration Plan

1. Update root guidance and replace placeholder OpenSpec configuration with verified project context.
2. Move the five supported skills into `.agents/skills/`, then remove obsolete loose rules and the remaining `.codex/skills/` tree.
3. Modify the archive workflow to make delta-spec synchronization mandatory.
4. Validate workflow discovery, repository-relative references, OpenSpec artifacts, and unchanged application/dependency files.
5. During completion, synchronize the `agent-workflow` delta spec before archiving this change.

Rollback consists of restoring the moved skill directories, root guidance, configuration, and archive workflow from version control. Existing main specifications and archived history require no rollback because they are preserved throughout migration.
