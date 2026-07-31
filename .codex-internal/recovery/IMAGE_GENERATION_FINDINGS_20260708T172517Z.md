# Image Generation Findings - 20260708T172517Z

<!-- MARKER_BEGIN -->
marker_id: mrk_image_generation_findings_20260708t172517z
scope: path
target: .codex-internal/recovery/IMAGE_GENERATION_FINDINGS_20260708T172517Z.md
classification_state: internal (sausage making), local-only, git-excluded
marked_at: 2026-07-08T17:25:17Z
updated_at: 2026-07-08T17:25:17Z
performer_id: codex-cli
rationale: Preserve recalled image-generation workflow and generated asset provenance for README rebranding work.
notes: Uses metadata from Codex rollouts, generated image cache, and repo sidecars; do not publish until image/license review is complete.
<!-- MARKER_END -->

## Findings

- Codex recorded seven `image_generation_call` items in the recovered `019f3d9f...` rollout.
- The first was a five-panel comparison sheet concept generated on 2026-07-07T23:00:33Z and cached as `ig_0ca22f...png`; it appears exploratory and was not copied into the final six-proposal repo folder.
- Six later calls on 2026-07-08 produced README banner proposals: Branch Atlas, Fold Crossing, Predictor Corrector Garden, Bifurcation Blueprint, Keller Path, and Solution Landscape.
- The workflow analyzed `media/github-readme.png` first: 2176 x 544, pale architectural watercolor/ink style, blue-violet organic canopy, rectilinear scaffolding, no text.
- The semantic target shifted from generic growth/architecture to pseudo-arclength continuation: branch following through folds, predictor-corrector steps, bifurcation diagrams, solution landscapes, and faint CLI/VS Code/JetBrains surfaces.
- The generated PNGs were copied from `~/.codex/generated_images/019f3d9f...` into `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/*` with prompt/dimension/hash sidecars.
- A deterministic contact sheet was made with ImageMagick `montage` into `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/contact-sheet/six-proposals-side-by-side.png`.
- Best candidates by semantic fit from the recorded prompts: `Fold Crossing` for literal pseudo-arclength continuation through a fold; `Bifurcation Blueprint` for product architecture; `Branch Atlas` for a calm primary brand visual.

## Generated Calls

| Timestamp | ID | Prompt SHA-256 | Concept From Prompt |
| --- | --- | --- | --- |
| 2026-07-07T23:00:33.779Z | `ig_0ca22f89dd6b8636016a4d84db67608191818809c0f0dbc5d3` | `2dda539385e46e0878bd55208ef9663ebd072f1d736a04f56ef95907d06d8b0b` | five-panel comparison sheet |
| 2026-07-08T16:34:22.291Z | `ig_024bde4a97e9f320016a4e7bd5a6988191b1109ea1079ecb11` | `38a673b21c3c4b505dc8e3766809d70479db132baf6a4b78e1d6997cc8ee6089` | Branch Atlas |
| 2026-07-08T16:35:25.154Z | `ig_024bde4a97e9f320016a4e7c0d47fc8191a9d6132ce79b81c5` | `8c12b7a204dccf1a5caa5bb213fe0ed05a1ad29a8e304f7e0a14c1b492a8fb70` | Fold Crossing |
| 2026-07-08T16:36:25.743Z | `ig_024bde4a97e9f320016a4e7c4c3b30819186e034e76efdad5c` | `9c22d160965572996885dc57b640df7f0b2e9ccfd21eeb7a600ec92e45a8841c` | Predictor Corrector Garden |
| 2026-07-08T16:38:08.843Z | `ig_024bde4a97e9f320016a4e7c8892248191b5d736a54aacd120` | `7ec5febe38dfec5e4ae55b33d9a61cbbb44175ef89faeeebad5a87e829b303ba` | Bifurcation Blueprint |
| 2026-07-08T16:39:16.214Z | `ig_024bde4a97e9f320016a4e7cefdcec819199a6f9c091085f58` | `6bfc855191b8e2933c31a7fd31b89cc19405b24a17c1965b44a252475d2df199` | Keller Path |
| 2026-07-08T16:40:15.235Z | `ig_024bde4a97e9f320016a4e7d32d2548191add3d1e2b63422f7` | `e7100f39a169b5d82839a4f3b91cc889a265ddac3a72f20fac1d44a272a8dabe` | Solution Landscape |

## Repo Artifacts

| Path | Size | SHA-256 |
| --- | ---: | --- |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/README.md` | 2598 | `955d65c0e394726af78ef37a19f74b4986fe5315b0e96b5c77b934f657804e2c` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/contact-sheet/six-proposals-side-by-side.png` | 9273215 | `42e0f829291484abc6c081401110bbcf2c435d5e3e14549b893d581e5716bcdd` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/01-branch-atlas/SIDECAR_20260708T132000Z.md` | 1454 | `49338a216f200433f025bc85828006f74c165359d9577c989483dbdac413bfd6` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/01-branch-atlas/branch-atlas.png` | 2543036 | `3e10b7ee0dd27791b6d55f971640b50ac1538758aa96f8f9ad710ca01d5f25cb` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/02-fold-crossing/SIDECAR_20260708T132000Z.md` | 1342 | `90b122bcc08d8099e8ab41f7d1fa6cb02693496743e5cf450816f18e55e7c44f` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/02-fold-crossing/fold-crossing.png` | 2421578 | `2867786a0078f76378e33bf1f83b92f3bf7c2ee561217764171fc2a5fce192d8` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/03-predictor-corrector-garden/SIDECAR_20260708T132000Z.md` | 1402 | `a5a2a33cf8f7c0fcb75e78863fc56c5a6631b53b74881f0862ae23f48e924f21` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/03-predictor-corrector-garden/predictor-corrector-garden.png` | 2698475 | `f3ee264f5adc383b2b395561c4e98e96337620131419b94ab81a6fb9909b9ae7` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/04-bifurcation-blueprint/SIDECAR_20260708T132000Z.md` | 1260 | `1cd0902edd74ab9e38777887835a2604ae0ccfe9ba0afee9ba13cd95505af477` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/04-bifurcation-blueprint/bifurcation-blueprint.png` | 2114171 | `e673af4eb93a760e7092dbae13b80fb75b7a8b1cded198c766b2450e8a9f4b01` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/05-keller-path/SIDECAR_20260708T132000Z.md` | 1317 | `745f5e2e1b2cff915fbfadff2000c32f6fff460fe38afbf62787dff75894519c` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/05-keller-path/keller-path.png` | 2594102 | `4fde160b1c348279d358abad627d9d274310e72f8a2a43fa783c084b29d4612e` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/06-solution-landscape/SIDECAR_20260708T132000Z.md` | 1329 | `341cb11b3e1bd2d9291709741c63af21edb17e2fca907117ca6d79cee0b6ec48` |
| `docs/visual-proposals/20260708T132000Z-readme-arclength-continuation/proposals/06-solution-landscape/solution-landscape.png` | 2924124 | `906857807f1adae0601087e2d3fb6a6e33198482a366edbf91ce11e663723d15` |
