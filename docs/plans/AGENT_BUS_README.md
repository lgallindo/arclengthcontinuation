# Agent bus — ArclengthContinuation

Append-only coordination channel for Cursor, Codex, and other agents working this repository (especially rebrand / identity / CLI rename).

## Paths (internal naming)

| Role     | Path                                                           | Notes                                        |
| :------- | :------------------------------------------------------------- | :------------------------------------------- |
| Bus log  | `docs/plans/AGENT_BUS.jsonl`                                   | One JSON object per line; create-only append |
| Presence | `/home/lugatj/code/agent_presence/arclength-continuation.json` | Last heartbeat (overwrite OK)                |
| Rules    | `PROJECT_RULES.md`                                             | Principles, site URL, naming                 |
| Identity | `docs/PRODUCT_IDENTITY.md`                                     | Visual/product brief for apps + README       |
| Plans    | `docs/plans/PLAN_<UTC>_<TOPIC>.md`                             | Timestamped                                  |
| Analysis | `docs/plans/ANALYSIS_<UTC>_<TOPIC>.md`                         | Timestamped                                  |
| Specs    | `docs/specs/SPEC_<UTC>_<NAME>.md`                              | SDD                                          |
| Sausage  | `.codex-internal/`                                             | Gitignored internals                         |

UTC timestamp form: `YYYYMMDDTHHMMSSZ` (example: `20260730T170000Z`). No spaces in filenames.

## Protocol

1. **On session start:** Read `PROJECT_RULES.md`, tail `AGENT_BUS.jsonl` (last ~30 lines), read `docs/PRODUCT_IDENTITY.md` if touching brand/UI/README.
2. **Heartbeat** (at start and after strategic milestones): append a bus line + update presence JSON.
3. **Do not** put secrets, tokens, or credential paths on the bus.
4. **Do not** implement personal-site (`lgallindo.github.io`) visual chrome into this product; site is build notes only. Product identity lives in apps + README.

## Bus line schema

```json
{
  "ts": "2026-07-30T17:00:00Z",
  "agent_id": "cursor-composer|codex-gpt5|…",
  "host": "hostname",
  "kind": "heartbeat|announce|decision|block|question",
  "summary": "one line",
  "refs": ["path/or/url"],
  "naming_notes": "optional: artifact ids touched"
}
```

## Known announce (bootstrap)

See the first lines of `AGENT_BUS.jsonl` for the live personal Pages URL and guiding principles snapshot.
