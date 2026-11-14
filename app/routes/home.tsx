import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Bot,
  GitCommitHorizontal,
  HardDrive,
  MessageSquareText,
  RefreshCw,
  Search,
  Sparkles,
  Star,
} from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Command } from '@/components/landing/copy-button';
import { InstallTabs } from '@/components/landing/install-tabs';
import { LanguageSwitch } from '@/components/landing/language-switch';
import { TerminalDemo } from '@/components/landing/terminal-demo';
import { Logo, Mark } from '@/components/logo';
import { cn } from '@/lib/cn';
import { fetchStars, formatStars, useStars } from '@/lib/github';
import { i18n, langFromPath, localize, ogLocale } from '@/lib/i18n';
import { t } from '@/lib/messages';
import { appName, links, siteUrl } from '@/lib/shared';
import { useLang, useMessages } from '@/lib/use-lang';
import type { Route } from './+types/home';

export function meta({ location }: Route.MetaArgs) {
  const lang = langFromPath(location.pathname);
  const m = t(lang);
  const title = `${appName}: ${m.tagline}`;
  const url = `${siteUrl}${localize(lang, '/')}`.replace(/\/$/, '') || siteUrl;
  return [
    { title },
    { name: 'description', content: m.meta.description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: m.meta.description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: `${siteUrl}/og-cover.png` },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: ogLocale[lang] },
    { name: 'twitter:card', content: 'summary_large_image' },
    { tagName: 'link', rel: 'canonical', href: url },
    ...i18n.languages.map((other) => ({
      tagName: 'link',
      rel: 'alternate',
      hrefLang: other === 'pt-br' ? 'pt-BR' : other,
      href: `${siteUrl}${localize(other, '/')}`.replace(/\/$/, ''),
    })),
    { tagName: 'link', rel: 'alternate', hrefLang: 'x-default', href: siteUrl },
  ];
}

export async function loader() {
  return { stars: await fetchStars(process.env.GITHUB_TOKEN) };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const stars = useStars(loaderData.stars);
  const m = useMessages();

  return (
    <div className="dark flex min-h-screen flex-col bg-nordic text-snow">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-snow px-3 py-2 text-nordic focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {m.nav.skip}
      </a>
      <Header stars={stars} />
      <main id="main" className="flex-1">
        <Hero stars={stars} />
        <WorksWith />
        <Features />
        <LocalFirst />
        <Modes />
        <GetStarted />
        <OpenSource stars={stars} />
      </main>
      <Footer />
    </div>
  );
}

/** A link to a page of the site, in the current language. */
function SiteLink({ to, ...props }: React.ComponentProps<typeof Link> & { to: string }) {
  return <Link to={localize(useLang(), to)} {...props} />;
}

/* ------------------------------------------------------------------ */

