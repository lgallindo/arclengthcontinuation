#!/usr/bin/env bash
# br_closeout_lossless.sh — lossless BR-001..BR-005 consolidation closeout
#
# Classification: internal / sausage-making / git-excluded (.codex-internal)
# Does NOT: --force, reset, stash drop/apply/pop, delete research checkout,
#           merge selfhost into main, or fast-forward main.
#
# Usage:
#   ./br_closeout_lossless.sh [--dry-run] [--primary PATH] [--research PATH]
#                             [--dest-name NAME] [--skip-archive] [--skip-branches]
#
# Exit codes:
#   0 success
#   2 usage / precondition failure
#   3 git or archive failure

set -euo pipefail

SCRIPT_PATH="$(readlink -f "${BASH_SOURCE[0]}")"
SCRIPT_DIR="$(cd "$(dirname "$SCRIPT_PATH")" && pwd)"
RECOVERY_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DEFAULT_PRIMARY="$(cd "$RECOVERY_ROOT/../.." && pwd)"
DEFAULT_RESEARCH="/home/lugatj/code/research/arclengthcontinuation"

DRY_RUN=0
PRIMARY="$DEFAULT_PRIMARY"
RESEARCH="$DEFAULT_RESEARCH"
DEST_NAME=""
SKIP_ARCHIVE=0
SKIP_BRANCHES=0
SIGNED_BY="${SIGNED_BY:-cursor-agent}"

usage() {
  sed -n '1,25p' "$SCRIPT_PATH" | sed 's/^# \{0,1\}//'
  exit 2
}

log() { printf '[%s] %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*"; }
run() {
  log "+ $*"
  if [[ "$DRY_RUN" -eq 1 ]]; then
    return 0
  fi
  "$@"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY_RUN=1; shift ;;
    --primary) PRIMARY="${2:?}"; shift 2 ;;
    --research) RESEARCH="${2:?}"; shift 2 ;;
    --dest-name) DEST_NAME="${2:?}"; shift 2 ;;
    --skip-archive) SKIP_ARCHIVE=1; shift ;;
    --skip-branches) SKIP_BRANCHES=1; shift ;;
    -h|--help) usage ;;
    *) log "unknown arg: $1"; usage ;;
  esac
done

if [[ ! -d "$PRIMARY/.git" ]]; then
  log "FATAL: primary is not a git checkout: $PRIMARY"
  exit 2
fi
if [[ ! -d "$RESEARCH/.git" ]]; then
  log "FATAL: research is not a git checkout: $RESEARCH"
  exit 2
fi

UTC_TS="$(date -u +%Y%m%dT%H%M%SZ)"
ISO_NOW="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
if [[ -z "$DEST_NAME" ]]; then
  DEST_NAME="BR_CLOSEOUT_${UTC_TS}"
fi
DEST="$RECOVERY_ROOT/$DEST_NAME"
CALL_LOG="$DEST/CALL_LOG.md"

