# Round 4 — In-repository corpus

| Field      | Value                                                                                            |
| :--------- | :----------------------------------------------------------------------------------------------- |
| Round      | 04                                                                                               |
| Written at | `2026-07-30T00:35:00Z`                                                                           |
| Question   | Which forms of the name are actually attested in this tree, and where do inconsistencies remain? |

## 4.1 Attested forms (working inventory)

| ID       | Form                       | Typical loci                                         | Role                             |
| :------- | :------------------------- | :--------------------------------------------------- | :------------------------------- |
| CORP-001 | `arclength-continuation`   | npm scopes, domains, package names                   | Machine identity                 |
| CORP-002 | `arclengthcontinuation`    | GitHub repo name (`lgallindo/arclengthcontinuation`) | Host slug (no hyphen)            |
| CORP-003 | `ArclengthContinuation`    | CLI help text (“ArclengthContinuation CLI”)          | Concatenated display in TUI/help |
| CORP-004 | `Arclength`                | Logo wordmark, cropped run config                    | Short brand                      |
| CORP-005 | `alc`                      | Binary, docs examples, skill                         | CLI ergonym                      |
| CORP-006 | `Arclength Continuation`   | Sparse in prose; dossier recommends increasing       | Preferred human display          |
| CORP-007 | `Continue` / `continuedev` | Many docs, cookbooks, Tier C URLs                    | Upstream residue                 |

## 4.2 Orthographic inconsistency table

| ID      | Observed pair                                                                 | Tension                                | Suggested norm                                              |
| :------ | :---------------------------------------------------------------------------- | :------------------------------------- | :---------------------------------------------------------- |
| INC-001 | GitHub `arclengthcontinuation` vs npm `@arclength-continuation`               | Hyphen present only in scoped packages | Document both; do not “fix” GitHub slug casually            |
| INC-002 | Help string `ArclengthContinuation CLI` vs display `Arclength Continuation`   | Camel vs spaced                        | Prefer spaced in prose; camel OK in identifiers             |
| INC-003 | Path `~/code/foss/arclength-continuation` vs research `arclengthcontinuation` | Directory naming differs               | Foss uses hyphen; research omits — historical dual checkout |
| INC-004 | Skill/docs still narrate “Continue” product chrome                            | Brand lag                              | Tier C / IMG-005 backlog                                    |

## 4.3 Dual-checkout naming

| ID     | Checkout | Directory name           | Notes                                   |
| :----- | :------- | :----------------------- | :-------------------------------------- |
| DC-001 | Foss     | `arclength-continuation` | Hyphenated; matches npm-ish orthography |
| DC-002 | Research | `arclengthcontinuation`  | Matches GitHub repo slug orthography    |

Philologically, both are valid compressions of the same two-word name; the hyphen encodes the word boundary that GitHub’s slug deletes.

## 4.4 Morphological kinship still visible

| ID      | Residue                                   | Reading                                                           |
| :------ | :---------------------------------------- | :---------------------------------------------------------------- |
| KIN-001 | `Continuation` in the full name           | Keeps Latin _continuare_ family shared with “Continue”            |
| KIN-002 | Former CLI `cn`                           | Was an opaque Continue digraph; replaced by transparent-ish `alc` |
| KIN-003 | Config dirs still `~/.continue` in places | Deep path compatibility; lexical lag                              |

## 4.5 Corpus frequency snapshot (`2026-07-30T00:35:00Z`)

Ripgrep over foss tree excluding `node_modules`, `dist`, `.gradle-home`, `.codex-internal`, lockfiles:

| ID       | Form                                      | Approx. hits |
| :------- | :---------------------------------------- | -----------: |
| FREQ-001 | `arclength-continuation`                  |         3239 |
| FREQ-002 | `ArclengthContinuation`                   |         1343 |
| FREQ-003 | `alc`                                     |          439 |
| FREQ-004 | `Arclength`                               |          222 |
| FREQ-005 | `arclengthcontinuation`                   |            4 |
| FREQ-006 | `Arclength Continuation` (spaced display) |            1 |

**Reading:** Machine kebab and Pascal dominate; the recommended spaced display name is nearly absent in-tree — a documentation debt called out in Round 5 (POL-001 / W-001).
