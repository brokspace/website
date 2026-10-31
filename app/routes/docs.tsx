import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { use } from 'react';
import { useMDXComponents } from '@/components/mdx';
import { baseOptions } from '@/lib/layout.shared';
import { editUrl, getPageImageUrl, getPageMarkdownUrl, isSyncedGuide } from '@/lib/shared';
import { docs, source } from '@/lib/source';
import type { Route } from './+types/docs';

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params['*'].split('/').filter((v) => v.length > 0);
  const page = source.getPage(slugs);
  if (!page) throw new Response('Not found', { status: 404 });

  return {
    path: page.path,
    markdownUrl: getPageMarkdownUrl(page).url,
    pageTree: await source.serializePageTree(source.getPageTree()),
    imagePath: getPageImageUrl(page).url,
  };
}

function Content({ path, markdownUrl, imagePath }: { path: string; markdownUrl: string; imagePath: string }) {
  const page = docs.getPage(path);
  if (!page) throw new Error(`unknown page: ${path}`);

  // content is loaded lazily, call `page.preload()` in your loader to avoid suspending
  const { toc } = use(page.load());
  const Mdx = page.body;

  return (
    <DocsPage toc={toc}>
      <title>{`${page.title} | Brokspace`}</title>
      <meta name="description" content={page.description} />
      <meta property="og:image" content={imagePath} />
      <DocsTitle>{page.title}</DocsTitle>
      {/* Synced guides open with their description as the first sentence. */}
      {!isSyncedGuide(path) && <DocsDescription>{page.description}</DocsDescription>}
      <div className="flex flex-row gap-2 items-center border-b -mt-4 pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={editUrl(path)} />
      </div>
      <DocsBody>
        <Mdx components={useMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { path, pageTree, imagePath, markdownUrl } = useFumadocsLoader(loaderData);

  return (
    <DocsLayout {...baseOptions()} tree={pageTree}>
      <Content path={path} markdownUrl={markdownUrl} imagePath={imagePath} />
    </DocsLayout>
  );
}
