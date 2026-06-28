#!/usr/bin/env bash
set -euo pipefail

REPO="kendallmark3/intentkit"
BRANCH="main"
ARCHIVE="https://github.com/${REPO}/archive/refs/heads/${BRANCH}.tar.gz"

echo "IntentKit — initializing..."
echo ""

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

curl -fsSL "$ARCHIVE" | tar xz -C "$TMP"
KIT="$TMP/intentkit-${BRANCH}/intent-kit"

created=0
skipped=0

install_file() {
  local src="$1" dest="$2"
  if [ -e "$dest" ]; then
    echo "  —  kept (already exists): $dest"
    skipped=$((skipped + 1))
  else
    mkdir -p "$(dirname "$dest")"
    cp "$src" "$dest"
    echo "  ✓  created: $dest"
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
    echo "  —  CLAUDE.md already has IntentKit section"
  else
    printf '%s' "$INTENTKIT_SECTION" >> CLAUDE.md
    echo "  ✓  CLAUDE.md — appended IntentKit section"
    created=$((created + 1))
  fi
else
  printf '%s' "$INTENTKIT_SECTION" > CLAUDE.md
  echo "  ✓  created: CLAUDE.md"
  created=$((created + 1))
fi

install_dir "$KIT/.intent" ".intent"
install_dir "$KIT/.claude" ".claude"
install_dir "$KIT/.github" ".github"
mkdir -p intents

echo ""
echo "IntentKit initialized."
echo "  ${created} file(s) created"
if [ "$skipped" -gt 0 ]; then
  echo "  ${skipped} file(s) already existed — not modified"
fi
echo ""
echo "Next steps:"
echo "  1. Open this repo in Claude Code"
echo "  2. Run /intentkit to create your first feature workspace"
echo "  3. Run /ide.capture to start the delivery loop"
