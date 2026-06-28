# Architecture Intent: Zero-Friction Drop-In Install

- Intent ID: 002-zero-friction-install
- Updated: 2026-06-28

## Architectural Principle

IntentKit installs like a filesystem appliance. It writes files into well-defined, namespaced paths. It reads nothing from the target repo except to check whether its own files already exist. It never modifies files it did not create.

## Install Path Architecture

### Entry point

```
npx intentkit init               # no prior install needed
npx intentkit init --dry-run     # show what would happen, write nothing
npx intentkit init --force       # overwrite existing IntentKit files
npx intentkit init --agent=cursor  # also write .cursor/rules/ variants
```

### What `intentkit init` does

```
1. Check Node version (warn if < 18, proceed anyway)
2. Detect target repo root (cwd)
3. Run conflict scan:
   - For each file IntentKit would write:
     - If file exists → add to SKIPPED list, do not touch
     - If file does not exist → add to WRITE list
4. Write all files in WRITE list
5. Print summary:
   - ✓ Created: N files
   - ⚠ Skipped (already exists): N files
   - Run with --force to overwrite skipped files
6. Print next step: intentkit doctor
```

### File conflict rules

| Scenario | Default behavior | With `--force` |
|---|---|---|
| `.intent/` dir doesn't exist | Create all files | Same |
| `.intent/` dir exists, files missing | Create missing files only | Same |
| `.intent/` dir exists, files present | Skip, warn | Overwrite |
| `CLAUDE.md` doesn't exist | Write IntentKit CLAUDE.md | Same |
| `CLAUDE.md` exists (any content) | Skip, print notice | Skip (never force-overwrite CLAUDE.md) |
| `.claude/commands/ide.*.md` missing | Write | Write |
| `.claude/commands/ide.*.md` exists | Skip, warn | Overwrite |
| `.claude/commands/<other>.md` | Never touch | Never touch |

**CLAUDE.md is never force-overwritten.** If a developer has a CLAUDE.md, it belongs to them. IntentKit prints a message telling them to add the IntentKit section manually (or copy from `intent-kit/CLAUDE.md`).

## Namespace Architecture

### `.claude/commands/` namespace

IntentKit uses `ide.` prefix exclusively:

```
ide.capture.md
ide.refine.md
ide.context.md
ide.plan.md
ide.tasks.md
ide.implement.md
ide.verify.md
ide.evidence.md
ide.impact.md
```

Any file in `.claude/commands/` that does not start with `ide.` is ignored entirely. This means IntentKit coexists with skills like `code-review.md`, `deploy.md`, `run.md`, and any org-prefixed commands already installed.

### `.github/prompts/` namespace

IntentKit uses `ide.*.prompt.md` pattern:

```
ide.capture.prompt.md
ide.plan.prompt.md
ide.verify.prompt.md
...
```

Other prompt files (`feature.prompt.md`, `copilot-instructions.md`, etc.) are untouched.

### `.intent/` directory

Exclusively IntentKit's. No other tooling uses this path. No conflict risk.

### `intents/` directory

Exclusively IntentKit's. Feature folders are auto-numbered (`001-`, `002-`, etc.) so there is no naming collision even if two developers create features simultaneously.

## Uninstall Architecture

Uninstall is manual and documented. No uninstall command is needed because the install is purely additive:

```bash
# Remove IntentKit from a repo
rm -rf .intent/
rm -rf intents/
rm -f .claude/commands/ide.*.md
rm -f .github/prompts/ide.*.prompt.md
# Optionally remove CLAUDE.md if IntentKit wrote it
```

After this, the repo is identical to its pre-install state. No package.json entries to remove. No CI/CD changes to revert.

## npm Publish Architecture

To enable `npx intentkit init`:

1. Rename package to `intentkit` (or scope as `@intentkit/cli`) in `package.json`
2. Publish to npm: `npm publish`
3. Users run: `npx intentkit init` — npm fetches latest, runs, exits

The CLI must work as a zero-dependency script. All templates are embedded in `intentkit.js` as string constants (or loaded from files bundled alongside it), not fetched from the network.

## Agent Coexistence Architecture

IntentKit files are read-only artifacts from the perspective of other agents. When Claude Code, Copilot, or Cursor reads a repo, they see:

```
.claude/commands/ide.capture.md      ← Claude Code picks this up as a slash command
.github/prompts/ide.capture.prompt.md  ← Copilot picks this up as a prompt file
.intent/memory/principles.md          ← Any agent can read this as context
intents/001-example/intent.md        ← Any agent can read this as context
```

No agent is required to use any of these files. They sit in the repo and become available to whichever agent the developer chooses to use that day.

## `--dry-run` Architecture

When `--dry-run` is passed:

1. Run all detection and conflict logic normally
2. Print the full list of files that would be created and files that would be skipped
3. Write nothing to disk
4. Exit with code 0 if no errors would occur, code 1 if any conflict would require `--force`

## What This Architecture Deliberately Avoids

- No package.json modification in the target repo
- No `.gitignore` modification
- No CI/CD changes
- No environment variables
- No database, no network calls, no cloud services
- No changes to any file the user didn't ask IntentKit to create
