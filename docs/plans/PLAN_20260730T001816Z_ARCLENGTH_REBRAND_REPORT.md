# Arclength rebrand implementation report

| Field                    | Value                                                                                        |
| :----------------------- | :------------------------------------------------------------------------------------------- |
| Report ID                | `PLAN_20260730T001816Z_ARCLENGTH_REBRAND_REPORT`                                             |
| Written at               | `2026-07-30T00:18:16Z`                                                                       |
| Branch                   | `recovery/select-stash`                                                                      |
| Default CLI name         | `alc` (Arclength Continuation)                                                               |
| Internal scan artifact   | `.codex-internal/recovery/PLAN_20260730T000002Z_ARCLENGTH_REBRAND/` (gitignored)             |
| Machine tables (tracked) | [`assets_20260730T001816Z_arclength_rebrand/`](./assets_20260730T001816Z_arclength_rebrand/) |

---

## 1. Executive summary

| ID     | Topic                | Verdict                                                                                 |
| :----- | :------------------- | :-------------------------------------------------------------------------------------- |
| EX-001 | CLI rename           | `cn` → `alc`; entry `dist/alc.js`; installers use `@arclength-continuation/cli`         |
| EX-002 | Tier A paths         | README Gradle home relativized; self-host prefers `ALC_BIN` (+ legacy `CN_BIN`)         |
| EX-003 | Priority images      | Logo replaced; run config cropped/relabeled; `cn-demo.gif` → `alc-demo.gif`             |
| EX-004 | Verify               | `verify_rebrand_gates.sh` exit 0; CLI build OK; smoke **10/10**                         |
| EX-005 | Explicit non-actions | No Tailwind `cn()` rename; no blind repo-wide sed; no `--force`; research checkout kept |

---

## 2. CLI rename (`cn` → `alc`)

### 2.1 AS-IS → TO-BE

| ID      | Location                             | AS-IS                                  | TO-BE                                                                 |
| :------ | :----------------------------------- | :------------------------------------- | :-------------------------------------------------------------------- |
| CLI-001 | `extensions/cli/package.json` `bin`  | `"cn": "dist/cn.js"`                   | `"alc": "dist/alc.js"`                                                |
| CLI-002 | `extensions/cli/build.mjs`           | emit/chmod `dist/cn.js`                | emit/chmod `dist/alc.js`                                              |
| CLI-003 | `extensions/cli/src/index.ts`        | `.name("cn")`, `commandName: "cn"`     | `.name("alc")`, `commandName: "alc"`                                  |
| CLI-004 | `extensions/cli/scripts/install.sh`  | `CLI_COMMAND="cn"`, `@continuedev/cli` | `CLI_COMMAND="alc"`, `@arclength-continuation/cli`                    |
| CLI-005 | `extensions/cli/scripts/install.ps1` | `$CliCommand = "cn"`                   | `$CliCommand = "alc"`                                                 |
| CLI-006 | Logger                               | `cn.log`                               | `alc.log`                                                             |
| CLI-007 | Skill                                | `skills/cn-check`                      | `skills/alc-check`                                                    |
| CLI-008 | Demo asset                           | `docs/images/cn-demo.gif`              | `docs/images/alc-demo.gif`                                            |
| CLI-009 | Env override                         | hard `/usr/local/bin/cn` / `CN_BIN`    | `ALC_BIN` → legacy `CN_BIN` → `command -v alc` → `/usr/local/bin/alc` |
| CLI-010 | Compatibility shim                   | (none planned)                         | no `cn`→`alc` dual binary; breaking change noted in CHANGELOG         |

### 2.2 False positives excluded

| ID     | Pattern                                          | Why kept                                      |
| :----- | :----------------------------------------------- | :-------------------------------------------- |
| FP-001 | `gui/src/util/cn.ts`, `docs-site/lib/utils.ts`   | Tailwind className helper, not the CLI        |
| FP-002 | `https://api.arclength-continuation.dev/cn/info` | Server route path; left unchanged this pass   |
| FP-003 | Historical CHANGELOG lines pre-Unreleased        | History preserved; Unreleased documents break |

### 2.3 Allowlist evidence

| ID     | Artifact                                                                                                    | Rows (approx)                                                |
| :----- | :---------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| AL-001 | [`assets_.../cn_to_alc_allowlist.csv`](./assets_20260730T001816Z_arclength_rebrand/cn_to_alc_allowlist.csv) | 55 paths                                                     |
| AL-002 | Applicator log                                                                                              | `.codex-internal/.../CALL_LOG_apply_cn_to_alc.md` (internal) |

---

## 3. Hardcoded paths

| ID          | Path                                                    | Issue                                                     | Action                                 | Status             |
| :---------- | :------------------------------------------------------ | :-------------------------------------------------------- | :------------------------------------- | :----------------- |
| PATH-001    | `README.md`                                             | `GRADLE_USER_HOME=/home/lugatj/.../continue/.gradle-home` | `GRADLE_USER_HOME="$PWD/.gradle-home"` | Done               |
| PATH-002    | `extensions/cli/e2e/self-hosting-loop.sh`               | hard `/usr/local/bin/cn`                                  | `ALC_BIN` resolution chain             | Done               |
| PATH-003    | `docs/specs/SPEC_20260724T154500Z_SELF_HOSTING_LOOP.md` | documented `/usr/local/bin/cn`                            | `alc` + env override prose             | Done               |
| PATH-TIER-B | `*.vitest.ts` / `*.test.ts` `/home/user` fixtures       | portable examples                                         | No change                              | Deferred by design |
| PATH-TIER-C | `github.com/continuedev/continue` install/docs URLs     | upstream provenance                                       | Later docs-provenance pass             | Backlog            |

