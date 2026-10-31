import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@/components/logo';
import { links } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      url: '/',
    },
    githubUrl: links.brok,
    links: [
      { text: 'Docs', url: '/docs', active: 'nested-url' },
      { text: 'IDE', url: '/docs/ide' },
      { text: 'Hub', url: '/docs/hub' },
    ],
  };
}
