#!/usr/bin/env bash
# E2E: self-hosting loop — arclen edits its own source, harness rebuilds,
# tests, reinstalls, and verifies the edit in the reinstalled binary.
# Contract: SPEC_20260724T154500Z_SELF_HOSTING_LOOP.md
# Designed to run ON the deployment host inside the source clone.
set -euo pipefail

CN_SRC="${CN_SRC:-/opt/arclength/src}"
# Prefer ARCLEN_BIN; accept legacy CN_BIN for one release; else PATH `arclen`, else /usr/local/bin/arclen
if [ -z "${ARCLEN_BIN:-}" ]; then
  ARCLEN_BIN="${ALC_BIN:-${CN_BIN:-}}"
fi
if [ -z "${ARCLEN_BIN}" ]; then
  ARCLEN_BIN="$(command -v arclen 2>/dev/null || true)"
fi
ARCLEN_BIN="${ARCLEN_BIN:-/usr/local/bin/arclen}"
MARKER="${LOOP_MARKER:-selfhost$(date -u +%H%M%S)}"
TARGET_VERSION="0.0.1-${MARKER}"
ATTEMPTS="${LOOP_ATTEMPTS:-3}"
TURN_TIMEOUT="${LOOP_TURN_TIMEOUT:-1200}"
BRANCH="selfhost-loop-$(date -u +%Y%m%dT%H%M%SZ)"

cd "$CN_SRC"
PKG=extensions/cli/package.json

echo "LOOP: branch $BRANCH, target version $TARGET_VERSION"
git checkout -q -b "$BRANCH"
cleanup() {
  cd "$CN_SRC"
  git checkout -q -- . 2>/dev/null || true
  git checkout -q main 2>/dev/null || true
}

# --- 1. EDIT: arclen modifies its own source ---------------------------------
edited=""
for i in $(seq 1 "$ATTEMPTS"); do
  echo "LOOP: edit attempt $i/$ATTEMPTS"
  FORCE_NO_TTY=true timeout "$TURN_TIMEOUT" "$ARCLEN_BIN" -p --auto \
    "Edit the file ${CN_SRC}/${PKG}: change the value of its top-level \"version\" field to exactly \"${TARGET_VERSION}\". Change nothing else. Use your file editing tool." \
    || echo "LOOP: arclen exited non-zero on attempt $i"
  if grep -q "\"version\": \"${TARGET_VERSION}\"" "$PKG"; then
    edited=yes
    break
  fi
  git checkout -q -- "$PKG"
done

if [ -z "$edited" ]; then
  echo "FAIL: arclen did not produce the requested edit in $ATTEMPTS attempts"
  cleanup
  exit 1
fi
if ! git diff --name-only | grep -qx "$PKG"; then
  echo "FAIL: no git diff on $PKG (edit not made in working tree)"
  cleanup
  exit 1
fi
echo "LOOP: EDIT OK (arclen set version to $TARGET_VERSION)"

# --- 2. REBUILD ------------------------------------------------------------
(cd extensions/cli && npm run build > /tmp/selfhost-build.log 2>&1) || {
  echo "FAIL: rebuild failed"; tail -20 /tmp/selfhost-build.log; cleanup; exit 1;
}
echo "LOOP: REBUILD OK"

# --- 3. TEST ---------------------------------------------------------------
(cd extensions/cli && npx vitest run src/util/yamlConfigUpdater.test.ts \
  > /tmp/selfhost-test.log 2>&1) || {
  echo "FAIL: unit tests failed"; tail -20 /tmp/selfhost-test.log; cleanup; exit 1;
}
echo "LOOP: TEST OK"

# --- 4. REINSTALL (in-place bundle behind the symlink) ----------------------
chmod +x extensions/cli/dist/arclen.js
[ -x "$(readlink -f "$ARCLEN_BIN")" ] || { echo "FAIL: $ARCLEN_BIN not executable"; cleanup; exit 1; }
echo "LOOP: REINSTALL OK"

# --- 5. VERIFY -------------------------------------------------------------
installed_version="$("$ARCLEN_BIN" --version)"
if [[ "$installed_version" != *"$TARGET_VERSION"* ]]; then
  echo "FAIL: reinstalled arclen reports '$installed_version', expected $TARGET_VERSION"
  cleanup
  exit 1
fi
echo "LOOP: VERIFY OK (arclen --version -> $installed_version)"

# --- 6. AUDIT: commit stays on the local branch for human review ------------
git add "$PKG"
git -c user.name="arclen self-hosting loop" -c user.email="selfhost@localhost" \
  commit -q -m "selfhost-loop: arclen set its own version to ${TARGET_VERSION}

Edit authored by headless arclen (agentic tools) as part of the self-hosting
E2E; rebuild+tests+reinstall verified by e2e/self-hosting-loop.sh."
echo "LOOP: AUDIT OK (commit on $BRANCH)"

# Restore main working tree for the next run; loop branch remains for review.
git checkout -q main
echo "SELF-HOSTING-LOOP-OK marker=$TARGET_VERSION branch=$BRANCH"
