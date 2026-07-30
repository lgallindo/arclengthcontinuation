# Round 2 — Mathematical / technical terminology

| Field      | Value                                                                                                |
| :--------- | :--------------------------------------------------------------------------------------------------- |
| Round      | 02                                                                                                   |
| Written at | `2026-07-30T00:25:00Z`                                                                               |
| Question   | What does “arc-length continuation” mean in scientific English, and how does that license the brand? |

## 2.1 Technical definition table

| ID    | Term                                       | Definition (working)                                                                                               | Relation to brand                                         |
| :---- | :----------------------------------------- | :----------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| T-001 | Numerical continuation                     | Family of algorithms that trace solution curves of parameterized nonlinear systems F(u, λ)=0 from a known point    | Broader genus                                             |
| T-002 | Parameter continuation                     | Advance by stepping the parameter λ; fails at folds where Jacobian in u is singular                                | Naive baseline                                            |
| T-003 | Arc-length / pseudo-arclength continuation | Reparameterize by path length s (or a pseudo-arclength proxy) so both u and λ depend on s; can pass turning points | **Exact scientific namesake** of the product phrase       |
| T-004 | Arc-length constraint                      | Extra equation (e.g. orthogonality to tangent / fixed step in augmented space) closing the Newton system           | Metaphor: “constraint that keeps progress along the path” |

## 2.2 Literature orthography sample

| ID    | Source                             | Spelling observed                                                     | Notes                                     |
| :---- | :--------------------------------- | :-------------------------------------------------------------------- | :---------------------------------------- |
| L-001 | Wikipedia _Numerical continuation_ | “pseudo-arclength continuation”                                       | Hyphen after _pseudo_; _arclength_ closed |
| L-002 | arXiv math/0603716                 | “pseudo-arclength continuation”                                       | Same closed _arclength_                   |
| L-003 | FEniCS-arclength (JOSS)            | “arclength” in package name; “arclength method / constraint” in prose | Software prefers closed form              |
| L-004 | Tutorial pages (e.g. eigennan)     | “arclength continuation”                                              | Closed compound as title                  |

**Finding:** In computational literature, **closed** _arclength_ (often with _pseudo-_) is normal; open _arc length_ remains common in pure math exposition. The brand’s _Arclength_ matches the software/numerics spelling convention.

## 2.3 Metaphor mapping (product ← method)

| ID      | Method notion                             | Product reading                                                   |
| :------ | :---------------------------------------- | :---------------------------------------------------------------- |
| MAP-001 | Trace a solution curve past singularities | Keep an agentic coding session progressing past hard points       |
| MAP-002 | Augment state with the parameter          | Treat “code + goal/context” as one continued state                |
| MAP-003 | Step in path length, not raw parameter    | Progress measured by work along the trajectory, not a single dial |
| MAP-004 | Name contains _Continuation_              | Soft nod to upstream **Continue** while specializing the metaphor |

## 2.4 Risks of the technical allusion

| ID    | Risk                                                                      | Severity   | Mitigation                                     |
| :---- | :------------------------------------------------------------------------ | :--------- | :--------------------------------------------- |
| R-001 | Audience without numerics background hears only “long curve + keep going” | Low        | Acceptable folk reading                        |
| R-002 | Experts expect a numerical library, not a coding agent                    | Medium     | Tagline / README must disambiguate domain      |
| R-003 | _Pseudo-_ is often part of the full term; brand omits it                  | Low        | Brand is evocative, not a paper title          |
| R-004 | Collision with other “Arclength” math packages                            | Low–medium | Distinct second word _Continuation_ + org slug |

## 2.5 Answers to Round-1 questions

| ID     | Answer                                                                                                                 |
| :----- | :--------------------------------------------------------------------------------------------------------------------- |
| Q1-001 | Literature: mostly _arclength_ or _pseudo-arclength_; math prose may use _arc length_. Brand closed form is justified. |
| Q1-002 | Strongly evokes pseudo-arclength continuation even without _pseudo-_ in the name.                                      |
| Q1-003 | Deferred to Round 3.                                                                                                   |
