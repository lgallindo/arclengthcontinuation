<!-- MARKER_BEGIN -->
marker_id: mrk_project_rules
scope: file
target: PROJECT_RULES.md
classification_state: internal (sausage making)
marked_at: 2026-07-08T19:46:10Z
updated_at: 2026-07-08T19:46:10Z
performer_id: codex_agent
rationale: Recovered project rules after accidental split.
notes: Recovered from fossil split path.
<!-- MARKER_END -->

# Project Rules

## Scope and Domain
- The current repository (`/home/lugatj/code/research/continue`) contains a VS Code Extension, a CLI, and a JetBrains plugin.
- **Current Objective**: We will work **exclusively on the VS Code Extension** for now.

## Repository Governance
- Standard rules defined in `AGENTS.md` apply.
- (Placeholder for valid commit types and scopes once scanned)

## Build Instructions
- To compile the VS Code extension, a root-level dependency install pass is strictly required before building the sub-packages, as local packages (e.g., `core`) rely on file links.
- Run `npm install` (or your preferred compatible package manager) in the repository root `/home/lugatj/code/research/continue`.
- Then, navigate to `extensions/vscode` and run the build script (e.g., `npm run esbuild`).

## Governance Recovery Index
- 2026-07-08T19:46:10Z | Added recovered `PROJECT_RULES.md` from fossil split reference.
- 2026-07-08T19:46:10Z | Added `SESSION_HANDOFF.md` for append-only operational indexing.
- 2026-07-08T19:46:10Z | Added `.codex-internal/INCONSISTENCY_REPORT_20260708T194610Z.md` and indexed in `.codex-internal/INDEX.md`.
- 2026-07-08T19:46:10Z | Added `.codex-internal/GOVERNANCE_RECOVERY_STATUS_20260708T194610Z.md` with updated GAP/OBS tables and AGENTS version diffs.
- 2026-07-08T19:46:10Z | Added `.codex-internal/BANNER_AGENT_LOG_20260708T194610Z.md` for structured multi-agent proposal/audit trace and generation fallback.
