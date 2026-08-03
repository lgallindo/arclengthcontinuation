#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Copyright (c) 2026 Lucas Gallindo
# E2E: headless crisfield against a remote OpenAI-compatible llama-server.
# Contract: SPEC_20260724T150000Z_CN_REMOTE_LLAMA.md
# Requires: LLAMA_API_BASE (e.g. http://host:port/v1), LLAMA_MODEL (served id).
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -z "${LLAMA_API_BASE:-}" ] || [ -z "${LLAMA_MODEL:-}" ]; then
  echo "SKIPPED: LLAMA_API_BASE / LLAMA_MODEL not set (private endpoint config)"
  exit 0
fi

# dist/crisfield.js is the executable wrapper that invokes runCli(); dist/index.js
# is only the bundle module and does nothing when executed directly.
if [ ! -f dist/crisfield.js ]; then
  echo "FAIL: dist/crisfield.js missing — run npm run build first" >&2
  exit 1
fi

workdir="$(mktemp -d)"
trap 'rm -r "$workdir"' EXIT

cat > "$workdir/config.yaml" <<EOF
name: E2E Remote Llama
version: 1.0.0
schema: v1
models:
  - name: remote-llama
    provider: openai
    model: "$LLAMA_MODEL"
    apiBase: "$LLAMA_API_BASE"
    apiKey: dummy-key-unused
    roles: [chat, edit, apply]
EOF

echo "E2E: probing $LLAMA_API_BASE/models"
curl -sS -m 10 "$LLAMA_API_BASE/models" > /dev/null

echo "E2E: running headless crisfield"
output="$(FORCE_NO_TTY=true node dist/crisfield.js -p --config "$workdir/config.yaml" \
  "Reply with exactly one word: PONG" 2>"$workdir/stderr.log")" || {
  echo "FAIL: crisfield exited non-zero. stderr:" >&2
  cat "$workdir/stderr.log" >&2
  exit 1
}

if [ -z "$output" ]; then
  echo "FAIL: empty completion. stderr:" >&2
  cat "$workdir/stderr.log" >&2
  exit 1
fi

echo "E2E OK — completion received:"
printf '%s\n' "$output" | head -3
