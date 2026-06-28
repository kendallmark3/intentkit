# Feature Intent: Zero-Friction Drop-In Install

- Intent ID: 002-zero-friction-install
- Created: 2026-06-28
- Status: Captured

## 1. Business Intent

Any developer — on any repo, greenfield or legacy — should be able to add IntentKit in under five minutes with no changes to their existing workflow, toolchain, or agent setup. It installs like an appliance: once it's there, you use it if you want it and ignore it if you don't. It should never break, overwrite, or conflict with anything already in the repo.

## 2. User / Customer Intent

**Software engineers** who already have a working repo and a coding agent (Claude Code, Copilot, Cursor, Codex, Gemini CLI, or any other) and want to adopt Intent-Driven Engineering without blowing up their existing setup.

**Training companies and consultants** who need to drop IntentKit into a participant's repo during a workshop without a 30-minute setup process.

**Engineering managers** who want to roll IntentKit out across multiple teams and repos without asking each team to restructure their project.

The job to be done: "Add structured intent and evidence workflows to a repo I already own, without touching my CI/CD, my package.json, my existing CLAUDE.md, or my existing agent configuration."

## 3. Scope

### In scope

- `intentkit init` works on any repo without overwriting existing files
- Install via `npx intentkit init` with no prior global install
- Detects and coexists with existing `.claude/commands/`, `CLAUDE.md`, `.cursor/rules/`, `.github/copilot-instructions.md`
- Additive only — every file it creates can be deleted without leaving the repo in a broken state
- Works without adding any `intentkit` dependency to the target repo's `package.json`
- A `--dry-run` flag that shows what would be created without touching anything
- A `--force` flag that explicitly allows overwriting (off by default)
- Documentation on how to uninstall (delete these folders)

### Out of scope

- Auto-detecting existing intents or migrating from other formats
- Modifying the target repo's CI/CD pipelines
- Installing agent plugins or IDE extensions
- Syncing with Jira, GitHub Issues, or other project management tools
- Authentication or licensing checks

## 4. Inputs

- `readme.md` — project charter defining the "appliance" philosophy
- `implementation.md` — Phase 1 build plan, Step 2 (`intentkit init`) is the foundation
- `intent-kit/bin/intentkit.js` — existing CLI, currently does not handle file conflicts
- `intent-kit/.intent/memory/principles.md` — governing philosophy to preserve

## 5. Acceptance Intent

The feature is acceptable when:

- [ ] `npx intentkit init` runs on a repo with zero prior setup and produces the full `.intent/` structure
- [ ] Running `intentkit init` a second time on the same repo does not overwrite any existing files
- [ ] Running `intentkit init` on a repo that already has `.claude/commands/` files does not delete or modify those files
- [ ] Running `intentkit init` on a repo that already has a `CLAUDE.md` does not overwrite it — it prints a notice instead
- [ ] Running `intentkit init --dry-run` shows every file that would be created without writing anything
- [ ] A developer can remove IntentKit completely by deleting `.intent/`, `intents/`, `.claude/commands/ide.*.md`, and `.github/prompts/ide.*.md` — the repo is unchanged otherwise
- [ ] The install works on a Node 18+ repo, a Python repo, a Go repo, a Java repo, and a repo with no language at all
- [ ] `intentkit doctor` confirms the install is complete and lists any files that weren't written due to conflicts

## 6. Non-Functional Intent

**Zero dependencies in target repo.** The `intentkit init` command must not add any entry to the target repo's `package.json` or any lockfile. It writes files — nothing else.

**No network calls during init.** Install works air-gapped. Templates are bundled into the CLI, not fetched from a CDN.

**Non-destructive by default.** Any operation that would overwrite an existing file must require an explicit flag. Default behavior is always safe.

**File-system only.** IntentKit must not write to databases, call APIs, read environment variables, or require any cloud service to initialize.

**Speed.** `intentkit init` completes in under 3 seconds on any machine.

## 7. Assumptions

- The target repo is a local directory with a filesystem the CLI can write to
- Node.js 18+ is available on the machine (or `npx` is available via Node)
- The developer has write access to the repo directory
- The intent is that IntentKit files live alongside existing agent config, not replace it
- Slash command files (`.claude/commands/ide.*.md`) use a distinct `ide.` prefix that is unlikely to conflict with other installed commands

## 8. Open Questions

- Should `intentkit init` also write a brief `# IntentKit` section to an existing `CLAUDE.md` (with a backup), or always leave existing `CLAUDE.md` untouched?
- Should we publish `intentkit` to npm so `npx intentkit init` works without a local clone?
- Should `--agent` flag allow targeting a specific agent config? (e.g., `--agent cursor` only writes `.cursor/rules/` files)
- Should init detect that `.claude/commands/` already has files and suggest a `--merge` option?

## 9. Decisions

| Date | Decision | Rationale | Owner |
|---|---|---|---|
| 2026-06-28 | Default behavior is additive-only, no overwrites | Developers must trust that one command won't damage their repo | IntentKit |
| 2026-06-28 | Files use `ide.` prefix in `.claude/commands/` | Namespacing prevents conflict with other Claude Code skills | IntentKit |
| 2026-06-28 | No dependencies added to target repo's package.json | Teams shouldn't have to explain IntentKit in their dependency audit | IntentKit |
