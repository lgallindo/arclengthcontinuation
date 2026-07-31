## Codex Internal Artifacts

<!-- MARKER_BEGIN -->
marker_id: mrk_codex_internal_artifacts
scope: path
target: .codex-internal
classification_state: internal (sausage making), local-only, git-excluded
marked_at: 2026-07-08T18:00:41Z
updated_at: 2026-07-08T18:00:41Z
performer_id: codex-cli
rationale: Repository-local home for recovery indexes, merge-analysis notes, and other internal artifacts that must not live as root-level scratch files.
notes: This directory is excluded through .git/info/exclude, not .gitignore. Do not commit or publish contents without explicit review.
<!-- MARKER_END -->

This directory is the local-only artifact home for the current recovery pass.
The source-of-truth tree used for the rescan is `/home/lugatj/code/foss/continue`.

Use this folder for signed, timestamped, sidecar-documented internal artifacts that would otherwise become scratch files.
Do not place new recovery plans, indexes, or ad hoc scripts at the repository root.
