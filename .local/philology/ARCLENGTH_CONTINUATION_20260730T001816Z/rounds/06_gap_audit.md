# Round 6 — Gap audit (second pass)

| Field      | Value                                     |
| :--------- | :---------------------------------------- |
| Round      | 06                                        |
| Written at | `2026-07-30T00:45:00Z`                    |
| Question   | What did rounds 1–5 miss or under-weight? |

## 6.1 Gaps found on re-read

| ID      | Gap                                                        | Detail                                                                                         | Disposition                                                              |
| :------ | :--------------------------------------------------------- | :--------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| GAP-001 | Historical inventors                                       | Riks, Wempner, Keller, Crisfield are central to _pseudo-arclength_ history; not in brand story | Recorded here; optional “Further reading” for docs                       |
| GAP-002 | Hyphenation of _pseudo-arclength_                          | Always hyphen after _pseudo_ in literature; brand never includes _pseudo_                      | Accept; document in Round 2                                              |
| GAP-003 | Portuguese / local user locale                             | Workspace user often PT-BR; name is English-only                                               | No PT calque proposed (_continuação em comprimento de arco_ too long)    |
| GAP-004 | Trademark / search collision                               | “ArcLength” appears in CAD, GIS, geometry libs                                                 | Mitigation: always pair with _Continuation_ in legal/marketing first use |
| GAP-005 | Acronym collision                                          | ALC also = Arabic Language Computing, Air Logistics, etc.                                      | Lowercase CLI `alc` reduces some collisions                              |
| GAP-006 | _Continuation_ vs _Continuous_ AI docs                     | Many cookbooks still say “Continuous AI” / Continue                                            | Separate editorial pass (Tier C)                                         |
| GAP-007 | Stress on _Arclength_ as one word                          | Screen readers may say “arc length” anyway                                                     | Acceptable                                                               |
| GAP-008 | Legal entity string                                        | LICENSE / CLA may still say Continue org names                                                 | Not audited in philology rounds — flag for counsel/docs                  |
| GAP-009 | Domain `api.arclength-continuation.dev` vs path `/cn/info` | Mixed generations of naming                                                                    | Explicit backlog BL-004 in rebrand report                                |
| GAP-010 | Skill zip binary                                           | `skills/alc-check.zip` may be stale vs directory                                               | Verify zip freshness before release                                      |

## 6.2 Cross-checks performed this round

| ID      | Check                                                     | Result                  |
| :------ | :-------------------------------------------------------- | :---------------------- |
| CHK-001 | Re-read Etymonline arc / length / continuation            | Consistent with Round 1 |
| CHK-002 | Re-skim Wikipedia numerical continuation + arXiv abstract | Consistent with Round 2 |
| CHK-003 | Compare foss vs research directory orthography            | Documented in Round 4   |
| CHK-004 | Confirm CLI letter recipe A+L+C                           | Documented in Round 3   |

## 6.3 Items deliberately out of scope

| ID      | Item                         | Why                  |
| :------ | :--------------------------- | :------------------- |
| OUT-001 | Full trademark search        | Legal, not philology |
| OUT-002 | User testing of name recall  | Empirical UX study   |
| OUT-003 | Rewriting all Continue prose | Tier C backlog       |

## 6.4 Final round status

| ID      | Statement                                                                                                                                                               |
| :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FIN-001 | After six rounds, the name’s etymology, technical allusion, brand orthography, repo attestations, recommendations, and residual gaps are documented under this dossier. |
| FIN-002 | Further rounds should be opened only when (a) legal naming changes, (b) CLI help strings are normalized, or (c) a PT-BR / alternate-locale brand is proposed.           |
