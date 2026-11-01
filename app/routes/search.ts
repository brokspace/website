import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';
import type { Route } from './+types/search';

// The default multilingual tokenizer covers English and Portuguese; results
// follow the `locale` the search dialog sends.
const server = createFromSource(source);

export async function loader({ request }: Route.LoaderArgs) {
  return server.GET(request);
}
