IntentKit — Claude Code Project Context

## Purpose

IntentKit is the executable starter repository for **Intent-Driven Engineering**.

The goal is to create a practical, repo-ready alternative and complement to GitHub/Microsoft-style spec-driven development kits, but using the Intent-Driven Engineering approach: business intent first, repo context second, implementation third, and evidence always.

IntentKit should help teams go from:

> vague business request → structured intent → repo-a # ware plan → tasks → implementation → verification → evidence → impact

This project exists because AI-native software delivery is moving away from casual prompting and toward structured, persistent artifacts that coding agents can follow. Spec-driven development kits are proving that the market wants executable workflows. IntentKit should meet that bar while offering a broader and better delivery model.

## Strategic Positioning

IntentKit is not simply a specification generator.

It is an operating model for AI-assisted software delivery.

A useful distinction:

- **Spec-driven development** makes the specification executable.
- **Intent-Driven Engineering** makes the delivery loop executable.

Spec-driven approaches usually focus on requirements, specifications, plans, tasks, and implementation.

IntentKit must include those same practical capabilities, but extend the workflow into:

- business intent
- product outcomes
- architecture context
- repo context
- implementation constraints
- team standards
- verification
- evidence
- delivery metrics
- impact measurement
- repeatable agent behavior

The objective is not to attack Spec Kit or Copilot. The objective is to provide a credible alternative for teams that prefer Claude Code, repo-aware workflows, stronger architecture context, and an evidence-driven delivery loop.

IntentKit should also be compatible enough that teams can understand both worlds. A team should be able to say:

> “We can use Spec Kit, IntentKit, or both. Spec Kit helps us express executable specifications. IntentKit helps us express executable delivery intent.”

## Product Goal

Build IntentKit into a public GitHub repository that a developer, architect, or engineering manager can clone and use immediately.

The repo should feel useful on day one.

It should include:

- clear README
- installable or runnable CLI
- `.intent/` project structure
- templates
- playbooks
- Claude Code commands
- Copilot-compatible prompts where useful
- example intent package
- brownfield onboarding workflow
- feature delivery workflow
- verification and evidence workflow
- metrics and impact workflow

The repo should be simple enough for a team to start in 15 minutes, but serious enough to take into an enterprise.

## Core Philosophy

IntentKit should follow these principles.

### 1. Intent before implementation

Do not jump directly into code. Capture the business purpose, user outcome, constraints, assumptions, and success measures first.

### 2. Repo-aware by default

Every plan should be grounded in the real repository. The agent should inspect structure, frameworks, APIs, dependencies, patterns, tests, build scripts, deployment configuration, and existing conventions before proposing implementation.

### 3. Architecture is part of the intent

Intent files should not only describe features. They should describe the architectural path: UI, APIs, backend logic, database/storage, authentication, hosting/deployment, CI/CD, observability, security, performance, and integration boundaries.

### 4. Evidence is mandatory

A feature is not done because code was generated. It is done when there is evidence: tests, screenshots, logs, build output, API validation, acceptance checks, and documented decisions.

### 5. Agents need guardrails

Claude Code, Copilot, Codex, Cursor, and other coding agents should operate inside a clear workflow with persistent artifacts, not loose chat instructions.

### 6. Human judgment remains central

IntentKit should support human developers, architects, product owners, and testers. It should not pretend that the agent is the owner of business judgment, architecture decisions, security acceptance, or production approval.

### 7. Delivery impact matters

The point is not faster code generation. The point is better delivery: shorter cycle time, less rework, better quality, clearer evidence, and measurable business impact.

## Target Users

IntentKit is for:

- software engineers using Claude Code or other coding agents
- architects guiding feature teams
- engineering managers trying to make AI delivery repeatable
- enterprise teams with existing brownfield repositories
- product teams that need traceability from intent to implementation
- consultants and trainers teaching AI-native delivery

It should work especially well for teams with messy real-world repositories, unclear stories, inconsistent standards, weak test coverage, and pressure to show productivity gains from AI tools.

