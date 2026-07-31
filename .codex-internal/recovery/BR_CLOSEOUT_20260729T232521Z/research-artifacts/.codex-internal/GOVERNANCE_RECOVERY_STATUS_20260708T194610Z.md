# Governance Recovery Status

## Missing Governance Artifacts In `continue` Found In Fossil Path

| ID | Required Artifact | `continue` Before | Fossil Path | Action | `continue` After |
|---|---|---|---|---|---|
| GAP-001 | `PROJECT_RULES.md` | missing | `/home/lugatj/code/foss/arclength-continuation-fossil/PROJECT_RULES.md` | copied/recovered with local path adjustments | present |
| GAP-002 | `SPEC_DRIVEN_DEVELOPMENT.md` | missing | not found | no source artifact available to copy | missing |
| GAP-003 | `.lifecycle/templates/**` | missing | not found | no source artifact available to copy | missing |

## OBS-001: AGENTS Version Differences (Fossil vs Active)

Compared files:
- fossil: `/home/lugatj/code/foss/arclength-continuation-fossil/AGENTS.md`
- active: `/home/lugatj/code/research/AGENTS.md`

| ID | Difference Axis | Fossil Version | Active Version | Raw Effect |
|---|---|---|---|---|
| OBS1-001 | Structure | 5-phase model (`Phase 0..5`) + explicit workflow stages | flat section model (Core/Operational/Technical/Safety/Planning/Communication/Trailer) | fossil has stricter execution sequencing semantics |
| OBS1-002 | Internal artifact policy | includes `Local Internal Artifacts` section with `.codex-internal` requirements | absent | fossil explicitly mandates local-only internal artifact handling |
| OBS1-003 | Marker system | includes `VIS-001..005` marker DSL requirements (`marker.py`, `marker_schema.json`) | absent | fossil introduces classification metadata workflow unavailable in active |
| OBS1-004 | Bootstrap behavior | `PLAN-006` requires creating `PROJECT_RULES.md` if missing | absent | fossil self-heals missing project rules; active does not |
| OBS1-005 | Prompt complexity gating | includes `COMM-000/001` trivial vs non-trivial classification | absent | fossil enforces decision gate prior to response style |
| OBS1-006 | Non-trivial protocol | includes `NONTRIVIAL-000..004` atomic item tables + DOT graph | absent | fossil requires formal planning graph artifacts |
| OBS1-007 | Safety additions | includes `SAFE-012` (no `--force` anywhere) and `SAFE-013` periodic reminder rule | absent | fossil adds stricter force-flag prohibition and repetition constraint |
| OBS1-008 | Session handoff requirements | includes `HANDOFF-001..003` including global mirror path | absent | fossil mandates append-only handoff discipline with cross-workspace mirror |
| OBS1-009 | Trailer schema | includes `TRLR-008` table row IDs + `TRLR-006 Message ID` phrasing | active uses `TRLR-006 Sequence ID`, no `TRLR-008` | schema mismatch in required response metadata |

## OBS-002: SDD-Like Files from Fossil

| ID | File | Fossil Path | `continue` Path | Byte-Level Match | Action |
|---|---|---|---|---|---|
| OBS2-001 | E2E spec doc | `/home/lugatj/code/foss/arclength-continuation-fossil/extensions/cli/src/e2e/spec.md` | `/home/lugatj/code/research/continue/extensions/cli/src/e2e/spec.md` | yes (`cmp` exit 0) | no copy needed |
| OBS2-002 | continue specificity rule | `/home/lugatj/code/foss/arclength-continuation-fossil/.continue/rules/continue-specificity.md` | `/home/lugatj/code/research/continue/.continue/rules/continue-specificity.md` | yes (`cmp` exit 0) | no copy needed |
| OBS2-003 | llm specificity rule | `/home/lugatj/code/foss/arclength-continuation-fossil/.continue/rules/llm-specificity.md` | `/home/lugatj/code/research/continue/.continue/rules/llm-specificity.md` | yes (`cmp` exit 0) | no copy needed |
