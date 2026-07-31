# README Image Generation Provenance

Created: 2026-07-08T11:42:00-03:00

## Generated Image

Path:

```text
/home/lugatj/.codex/generated_images/019f3d9f-e72d-74a1-801a-71375544f30c/ig_0ca22f89dd6b8636016a4d84db67608191818809c0f0dbc5d3.png
```

The generated image is a single comparison sheet containing five adjacent README banner concepts. It was meant for side-by-side visual selection, not direct final README use.

## Tool Call

Tool:

```text
image_gen.imagegen
```

Exact input:

```json
{
  "prompt": "Create a single wide comparison sheet with five side-by-side README banner concepts for an open-source AI coding agent fork named ArclengthContinuation. Aspect ratio 5:1, clean technical product design, no logos of real companies, no small unreadable text. Each panel should be labeled with short readable headings: 1 Continuation Manifold, 2 Three Surfaces, 3 Model Discovery Map, 4 Copyleft Workshop, 5 Amiable Editor Citizen. Panel 1: elegant mathematical continuation curve through branching solution paths over faint IDE panels. Panel 2: terminal, code editor side panel, and JetBrains-style tool window connected by shared agent core. Panel 3: local and cloud model endpoint nodes flowing into an editor agent panel. Panel 4: blueprint workshop with copyleft symbol, repo graph, build blocks, restrained. Panel 5: polished editor UI mockup with command palette, model picker, status bar, and friendly chat panel. Use a cohesive palette: off-white, ink blue, slate, teal accents, restrained violet only as accent. Crisp vector-like bitmap illustration, high readability, GitHub README banner style."
}
```

Observed output path was reported by the image generation system as:

```text
/home/lugatj/.codex/generated_images/019f3d9f-e72d-74a1-801a-71375544f30c/ig_0ca22f89dd6b8636016a4d84db67608191818809c0f0dbc5d3.png
```

## Panel Mapping

| Panel | Prompt Clause | What You Are Looking At |
| --- | --- | --- |
| 1 | "Continuation Manifold" and "elegant mathematical continuation curve through branching solution paths over faint IDE panels" | A technical/mathematical ArclengthContinuation identity: continuation curves, solution branches, and faint editor context. |
| 2 | "Three Surfaces" and "terminal, code editor side panel, and JetBrains-style tool window connected by shared agent core" | The project as three agent surfaces: CLI, VS Code, and JetBrains sharing one agent core. |
| 3 | "Model Discovery Map" and "local and cloud model endpoint nodes flowing into an editor agent panel" | Model discovery and routing: local/cloud endpoints feeding an IDE agent UI. |
| 4 | "Copyleft Workshop" and "blueprint workshop with copyleft symbol, repo graph, build blocks, restrained" | Repository governance, relicensing, build pipeline, and copyleft posture. |
| 5 | "Amiable Editor Citizen" and "polished editor UI mockup with command palette, model picker, status bar, and friendly chat panel" | The target UX for the VS Code extension: model picker, command palette integration, and a friendly editor-native chat surface. |

## Keep Doing This

For every generated visual asset, keep a provenance note with:

- exact tool name
- exact prompt/input JSON
- output path
- intended usage
- mapping between prompt clauses and visible elements
- whether the output is final, candidate, or rejected
