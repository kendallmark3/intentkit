# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IntentKit is the executable starter kit for **Intent-Driven Engineering** — a structured AI-native software delivery methodology. The goal: take a vague business request through a repeatable loop of intent → repo-aware plan → tasks → implementation → verification → evidence → impact.

This is the **primary distinction** from spec-driven tools: IntentKit makes the full delivery loop executable, not just the specification phase.

## Current State

The repository is in blueprint phase. Only `readme.md` exists. The first task is building the project from that blueprint.

Before coding, inspect:
- `readme.md` — the project charter and source of truth
- `.intent/memory/*` — team knowledge (once initialized)
- `.intent/templates/*` — document templates
- existing `intents/*` — example feature folders
- `.claude/commands/*` — slash command files
- `package.json` and `bin/intentkit.js` — CLI (once created)

After inspecting, summarize what exists, what is missing, what inconsistencies exist, and what to implement next.

## Planned Repository Structure

```
.intent/
  memory/           # principles.md, architecture-rules.md, team-standards.md, definition-of-done.md
  templates/        # intent, repo-context, architecture, plan, tasks, verification, evidence, impact
  playbooks/        # brownfield-onboarding, feature-delivery-loop, agent-operating-model
  skills/           # repo-cartographer, api-integrator, ui-implementer, test-evidence-engineer
  metrics/

.claude/
  commands/         # ide.capture, ide.refine, ide.context, ide.plan, ide.tasks,
                    # ide.implement, ide.verify, ide.evidence, ide.impact

.github/
  prompts/          # intent-capture, intent-plan, intent-verify

intents/
  001-example-feature/
    intent.md, repo-context.md, architecture.md, plan.md,
    tasks.md, verification.md, evidence.md, impact.md

docs/
bin/
  intentkit.js
package.json
```

## CLI Commands

```bash
intentkit init                            # Initialize .intent/ baseline structure
intentkit feature "feature name"          # Create new feature folder under intents/
intentkit status                          # Show which artifacts exist or are missing
intentkit doctor                          # Validate repo readiness
intentkit plan <feature-folder>           # Show planning artifacts
intentkit tasks <feature-folder>          # Show task list
intentkit evidence <feature-folder>       # Show verification/evidence
```

The first implementation is plain Node.js with no heavy dependencies. Keep it simple and hackable.

## Day-One Implementation Priorities

1. `intentkit init` — creates the full baseline structure
2. `intentkit feature "name"` — creates a complete feature folder under `intents/`
3. Templates for intent, repo context, architecture, plan, tasks, verification, evidence, impact
4. Claude Code slash-command files under `.claude/commands/`
5. Copilot-compatible prompts under `.github/prompts/`
6. One complete example feature under `intents/001-example-feature/`
7. `intentkit status` — show artifact completeness
8. `intentkit doctor` — validate repo readiness
9. Docs comparing IntentKit to spec-driven approaches
10. Enterprise adoption playbook

## After Implementation

Always produce evidence:
- files changed
- commands run
- generated output
- known limitations
- next recommended tasks

If tests are available, run them. If not, add lightweight validation where appropriate.

## Language Guardrails

**Use:** intent, evidence, impact, delivery loop, guardrails, repo-aware execution, feature intent, architecture intent, repo context

**Avoid overusing:** specification, spec-first, constitution, magic automation, autonomous developer, fully automated delivery

The repo can mention spec-driven approaches for contrast, but primary language must stay intent-driven.

## Scope Guardrails

- Do not rename the project away from **IntentKit**
- Do not convert it into a generic prompt library
- Do not make it dependent on one vendor — Claude Code is the primary target but remain compatible with Copilot, Cursor, Gemini CLI
- Do not replace Jira, GitHub, CI/CD, Figma — provide the intent layer that helps teams use those tools better
- Do not over-engineer. Prefer simple files, clear markdown, and working commands over abstract frameworks.

## Template Quality Standard

Every template artifact should answer at least one of:
- What are we trying to build?
- Why does it matter?
- What repo facts must we respect?
- What architecture path are we taking?
- What tasks need to be done?
- How will we verify it?
- What evidence proves it?
- What impact did it create?
