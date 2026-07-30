# SPEC: arclen against a remote llama-server

## Intent

Run the `arclen` CLI (extensions/cli) in headless mode against a remote
OpenAI-compatible llama-server endpoint, so Arclength-Continuation works with
self-hosted models without any hosted-API key. The endpoint is deliberately
NOT hardcoded: it is injected via environment variables so public CI and the
repo never learn private infrastructure addresses.

## Boundaries

- No changes to authentication or onboarding flows.
- Model output quality is out of scope (tiny models allowed).
- Server deployment is out of scope (covered by the operator's
  infrastructure workspace).
- No secrets or private endpoints committed to the repository.

## Acceptance

1. Unit (`yamlConfigUpdater.test.ts`, "remote OpenAI-compatible endpoint"):
   `updateProviderModelInYaml` produces a valid single-model config for
   provider `openai` with a custom `apiBase` and dummy `apiKey`.
2. E2E (`extensions/cli/e2e/remote-llama.sh`): with `LLAMA_API_BASE` and
   `LLAMA_MODEL` set, `node dist/index.js -p --config <generated yaml>
"Reply with one word"` exits 0 and prints a non-empty completion.
   Without the env vars the script reports SKIPPED and exits 0.
