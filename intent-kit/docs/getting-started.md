# Getting Started with IntentKit

## What this is

IntentKit adds an intent-driven delivery layer to any repo. It creates a set of structured files your coding agent can follow — from business intent through implementation, verification, and impact. It is additive: it writes into `.intent/`, `intents/`, `.claude/commands/`, and `.github/prompts/`. It never modifies your existing code, CI/CD, or package.json.

## Install

**Option A — run directly from this repo (no global install)**
```bash
node /path/to/intent-kit/bin/intentkit.js init
```

**Option B — link globally**
```bash
cd intent-kit
npm link
# now `intentkit` is available anywhere
intentkit init
```

**Option C — npx (after npm publish)**
```bash
npx intentkit init
```

## Initialize

Run this from the root of the repo where you want IntentKit:

```bash
intentkit init
```

This creates:
- `.intent/memory/` — principles, architecture rules, team standards, definition of done
- `.intent/templates/` — one template per delivery artifact
- `.intent/playbooks/` — delivery loop guides
- `.claude/commands/` — slash commands for Claude Code (`/ide.capture` through `/ide.impact`)
- `.github/prompts/` — Copilot-compatible prompt files
- `intents/` — where feature intent workspaces live
- `CLAUDE.md` — IntentKit guidance for Claude Code (skipped if one already exists)

Existing files are never overwritten. Safe to run twice.

## Verify the install

```bash
intentkit doctor
```

Prints a checklist of all expected files. Shows `✓` or `✗` for each. If anything is missing, run `intentkit init` again.

## Start a feature

```bash
intentkit feature "add dark mode toggle"
```

Creates `intents/001-add-dark-mode-toggle/` with all 8 artifact files pre-filled from templates.

## Run the delivery loop (in Claude Code)

Open the repo in Claude Code and run these commands in order:

```
/ide.capture     ← capture the business intent
/ide.refine      ← sharpen the intent, fill gaps
/ide.context     ← inspect the repo, fill repo-context.md
/ide.plan        ← create the implementation plan
/ide.tasks       ← break the plan into tasks
/ide.implement   ← implement the next task
/ide.verify      ← run tests, check acceptance criteria
/ide.evidence    ← document what was done
/ide.impact      ← record the business outcome
```

Check progress at any time:

```bash
intentkit status
```

## Read the example

`intents/001-example-customer-onboarding/` contains a fully completed feature delivery. Read it to understand what each artifact looks like when done.

## Remove IntentKit

IntentKit is purely file-based. To remove it from a repo:

```bash
rm -rf .intent/
rm -rf intents/
rm -f .claude/commands/ide.*.md
rm -f .github/prompts/ide.*.prompt.md
# If IntentKit wrote CLAUDE.md and you want it gone:
rm -f CLAUDE.md
```

The repo is identical to its pre-install state. No package.json entries to revert, no CI/CD changes to undo.
