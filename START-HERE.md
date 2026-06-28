# Start Here

This repo is IntentKit — a set of tools that installs an intent-driven delivery workflow into any repo on your machine.

**Tested on:** Mac with Node.js installed. Windows not tested.

---

## Step 1 — Clone this repo

```bash
git clone https://github.com/kendallmark3/intentkit.git
cd intentkit
```

---

## Step 2 — Make `intentkit` a global command

Run this once. You never have to do it again.

```bash
cd intent-kit
npm link
```

Verify it worked:

```bash
intentkit help
```

You should see the command menu. You're done with setup.

---

## Step 3 — Go to any repo and install IntentKit

```bash
cd /path/to/your-project
intentkit init
```

That's it. IntentKit creates its folders and files. Your existing code, config, and agent setup are untouched.

Confirm everything installed:

```bash
intentkit doctor
```

---

## Step 4 — Start a feature

```bash
intentkit feature "what you're building"
```

Opens a folder under `intents/` with all the artifact files ready to fill in.

---

## Step 5 — Run the delivery loop in Claude Code

Open your project in Claude Code and run these slash commands in order:

```
/ide.capture
/ide.context
/ide.plan
/ide.tasks
/ide.implement
/ide.verify
/ide.evidence
/ide.impact
```

Each command moves you one step through the loop — from intent to working, evidenced code.

---

## What IntentKit puts in your repo

```
.intent/          memory, templates, playbooks — context for your agent
.claude/commands/ the /ide.* slash commands for Claude Code
.github/prompts/  the same commands in Copilot-compatible format
intents/          your feature workspaces live here
CLAUDE.md         tells Claude Code how to behave in this repo
```

None of these touch your existing code. Remove them any time by deleting the folders.

---

## Remove IntentKit from a repo

```bash
rm -rf .intent/ intents/
rm -f .claude/commands/ide.*.md
rm -f .github/prompts/ide.*.prompt.md
```

The repo is back to exactly how it was before.
