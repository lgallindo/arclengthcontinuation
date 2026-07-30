# Round 1 — Morphology and etymology

| Field      | Value                                                                         |
| :--------- | :---------------------------------------------------------------------------- |
| Round      | 01                                                                            |
| Written at | `2026-07-30T00:20:00Z`                                                        |
| Question   | What are the pieces of “Arclength Continuation”, and where do they come from? |

## 1.1 Segmentation table

| ID    | Token        | Segment                                            | Morphological class           | Notes                                                                                               |
| :---- | :----------- | :------------------------------------------------- | :---------------------------- | :-------------------------------------------------------------------------------------------------- |
| M-001 | Arclength    | `arc` + `length`                                   | Noun–noun compound (closed)   | English often writes _arc length_ (open) in math; _arclength_ (closed) is also attested in numerics |
| M-002 | Continuation | `continuation`                                     | Derived noun                  | Action/result noun from _continue_                                                                  |
| M-003 | Full phrase  | `Arclength` + `Continuation`                       | Two-word proper name          | Head is _Continuation_; _Arclength_ is attributive/specifier                                        |
| M-004 | Repo slug    | `arclength-continuation`                           | kebab-case compound           | Hyphen joins the two lexical words                                                                  |
| M-005 | Package-ish  | `ArclengthContinuation` / `arclength-continuation` | Pascal / kebab                | Camel concatenates without hyphen                                                                   |
| M-006 | CLI          | `alc`                                              | Initialism / syllabic acronym | **A**rc**l**ength **C**ontinuation → _alc_ (not _ac_)                                               |

## 1.2 Etymology of constituents

| ID    | Lexeme                | Etymology (compressed)                                                                                                                                                                            | Sense retained in brand                                                                                               |
| :---- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| E-001 | _arc_                 | ME/OF _arc_ ← Lat. _arcus_ “bow, arch”; geometric “part of a curved line” from late 14c.                                                                                                          | Curve / path geometry                                                                                                 |
| E-002 | _length_              | OE _lengðu_ ← PGmc _langitho_ (_langaz_ “long” + abstract _-itho_)                                                                                                                                | Measure along a curve (not Euclidean chord)                                                                           |
| E-003 | _continuation_        | late 14c. ← OF _continuation_ / Lat. _continuatio_ “a following of one thing after another” ← _continuare_ “join together” ← _continuus_ ← _continere_ “hang together” (_com-_ + _tenere_ “hold”) | Prolongation; keeping a trajectory going                                                                              |
| E-004 | _continue_ (contrast) | Same Latin root family as _continuation_                                                                                                                                                          | Upstream product name “Continue” sits on the verb; this fork names the **noun of process** plus a technical specifier |

## 1.3 Compounding analysis

| ID    | Observation                                                                                        | Implication                                                            |
| :---- | :------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| C-001 | _arc length_ is a classical mathematical phrase (integral of √(1+(y′)²) ds, etc.)                  | Brand borrows a frozen technical idiom                                 |
| C-002 | Closing the space (_arclength_) is common in software/numerics identifiers                         | Signals “term of art” more than casual English                         |
| C-003 | _Continuation_ as second word echoes **numerical continuation**, not only “keep coding”            | Double allusion: product lineage (Continue) + scientific method        |
| C-004 | Order is _Arclength_ then _Continuation_, matching the scientific phrase _arc-length continuation_ | Head-final English NP with left modifier = technical collocation order |

## 1.4 Stress and pronunciation (working)

| ID    | Form            | Likely stress             | Risk                                                                   |
| :---- | :-------------- | :------------------------ | :--------------------------------------------------------------------- |
| P-001 | Arclength       | ARC-length                | Misread as _ark-length_ (harmless)                                     |
| P-002 | Continuation    | con-tin-u-A-tion          | Long; hard for CLI spoken UX                                           |
| P-003 | alc             | /ælk/ or /ɑːlk/           | Collides with English _alk-_ chemistry prefix in speech; visually fine |
| P-004 | Full name aloud | “arc-length continuation” | Matches literature if hyphen/space restored in speech                  |

## 1.5 Round-1 open questions (fed to later rounds)

| ID     | Question                                                                          |
| :----- | :-------------------------------------------------------------------------------- |
| Q1-001 | Is the scientific collocation spelled _arc-length_, _arc length_, or _arclength_? |
| Q1-002 | Does the brand intend the **pseudo-arclength** sense specifically?                |
| Q1-003 | How should Title Case vs kebab vs Pascal be standardized in docs?                 |
