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
| `app/lib/i18n.ts`         | Languages, URL helpers (`localize`, `switchLang`)                                                |
| `app/lib/messages.ts`     | Every landing and site string in English and Portuguese, plus Fumadocs UI strings in Portuguese  |

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

## Languages

English lives at `/` and `/docs/...`, Brazilian Portuguese under `/pt-br`
(`/pt-br/docs/...`). The header and the docs sidebar switch between them on
the same page.

- **Landing and site chrome:** `app/lib/messages.ts`. The Portuguese object
  has the type of the English one, so `pnpm types:check` fails when a string
  is missing.
- **Docs:** a translation sits next to its page with a `.pt-br` suffix
  (`ide.pt-br.mdx`, `meta.pt-br.json`); link to other pages with `/pt-br/docs/...`.
  A page without a translation (the synced CLI guides today) shows the
  English page under `/pt-br`, with a note saying so.
- **Search** returns results in the language of the page.

## Deploy to Hostinger

brokspace.org is **static files**: every page, the search index, Open Graph
images and the Markdown copies are prerendered into `build/client` at build
time, and `public/.htaccess` (copied there) does the rest on Hostinger's
LiteSpeed server: HTTPS and `www` redirects, `/route` to `/route/`, the 404
page, `/install.sh` and `/install.ps1` redirects, `/docs/<page>.md`, security
headers and caching. Nothing builds or runs on Hostinger.

CI builds the site on every push to `main` (the release branch) and, when the
build and checks pass, commits `build/client` to the **`hostinger`** branch
(job `publish-hostinger` in `.github/workflows/ci.yml`). Hostinger pulls that
branch into `public_html`.

### One-time setup in hPanel

1. If brokspace.org was created as a **Node.js app**, delete that app first
   (**Websites > brokspace.org > Node.js**), so it stops answering for the
   domain. A Node.js app of type Vite serves `build/` as a static folder
   without an `index.html` at its root, which is the `403 Forbidden`.
2. **Websites > brokspace.org > Advanced > GIT**: empty `public_html` first
   (File Manager; the first deployment needs an empty directory), then add
   repository `https://github.com/brokspace/website.git`, branch
   `hostinger`, install path left empty (that is `public_html`). Create, then
   **Deploy** once.
3. Turn on **auto deployment** and copy the webhook URL hPanel shows. Add it to
   this repository under **Settings > Webhooks** (content type
   `application/json`, just the push event). Every new commit on `hostinger`
   then deploys by itself.
4. **SSL**: enable the free certificate for `brokspace.org` and
   `www.brokspace.org`.
5. Check https://brokspace.org, `/pt-br`, `/docs`, a search (Ctrl+K) and
   `/install.sh` (it should download the script).

### Updates

Changes go to `staging` through pull requests; merging the release PR
("release: promote staging to main") runs CI on `main`, which publishes to
`hostinger`, which Hostinger deploys. To publish new CLI docs:
`pnpm sync-docs`, commit, open a PR. To roll back, revert the change on `main`.

### Running it as a server instead

`pnpm build && pnpm start` (or `node server.js`, which serves on `$PORT`)
runs the same site with server rendering, for hosts that run Node.js. There
`BROKSPACE_PRERENDER=false` skips prerendering if the build host cannot reach
its own local server.

## License

Code: MIT or Apache-2.0, like the rest of Brokspace. The Brokspace name, logo
and brand assets are not covered by these licenses.
