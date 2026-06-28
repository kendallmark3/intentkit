#!/usr/bin/env bash
set -euo pipefail

REPO="kendallmark3/intentkit"
BRANCH="main"
ARCHIVE="https://github.com/${REPO}/archive/refs/heads/${BRANCH}.tar.gz"

echo "IntentKit — installing..."
echo ""

# Download to file so curl failures don't silently corrupt extraction
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

if ! curl -fsSL "$ARCHIVE" -o "$TMP/archive.tar.gz"; then
  echo "Error: could not download IntentKit from GitHub." >&2
  exit 1
fi

if ! tar xz -C "$TMP" -f "$TMP/archive.tar.gz" 2>/dev/null; then
  echo "Error: archive download was incomplete or corrupt. Try again." >&2
  exit 1
fi

KIT="$TMP/intentkit-${BRANCH}/intent-kit"
if [ ! -d "$KIT" ]; then
  echo "Error: unexpected archive layout — please report at github.com/${REPO}/issues" >&2
  exit 1
fi

created=0
skipped=0

install_file() {
  local src="$1" dest="$2"
  if [ -e "$dest" ]; then
    skipped=$((skipped + 1))
  else
    mkdir -p "$(dirname "$dest")"
    cp "$src" "$dest"
    created=$((created + 1))
  fi
}

install_dir() {
  local src="$1" dest_prefix="$2"
  while IFS= read -r -d '' f; do
    rel="${f#${src}/}"
    install_file "$f" "${dest_prefix}/${rel}"
  done < <(find "$src" -type f -print0 | sort -z)
}

# CLAUDE.md — append IntentKit section if missing, never overwrite
INTENTKIT_SECTION='
## IntentKit — Intent-Driven Engineering

This repo uses IntentKit. Before coding on any feature, read the active intent
under `intents/` and team context in `.intent/memory/`.

Delivery loop (Claude Code slash commands):
`/ide.capture` → `/ide.refine` → `/ide.context` → `/ide.plan` → `/ide.tasks`
→ `/ide.implement` → `/ide.verify` → `/ide.evidence` → `/ide.impact`

Run `/intentkit` in Claude Code to create and manage feature workspaces.
'

if [ -f "CLAUDE.md" ]; then
  if grep -q "IntentKit" CLAUDE.md; then
    skipped=$((skipped + 1))
  else
    printf '%s' "$INTENTKIT_SECTION" >> CLAUDE.md
    created=$((created + 1))
  fi
else
  printf '%s' "$INTENTKIT_SECTION" > CLAUDE.md
  created=$((created + 1))
fi

install_dir "$KIT/.intent" ".intent"
install_dir "$KIT/.claude" ".claude"
install_dir "$KIT/.github" ".github"
mkdir -p intents

# Stage everything in git if inside a repo
if git rev-parse --git-dir > /dev/null 2>&1; then
  git add .intent .claude .github intents CLAUDE.md 2>/dev/null || true
fi

echo "Done. ${created} file(s) installed, ${skipped} already present."
echo ""
echo "Slash commands now available in Claude Code:"
echo ""
echo "  /intentkit          create features, check status, run doctor"
echo "  /ide.capture        start the delivery loop"
echo "  /ide.refine         remove ambiguity, lock decisions"
echo "  /ide.context        pull repo facts before implementation"
echo "  /ide.plan           build the technical plan"
echo "  /ide.tasks          generate ordered tasks"
echo "  /ide.implement      guided repo-aware implementation"
echo "  /ide.verify         run tests and acceptance checks"
echo "  /ide.evidence       document what was built"
echo "  /ide.impact         measure outcomes"
echo ""
echo "Open Claude Code and run: /intentkit"
