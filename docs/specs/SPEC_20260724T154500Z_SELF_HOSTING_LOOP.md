# SPEC: self-hosting loop — alc edits, rebuilds, and reinstalls alc

## Intent

Prove the full self-hosting cycle on a host where alc is installed from
source: headless alc (agentic, tools auto-allowed) edits its own source
tree, the harness rebuilds the CLI from that edited source, runs unit
tests, reinstalls (in-place bundle rebuild behind the alc binary —
`$ALC_BIN`, default `command -v alc` then `/usr/local/bin/alc`; legacy
`$CN_BIN` accepted as fallback), and the reinstalled binary observably
carries the edit.

## Boundaries

- The edit task is deliberately mechanical (version-field bump in
  extensions/cli/package.json); code-quality of model edits is out of scope.
- Loop commits stay on a local branch of the deployment clone for human
  review; no pushing from the deployment host (no credentials there).
- Model/server provisioning is out of scope (infrastructure workspace).

## Acceptance

All enforced by `extensions/cli/e2e/self-hosting-loop.sh` (exit 0 = pass),
which must run in a from-source install ($CN_SRC, default /opt/arclength/src):

1. EDIT: alc -p --auto, retried <=3 times, sets package.json "version" to
   `0.0.1-<marker>`; the harness verifies via git diff (edit made by alc's
   tools, not the harness).
2. REBUILD: `npm run build` in extensions/cli exits 0 on the edited tree.
3. TEST: yamlConfigUpdater unit suite passes on the edited tree.
4. REINSTALL: rebuilt dist/alc.js is executable behind the existing symlink.
5. VERIFY: `alc --version` output contains `0.0.1-<marker>`.
6. AUDIT: the loop branch carries a commit with the alc-authored edit.
