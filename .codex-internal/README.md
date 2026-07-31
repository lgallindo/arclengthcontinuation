# Codex Internal Artifacts

<!-- MARKER_BEGIN -->
marker_id: mrk_codex_internal_artifacts
scope: path
target: .codex-internal
classification_state: internal (sausage making), local-only, git-excluded
marked_at: 2026-07-08T17:25:17Z
updated_at: 2026-07-08T17:25:17Z
performer_id: codex-cli
rationale: Repository-local home for recovery indexes, Codex internals summaries, handoff notes, and other artifacts that must not live as root-level scratch files.
notes: This directory is excluded through .git/info/exclude, not .gitignore. Do not commit or publish contents without explicit review.
<!-- MARKER_END -->

## Purpose

This directory is the local-only artifact home for Codex/Antigravity recovery work on `/home/lugatj/code/foss/continue`.

Use it for signed, timestamped, sidecar-documented internal artifacts that would otherwise become scratch files. Do not place new recovery plans, indexes, or ad hoc scripts at the repository root.

## Current Artifacts

| Artifact | Sidecar | Rationale |
| --- | --- | --- |
| `recovery/CODEX_HOME_INDEX_20260708T172517Z.md` | `recovery/CODEX_HOME_INDEX_20260708T172517Z.md.sidecar.json` | Metadata/hash index of `~/.codex`, including session rollouts, generated images, SQLite schema summaries, plugin caches, and risk labels. |
| `recovery/IMAGE_GENERATION_FINDINGS_20260708T172517Z.md` | `recovery/IMAGE_GENERATION_FINDINGS_20260708T172517Z.md.sidecar.json` | Compact image-generation findings and README-banner provenance. |
| `recovery/SESSION_HANDOFF_BACKUP_20260710T144355Z.md` | `recovery/SESSION_HANDOFF_BACKUP_20260710T144355Z.md.sidecar.json` | Repo-local `SESSION_HANDOFF.md` backup at cursor session termination. |
| `recovery/GLOBAL_SESSION_HANDOFF_BACKUP_20260710T144355Z.md` | `recovery/GLOBAL_SESSION_HANDOFF_BACKUP_20260710T144355Z.md.sidecar.json` | Cross-workspace `~/code/SESSION_HANDOFF.md` mirror backup at cursor session termination. |
| `recovery/CALL_LOG_20260729T232700Z_BR_CLOSEOUT.md` | `recovery/CALL_LOG_20260729T232700Z_BR_CLOSEOUT.md.sidecar.json` | Full call log for BR-001..BR-005 lossless closeout; documents historical ad-hoc commands and durable script entrypoints. |
| `recovery/scripts/br_closeout_lossless.sh` | `recovery/scripts/br_closeout_lossless.sh.sidecar.json` | Re-runnable lossless closeout (branch pins + research/stash archives + STATUS + per-run CALL_LOG). No `--force` / stash apply / deletions. |
| `recovery/scripts/br_closeout_verify.sh` | `recovery/scripts/br_closeout_verify.sh.sidecar.json` | Verifies `manifests/sha256sums.txt` for a BR_CLOSEOUT archive. |
| `recovery/BR_CLOSEOUT_20260729T232521Z/` | `STATUS.md.sidecar.json` inside archive | First lossless closeout archive (research artifacts + meaningful stash export + hashes). |

Prior local recovery indexes moved from the repo root into `recovery/` also have sidecars.

## Rules

1. Keep this folder excluded through `.git/info/exclude`; do not add it to `.gitignore`.
2. Every new artifact should include a timestamp in the filename, a `MARKER_BEGIN` block when text-based, and a `.sidecar.json` with `signed_by`, `signed_at`, `rationale`, and `usage`.
3. Do not copy raw secret-bearing files from `~/.codex`; index paths, hashes, schemas, and sanitized summaries instead.
4. Coordinate with Antigravity through `AGENT_COORDINATION.md` before editing tracked source or governance files.
5. Read this README before assuming recovery/rebranding work after a crash or another agent's token-budget expiry.

Signed by `codex-cli` at `2026-07-08T17:25:17Z`.
Updated by `cursor-agent` at `2026-07-29T23:27:00Z` (BR closeout scripts + call log).

## BR closeout runbook (quick)

```bash
# Preferred: durable scripts (not one-off bash)
.codex-internal/recovery/scripts/br_closeout_lossless.sh --dry-run
.codex-internal/recovery/scripts/br_closeout_lossless.sh
.codex-internal/recovery/scripts/br_closeout_verify.sh \
  --archive .codex-internal/recovery/BR_CLOSEOUT_20260729T232521Z
```

Full call documentation: `recovery/CALL_LOG_20260729T232700Z_BR_CLOSEOUT.md`.
