# RTK - Rust Token Killer (Codex CLI)

**Usage**: Token-optimized CLI proxy for shell commands.

## Rule

Always prefix shell commands with `rtk`.

Examples:

```bash
rtk git status
rtk git diff --check
rtk openspec list --json
```

## Container Commands

Run package-manager commands only inside the application container:

```bash
rtk docker compose exec app yarn test
rtk docker compose exec app yarn build
rtk docker compose exec app yarn audit
```

Never install dependencies or run Yarn directly on the host.

## OpenSpec Lifecycle

Use the repository-native workflows in this order:

```text
propose → apply → sync → archive
```

When a change contains delta specifications, synchronize them with the main specifications before archiving. Never archive first or skip synchronization.

## Meta Commands

```bash
rtk gain            # Token savings analytics
rtk gain --history  # Recent command savings history
rtk proxy <cmd>     # Run raw command without filtering
```

## Verification

```bash
rtk --version
rtk gain
rtk which rtk
```
