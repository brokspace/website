import { glob } from 'node:fs/promises';
import type { Config } from '@react-router/dev/config';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';
import { i18n } from './app/lib/i18n';
import { getPageImageUrl } from './app/lib/shared';

const getUrl = createGetUrl('/docs', i18n);

// Pages are prerendered at build time and also rendered by the server, so
// BROKSPACE_PRERENDER=false (a build environment variable) skips the
// prerender step where the build host cannot reach its own local server.
const prerender = process.env.BROKSPACE_PRERENDER !== 'false';

export default {
  ssr: true,
  prerender:
    prerender &&
    async function prerenderPaths({ getStaticPaths }) {
      const paths: string[] = [];
      const excluded: string[] = ['/api/search', '/install.sh', '/install.ps1'];

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
        }
      }

      return paths;
    },
} satisfies Config;
