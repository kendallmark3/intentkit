#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const kitRoot = path.resolve(__dirname, '..');

function slugify(input) {
  return String(input || 'feature')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'feature';
}

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }
function exists(p) { return fs.existsSync(p); }
function read(p) { return fs.readFileSync(p, 'utf8'); }
function write(p, s) { mkdirp(path.dirname(p)); fs.writeFileSync(p, s, 'utf8'); }

function copyDir(src, dest) {
  if (!exists(src)) return;
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const sp = path.join(src, entry.name);
    const dp = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(sp, dp);
    else if (!exists(dp)) { mkdirp(path.dirname(dp)); fs.copyFileSync(sp, dp); }
  }
}

function nextIntentNumber() {
  const dir = path.join(root, 'intents');
  if (!exists(dir)) return '001';
  const nums = fs.readdirSync(dir)
    .map(n => (n.match(/^(\d{3})-/) || [])[1])
    .filter(Boolean)
    .map(n => parseInt(n, 10));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return String(next).padStart(3, '0');
}

function init() {
  copyDir(path.join(kitRoot, '.intent'), path.join(root, '.intent'));
  copyDir(path.join(kitRoot, '.claude'), path.join(root, '.claude'));
  copyDir(path.join(kitRoot, '.github'), path.join(root, '.github'));
  mkdirp(path.join(root, 'intents'));
  if (!exists(path.join(root, 'IDE.md'))) {
    write(path.join(root, 'IDE.md'), '# Intent-Driven Engineering Workspace\n\nThis repo uses Intent Kit. Start with `.intent/memory/principles.md`, then create feature intents under `intents/`.\n');
  }
  console.log('Intent Kit initialized. Created .intent, .claude/commands, .github/prompts, and intents folders.');
}

function renderTemplate(name, vars) {
  let s = read(path.join(kitRoot, '.intent/templates', name));
  for (const [k,v] of Object.entries(vars)) s = s.replaceAll(`{{${k}}}`, v);
  return s;
}

function feature(name) {
  init();
  const number = nextIntentNumber();
  const slug = slugify(name);
  const dir = path.join(root, 'intents', `${number}-${slug}`);
  if (exists(dir)) throw new Error(`Intent folder already exists: ${dir}`);
  mkdirp(dir);
  const vars = {FEATURE_NAME: name || slug, FEATURE_SLUG: slug, INTENT_NUMBER: number, DATE: new Date().toISOString().slice(0,10)};
  const files = {
    'intent.md': 'feature-intent-template.md',
    'repo-context.md': 'repo-context-template.md',
    'architecture.md': 'architecture-intent-template.md',
    'plan.md': 'implementation-plan-template.md',
    'tasks.md': 'tasks-template.md',
    'verification.md': 'verification-template.md',
    'evidence.md': 'evidence-template.md',
    'impact.md': 'impact-template.md'
  };
  for (const [out, tmpl] of Object.entries(files)) write(path.join(dir, out), renderTemplate(tmpl, vars));
  console.log(`Created intent workspace: intents/${number}-${slug}`);
  console.log('Next: open intent.md and run the ide.capture command with your coding agent.');
}

function status() {
  const dir = path.join(root, 'intents');
  if (!exists(dir)) return console.log('No intents folder yet. Run: intentkit init');
  const items = fs.readdirSync(dir).filter(x => fs.statSync(path.join(dir,x)).isDirectory()).sort();
  if (!items.length) return console.log('No feature intents yet. Run: intentkit feature "feature name"');
  console.log('Intent workspaces:');
  for (const item of items) {
    const p = path.join(dir, item);
    const checks = ['intent.md','repo-context.md','architecture.md','plan.md','tasks.md','verification.md','evidence.md','impact.md'].map(f => exists(path.join(p,f)) ? '✓' : '×').join(' ');
    console.log(`- ${item}  ${checks}`);
  }
}

function help() {
  console.log(`Intent Kit\n\nCommands:\n  intentkit init\n  intentkit feature "feature name"\n  intentkit status\n  intentkit help\n`);
}

try {
  const [cmd, ...args] = process.argv.slice(2);
  if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') help();
  else if (cmd === 'init') init();
  else if (cmd === 'feature') feature(args.join(' '));
  else if (cmd === 'status') status();
  else { console.error(`Unknown command: ${cmd}`); help(); process.exit(1); }
} catch (err) {
  console.error('Intent Kit error:', err.message);
  process.exit(1);
}
