import { useState } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/cn';
import { links } from '@/lib/shared';
import { Command } from './copy-button';

const OPTIONS = [
  {
    id: 'unix',
    label: 'macOS / Linux',
    command: 'curl -fsSL https://brokspace.org/install.sh | sh',
    note: 'Installs brok and brok-agent and verifies their checksums.',
  },
  {
    id: 'windows',
    label: 'Windows',
    command: 'irm https://brokspace.org/install.ps1 | iex',
    note: 'In PowerShell. Script blocked by IT? The getting started guide has a manual install.',
  },
  {
    id: 'cargo',
    label: 'Cargo',
    command: 'cargo install brok-cli brok-agent',
    note: 'Needs a C compiler and protoc. Add --no-default-features for a text-search-only build.',
  },
  {
    id: 'ide',
    label: 'IDE',
    command: 'brew install --cask brokspace/tap/brokspace-ide',
    note: 'Brokspace IDE bundles brok. Also on apt, and as a Windows installer.',
  },
] as const;

export function InstallTabs() {
  const [active, setActive] = useState<(typeof OPTIONS)[number]['id']>('unix');
  const option = OPTIONS.find((o) => o.id === active) ?? OPTIONS[0];

  return (
    <div>
      <div role="tablist" aria-label="Install options" className="mb-3 flex flex-wrap gap-1">
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
          {option.note}{' '}
          {option.id === 'ide' ? (
            <Link to="/docs/ide" className="text-mist underline-offset-4 hover:text-snow hover:underline">
              All IDE installers
            </Link>
          ) : option.id === 'windows' ? (
            <Link
              to="/docs/getting-started#1-install-brok"
              className="text-mist underline-offset-4 hover:text-snow hover:underline"
            >
              Manual install
            </Link>
          ) : (
            <a href={links.releases} className="text-mist underline-offset-4 hover:text-snow hover:underline">
              Release notes
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
