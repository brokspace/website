import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

// The site is served as static files (see README, Deploy), so search is a
// prerendered index the browser downloads once and searches locally. The
// default multilingual tokenizer covers English and Portuguese.
const server = createFromSource(source);

export async function loader() {
  return server.staticGET();
}
