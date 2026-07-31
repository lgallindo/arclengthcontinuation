#!/bin/sh
set -eu
if [ "$#" -lt 2 ]; then exit 64; fi
event_type="$1"; summary="$2"; shift 2
repo_root="$(cd "$(dirname "$0")/.." && pwd)"
handoff="$repo_root/SESSION_HANDOFF.md"
timestamp="$(date +%Y-%m-%dT%H:%M:%S%z)"
host="$(hostname 2>/dev/null || printf 'unknown-host')"
os="$(uname -a 2>/dev/null || printf 'unknown-os')"
head="$(git -C "$repo_root" rev-parse --short HEAD 2>/dev/null || printf 'no-head')"
branch="$(git -C "$repo_root" branch --show-current 2>/dev/null || printf 'no-branch')"
status="$(git -C "$repo_root" status --short 2>/dev/null | sed 's/^/    /' || true)"
{
  printf '\n## %s | %s | %s\n\n' "$timestamp" "$event_type" "$host"
  printf '%s\n' "- summary: $summary"
  printf '%s\n' "- signed_by: Antigravity Agent"
  printf '%s\n' "- actor: Antigravity Agent"
  printf '%s\n' "- computer: $host"
  printf '%s\n' "- environment: $os"
  printf '%s\n' "- cwd: $(pwd)"
  printf '%s\n' "- repo_root: $repo_root"
  printf '%s\n' "- git_branch: $branch"
  printf '%s\n' "- git_head: $head"
  if [ "$#" -gt 0 ]; then
    printf '%s\n' "- details:"
    for detail in "$@"; do printf '%s\n' "  - $detail"; done
  fi
  printf '%s\n' "- worktree_status_before_entry:"
  if [ -n "$status" ]; then printf '%s\n' "$status"; else printf '    clean\n'; fi
} >> "$handoff"
