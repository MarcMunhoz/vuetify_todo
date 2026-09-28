## 1. Consolidate Repository Guidance

- [x] 1.1 Review `AGENTS.md`, `RTK.md`, and `.agents/commit-rules.md` against the governing instructions and retain only repository-specific guidance in the authoritative root entry points.
- [x] 1.2 Update `RTK.md` with container-aware package-manager examples and document the `propose → apply → sync → archive` lifecycle without duplicating global policy.
- [x] 1.3 Remove obsolete loose rule files after verifying that no applicable repository-specific instruction is lost.

## 2. Configure Project-Aware OpenSpec

- [x] 2.1 Replace placeholder content in `openspec/config.yaml` with the verified Vue 3, Vuetify 3, Vite, Node.js 22, Yarn 1, and Docker Compose project context.
- [x] 2.2 Add artifact rules for focused proposals, testable specifications, container-only validation tasks, mandatory sync before archive, and repository-relative sanitized references.

## 3. Migrate Repository-Native Workflows

- [x] 3.1 Move the propose, explore, apply, sync, and archive skills from `.codex/skills/` to `.agents/skills/` while preserving their functional content.
- [x] 3.2 Update the archive skill to synchronize every delta spec before archival and remove every archive-without-sync path.
- [x] 3.3 Remove the remaining obsolete `.codex/skills/` directories and verify that exactly the five supported workflows remain under `.agents/skills/`.

## 4. Verify the Migration

- [x] 4.1 Validate the change and all main OpenSpec specifications in strict mode.
- [x] 4.2 Verify that existing main specifications and archived changes remain unchanged and that no application, manifest, lockfile, dependency, or runtime file is modified.
- [x] 4.3 Scan changed artifacts for absolute local paths, usernames, hostnames, temporary directories, private URLs, credentials, keys, and other machine-specific or sensitive information.
- [x] 4.4 Run Git whitespace validation and record the verification evidence for review.
