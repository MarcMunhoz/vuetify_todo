## Why

The application still has open Dependabot CVEs after the dependency maintenance release because several remaining advisories are tied to the Vue 2, Vuetify 2, Vue CLI, Webpack, and `vue-template-compiler` stack. This change migrates the application to a supported frontend stack so the project can remove the vulnerable legacy dependency chain instead of carrying residual security debt.

The migration must not leave known open CVEs behind. Completion requires validating the resulting dependency graph against Dependabot or an equivalent audit and addressing every remaining actionable alert.

## What Changes

- **BREAKING**: Replace the Vue 2/Vuetify 2/Vue CLI/Webpack toolchain with Vue 3, Vuetify 3, Vite, and vue-router 4.
- Remove Vue 2-only packages, including `vue-template-compiler` and Vue CLI packages.
- Replace or upgrade drag-and-drop support with a Vue 3-compatible package.
- Preserve the current user-facing todo behavior: add, edit, delete, complete, due date, sorting, localStorage persistence, navigation, and about page links.
- Update Docker, Makefile, and Netlify build configuration as needed for the new stack.
- Update tests and validation commands so the migrated app can be built and checked inside the container.
- Resolve all known Dependabot CVEs produced by the current application dependency graph, without intentionally accepting residual open alerts.

## Capabilities

### New Capabilities

- `frontend-stack-migration`: Covers migration from the legacy Vue 2/Vuetify 2/Vue CLI frontend stack to the supported Vue 3/Vuetify 3/Vite stack while preserving application behavior.

### Modified Capabilities

- `dependency-maintenance`: Adds the requirement that security remediation work must finish with no known actionable Dependabot CVEs left open for the application dependency graph.

## Impact

- Application source under `app/src`, especially `main.js`, router setup, Vuetify plugin setup, and Vuetify-based components.
- Package metadata and lockfile under `app/package.json` and `app/yarn.lock`.
- Build and runtime configuration for Docker, Makefile, and Netlify.
- Dependency security posture tracked by GitHub Dependabot alerts.
- Tests and verification commands used to prove behavior and security remediation.
