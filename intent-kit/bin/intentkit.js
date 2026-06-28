#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const kitRoot = path.resolve(__dirname, '..');

const rawArgs = process.argv.slice(2);
const DRY_RUN = rawArgs.includes('--dry-run');
const positional = rawArgs.filter(a => !a.startsWith('--'));
const [cmd, ...cmdArgs] = positional;

const created = [];
const skipped = [];

// ── helpers ──────────────────────────────────────────────────────────────────

function slugify(str) {
  return String(str || 'feature').trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'feature';
}

function mkdirp(p) {
  if (!DRY_RUN) fs.mkdirSync(p, { recursive: true });
}

function writeFile(dest, content) {
  const rel = path.relative(root, dest);
  if (DRY_RUN) {
    const tag = fs.existsSync(dest) ? 'would skip (exists — not modified)' : 'would create';
    console.log(`  [dry-run] ${tag}: ${rel}`);
    return;
  }
  if (fs.existsSync(dest)) {
    console.log(`  —  kept (already exists): ${rel}`);
    skipped.push(rel);
    return;
  }
  mkdirp(path.dirname(dest));
  fs.writeFileSync(dest, content, 'utf8');
  console.log(`  ✓  created: ${rel}`);
  created.push(rel);
}

function copyFile(src, dest) {
  writeFile(dest, fs.readFileSync(src, 'utf8'));
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const sp = path.join(src, entry.name);
    const dp = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(sp, dp);
    else copyFile(sp, dp);
  }
}

