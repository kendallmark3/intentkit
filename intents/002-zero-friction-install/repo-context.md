# Repo Context: Zero-Friction Drop-In Install

- Intent ID: 002-zero-friction-install
- Updated: 2026-06-28

## Current CLI: `intent-kit/bin/intentkit.js`

The existing `intentkit init` command already creates the full `.intent/` directory tree, `.claude/commands/`, `.github/prompts/`, `intents/`, and an example feature folder. It uses `fs.mkdirSync` and `fs.writeFileSync` calls directly with no overwrite protection — it will silently overwrite any existing file.

**Gap:** There is no conflict detection, no `--dry-run` flag, no `--force` flag, and no skip-if-exists logic.

## Current Install Model

There is no npm publish. Install today requires:
1. Clone the `intentkit` repo locally
2. `cd intent-kit && npm link` to make `intentkit` globally available
3. Navigate to target repo and run `intentkit init`

**Gap:** `npx intentkit init` does not work because the package is not published to npm.

## File Naming in `.claude/commands/`

All IntentKit command files use the `ide.` prefix (`ide.capture.md`, `ide.plan.md`, etc.). This is already implemented. The prefix creates a natural namespace that is unlikely to conflict with other Claude Code skills, which typically use plain names (`code-review.md`, `run.md`, etc.) or organization prefixes (`myorg.deploy.md`).

**Current risk:** No documentation tells users about this prefix or how to add their own commands alongside IntentKit's.

## Coexistence with Other Agent Configs

| Config location | IntentKit touches it? | Risk |
|---|---|---|
| `CLAUDE.md` (root) | Currently yes — `init` writes one if absent, but may overwrite if present | **High risk** |
| `.claude/commands/*.md` | Currently writes all `ide.*.md` files with no conflict check | Medium risk |
| `.cursor/rules/` | Not touched | None |
| `.github/copilot-instructions.md` | Not touched | None |
| `.github/prompts/*.md` | Writes `ide.*.prompt.md` files with no conflict check | Low risk (distinct prefix) |
| `package.json` in target repo | Not touched | None |
| `.gitignore` | Not touched | None |
| CI/CD files | Not touched | None |

## Target Repo Diversity

IntentKit must work on repos that are:
- Pure Node.js, Python, Go, Java, Ruby, or mixed
- Repos with existing CLAUDE.md and Claude Code skills already configured
- Repos using Cursor with `.cursor/rules/` already populated
- Repos using Copilot with `.github/copilot-instructions.md` already set
- Repos with no coding agent configured at all
- Completely empty (greenfield)
- Large brownfield repos with years of history

The CLI must treat the target repo as a black box and only write into the specific paths it owns.

## What IntentKit Owns in a Target Repo

These paths belong to IntentKit and are safe to write into:

```
.intent/                      # exclusively IntentKit's
intents/                      # exclusively IntentKit's
.claude/commands/ide.*.md     # namespaced, IntentKit's
.github/prompts/ide.*.prompt.md  # namespaced, IntentKit's
```

These paths require defensive handling:

```
CLAUDE.md                     # may already exist — never overwrite
.claude/commands/*.md         # may have non-ide. files — skip those
.github/prompts/*.md          # may have non-ide. files — skip those
```

## Existing Package Metadata (`intent-kit/package.json`)

```json
{
  "name": "intent-kit",
  "version": "0.1.0",
  "bin": { "intentkit": "./bin/intentkit.js" }
}
```

The package name is `intent-kit` but the binary is `intentkit`. For npm publish, the package name must be either `@intentkit/cli` (scoped) or `intentkit` (unscoped) for `npx intentkit` to work cleanly. The current name `intent-kit` would require `npx intent-kit` — slightly awkward.
