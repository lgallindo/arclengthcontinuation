# Plan - Test Environment, Provider Harness, CLI Install

Timestamp: 20260708T132000Z

Classification: internal working artifact.

## Goal

Create a reproducible, separate test environment for ArclengthContinuation that can build and test the CLI, VS Code extension, and JetBrains plugin, exercise provider setup/discovery flows, and leave auditable evidence for every run.

## AS-IS vs TO-BE

| ID | Area | AS-IS | TO-BE |
| --- | --- | --- | --- |
| PLAN-001 | Test isolation | CLI tests isolate `CONTINUE_GLOBAL_DIR` per worker, but there is no project-level container/devcontainer harness. | Dedicated test workspace and container/devcontainer profile with disposable home, repo mount, dependency caches, and test artifacts volume. |
| PLAN-002 | Provider harness | CLI has mock server helpers and focused model-persistence tests. No service lifecycle for Ollama/LM Studio/vLLM/Gemini/OpenAI-compatible discovery. | `scripts/test-harness/provider-services.*` starts/stops mock and real provider targets, records health checks, captures logs, and exports endpoints for tests. |
| PLAN-003 | Evidence | Test output is terminal-bound unless manually redirected. | `artifacts/test-runs/<timestamp>/` contains manifest, env, git state, commands, stdout/stderr, provider logs, JUnit, coverage, screenshots where applicable. |
| PLAN-004 | Coverage | Vitest config declares coverage reporters, but `@vitest/coverage-v8` is missing in the CLI package, so no coverage number is currently available. | Add coverage provider via package manager, run package-level and aggregate coverage, set minimum thresholds after baseline measurement. |
| PLAN-005 | CLI install | Unix/PowerShell scripts exist but remain Continue-branded and install `@continuedev/cli`; package exposes only `cn`. | Release installer targets `@arclength-continuation/cli`, development installer links local builds, compatibility alias `cn` remains, branded aliases are added after naming decision. |

## Proposed Files

```text
scripts/test-harness/setup.sh
scripts/test-harness/run.sh
scripts/test-harness/teardown.sh
scripts/test-harness/collect-evidence.sh
scripts/test-harness/provider-services.sh
scripts/test-harness/manifest.mjs
.devcontainer/test/devcontainer.json
.devcontainer/test/docker-compose.yml
.devcontainer/test/Dockerfile
docs/testing/TEST_ENVIRONMENT_20260708T132000Z.md
docs/testing/PROVIDER_HARNESS_20260708T132000Z.md
```

## Harness Algorithm

1. `setup.sh` computes `RUN_ID`, creates `artifacts/test-runs/$RUN_ID`, records `git rev-parse HEAD`, `git status --short`, tool versions, OS, Java, Node, npm, bun, pnpm, Gradle, Maven, and SDKMAN state.
2. It creates a disposable test home and workspace under the run directory, sets `CONTINUE_GLOBAL_DIR`, `HOME`, `XDG_CONFIG_HOME`, `GRADLE_USER_HOME`, and package-manager cache paths to run-local folders.
3. It starts requested provider services through `provider-services.sh`, waits for health endpoints, and records raw health-check responses.
4. `run.sh` builds and tests selected surfaces: `cli`, `vscode`, `jetbrains`, or `all`. Each command writes stdout/stderr and an entry in `manifest.jsonl`.
5. Provider integration tests read endpoints from generated `.env.test-harness` and perform model discovery against Ollama `/api/tags`, OpenAI-compatible `/v1/models`, vLLM `/v1/models`, LM Studio `/v1/models`, llama.cpp endpoints, Gemini API mock, and Vertex mock.
6. `collect-evidence.sh` copies JUnit, coverage, build logs, provider logs, config files, screenshots, and failure repro commands into the run directory.
7. `teardown.sh` stops containers/processes by recorded PID/container ID, verifies no harness ports remain open, and appends teardown status to the manifest.

## Provider Lifecycle

| ID | Provider | First Harness Target | Later Real-Service Target |
| --- | --- | --- | --- |
| PROV-001 | Ollama | Mock `/api/tags` and optional local Ollama if installed. | Containerized Ollama with small pulled model when network/model cache is explicitly approved. |
| PROV-002 | LM Studio | Mock OpenAI-compatible `/v1/models`; local LM Studio detection remains best-effort. | Local app/server lifecycle through `lms` CLI when available. |
| PROV-003 | llama.cpp | Mock completion and model endpoints. | Container or local `llama-server` with a tiny cached GGUF model. |
| PROV-004 | vLLM | Mock OpenAI-compatible `/v1/models`. | Containerized vLLM only on GPU-capable hosts; CPU fallback remains mock-only. |
| PROV-005 | Gemini API | Mock model list and completion endpoints; never logs API keys. | Live smoke tests gated by explicit env var and redacted logs. |
| PROV-006 | Vertex AI / Gemini Enterprise | Mock project/region/model validation. | Live tests gated by `gcloud auth application-default` and explicit project/region env vars. |

## CLI Naming and Install Plan

`cn` is inherited compatibility shorthand from Continue. It is not semantically short for ArclengthContinuation. Keep it for migration compatibility, but add a branded command after selection, for example `arc`, `arclength`, or `arclength-continuation`.

Release installer plan:

```bash
npm install -g @arclength-continuation/cli
cn setup
```

Development installer plan:

```bash
cd extensions/cli
npm install
npm run build
npm link
cn setup
```

Script work required:

- Rebrand `extensions/cli/scripts/install.sh` and `extensions/cli/scripts/install.ps1` from Continue to ArclengthContinuation.
- Change package target from `@continuedev/cli` to `@arclength-continuation/cli`.
- Remove or gate destructive cleanup paths so installer behavior is auditable and compliant with repository policy.
- Add a `--develop` mode that builds local dependencies and links the local CLI.
- Add a `--release` mode that installs from npm or a release artifact.
- Add post-install validation: `cn --version`, `cn setup --help`, and provider discovery smoke against a mock endpoint.

## Coverage Plan

Immediate gap: running `npm run test -- --coverage ...` in `extensions/cli` fails with:

```text
MISSING DEPENDENCY  Cannot find dependency '@vitest/coverage-v8'
```

Minimal path:

1. Add the matching Vitest coverage provider with standard package tooling.
2. Run focused CLI coverage first to establish a baseline for onboarding/model persistence.
3. Run full CLI coverage and write `coverage-summary.json` to the evidence directory.
4. Add thresholds only after baseline is known; start with reporting, then ratchet.
5. Extend aggregate coverage to VS Code and JetBrains once their builds are green under the harness.

