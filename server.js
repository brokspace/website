// The site's server, for `pnpm start` and as the entry file of the Hostinger
// Node.js web app: the React Router build behind Express, on $PORT (3000 if
// unset), static files from build/client.
//
// It listens once, directly. Hostinger runs Node apps behind LiteSpeed, which
// hands the app its socket by intercepting listen(); react-router-serve first
// probes for a free port with a throwaway listen when PORT is unset, and the
// real server then never gets requests (503).
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import compression from 'compression';
import express from 'express';

// Before anything loads React: React and react-dom must both be production builds.
process.env.NODE_ENV ??= 'production';

const root = dirname(fileURLToPath(import.meta.url));
const client = join(root, 'build', 'client');

import('@react-router/express').then(({ createRequestHandler }) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  // Hashed build assets never change.
  app.use('/assets', express.static(join(client, 'assets'), { immutable: true, maxAge: '1y' }));
  app.use(express.static(client, { maxAge: '1h' }));
  app.all(
    '/{*splat}',
    createRequestHandler({
      build: () => import('./build/server/index.js'),
      mode: process.env.NODE_ENV,
    }),
  );

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`[brokspace.org] listening on ${port}`);
  });
});
