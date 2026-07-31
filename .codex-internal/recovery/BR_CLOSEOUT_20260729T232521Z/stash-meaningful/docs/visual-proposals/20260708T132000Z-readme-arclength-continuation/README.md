# README Illustration Proposals - 20260708T132000Z

Classification: internal working artifact; candidate images may become shareable after selection and review.

## Source Context

- Existing README image reference: `media/github-readme.png`.
- Existing image properties observed earlier: PNG banner, 2176 x 544, pale architectural watercolor sketch, blue-violet organic canopy, rectilinear scaffold/building forms, no text.
- Semantic gap: the existing image communicates organic growth and structured architecture, but not numerical continuation, CLI/editor surfaces, model discovery, or the ArclengthContinuation product identity.
- Conceptual source used for new prompts: arclength/pseudo-arclength continuation as numerical continuation of nonlinear solution branches through folds/turning points, with historical association to Wempner/Riks/Keller predictor-corrector continuation methods and contemporary use in bifurcation analysis, computational mechanics, PDE/nonlinear systems, and equilibrium/energy-landscape tracing.

## Proposal Index

| ID | Baptized Name | Image | Sidecar |
| --- | --- | --- | --- |
| IMG-001 | Branch Atlas | `proposals/01-branch-atlas/branch-atlas.png` | `proposals/01-branch-atlas/SIDECAR_20260708T132000Z.md` |
| IMG-002 | Fold Crossing | `proposals/02-fold-crossing/fold-crossing.png` | `proposals/02-fold-crossing/SIDECAR_20260708T132000Z.md` |
| IMG-003 | Predictor Corrector Garden | `proposals/03-predictor-corrector-garden/predictor-corrector-garden.png` | `proposals/03-predictor-corrector-garden/SIDECAR_20260708T132000Z.md` |
| IMG-004 | Bifurcation Blueprint | `proposals/04-bifurcation-blueprint/bifurcation-blueprint.png` | `proposals/04-bifurcation-blueprint/SIDECAR_20260708T132000Z.md` |
| IMG-005 | Keller Path | `proposals/05-keller-path/keller-path.png` | `proposals/05-keller-path/SIDECAR_20260708T132000Z.md` |
| IMG-006 | Solution Landscape | `proposals/06-solution-landscape/solution-landscape.png` | `proposals/06-solution-landscape/SIDECAR_20260708T132000Z.md` |

## Deterministic Contact Sheet

- Output: `contact-sheet/six-proposals-side-by-side.png`
- Tool: ImageMagick `montage`
- Command:

```bash
montage proposals/01-branch-atlas/branch-atlas.png proposals/02-fold-crossing/fold-crossing.png proposals/03-predictor-corrector-garden/predictor-corrector-garden.png proposals/04-bifurcation-blueprint/bifurcation-blueprint.png proposals/05-keller-path/keller-path.png proposals/06-solution-landscape/solution-landscape.png -resize x360 -tile 6x1 -geometry +24+24 -background white contact-sheet/six-proposals-side-by-side.png
```