function Header({ stars }: { stars: number | null }) {
  const m = useMessages().nav;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors duration-300',
        scrolled ? 'border-white/8 bg-nordic/85 backdrop-blur-xl' : 'border-transparent',
      )}
    >
      <nav aria-label={m.main} className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <SiteLink
          to="/"
          aria-label={m.home}
          className="rounded-md focus-visible:outline-2 focus-visible:outline-forge"
        >
          <Logo />
        </SiteLink>
        <div className="hidden items-center gap-1 text-sm text-mist md:flex">
          <NavLink to="/docs">{m.docs}</NavLink>
          <NavLink to="/docs/integrations">{m.editors}</NavLink>
          <NavLink to="/docs/hub">
            {m.hub}
            <span className="ml-1.5 rounded-full border border-white/12 px-1.5 py-px text-[10px] tracking-wide text-ink-400 uppercase">
              {m.soon}
            </span>
          </NavLink>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitch />
          <div className="hidden sm:block">
            <StarsPill stars={stars} />
          </div>
          <SiteLink
            to="/docs/getting-started"
            className="hidden h-9 items-center rounded-full bg-snow px-4 text-sm font-medium text-nordic transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forge sm:inline-flex"
          >
            {m.getStarted}
          </SiteLink>
          <SiteLink
            to="/docs"
            className="inline-flex h-9 items-center rounded-full px-3 text-sm text-mist hover:text-snow md:hidden"
          >
            {m.docs}
          </SiteLink>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <SiteLink
      to={to}
      className="inline-flex items-center rounded-full px-3 py-1.5 transition-colors hover:bg-white/6 hover:text-snow focus-visible:outline-2 focus-visible:outline-forge"
    >
      {children}
    </SiteLink>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function StarsPill({ stars, className }: { stars: number | null; className?: string }) {
  const m = useMessages().stars;
  return (
    <a
      href={links.brok}
      className={cn(
        'group inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pr-3 pl-2.5 text-sm text-mist transition-colors hover:border-white/20 hover:text-snow focus-visible:outline-2 focus-visible:outline-forge',
        className,
      )}
      aria-label={stars === null ? m.onGitHub : m.label(stars)}
    >
      <GitHubIcon className="size-4" />
      <span className="hidden sm:inline">{m.star}</span>
      <span className="flex items-center gap-1 border-l border-white/10 pl-2 tabular-nums">
        <Star className="size-3.5 text-forge transition-transform group-hover:scale-110" aria-hidden="true" />
        {stars === null ? 'GitHub' : formatStars(stars)}
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ stars }: { stars: number | null }) {
  const m = useMessages().hero;
  return (
    <section className="relative isolate overflow-hidden">
      {/* Fold lines fading out from the top, the ridges and their glow below. */}
      <div
        aria-hidden="true"
        className="bg-folds absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]"
      />
      <img
        src="/brand/ridges.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[62%] w-full object-cover object-bottom opacity-90 [mask-image:linear-gradient(to_bottom,transparent,black_35%)]"
      />
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-24 sm:px-8 sm:pt-24 sm:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <SiteLink
            to="/docs/memory"
            className="inline-flex animate-rise items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pr-3 pl-1 text-[13px] text-mist backdrop-blur transition-colors hover:border-forge/40 hover:text-snow"
          >
            <span className="rounded-full bg-forge/15 px-2 py-0.5 text-xs font-medium text-forge-300">
              {m.badge}
            </span>
            {m.announcement}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </SiteLink>
          <h1 className="mt-8 animate-rise text-[clamp(3rem,9vw,6.75rem)] leading-[0.92] font-semibold tracking-[-0.045em] text-balance [animation-delay:80ms]">
            {m.titleTop}
            <br />
            <span className="bg-gradient-to-br from-forge-300 via-forge to-forge-600 bg-clip-text text-transparent">
              {m.titleAccent}
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl animate-rise text-balance text-lg leading-relaxed text-mist [animation-delay:160ms] sm:text-xl">
            {m.lead}
          </p>
          <div className="mt-10 flex animate-rise flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row">
            <SiteLink
              to="/docs/getting-started"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-forge px-6 font-medium text-nordic shadow-[0_8px_30px_-6px_rgba(255,138,61,0.55)] transition-[background-color,transform] hover:-translate-y-px hover:bg-forge-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forge"
            >
              {m.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </SiteLink>
            <StarsPill stars={stars} className="h-12 px-5" />
          </div>
          <Command
            command="curl -fsSL https://brokspace.org/install.sh | sh"
            className="mx-auto mt-6 max-w-xl animate-rise bg-ink-850/80 backdrop-blur [animation-delay:320ms]"
          />
        </div>
        <div className="mx-auto mt-16 max-w-4xl animate-rise [animation-delay:420ms] sm:mt-20">
          <TerminalDemo />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function WorksWith() {
  const m = useMessages().worksWith;
  const tools = ['Claude Code', 'Cursor', 'VS Code + Copilot', 'Codex', 'Ollama', 'LM Studio', m.anyApi];
  return (
    <section aria-label={m.title} className="border-y border-white/6 bg-ink-850/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-8 sm:px-8 lg:flex-row lg:gap-8">
        <p className="shrink-0 font-mono text-xs tracking-widest text-ink-400 uppercase">{m.title}</p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px] text-mist lg:justify-start">
          {tools.map((tool) => (
            <li key={tool} className="whitespace-nowrap">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function SectionHeading({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <p className="font-mono text-xs tracking-widest text-forge uppercase">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
        {title}
      </h2>
      {children && <p className="mt-5 text-lg leading-relaxed text-mist">{children}</p>}
    </div>
  );
}

function Card({
  icon,
  title,
  children,
  visual,
  className,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  visual?: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.035] to-transparent p-6 transition-colors hover:border-white/15 sm:p-7',
        className,
      )}
    >
      <div className="flex size-9 items-center justify-center rounded-lg border border-forge/25 bg-forge/10 text-forge">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-[-0.015em]">{title}</h3>
      <p className="mt-2 leading-relaxed text-mist">{children}</p>
      {visual && <div className="mt-6 flex-1">{visual}</div>}
    </article>
  );
}

function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-white/8 bg-[#0D1116] p-4 font-mono text-[12px] leading-[1.75] text-ink-200',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-1 font-mono text-[12px] text-ink-200"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Features() {
  const m = useMessages().features;
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow={m.eyebrow} title={m.title}>
        {m.lead}
      </SectionHeading>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card
          icon={<Search className="size-[18px]" />}
          title={m.search.title}
          className="lg:col-span-2"
          visual={
            <Mono>
              <p className="text-snow">
                <span className="text-forge">❯ </span>brok search "rate limit per tenant"
              </p>
              <p className="mt-2 whitespace-nowrap">
                <span className="text-ink-400">0.86 </span>
                <span className="text-forge-300">src/throttle/tenant.guard.ts</span>:12-47{' '}
                <span className="text-[#9CC8FF]">class</span>{' '}
                <span className="text-snow">TenantThrottlerGuard</span>
              </p>
              <p className="whitespace-nowrap">
                <span className="text-ink-400">0.79 </span>
                <span className="text-forge-300">billing/README.md</span>:30-58{' '}
                <span className="text-[#9CC8FF]">section</span> <span className="text-snow">Rate limits</span>
              </p>
              <p className="whitespace-nowrap">
                <span className="text-ink-400">0.71 </span>
                <span className="text-forge-300">libs/redis/src/window.rs</span>:8-36{' '}
                <span className="text-[#9CC8FF]">function</span>{' '}
                <span className="text-snow">sliding_window</span>
              </p>
            </Mono>
          }
        >
          {m.search.body}
        </Card>

        <Card
          icon={<MessageSquareText className="size-[18px]" />}
          title={m.answers.title}
          visual={
            <Mono>
              <p className="text-ink-400">Sources (qwen2.5-coder:7b via ollama):</p>
              <p className="text-ink-400"> src/auth/auth.service.ts:58-91</p>
              <p className="text-ink-400"> src/auth/jwt.strategy.ts:14-38</p>
            </Mono>
          }
        >
          {m.answers.body}
        </Card>

        <Card
          icon={<Bot className="size-[18px]" />}
          title={m.agents.title}
          visual={
            <div className="space-y-3">
              <Command command="brok setup agents" className="bg-[#0D1116]" />
              <Chips items={['brok_search', 'brok_status', '/ask-brok']} />
            </div>
          }
        >
          {m.agents.body}
        </Card>

        <Card
          icon={<GitCommitHorizontal className="size-[18px]" />}
          title={m.review.title}
          visual={
            <Mono>
              <p>
                <span className="text-forge">❯ </span>
                <span className="text-snow">brok review --staged</span>
              </p>
              <p>
                <span className="text-forge">❯ </span>
                <span className="text-snow">git add -p && brok commit</span>
              </p>
            </Mono>
          }
        >
          {m.review.body}
        </Card>

        <Card
          icon={<Sparkles className="size-[18px]" />}
          title={m.skills.title}
          visual={
            <Chips
              items={['tdd', 'code-review', 'grill-me', 'to-spec', 'diagnosing-bugs', 'handoff', '+14']}
            />
          }
        >
          {m.skills.body}
        </Card>

        <Card
          icon={<Blocks className="size-[18px]" />}
          title={m.shards.title}
          className="md:col-span-2 lg:col-span-3"
          visual={
            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <Mono className="text-center">
                <span className="text-[#9CC8FF]">file:changed</span>
              </Mono>
              <ArrowRight className="mx-auto size-4 rotate-90 text-ink-500 md:rotate-0" aria-hidden="true" />
              <Mono>
                <p className="text-snow">brok-security-auditor</p>
                <p className="text-ink-400">read: src/ · network: false · process: git</p>
              </Mono>
              <ArrowRight className="mx-auto size-4 rotate-90 text-ink-500 md:rotate-0" aria-hidden="true" />
              <Mono className="text-center">
                <span className="text-forge-300">security:alert</span>
              </Mono>
            </div>
          }
        >
          {m.shards.body}
        </Card>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function LocalFirst() {
  const m = useMessages().localFirst;
  const icons = [
    <HardDrive key="disk" className="size-5" />,
    <Bot key="bot" className="size-5" />,
    <RefreshCw key="sync" className="size-5" />,
  ];
  return (
    <section className="relative isolate overflow-hidden border-y border-white/6">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_100%_100%,rgba(255,138,61,0.16),transparent)]"
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <SectionHeading
          eyebrow={m.eyebrow}
          title={
            <>
              {m.titleTop}
              <br className="hidden sm:block" /> {m.titleBottom}
            </>
          }
        >
          {m.lead}
        </SectionHeading>
        <ul className="space-y-6">
          {m.points.map((point, i) => (
            <li key={point.title} className="flex gap-4">
              <div className="mt-0.5 text-forge">{icons[i]}</div>
              <div>
                <h3 className="font-semibold">{point.title}</h3>
                <p className="mt-1 leading-relaxed text-mist">{point.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Modes() {
  const all = useMessages();
  const m = all.modes;
  // Where Brokspace is in each editor: coding agents today (MCP), extensions next.
  const editors: [string, string, boolean][] = [
    ['Claude Code · Cursor · Copilot · Codex (MCP)', m.now, true],
    ['VS Code · Cursor · Windsurf', m.next, false],
    ['IntelliJ IDEA · WebStorm · PyCharm · GoLand', m.later, false],
  ];
  const commands: [string, string][] = [
    ['search', m.commands.search],
    ['ask', m.commands.ask],
    ['chat', m.commands.chat],
    ['review', m.commands.review],
    ['commit', m.commands.commit],
    ['skill run', m.commands.skill],
    ['shard install', m.commands.shard],
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow={m.eyebrow} title={m.title}>
        {m.lead}
      </SectionHeading>

      <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        <article className="flex min-w-0 flex-col rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.035] to-transparent p-6 sm:p-7">
          <p className="font-mono text-xs tracking-widest text-ink-400 uppercase">CLI</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">brok</h3>
          <p className="mt-2 leading-relaxed text-mist">{m.cliBody}</p>
          <Mono className="mt-6 flex-1 text-[12.5px]">
            {commands.map(([command, what]) => (
              <p key={command} className="flex gap-3 whitespace-nowrap">
                <span className="w-36 shrink-0 text-snow">
                  <span className="text-forge">brok </span>
                  {command}
                </span>
                <span className="truncate text-ink-400"># {what}</span>
              </p>
            ))}
          </Mono>
          <SiteLink
            to="/docs/getting-started"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-snow hover:text-forge-300"
          >
            {m.gettingStarted} <ArrowRight className="size-4" aria-hidden="true" />
          </SiteLink>
        </article>

        <article className="flex min-w-0 flex-col rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.035] to-transparent p-6 sm:p-7">
          <p className="font-mono text-xs tracking-widest text-ink-400 uppercase">{all.nav.editors}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">{m.editorsTitle}</h3>
          <p className="mt-2 max-w-lg leading-relaxed text-mist">{m.editorsBody}</p>
          <ul className="mt-6 flex-1 divide-y divide-white/8 rounded-xl border border-white/8">
            {editors.map(([names, status, ready]) => (
              <li key={names} className="flex items-center gap-3 px-4 py-3 text-sm">
                <span className="min-w-0 flex-1 truncate text-snow">{names}</span>
                <span
                  className={
                    ready
                      ? 'rounded-full bg-forge/15 px-2 py-0.5 text-xs font-medium text-forge-300'
                      : 'rounded-full border border-white/12 px-2 py-0.5 text-xs text-ink-400'
                  }
                >
                  {status}
                </span>
              </li>
            ))}
          </ul>
          <SiteLink
            to="/docs/integrations"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-snow hover:text-forge-300"
          >
            {m.editorsLink} <ArrowRight className="size-4" aria-hidden="true" />
          </SiteLink>
        </article>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="group relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-12 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute top-10 bottom-0 left-5 w-px -translate-x-1/2 bg-gradient-to-b from-white/12 to-transparent group-last:hidden"
      />
      <span className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-ink-850 font-mono text-sm text-forge">
        {n}
      </span>
      <div className="min-w-0 pt-1.5">
        <h3 className="text-lg font-semibold tracking-[-0.015em]">{title}</h3>
        <div className="mt-4">{children}</div>
      </div>
    </li>
  );
}

function GetStarted() {
  const m = useMessages().getStarted;
  return (
    <section id="install" className="border-t border-white/6 bg-ink-850/30">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.25fr]">
        <SectionHeading eyebrow={m.eyebrow} title={m.title} className="lg:sticky lg:top-28 lg:self-start">
          {m.lead}
        </SectionHeading>
        <ol>
          <Step n={1} title={m.install}>
            <InstallTabs />
          </Step>
          <Step n={2} title={m.setup}>
            <Command command="cd ~/code/my-project && brok init" />
            <p className="mt-3 text-sm text-ink-400">{m.setupNote}</p>
          </Step>
          <Step n={3} title={m.ask}>
            <Command command={m.askCommand} />
            <p className="mt-3 text-sm text-ink-400">
              {m.askNoteBefore} <code className="font-mono text-mist">brok search</code>,{' '}
              <code className="font-mono text-mist">brok chat</code>,{' '}
              <code className="font-mono text-mist">brok review</code>. {m.askNoteAfter}
            </p>
          </Step>
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function OpenSource({ stars }: { stars: number | null }) {
  const m = useMessages().openSource;
  const repos = [
    { name: 'brok', description: m.repos.brok, href: links.brok },
    { name: 'brok-agent', description: m.repos.agent, href: links.agent },
    { name: 'brok-sdk', description: m.repos.sdk, href: links.sdk },
    { name: 'brok-shard-template', description: m.repos.shardTemplate, href: links.shardTemplate },
    { name: 'example-nestjs', description: m.repos.example, href: links.example },
  ];
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-folds absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent)]"
      />
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Mark className="mx-auto h-14" />
          <h2 className="mt-8 text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.04em]">
            {m.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mist">{m.lead}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <StarsPill stars={stars} className="h-12 px-5" />
            <a
              href={links.discussions}
              className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-mist transition-colors hover:text-snow"
            >
              {m.discuss} <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <li key={repo.name}>
              <a
                href={repo.href}
                className="group flex h-full items-start gap-3 rounded-xl border border-white/8 bg-nordic/60 p-4 backdrop-blur transition-colors hover:border-white/18 focus-visible:outline-2 focus-visible:outline-forge"
              >
                <GitHubIcon className="mt-0.5 size-4 shrink-0 text-ink-400 group-hover:text-snow" />
                <span className="min-w-0">
                  <span className="flex items-center gap-1 font-mono text-sm text-snow">
                    brokspace/{repo.name}
                    <ArrowUpRight
                      className="size-3.5 text-ink-500 transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-forge"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-400">{repo.description}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Footer() {
  const all = useMessages();
  const m = all.footer;
  const columns = [
    {
      title: m.product,
      items: [
        { label: m.docs, to: '/docs' },
        { label: m.gettingStarted, to: '/docs/getting-started' },
        { label: m.memory, to: '/docs/memory' },
        { label: m.hub, to: '/docs/hub' },
      ],
    },
    {
      title: m.build,
      items: [
        { label: m.skills, to: '/docs/skills' },
        { label: m.shards, to: '/docs/shards' },
        { label: m.integrations, to: '/docs/integrations' },
        { label: 'llms.txt', to: '/llms.txt', external: true },
      ],
    },
    {
      title: m.community,
      items: [
        { label: 'GitHub', to: links.github, external: true },
        { label: m.discussions, to: links.discussions, external: true },
        { label: m.releases, to: links.releases, external: true },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/6">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">{all.pitch}</p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-sm font-medium text-snow">{column.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-400">
              {column.items.map((item) => (
                <li key={item.label}>
                  {'external' in item ? (
                    <a href={item.to} className="transition-colors hover:text-snow">
                      {item.label}
                    </a>
                  ) : (
                    <SiteLink to={item.to} className="transition-colors hover:text-snow">
                      {item.label}
                    </SiteLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Brokspace. {m.license}
          </p>
          <p className="font-mono tracking-widest uppercase">{all.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
