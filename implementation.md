# IntentKit — Phase 1 Implementation Plan
## Goal: Training Company Ready

A trainer should be able to open this repo in front of a class, run two commands, and walk participants through the entire Intent-Driven Engineering delivery loop live. Every artifact must be readable, every command must work, and the example feature must be complete enough to teach from.

---

## Phase 1 Steps

### Step 1 — Initialize the repo as a proper Node.js project

**What:** Create `package.json` with project metadata, bin entry point, and basic scripts.

**Why:** Participants need to be able to run `npm install -g .` or `node bin/intentkit.js init` immediately after cloning. No setup friction.

**Deliverable:** `package.json` with name, version, description, `bin.intentkit` pointing to `bin/intentkit.js`, and a `start` script.

---

### Step 2 — Build `intentkit init`

**What:** Implement the `init` command in `bin/intentkit.js` using plain Node.js (no external dependencies). When run, it creates the full `.intent/` directory tree, `.claude/commands/`, `.github/prompts/`, `intents/`, and `docs/` with placeholder files.

**Why:** The first thing a trainer does in class is run `intentkit init` to show the structure materializing live. If this doesn't work, the session is dead.

**Files it creates on first run:**
- `.intent/memory/principles.md`
- `.intent/memory/architecture-rules.md`
- `.intent/memory/team-standards.md`
- `.intent/memory/definition-of-done.md`
- `.intent/templates/` — all 9 templates (see Step 4)
- `.intent/playbooks/` — all 4 playbooks (see Step 6)
- `.claude/commands/` — all 9 command files (see Step 5)
- `.github/prompts/` — 3 prompt files
- `intents/001-example-feature/` — all 8 artifacts (see Step 7)
- `docs/getting-started.md`

**Deliverable:** `bin/intentkit.js` — a single, readable file under 300 lines.

---

### Step 3 — Build `intentkit feature "name"`

**What:** Implement the `feature` command. Takes a quoted name, slugifies it (lowercase, hyphens), auto-numbers it (e.g. `002-`), creates the folder under `intents/`, and scaffolds all 8 artifact files with the relevant template content pre-filled where possible (feature name, date, status: draft).

**Why:** In a training session, the class picks a feature to build together. The trainer runs this command and the folder appears. Participants immediately see the structure they'll fill in.

**Deliverable:** `feature` command in `bin/intentkit.js`.

---

### Step 4 — Write all 9 templates under `.intent/templates/`

Each template must be practical — no filler, no buzzwords, every section answerable in under 5 minutes by a working developer.

| File | Must answer |
|------|-------------|
| `feature-intent-template.md` | What, why, who benefits, success measures, constraints, assumptions |
| `product-intent-template.md` | Product goal, user outcomes, business impact, non-goals |
| `repo-context-template.md` | Relevant dirs, frameworks, APIs, patterns, test coverage, build commands, known debt |
| `architecture-intent-template.md` | UI layer, API layer, backend logic, data storage, auth, hosting, CI/CD, observability, security, integration boundaries |
| `implementation-plan-template.md` | Ordered implementation steps, dependencies, risks, rollback approach |
| `tasks-template.md` | Numbered task list with owner, status (todo/in-progress/done), acceptance criteria per task |
| `verification-template.md` | Test plan, acceptance checks, edge cases, performance criteria, security checks |
| `evidence-template.md` | Files changed, commands run, test output, screenshots/logs, known limitations, decisions made |
| `impact-template.md` | Business outcome achieved, metrics before/after, cycle time, rework avoided, next opportunities |

**Deliverable:** 9 `.md` files in `.intent/templates/`. Each under 60 lines. Every field has a one-line prompt, not Lorem ipsum.

---

### Step 5 — Write all 9 Claude Code slash-command files under `.claude/commands/`

These are the files that make Claude Code executable in a training session. A participant opens Claude Code, types `/ide.capture`, and the agent knows exactly what to do.

| Command file | Agent behavior |
|---|---|
| `ide.capture.md` | Ask 5 questions to capture a feature intent. Write to `intents/<current>/intent.md`. |
| `ide.refine.md` | Review the current `intent.md`, ask what's unclear, rewrite weak sections. |
| `ide.context.md` | Inspect the repo. Fill in `intents/<current>/repo-context.md` with real findings. |
| `ide.plan.md` | Read intent + repo context. Write `plan.md` with ordered implementation steps. |
| `ide.tasks.md` | Break `plan.md` into `tasks.md` — numbered, ownable, each with acceptance criteria. |
| `ide.implement.md` | Read `tasks.md`, implement the next uncompleted task, mark it done. |
| `ide.verify.md` | Run tests, check acceptance criteria in `tasks.md`, fill in `verification.md`. |
| `ide.evidence.md` | Collect files changed, commands run, output. Write `evidence.md`. |
| `ide.impact.md` | Ask about observed outcomes. Write `impact.md` with business and delivery notes. |

Each file must open with a one-paragraph role statement so the agent knows its purpose without reading other files.

**Deliverable:** 9 `.md` files in `.claude/commands/`.

---

### Step 6 — Write 4 playbooks under `.intent/playbooks/`

Playbooks are what trainers hand to participants as reference cards. They describe the workflow, not the code.

