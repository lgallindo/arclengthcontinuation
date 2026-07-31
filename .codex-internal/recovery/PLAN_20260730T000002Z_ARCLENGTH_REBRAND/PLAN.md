# PLAN: Arclength rebrand (`cn` → `alc`, paths, images)

<!-- MARKER_BEGIN -->
marker_id: mrk_plan_20260730t000002z_arclength_rebrand
scope: path
target: .codex-internal/recovery/PLAN_20260730T000002Z_ARCLENGTH_REBRAND
classification_state: internal (sausage making), local-only, git-excluded
marked_at: 2026-07-30T00:02:00Z
updated_at: 2026-07-30T00:02:00Z
performer_id: cursor-agent
rationale: Dated implementation artifact for approved Rebrand Scan Plan
notes: Tables under tables/; do not commit without reclassification
<!-- MARKER_END -->

signed_at: 2026-07-30T00:02:00Z  
signed_by: cursor-agent  

## Defaults

| Item | Value |
|---|---|
| CLI binary | `alc` |
| Built entry | `dist/alc.js` |
| Package | `@arclength-continuation/cli` |
| Env override | `ALC_BIN` (temporary alias `CN_BIN` accepted in self-host script) |
| Tailwind `cn()` | Do not rename |

## Tables

| File | Contents |
|---|---|
| [tables/cn_to_alc_allowlist.csv](tables/cn_to_alc_allowlist.csv) | 55 high-confidence CLI/`cn` command files |
| [tables/path_tiers.csv](tables/path_tiers.csv) | Tier A machine paths + Tier C upstream URL docs |
| [tables/images_brand.csv](tables/images_brand.csv) | Brand-signal / media image rows |
| [tables/images_summary.json](tables/images_summary.json) | Counts by brand_class |

## Image summary (scan)

| Metric | Value |
|---|---|
| Total images | 313 |
| Brand-table rows | 109 |
| Duplicate hash groups | 60 |
| continue_branded | 21 |
| cn_named | 1 (`docs/images/cn-demo.gif`) |
| arclength_ok | 3 (incl. `media/github-readme.png`) |
| duplicate (assets copies) | 30 |

## Priority image actions

| ID | Asset | Action |
|---|---|---|
| IMG-001 | `media/github-readme.png` | Keep |
| IMG-002 | `media/run-continue-intellij.png` | Rename file + note Continue chrome; regenerate later |
| IMG-003 | `docs-site/public/images/continue-logo-light.png` | Replace broken/blank asset |
| IMG-004 | `docs/images/cn-demo.gif` | Rename → `alc-demo.gif`, update refs |
| IMG-005 | Continue-named docs/icons | Backlog |

## Tier A paths

| ID | Path | Fix |
|---|---|---|
| PATH-001 | `README.md` | `GRADLE_USER_HOME="$PWD/.gradle-home"` |
| PATH-002 | `extensions/cli/e2e/self-hosting-loop.sh` | `ALC_BIN` / `command -v alc` |
| PATH-003 | `docs/specs/SPEC_20260724T154500Z_SELF_HOSTING_LOOP.md` | Document `alc` |

## Implementation status

Tracked in agent todos: plan-artifact → cli-rename → path-tier-a → image-priority → verify-gates.

## Implementation status (2026-07-30)

All plan todos completed: plan-artifact, cli-rename (`cn`→`alc`), path-tier-a, image-priority (IMG-002/003/004), verify-gates.
