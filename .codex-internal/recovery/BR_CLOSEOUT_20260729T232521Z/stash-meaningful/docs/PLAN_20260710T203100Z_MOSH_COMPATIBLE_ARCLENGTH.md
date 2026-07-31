# Plan: Mosh-Compatible ArclengthContinuation

**Created:** 2026-07-10T20:31:00Z  
**Status:** Draft  
**Scope:** CLI (primary), VS Code extension (secondary), IntelliJ (documentation-only v1)

Equivalent to [PLAN_20260710T201200Z_MOSH_COMPATIBLE_GOOSE.md](PLAN_20260710T201200Z_MOSH_COMPATIBLE_GOOSE.md).

---

## Component Overview

| Component | Path | Mosh relevance |
|---|---|---|
| **CLI** | `extensions/cli` | Direct mosh target — same as goose session |
| **VS Code extension** | `extensions/vscode` | Runs locally; mosh only if developing ON remote via SSH/mosh |
| **IntelliJ plugin** | `extensions/intellij` | Gradle/Kotlin; remote dev via Gateway — different problem |
| **Core** | `core/` | Shared logic for CLI + extensions |
| **Binary** | `binary/` | Native continue binary used by extensions |

---

## Problem Statement

Developers using **mosh** to a VPS/devbox want Arclength CLI for agent chat without:
- Broken full-screen TUI after reconnect
- Lost scrollback from alternate-buffer UIs
- Stale terminal state after UDP handoff

Continue/Arclength CLI (`extensions/cli`) uses terminal rendering for chat — same class of issues as goose Ink TUI.

---

## Phase 0 — Works Today (CLI)

```bash
# Non-interactive one-shot over mosh
mosh user@vps -- cn -p "Explain this codebase" --silent

# Or pipe mode if supported
mosh user@vps -- cn --help   # inspect flags for your build
```

**Action:** Audit `extensions/cli` for `--silent`, `--plain`, `--no-interactive`, JSON output flags.

---

## Phase 1 — CLI Plain Mode

| Item | Location | Change |
|---|---|---|
| Env flag | `extensions/cli/src/` | `ARCLENGTH_PLAIN=1` or `CONTINUE_PLAIN=1` |
| Flag | CLI entry | `--plain` disables fancy TUI |
| Renderer | CLI UI module | Line-at-a-time stdout; no alternate screen |
| Detect mosh | startup | If `MOSH_CONNECTION` set → warn + suggest `--plain` |

**AS-IS → TO-BE:**

| AS-IS | TO-BE |
|---|---|
| Interactive CLI assumes stable PTY | Plain mode uses scrollback-friendly line output |
| Reconnect loses TUI state | Session resume from `~/.continue/sessions/` |

---

## Phase 2 — Session Resume After Reconnect

Arclength stores config in `~/.continue/`. Extend:

| Item | Change |
|---|---|
| Session ID file | Write active session ID to `~/.continue/active-session` |
| Resume command | `cn --resume last` or `cn --resume <id>` |
| History | Persist last N messages for replay on reconnect |

**Core dependency:** `core/` session/history APIs — inspect `core/core.ts` conversation persistence.

---

## Phase 3 — VS Code Extension (Remote SSH / mosh)

VS Code **Remote SSH** (not mosh directly) runs the extension host on remote. When user uses mosh as login shell:

| Issue | Mitigation |
|---|---|
| Remote extension host crash on shell change | Use `remote.SSH.defaultExtensions` + stable remote shell in `~/.ssh/config` |
| Terminal panel in VS Code | VS Code terminal ≠ mosh session; extension UI is webview-based — **low mosh impact** |
| Copilot dislocation feature | Your planned feature — unrelated to mosh |

**Recommendation:** VS Code extension is **not** the mosh compatibility target. Focus mosh work on **CLI**. Document that remote development should use VS Code Remote-SSH with `RemoteCommand mosh -- ssh` if needed.

---

## Phase 4 — IntelliJ Plugin (Documentation Only)

**How it works (for your reference):**

```
IntelliJ IDE
    └── Plugin (Kotlin, extensions/intellij)
            └── Bundled continue binary (from binary/)
                    └── Talks to core via stdin/stdout or socket
```

| Aspect | Detail |
|---|---|
| Build | `./gradlew buildPlugin` (JDK 21 runtime, JVM 17 bytecode) |
| Core sync | Must rebuild `binary/` after core changes |
| Config | Reads same `~/.continue/config.yaml` |
| Mosh | Irrelevant unless running IntelliJ on remote X11 — out of scope |

**v1 deliverable:** `docs/INTELLIJ_PLUGIN_OVERVIEW.md` — no code changes unless user approves Gradle work.

---

## Phase 5 — VPS Profile (Align with Goose)

Shared infra with goose fork:

```yaml
# ~/.continue/config.yaml snippet
models:
  - name: local-llama
    provider: openai
    apiBase: http://127.0.0.1:38080/v1
    apiKey: local
```

Wire to agent-sync bus: `/home/lugatj/code/.agent_sync/runtime_status.json`

---

## Validation Matrix

| Test | Pass |
|---|---|
| `mosh vps -- cn --plain -p "hello"` | Line output, scrollback OK |
| Detach/reconnect + `--resume last` | History restored |
| VS Code extension local | Unaffected |
| IntelliJ cold start | Plugin loads profiles (manual) |

---

## Effort Estimate

| Phase | Days | Priority |
|---|---|---|
| 0 CLI audit | 0.5 | Now |
| 1 plain mode | 2–3 | High |
| 2 resume | 2–3 | High |
| 3 VS Code doc | 0.5 | Low |
| 4 IntelliJ doc | 0.5 | Low |
| 5 VPS profile | 1 | Medium |
