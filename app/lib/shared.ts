import { createGetUrl } from 'fumadocs-core/source';
import { i18n } from './i18n';

export const appName = 'Brokspace';
export const siteUrl = 'https://brokspace.org';
export const tagline = 'Your workspace, understood.';
export const pitch = 'Local-first search, agents and skills for every developer.';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'brokspace',
  repo: 'website',
  branch: 'main',
};

export const links = {
  github: 'https://github.com/brokspace',
  brok: 'https://github.com/brokspace/brok',
  discussions: 'https://github.com/brokspace/brok/discussions',
  releases: 'https://github.com/brokspace/brok/releases/latest',
  ide: 'https://github.com/brokspace/ide',
  ideReleases: 'https://github.com/brokspace/ide/releases/latest',
  sdk: 'https://github.com/brokspace/brok-sdk',
  agent: 'https://github.com/brokspace/brok-agent',
  shardTemplate: 'https://github.com/brokspace/brok-shard-template',
  example: 'https://github.com/brokspace/example-nestjs',
};

/** Guides synced from brokspace/brok by scripts/sync-docs.mjs: edited there, not here. */
export const syncedGuides = [
  'getting-started',
  'local-llm',
  'skills',
  'shards',
  'integrations',
  'configuration',
  'architecture',
];

/** `getting-started.md` and `getting-started.pt-br.md` are both the getting-started guide. */
function guideName(path: string) {
  return path.replace(/\.mdx?$/, '').replace(/\.pt-br$/, '');
}

export function isSyncedGuide(path: string) {
  return syncedGuides.includes(guideName(path));
}

export function editUrl(path: string) {
  if (isSyncedGuide(path)) return `${links.brok}/blob/main/docs/${guideName(path)}.md`;
  return `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${path}`;
}

const getContentUrl = createGetUrl(docsContentRoute, i18n);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute, i18n);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.webp'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
