# Tasks: Zero-Friction Drop-In Install

- Intent ID: 002-zero-friction-install
- Updated: 2026-06-28

## Task List

### T1 — Add skip-if-exists to `intentkit init`
- Status: todo
- File: `intent-kit/bin/intentkit.js`
- Change: Wrap every `fs.writeFileSync` in an `if (!fs.existsSync(filePath))` check. Log `⚠ Skipped (exists): <path>` for each skipped file. Log `✓ Created: <path>` for each written file.
- Acceptance: Running `intentkit init` twice in a row produces identical output from the second run — all files skipped, none overwritten.

### T2 — Add `--dry-run` flag
- Status: todo
- File: `intent-kit/bin/intentkit.js`
- Change: Parse `process.argv.includes('--dry-run')`. When true, replace all write calls with console output only. Print `[dry-run] would create: <path>` or `[dry-run] would skip (exists): <path>`. Exit without writing.
- Acceptance: Running `intentkit init --dry-run` on a fresh directory prints every file that would be created. Running it on an initialized repo prints all files as "would skip". Zero files are written in both cases.

### T3 — Add `--force` flag
- Status: todo
- File: `intent-kit/bin/intentkit.js`
- Change: Parse `process.argv.includes('--force')`. When true, skip the `existsSync` check and write all files. Add explicit guard: even with `--force`, skip `CLAUDE.md` if it exists and print the CLAUDE.md conflict notice.
- Acceptance: Running `intentkit init --force` after modifying a template file restores the template to its default. `CLAUDE.md` is never overwritten regardless of flags.

### T4 — CLAUDE.md conflict notice
- Status: todo
- File: `intent-kit/bin/intentkit.js`
- Change: Before the main init loop, check if `CLAUDE.md` exists. If yes, print the conflict notice and skip it. If no, write the IntentKit CLAUDE.md normally.
- Acceptance: Running init on a repo with an existing CLAUDE.md prints the notice. The existing CLAUDE.md content is unchanged after init.

### T5 — Rename package to `intentkit`
- Status: todo
- File: `intent-kit/package.json`
- Change: Update `"name"` field from `"intent-kit"` to `"intentkit"`.
- Acceptance: `node -e "console.log(require('./intent-kit/package.json').name)"` outputs `intentkit`.

### T6 — Publish `intentkit` to npm
- Status: todo
- Requires: T5 complete, npm account with publish rights
- Steps: `cd intent-kit && npm publish`
- Acceptance: `npx intentkit init` works from a directory that has never had IntentKit installed. Takes under 10 seconds.

### T7 — Update `intentkit doctor` output
- Status: todo
- File: `intent-kit/bin/intentkit.js`
- Change: In the `doctor` command, for each expected file check: exists (✓), missing (✗), or conflicted (⚠ skipped on init). Store a simple state file in `.intent/.intentkit-state.json` during init to track what was skipped.
- Acceptance: After running init on a repo with conflicts, `intentkit doctor` lists both installed files and skipped files with their reasons.

### T8 — Write uninstall docs
- Status: todo
- File: `intent-kit/docs/getting-started.md`
- Change: Add a "Remove IntentKit" section at the end with the exact `rm` commands. Keep it under 8 lines.
- Acceptance: A developer who has never used IntentKit can fully remove it following only those instructions.

### T9 — Verify on three repo types
- Status: todo
- Requires: T1–T4 complete
- Steps:
  1. Empty temp directory → `intentkit init` → confirm all files created
  2. Directory with existing `.claude/commands/my-custom.md` → `intentkit init` → confirm `my-custom.md` untouched, all `ide.*.md` created
  3. Directory with existing `CLAUDE.md` → `intentkit init` → confirm CLAUDE.md content unchanged, notice printed
- Acceptance: All three scenarios pass. Results documented in `evidence.md`.
