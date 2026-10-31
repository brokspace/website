import type { LoaderFunctionArgs } from 'react-router';

// brokspace.org/install.sh and /install.ps1: short URLs for the install
// scripts, which live (and are versioned) in brokspace/brok.
const SCRIPTS: Record<string, string> = {
  '/install.sh': 'https://raw.githubusercontent.com/brokspace/brok/main/scripts/install.sh',
  '/install.ps1': 'https://raw.githubusercontent.com/brokspace/brok/main/scripts/install.ps1',
};

export function loader({ request }: LoaderFunctionArgs) {
  const target = SCRIPTS[new URL(request.url).pathname];
  if (!target) throw new Response('Not found', { status: 404 });
  return new Response(null, {
    status: 302,
    headers: { Location: target, 'Cache-Control': 'public, max-age=300' },
  });
}
