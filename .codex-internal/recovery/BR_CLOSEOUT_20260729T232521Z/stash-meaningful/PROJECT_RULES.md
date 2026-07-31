<!-- MARKER_BEGIN -->
marker_id: mrk_project_rules
scope: file
target: PROJECT_RULES.md
classification_state: internal (sausage making)
marked_at: 2026-07-07T16:50:56Z
updated_at: 2026-07-07T16:50:56Z
performer_id: antigravity_agent
rationale: Internal project rules, not to be shared or tracked by git.
notes: DO NOT add to .gitignore.
<!-- MARKER_END -->

# Project Rules

## Scope and Domain
- The current repository (`/home/lugatj/code/foss/continue`) contains a VS Code Extension, a CLI, and a JetBrains plugin.
- **Current Objective**: We will work **exclusively on the VS Code Extension** for now.

## Repository Governance
- Standard rules defined in `AGENTS.md` apply.
- **PUSH GATE (2026-07-12):** Do **not** `git push` until full **rebranding** and **relicensing** (GPL/AGPL boundary + SPDX audit) are complete. Local commits OK; track governance files via marker registry.
- Governance files pending rebrand (untracked or internal): `AGENTS.md`, `AGENT_COORDINATION.md`, `PROJECT_RULES.md`, `SESSION_HANDOFF.md`, `marker_registry.json`, `scripts/marker.py`, `scripts/marker_schema.json`, `scripts/rebrand.py`, `docs/plans/`, `docs/research/`.
- (Placeholder for valid commit types and scopes once scanned)

## Build Instructions
- To compile the VS Code extension, a root-level dependency install pass is strictly required before building the sub-packages, as local packages (e.g., `core`) rely on file links.
- Prefer **bun** or **pnpm** over npm:
  - Root: `bun install` (preferred; `bun.lock` present) or `pnpm install`
  - Avoid `npm install` unless a sub-package lacks bun/pnpm lock support
- Then, navigate to `extensions/vscode` and run the build script: `bun run esbuild` or `pnpm run esbuild`
