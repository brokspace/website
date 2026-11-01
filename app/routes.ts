import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  // English at the root, Brazilian Portuguese under /pt-br (see lib/i18n.ts).
  index('routes/home.tsx'),
  route('pt-br', 'routes/home.tsx', { id: 'home-pt-br' }),
  route('docs/*', 'routes/docs.tsx'),
  route('pt-br/docs/*', 'routes/docs.tsx', { id: 'docs-pt-br' }),
  route('api/search', 'routes/search.ts'),
  route('og/docs/*', 'routes/og.docs.tsx'),
  route('pt-br/og/docs/*', 'routes/og.docs.tsx', { id: 'og-docs-pt-br' }),
  route('install.sh', 'routes/install.ts', { id: 'install-sh' }),
  route('install.ps1', 'routes/install.ts', { id: 'install-ps1' }),

  // LLM integration:
  route('llms.txt', 'llms/index.ts'),
  route('llms-full.txt', 'llms/full.ts'),
  route('llms.mdx/docs/*', 'llms/mdx.ts'),
  route('pt-br/llms.mdx/docs/*', 'llms/mdx.ts', { id: 'llms-mdx-pt-br' }),

  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
