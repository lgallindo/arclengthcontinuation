# SPEC: source ↔ binary build attestation for the cn CLI

## Intent

Make it possible to attest that a given `dist/arclen.js` + `dist/index.js`
bundle was produced from a specific source commit, and let anyone verify
the claim by rebuilding and comparing digests. The attestation is a small
JSON document (commit, toolchain, lockfile digest, artifact digests)
optionally signed with an OpenSSH key (`ssh-keygen -Y sign`).

## Boundaries

- Cross-machine bit-reproducibility is NOT claimed: esbuild output is
  deterministic only for an identical toolchain (node/npm/esbuild
  versions from the same lockfile) and source tree. Verification
  therefore means "rebuild here and compare".
- No CA/keyserver infrastructure; trust in the signing key is out of
  scope (allowed_signers distribution is the operator's concern).
- Only the CLI bundle is covered (not VS Code/JetBrains artifacts).

## Acceptance

All enforced by `extensions/cli/e2e/build-attestation.sh` (exit 0 = pass):

1. `scripts/attest-build.sh attest` on a clean tree with a fresh build
   writes `dist/BUILD_ATTESTATION.json` containing: git commit, dirty
   flag (must be false), node/npm/esbuild versions, sha256 of
   package-lock.json, sha256 of dist/arclen.js and dist/index.js, UTC
   timestamp.
2. If an SSH key is available (env `CN_ATTEST_SSH_KEY`, default
   `~/.ssh/id_ed25519` when present), a detached signature
   `dist/BUILD_ATTESTATION.json.sig` is produced and verifiable with
   `ssh-keygen -Y verify`.
3. `scripts/attest-build.sh verify dist/BUILD_ATTESTATION.json` rebuilds
   the bundle at the same commit and exits 0 iff all digests match.
4. Tampering with dist/arclen.js after attest makes `verify` exit non-zero.