Full tier CSV: [`assets_.../path_tiers.csv`](./assets_20260730T001816Z_arclength_rebrand/path_tiers.csv).

---

## 4. Images

### 4.1 Inventory (scan summary)

| ID          | Metric                | Value                                             |
| :---------- | :-------------------- | :------------------------------------------------ |
| IMG-INV-001 | Approx. image count   | ~313                                              |
| IMG-INV-002 | Extensions            | ~271 png, ~32 gif, ~8 svg, ~2 ico                 |
| IMG-INV-003 | Top dirs              | `docs`, `gui`, `extensions`, `media`, `docs-site` |
| IMG-INV-004 | Hash duplicate groups | ~60 (Mintlify asset copies)                       |

Source: [`assets_.../images_summary.json`](./assets_20260730T001816Z_arclength_rebrand/images_summary.json), [`images_brand.csv`](./assets_20260730T001816Z_arclength_rebrand/images_brand.csv).

### 4.2 Priority brand actions

| ID      | Asset                                             | Finding                              | Action                                                                                                  | Status    |
| :------ | :------------------------------------------------ | :----------------------------------- | :------------------------------------------------------------------------------------------------------ | :-------- |
| IMG-001 | `media/github-readme.png`                         | Fork-appropriate architecture banner | Keep                                                                                                    | Unchanged |
| IMG-002 | `media/run-continue-intellij.png`                 | UI said “Run Continue”               | Crop + relabel “Run Arclength”; also `media/run-arclength-intellij.png`                                 | Done      |
| IMG-003 | `docs-site/public/images/continue-logo-light.png` | Blank/black broken asset             | Replaced with icon+“Arclength” wordmark; added `arclength-logo-light.png`; DocsShell points to new name | Done      |
| IMG-004 | `docs/images/cn-demo.gif`                         | Name encodes `cn`                    | Renamed `alc-demo.gif`; docs refs updated                                                               | Done      |
| IMG-005 | `docs/images/continue-*.png` etc.                 | Upstream Continue chrome             | Backlog                                                                                                 | Deferred  |
| IMG-006 | `docs/images/**/assets/`                          | Content-hash duplicates              | Dedup later                                                                                             | Deferred  |

---

## 5. Verification

| ID    | Gate / check                                                                                  | Result         |
| :---- | :-------------------------------------------------------------------------------------------- | :------------- |
| V-001 | No `dist/cn.js` / `CLI_COMMAND="cn"` / `.name("cn")` under `extensions/cli` (excl. CHANGELOG) | Pass           |
| V-002 | `package.json` has `"alc": "dist/alc.js"`                                                     | Pass           |
| V-003 | No `/home/lugatj` in README + self-host script + self-host SPEC                               | Pass           |
| V-004 | `docs/images/alc-demo.gif` + `skills/alc-check` present; old `cn-*` gone                      | Pass           |
| V-005 | Tailwind `cn` util files still present                                                        | Pass           |
| V-006 | `npm run build` in `extensions/cli`                                                           | Pass           |
| V-007 | `node smoke-test.mjs`                                                                         | **10/10** Pass |

Gate script (internal): `.codex-internal/recovery/PLAN_20260730T000002Z_ARCLENGTH_REBRAND/scripts/verify_rebrand_gates.sh`.

---

## 6. Dual checkout note (foss vs research)

| ID       | Path                                    | Exists | HEAD (at report time) | Branch                  | Same tree as sibling? |
| :------- | :-------------------------------------- | :----- | :-------------------- | :---------------------- | :-------------------- |
| REPO-001 | `~/code/foss/arclength-continuation`    | Yes    | `4d4b0a8fa`           | `recovery/select-stash` | No                    |
| REPO-002 | `~/code/research/arclengthcontinuation` | Yes    | `9bd9a96b8`           | `main`                  | No (`tree` differs)   |

Both remotes point at `git@github.com:lgallindo/arclengthcontinuation.git`. Research checkout was **not** deleted.

---

## 7. Backlog (explicit)

| ID     | Item                                                                                                                            |
| :----- | :------------------------------------------------------------------------------------------------------------------------------ |
| BL-001 | Docs provenance: fork install URLs → `lgallindo/arclengthcontinuation`; keep Upstream attribution for historical Continue links |
| BL-002 | Replace remaining Continue-branded screenshots/icons (IMG-005)                                                                  |
| BL-003 | Docs image hash dedup (IMG-006)                                                                                                 |
| BL-004 | Decide whether API path `/cn/info` should become `/alc/info`                                                                    |
| BL-005 | Optional thin `cn` shim (not planned by default)                                                                                |

---

## 8. Related local analyses

| ID      | Path                                                        | Contents                                              |
| :------ | :---------------------------------------------------------- | :---------------------------------------------------- |
| LOC-001 | `.local/philology/ARCLENGTH_CONTINUATION_20260730T001816Z/` | Multi-round philological analysis of the product name |
