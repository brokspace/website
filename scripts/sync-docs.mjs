// Copies the user guides from brokspace/brok (docs/*.md) into
// content/docs/, so the CLI repository stays their single source of truth.
//
//   node scripts/sync-docs.mjs                  # from ../brok if present, else a fresh clone of main
//   node scripts/sync-docs.mjs --from ~/code/brok
//
// For each guide: the `# Title` becomes frontmatter (`title`, and the first
// sentence as `description`), links between guides become /docs/... URLs,
// and links to other files of the repository point to GitHub. The output is
// committed, so the site builds without network access.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = 'https://github.com/brokspace/brok';
const GUIDES = [
  'getting-started',
  'local-llm',
  'skills',
  'shards',
  'integrations',
  'memory',
  'configuration',
  'architecture',
];

const root = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const fromArg = args.includes('--from') ? args[args.indexOf('--from') + 1] : undefined;

let source = fromArg ? resolve(fromArg) : resolve(root, '..', 'brok');
let cleanup;
if (!existsSync(join(source, 'docs', 'getting-started.md'))) {
  const dir = mkdtempSync(join(tmpdir(), 'brok-docs-'));
  execFileSync('git', ['clone', '--quiet', '--depth', '1', '--branch', 'main', `${REPO}.git`, dir], {
    stdio: 'inherit',
  });
  source = dir;
  cleanup = () => rmSync(dir, { recursive: true, force: true });
}
const commit = execFileSync('git', ['-C', source, 'rev-parse', '--short', 'HEAD']).toString().trim();

const texts = Object.fromEntries(
  GUIDES.map((name) => [
    name,
    readFileSync(join(source, 'docs', `${name}.md`), 'utf8').replace(/\r\n/g, '\n'),
  ]),
);
const titles = Object.fromEntries(GUIDES.map((name) => [name, texts[name].match(/^# (.+)$/m)[1].trim()]));

for (const name of GUIDES) {
  const out = convert(name, texts[name]);
  writeFileSync(join(root, 'content', 'docs', `${name}.md`), out);
  console.log(`content/docs/${name}.md`);
}
cleanup?.();
console.log(`synced from brokspace/brok@${commit}`);

function convert(name, text) {
  const lines = text.split('\n');
  const titleLine = lines.findIndex((line) => line.startsWith('# '));
  const title = lines[titleLine].slice(2).trim();
  const body = lines
    .slice(titleLine + 1)
    .join('\n')
    .replace(/^\n+/, '');

  // First paragraph of prose, first sentence of it.
  const paragraph = body.split('\n\n').find((p) => p.trim() && !/^[|#>`\-*!<]/.test(p.trim())) ?? '';
  const plain = paragraph
    .replace(/\s+/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_]/g, '')
    .trim();
  const description = (plain.match(/^.*?[.!?](\s|$)/)?.[0] ?? plain).trim();

  const rewritten = body.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, text, href) => {
    const target = rewriteLink(href);
    // `[skills.md](skills.md)` reads better as the guide's title.
    const guide = text.match(/^([a-z0-9-]+)\.md$/);
    const label = guide && titles[guide[1]] ? titles[guide[1]] : text;
    return `[${label}](${target})`;
  });
  const source = `${REPO}/blob/main/docs/${name}.md`;
  return [
    '---',
    `title: ${yaml(title)}`,
    `description: ${yaml(description)}`,
    '---',
    '',
    `<!-- Generated from ${source} by scripts/sync-docs.mjs. Edit it there. -->`,
    '',
    rewritten.trimEnd(),
    '',
  ].join('\n');
}

function rewriteLink(href) {
  if (/^(https?:|mailto:|#)/.test(href)) {
    return href;
  }
  const [path, hash] = href.split('#');
  const anchor = hash ? `#${hash}` : '';
  const guide = path.match(/^(?:\.\/)?([a-z0-9-]+)\.md$/);
  if (guide && GUIDES.includes(guide[1])) {
    return `/docs/${guide[1]}${anchor}`;
  }
  // Anything else in the repository: link to it on GitHub.
  const target = new URL(path, `${REPO}/blob/main/docs/`).toString();
  return `${target}${anchor}`;
}

function yaml(value) {
  return JSON.stringify(value);
}
