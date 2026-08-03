## Context

The application is a small Vue 2/Vuetify 2 todo app under `app/`, currently built with Vue CLI and Webpack. The remaining Dependabot alerts are concentrated in the legacy stack: Vue 2, `vue-template-compiler`, Vuetify 2, Vue CLI/Webpack transitive dependencies, and Vue 2-compatible drag-and-drop tooling.

The app has a narrow functional surface:

- `app/src/main.js` bootstraps Vue 2, router, and Vuetify.
- `app/src/router/index.js` uses vue-router 3.
- `app/src/plugins/vuetify.js` installs Vuetify 2.
- `app/src/components/Navigation.vue` owns app shell navigation, drawer, app bar, and username dialog.
- `app/src/views/Todo.vue` owns task behavior, dialogs, date picker, drag-and-drop sorting, snackbar feedback, and localStorage persistence.
- `app/src/views/About.vue` owns static project/about links.

This change must migrate the stack and finish with no known actionable Dependabot CVEs open for the application dependency graph. Residual CVEs are not an acceptable end state. If an alert cannot be resolved through dependency changes, the implementation must prove it is not applicable to the shipped project or explicitly close/dismiss it with evidence.

## Goals / Non-Goals

**Goals:**

- Migrate the app to Vue 3, Vuetify 3, Vite, and vue-router 4.
- Remove Vue CLI, Webpack dev server, `vue-template-compiler`, and other Vue 2-only dependencies from the active dependency graph.
- Replace or upgrade drag-and-drop support with a Vue 3-compatible path.
- Preserve current todo behavior and localStorage data semantics.
- Keep commands containerized according to repository rules.
- Use specialist subagents during implementation to reduce context size and isolate workstreams.
- Validate that Dependabot has no remaining actionable open CVEs for the migrated dependency graph.

**Non-Goals:**

- Redesign the product experience beyond changes required by Vuetify 3 component APIs.
- Add backend storage, authentication, collaboration, or cloud sync.
- Replace localStorage with another persistence model.
- Convert the whole app to Composition API unless required by a dependency.
- Add broad new tooling unrelated to migration, security validation, or regression coverage.

## Decisions

### Decision: Use Vite as the new build tool

Vite replaces Vue CLI/Webpack because it is the current standard Vue 3 build path and removes the vulnerable Webpack dev server chain from the project. Keeping Vue CLI would preserve the dependency family responsible for several current alerts.

Alternatives considered:

- Keep Vue CLI and only upgrade Vue/Vuetify: rejected because it leaves legacy build dependencies in the graph.
- Switch to another framework: rejected because the app is already Vue/Vuetify and the migration objective is security remediation, not product rewrite.

### Decision: Preserve Options API first

The initial migration should keep component state and methods in Options API where practical. Vue 3 supports Options API, and the current app is small enough that preserving structure reduces behavioral risk.

Alternatives considered:

- Convert to Composition API during migration: useful later, but it mixes framework migration with refactoring and increases review surface.
- Rewrite components from scratch: unnecessary for this app and more likely to change behavior accidentally.

### Decision: Treat zero actionable CVEs as an exit gate

The migration is not complete while Dependabot reports actionable open alerts for dependencies used by the app. Any remaining alert must be either fixed, made irrelevant by removing the dependency path, or explicitly dismissed/closed with evidence that it is not applicable.

Alternatives considered:

- Document residual CVEs only: rejected because the user explicitly requires not leaving CVEs loose after this change.
- Ignore development-only CVEs: rejected because the current alerts include build-chain dependencies that still affect maintainability, CI, and deployment workflows.

### Decision: Split implementation across specialist subagents

Implementation should be divided into independent specialist workstreams:

- **Dependency/security agent**: dependency graph, Dependabot alerts, audit output, package removals, lockfile verification.
- **Build/platform agent**: Vite setup, Docker, Makefile, Netlify, containerized commands.
- **Vue/Vuetify migration agent**: `main.js`, Vuetify plugin, router, component API changes.
- **Todo behavior agent**: task workflows, drag-and-drop, dates, dialogs, snackbar, localStorage compatibility.
- **Validation/documentation agent**: regression checks, evidence summary, OpenSpec result notes.

Subagents must not edit the same files concurrently without coordination. Work should be merged through focused patches and verified at integration points.

## Risks / Trade-offs

- Vuetify 3 component APIs differ from Vuetify 2 -> Mitigation: migrate one component surface at a time and verify rendered behavior after each integration.
- Drag-and-drop support may require package replacement -> Mitigation: evaluate Vue 3-compatible `vuedraggable` or SortableJS integration before rewriting task behavior.
- localStorage data may contain old task objects -> Mitigation: preserve field names (`id`, `title`, `dueDate`, `expired`, `done`, `modal`) or add a minimal compatibility normalizer.
- Dependabot may lag after push/merge -> Mitigation: validate locally with dependency inspection/audit and re-check GitHub alerts after the dependency graph is available on the branch.
- Specialist subagents can produce overlapping edits -> Mitigation: assign clear file ownership and centralize final integration in the main agent.

## Migration Plan

1. Establish a baseline of open Dependabot alerts and current package paths.
2. Assign specialist subagents to independent discovery and implementation areas.
3. Replace Vue CLI/Webpack scripts and dependencies with Vite equivalents.
4. Migrate Vue bootstrap, router setup, and Vuetify setup.
5. Migrate UI components while preserving behavior.
6. Replace or upgrade drag-and-drop support.
7. Regenerate the lockfile inside the container.
8. Build and run the migrated app inside Docker.
9. Validate todo workflows, persistence, and navigation.
10. Re-check Dependabot/audit results and resolve every actionable remaining CVE.

Rollback is a normal Git revert of the migration branch before merge. After merge, rollback should restore the previous release tag/deployment if production validation fails.

## Open Questions

- Which Vue 3-compatible drag-and-drop package should be selected after dependency/security evaluation?
- Should the migrated app keep Yarn 1 for minimal process change, or move to another package manager in a separate future change?
- Should automated browser regression tests be added if no existing test command exists, or should validation remain manual/build-based for this migration?
