# Inconsistencies With Higher-Priority Runtime Instructions

| ID | AGENTS Rule | Higher-Priority Instruction | Conflict Type | Technical Effect |
|---|---|---|---|---|
| INC-001 | `OP-005`: always disclose complete reasoning process output | Runtime policy disallows exposing full internal reasoning traces | Direct policy conflict | Cannot provide chain-of-thought dumps even if requested by local rule |
| INC-002 | `CORE-007`: commit early/push early/fetch frequently | Commit/push only on explicit user request | Direct operational conflict | Autonomous commit/push forbidden |
| INC-003 | `COMM-000`: mandatory pre-flight graph before anything | Runtime style requires concise direct handling | Protocol conflict | Mandatory graph emission on each non-trivial turn incompatible |
| INC-004 | `COMM-001..003`: mandatory Prompt/Intent/Adversarial headers | Runtime style discourages rigid formulaic opening blocks | Formatting conflict | Forced header schema not globally applicable |
| INC-005 | `TRLR-001..007`: mandatory 7-rule trailer every message | Runtime style does not mandate fixed trailer and prefers concise responses | Output-shape conflict | Always-on trailer is incompatible with concise default |
| INC-006 | `OP-001`: always delegate to specialized sub-agents | Subagent guidance says avoid subagent for simple tasks | Tooling conflict | "Always delegate" is invalid in simple-task contexts |
| INC-007 | `SAFE-013`: restate no-force rule every other response | Runtime style discourages repetitive boilerplate | Communication conflict | Mandatory periodic warning repetition not generally allowed |
| INC-008 | `COMM-000`: parse/graph before intent analysis | Runtime interaction model allows direct intent handling | Execution-order conflict | Hard gate conflicts with normal turn flow |

## Provenance
- Source rule file: `/home/lugatj/code/research/AGENTS.md`
- Comparison basis: higher-priority runtime policies active in this chat environment
- Generated at: `2026-07-08T19:46:10Z`
