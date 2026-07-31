# PLAN: Proposal sheet refresh toward run2 hero

| Field      | Value                                              |
| :--------- | :------------------------------------------------- |
| Plan ID    | `PLAN_20260731T175706Z_PROPOSALS_TOWARD_RUN2_HERO` |
| Written at | `2026-07-31T17:57:06Z`                             |
| Status     | Planned — assets stashed, not regenerated yet      |

## Context

- Early `media/arclength-proposals/` (proposal_1..6 + sheet) were **not bad / not good** for brand.
- Stashed (not ditched) at `media/_stash/arclength-proposals-20260731T175706Z/`.
- Visual north star: **`docs/plans/assets_20260730T172200Z_banner_run2/run2-github-readme-hero.png`** (1536×1024 uncropped) — linen/natural field, matte arc vocabulary, quiet editorial poster.

## Where the uncropped hero was planned

| Asset                                     | Role                                                                           |
| :---------------------------------------- | :----------------------------------------------------------------------------- |
| `run2-github-readme-hero.png` (1536×1024) | **Generative source** for README hero                                          |
| `run2-github-readme-2176x544-crop.png`    | **Shipped** CAN-002 / `media/github-readme.png` / Pages banner                 |
| Uncropped itself                          | **Not** a separate publish target — crop/resize into 2176×544 for README/Pages |

So: awesome uncropped image → feed the **hero crop** pipeline; do not publish 1536×1024 as the GitHub README banner.

## Goal for new proposals

Produce a new proposal sheet **closer to run2 hero** than to the stashed sheet:

1. Background: unbleached linen / pulp grain (match run2 prompts), no busy landscape.
2. Subjects: single strong arc-length / continuation motif (not six competing layouts).
3. Palette: matte ink / clay / oxide aligned with PRODUCT_IDENTITY; optionally **borrow color relationships** from retired pre-rebrand hero (palette-ref only under `media/_stash/palette-ref-pre-rebrand-*`) without reusing that composition.
4. Output: 3–5 candidates + one contact sheet; winners still must crop to **2176×544** (hero) and **1500×500** (wordmark) before replacing `media/*`.

## Non-goals

- Restyle lgallindo.github.io with ArcLength matte brand.
- Shipping pre-rebrand or stashed proposal PNGs as live banners.

## Next actions (when approved)

1. Draft Ideogram/Cursor prompts referencing run2 hero + PRODUCT_IDENTITY tokens.
2. Generate proposal batch into `docs/plans/assets_<TS>_proposals_run2_close/`.
3. Human pick → crop → QA → LFS `media/*` + Pages sync.
