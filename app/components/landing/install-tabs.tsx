import { useState } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/cn';
import { localize } from '@/lib/i18n';
import { links } from '@/lib/shared';
import { useLang, useMessages } from '@/lib/use-lang';
import { Command } from './copy-button';

const OPTIONS = [
  {
    id: 'unix',
    label: 'macOS / Linux',
    command: 'curl -fsSL https://brokspace.org/install.sh | sh',
  },
  {
    id: 'windows',
    label: 'Windows',
    command: 'irm https://brokspace.org/install.ps1 | iex',
  },
  {
    id: 'cargo',
    label: 'Cargo',
    command: 'cargo install brok-cli brok-agent',
  },
] as const;

export function InstallTabs() {
  const lang = useLang();
  const m = useMessages().install;
  const [active, setActive] = useState<(typeof OPTIONS)[number]['id']>('unix');
  const option = OPTIONS.find((o) => o.id === active) ?? OPTIONS[0];

  return (
    <div>
      <div role="tablist" aria-label={m.tabs} className="mb-3 flex flex-wrap gap-1">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            role="tab"
            id={`install-${o.id}`}
            aria-selected={o.id === active}
            aria-controls="install-panel"
            onClick={() => setActive(o.id)}
            className={cn(
              'rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-forge',
              o.id === active ? 'bg-snow text-nordic' : 'text-mist hover:bg-white/6 hover:text-snow',
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div id="install-panel" role="tabpanel" aria-labelledby={`install-${option.id}`}>
        <Command command={option.command} />
        <p className="mt-3 text-sm text-ink-400">
          {m[option.id]}{' '}
          {option.id === 'windows' ? (
            <Link
              to={localize(lang, '/docs/getting-started#1-install-brok')}
              className="text-mist underline-offset-4 hover:text-snow hover:underline"
            >
              {m.manual}
            </Link>
          ) : (
            <a href={links.releases} className="text-mist underline-offset-4 hover:text-snow hover:underline">
              {m.releaseNotes}
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
