# Implementation Plan: Zero-Friction Drop-In Install

- Intent ID: 002-zero-friction-install
- Updated: 2026-06-28

## Implementation Order

### 1. Add skip-if-exists logic to `intentkit init`

Modify `intent-kit/bin/intentkit.js` so that every `fs.writeFileSync` call first checks `fs.existsSync`. If the file exists, log a warning and skip. If it does not exist, write normally.

This is the single most important change. It makes the tool safe to run on any repo.

### 2. Add `--dry-run` flag

Parse `process.argv` for `--dry-run`. When present, collect all files that would be written and all files that would be skipped into two lists. Print both lists. Write nothing.

### 3. Add `--force` flag

Parse `process.argv` for `--force`. When present, skip the existence check and overwrite all IntentKit-owned files. Add an explicit carve-out: `CLAUDE.md` is never overwritten even with `--force`.

### 4. Add CLAUDE.md conflict handling

If `CLAUDE.md` exists at the target root, print a notice:
```
⚠  CLAUDE.md already exists — skipped.
   To add IntentKit guidance, copy the relevant sections from:
   intent-kit/CLAUDE.md
```
Never write to it, never prompt, never modify.

### 5. Rename package to `intentkit` in `package.json`

Change `"name": "intent-kit"` to `"name": "intentkit"` so that `npx intentkit` resolves correctly after publishing.

Verify the binary entry still reads:
```json
"bin": { "intentkit": "./bin/intentkit.js" }
```

### 6. Publish to npm as `intentkit`

- Check if `intentkit` is available on npm (it may already be taken — have a fallback name ready: `@intentkit/cli`)
- Run `npm publish` from `intent-kit/`
- Verify `npx intentkit init` works from a clean directory with no prior install

### 7. Update `intentkit doctor` to report conflict state

`intentkit doctor` should list:
- Files present (IntentKit owns them)
- Files skipped on last init (conflict detected)
- Files missing (not yet created)

### 8. Write uninstall documentation

Add a "Remove IntentKit" section to `intent-kit/docs/getting-started.md` with the exact `rm` commands. One paragraph, no drama.

### 9. Test on three repo types

- Empty directory (greenfield)
- A repo that already has `.claude/commands/` with non-ide. files
- A repo that already has a `CLAUDE.md`

Document results in `intents/002-zero-friction-install/evidence.md`.

## Dependencies Between Steps

- Steps 1–3 are independent and can be done in parallel in the same editing session
- Step 4 should be done alongside Step 1 (both are about conflict handling in init)
- Step 5 must happen before Step 6
- Step 7 can happen any time after Step 1
- Step 9 must happen after Steps 1–4 are complete
