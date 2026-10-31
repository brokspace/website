import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('docs/*', 'routes/docs.tsx'),
  route('api/search', 'routes/search.ts'),
  route('og/docs/*', 'routes/og.docs.tsx'),
  route('install.sh', 'routes/install.ts', { id: 'install-sh' }),
  route('install.ps1', 'routes/install.ts', { id: 'install-ps1' }),

  // LLM integration:
  route('llms.txt', 'llms/index.ts'),
  route('llms-full.txt', 'llms/full.ts'),
  route('llms.mdx/docs/*', 'llms/mdx.ts'),

  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
