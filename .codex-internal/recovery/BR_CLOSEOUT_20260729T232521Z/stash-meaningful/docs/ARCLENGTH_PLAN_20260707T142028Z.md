# Arclength-Continuation (formerly Arclength-Continuation)

## Planned Features
- **Full GUI management of models:** Visual interface for downloading, switching, and configuring LLMs without touching JSON configs.
- **Automated model discovery:** Auto-detect local Ollama, LMStudio, and llama.cpp endpoints and populate the model list.
- **Support for Ollama & Proxies:** Direct Ollama integration and support for Open WebUI as an intermediary layer.
- **Support for llama.cpp & LMStudio:** Native endpoints for these popular local runners.
- **Interface Polishing:** Revamp the UI with modern micro-animations, glassmorphism, and a more coherent theme adapting to the host IDE.
- **IDE Compatibility:** Full compatibility with VS Code, Antigravity IDE, and Kiro.
- **GitHub Copilot Replacement:** Easy toggle to forcibly dislocate the GitHub Copilot UI/chat interface so Arclength-Continuation lives natively in its place.

## Rebranding & Relicensing
- **Rebrand:** Rename all user-facing strings and configuration scopes from `Arclength-Continuation` to `Arclength-Continuation`.
- **Relicensing:** Transition from Apache 2.0 to GPL (v3). *Note: Ensure all underlying dependencies permit a GPL combination.*

## Github Management & MCP Servers
- **GH CLI:** The `gh` CLI is available for programmatic issue, release, and PR management.
- **MCP Servers Planned:**
  - `mcp-repo-manager`: A server providing tools for managing issues, labeling, and PR lifecycle via `gh`.
  - `mcp-model-discovery`: A server to scan local ports (11434, 1234, 8080) and auto-register Ollama/LMStudio models.
