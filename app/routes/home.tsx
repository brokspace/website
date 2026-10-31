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
import { TerminalDemo } from '@/components/landing/terminal-demo';
import { Logo, Mark } from '@/components/logo';
import { cn } from '@/lib/cn';
import { fetchStars, formatStars, useStars } from '@/lib/github';
import { appName, links, pitch, siteUrl, tagline } from '@/lib/shared';
import type { Route } from './+types/home';

export function meta(_: Route.MetaArgs) {
  const title = `${appName}: ${tagline}`;
  const description = `${pitch} Brokspace indexes your repositories on your machine and gives your LLM and your coding agents the context they need.`;
  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: siteUrl },
    { property: 'og:image', content: `${siteUrl}/og-cover.png` },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { tagName: 'link', rel: 'canonical', href: siteUrl },
  ];
}

export async function loader() {
  return { stars: await fetchStars(process.env.GITHUB_TOKEN) };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const stars = useStars(loaderData.stars);

  return (
    <div className="dark flex min-h-screen flex-col bg-nordic text-snow">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-snow px-3 py-2 text-nordic focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
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

/* ------------------------------------------------------------------ */

function Header({ stars }: { stars: number | null }) {
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
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link
          to="/"
          aria-label="Brokspace home"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-forge"
        >
          <Logo />
        </Link>
        <div className="hidden items-center gap-1 text-sm text-mist md:flex">
          <NavLink to="/docs">Docs</NavLink>
          <NavLink to="/docs/ide">IDE</NavLink>
          <NavLink to="/docs/hub">
            Hub
            <span className="ml-1.5 rounded-full border border-white/12 px-1.5 py-px text-[10px] tracking-wide text-ink-400 uppercase">
              Soon
            </span>
          </NavLink>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <StarsPill stars={stars} />
          <Link
            to="/docs/getting-started"
            className="hidden h-9 items-center rounded-full bg-snow px-4 text-sm font-medium text-nordic transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forge sm:inline-flex"
          >
            Get started
          </Link>
          <Link
            to="/docs"
            className="inline-flex h-9 items-center rounded-full px-3 text-sm text-mist hover:text-snow md:hidden"
          >
            Docs
          </Link>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center rounded-full px-3 py-1.5 transition-colors hover:bg-white/6 hover:text-snow focus-visible:outline-2 focus-visible:outline-forge"
    >
      {children}
    </Link>
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
  return (
    <a
      href={links.brok}
      className={cn(
        'group inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pr-3 pl-2.5 text-sm text-mist transition-colors hover:border-white/20 hover:text-snow focus-visible:outline-2 focus-visible:outline-forge',
        className,
      )}
      aria-label={stars === null ? 'Brokspace on GitHub' : `Star Brokspace on GitHub, ${stars} stars`}
    >
      <GitHubIcon className="size-4" />
      <span className="hidden sm:inline">Star</span>
      <span className="flex items-center gap-1 border-l border-white/10 pl-2 tabular-nums">
        <Star className="size-3.5 text-forge transition-transform group-hover:scale-110" aria-hidden="true" />
        {stars === null ? 'GitHub' : formatStars(stars)}
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ stars }: { stars: number | null }) {
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
          <Link
            to="/docs/ide"
            className="inline-flex animate-rise items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pr-3 pl-1 text-[13px] text-mist backdrop-blur transition-colors hover:border-forge/40 hover:text-snow"
          >
            <span className="rounded-full bg-forge/15 px-2 py-0.5 text-xs font-medium text-forge-300">
              New
            </span>
            Brokspace IDE: the same workspace, in an IDE
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <h1 className="mt-8 animate-rise text-[clamp(3rem,9vw,6.75rem)] leading-[0.92] font-semibold tracking-[-0.045em] [animation-delay:80ms]">
            Your workspace,
            <br />
            <span className="bg-gradient-to-br from-forge-300 via-forge to-forge-600 bg-clip-text text-transparent">
              understood.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl animate-rise text-balance text-lg leading-relaxed text-mist [animation-delay:160ms] sm:text-xl">
            Brokspace indexes every repository you work in, on your machine, and gives you, your LLM and your
            coding agents the context they are missing.
          </p>
          <div className="mt-10 flex animate-rise flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row">
            <Link
              to="/docs/getting-started"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-forge px-6 font-medium text-nordic shadow-[0_8px_30px_-6px_rgba(255,138,61,0.55)] transition-[background-color,transform] hover:-translate-y-px hover:bg-forge-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forge"
            >
              Get started
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
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
  const tools = [
    'Claude Code',
    'Cursor',
    'VS Code + Copilot',
    'Codex',
    'Ollama',
    'LM Studio',
    'any OpenAI-compatible API',
  ];
  return (
    <section aria-label="Works with" className="border-y border-white/6 bg-ink-850/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-8 sm:px-8 lg:flex-row lg:gap-8">
        <p className="shrink-0 font-mono text-xs tracking-widest text-ink-400 uppercase">Works with</p>
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
      <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
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
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow="What it does" title="Context, everywhere you work.">
        One local index of your code, shared by the terminal, the IDE, your LLM and every coding agent you
        use.
      </SectionHeading>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card
          icon={<Search className="size-[18px]" />}
          title="Search that reads code like you do"
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
          Functions, classes and doc sections are indexed whole, then found by meaning or by name: hybrid BM25
          and semantic search over one repository, its submodules, or a folder full of them.
        </Card>

        <Card
          icon={<MessageSquareText className="size-[18px]" />}
          title="Answers that cite their sources"
          visual={
            <Mono>
              <p className="text-ink-400">Sources (qwen2.5-coder:7b via ollama):</p>
              <p className="text-ink-400"> src/auth/auth.service.ts:58-91</p>
              <p className="text-ink-400"> src/auth/jwt.strategy.ts:14-38</p>
            </Mono>
          }
        >
          Ask Ollama, LM Studio or any OpenAI-compatible model about your workspace. Every answer lists the
          code it was built from.
        </Card>

        <Card
          icon={<Bot className="size-[18px]" />}
          title="Context for the agents you already use"
          visual={
            <div className="space-y-3">
              <Command command="brok setup agents" className="bg-[#0D1116]" />
              <Chips items={['brok_search', 'brok_status', '/ask-brok']} />
            </div>
          }
        >
          One command gives Claude Code, Cursor, Copilot and Codex a search tool over MCP, plus your skills.
        </Card>

        <Card
          icon={<GitCommitHorizontal className="size-[18px]" />}
          title="Reviews and commit messages"
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
          A first-pass review of your uncommitted, staged or branch changes, and the commit message written
          from the staged diff.
        </Card>

        <Card
          icon={<Sparkles className="size-[18px]" />}
          title="20 skills, built in"
          visual={
            <Chips
              items={['tdd', 'code-review', 'grill-me', 'to-spec', 'diagnosing-bugs', 'handoff', '+14']}
            />
          }
        >
          Proven workflows your LLM and your agents follow. Write your own in a SKILL.md and share it with
          your team.
        </Card>

        <Card
          icon={<Blocks className="size-[18px]" />}
          title="Shards: your workspace, programmable"
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
          Small programs in any language that react to workspace events on a local bus, each limited to the
          files, programs and network it declares up front. Start from the template, share them as git
          repositories.
        </Card>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function LocalFirst() {
  const points = [
    {
      icon: <HardDrive className="size-5" />,
      title: 'Indexed on your machine',
      body: 'The index lives in .brokspace/, next to your code. No account, no upload, works offline.',
    },
    {
      icon: <Bot className="size-5" />,
      title: 'The model you choose',
      body: 'A local model by default. A hosted one only when you pick it, even for a single question.',
    },
    {
      icon: <RefreshCw className="size-5" />,
      title: 'Always up to date',
      body: 'Saves, commits, pulls and branch switches reach the index within seconds.',
    },
  ];
  return (
    <section className="relative isolate overflow-hidden border-y border-white/6">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_80%_at_100%_100%,rgba(255,138,61,0.16),transparent)]"
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <SectionHeading
          eyebrow="Local-first"
          title={
            <>
              Nothing leaves your machine.
              <br className="hidden sm:block" /> Unless you say so.
            </>
          }
        >
          Brokspace runs next to your code. Your repositories are never sent anywhere to be indexed, and
          answers come from the model you point it at.
        </SectionHeading>
        <ul className="space-y-6">
          {points.map((point) => (
            <li key={point.title} className="flex gap-4">
              <div className="mt-0.5 text-forge">{point.icon}</div>
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
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow="CLI mode, IDE mode" title="One workspace. Two ways in.">
        Use brok in any terminal and editor, or open the same workspace in Brokspace IDE. Both read the same
        .brokspace/ folder, so you can switch at any time.
      </SectionHeading>

      <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        <article className="flex min-w-0 flex-col rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.035] to-transparent p-6 sm:p-7">
          <p className="font-mono text-xs tracking-widest text-ink-400 uppercase">CLI</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">brok</h3>
          <p className="mt-2 leading-relaxed text-mist">
            Every feature, scriptable, with JSON output for your own tools.
          </p>
          <Mono className="mt-6 flex-1 text-[12.5px]">
            {[
              ['search', 'find code by meaning or by name'],
              ['ask', 'an answer, with sources'],
              ['chat', 'follow-up questions'],
              ['review', 'review your changes'],
              ['commit', 'write the commit message'],
              ['skill run', 'run a workflow'],
              ['shard install', 'add an integration'],
            ].map(([command, what]) => (
              <p key={command} className="flex gap-3 whitespace-nowrap">
                <span className="w-36 shrink-0 text-snow">
                  <span className="text-forge">brok </span>
                  {command}
                </span>
                <span className="truncate text-ink-400"># {what}</span>
              </p>
            ))}
          </Mono>
          <Link
            to="/docs/getting-started"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-snow hover:text-forge-300"
          >
            Getting started <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </article>

        <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.035] to-transparent">
          <div className="p-6 sm:p-7">
            <p className="font-mono text-xs tracking-widest text-ink-400 uppercase">IDE</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">Brokspace IDE</h3>
            <p className="mt-2 max-w-lg leading-relaxed text-mist">
              Built on Eclipse Theia, with brok inside: start from a question, chat with the Brokspace agent,
              review and commit in a click. Open VSX extensions work too.
            </p>
            <Link
              to="/docs/ide"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-snow hover:text-forge-300"
            >
              macOS, Linux and Windows <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="relative mt-auto pl-6 sm:pl-7">
            <img
              src="/images/ide-home.png"
              alt="Brokspace IDE home page, with a question box and the Brokspace view in the sidebar"
              width={1440}
              height={900}
              loading="lazy"
              className="w-full rounded-tl-xl border-t border-l border-white/10 object-cover object-left-top shadow-2xl"
            />
          </div>
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
  return (
    <section id="install" className="border-t border-white/6 bg-ink-850/30">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.25fr]">
        <SectionHeading
          eyebrow="Get started"
          title="Three commands to a workspace that answers back."
          className="lg:sticky lg:top-28 lg:self-start"
        >
          About fifteen minutes from zero, including a local model. Search works right away, even without one.
        </SectionHeading>
        <ol>
          <Step n={1} title="Install brok">
            <InstallTabs />
          </Step>
          <Step n={2} title="Set up your workspace">
            <Command command="cd ~/code/my-project && brok init" />
            <p className="mt-3 text-sm text-ink-400">
              Six guided steps: it picks a model that fits your machine, indexes your code and connects your
              coding agents. It asks before anything big.
            </p>
          </Step>
          <Step n={3} title="Ask away">
            <Command command='brok ask "how does the refresh flow work?"' />
            <p className="mt-3 text-sm text-ink-400">
              Or <code className="font-mono text-mist">brok search</code>,{' '}
              <code className="font-mono text-mist">brok chat</code>,{' '}
              <code className="font-mono text-mist">brok review</code>. The index follows your edits from now
              on.
            </p>
          </Step>
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const REPOS = [
  { name: 'brok', description: 'The CLI: index, search, ask, review, skills and shards.', href: links.brok },
  {
    name: 'brok-agent',
    description: 'The helper that tracks changes and talks to the LLM.',
    href: links.agent,
  },
  { name: 'brok-sdk', description: 'Rust SDK and protocol for the event bus.', href: links.sdk },
  { name: 'brok-shard-template', description: 'Start a new shard in minutes.', href: links.shardTemplate },
  { name: 'ide', description: 'Brokspace IDE, built on Eclipse Theia.', href: links.ide },
  { name: 'example-nestjs', description: 'A sample project to try Brokspace on.', href: links.example },
];

function OpenSource({ stars }: { stars: number | null }) {
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
            Built in the open.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mist">
            MIT or Apache-2.0, developed on GitHub. Star the project, open an issue, ask in Discussions, or
            build a shard.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <StarsPill stars={stars} className="h-12 px-5" />
            <a
              href={links.discussions}
              className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-mist transition-colors hover:text-snow"
            >
              Join the discussion <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REPOS.map((repo) => (
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
  const columns = [
    {
      title: 'Product',
      items: [
        { label: 'Docs', to: '/docs' },
        { label: 'Getting started', to: '/docs/getting-started' },
        { label: 'Brokspace IDE', to: '/docs/ide' },
        { label: 'Shard Hub', to: '/docs/hub' },
      ],
    },
    {
      title: 'Build',
      items: [
        { label: 'Skills', to: '/docs/skills' },
        { label: 'Shards', to: '/docs/shards' },
        { label: 'Integrations', to: '/docs/integrations' },
        { label: 'llms.txt', to: '/llms.txt', external: true },
      ],
    },
    {
      title: 'Community',
      items: [
        { label: 'GitHub', to: links.github, external: true },
        { label: 'Discussions', to: links.discussions, external: true },
        { label: 'Releases', to: links.releases, external: true },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/6">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">{pitch}</p>
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
                    <Link to={item.to} className="transition-colors hover:text-snow">
                      {item.label}
                    </Link>
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
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Brokspace. Code under MIT or
            Apache-2.0.
          </p>
          <p className="font-mono tracking-widest uppercase">{tagline}</p>
        </div>
      </div>
    </footer>
  );
}
