## Implementation Notes

### Dependabot baseline

Open Dependabot alerts queried on 2026-08-03 for `MarcMunhoz/vuetify_todo`:

| Alert | Severity | Package | Vulnerable | Patched | Manifest | Relationship |
| --- | --- | --- | --- | --- | --- | --- |
| 143 | medium | `webpack-dev-server` | `<= 5.2.5` | `5.2.6` | `app/yarn.lock` | transitive |
| 142 | medium | `webpack-dev-server` | `<= 5.2.5` | `5.2.6` | `app/yarn.lock` | transitive |
| 138 | medium | `http-proxy-middleware` | `>= 0.16.0, < 2.0.10` | `2.0.10` | `app/yarn.lock` | transitive |
| 134 | medium | `webpack-dev-server` | `< 5.2.5` | `5.2.5` | `app/yarn.lock` | transitive |
| 124 | medium | `webpack-dev-server` | `<= 5.2.3` | `5.2.4` | `app/yarn.lock` | transitive |
| 88 | high | `vuetify` | `>= 2.2.0-beta.2, < 3.0.0-alpha.10` | `3.0.0-alpha.10` | `app/yarn.lock` | direct |
| 87 | medium | `vuetify` | `>= 2.0.0, < 3.0.0` | `3.0.0` | `app/yarn.lock` | direct |
| 80 | medium | `webpack-dev-server` | `<= 5.2.0` | `5.2.1` | `app/yarn.lock` | transitive |
| 79 | medium | `webpack-dev-server` | `<= 5.2.0` | `5.2.1` | `app/yarn.lock` | transitive |
| 78 | low | `vue` | `>= 2.0.0-alpha.1, < 3.0.0-alpha.0` | `3.0.0-alpha.0` | `app/yarn.lock` | direct |
| 77 | medium | `vue-template-compiler` | `>= 2.0.0, < 3.0.0` | none | `app/yarn.lock` | direct |

### Migration summary

- Vue migrated from `2.7.16` to `3.5.40`.
- Vuetify migrated from `2.7.2` to `3.13.0`.
- Vue Router migrated from `3.6.5` to `4.6.4`.
- Vue CLI/Webpack build chain replaced with Vite `8.2.0`.
- `vuedraggable` migrated from `2.24.3` to `4.1.0`.
- Removed active dependency paths for `vue-template-compiler`, Vue CLI packages, `webpack-dev-server`, and `http-proxy-middleware`.

### Validation evidence

All package manager, build, audit, and runtime validation commands were executed inside Docker/Docker Compose.

| Command | Result |
| --- | --- |
| `rtk docker compose run --rm --entrypoint yarn app install` | lockfile regenerated successfully |
| `rtk docker compose run --rm --entrypoint yarn app test` | 1 test file, 3 tests passed |
| `rtk docker compose run --rm --entrypoint yarn app build` | Vite production build succeeded |
| `rtk docker compose run --rm --entrypoint yarn app list --pattern "vue|vue-template-compiler|vuetify|webpack-dev-server|brace-expansion|http-proxy-middleware|sortablejs|vuedraggable"` | active tree contains Vue 3, Vuetify 3, Vite plugin, vue-router 4, vuedraggable 4; no Vue CLI, `vue-template-compiler`, `webpack-dev-server`, or `http-proxy-middleware` entries |
| `rtk docker compose run --rm --entrypoint yarn app audit --level low` | `0 vulnerabilities found`; 117 packages audited |
| `rtk docker compose build app` | image build succeeded |
| `rtk docker compose up -d app` | container started |
| `rtk curl -I http://localhost:8080` | HTTP 200 |
| `rtk docker compose exec app wget -qO- http://127.0.0.1:5173` | Vite HTML served inside container |
| `rtk openspec validate migrate-to-vue3-vuetify3-vite --strict` | change is valid |

The final Dependabot query still reports the same 11 alerts against the remote branch until these local lockfile changes are pushed and scanned. The local dependency graph no longer contains the vulnerable paths for the actionable alerts above, and the full Yarn audit reports zero vulnerabilities.
