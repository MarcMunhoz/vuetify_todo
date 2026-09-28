## Why

The repository has partially adopted RTK and OpenSpec, but its project context is still generic and its workflows remain in the legacy `.codex/skills/` layout. Standardizing the repository-native agent workflow now removes competing sources of guidance and ensures specifications are synchronized before completed changes are archived.

## What Changes

- Keep concise root agent guidance with the repository-local RTK entry point and document the supported OpenSpec lifecycle.
- Replace the placeholder OpenSpec configuration with verified project context and artifact-specific rules.
- Move the propose, explore, apply, sync, and archive workflows from `.codex/skills/` to `.agents/skills/` without duplicate copies.
- Require delta specification synchronization before archive operations and remove the archive-without-sync path.
- Preserve existing main specifications and archived change history.
- Verify that all repository artifacts use repository-relative, non-sensitive references.

## Capabilities

### New Capabilities

- `agent-workflow`: Defines repository-local agent guidance, RTK command usage, OpenSpec workflow discovery, and mandatory specification synchronization before archival.

### Modified Capabilities

- None.

## Impact

- Affects root agent documentation, repository-local skills, OpenSpec configuration, and the new `agent-workflow` specification.
- Removes obsolete repository-local workflow copies under `.codex/skills/` after migration.
- Does not change files under `app/`, package manifests, the lockfile, runtime dependencies, or application behavior.
