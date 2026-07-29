# ArclengthContinuation Copyleft Notice

New modifications made for the ArclengthContinuation fork are licensed under the GNU General Public License, version 3.0 or any later version, unless a file or directory explicitly states a different license.

The inherited upstream Continue codebase remains available under its original Apache License 2.0 terms, preserved in [LICENSE](LICENSE) and existing upstream notices. Apache-2.0 is GPLv3-compatible, but upstream copyright and patent notices must still be preserved.

Until a file-level SPDX audit is complete, treat this repository as a mixed-license derivative work:

- upstream Continue material: Apache-2.0
- ArclengthContinuation fork modifications: GPL-3.0-or-later
- third-party dependencies: their respective licenses

Do not publish release artifacts from this repository until the license audit and notice inventory are complete.

## Fork modification inventory (2026-07-12)

| Path                                                 | License          | Notes                                |
| ---------------------------------------------------- | ---------------- | ------------------------------------ |
| `core/context/providers/embeddedWebSearch.ts`        | GPL-3.0-or-later | Embedded DDG + optional SearXNG      |
| `core/context/providers/embeddedWebSearch.vitest.ts` | GPL-3.0-or-later | Unit tests                           |
| `core/tools/implementations/searchWeb.ts`            | GPL-3.0-or-later | Tool wiring; proxy opt-in            |
| `scripts/marker.py`, `marker_registry.json`          | GPL-3.0-or-later | Internal governance DSL              |
| Governance docs (`AGENTS.md`, `PROJECT_RULES.md`, …) | Internal         | Local-only until rebrand gate clears |

See [NOTICE](NOTICE) for upstream attribution and third-party deps pointer.
