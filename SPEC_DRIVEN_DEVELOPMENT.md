# Spec Driven Development (minimal variant)

> Canonical SDD source for this repository (CORE-008 / PLAN-005).
> Adopted 2026-07-24 from the proven variant in the operator's infrastructure
> workspace: **OpenSpec-style three-section specs** + **spec-anchored**
> enforcement via TDD/E2E harness — not full GitHub Spec Kit / Kiro / Tessl.

## Why this variant

Full Spec Kit (specify → clarify → plan → tasks → implement) is heavy for
focused feature work. The lightest durable pattern (2026 write-ups):

1. One short Markdown spec with **Intent / Boundaries / Acceptance**.
2. Spec and code evolve together (**spec-anchored**), with automated tests as
   the enforcer.
3. No CLI toolkit, no multi-phase gate scripts, no generated task trees unless
   a feature outgrows one page.

## Required artifacts per new feature

| Artifact                 | Path pattern                                                             | Required?                |
| ------------------------ | ------------------------------------------------------------------------ | ------------------------ |
| Feature SPEC             | `docs/specs/SPEC_<UTC>_<NAME>.md`                                        | Yes                      |
| Failing test first (TDD) | Vitest `*.test.ts` beside the code under test                            | Yes                      |
| Implementation           | Minimal change satisfying the spec                                       | Yes                      |
| Automated E2E            | `extensions/cli/e2e/*.sh` (or suite-appropriate location), exit 0 = pass | Yes before claiming DONE |

## SPEC template (copy)

```markdown
# SPEC: <short name>

## Intent

What / why in <=5 sentences.

## Boundaries

Explicit out-of-scope bullets.

## Acceptance

Verifiable checks (commands, exit codes, test ids). Map each to a test.
```

## Cycle

1. Write SPEC (Intent / Boundaries / Acceptance).
2. Add/update **failing** unit tests and E2E contract.
3. Implement the minimal change.
4. Run unit tests, then E2E.
5. Commit after each implementation that compiles/runs; push after each
   successful test; `git fetch --all` and analyze often.
6. Only then extend dependent features gated by the SPEC.