## Relationship to Spec Kit

IntentKit should intentionally get close to the functionality people like in spec-driven kits:

- initialization command
- standard repo structure
- templates
- generated feature folder
- planning workflow
- task workflow
- implementation workflow
- validation workflow
- agent command files

But IntentKit should not copy the same philosophy or terminology blindly.

Where spec-driven tools say “specification,” IntentKit should usually say “intent.”

Where spec-driven tools say “constitution,” IntentKit can say “principles,” “team standards,” “architecture rules,” or “delivery guardrails.”

Where spec-driven tools stop at implementation, IntentKit should continue through verification, evidence, and impact.

## Recommended Repository Structure

Use this structure as the baseline:

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

.claude/
  commands/
    ide.capture.md
    ide.refine.md
    ide.context.md
    ide.plan.md
    ide.tasks.md
    ide.implement.md
    ide.verify.md
    ide.evidence.md
    ide.impact.md

.github/
  prompts/
    intent-capture.prompt.md
    intent-plan.prompt.md
    intent-verify.prompt.md

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

docs/
  getting-started.md
  spec-kit-contrast.md
  enterprise-adoption.md

bin/
  intentkit.js

README.md
package.json
```

## Desired CLI Behavior

The CLI should remain simple and useful.

Target commands:

```bash
intentkit init
intentkit feature "customer onboarding wizard"
intentkit status
intentkit doctor
intentkit plan <feature-folder>
intentkit tasks <feature-folder>
intentkit evidence <feature-folder>
```

The first implementation can be plain Node.js with no heavy dependencies.

The CLI should be able to:

- initialize `.intent/`
- create default memory files
- create template files
- create Claude command files
- create an example feature folder
- create a new feature intent folder from a title
- show status of intent artifacts
- warn when required files are missing

Do not over-engineer the CLI early. The first version should be understandable and hackable.

## Claude Code Operating Instructions

When working in this repository, Claude Code should behave like an Intent-Driven Engineering assistant.

### Before coding

Claude should inspect:

- README
- package.json
- `.intent/memory/*`
- `.intent/templates/*`
- existing `intents/*`
- `.claude/commands/*`
- current CLI implementation

Claude should then summarize:

- what currently exists
- what is missing
- what should be implemented next
- what risks or inconsistencies exist

### During implementation

Claude should keep changes small, coherent, and repo-aware.

Claude should prefer simple files, clear markdown, and working commands over abstract frameworks.

Claude should maintain alignment with Intent-Driven Engineering language:

- intent
- context
- architecture
- plan
- tasks
- verification
- evidence
- impact
- delivery loop
- guardrails
- repo-aware execution

Claude should not rename the project away from **IntentKit**.

Claude should not convert the project into a generic prompt library.

Claude should not make it dependent on one vendor only. Claude Code should be the primary target, but the repo can include Copilot-compatible prompt files and agent-neutral templates.

### After implementation

Claude should produce evidence:

- files changed
- commands run
- generated output
- known limitations
- next recommended tasks

If tests are available, run them. If tests are not available, add lightweight validation where appropriate.

## Guardrails

### Naming guardrails

Use:

- IntentKit
- Intent-Driven Engineering
- intent file
- feature intent
- product intent
- repo context
- architecture intent
- evidence
- impact
- delivery loop

Avoid overusing:

- specification
- spec-first
- constitution
- magic automation
- autonomous developer
- fully automated delivery

The repo can mention spec-driven development for contrast, but the primary language must remain intent-driven.

### Scope guardrails

IntentKit is not trying to become a full project management system.

It should not try to replace Jira, Confluence, GitHub, GitLab, Azure DevOps, Figma, or CI/CD systems.

It should provide the intent layer that helps agents and teams use those tools better.

### Vendor guardrails

Claude Code is the primary workflow target.

However, IntentKit should remain agent-portable where possible.

Do not make the repo hostile to Copilot, Codex, Cursor, Gemini CLI, or other coding agents. The market will be hybrid.

The positioning should be confident but not tribal.

### Enterprise guardrails

IntentKit should be enterprise-friendly.

That means:

- clear structure
- governance language
- security awareness
- auditability
- evidence
- human approval points
- no fake claims
- no promise that AI replaces engineering judgment

### Quality guardrails

Every generated template should be practical.

Avoid filler text.

Avoid buzzword-heavy sections that do not help a developer act.

Every artifact should answer at least one of these questions:

- What are we trying to build?
- Why does it matter?
- What repo facts must we respect?
- What architecture path are we taking?
- What tasks need to be done?
- How will we verify it?
- What evidence proves it?
- What impact did it create?

## Day-One Implementation Priorities

Focus on making the repo feel executable immediately.

Priority order:

1. Make `intentkit init` create the full baseline structure.
2. Make `intentkit feature "name"` create a complete feature folder under `intents/`.
3. Add strong templates for intent, repo context, architecture, plan, tasks, verification, evidence, and impact.
4. Add Claude Code slash-command files under `.claude/commands/`.
5. Add Copilot-compatible prompts under `.github/prompts/`.
6. Add one complete example feature.
7. Add `intentkit status` to show which artifacts exist or are missing.
8. Add `intentkit doctor` to validate repo readiness.
9. Add docs comparing IntentKit to spec-driven kits.
10. Add a simple adoption playbook for enterprise teams.

## Suggested Claude Code First Prompt

Use this prompt when starting Claude Code in the repo:

```text
You are working in the IntentKit repository.

IntentKit is the executable starter kit for Intent-Driven Engineering. It is designed to provide a practical alternative and complement to spec-driven development kits, but with a stronger delivery model: business intent, repo context, architecture, plan, tasks, implementation, verification, evidence, and impact.

Read INTENTKIT_CLAUDE.md, README.md, package.json, .intent/, .claude/commands/, .github/prompts/, and the example feature under intents/.

Then perform a repo readiness review. Identify what exists, what is missing, what is inconsistent, and what should be implemented next to make IntentKit a credible day-one GitHub repo.

After the review, improve the repo in small, practical steps. Prioritize executable functionality, strong markdown templates, Claude Code commands, and evidence-driven workflow. Keep the language intent-driven, not spec-driven.

Do not over-engineer. Make the project usable by a developer or architect today.
```

## Near-Term Product Vision

IntentKit should become the practical starting point for teams adopting Intent-Driven Engineering.

A developer should be able to run:

```bash
intentkit init
intentkit feature "new payment method"
```

Then open Claude Code and run a workflow like:

```text
/ide.capture
/ide.context
/ide.plan
/ide.tasks
/ide.implement
/ide.verify
/ide.evidence
/ide.impact
```

At the end, the team should have:

- a clear feature intent
- repo-grounded context
- architecture decisions
- implementation plan
- task list
- code changes
- verification results
- evidence package
- impact notes

That is the core product.

## Long-Term Product Vision

IntentKit can later evolve into:

- an npm package
- a Python package
- a GitHub Action
- a Claude Code skill bundle
- a shared enterprise playbook repo
- a template marketplace
- a companion site on intent-drivenengineering.com
- an enterprise onboarding kit
- a measurement dashboard for Intent to Velocity and Intent to Impact

But the first goal is simple:

> Make IntentKit real, executable, understandable, and useful in a GitHub repo.

## Success Criteria

IntentKit is successful when a team can say:

- “We understand how to start.”
- “The repo tells Claude Code what to do.”
- “The templates are practical.”
- “The workflow is repeatable.”
- “The agent is more grounded.”
- “The output includes evidence, not just code.”
- “This helps us deliver features faster with less confusion.”
- “This gives us an alternative to spec-driven workflows without rejecting them.”

## Final Direction

Build IntentKit as the executable method for Intent-Driven Engineering.

Do not chase hype.

Do not make it theoretical.

Do not make it a loose collection of prompts.

Make it a repo that works.

Make it clear enough for a junior engineer.

Make it credible enough for an enterprise architect.

Make it useful enough that a team can use it tomorrow.
