# Plan: Mirror Goose Fork Features on ArclengthContinuation

**Created:** 2026-07-10T20:31:00Z  
**Source delta:** goose `upstream/main...HEAD` (35 commits, 58 files)

---

## Feature Mapping

| Row | Goose fork feature | Arclength equivalent | Priority | Effort |
|---|---|---|---|---|
| M-01 | MCP shell wrappers (github/gitlab/bitbucket-api.sh) | `extensions/cli` scripts or core tool | HIGH | 2d |
| M-02 | Secrets KV store spec | `core/` secret storage + config.yaml refs | HIGH | 1–2w |
| M-03 | Session KV (developer extension) | CLI session state in core | MEDIUM | 3d |
| M-04 | KV ↔ templating plumbing | Prompt template injection in core | MEDIUM | 2d |
| M-05 | Embedded websearch (no API keys) | Core tool or MCP extension | MEDIUM | 1w |
| M-06 | Rust LLM provider stub | N/A (TS stack) → OpenAI-compatible local endpoint | LOW | 1d config |
| M-07 | Agent-sync bus scripts | Shared `~/.agent_sync/` protocol | HIGH | 0.5d |
| M-08 | RFC3339 timestamps | `core/utils/timestamp.ts` | LOW | 0.5d |
| M-09 | MCP agent prompts (docs) | `docs/` prompts for Continue agent mode | LOW | 1d |
| M-10 | Aider local bridge | Optional CLI wrapper script | LOW | 1d |
| M-11 | test-local-editor.sh harness | Port to curl against local LLM | HIGH | 1d |
| M-12 | AGENTS/PROJECT_RULES governance | Already partially present | DONE | — |
| M-13 | Marker DSL (internal classification) | `scripts/marker.py` exists untracked | MEDIUM | 0.5d |
| M-14 | Copyleft licensing | LICENSE-COPYLEFT.md exists | IN PROGRESS | 1d |
| M-15 | Mosh-compatible CLI | See mosh plan | HIGH | 3d |

---

## Implementation Phases

### Phase A — Shared Infrastructure (Week 1)

1. Commit untracked governance: `marker_registry.json`, `scripts/marker.py`, `AGENTS.md`
2. Port `scripts/test-local-editor.sh` → `scripts/test-local-llm.sh` (Arclength paths)
3. Wire agent-sync bus publish from CLI health check
4. Document local LLM config for `:38080/v1`

### Phase B — Secrets & KV (Week 2–3)

Mirror goose spec (`docs/SECRETS_KV_STORE_SPECIFICATION.md`):

| Goose | Arclength |
|---|---|
| `%$SECRET_NAME$%` templating | Config `${{ secrets.NAME }}` or new syntax |
| AES-256-GCM at rest | Node `crypto` or OS keychain via `keytar` |
| Slash commands `/secret add` | CLI `cn secret set` or config UI |
| Session KV (RAM) | In-memory session store in core |

**Do not duplicate:** Two incompatible secret syntaxes — pick one and document.

### Phase C — Web Search (Week 3)

See `docs/WEBSEARCH_REQUIREMENTS_20260710T203100Z.md` (goose) — port negative scope:

- No Tavily/Exa API keys required for default path
- Embedded DDG or local SearXNG optional
- VS Code: expose as `@web` tool or MCP

### Phase D — MCP Integration (Week 4)

Goose has shell wrappers; Arclength has native MCP client in core:

| Goose approach | Arclength approach |
|---|---|
| `scripts/github-api.sh` | MCP server OR continue `@github` tool |
| Agent prompts in docs | System prompt additions in `.continue/rules` |

---

## Negative Scope (Do Not Mirror)

| Goose item | Why skip on Arclength |
|---|---|
| `crates/goose-mcp/websearch` Rust MCP | Wrong stack — implement in TS |
| Electron desktop changes | Arclength is IDE-embedded |
| goose-self-test.yaml | Write Arclength vitest equivalent |
| Bitbucket mirror remote | Arclength uses GitHub only |
| `.backup/` snapshots | Internal sausage-making |

---

## Success Criteria

- [ ] Local LLM test harness passes 6/6 on VPS
- [ ] Secrets never appear in logs (parity with goose spec principle)
- [ ] VS Code extension loads local model from `:38080/v1`
- [ ] CLI `--plain` works over mosh
- [ ] LICENSE-COPYLEFT + NOTICE complete with SPDX pass

---

## Dependency Graph

```text
M-14 Copyleft ──→ all new files
M-11 Test harness ──→ M-06 local LLM config
M-02 Secrets KV ──→ M-04 templating
M-03 Session KV ──→ M-04 templating
M-15 Mosh CLI ──→ independent
M-05 Websearch ──→ independent
```
