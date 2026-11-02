import { RootProvider } from 'fumadocs-ui/provider/react-router';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router';
import type { Route } from './+types/root';
import './app.css';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { htmlLang, i18n, isLang, langFromPath, locales, switchLang } from '@/lib/i18n';
import { uiPtBr } from '@/lib/messages';
import { appName, docsContentRoute, docsRoute } from '@/lib/shared';
import NotFound from './routes/not-found';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
];

export const meta: Route.MetaFunction = () => [
  { property: 'og:site_name', content: appName },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lang = langFromPath(pathname);

  return (
    <html lang={htmlLang[lang]} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0B0E12" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          theme={{ defaultTheme: 'dark' }}
          // A prerendered index searched in the browser: the site is static files.
          search={{ options: { type: 'static' } }}
          i18n={{
            locale: lang,
            locales,
            defaultLanguage: i18n.defaultLanguage,
            hideLocale: i18n.hideLocale,
            translations: lang === 'pt-br' ? uiPtBr : undefined,
            onLocaleChange: (next) => {
              if (isLang(next)) navigate(switchLang(pathname, next));
            },
          }}
        >
          {children}
        </RootProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <NotFound />;
    message = 'Error';
    details = error.statusText;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 w-full max-w-[1400px] mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);
const serverMiddleware: Route.MiddlewareFunction = async ({ request }, next) => {
  const url = new URL(request.url);
  const suffixPath = rewriteSuffix(url.pathname);
  if (suffixPath) return Response.redirect(new URL(suffixPath, url));

  if (isMarkdownPreferred(request)) {
    const docsPath = rewriteDocs(url.pathname);
    // this URL has two representations selected by `Accept`, and the headers of
    // `Response.redirect()` are immutable, so build the response directly
    if (docsPath)
      return new Response(null, {
        status: 302,
        headers: {
          Location: new URL(docsPath, url).toString(),
          Vary: 'Accept',
        },
      });
  }

  return next();
};
export const middleware = [serverMiddleware];
