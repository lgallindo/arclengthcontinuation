<h1 align="center">ArclengthContinuation</h1>

<p align="center">A copyleft-oriented fork of Continue for AI-assisted development across the CLI, VS Code, and JetBrains.</p>

<div align="center">

<a href="./LICENSE-COPYLEFT.md"><img src="https://img.shields.io/badge/Fork_Modifications-GPL--3.0--or--later-blue" /></a>
<a href="./LICENSE"><img src="https://img.shields.io/badge/Upstream_Base-Apache--2.0-blue" /></a>

</div>

<p align="center">
  <img src="media/github-readme.png" alt="ArclengthContinuation banner" />
</p>

<p align="center">
  <img src="media/readme.png" alt="ArclengthContinuation wordmark banner" width="750" />
</p>

## Status

ArclengthContinuation is a work-in-progress fork of Continue. Immediate focus: reliable build baseline, then VS Code as a first-class surface for local and hosted model discovery (VS Code, Google Antigravity, Kiro-style environments).

No project releases yet. GitHub Actions remain under `.github/workflows.disabled/` until automation policy is reviewed.

Build and run notes (operator site): [lgallindo.github.io](https://lgallindo.github.io/en_US/).

Product visual identity (apps + this README): [`docs/PRODUCT_IDENTITY.md`](docs/PRODUCT_IDENTITY.md).

## Guiding principles

1. **Local-first** — optimize for local models; keep cloud compatibility open.
2. **SLMs via planning** — small models succeed through many planning calls, not one giant shot.
3. **Deterministic tools** — expose tools for imaginable tasks; prefer tools over free-form guesswork.
4. **Opinionated SDD** — new features need Intent / Boundaries / Acceptance specs, tests, and CLI E2E ([`SPEC_DRIVEN_DEVELOPMENT.md`](SPEC_DRIVEN_DEVELOPMENT.md)).

Agents coordinating on this repo: read [`PROJECT_RULES.md`](PROJECT_RULES.md), [`AGENTS.md`](AGENTS.md), and append to [`docs/plans/AGENT_BUS.jsonl`](docs/plans/AGENT_BUS.jsonl).

### Conversation log (rebrand / P6)

| Document                                                                                                                                               | Role                                                                              |
| :----------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| [`docs/plans/CONVERSATION_20260804T173824Z_REBRAND_P6_CLOSEOUT_MINUTIAE.md`](docs/plans/CONVERSATION_20260804T173824Z_REBRAND_P6_CLOSEOUT_MINUTIAE.md) | Full minutiae of the Jul 29–Aug 4 rebrand and dual-checkout closeout conversation |
| [`docs/plans/LEDGER_20260804T173824Z_PENDING_DEBT_FROM_CONVERSATION.md`](docs/plans/LEDGER_20260804T173824Z_PENDING_DEBT_FROM_CONVERSATION.md)         | Pending items, debt, and warnings derived from that conversation                  |

## Components

- [CLI](extensions/cli)
- [VS Code extension](extensions/vscode)
- [JetBrains plugin](extensions/intellij)
- [Core packages](core)
- [TypeScript SDK](packages/continue-sdk/typescript)

## Build Verification

The current build baseline was restored and verified with:

```bash
cd packages/continue-sdk/typescript
bun run build

cd ../../../extensions/cli
bun run build

cd ../vscode
bun run esbuild

cd ../intellij
JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 \
GRADLE_USER_HOME="$PWD/.gradle-home" \
./gradlew buildPlugin --stacktrace
```

Gradle currently runs under JDK 21 and emits JVM 17 bytecode for IntelliJ compatibility. SDKMAN on this machine also has Java 25 available, but the checked-in Gradle wrapper is 8.14.3; Gradle 9.1.0 or newer is required before Java 25 should become the default Gradle runtime.

## Repository Automation

All workflow files have been moved from `.github/workflows/` to `.github/workflows.disabled/workflows/`. This keeps the previous automation available for audit while preventing GitHub Actions from running.

Before re-enabling automation, review at least:

- build and pull-request checks
- release and prerelease jobs
- marketplace publishing jobs
- dependency and security scanning jobs
- bot-triggered agent workflows

## Licensing

This fork keeps the upstream Apache-2.0 license text in [LICENSE](LICENSE) for the inherited Continue codebase and related upstream notices.

New ArclengthContinuation modifications are intended to be licensed under GPL-3.0-or-later unless a file or directory states otherwise. See [LICENSE-COPYLEFT.md](LICENSE-COPYLEFT.md).

This repository still needs a file-level SPDX and notice audit before any public release or package publication.
