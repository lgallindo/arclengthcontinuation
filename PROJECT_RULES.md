<!-- MARKER_BEGIN -->

marker_id: mrk_project_rules_arclength_primary
scope: file
target: PROJECT_RULES.md
classification_state: internal (repository governance)
marked_at: 2026-07-30T10:24:51Z
updated_at: 2026-07-30T17:05:00Z
performer_id: cursor-composer
rationale: Add agent bus, live Pages URL, guiding principles, identity scope, artifact naming.
notes: Keep this file focused on repository-local workflow; workspace rules remain authoritative.

<!-- MARKER_END -->

# Project Rules

## Scope

This checkout (`~/code/foss/arclength-continuation`) is the primary working copy for the ArclengthContinuation rebrand and consolidation effort. The research checkout (`~/code/research/arclengthcontinuation`) and VPS infrastructure checkout are related repositories, not alternate working directories for this repository.

## Agent realtime bus (Cursor / Codex / peers)

| ID      | Rule                                                                                                                                                                                                   |
| :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BUS-001 | On session start, read this file, then tail [`docs/plans/AGENT_BUS.jsonl`](docs/plans/AGENT_BUS.jsonl) (last ~30 lines). Protocol: [`docs/plans/AGENT_BUS_README.md`](docs/plans/AGENT_BUS_README.md). |
| BUS-002 | Append a JSONL line for heartbeats, announces, decisions, blocks, and questions. Update `/home/lugatj/code/agent_presence/arclength-continuation.json`.                                                |
| BUS-003 | Mirror strategic milestones to workspace [`~/code/SESSION_HANDOFF.md`](../../SESSION_HANDOFF.md) and repo `SESSION_HANDOFF.md`.                                                                        |
| BUS-004 | Prefer the bus over chat-only status when another agent may be concurrent on rebrand, CLI naming, or identity.                                                                                         |

## Public site (operator Pages — not product chrome)

| ID       | Rule                                                                                                                                                                             |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SITE-001 | Live operator site: **https://lgallindo.github.io/** (Astro). Project page: https://lgallindo.github.io/en_US/                                                                   |
| SITE-002 | That site hosts **build/run notes** for this repo. It is **not** the product brand surface.                                                                                      |
| SITE-003 | Do **not** port matte Arclength visual identity into `lgallindo.github.io`. Identity applies to **apps + README** only ([`docs/PRODUCT_IDENTITY.md`](docs/PRODUCT_IDENTITY.md)). |

## Guiding principles

| ID     | Principle                                                                                                                                                                                     |
| :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GP-001 | **Local-first models:** Optimize for local models; keep cloud-model compatibility open.                                                                                                       |
| GP-002 | **SLM via planning:** Make small language models work through an **excessive** number of planning calls (decompose hard tasks).                                                               |
| GP-003 | **Deterministic tooling:** Offer models deterministic tools for all imaginable tasks; prefer tools over free-form guessing.                                                                   |
| GP-004 | **Opinionated SDD:** Spec Driven Development is mandatory for new features — [`SPEC_DRIVEN_DEVELOPMENT.md`](SPEC_DRIVEN_DEVELOPMENT.md) (Intent / Boundaries / Acceptance + tests + CLI E2E). |

## Internal artifact naming

| ID       | Rule                                                                                                                                                                                                                                                               |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NAME-001 | Timestamped filenames: `PLAN_`, `ANALYSIS_`, `REPORT_`, `SPEC_`, `RUNBOOK_`, `INDEX_` + `YYYYMMDDTHHMMSSZ` + `_TOPIC` (TECH-011).                                                                                                                                  |
| NAME-002 | No spaces or accents in generated paths. Prefer `docs/plans/`, `docs/specs/`, `docs/wiki/`.                                                                                                                                                                        |
| NAME-003 | Sausage / recovery scans stay under `.codex-internal/` (gitignored) unless explicitly promoted.                                                                                                                                                                    |
| NAME-004 | CLI short-name candidates under debate (`alc`, `arclc`, `arclen`, `arccont`) — do not silently rename; consult [`docs/plans/ANALYSIS_20260730T140600Z_CLI_NAME_PROPOSALS.md`](docs/plans/ANALYSIS_20260730T140600Z_CLI_NAME_PROPOSALS.md) and announce on the bus. |
| NAME-005 | Product display name: **ArclengthContinuation** / **Arclength Continuation**; package scope `@arclength-continuation/*`.                                                                                                                                           |

## Git and recovery

- Preserve existing branches, stashes, worktrees, and untracked files until their role is explicitly decided.
- Resolve merge conflicts interactively with `git mergetool`; do not resolve them autonomously.
- Record branch, commit, remote, and worktree state in timestamped repository ledgers before consolidation decisions.
- Do not use force options, history rewrites, destructive resets, broad cleans, or destructive merges without explicit approval.

## Specification and verification

`SPEC_DRIVEN_DEVELOPMENT.md` is authoritative for new feature work (GP-004 — opinionated SDD). New implementation work requires an Intent/Boundaries/Acceptance specification, tests, and a passing CLI E2E contract before it is described as complete. Design choices should favor **local-first models**, **SLM-friendly multi-step planning**, and **deterministic tooling** (see Guiding principles GP-001..GP-003).

## Documentation

- Keep durable plans and reports under timestamped `docs/` paths.
- Maintain the repository ledger and the Zim navigation layer under `docs/plans/` and `docs/wiki/`.
- Preserve existing product documentation and user-authored dirty work; add successor records instead of overwriting prior evidence.
- Product visual identity: [`docs/PRODUCT_IDENTITY.md`](docs/PRODUCT_IDENTITY.md).

## Communication — open items (COMM-OPEN)

| ID            | Rule                                                                                                                                                                                                                   |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| COMM-OPEN-001 | When reporting **open / pending / backlog** items (P-ids, BL-ids, demand tables), **each open row must explain** what it is, why it is still open, and what “done” looks like. Bare IDs or labels alone are forbidden. |
| COMM-OPEN-002 | Closed items may stay terse. If a prior message listed open items without explanation, fix that in the same or next status reply.                                                                                      |
| COMM-OPEN-003 | Cursor always-apply rule: [`.cursor/rules/open-items-explained.mdc`](.cursor/rules/open-items-explained.mdc). P7 detail: `.local/plans/EXPLAIN_20260731T193500Z_P7_CONTINUE_BRAND.md`.                                 |
