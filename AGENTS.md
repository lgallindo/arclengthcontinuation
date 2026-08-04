# AGENTS.md

Agent entrypoint for **ArclengthContinuation** (`~/code/foss/arclength-continuation`).

## Bootstrap

1. Read [`PROJECT_RULES.md`](PROJECT_RULES.md) (BUS-_, SITE-_, GP-_, NAME-_, COMM-OPEN-\*).
2. Tail [`docs/plans/AGENT_BUS.jsonl`](docs/plans/AGENT_BUS.jsonl) (last ~30 lines). Protocol: [`docs/plans/AGENT_BUS_README.md`](docs/plans/AGENT_BUS_README.md).
3. For brand/UI/README work: [`docs/PRODUCT_IDENTITY.md`](docs/PRODUCT_IDENTITY.md).
4. Workspace protocol (when under `~/code`): [`~/code/AGENTS.md`](../../AGENTS.md) and [`~/code/PROJECT_RULES.md`](../../PROJECT_RULES.md).
5. CLI package notes: [`extensions/cli/AGENTS.md`](extensions/cli/AGENTS.md).

## Conversation index

| ID         | Document                                                                                                                                               | Role                                                                                             |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| CONV-001   | [`docs/plans/CONVERSATION_20260804T173824Z_REBRAND_P6_CLOSEOUT_MINUTIAE.md`](docs/plans/CONVERSATION_20260804T173824Z_REBRAND_P6_CLOSEOUT_MINUTIAE.md) | Full minutiae log of the Jul 29–Aug 4 rebrand / P6 conversation (all user demands + resolutions) |
| LEDGER-001 | [`docs/plans/LEDGER_20260804T173824Z_PENDING_DEBT_FROM_CONVERSATION.md`](docs/plans/LEDGER_20260804T173824Z_PENDING_DEBT_FROM_CONVERSATION.md)         | Pending items, plans, proposals, technical debt, and warnings derived from CONV-001              |

**COMM-OPEN:** When listing open/pending items, each open row must explain what / why open / done-looks-like (see `.cursor/rules/open-items-explained.mdc`).

## Standing constraints

- No `--force`, no squash/ff merge without explicit authorization; conflicts → `git mergetool` unless user gives an explicit resolution (e.g. keep-both).
- Do not restyle https://lgallindo.github.io/ with product identity (SITE-003).
- Research dual-checkout was retired under `~/code/research/_retired/`; do not recreate without authorization.
