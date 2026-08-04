# Ledger — pending / plans / proposals / debt / warnings

| Field        | Value                                                                                                                              |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| Ledger ID    | `LEDGER_20260804T173824Z_PENDING_DEBT_FROM_CONVERSATION`                                                                           |
| Derived from | [`CONVERSATION_20260804T173824Z_REBRAND_P6_CLOSEOUT_MINUTIAE.md`](./CONVERSATION_20260804T173824Z_REBRAND_P6_CLOSEOUT_MINUTIAE.md) |
| Written at   | `2026-08-04T17:40:48Z`                                                                                                             |
| Rule         | COMM-OPEN: each open row explains what / why open / done-looks-like                                                                |

## Open items

| ID             | What                                                                                                                                         | Why open                                                                                                           | Done looks like                                                                                                                              | Source demands        |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- |
| P7             | Continue brand residue: docs/cookbooks, IntelliJ `continuedev` IDs, `@continuedev` packages, Continue chrome screenshots vs PRODUCT_IDENTITY | Deferred after CLI/Tier A/banners; marketplace ID blast radius; provenance must keep historical Continue citations | Arclength-first UX; Continue only as explicit upstream attribution; screenshots match identity or archived; IDE ID plan agreed before change | D24, D30, D42         |
| P8-B           | Test fixtures with fake absolute paths (`/home/user` etc.) from path Tier B                                                                  | Deferred by design in original path scan — portable fakes, not machine paths                                       | Documented as intentional OR normalized to repo-relative temps where tests allow                                                             | D5, D24, D30          |
| P8-C           | Docs URLs still pointing at `github.com/continuedev/continue` (~32 Tier C rows)                                                              | Docs-provenance pass not executed; overlaps P7/BL-001                                                              | Install/clone URLs prefer `lgallindo/arclengthcontinuation`; Continue links only as cited upstream                                           | D5, D24, D30, D42     |
| BL-002         | Remaining Continue-branded screenshots/icons (IMG-005)                                                                                       | Subset of P7 media work; not batched after D30                                                                     | IMG-005 inventory cleared or archived under media/\_stash with Arclength replacements                                                        | D9, D26               |
| BL-003         | Docs image hash dedup (IMG-006)                                                                                                              | Never started in this conversation                                                                                 | Duplicate image assets consolidated with provenance note                                                                                     | D9                    |
| BL-004         | Decide whether API path `/cn/info` becomes `/alc/info` or `/arclen/info`                                                                     | Explicit backlog; not decided                                                                                      | ADR + code/docs aligned to chosen path                                                                                                       | Rebrand report BL-004 |
| BL-005         | Optional thin `cn` shim                                                                                                                      | Explicitly not planned by default                                                                                  | Shim shipped **or** permanently rejected in ADR                                                                                              | Rebrand report BL-005 |
| IDEAL-IDEOGRAM | Human Ideogram 3 batch at true 3:1 / ~4:1 using natural-bg prompts                                                                           | In-agent used Cursor gen; Ideogram UI never run as final authority                                                 | Ideogram exports QA'd and optionally replace D30 if superior                                                                                 | D17–D19, D26          |
| RETIRED-TREE   | `~/code/research/_retired/arclengthcontinuation-20260731T185646Z` still on disk                                                              | Retired by move, not deleted                                                                                       | Delete only with explicit path+command authorization, or keep as cold archive                                                                | D41                   |
| DOC-THIS       | Conversation minutiae + ledger + AGENTS/README index                                                                                         | **Closed** in this commit                                                                                          | Files on disk, indexed, committed+pushed                                                                                                     | D44                   |

## Plans / proposals (active references)

| Artifact          | Role                      | Location                                                          |
| :---------------- | :------------------------ | :---------------------------------------------------------------- |
| P6 minutiae       | Closeout board (complete) | `.local/plans/PLAN_20260730T182810Z_P6_DUAL_CHECKOUT_MINUTIAE.md` |
| Ideogram prompts  | Gen prompts + natural bg  | `.local/plans/PLAN_20260730T171608Z_BANNER_PROMPTS_IDEOGRAM-3.md` |
| P7 explainer      | Continue brand debt       | `.local/plans/EXPLAIN_20260731T193500Z_P7_CONTINUE_BRAND.md`      |
| P8 explainer      | Path tiers B/C            | `.local/plans/EXPLAIN_20260731T193500Z_P8_PATH_TIERS.md`          |
| PRODUCT_IDENTITY  | Apps+README identity      | `docs/PRODUCT_IDENTITY.md`                                        |
| CLI name analysis | `arclen` choice           | `.local/plans/ANALYSIS_20260730T140600Z_CLI_NAME_PROPOSALS.md`    |

## Technical debt (conversation-derived)

| ID     | Debt                                                                | Severity           | Notes                                          |
| :----- | :------------------------------------------------------------------ | :----------------- | :--------------------------------------------- |
| TD-001 | Continue product naming across docs/IDE                             | High (user-facing) | = P7                                           |
| TD-002 | Tier C upstream URLs in docs                                        | Medium             | = P8-C                                         |
| TD-003 | Tier B absolute path fixtures                                       | Low                | = P8-B                                         |
| TD-004 | Gitignored sausage sprawl under `.local/` and retired tree          | Low/ops            | Intentional; index in `.local` READMEs         |
| TD-005 | `git status --ignored` / large-tree hangs on WSL                    | Medium/ops         | Prefer narrow status; avoid ignored scans      |
| TD-006 | Nested `package.json` inside `.codex-internal` triggers lint-staged | Medium/ops         | Mitigated via `.lintstagedrc.cjs`              |
| TD-007 | Workflows disabled under `.github/workflows.disabled/`              | Medium             | Pre-existing; not re-enabled this conversation |

## Warnings (standing)

| ID       | Warning                                                   | Mitigation                                     |
| :------- | :-------------------------------------------------------- | :--------------------------------------------- |
| WARN-001 | No `--force` / no squash / no autonomous conflict resolve | SAFE-\* rules; mergetool or explicit keep-both |
| WARN-002 | Do not restyle lgallindo.github.io with product identity  | SITE-003 / PRODUCT_IDENTITY scope              |
| WARN-003 | Do not recreate dual foss/research checkouts casually     | Research retired; PROJECT_RULES scope          |
| WARN-004 | Open items without explanation violate COMM-OPEN          | Always-apply Cursor rule                       |

## Closed in this conversation (summary)

CLI rename chain, Tier A paths, LFS banners, D30 crops on select-stash, P6 merge+retire, COMM-OPEN documentation, agent bus usage.
