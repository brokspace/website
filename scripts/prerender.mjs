// Prerenders the site into build/client after `react-router build`, without a
// server: each path from build/prerender-paths.json (react-router.config.ts)
// goes straight to the server build's request handler. React Router's own
// prerender fetches the paths from a local preview server, which Hostinger's
// build cannot reach (ECONNREFUSED 127.0.0.1).
//
//   node scripts/prerender.mjs     # part of `pnpm build`
//
// It writes what React Router's prerender writes: for a page, its loader data
// (<path>.data, or _.data at a directory) and <path>/index.html; for a
// resource route (OG images, search index, Markdown), its data and the file.

import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Before anything loads React: the production builds, and the same build-time
// requests React Router's prerender makes.
process.env.NODE_ENV = 'production';
process.env.IS_RR_BUILD_REQUEST = 'yes';

const root = fileURLToPath(new URL('..', import.meta.url));
const client = join(root, 'build', 'client');
const paths = JSON.parse(await readFile(join(root, 'build', 'prerender-paths.json'), 'utf8'));

const { createRequestHandler, matchRoutes } = await import('react-router');
const build = await import(pathToFileURL(join(root, 'build', 'server', 'index.js')).href);
const handle = createRequestHandler(build, 'production');

// The route tree, to tell pages from resource routes.
function children(parentId) {
  return Object.values(build.routes)
    .filter((route) => route.parentId === parentId)
    .map(({ id, path, index, caseSensitive }) => ({
      id,
      path,
      index,
      caseSensitive,
      children: children(id),
    }));
}
const routes = children(undefined);

const prerender = { 'X-React-Router-Prerender': 'yes' };

async function request(path, headers = prerender) {
  return handle(new Request(new URL(path, 'http://localhost'), { headers }));
}

async function write(path, contents) {
  const file = join(client, ...path.split('/').filter(Boolean));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, contents);
  console.log(`Prerender: ${path}`);
}

function fail(kind, path, response, body) {
  throw new Error(`Prerender (${kind}): ${response.status} for ${path}\n${body ?? ''}`.trim());
}

function dataPath(path) {
  return path.endsWith('/') ? `${path}_.data` : `${path}.data`;
}

async function renderResource(path, leaf) {
  const data = await request(`${dataPath(path)}?_routes=${encodeURIComponent(leaf.id)}`);
  if (data.status !== 200 && data.status !== 202) fail('data', path, data, await data.text());
  await write(dataPath(path), await data.text());

  const response = await request(path);
  // A loader that falls back to another file of the site (og.docs.tsx: the
  // site-wide card when the image renderer is missing) gets a copy of it.
  const location = response.headers.get('Location');
  if (response.status >= 300 && response.status < 400 && location) {
    const target = new URL(location, 'http://localhost');
    if (target.origin === 'http://localhost') {
      const file = join(client, ...path.split('/').filter(Boolean));
      await mkdir(dirname(file), { recursive: true });
      await copyFile(join(client, ...target.pathname.split('/').filter(Boolean)), file);
      console.warn(`Prerender: ${path} is a copy of ${target.pathname} (the route redirected there)`);
      return;
    }
  }
  if (response.status !== 200) fail('resource', path, response, await response.text());
  await write(path, new Uint8Array(await response.arrayBuffer()));
}

async function renderPage(path, hasLoader) {
  const headers = new Headers(prerender);
  if (hasLoader) {
    const data = await request(dataPath(path));
    if (data.status !== 200 && data.status !== 202) fail('data', path, data, await data.text());
    const text = await data.text();
    await write(dataPath(path), text);
    const encoded = encodeURI(text);
    if (encoded.length < 8 * 1024) headers.set('X-React-Router-Prerender-Data', encoded);
  }

  const response = await request(`${path}/`.replace(/\/\/+$/, '/'), headers);
  const html = await response.text();
  if (response.status !== 200) fail('html', path, response, html);
  await write(`${path}/index.html`, html);
}

let count = 0;
for (const path of paths) {
  const matches = matchRoutes(routes, `/${path}/`.replace(/^\/\/+/, '/'));
  if (!matches) throw new Error(`Prerender: ${path} matches no route`);
  const leaf = build.routes[matches.at(-1).route.id];
  if (!leaf.module.default && !leaf.module.ErrorBoundary) {
    if (!leaf.module.loader) {
      console.warn(`Prerender: skipped ${path}, a resource route without a loader`);
      continue;
    }
    await renderResource(path, leaf);
  } else {
    await renderPage(
      path,
      matches.some((match) => build.routes[match.route.id].module.loader),
    );
  }
  count++;
}
console.log(`Prerendered ${count} paths into build/client.`);
