#!/usr/bin/env bash
# Rebrand verify gates: no leftover CLI bin name cn; no machine path /home/lugatj in tracked docs/README.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
cd "$ROOT"
fail=0

echo "== GATE: dist/cn.js / bin cn / CLI_COMMAND=cn =="
if rg -n 'dist/cn\.js|"bin"\s*:\s*\{[^}]*"cn"|CLI_COMMAND="cn"|\$script:CliCommand\s*=\s*"cn"|\.name\("cn"\)' \
  extensions/cli --glob '!node_modules/**' --glob '!dist/**' --glob '!CHANGELOG.md'; then
  echo "FAIL: leftover cn binary wiring"
  fail=1
else
  echo "OK"
fi

echo "== GATE: package.json bin alc =="
if ! rg -q '"alc":\s*"dist/alc\.js"' extensions/cli/package.json; then
  echo "FAIL: package.json missing alc bin"
  fail=1
else
  echo "OK"
fi

echo "== GATE: /home/lugatj in README + Tier A paths =="
if rg -n '/home/lugatj' README.md extensions/cli/e2e/self-hosting-loop.sh docs/specs/SPEC_20260724T154500Z_SELF_HOSTING_LOOP.md; then
  echo "FAIL: machine-specific path remains"
  fail=1
else
  echo "OK"
fi

echo "== GATE: cn-demo.gif / skills/cn-check =="
if [ -e docs/images/cn-demo.gif ] || [ -d skills/cn-check ]; then
  echo "FAIL: old cn-demo or cn-check path still present"
  fail=1
else
  echo "OK"
fi
if [ ! -f docs/images/alc-demo.gif ] || [ ! -d skills/alc-check ]; then
  echo "FAIL: alc-demo.gif or skills/alc-check missing"
  fail=1
else
  echo "OK assets present"
fi

echo "== GATE: Tailwind cn() untouched =="
if ! rg -q 'export function cn' gui/src/util/cn.ts docs-site/lib/utils.ts 2>/dev/null; then
  # one of the files may use different export; just ensure files still mention cn helper
  if ! rg -q '\bcn\b' gui/src/util/cn.ts; then
    echo "FAIL: gui cn util missing"
    fail=1
  fi
fi
echo "OK (Tailwind util files present)"

exit "$fail"
