<h1 align="center">Arclength-Continuation</h1>

<p align="center">Pioneering open-source coding agent</p>

<div align="center">

<a href="https://opensource.org/licenses/GPL-3.0-or-later"><img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg" /></a>
<a href="https://docs.arclength-continuation.dev"><img src="https://img.shields.io/badge/Docs-docs.arclength-continuation.dev-blue" /></a>
<a href="https://github.com/arclength-continuation/continue/releases"><img src="https://img.shields.io/badge/Changelog-GitHub_Releases-blue" /></a>

</div>

<p align="center">
  <img src="media/github-readme.png" alt="Banner" />
</p>

## What is Arclength-Continuation?

> _Note: The `arclength-continuation/continue` repository is no longer actively maintained and is read-only for all users._

Arclength-Continuation is a coding agent available as a [CLI](#cli), [VS Code extension](#vs-code), and [JetBrains plugin](#jetbrains).

## Documentation

To learn how to configure Arclength-Continuation, how it works, and how to customize it, check out the [Arclength-Continuation Docs](https://docs.arclength-continuation.dev).

## Final 2.0.0 Release

We polished Arclength-Continuation and did a final 2.0.0 release of the VS Code extension, CLI, and JetBrains plugin.

This included removing anonymous telemetry, pulling out authentication, squashing bugs, and more.

### VS Code

[![VS Code Marketplace](https://img.shields.io/badge/VS_Code_Marketplace-007ACC?logo=visualstudiocode&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=Arclength-Continuation.continue) [![OpenVSX Registry](https://img.shields.io/badge/OpenVSX_Registry-C160EF?logo=eclipseide&logoColor=white)](https://open-vsx.org/extension/Arclength-Continuation/continue) [![View source](https://img.shields.io/badge/View_source-181717?logo=github&logoColor=white)](extensions/vscode)

### CLI

[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/package/@arclength-continuation/cli) [![View source](https://img.shields.io/badge/View_source-181717?logo=github&logoColor=white)](extensions/cli)

### JetBrains

> _Note: We recommend using the Arclength-Continuation CLI instead of the JetBrains plugin._

[![GitHub Releases](https://img.shields.io/badge/GitHub_Releases-181717?logo=github&logoColor=white)](https://github.com/arclength-continuation/continue/releases) [![View source](https://img.shields.io/badge/View_source-181717?logo=github&logoColor=white)](extensions/intellij)

## Contributors

Thank you to the entire Arclength-Continuation community for helping us create a pioneering coding agent.

What we built together pushed the boundaries of what AI developer tooling could be.

We hope this codebase continues to serve as a foundation for others.

## Code friends

<a href="https://github.com/arclength-continuation/continue/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=arclength-continuation/continue&max=500" />
</a>

## License

Apache 2.0 © 2023-2026 Arclength-Continuation Dev, Inc.

## Compilation Setup

To compile the Arclength-Continuation VS Code extension, a strict sequential build is required. Run `./scripts/build_all.sh` to install root dependencies, build internal packages, build `core`, and finally compile `extensions/vscode`.
