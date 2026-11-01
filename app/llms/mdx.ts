import { langFromPath } from '@/lib/i18n';
import { docsLlms, source } from '@/lib/source';
import type { Route } from './+types/mdx';

export async function loader({ params, request }: Route.LoaderArgs) {
  const slugs = params['*'].split('/').filter((v) => v.length > 0);
  slugs.pop();
  const page = source.getPage(slugs, langFromPath(new URL(request.url).pathname));
  if (!page) {
    return new Response('not found', { status: 404 });
  }
  return new Response(await docsLlms.page(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}
