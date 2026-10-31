import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(
          () => setCopied(true),
          () => undefined,
        );
      }}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      className={cn(
        'inline-flex size-8 shrink-0 items-center justify-center rounded-md text-mist transition-colors hover:bg-white/8 hover:text-snow focus-visible:outline-2 focus-visible:outline-forge',
        className,
      )}
    >
      {copied ? <Check className="size-4 text-forge" /> : <Copy className="size-4" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}

/** A one-line shell command with a prompt and a copy button. */
export function Command({ command, className }: { command: string; className?: string }) {
  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-3 rounded-lg border border-white/10 bg-ink-850 py-1.5 pr-1.5 pl-4 font-mono text-[13px] text-snow',
        className,
      )}
    >
      <span aria-hidden="true" className="select-none text-forge">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap py-1 [scrollbar-width:none]">
        {command}
      </code>
      <CopyButton text={command} />
    </div>
  );
}
