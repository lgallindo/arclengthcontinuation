<h1 align="center">ArclengthContinuation</h1>

<p align="center">A copyleft-oriented fork of Continue for AI-assisted development across the CLI, VS Code, and JetBrains.</p>

<div align="center">

<a href="./LICENSE-COPYLEFT.md"><img src="https://img.shields.io/badge/Fork_Modifications-GPL--3.0--or--later-blue" /></a>
<a href="./LICENSE"><img src="https://img.shields.io/badge/Upstream_Base-Apache--2.0-blue" /></a>

</div>

<p align="center">
  <img src="media/github-readme.png" alt="ArclengthContinuation banner" />
</p>

## Status

ArclengthContinuation is a work-in-progress fork of Continue. The immediate project goal is to restore a reliable build baseline, then improve the VS Code extension as a first-class citizen for local and hosted model discovery in VS Code, Google Antigravity, and Kiro-style development environments.

No project releases are being published from this repository at this time. GitHub Actions workflows are intentionally disabled until the repository automation policy is reviewed.

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
npm run build

cd ../../../extensions/cli
npm run build

cd ../vscode
npm run esbuild

cd ../intellij
JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 \
GRADLE_USER_HOME=/home/lugatj/code/foss/continue/.gradle-home \
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
