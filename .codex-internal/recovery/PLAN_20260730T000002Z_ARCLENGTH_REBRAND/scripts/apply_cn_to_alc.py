#!/usr/bin/env python3
"""Apply cn→alc renames on an allowlist. Logs every file touched."""
from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]  # repo root via .codex-internal/recovery/PLAN_.../scripts
# parents: scripts, PLAN_..., recovery, .codex-internal, repo
ALLOW = Path(__file__).resolve().parents[1] / "tables" / "cn_to_alc_allowlist.csv"
LOG = Path(__file__).resolve().parents[1] / "CALL_LOG_apply_cn_to_alc.md"

# Ordered replacements (longer / more specific first)
REPLACEMENTS: list[tuple[str, str]] = [
    (r'dist/cn\.js', 'dist/alc.js'),
    (r'/usr/local/bin/cn', '/usr/local/bin/alc'),
    (r'~/\.continue/logs/cn\.log', '~/.continue/logs/alc.log'),
    (r'cn\.log', 'alc.log'),
    (r'PACKAGE_NAME="@continuedev/cli"', 'PACKAGE_NAME="@arclength-continuation/cli"'),
    (r"PackageName\s*=\s*'@continuedev/cli'", "PackageName = '@arclength-continuation/cli'"),
    (r'PackageName\s*=\s*"@continuedev/cli"', 'PackageName = "@arclength-continuation/cli"'),
    (r'CLI_COMMAND="cn"', 'CLI_COMMAND="alc"'),
    (r"CliCommand\s*=\s*\"cn\"", 'CliCommand = "alc"'),
    (r"\$script:CliCommand\s*=\s*\"cn\"", '$script:CliCommand = "alc"'),
    (r'\.name\("cn"\)', '.name("alc")'),
    (r'commandName:\s*"cn"', 'commandName: "alc"'),
    (r'"cn":\s*"dist/alc\.js"', '"alc": "dist/alc.js"'),
    (r'claim_cn', 'claim_alc'),
    (r'CN_BIN', 'ALC_BIN'),
    (r'/images/cn-demo\.gif', '/images/alc-demo.gif'),
    (r'`cn`', '`alc`'),
    # commands: cn followed by flag/subcommand/EOL
    (r'(?<![A-Za-z0-9_-])cn(?=(\s+(-p|--|/|[a-z])|\s*$))', 'alc'),
]

# Also handle quoted "cn" alone in bin keys already covered

def transform(text: str) -> str:
    out = text
    for pat, repl in REPLACEMENTS:
        out = re.sub(pat, repl, out, flags=re.MULTILINE)
    # Remaining standalone `cn` in markdown headings like # `cn` already handled
    # Fix double-replacements
    out = out.replace('dist/alc.js.bak', 'dist/alc.js.bak')  # noop clarity
    # Installer comments
    out = out.replace('Continue CLI Installer', 'ArclengthContinuation CLI Installer')
    out = out.replace('curl -fsSL https://continue.dev/install.sh | bash',
                      'curl -fsSL https://raw.githubusercontent.com/lgallindo/arclengthcontinuation/main/extensions/cli/scripts/install.sh | bash')
    return out

def main() -> int:
    paths = []
    with ALLOW.open() as f:
        for row in csv.DictReader(f):
            paths.append(row['path'])
    # Always include logger even if missed
    extra = [
        'extensions/cli/src/util/logger.ts',
        'docs/snippets/cli-install.mdx',
        'docs/cli/quickstart.mdx',
        'docs/cli/tui-mode.mdx',
        'docs/guides/cli.mdx',
    ]
    for e in extra:
        if e not in paths and (ROOT / e).exists():
            paths.append(e)

    lines = [f'# CALL_LOG apply_cn_to_alc', f'signed_at: UTC', f'']
    changed = 0
    for rel in sorted(set(paths)):
        p = ROOT / rel
        if not p.is_file():
            lines.append(f'- SKIP missing `{rel}`')
            continue
        if p.suffix == '.zip':
            lines.append(f'- SKIP zip `{rel}`')
            continue
        original = p.read_text(encoding='utf-8')
        updated = transform(original)
        if updated != original:
            p.write_text(updated, encoding='utf-8')
            changed += 1
            lines.append(f'- CHANGED `{rel}`')
        else:
            lines.append(f'- unchanged `{rel}`')
    LOG.write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print(f'changed={changed} log={LOG}')
    return 0

if __name__ == '__main__':
    # Fix ROOT: file is at repo/.codex-internal/recovery/PLAN_xxx/scripts/apply...
    # parents[0]=scripts, [1]=PLAN, [2]=recovery, [3]=.codex-internal, [4]=repo
    sys.exit(main())
