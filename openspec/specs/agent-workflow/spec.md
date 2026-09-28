## Purpose

Defines how repository-local agents discover project guidance and execute the RTK and OpenSpec lifecycle consistently without exposing environment-specific data.

## Requirements

### Requirement: Root agent guidance
The repository SHALL provide a concise root `AGENTS.md` that references the repository-local RTK guidance without duplicating global or obsolete rules.

#### Scenario: Agent starts repository work
- **WHEN** an agent discovers instructions from the repository root
- **THEN** it can identify the RTK guidance and the authoritative repository-local workflow entry points

### Requirement: RTK command guidance
The repository SHALL document RTK as the required prefix for shell commands and SHALL keep package-manager examples compatible with container-only execution.

#### Scenario: Agent prepares a shell command
- **WHEN** an agent reads the repository-local RTK guidance
- **THEN** it is instructed to prefix the command with `rtk`
- **AND** package-manager execution examples run in the application container

### Requirement: Repository-native OpenSpec skills
The repository SHALL expose exactly the propose, explore, apply, sync, and archive OpenSpec workflows under `.agents/skills/` without duplicate repository-local copies under `.codex/skills/`.

#### Scenario: Agent discovers available OpenSpec workflows
- **WHEN** an agent inspects the repository-native skill directory
- **THEN** all five supported OpenSpec workflows are available under `.agents/skills/`
- **AND** no legacy copy competes with those workflows

### Requirement: Project-aware OpenSpec configuration
The OpenSpec configuration SHALL describe the verified application stack, container execution constraint, repository conventions, and artifact-specific guidance without machine-specific values.

#### Scenario: Agent requests OpenSpec artifact instructions
- **WHEN** OpenSpec supplies project context for an artifact
- **THEN** the context reflects the current Vue, Vuetify, Vite, Node.js, Yarn, and Docker-based project
- **AND** all referenced repository locations are relative and non-sensitive

### Requirement: Ordered change lifecycle
The documented workflow SHALL follow `propose → apply → sync → archive`, and a change with delta specifications MUST synchronize them before archival.

#### Scenario: Completed change has delta specifications
- **WHEN** an agent starts the archive workflow for a completed change
- **THEN** it synchronizes all delta specifications into the main specifications before moving the change to the archive
- **AND** it does not offer an archive-without-sync path

#### Scenario: Completed change has no delta specifications
- **WHEN** an agent starts the archive workflow for a completed change without delta specifications
- **THEN** it records that synchronization is not applicable and continues with archival

### Requirement: Existing OpenSpec history preservation
The migration SHALL preserve existing main specifications and archived change artifacts.

#### Scenario: Workflow layout is migrated
- **WHEN** repository-local skills and guidance are reorganized
- **THEN** existing files under `openspec/specs/` and `openspec/changes/archive/` remain semantically unchanged

