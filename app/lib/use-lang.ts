import { useLocation } from 'react-router';
import { type Lang, langFromPath } from './i18n';
import { type Messages, t } from './messages';

/** The language of the current page, from its URL. */
export function useLang(): Lang {
  return langFromPath(useLocation().pathname);
}

export function useMessages(): Messages {
  return t(useLang());
}