append_call() {
  local phase="$1"
  shift
  if [[ "$DRY_RUN" -eq 1 ]]; then
    log "CALL[$phase] $*"
    return 0
  fi
  {
    printf -- '- **%s** `%s`\n' "$phase" "$*"
    printf -- '  - utc: %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  } >> "$CALL_LOG"
}

git_p() { git -C "$PRIMARY" "$@"; }
git_r() { git -C "$RESEARCH" "$@"; }

# --- prelude ---
if [[ "$DRY_RUN" -eq 0 ]]; then
  mkdir -p "$DEST/research-artifacts" "$DEST/stash-meaningful" "$DEST/manifests" "$DEST/scripts"
  cp -a "$SCRIPT_PATH" "$DEST/scripts/br_closeout_lossless.sh"
  cat > "$CALL_LOG" <<EOF
# Call Log — ${DEST_NAME}

signed_at: ${ISO_NOW}
signed_by: ${SIGNED_BY}
script: \`${SCRIPT_PATH}\`
primary: \`${PRIMARY}\`
research: \`${RESEARCH}\`

## Invocations

EOF
fi

log "primary=$PRIMARY"
log "research=$RESEARCH"
log "dest=$DEST"
log "dry_run=$DRY_RUN"

# --- BR-001: tree equality check (read-only facts) ---
PRIMARY_MAIN_TREE="$(git_p rev-parse 'main^{tree}')"
RESEARCH_HEAD_TREE="$(git_r rev-parse 'HEAD^{tree}')"
PRIMARY_MAIN="$(git_p rev-parse main)"
ORIGIN_MAIN="$(git_p rev-parse origin/main)"
RESEARCH_HEAD="$(git_r rev-parse HEAD)"
append_call BR-001 "git -C \"$PRIMARY\" rev-parse 'main^{tree}' => $PRIMARY_MAIN_TREE"
append_call BR-001 "git -C \"$RESEARCH\" rev-parse 'HEAD^{tree}' => $RESEARCH_HEAD_TREE"
if [[ "$PRIMARY_MAIN_TREE" != "$RESEARCH_HEAD_TREE" ]]; then
  log "WARN: main trees differ; BR-001 not auto-closable without merge review"
else
  log "BR-001: trees equal ($PRIMARY_MAIN_TREE)"
fi

# --- BR-002: local selfhost tracking branch ---
SELFHOST_REF="selfhost-loop-20260724T164048Z"
if [[ "$SKIP_BRANCHES" -eq 0 ]]; then
  if git_p show-ref --verify --quiet "refs/heads/${SELFHOST_REF}"; then
    append_call BR-002 "git branch already exists: ${SELFHOST_REF} => $(git_p rev-parse "$SELFHOST_REF")"
  else
    if git_p show-ref --verify --quiet "refs/remotes/origin/${SELFHOST_REF}"; then
      run git_p branch --track "$SELFHOST_REF" "origin/${SELFHOST_REF}"
      append_call BR-002 "git -C \"$PRIMARY\" branch --track ${SELFHOST_REF} origin/${SELFHOST_REF}"
    else
      log "WARN: origin/${SELFHOST_REF} missing; fetch first if needed"
      append_call BR-002 "SKIPPED create ${SELFHOST_REF} (remote ref absent)"
    fi
  fi
fi

# --- BR-003: pin stash + lint-staged backup; archive meaningful paths ---
STASH_BRANCH="recovery/stash-20260722"
if git_p show-ref --verify --quiet "refs/heads/${STASH_BRANCH}"; then
  append_call BR-003 "git rev-parse ${STASH_BRANCH} => $(git_p rev-parse "$STASH_BRANCH")"
else
  if git_p rev-parse -q --verify 'stash@{0}' >/dev/null; then
    run git_p branch "$STASH_BRANCH" 'stash@{0}'
    append_call BR-003 "git -C \"$PRIMARY\" branch ${STASH_BRANCH} stash@{0}"
  else
    log "WARN: neither ${STASH_BRANCH} nor stash@{0} available"
  fi
fi

# Pin known lint-staged backup object if present and unbranched
LINT_SHA="9d9b9cf9d84bd9b1b1f16b90f38434c26f8f897e"
LINT_BRANCH="recovery/lint-staged-backup-9d9b9cf9d"
if git_p cat-file -t "$LINT_SHA" >/dev/null 2>&1; then
  if ! git_p show-ref --verify --quiet "refs/heads/${LINT_BRANCH}"; then
    run git_p branch "$LINT_BRANCH" "$LINT_SHA"
    append_call BR-003 "git -C \"$PRIMARY\" branch ${LINT_BRANCH} ${LINT_SHA}"
  else
    append_call BR-003 "git branch already exists: ${LINT_BRANCH}"
  fi
fi

if [[ "$SKIP_ARCHIVE" -eq 0 && "$DRY_RUN" -eq 0 ]]; then
  PATHS_FILE="$DEST/manifests/stash-meaningful-paths.txt"
  if git_p show-ref --verify --quiet "refs/heads/${STASH_BRANCH}"; then
    git_p diff --name-only "${STASH_BRANCH}^1" "${STASH_BRANCH}" -- \
      . ':(exclude).gradle-home/**' ':(exclude)extensions/cli/test-fileindex-*' \
      > "$PATHS_FILE"
    append_call BR-003 "git -C \"$PRIMARY\" diff --name-only ${STASH_BRANCH}^1 ${STASH_BRANCH} -- . ':(exclude).gradle-home/**' ':(exclude)extensions/cli/test-fileindex-*' > manifests/stash-meaningful-paths.txt"
    mapfile -t PATHS < "$PATHS_FILE"
    if [[ "${#PATHS[@]}" -gt 0 ]]; then
      git_p archive --format=tar "${STASH_BRANCH}" -- "${PATHS[@]}" \
        | tar -x -C "$DEST/stash-meaningful"
      append_call BR-003 "git -C \"$PRIMARY\" archive --format=tar ${STASH_BRANCH} -- \$(paths) | tar -x -C stash-meaningful/"
    fi
  fi
fi

# --- BR-004: copy research-only artifacts ---
if [[ "$SKIP_ARCHIVE" -eq 0 && "$DRY_RUN" -eq 0 ]]; then
  git_r diff -- .gitignore > "$DEST/research-artifacts/gitignore.patch" || true
  append_call BR-004 "git -C \"$RESEARCH\" diff -- .gitignore > research-artifacts/gitignore.patch"
  RESEARCH_PATHS=(
    PROJECT_RULES.md
    SESSION_HANDOFF.md
    asset_report.tsv
    REPO_ASSET_INDEX.md
    .continue/lock_sync.json
    .continue/lock_sync.tmp
    media/arclength-proposals
    .codex-internal
  )
  for path in "${RESEARCH_PATHS[@]}"; do
    if [[ -e "$RESEARCH/$path" ]]; then
      mkdir -p "$DEST/research-artifacts/$(dirname "$path")"
      cp -a "$RESEARCH/$path" "$DEST/research-artifacts/$path"
      append_call BR-004 "cp -a \"$RESEARCH/$path\" \"research-artifacts/$path\""
    else
      append_call BR-004 "SKIP missing $path"
    fi
  done
fi

# --- hashes ---
if [[ "$SKIP_ARCHIVE" -eq 0 && "$DRY_RUN" -eq 0 ]]; then
  (
    cd "$DEST"
    find research-artifacts stash-meaningful -type f -print0 2>/dev/null \
      | sort -z \
      | xargs -0 -r sha256sum
  ) > "$DEST/manifests/sha256sums.txt"
  append_call HASH "find research-artifacts stash-meaningful -type f | xargs sha256sum > manifests/sha256sums.txt"
fi

# --- BR-005: record remote/local main divergence (no ff) ---
append_call BR-005 "git -C \"$PRIMARY\" rev-parse main => $PRIMARY_MAIN"
append_call BR-005 "git -C \"$PRIMARY\" rev-parse origin/main => $ORIGIN_MAIN"
append_call BR-005 "NO fast-forward / merge performed"

# --- STATUS.md ---
if [[ "$DRY_RUN" -eq 0 ]]; then
  SELECT_STASH_SHA="$(git_p rev-parse recovery/select-stash 2>/dev/null || echo absent)"
  STASH_SHA="$(git_p rev-parse "$STASH_BRANCH" 2>/dev/null || echo absent)"
  SELFHOST_SHA="$(git_p rev-parse "$SELFHOST_REF" 2>/dev/null || echo absent)"
  LINT_PIN="$(git_p rev-parse "$LINT_BRANCH" 2>/dev/null || echo absent)"
  cat > "$DEST/STATUS.md" <<EOF
# BR Closeout Status — ${DEST_NAME}

signed_at: ${ISO_NOW}
signed_by: ${SIGNED_BY}
script: \`.codex-internal/recovery/scripts/br_closeout_lossless.sh\`
primary: ${PRIMARY}
research: ${RESEARCH}
goal: Resolve BR-001..BR-005 without data loss; stop selective-restore loop.

## Branch refs (primary)

| Ref | SHA | Role |
|---|---|---|
| main | ${PRIMARY_MAIN} | Local merge commit |
| origin/main | ${ORIGIN_MAIN} | Remote tip (do not auto-ff) |
| recovery/select-stash | ${SELECT_STASH_SHA} | Accepted 4-file stash recovery |
| ${STASH_BRANCH} | ${STASH_SHA} | Full original WIP stash snapshot |
| ${LINT_BRANCH} | ${LINT_PIN} | Transient lint-staged backup pin |
| ${SELFHOST_REF} | ${SELFHOST_SHA} | Local tracking of remote selfhost branch |

## Tree equality (BR-001)

| Checkout | Tree |
|---|---|
| primary main | ${PRIMARY_MAIN_TREE} |
| research HEAD | ${RESEARCH_HEAD_TREE} |

## BR resolution

| ID | Resolution |
|---|---|
| BR-001 | Trees equal => no merge needed (or WARN if unequal above) |
| BR-002 | Local tracking branch for selfhost (not merged into main) |
| BR-003 | Stash branch pinned; meaningful paths archived under stash-meaningful/ |
| BR-004 | Research artifacts copied under research-artifacts/ |
| BR-005 | Divergence recorded; no fast-forward |

## Explicit non-actions

- No git stash apply / pop / drop
- No --force, reset, clean -fd, or research-directory deletion
- No merge of selfhost-loop into main

## Call log

See \`CALL_LOG.md\` in this directory.
EOF

  cat > "$DEST/STATUS.md.sidecar.json" <<EOF
{
  "signed_by": "${SIGNED_BY}",
  "signed_at": "${ISO_NOW}",
  "rationale": "Lossless BR-001..BR-005 closeout produced by br_closeout_lossless.sh",
  "usage": "Re-run via .codex-internal/recovery/scripts/br_closeout_lossless.sh; verify manifests/sha256sums.txt before deleting research checkout",
  "script": "${SCRIPT_PATH}",
  "archive_root": "${DEST}",
  "primary_checkout": "${PRIMARY}",
  "research_checkout": "${RESEARCH}"
}
EOF
  append_call STATUS "wrote STATUS.md and STATUS.md.sidecar.json"
fi

log "done dest=$DEST"
exit 0
