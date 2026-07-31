# Call Log — BR Closeout (historical ad-hoc + scripted)

<!-- MARKER_BEGIN -->
marker_id: mrk_call_log_br_closeout_20260729t232700z
scope: path
target: .codex-internal/recovery/CALL_LOG_20260729T232700Z_BR_CLOSEOUT.md
classification_state: internal (sausage making), local-only, git-excluded
marked_at: 2026-07-29T23:27:00Z
updated_at: 2026-07-29T23:27:00Z
performer_id: cursor-agent
rationale: Document every command used for BR-001..BR-005 closeout; replace one-off bash with durable scripts.
notes: Companion scripts live in scripts/. Do not re-run ad-hoc fragments; use the scripts.
<!-- MARKER_END -->

signed_at: 2026-07-29T23:27:00Z
signed_by: cursor-agent

## Purpose

This file records **all** Git/filesystem calls used to close BR-001..BR-005 without data loss, and points at the durable scripts that supersede the original interactive one-liners.

## Durable scripts (use these going forward)

| ID | Script | Role |
|---|---|---|
| SCR-001 | `scripts/br_closeout_lossless.sh` | Full lossless closeout (branches + archive + STATUS + per-run CALL_LOG) |
| SCR-002 | `scripts/br_closeout_verify.sh` | Recompute/verify `manifests/sha256sums.txt` for an archive |

### Canonical invocations

```bash
# Dry-run (no writes)
/home/lugatj/code/foss/arclength-continuation/.codex-internal/recovery/scripts/br_closeout_lossless.sh --dry-run

# Real closeout into a new timestamped archive
/home/lugatj/code/foss/arclength-continuation/.codex-internal/recovery/scripts/br_closeout_lossless.sh \
  --primary /home/lugatj/code/foss/arclength-continuation \
  --research /home/lugatj/code/research/arclengthcontinuation

# Verify newest (or named) archive
/home/lugatj/code/foss/arclength-continuation/.codex-internal/recovery/scripts/br_closeout_verify.sh
/home/lugatj/code/foss/arclength-continuation/.codex-internal/recovery/scripts/br_closeout_verify.sh \
  --archive /home/lugatj/code/foss/arclength-continuation/.codex-internal/recovery/BR_CLOSEOUT_20260729T232521Z
```

Flags for `br_closeout_lossless.sh`:

| Flag | Effect |
|---|---|
| `--dry-run` | Print planned actions only |
| `--primary PATH` | Primary checkout (default: repo containing `.codex-internal`) |
| `--research PATH` | Research checkout |
| `--dest-name NAME` | Force archive directory name under `recovery/` |
| `--skip-archive` | Only pin/check branches; skip file copies |
| `--skip-branches` | Skip creating local tracking/pin branches |

## Existing archive from first closeout

Path: `BR_CLOSEOUT_20260729T232521Z/`

That run was performed as interactive shell before scripts existed. The historical call sequence is reconstructed below. A copy of `br_closeout_lossless.sh` should be stored under that archive’s `scripts/` after the script installation pass.

## Historical ad-hoc calls (2026-07-29T23:25:21Z closeout)

These were executed once by the agent. **Do not paste-run as a scratch block**; use SCR-001 instead.

### Inventory / BR-001

```bash
git -C /home/lugatj/code/foss/arclength-continuation status --short --branch
git -C /home/lugatj/code/foss/arclength-continuation branch -vv
git -C /home/lugatj/code/foss/arclength-continuation stash list
git -C /home/lugatj/code/foss/arclength-continuation remote -v
git -C /home/lugatj/code/foss/arclength-continuation rev-parse HEAD main origin/main recovery/select-stash recovery/stash-20260722
git -C /home/lugatj/code/research/arclengthcontinuation status --short --branch
git -C /home/lugatj/code/research/arclengthcontinuation branch -vv
git -C /home/lugatj/code/research/arclengthcontinuation rev-parse HEAD origin/main
git -C /home/lugatj/code/foss/arclength-continuation rev-parse 'main^{tree}'
git -C /home/lugatj/code/research/arclengthcontinuation rev-parse 'HEAD^{tree}'
# Result: both trees = 16424c63c13431c38d952d1356742dcc530a5205
```

### BR-002 / BR-003 branch pins

