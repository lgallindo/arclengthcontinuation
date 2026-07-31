#!/usr/bin/env bash
# br_closeout_verify.sh — verify an existing BR closeout archive
#
# Usage:
#   ./br_closeout_verify.sh [--archive PATH]
# Default archive: newest BR_CLOSEOUT_* under ../
#
# Writes recompute under <archive>/manifests/sha256sums.recompute.txt
# (no /tmp scratch).

set -euo pipefail

SCRIPT_PATH="$(readlink -f "${BASH_SOURCE[0]}")"
SCRIPT_DIR="$(cd "$(dirname "$SCRIPT_PATH")" && pwd)"
RECOVERY_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ARCHIVE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --archive) ARCHIVE="${2:?}"; shift 2 ;;
    -h|--help)
      sed -n '1,14p' "$SCRIPT_PATH" | sed 's/^# \{0,1\}//'
      exit 2
      ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

if [[ -z "$ARCHIVE" ]]; then
  ARCHIVE="$(ls -1d "$RECOVERY_ROOT"/BR_CLOSEOUT_* 2>/dev/null | sort | tail -n 1 || true)"
fi
if [[ -z "$ARCHIVE" || ! -d "$ARCHIVE" ]]; then
  echo "FATAL: no archive found" >&2
  exit 2
fi

echo "archive=$ARCHIVE"
test -f "$ARCHIVE/STATUS.md"
test -f "$ARCHIVE/manifests/sha256sums.txt"
mkdir -p "$ARCHIVE/manifests"

RECOMPUTE="$ARCHIVE/manifests/sha256sums.recompute.txt"
(
  cd "$ARCHIVE"
  find research-artifacts stash-meaningful -type f -print0 2>/dev/null \
    | sort -z \
    | xargs -0 -r sha256sum
) > "$RECOMPUTE"

echo "--- STATUS head ---"
head -n 40 "$ARCHIVE/STATUS.md"

if cmp -s "$RECOMPUTE" "$ARCHIVE/manifests/sha256sums.txt"; then
  echo "HASH_OK: manifests/sha256sums.txt matches recomputation"
  echo "recompute_path=$RECOMPUTE"
else
  echo "HASH_DIFF: stored vs recomputed differ" >&2
  diff -u "$ARCHIVE/manifests/sha256sums.txt" "$RECOMPUTE" | head -n 80 || true
  exit 3
fi

wc -l "$ARCHIVE/manifests/sha256sums.txt" "$RECOMPUTE"
du -sh --apparent-size "$ARCHIVE/research-artifacts" "$ARCHIVE/stash-meaningful" 2>/dev/null \
  || du -sh "$ARCHIVE/research-artifacts" "$ARCHIVE/stash-meaningful"
