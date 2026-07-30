# Round 3 — Brand orthography and semantics

| Field      | Value                                                                         |
| :--------- | :---------------------------------------------------------------------------- |
| Round      | 03                                                                            |
| Written at | `2026-07-30T00:30:00Z`                                                        |
| Question   | How should the name be written, shortened, and distinguished from “Continue”? |

## 3.1 Canonical form matrix

| ID    | Context           | Recommended form                                   | Avoid                                                                 |
| :---- | :---------------- | :------------------------------------------------- | :-------------------------------------------------------------------- |
| O-001 | Marketing / H1    | **Arclength Continuation**                         | “Arc Length Continuation” (unless teaching the math)                  |
| O-002 | GitHub org/repo   | `arclengthcontinuation` / `arclength-continuation` | Spaces                                                                |
| O-003 | npm / packages    | `@arclength-continuation/...`                      | `@continuedev/...`                                                    |
| O-004 | Camel identifiers | `ArclengthContinuation`                            | `ArcLengthContinuation` _unless_ API already uses that; be consistent |
| O-005 | CLI binary        | `alc`                                              | `cn` (retired); `ac` (ambiguous)                                      |
| O-006 | Short spoken      | “ALC” or “alc”                                     | Spelling out full name every time                                     |
| O-007 | Adjective         | “Arclength” (e.g. Arclength CLI)                   | “Arclengthian”                                                        |

## 3.2 Spacing and capitalization tensions

| ID    | Variant                 | Pros                                                       | Cons                                               |
| :---- | :---------------------- | :--------------------------------------------------------- | :------------------------------------------------- |
| V-001 | Arclength Continuation  | Matches closed technical _arclength_; clean two-word brand | Looks slightly “Germanic compound” to some editors |
| V-002 | Arc-Length Continuation | Emphasizes math hyphenation                                | Heavier punctuation; rarer in UIs                  |
| V-003 | Arc Length Continuation | Most “English”                                             | Weakens term-of-art signal; longer                 |
| V-004 | ArclengthContinuation   | Good for types/classes                                     | Bad for prose headlines                            |

**Recommendation:** Keep **Arclength Continuation** as display name; kebab `arclength-continuation` for paths; `alc` for CLI.

## 3.3 Relation to upstream “Continue”

| ID      | Dimension             | Continue                    | Arclength Continuation                                                                        |
| :------ | :-------------------- | :-------------------------- | :-------------------------------------------------------------------------------------------- |
| REL-001 | Part of speech        | Imperative / bare verb feel | Nominal process + technical specifier                                                         |
| REL-002 | Semantic center       | “keep going” (general)      | “keep going _along a path measured by arc length_” (specific metaphor)                        |
| REL-003 | CLI legacy            | `cn` (Continue)             | `alc`                                                                                         |
| REL-004 | Continuity of lineage | —                           | Word _Continuation_ preserves morphological kinship with _Continue_ without claiming identity |

## 3.4 Phonology / usability of `alc`

| ID    | Check                          | Finding                                                                                                                                                          |
| :---- | :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| U-001 | Length                         | 3 letters — excellent for CLI                                                                                                                                    |
| U-002 | Collision with Tailwind `cn()` | Avoided by leaving util named `cn`                                                                                                                               |
| U-003 | Collision with other CLIs      | `alc` uncommon; watch local aliases                                                                                                                              |
| U-004 | Letter selection               | A-r-c-**l**-ength **C**-ontinuation → _alc_ uses L from _length_, not second C from _Continuation_ only — actually A+L+C from **A**rc**l**ength **C**ontinuation | Intentional letter pick from first word’s consonants + second word’s C |

Letter recipe detail:

| Letter | Source                                              |
| :----- | :-------------------------------------------------- |
| `a`    | **A**rclength                                       |
| `l`    | arc**l**ength (not “c” from arc — would yield `ac`) |
| `c`    | **C**ontinuation                                    |

## 3.5 Semantic frame (FrameNet-ish)

| ID    | Frame element | Filled by                                             |
| :---- | :------------ | :---------------------------------------------------- |
| F-001 | Path          | Developer task / solution curve                       |
| F-002 | Traveler      | Agent / user session                                  |
| F-003 | Measure       | “Arc length” = progress metric along path             |
| F-004 | Obstacle      | Singularities / folds ≈ hard bugs, ambiguous specs    |
| F-005 | Method        | Continuation (augment & step) ≈ tool-using agent loop |
