# Round 5 — Synthesis and recommendations

| Field      | Value                                                               |
| :--------- | :------------------------------------------------------------------ |
| Round      | 05                                                                  |
| Written at | `2026-07-30T00:40:00Z`                                              |
| Question   | What is the coherent story of the name, and what should writers do? |

## 5.1 One-sentence philological gloss

| ID      | Gloss                                                                                                                                                                                                                                                                                      |
| :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SYN-001 | **Arclength Continuation** is an English technical compound that grafts the numerics idiom _arclength (pseudo-arclength) continuation_ onto a product lineage morphologically related to _Continue_, yielding a path-tracing metaphor for agentic development and a CLI ergonym **`alc`**. |

## 5.2 Layered meanings

| ID      | Layer        | Content                                                           |
| :------ | :----------- | :---------------------------------------------------------------- |
| LAY-001 | Etymological | _arcus_ + Germanic _length_ + Latin _continuatio_                 |
| LAY-002 | Disciplinary | Numerical continuation past folds via arc-length parameterization |
| LAY-003 | Brand        | Fork identity distinct from Continue.dev while rhyming with it    |
| LAY-004 | Operational  | Binary `alc`, packages `@arclength-continuation/*`                |

## 5.3 Writer’s checklist

| ID    | Do                                                                          | Don’t                                                        |
| :---- | :-------------------------------------------------------------------------- | :----------------------------------------------------------- |
| W-001 | Use **Arclength Continuation** in titles and first mentions                 | Alternate randomly with “Arc Length Continuation”            |
| W-002 | Use `alc` for CLI examples                                                  | Keep teaching `cn` (except migration notes)                  |
| W-003 | Say “fork of Continue” once for provenance                                  | Imply the product _is_ Continue                              |
| W-004 | Spell math references as _pseudo-arclength continuation_ when citing papers | Claim the repo implements Keller/Riks solvers unless it does |

## 5.4 Naming decisions already taken (implementation)

| ID      | Decision                            | Evidence                           |
| :------ | :---------------------------------- | :--------------------------------- |
| DEC-001 | CLI = `alc`                         | Rebrand plan + package.bin         |
| DEC-002 | No default `cn` shim                | CHANGELOG Unreleased breaking note |
| DEC-003 | Display logo wordmark = `Arclength` | docs-site assets                   |

## 5.5 Open naming policy questions

| ID      | Question                                                        | Suggested owner        |
| :------ | :-------------------------------------------------------------- | :--------------------- |
| POL-001 | Standardize help text to “Arclength Continuation CLI” (spaced)? | CLI maintainers        |
| POL-002 | Rename `~/.continue` config root someday?                       | Compatibility council  |
| POL-003 | Align foss directory and research directory orthography?        | Workspace hygiene only |