function renderTemplate(name, vars) {
  let s = fs.readFileSync(path.join(kitRoot, '.intent/templates', name), 'utf8');
  for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{{${k}}}`, v);
  return s;
}

function nextIntentNumber() {
  const dir = path.join(root, 'intents');
  if (!fs.existsSync(dir)) return '001';
  const nums = fs.readdirSync(dir)
    .map(n => (n.match(/^(\d{3})-/) || [])[1])
    .filter(Boolean).map(n => parseInt(n, 10));
  return String(nums.length ? Math.max(...nums) + 1 : 1).padStart(3, '0');
}

// ── commands ─────────────────────────────────────────────────────────────────

function init() {
  if (DRY_RUN) console.log('Dry run — no files will be written.\n');

  // CLAUDE.md — never overwritten, not even with --force
  const claudeDest = path.join(root, 'CLAUDE.md');
  if (fs.existsSync(claudeDest)) {
    console.log('  —  CLAUDE.md already exists — not modified.');
    console.log('     To add IntentKit guidance, append from: intent-kit/CLAUDE.md\n');
  } else {
    const claudeSrc = path.join(kitRoot, 'CLAUDE.md');
    const claudeContent = fs.existsSync(claudeSrc)
      ? fs.readFileSync(claudeSrc, 'utf8')
      : [
          '# Intent-Driven Engineering Workspace\n',
          'This repo uses IntentKit. Before coding, read `.intent/memory/principles.md`',
          'and the active intent under `intents/`. Use the `/ide.*` slash commands in',
          'Claude Code to move through the delivery loop.\n',
          '## Delivery loop\n',
          '/ide.capture → /ide.context → /ide.plan → /ide.tasks →',
          '/ide.implement → /ide.verify → /ide.evidence → /ide.impact\n'
        ].join('\n');
    writeFile(claudeDest, claudeContent);
  }

  copyDir(path.join(kitRoot, '.intent'), path.join(root, '.intent'));
  copyDir(path.join(kitRoot, '.claude'), path.join(root, '.claude'));
  copyDir(path.join(kitRoot, '.github'), path.join(root, '.github'));

  if (!DRY_RUN) fs.mkdirSync(path.join(root, 'intents'), { recursive: true });

  if (!DRY_RUN) {
    console.log(`\nIntentKit initialized.`);
    console.log(`  ${created.length} file(s) created.`);
    if (skipped.length) {
      console.log(`  ${skipped.length} file(s) already existed in your repo — not modified.`);
    }
    console.log('\nNext: intentkit doctor');
  }
}

function feature(name) {
  if (!name) throw new Error('Provide a feature name: intentkit feature "my feature"');
  const number = nextIntentNumber();
  const slug = slugify(name);
  const dir = path.join(root, 'intents', `${number}-${slug}`);
  if (fs.existsSync(dir)) throw new Error(`Intent folder already exists: ${dir}`);
  fs.mkdirSync(dir, { recursive: true });

  const vars = {
    FEATURE_NAME: name,
    FEATURE_SLUG: slug,
    INTENT_NUMBER: number,
    DATE: new Date().toISOString().slice(0, 10)
  };
  const files = {
    'intent.md':        'feature-intent-template.md',
    'repo-context.md':  'repo-context-template.md',
    'architecture.md':  'architecture-intent-template.md',
    'plan.md':          'implementation-plan-template.md',
    'tasks.md':         'tasks-template.md',
    'verification.md':  'verification-template.md',
    'evidence.md':      'evidence-template.md',
    'impact.md':        'impact-template.md'
  };
  for (const [out, tmpl] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, out), renderTemplate(tmpl, vars), 'utf8');
  }

  console.log(`\nCreated: intents/${number}-${slug}/`);
  console.log('  intent.md          ← start here');
  console.log('  repo-context.md');
  console.log('  architecture.md');
  console.log('  plan.md');
  console.log('  tasks.md');
  console.log('  verification.md');
  console.log('  evidence.md');
  console.log('  impact.md');
  console.log('\nNext: open intent.md and run /ide.capture in your coding agent.');
}

function status() {
  const dir = path.join(root, 'intents');
  if (!fs.existsSync(dir)) return console.log('No intents/ folder. Run: intentkit init');

  const items = fs.readdirSync(dir)
    .filter(x => fs.statSync(path.join(dir, x)).isDirectory()).sort();
  if (!items.length) return console.log('No intents yet. Run: intentkit feature "feature name"');

  const artifacts = [
    'intent.md', 'repo-context.md', 'architecture.md', 'plan.md',
    'tasks.md', 'verification.md', 'evidence.md', 'impact.md'
  ];

  console.log('\nIntent workspaces:\n');
  for (const item of items) {
    const p = path.join(dir, item);
    const done = artifacts.filter(f => fs.existsSync(path.join(p, f))).length;
    console.log(`  ${item}  (${done}/${artifacts.length} artifacts)`);
    for (const f of artifacts) {
      const mark = fs.existsSync(path.join(p, f)) ? '✓' : '✗';
      console.log(`    ${mark} ${f}`);
    }
    console.log('');
  }
}

function doctor() {
  console.log('\nIntentKit doctor\n');

  const checks = [
    // memory
    '.intent/memory/principles.md',
    '.intent/memory/architecture-rules.md',
    '.intent/memory/team-standards.md',
    '.intent/memory/definition-of-done.md',
    // templates
    '.intent/templates/feature-intent-template.md',
    '.intent/templates/repo-context-template.md',
    '.intent/templates/architecture-intent-template.md',
    '.intent/templates/implementation-plan-template.md',
    '.intent/templates/tasks-template.md',
    '.intent/templates/verification-template.md',
    '.intent/templates/evidence-template.md',
    '.intent/templates/impact-template.md',
    // playbooks
    '.intent/playbooks/feature-delivery-loop.md',
    '.intent/playbooks/brownfield-onboarding.md',
    '.intent/playbooks/agent-operating-model.md',
    '.intent/playbooks/pull-request-review.md',
    // claude commands
    '.claude/commands/ide.capture.md',
    '.claude/commands/ide.refine.md',
    '.claude/commands/ide.context.md',
    '.claude/commands/ide.plan.md',
    '.claude/commands/ide.tasks.md',
    '.claude/commands/ide.implement.md',
    '.claude/commands/ide.verify.md',
    '.claude/commands/ide.evidence.md',
    '.claude/commands/ide.impact.md',
    // github prompts
    '.github/prompts/ide.capture.prompt.md',
    '.github/prompts/ide.plan.prompt.md',
    '.github/prompts/ide.verify.prompt.md',
    // workspace
    'intents'
  ];

  let pass = 0, fail = 0;
  for (const rel of checks) {
    if (fs.existsSync(path.join(root, rel))) {
      console.log(`  ✓  ${rel}`);
      pass++;
    } else {
      console.log(`  ✗  ${rel}`);
      fail++;
    }
  }

  console.log('');
  if (fail === 0) {
    console.log(`  Status: READY (${pass}/${pass} checks passed)`);
    console.log('\n  Next: intentkit feature "your feature name"');
  } else {
    console.log(`  Status: ${pass} passed, ${fail} missing`);
    console.log('\n  Run: intentkit init');
  }
  console.log('');
}

function help() {
  console.log(`
IntentKit — Intent-Driven Engineering CLI

Commands:
  intentkit init                   Initialize .intent/, .claude/commands/, .github/prompts/
  intentkit init --dry-run         Preview what would be created — writes nothing
  intentkit feature "name"         Create a new intent workspace under intents/
  intentkit status                 Show artifact completion for all intent workspaces
  intentkit doctor                 Verify all IntentKit files are installed
  intentkit help                   Show this help

Safety: intentkit never overwrites existing files in your repo.
        CLAUDE.md is always skipped if it exists.

Delivery loop (in Claude Code):
  /ide.capture  /ide.refine  /ide.context  /ide.plan  /ide.tasks
  /ide.implement  /ide.verify  /ide.evidence  /ide.impact
`);
}

// ── dispatch ─────────────────────────────────────────────────────────────────

try {
  if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') help();
  else if (cmd === 'init')    init();
  else if (cmd === 'feature') feature(cmdArgs.join(' '));
  else if (cmd === 'status')  status();
  else if (cmd === 'doctor')  doctor();
  else { console.error(`Unknown command: ${cmd}`); help(); process.exit(1); }
} catch (err) {
  console.error('IntentKit error:', err.message);
  process.exit(1);
}
