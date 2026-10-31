import { useId } from 'react';
import { cn } from '@/lib/cn';

/**
 * The folded "B" mark. The orange planes keep their colors; the steel planes
 * follow the theme (dark steel on light backgrounds, light steel on dark).
 */
export function Mark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 820 1450" aria-hidden="true" className={cn('h-6 w-auto', className)}>
      <defs>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="820" y2="410" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF9B57" />
          <stop offset=".55" stopColor="#FF8A3D" />
          <stop offset="1" stopColor="#F06A22" />
        </linearGradient>
        <linearGradient id={`${id}f`} x1="118" y1="572" x2="820" y2="410" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E05A22" />
          <stop offset=".55" stopColor="#F57A2E" />
          <stop offset="1" stopColor="#B83A16" />
        </linearGradient>
        <linearGradient id={`${id}l`} x1="392" y1="709" x2="820" y2="819" gradientUnits="userSpaceOnUse">
          <stop offset="0" className="[stop-color:#6B7480] dark:[stop-color:#E4E8EE]" />
          <stop offset="1" className="[stop-color:#2E343C] dark:[stop-color:#9AA3AF]" />
        </linearGradient>
        <linearGradient id={`${id}w`} x1="820" y1="819" x2="0" y2="1450" gradientUnits="userSpaceOnUse">
          <stop offset="0" className="[stop-color:#3A4049] dark:[stop-color:#B9C1CB]" />
          <stop offset="1" className="[stop-color:#15191E] dark:[stop-color:#3E4650]" />
        </linearGradient>
      </defs>
      <polygon fill={`url(#${id}t)`} points="0,0 820,410 526,368 0,105" />
      <polygon fill={`url(#${id}f)`} points="526,368 820,410 308,666 118,572" />
      <polygon fill={`url(#${id}l)`} points="392,709 496,657 820,819 526,776" />
      <polygon fill={`url(#${id}w)`} points="526,776 820,819 0,1450 0,1039" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Mark className="h-6" />
      <span className="text-[17px] font-semibold tracking-[-0.02em]">Brokspace</span>
    </span>
  );
}