| File | What it covers |
|---|---|
| `feature-delivery-loop.md` | The 8-step loop from intent to impact. When to use each command. What artifact each step produces. When to pause for human review. |
| `brownfield-onboarding.md` | How to run IntentKit on an existing messy repo. What to inspect first. How to fill in `repo-context.md` when the codebase is unfamiliar. Common blockers. |
| `agent-operating-model.md` | How Claude Code should behave in this repo. When to stop and ask a human. What "evidence" means in practice. How to avoid over-engineering. |
| `pull-request-review.md` | How to use `evidence.md` and `verification.md` as the basis for a PR description. What a reviewer should check. |

**Deliverable:** 4 `.md` files in `.intent/playbooks/`. Each 1–3 pages. Written for a developer, not a product manager.

---

### Step 7 — Build one complete example feature under `intents/001-example-feature/`

**What:** A fully filled-in feature folder that demonstrates what "done" looks like. All 8 artifact files completed as if the feature was actually delivered.

**Why:** In training, this is the first thing participants read. It calibrates their expectations for every artifact they'll write. If the example is weak, the method looks weak.

**Suggested feature:** "Add a feature intent status badge to the README" — simple enough to be understood by anyone, but real enough to demonstrate repo context, architecture decisions, and evidence.

**All 8 files must be complete:**
- `intent.md` — filled with real intent, not placeholders
- `repo-context.md` — real repo observations about IntentKit itself
- `architecture.md` — the architectural path for the feature (even if trivial)
- `plan.md` — real ordered steps
- `tasks.md` — tasks with status: done
- `verification.md` — acceptance checks with results
- `evidence.md` — actual files changed, commands run, output
- `impact.md` — what it demonstrates about the method

**Deliverable:** `intents/001-example-feature/` with all 8 files complete.

---

### Step 8 — Build `intentkit status`

**What:** Scans `intents/` and for each feature folder reports which of the 8 artifacts exist and which are missing. Color-coded output (green = exists, red = missing, yellow = exists but empty).

**Why:** During a training exercise, the trainer calls `intentkit status` after each step to show progress. It's also the clearest possible demonstration of evidence-driven delivery: the status doesn't lie.

**Output format:**
```
intents/001-example-feature/
  intent.md         ✓
  repo-context.md   ✓
  architecture.md   ✓
  plan.md           ✓
  tasks.md          ✓
  verification.md   ✓
  evidence.md       ✓
  impact.md         ✓

intents/002-in-progress-feature/
  intent.md         ✓
  repo-context.md   ✓
  architecture.md   ✗ missing
  plan.md           ✗ missing
  ...
```

**Deliverable:** `status` command in `bin/intentkit.js`.

---

### Step 9 — Build `intentkit doctor`

**What:** Validates repo readiness. Checks that `.intent/memory/`, templates, Claude commands, and playbooks all exist. Warns if any are missing or empty. Reports a pass/fail with a list of issues.

**Why:** Before a training session, the trainer runs `intentkit doctor` to confirm everything is in place. It's also the first command participants run after cloning to verify their setup.

**Output:**
```
IntentKit doctor

  .intent/memory/principles.md         ✓
  .intent/memory/definition-of-done.md ✓
  .claude/commands/ide.capture.md      ✓
  ...
  package.json                         ✓
  intents/001-example-feature/         ✓ (complete)

  Status: READY
```

**Deliverable:** `doctor` command in `bin/intentkit.js`.

---

### Step 10 — Write `docs/getting-started.md`

**What:** A 2-page getting-started guide written for a developer who just cloned the repo. Covers install, `intentkit init`, the delivery loop commands, and the example feature walkthrough. Links to playbooks for depth.

**Why:** This is what a participant reads the night before the training. It sets context so class time is spent doing, not explaining.

**Structure:**
1. What is this repo (2 sentences)
2. Install and initialize (3 commands)
3. Your first feature (run `intentkit feature`, then the 8 slash commands in order)
4. Read the example (where to find it, what to look at first)
5. Where to go deeper (links to playbooks)

**Deliverable:** `docs/getting-started.md` under 2 pages.

---

## Phase 1 Completion Criteria

The phase is complete when a trainer can do all of the following without hitting a broken step:

- [ ] Clone the repo and run `npm install -g .`
- [ ] Run `intentkit doctor` and see all green
- [ ] Run `intentkit init` on a blank project and see the full structure created
- [ ] Open `intents/001-example-feature/` and read a complete, realistic feature delivery
- [ ] Run `intentkit feature "add login page"` and see a new folder with blank templates
- [ ] Open Claude Code and run `/ide.capture` through `/ide.impact` on the new feature
- [ ] Run `intentkit status` and see accurate artifact tracking
- [ ] Hand `docs/getting-started.md` to a participant and have them onboard in 15 minutes

---

## What Phase 1 Does NOT Include

- npm publish or global package registry
- GitHub Actions or CI/CD
- Python package or non-Node CLI
- Web UI or dashboard
- Metrics collection or reporting
- Multi-repo or enterprise SSO support
- `intentkit plan` and `intentkit tasks` read commands (these come in Phase 2)

---

## File Count at Phase 1 Completion

| Directory | Files |
|---|---|
| `bin/` | 1 (`intentkit.js`) |
| `.intent/memory/` | 4 |
| `.intent/templates/` | 9 |
| `.intent/playbooks/` | 4 |
| `.intent/skills/` | 0 (Phase 2) |
| `.claude/commands/` | 9 |
| `.github/prompts/` | 3 |
| `intents/001-example-feature/` | 8 |
| `docs/` | 1 (`getting-started.md`) |
| Root | 3 (`README.md`, `package.json`, `CLAUDE.md`) |
| **Total** | **42 files** |
