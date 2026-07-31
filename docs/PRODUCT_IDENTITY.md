# Product identity — ArclengthContinuation

> For **apps** (CLI / VS Code / JetBrains / GUI) and **`README.md`**.  
> Do **not** apply this look to `https://lgallindo.github.io/` (personal build notes site).

## Sources

| ID      | Artifact                                                                                                                                                                                                                                                                                                                                 |
| :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SRC-001 | [`docs/plans/PLAN_20260730T100600Z_BANNER_REPLACEMENT.md`](plans/PLAN_20260730T100600Z_BANNER_REPLACEMENT.md)                                                                                                                                                                                                                            |
| SRC-002 | [`docs/plans/assets_20260730T140255Z_banners/`](plans/assets_20260730T140255Z_banners/)                                                                                                                                                                                                                                                  |
| SRC-003 | [`media/readme.png`](../media/readme.png) (1500×500) — D30 crop from `proposal_r2_03_path_negative_space.png`                                                                                                                                                                                                                            |
| SRC-004 | [`media/github-readme.png`](../media/github-readme.png) (2176×544) — D30 crop from `proposal_r2_01_arc_linen.png`                                                                                                                                                                                                                        |
| SRC-005 | Stashed early proposals (reference only, not for shipping): [`media/_stash/arclength-proposals-20260731T175706Z/`](../media/_stash/arclength-proposals-20260731T175706Z/)                                                                                                                                                                |
| SRC-006 | Run-2 uncropped generative source (not a ship target): `docs/plans/assets_20260730T172200Z_banner_run2/run2-github-readme-hero.png`                                                                                                                                                                                                      |
| SRC-007 | Palette inspiration (composition retired): `media/_stash/palette-ref-pre-rebrand-20260731T175706Z/` — do **not** use as banner; prefer SRC-004. Token source of truth for neutrals: [`assets_20260731T180400Z_palette_pre_rebrand_exp/palette_swatches.png`](plans/assets_20260731T180400Z_palette_pre_rebrand_exp/palette_swatches.png) |

## Conceptual vocabulary

| ID      | Concept              | Visual                                                 |
| :------ | :------------------- | :----------------------------------------------------- |
| CON-001 | Arc length           | Curve Γ with ds tick marks                             |
| CON-002 | Continuation failure | Fold / cusp on λ                                       |
| CON-003 | Pseudo-arclength     | Path continues past fold; translucent constraint plane |
| CON-004 | Brand                | Quiet wordmark; no Continue hex; no glassmorphism      |

## Look

- Matte pigments (gouache / soft clay / paper) — not glossy SaaS glass
- Shallow pseudo-3D ribbons/planes
- Editorial / gallery poster, not purple gradient flood

## Palette

Derived from [`docs/plans/assets_20260731T180400Z_palette_pre_rebrand_exp/palette_swatches.png`](plans/assets_20260731T180400Z_palette_pre_rebrand_exp/palette_swatches.png) (colors only — pre-rebrand **composition** remains retired). Oxide / Sage kept as functional accents from the matte arc vocabulary (fold / accepted step), since the swatch strip is cool neutrals.

| Token     | Hex       | Use                                      |
| :-------- | :-------- | :--------------------------------------- |
| Paper     | `#E8E2D6` | App / README field (swatch board ground) |
| Parchment | `#D8D8C0` | Soft highlight panels, empty linen feel  |
| Mist      | `#D8D8D8` | Near-white lavender lift                 |
| Silver    | `#C0C0C0` | Cool chrome / secondary rules            |
| Stone     | `#A8A8A8` | Muted UI chrome, disabled text           |
| Ash       | `#909090` | Warm-neutral secondary text              |
| Slate     | `#787890` | Scaffold / constraint plane (was clay)   |
| Haze      | `#9090A8` | Sparse cool wash (was dust violet)       |
| Indigo    | `#606078` | Deep panels, dark ink field              |
| Ink       | `#2C2A28` | Primary type / curves on Paper           |
| Oxide     | `#A65D3F` | Fold / singularity accent only           |
| Sage      | `#7A8F6E` | Accepted-step accent only                |

CRT moodboard (`palette_exp_pre_rebrand_moodboard.png`) stays **experimental** — do not map neon phosphor green/amber into shipping app tokens; Pages Phosphor/Modem themes remain separate from this product identity.

## Apps checklist

- Extension / IDE chrome: Ink on Paper, or Indigo field with Mist/Silver rules; Oxide sparingly
- CLI TUI: prefer Ink / Slate / Sage / Oxide over Continue lavender; avoid CRT neon from moodboard experiments
- Icons/wordmarks: use matte arc vocabulary; keep Continue upstream assets only where legally/historically required and clearly transitional
- README: hero = `media/github-readme.png`; optional secondary = `media/readme.png`
