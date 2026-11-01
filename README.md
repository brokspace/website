<p align="center">
  <img src="public/brand/brokspace-horizontal-on-dark.svg" alt="Brokspace" height="56">
</p>

<p align="center"><b>brokspace.org</b>: the Brokspace landing page and documentation.</p>

Built with [React Router](https://reactrouter.com) (server rendering, pages
prerendered at build time), [Vite](https://vite.dev),
[Tailwind CSS](https://tailwindcss.com) and [Fumadocs](https://fumadocs.dev).

## Develop

Needs Node.js 22+ and pnpm (`corepack enable`).

```sh
pnpm install
pnpm dev            # http://localhost:5173
pnpm lint           # Biome
pnpm types:check
pnpm build && pnpm start   # production build, http://localhost:3000
```

## Where things are

| Path                      | What                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| `app/routes/home.tsx`     | The landing page                                                                                 |
| `app/components/landing/` | Terminal demo, install tabs, copy buttons                                                        |
| `app/components/logo.tsx` | The mark and logo, adapting to light and dark                                                    |
| `app/app.css`             | Brand tokens and the Fumadocs theme (from [brokspace/brand](https://github.com/brokspace/brand)) |
| `app/lib/github.ts`       | GitHub stars: fetched when the page is rendered, refreshed in the browser                        |
| `app/routes/install.ts`   | `brokspace.org/install.sh` and `/install.ps1`, redirects to the scripts in brokspace/brok        |
| `app/routes/og.docs.tsx`  | Open Graph images for docs pages                                                                 |
| `content/docs/`           | The documentation (MDX and Markdown); order and sections in `meta.json`                          |
| `public/`                 | Favicons, social image, brand SVGs, IDE screenshots                                              |

## Documentation

Two kinds of pages live in `content/docs/`:

- **Site pages** (`index.mdx`, `ide.mdx`, `hub.mdx`): edit them here.
- **CLI guides** (`getting-started.md`, `local-llm.md`, `skills.md`,
  `shards.md`, `integrations.md`, `configuration.md`, `architecture.md`):
  copied from [brokspace/brok `docs/`](https://github.com/brokspace/brok/tree/main/docs),
  which stays their source of truth. Edit them there, then refresh the
  copies:

  ```sh
  pnpm sync-docs                      # uses ../brok if present, else clones brokspace/brok
  pnpm sync-docs --from ~/code/brok   # or a checkout of your choice
  ```

  The script turns each `# Title` into frontmatter, rewrites links between
  guides to `/docs/...` and other repository links to GitHub. Commit the
  result. The "Edit on GitHub" link of these pages points to brokspace/brok.

Every page is also served as Markdown for LLMs: `/llms.txt`,
`/llms-full.txt`, and `/docs/<page>.md`.

## Deploy to Hostinger

The site runs as a **Node.js web app** on Hostinger (server rendering is
needed for search, the install redirects and the stars count; every page is
prerendered, so it stays fast).

### 1. Create the app

1. In hPanel: **Websites > Add website > Node.js Apps**, then **Import Git
   repository** and authorize GitHub. Pick `brokspace/website`, branch `main`.
2. Check the build settings Hostinger detects, and set them to:

   | Setting          | Value                                              |
   | ---------------- | -------------------------------------------------- |
   | Framework        | Other (or React Router, if listed)                 |
   | Node.js version  | 22 or 24                                           |
   | Root directory   | `/`                                                |
   | Package manager  | pnpm (npm also works: it ignores `pnpm-lock.yaml`) |
   | Build command    | `pnpm build` (`npm run build` with npm)            |
   | Output directory | `build`                                            |
   | Entry file       | `server.js`                                        |

   `server.js` starts the same server as `pnpm start` on the port Hostinger
   gives it (`PORT`). Hostinger may prefill **Output directory** `dist` and
   no entry file: change them, the build writes to `build/`.

   The repository pins pnpm 10 (`packageManager`): the corepack on
   Hostinger's Node 22 cannot start pnpm 11 or newer (`Cannot find module
   .../pnpm/<version>/bin/pnpm.cjs`).
3. Optional, **Environment variables**: `GITHUB_TOKEN`, a fine-grained token
   with no permissions at all (public data only). It raises the GitHub API
   limit for the stars count from 60 to 5,000 requests an hour. Without it the
   count still works; it is cached in each visitor's browser for ten minutes.
4. **Deploy**, then open the temporary URL Hostinger gives you and check the
   landing page, `/docs`, a search (Ctrl+K) and `/install.sh` (it should
   download the script).

### 2. Point brokspace.org at it

1. In the app: **Domains > Connect domain**, enter `brokspace.org`. With the
   domain at Hostinger the DNS records are set for you; otherwise add the
   records hPanel shows at your registrar.
2. Add `www.brokspace.org` too, redirecting to `brokspace.org`.
3. Wait for the SSL certificate (hPanel issues it automatically), then open
   https://brokspace.org.

Keep the app on the `main` branch: `staging` is the integration branch and
is not deployed.

### 3. Updates

Hostinger deploys `main`, the release branch: changes go to `staging` through
pull requests, and merging the release PR ("release: promote staging to
main") rebuilds and redeploys the site. To publish new CLI
docs: `pnpm sync-docs`, commit, push.

If a deploy fails, open its build log in hPanel: the usual causes are a Node
version below 22, or a build command that is not `pnpm build` /
`npm run build`.

## License

Code: MIT or Apache-2.0, like the rest of Brokspace. The Brokspace name, logo
and brand assets are not covered by these licenses.
