import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

// One output line: [text, class] segments. Mirrors brok's real output.
type Line = [string, string?][];

interface Scene {
  label: string;
  command: string;
  /** Streamed like an LLM answer, before `output`. */
  answer?: string;
  output: Line[];
}

const dim = 'text-ink-400';
const path = 'text-forge-300 font-medium';
const kind = 'text-[#9CC8FF]';
const bold = 'text-snow font-semibold';

const SCENES: Scene[] = [
  {
    label: 'Search',
    command: 'brok search "where do we validate tokens"',
    output: [
      [
        ['0.82 ', dim],
        ['src/auth/jwt.strategy.ts', path],
        [':14-38 '],
        ['method', kind],
        [' validate', bold],
      ],
      [['    async validate(payload: JwtPayload) {']],
      [['      const user = await this.users.findById(payload.sub);']],
      [['      if (!user || user.tokenVersion !== payload.ver) {']],
      [['        throw new UnauthorizedException();']],
      [['    … 6 more lines', dim]],
      [],
      [
        ['0.74 ', dim],
        ['src/auth/auth.guard.ts', path],
        [':22-41 '],
        ['method', kind],
        [' canActivate', bold],
      ],
      [['    canActivate(context: ExecutionContext) {']],
      [['      const token = extractBearer(context.switchToHttp().getRequest());']],
      [['    … 15 more lines', dim]],
    ],
  },
  {
    label: 'Ask',
    command: 'brok ask "how does the refresh flow work?"',
    answer:
      "The client posts its refresh token to /auth/refresh. AuthService.refresh verifies it, compares its tokenVersion with the user's, then returns a new access token and rotates the refresh token, so a stolen one works only once.",
    output: [
      [],
      [['Sources (qwen2.5-coder:7b via ollama):', dim]],
      [['  src/auth/auth.service.ts:58-91 (refresh)', dim]],
      [['  src/auth/auth.controller.ts:40-52 (refresh)', dim]],
      [['  src/users/user.entity.ts:9-31 (User)', dim]],
    ],
  },
  {
    label: 'Commit',
    command: 'git add -p && brok commit --print',
    answer:
      "feat(auth): rotate refresh tokens on every use\n\nRefresh now issues a new refresh token and bumps the user's\ntokenVersion, so a replayed token is rejected with 401.",
    output: [],
  },
];

const TYPE_MS = 34;
const ENTER_MS = 420;
const STREAM_MS = 12;
const LINE_MS = 60;
const HOLD_MS = 4200;

/** What a scene shows `t` ms after it started. */
function frame(scene: Scene, t: number) {
  const answer = scene.answer ?? '';
  const typed = Math.min(scene.command.length, Math.floor(t / TYPE_MS));
  let rest = t - scene.command.length * TYPE_MS - ENTER_MS;
  const streamed = rest < 0 ? 0 : Math.min(answer.length, Math.floor(rest / STREAM_MS));
  rest -= answer.length * STREAM_MS;
  const lines = rest < 0 ? 0 : Math.min(scene.output.length, Math.floor(rest / LINE_MS) + 1);
  return { typed, running: t >= scene.command.length * TYPE_MS + ENTER_MS, streamed, lines };
}

function duration(scene: Scene) {
  return (
    scene.command.length * TYPE_MS +
    ENTER_MS +
    (scene.answer?.length ?? 0) * STREAM_MS +
    scene.output.length * LINE_MS
  );
}

export function TerminalDemo() {
  const [index, setIndex] = useState(0);
  // The first scene renders complete on the server and without motion.
  const [elapsed, setElapsed] = useState(() => duration(SCENES[0]));
  const [auto, setAuto] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (root.current) observer.observe(root.current);
    let last = performance.now();
    let id = requestAnimationFrame(function tick(now) {
      const step = Math.min(now - last, 100);
      last = now;
      if (visible && document.visibilityState === 'visible') setElapsed((t) => t + step);
      id = requestAnimationFrame(tick);
    });
    return () => {
      cancelAnimationFrame(id);
      observer.disconnect();
    };
  }, []);

  const scene = SCENES[index];
  const total = duration(scene);

  useEffect(() => {
    if (auto && elapsed > total + HOLD_MS) {
      setIndex((i) => (i + 1) % SCENES.length);
      setElapsed(0);
    }
  }, [auto, elapsed, total]);

  const { typed, running, streamed, lines } = frame(scene, elapsed);
  const done = elapsed >= total;

  return (
    <div
      ref={root}
      className="overflow-hidden rounded-xl border border-white/10 bg-[#0D1116]/90 text-left shadow-[0_40px_120px_-30px_rgba(255,138,61,0.35),0_0_0_1px_rgba(0,0,0,0.6)] backdrop-blur-md"
    >
      <div className="flex items-center gap-4 border-b border-white/8 px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div role="tablist" aria-label="brok examples" className="flex">
          {SCENES.map((s, i) => (
            <button
              key={s.label}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => {
                setAuto(false);
                setIndex(i);
                setElapsed(0);
              }}
              className={cn(
                'relative px-3 py-3 font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-forge',
                i === index ? 'text-snow' : 'text-ink-400 hover:text-mist',
              )}
            >
              {s.label}
              {i === index && (
                <span
                  className="absolute inset-x-3 bottom-0 h-px origin-left bg-forge"
                  style={
                    auto ? { transform: `scaleX(${Math.min(1, elapsed / (total + HOLD_MS))})` } : undefined
                  }
                />
              )}
            </button>
          ))}
        </div>
        <span className="ml-auto hidden font-mono text-xs text-ink-500 sm:block">~/code/acme-api</span>
      </div>
      <div
        role="tabpanel"
        aria-label={scene.label}
        className="h-[340px] overflow-hidden px-5 py-4 font-mono text-[12.5px] leading-[1.7] text-ink-200 sm:h-[360px] sm:text-[13px]"
      >
        <p className="whitespace-pre">
          <span className="text-forge" aria-hidden="true">
            ❯{' '}
          </span>
          <span className="text-snow">{scene.command.slice(0, typed)}</span>
          {!running && <Caret />}
        </p>
        {scene.answer && running && (
          <p className="mt-2 max-w-[68ch] whitespace-pre-wrap text-snow/90">
            {scene.answer.slice(0, streamed)}
            {streamed < scene.answer.length && <Caret />}
          </p>
        )}
        {lines > 0 && (
          <div className="mt-2">
            {scene.output.slice(0, lines).map((line, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static lines
              <p key={i} className="min-h-[1.7em] whitespace-pre">
                {line.map(([text, className], j) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static segments
                  <span key={j} className={className}>
                    {text}
                  </span>
                ))}
              </p>
            ))}
          </div>
        )}
        {done && (
          <p className="mt-3 whitespace-pre">
            <span className="text-forge" aria-hidden="true">
              ❯{' '}
            </span>
            <Caret />
          </p>
        )}
      </div>
    </div>
  );
}

function Caret() {
  return (
    <span
      aria-hidden="true"
      className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-caret bg-forge/90"
    />
  );
}
