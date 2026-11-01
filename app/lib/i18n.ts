import { defineI18n } from 'fumadocs-core/i18n';

/**
 * English at `/` and `/docs/...`, Brazilian Portuguese under `/pt-br`.
 * Translated docs sit next to the English ones (`ide.pt-br.mdx`,
 * `meta.pt-br.json`); a page without a translation shows the English one.
 */
export const i18n = defineI18n({
  languages: ['en', 'pt-br'],
  defaultLanguage: 'en',
  hideLocale: 'default-locale',
  parser: 'dot',
});

export type Lang = (typeof i18n.languages)[number];

export const locales: { name: string; locale: Lang }[] = [
  { name: 'English', locale: 'en' },
  { name: 'Português (Brasil)', locale: 'pt-br' },
];

/** `<html lang>` and `og:locale` values. */
export const htmlLang: Record<Lang, string> = { en: 'en', 'pt-br': 'pt-BR' };
export const ogLocale: Record<Lang, string> = { en: 'en_US', 'pt-br': 'pt_BR' };

export function isLang(value: string | undefined): value is Lang {
  return i18n.languages.includes(value as Lang);
}

/** The language of a pathname: `/pt-br/...` is Portuguese, everything else English. */
export function langFromPath(pathname: string): Lang {
  const first = pathname.split('/')[1];
  return isLang(first) && first !== i18n.defaultLanguage ? first : i18n.defaultLanguage;
}

/** A site path in `lang`: `localize('pt-br', '/docs/ide')` is `/pt-br/docs/ide`. */
export function localize(lang: Lang, path: string): string {
  if (lang === i18n.defaultLanguage || !path.startsWith('/')) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

/** The same page in another language. */
export function switchLang(pathname: string, to: Lang): string {
  const from = langFromPath(pathname);
  const bare = from === i18n.defaultLanguage ? pathname : pathname.slice(from.length + 1) || '/';
  return localize(to, bare);
}
