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

brokspace.org runs as a **Node.js web app** that Hostinger builds from the
`main` branch (the release branch) and runs with `server.js`, the same server
as `pnpm start`.

### Settings (hPanel > Websites > brokspace.org > Node.js app > Settings)

| Setting               | Value                                                  |
| --------------------- | ------------------------------------------------------ |
| Branch                | `main`                                                 |
| Application type      | **Express** (or **React Router**, if listed), not Vite |
| Node.js version       | 22                                                     |
| Root directory        | `/`                                                    |
| Package manager       | pnpm                                                   |
| Build script          | `build`                                                |
| Output directory      | empty for Express, `build` for React Router            |
| Entry file            | `server.js`                                            |
| Environment variables | `BROKSPACE_PRERENDER=false`                            |

- **The type and the entry file matter most.** Hostinger detects this
  project as Vite, a static type: it then serves the build folder as files and
  never starts `server.js`, and brokspace.org answers `403 Forbidden`.
- `BROKSPACE_PRERENDER=false` skips prerendering, which cannot reach its local
  server inside Hostinger's build (`ECONNREFUSED ::1`). The server renders
  every page on request.
- pnpm is pinned to 10 (`packageManager`): Hostinger's Node 22 corepack cannot
  start pnpm 11 or newer.
- Optional: `GITHUB_TOKEN`, a fine-grained token with no permissions (public
  data only), raises the GitHub API limit for the stars count.

After **Save and redeploy**, check https://brokspace.org, `/pt-br`, `/docs`, a
search (Ctrl+K) and `/install.sh` (it should download the script). The domain
and SSL are set in the same app (**Domains**); add `www.brokspace.org` too.

### Updates

Changes go to `staging` through pull requests. Merging the release PR
("release: promote staging to main") updates `main`, and Hostinger rebuilds
and redeploys the app (auto-deploy on). To publish new CLI docs:
`pnpm sync-docs`, commit, open a PR.

### Static hosting

The build can also run without a server: with prerendering on (the default),
`build/client` is the complete site (pages, search index, 404 page, Markdown
copies), and `public/.htaccess` adds the redirects and headers on Apache or
LiteSpeed.

## License

Code: MIT or Apache-2.0, like the rest of Brokspace. The Brokspace name, logo
and brand assets are not covered by these licenses.
