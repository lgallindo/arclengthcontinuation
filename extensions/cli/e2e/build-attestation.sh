#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Copyright (c) 2026 Lucas Gallindo
# E2E: attest -> verify roundtrip + tamper detection for the cn bundle.
# Contract: SPEC_20260724T190500Z_BUILD_ATTESTATION.md
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -n "$(git status --porcelain)" ]; then
  echo "SKIPPED: working tree dirty (attestation requires a clean tree)"
  exit 0
fi

./scripts/attest-build.sh attest
./scripts/attest-build.sh verify dist/BUILD_ATTESTATION.json

if [ -f dist/BUILD_ATTESTATION.json.sig ]; then
  key="${CN_ATTEST_SSH_KEY:-$HOME/.ssh/id_ed25519}"
  signer_id="$(whoami)@$(hostname -s)"
  allowed="$(mktemp)"
  printf '%s %s\n' "$signer_id" "$(cut -d' ' -f1-2 "${key}.pub")" > "$allowed"
  ssh-keygen -Y verify -f "$allowed" -I "$signer_id" -n file \
    -s dist/BUILD_ATTESTATION.json.sig < dist/BUILD_ATTESTATION.json
  rm -f "$allowed"
  echo "SIGNATURE-VERIFY-OK"
fi

# Tamper detection: flipping one byte in the bundle must fail verify.
cp dist/cn.js /tmp/cn.js.bak
printf '\n// tamper\n' >> dist/cn.js
if ./scripts/attest-build.sh verify dist/BUILD_ATTESTATION.json 2>/dev/null; then
  mv /tmp/cn.js.bak dist/cn.js
  echo "FAIL: tampered bundle passed verification"
  exit 1
fi
mv /tmp/cn.js.bak dist/cn.js
echo "TAMPER-DETECTION-OK"

echo "BUILD-ATTESTATION-E2E-OK"
