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

// Load the build now: if it cannot load, the reason is in the app's log at
// start, not only behind a 500 on the first request.
const build = () => import('./build/server/index.js');
build().catch((error) => {
  console.error('[brokspace.org] the server build failed to load:', error);
});

import('@react-router/express').then(({ createRequestHandler }) => {
  const app = express();
  app.disable('x-powered-by');
  // React Router builds each request's URL from the Host header (Express 5
  // has no hostname without it): never let a proxy that drops it fail a page.
  app.use((req, _res, next) => {
    req.headers.host ??= 'brokspace.org';
    next();
  });
  app.use(compression());
  // Hashed build assets never change.
  app.use('/assets', express.static(join(client, 'assets'), { immutable: true, maxAge: '1y' }));
  app.use(express.static(client, { maxAge: '1h' }));
  app.all('/{*splat}', createRequestHandler({ build, mode: process.env.NODE_ENV }));
  // Every failure in the app's log, with the request that hit it.
  app.use((error, req, res, _next) => {
    console.error(`[brokspace.org] ${req.method} ${req.originalUrl} failed:`, error);
    res.status(500).type('text/plain').send('Internal Server Error');
  });

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`[brokspace.org] listening on ${port}`);
  });
});
