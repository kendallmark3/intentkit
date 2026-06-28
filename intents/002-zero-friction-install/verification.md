# Verification: Zero-Friction Drop-In Install

- Intent ID: 002-zero-friction-install
- Updated: 2026-06-28
- Status: Not started

## Acceptance Checks

### Check 1 — First install on a clean repo
```bash
mkdir /tmp/test-greenfield && cd /tmp/test-greenfield
npx intentkit init
```
Expected:
- All `.intent/`, `intents/`, `.claude/commands/ide.*.md`, `.github/prompts/ide.*.prompt.md` files created
- `CLAUDE.md` created (no prior CLAUDE.md existed)
- Output shows `✓ Created:` for every file
- No errors
- Time under 5 seconds

Result: [ ] pass [ ] fail

---

### Check 2 — Second install is safe (idempotent)
```bash
npx intentkit init   # run a second time in the same directory
```
Expected:
- No files overwritten
- Output shows `⚠ Skipped (exists):` for every file
- All original file contents unchanged

Result: [ ] pass [ ] fail

---

### Check 3 — Coexistence with existing `.claude/commands/` files
```bash
mkdir /tmp/test-existing-commands && cd /tmp/test-existing-commands
mkdir -p .claude/commands
echo "# My custom skill" > .claude/commands/my-deploy.md
npx intentkit init
```
Expected:
- `my-deploy.md` untouched
- All `ide.*.md` files created
- No mention of `my-deploy.md` in output other than it being ignored

Result: [ ] pass [ ] fail

---

### Check 4 — Existing `CLAUDE.md` is never overwritten
```bash
mkdir /tmp/test-existing-claude && cd /tmp/test-existing-claude
echo "# My team CLAUDE.md" > CLAUDE.md
npx intentkit init
```
Expected:
- `CLAUDE.md` content still reads `# My team CLAUDE.md`
- Output includes the conflict notice pointing to `intent-kit/CLAUDE.md`
- No error thrown

Result: [ ] pass [ ] fail

---

### Check 5 — `--dry-run` writes nothing
```bash
mkdir /tmp/test-dryrun && cd /tmp/test-dryrun
npx intentkit init --dry-run
ls -la
```
Expected:
- Directory is still empty (or contains only what was there before)
- Output lists every file that would be created prefixed with `[dry-run]`
- Exit code 0

Result: [ ] pass [ ] fail

---

### Check 6 — `--force` overwrites IntentKit files but not CLAUDE.md
```bash
cd /tmp/test-greenfield   # already initialized
echo "MODIFIED" >> .intent/memory/principles.md
echo "# Protected" > CLAUDE.md
npx intentkit init --force
```
Expected:
- `principles.md` restored to default IntentKit content
- `CLAUDE.md` still reads `# Protected` — not overwritten
- CLAUDE.md conflict notice printed

Result: [ ] pass [ ] fail

---

### Check 7 — Works on a non-Node repo (Python)
```bash
mkdir /tmp/test-python && cd /tmp/test-python
echo "flask==3.0.0" > requirements.txt
npx intentkit init
```
Expected:
- Full install completes normally
- `requirements.txt` untouched
- No language-specific errors

Result: [ ] pass [ ] fail

---

### Check 8 — `npx intentkit init` works with no prior install
Requires npm publish to be complete (T6).
```bash
# On a machine that has never installed intentkit
npx intentkit@latest init
```
Expected:
- npm fetches the package
- Init runs and completes
- No global install required after

Result: [ ] pass [ ] fail — blocked on T6

---

### Check 9 — Uninstall leaves repo clean
```bash
cd /tmp/test-greenfield
rm -rf .intent/ intents/
rm -f .claude/commands/ide.*.md
rm -f .github/prompts/ide.*.prompt.md
rm -f CLAUDE.md
ls -la
```
Expected:
- Only files that existed before IntentKit are present
- No orphaned dirs or files

Result: [ ] pass [ ] fail

---

## Edge Cases

| Scenario | Expected behavior |
|---|---|
| Target dir has no write permissions | CLI prints permission error, exits with code 1, writes nothing |
| `.intent/` exists as a file (not a dir) | CLI prints error, skips `.intent/` creation, continues with other paths |
| Node version below 18 | CLI prints warning, continues |
| Running as root | Works normally |
| Repo is a git repo with uncommitted changes | IntentKit is unaware of git — writes files normally |
| Running inside another tool's monorepo | Works as long as cwd is the target root |
