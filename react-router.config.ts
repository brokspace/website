import { glob } from 'node:fs/promises';
import type { Config } from '@react-router/dev/config';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';
import { i18n } from './app/lib/i18n';
import { getPageImageUrl, getPageMarkdownUrl } from './app/lib/shared';

const getUrl = createGetUrl('/docs', i18n);

// Every page, the search index, OG images and Markdown copies are prerendered
// into build/client: that folder is the whole site on Hostinger (static files,
// see README, Deploy). With a server (`pnpm start`) the same routes also render
// on request, so BROKSPACE_PRERENDER=false can skip prerendering there.
const prerender = process.env.BROKSPACE_PRERENDER !== 'false';

export default {
  ssr: true,
  // Static hosting has no server to answer lazy route discovery (/__manifest):
  // ship the whole (small) route manifest with the first page.
  routeDiscovery: { mode: 'initial' },
  prerender:
    prerender &&
    async function prerenderPaths({ getStaticPaths }) {
      const paths: string[] = [];
      // The install scripts are redirects (public/.htaccess on static hosting).
      const excluded: string[] = ['/install.sh', '/install.ps1'];

      for (const path of getStaticPaths()) {
        if (!excluded.includes(path)) paths.push(path);
      }

      // Every page exists in every language: a missing translation shows the English page.
      const pages = new Set<string>();
      for await (const entry of glob(['**/*.mdx', '**/*.md'], { cwd: 'content/docs' })) {
        pages.add(getSlugs(entry.replace(/\.pt-br(\.mdx?)$/, '$1')).join('/'));
      }
      for (const page of pages) {
        const slugs = page ? page.split('/') : [];
        for (const locale of i18n.languages) {
          paths.push(getUrl(slugs, locale));
          paths.push(getPageImageUrl({ slugs, locale }).url);
          paths.push(getPageMarkdownUrl({ slugs, locale }).url);
        }
      }

      return paths;
    },
} satisfies Config;
