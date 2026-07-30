#!/usr/bin/env bash
# Source <-> binary attestation for the arclen CLI bundle.
# Contract: docs/specs/SPEC_20260724T190500Z_BUILD_ATTESTATION.md
#
#   attest-build.sh attest            build + write dist/BUILD_ATTESTATION.json (+ .sig)
#   attest-build.sh verify <file>     rebuild at same commit, compare digests
set -euo pipefail

cd "$(dirname "$0")/.."
CLI_DIR="$(pwd)"
ATTESTATION="${CLI_DIR}/dist/BUILD_ATTESTATION.json"
SSH_KEY="${CN_ATTEST_SSH_KEY:-$HOME/.ssh/id_ed25519}"

sha() { sha256sum "$1" | awk '{print $1}'; }

git_commit() { git rev-parse HEAD; }
git_dirty() {
  # Only the CLI sources + lockfile matter for the bundle; a dirty tree
  # elsewhere in the monorepo still taints provenance, so check it all.
  [ -n "$(git status --porcelain)" ] && echo true || echo false
}

esbuild_version() { node -e "console.log(require('esbuild/package.json').version)"; }

do_build() { npm run build > /tmp/attest-build.log 2>&1 || { tail -20 /tmp/attest-build.log >&2; return 1; }; }

write_attestation() {
  local commit dirty
  commit="$(git_commit)"
  dirty="$(git_dirty)"
  if [ "$dirty" = "true" ]; then
    echo "FAIL: working tree is dirty; attestation requires a clean tree" >&2
    exit 1
  fi
  node -e '
    const fs = require("fs");
    const doc = {
      schema: "arclen-build-attestation/1",
      commit: process.argv[1],
      dirty: false,
      timestamp: new Date().toISOString(),
      toolchain: {
        node: process.version,
        npm: process.argv[2],
        esbuild: process.argv[3],
      },
      digests_sha256: {
        "package-lock.json": process.argv[4],
        "dist/arclen.js": process.argv[5],
        "dist/index.js": process.argv[6],
      },
    };
    fs.writeFileSync(process.argv[7], JSON.stringify(doc, null, 2) + "\n");
  ' "$commit" "$(npm --version)" "$(esbuild_version)" \
    "$(sha package-lock.json)" "$(sha dist/arclen.js)" "$(sha dist/index.js)" \
    "$ATTESTATION"
  echo "ATTESTATION written: $ATTESTATION"

  if [ -f "$SSH_KEY" ]; then
    rm -f "${ATTESTATION}.sig"
    ssh-keygen -Y sign -f "$SSH_KEY" -n file "$ATTESTATION" < /dev/null
    echo "SIGNATURE written: ${ATTESTATION}.sig"
  else
    echo "NOTE: no SSH key at $SSH_KEY — attestation left unsigned"
  fi
}

verify_attestation() {
  local file="$1"
  [ -f "$file" ] || { echo "FAIL: attestation not found: $file" >&2; exit 1; }

  local claimed_commit actual_commit
  claimed_commit="$(node -pe 'JSON.parse(require("fs").readFileSync(process.argv[1])).commit' "$file")"
  actual_commit="$(git_commit)"
  if [ "$claimed_commit" != "$actual_commit" ]; then
    echo "FAIL: attestation is for commit $claimed_commit but HEAD is $actual_commit" >&2
    exit 1
  fi
  if [ "$(git_dirty)" = "true" ]; then
    echo "FAIL: working tree is dirty; cannot verify provenance" >&2
    exit 1
  fi

  # The current bundle digests must match BEFORE the rebuild (artifact under
  # test), and the rebuild must reproduce them (source equivalence).
  local claim_arclen claim_idx
  claim_arclen="$(node -pe 'JSON.parse(require("fs").readFileSync(process.argv[1])).digests_sha256["dist/arclen.js"]' "$file")"
  claim_idx="$(node -pe 'JSON.parse(require("fs").readFileSync(process.argv[1])).digests_sha256["dist/index.js"]' "$file")"

  [ "$(sha dist/arclen.js)" = "$claim_arclen" ] || { echo "FAIL: dist/arclen.js digest mismatch (artifact tampered or stale)" >&2; exit 1; }
  [ "$(sha dist/index.js)" = "$claim_idx" ] || { echo "FAIL: dist/index.js digest mismatch (artifact tampered or stale)" >&2; exit 1; }

  do_build
  [ "$(sha dist/arclen.js)" = "$claim_arclen" ] || { echo "FAIL: rebuild produced different dist/arclen.js" >&2; exit 1; }
  [ "$(sha dist/index.js)" = "$claim_idx" ] || { echo "FAIL: rebuild produced different dist/index.js" >&2; exit 1; }

  echo "VERIFY-OK: source at $actual_commit reproduces the attested bundle"
}

case "${1:-}" in
  attest)
    do_build
    write_attestation
    ;;
  verify)
    verify_attestation "${2:-$ATTESTATION}"
    ;;
  *)
    echo "usage: $0 attest | verify [attestation.json]" >&2
    exit 2
    ;;
esac
