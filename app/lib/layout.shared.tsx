import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@/components/logo';
import { i18n, type Lang, localize } from './i18n';
import { t } from './messages';
import { links } from './shared';

export function baseOptions(lang: Lang = i18n.defaultLanguage): BaseLayoutProps {
  const m = t(lang).nav;
  return {
    nav: {
      title: <Logo />,
      url: localize(lang, '/'),
    },
    githubUrl: links.brok,
    i18n: true,
    links: [
      { text: m.docs, url: localize(lang, '/docs'), active: 'nested-url' },
      { text: m.ide, url: localize(lang, '/docs/ide') },
      { text: m.hub, url: localize(lang, '/docs/hub') },
    ],
  };
}
