# Intent Kit

**Intent Kit** is an executable starter repository for **Intent-Driven Engineering (IDE)**: a practical alternative and complement to spec-driven development tools.

Spec-driven tools make the specification executable. **Intent Kit makes the whole delivery loop executable**: business intent, product outcomes, architecture context, repo evidence, plan, tasks, implementation guidance, verification evidence, and impact measurement.

This repo is designed to be dropped into a greenfield or brownfield software project and used with Claude Code, GitHub Copilot, Cursor, Codex, Gemini CLI, or any repo-aware coding agent.

## Why this exists

AI coding tools are moving from prompt-driven coding toward structured, persistent artifacts. GitHub Spec Kit popularized the pattern of constitution -> specification -> plan -> tasks -> implementation. Intent Kit uses a similar level of executable structure, but keeps the core IDE position:

> Business intent is the source of truth. Code is only successful when it satisfies intent, fits the repo, proves itself with evidence, and produces measurable impact.

## Quick start

```bash
# Option A: use directly from this repo
node bin/intentkit.js init
node bin/intentkit.js feature "customer onboarding wizard"
node bin/intentkit.js status

# Option B: install locally in another repo
npm link
intentkit init
intentkit feature "customer onboarding wizard"
```

Then open the repo in Claude Code and run the command prompts from:

```text
.claude/commands/ide.capture.md
.claude/commands/ide.refine.md
.claude/commands/ide.plan.md
.claude/commands/ide.tasks.md
.claude/commands/ide.implement.md
.claude/commands/ide.verify.md
.claude/commands/ide.evidence.md
.claude/commands/ide.impact.md
```

For Copilot-compatible prompt files, see:

```text
.github/prompts/
```

## Day-one workflow

1. `intentkit init` creates the IDE structure.
2. `intentkit feature "feature name"` creates a numbered intent workspace.
3. Use `ide.capture` to capture the business and product intent.
4. Use `ide.refine` to remove ambiguity and force decisions.
5. Use `ide.context` to pull repo evidence before implementation.
6. Use `ide.plan` to create the technical implementation plan.
7. Use `ide.tasks` to generate ordered delivery tasks.
8. Use `ide.implement` to guide the coding agent through repo-aware implementation.
9. Use `ide.verify` to run tests, checks, and acceptance validation.
10. Use `ide.evidence` and `ide.impact` to prove delivery and measure outcome.

## Repo structure

```text
.intent/
  memory/
    principles.md
    architecture-rules.md
    team-standards.md
    definition-of-done.md
  templates/
    product-intent-template.md
    feature-intent-template.md
    repo-context-template.md
    architecture-intent-template.md
    implementation-plan-template.md
    tasks-template.md
    verification-template.md
    evidence-template.md
    impact-template.md
  playbooks/
    brownfield-onboarding.md
    feature-delivery-loop.md
    pull-request-review.md
    agent-operating-model.md
  skills/
    repo-cartographer.md
    api-integrator.md
    ui-implementer.md
    test-evidence-engineer.md
    security-reviewer.md
  metrics/
    ide-metrics.md
intents/
  001-example-feature/
    intent.md
    repo-context.md
    architecture.md
    plan.md
    tasks.md
    verification.md
    evidence.md
    impact.md
.claude/commands/
.github/prompts/
bin/intentkit.js
```

## Core difference from spec-driven development

| Spec-driven pattern | Intent-driven pattern |
|---|---|
| Specification is primary artifact | Intent is primary artifact |
| Focuses on requirements, plan, tasks, implementation | Covers business outcome, repo context, architecture, implementation, evidence, and impact |
| Optimized for coding agent workflow | Optimized for feature team delivery workflow |
| Often greenfield-friendly | Brownfield-first, repo-aware, enterprise-friendly |
| Success means implementation matches spec | Success means delivery satisfies intent and produces measurable evidence |
| Usually stops around implementation | Continues through verification, adoption, ROI, and learning loop |

## Positioning

Intent Kit can coexist with Spec Kit. A team can use Spec Kit for low-level feature specifications and use Intent Kit above it as the delivery operating model. Intent Kit is the enterprise wrapper around the AI-native engineering loop.

## License

MIT. See `LICENSE`.