```bash
git -C /home/lugatj/code/foss/arclength-continuation \
  branch --track selfhost-loop-20260724T164048Z origin/selfhost-loop-20260724T164048Z
# => 69fcfcc237f1f0cc46259fa6737831aca6d880a0

git -C /home/lugatj/code/foss/arclength-continuation \
  branch recovery/lint-staged-backup-9d9b9cf9d 9d9b9cf9d
# => pins 9d9b9cf9d84bd9b1b1f16b90f38434c26f8f897e

# recovery/stash-20260722 already existed @ f820afc8502da3b85d08e5abfc6e00c980b437c0
```

### BR-003 meaningful stash export

```bash
DEST=.../BR_CLOSEOUT_20260729T232521Z
mkdir -p "$DEST/research-artifacts" "$DEST/stash-meaningful" "$DEST/manifests"

git -C /home/lugatj/code/foss/arclength-continuation diff --name-only \
  recovery/stash-20260722^1 recovery/stash-20260722 -- \
  . ':(exclude).gradle-home/**' ':(exclude)extensions/cli/test-fileindex-*' \
  > "$DEST/manifests/stash-meaningful-paths.txt"

git -C /home/lugatj/code/foss/arclength-continuation archive --format=tar \
  recovery/stash-20260722 -- $(cat "$DEST/manifests/stash-meaningful-paths.txt") \
  | tar -x -C "$DEST/stash-meaningful"
```

### BR-004 research artifact copy

```bash
RESEARCH=/home/lugatj/code/research/arclengthcontinuation
git -C "$RESEARCH" diff -- .gitignore > "$DEST/research-artifacts/gitignore.patch"
cp -a "$RESEARCH/PROJECT_RULES.md" "$DEST/research-artifacts/"
cp -a "$RESEARCH/SESSION_HANDOFF.md" "$DEST/research-artifacts/"
cp -a "$RESEARCH/asset_report.tsv" "$DEST/research-artifacts/"
cp -a "$RESEARCH/REPO_ASSET_INDEX.md" "$DEST/research-artifacts/"
cp -a "$RESEARCH/.continue/lock_sync.json" "$DEST/research-artifacts/.continue/"
cp -a "$RESEARCH/.continue/lock_sync.tmp" "$DEST/research-artifacts/.continue/"
cp -a "$RESEARCH/media/arclength-proposals" "$DEST/research-artifacts/media/"
cp -a "$RESEARCH/.codex-internal" "$DEST/research-artifacts/"
```

### Hash + status

```bash
( cd "$DEST" && find research-artifacts stash-meaningful -type f -print0 \
    | sort -z | xargs -0 sha256sum ) > "$DEST/manifests/sha256sums.txt"
# Wrote STATUS.md + STATUS.md.sidecar.json
# Appended global ~/code/SESSION_HANDOFF.md entry
```

## Explicit non-calls (never issued)

| Forbidden | Why |
|---|---|
| `git stash apply` / `pop` / `drop` | Would pollute tree or lose WIP |
| `git reset` / `git clean -fd` | Destructive |
| any `--force` / `-f` | Workspace SAFE-012 |
| `rm -rf` research checkout | Needs explicit human authorization |
| merge `selfhost-loop-*` into `main` | Out of scope for closeout |
| fast-forward `main` to `origin/main` | BR-005 deferred |

## Post-script installation calls (this document’s creation)

Documented after SCR-001/SCR-002 were written — see section “Installation verification” filled by the agent after `chmod +x` and verify run.

## Installation verification (2026-07-29T23:27:44Z)

| ID | Call | Result |
|---|---|---|
| INST-001 | `chmod +x scripts/br_closeout_lossless.sh scripts/br_closeout_verify.sh` | ok |
| INST-002 | `cp -a scripts/* BR_CLOSEOUT_20260729T232521Z/scripts/` | ok |
| INST-003 | `br_closeout_lossless.sh --dry-run` | ok (no writes) |
| INST-004 | `br_closeout_verify.sh --archive BR_CLOSEOUT_20260729T232521Z` | see output above |
| INST-005 | Updated `.codex-internal/README.md` artifact table + runbook | ok |

Signed: cursor-agent — 2026-07-29T23:27:44Z

## Verify script revision (2026-07-29T23:28:04Z)

- `br_closeout_verify.sh` now writes `manifests/sha256sums.recompute.txt` inside the archive (no `/tmp` scratch).
- Re-verified archive `BR_CLOSEOUT_20260729T232521Z` => HASH_OK.

Signed: cursor-agent — 2026-07-29T23:28:04Z
