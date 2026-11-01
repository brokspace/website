import { Languages } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { cn } from '@/lib/cn';
import { langFromPath, locales, switchLang } from '@/lib/i18n';
import { useMessages } from '@/lib/use-lang';

/** EN / PT links to the same page in the other language. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { pathname } = useLocation();
  const current = langFromPath(pathname);
  const m = useMessages().nav;

  return (
    <nav
      aria-label={m.language}
      className={cn(
        'inline-flex h-9 items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] px-1 text-xs',
        className,
      )}
    >
      <Languages className="mx-1 hidden size-3.5 text-ink-400 sm:block" aria-hidden="true" />
      {locales.map(({ locale, name }) => (
        <Link
          key={locale}
          to={switchLang(pathname, locale)}
          hrefLang={locale === 'pt-br' ? 'pt-BR' : locale}
          lang={locale === 'pt-br' ? 'pt-BR' : locale}
          title={name}
          aria-current={locale === current ? 'true' : undefined}
          className={cn(
            'rounded-full px-2 py-1 font-medium uppercase transition-colors focus-visible:outline-2 focus-visible:outline-forge',
            locale === current ? 'bg-white/10 text-snow' : 'text-mist hover:text-snow',
          )}
        >
          {locale === 'pt-br' ? 'PT' : 'EN'}
        </Link>
      ))}
    </nav>
  );
}
