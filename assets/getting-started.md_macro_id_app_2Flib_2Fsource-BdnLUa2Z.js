import{t as e}from"./jsx-runtime-LKYXHABd.js";var t=e(),n={title:`Getting started with Brokspace`,description:`From zero to a productive workspace in about 15 minutes.`},r=`<!-- Generated from https://github.com/brokspace/brok/blob/main/docs/getting-started.md by scripts/sync-docs.mjs. Edit it there. -->

From zero to a productive workspace in about 15 minutes. Each step is short;
skip what you do not need.

1. [Install brok](#1-install-brok)
2. [Get a local LLM (optional)](#2-get-a-local-llm-optional)
3. [Set up your first workspace](#3-set-up-your-first-workspace)
4. [Use it every day](#4-use-it-every-day)
5. [Connect your coding agent](#5-connect-your-coding-agent)
6. [Configure](#6-configure)
7. [Skills](#7-skills)
8. [Shards](#8-shards)
9. [Troubleshooting](#9-troubleshooting)
10. [Update brok](#10-update-brok)
11. [Uninstall](#11-uninstall)

---

## 1. Install brok [#1-install-brok]

**macOS / Linux**

\`\`\`sh
curl -fsSL https://raw.githubusercontent.com/brokspace/brok/main/scripts/install.sh | sh
\`\`\`

**Windows (PowerShell)**

\`\`\`powershell
irm https://raw.githubusercontent.com/brokspace/brok/main/scripts/install.ps1 | iex
\`\`\`

Both install two programs, \`brok\` and \`brok-agent\`, and check their
checksums. Open a new terminal and check:

\`\`\`sh
brok --version
\`\`\`

**Company laptop blocks the script?** Download \`brok-windows-x86_64.exe\`
from the [brok release](https://github.com/brokspace/brok/releases/latest)
and \`brok-agent-windows-x86_64.exe\` from the
[agent release](https://github.com/brokspace/brok-agent/releases/latest),
rename them \`brok.exe\` and \`brok-agent.exe\`, put both in one folder and add
that folder to your \`PATH\`.

**Prefer Cargo?** \`cargo install brok-cli brok-agent\` (needs a C compiler and
\`protoc\`), or \`cargo install brok-cli brok-agent --no-default-features\` for a
lighter build with text search only.

---

## 2. Get a local LLM (optional) [#2-get-a-local-llm-optional]

Search works without any LLM. Answers (\`brok ask\`, \`chat\`, \`review\`,
\`commit\`) need one. A local model is free, private and works offline.

**Ollama** (recommended):

| OS      | Install                                          |
| ------- | ------------------------------------------------ |
| Windows | \`winget install Ollama.Ollama\`                   |
| macOS   | \`brew install ollama\`                            |
| Linux   | \`curl -fsSL https://ollama.com/install.sh \\| sh\` |

Pick the model for your machine:

| Your machine                                                   | Model                | Download                         |
| -------------------------------------------------------------- | -------------------- | -------------------------------- |
| 8 GB                                                           | \`qwen2.5-coder:1.5b\` | \`ollama pull qwen2.5-coder:1.5b\` |
| 16 GB, no GPU (most business laptops)                          | \`qwen2.5-coder:3b\`   | \`ollama pull qwen2.5-coder:3b\`   |
| 16 GB with a GPU (6 GB+) or Apple Silicon; 32 GB without a GPU | \`qwen2.5-coder:7b\`   | \`ollama pull qwen2.5-coder:7b\`   |
| A GPU with 12 GB+, or 32 GB with a GPU or Apple Silicon        | \`qwen2.5-coder:14b\`  | \`ollama pull qwen2.5-coder:14b\`  |

Not sure? Skip the pull: \`brok init\` (next step) measures your machine and
offers to download the right one.

Small models (1.5b, 3b) are fine for questions (\`ask\`, \`chat\`); reviews and
commit messages are much better with 7b or larger. Without a GPU, a 7b
model takes a few minutes per review, which is why the table suggests 3b
there.

Prefer a graphical app? [LM Studio](https://lmstudio.ai) works too: download a
model, open **Developer / Local Server** and press **Start Server**. More in
[Local LLM setup](/docs/local-llm).

---

## 3. Set up your first workspace [#3-set-up-your-first-workspace]

Go to your project (one repository, or a folder holding several) and run
(want a sample project first? clone
[example-nestjs](https://github.com/brokspace/example-nestjs)):

\`\`\`sh
cd ~/code/my-project
brok init
\`\`\`

It walks through six steps and asks before anything big:

| Step               | What happens                                                               |
| ------------------ | -------------------------------------------------------------------------- |
| 1. Workspace       | Creates \`.brokspace/\` with a commented \`brok.yml\`                          |
| 2. Agent           | Installs \`brok-agent\`, the helper that tracks changes and talks to the LLM |
| 3. Semantic search | Downloads the search model once (~140 MB, shared by all your projects)     |
| 4. Local LLM       | Finds Ollama / LM Studio and picks a model that fits your machine          |
| 5. Index           | Indexes your code (functions, classes and sections, not raw text)          |
| 6. Coding agents   | Connects Claude Code, Cursor, VS Code or Codex (skills + search tool)      |

Want no questions? \`brok init --yes\` accepts every recommendation.
Then check the result:

\`\`\`sh
brok doctor
\`\`\`

Every line is either ✓, or a \`!\` with the exact command that fixes it.

> Your next project is faster: the search model and your LLM choice are
> remembered, so \`brok init\` there takes seconds.

---

## 4. Use it every day [#4-use-it-every-day]

\`\`\`sh
brok search "where do we validate tokens"     # find code by meaning or by name
brok ask "how does the refresh flow work?"    # an answer from your LLM, with sources
brok chat                                     # a conversation with follow-up questions
brok review                                   # AI review of your uncommitted changes
git add -p && brok commit                     # commit message written from the staged diff
\`\`\`

The first \`ask\`, \`chat\`, \`review\` or \`commit\` starts brok in the background.
From then on the index follows you: saved files, commits, pulls and branch
switches are picked up within seconds.

| You want to...                          | Run                                                               |
| --------------------------------------- | ----------------------------------------------------------------- |
| Start / stop the background service     | \`brok start\` / \`brok stop\`                                        |
| Restart it after editing \`brok.yml\`     | \`brok restart\`                                                    |
| See what it is doing                    | \`brok logs -f\`                                                    |
| See what is indexed                     | \`brok status\`                                                     |
| Review only staged changes, or a branch | \`brok review --staged\` / \`brok review --base main\`                |
| Just print a commit message             | \`brok commit --print\`                                             |
| Use a different model for one question  | \`brok ask -p anthropic "..."\`                                     |
| Show whole results, or JSON for scripts | \`brok search "..." --full\` / \`--json\`                             |
| Rebuild the index from scratch          | \`brok index --rebuild\`                                            |
| Tab completion                          | \`brok completions bash >> ~/.bashrc\` (also zsh, fish, powershell) |

**About AI reviews.** With a local 7b model, \`brok review\` is a quick first
pass: it catches slips you would rather not push, but it also gets things
wrong (we have seen it invent a missing validation). Read its findings as
questions, not verdicts. For a review you want to rely on, use a 14b model
or a hosted one for that run: \`brok review -p anthropic\` (see
[Configure](#6-configure) for API keys).

Inside \`brok chat\`: \`/skill grill-me\` applies a skill to the conversation,
\`/clear\` forgets it, \`/exit\` leaves.

---

## 5. Connect your coding agent [#5-connect-your-coding-agent]

If you skipped step 6 of \`brok init\`:

\`\`\`sh
brok setup agents
\`\`\`

It detects your agents and, for each one, adds:

- a **search tool** (\`brok_search\`) through MCP, so the agent finds code by
  meaning before grepping;
- the **built-in skills**, such as \`/ask-brok\`, \`/grill-me\`, \`/to-spec\`,
  \`tdd\` and \`code-review\`.

| Agent             | Files written                                                       |
| ----------------- | ------------------------------------------------------------------- |
| Claude Code       | \`.mcp.json\`, \`.claude/skills/\`                                      |
| Cursor            | \`.cursor/mcp.json\`, \`.agents/skills/\`                               |
| VS Code / Copilot | \`.vscode/mcp.json\`, \`.agents/skills/\`                               |
| Codex             | \`.agents/skills/\` (prints the MCP lines for \`~/.codex/config.toml\`) |

Commit these files and your whole team gets the same setup. In your agent,
start with \`/ask-brok\` and describe what you want to do.

---

## 6. Configure [#6-configure]

Everything lives in **\`.brokspace/brok.yml\`**. Every key is optional and the
defaults are sensible. The settings people change most:

\`\`\`yaml
llm:
  default: ollama # which provider \`brok ask\` uses
  providers:
    ollama:
      base_url: http://localhost:11434/v1
      model: qwen2.5-coder:7b
    anthropic: # hosted models: the key comes from an env var
      base_url: https://api.anthropic.com/v1
      model: claude-sonnet-5-5
      api_key_env: ANTHROPIC_API_KEY

embeddings:
  enabled: true # false = text search only, less memory

index:
  exclude: # .gitignore is always respected too
    - "**/node_modules/**"
    - "**/*.min.js"
    - "docs/archive/**"

shards:
  brok-agent:
    settings:
      review: # optional AI review of matching files on change
        enabled: false
        include: ["src/api/**"]
\`\`\`

Easier ways to change things:

| Change                                   | Command                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| Switch the local LLM or model            | \`brok setup llm\` (or \`brok setup llm --provider ollama --model llama3:8b\`) |
| Connect more coding agents               | \`brok setup agents\`                                                        |
| Share the index (Git LFS, S3, R2, MinIO) | \`brok setup sync\`                                                          |

After editing \`brok.yml\`, run \`brok restart\`. Every key is explained in
[Configuration reference](/docs/configuration).

**API keys** are never written to files: export them in your shell
(\`export ANTHROPIC_API_KEY=...\`, or \`$env:ANTHROPIC_API_KEY = "..."\` in
PowerShell) and Brokspace reads them when needed. Secrets found in your code
are removed from the context before anything is sent to an LLM.

---

## 7. Skills [#7-skills]

A skill is a small, reusable workflow for AI: a \`SKILL.md\` file with
instructions. Brokspace ships 20 of them.

\`\`\`sh
brok skill list                                    # what is available
brok skill show tdd                                # read one
brok skill run code-review "the session handling"  # run one on your local LLM
\`\`\`

**User-invoked** skills are started by you (type \`/name\` in your agent, e.g.
\`/grill-me\` before a big change). **Model-invoked** skills are picked by the
agent when the task fits (e.g. \`tdd\`, \`code-review\`).

Write your own:

\`\`\`sh
brok skill new release-notes          # creates .brokspace/skills/release-notes/SKILL.md
brok skill export                     # refresh your coding agents with it
\`\`\`

A workspace skill with the same name as a built-in one replaces it, so you
can tailor any built-in to your team. More in [Skills](/docs/skills).

---

## 8. Shards [#8-shards]

Shards are small programs that react to what happens in your workspace (a
file changed, a question was asked) and can publish their own events. The
agent you installed is one.

\`\`\`sh
brok shard list                                             # what is installed
brok shard install https://github.com/someone/some-shard    # shows its permissions before installing
brok shard new my-shard                                     # start your own (Rust project)
brok shard new my-skills --skills-only                      # or just share skills, no code
brok restart                                                # start new shards
brok bus tail                                               # watch events live while developing
\`\`\`

Every shard lists the permissions it wants in \`shard.json\`, and you approve
them when installing. Guide: [Shards](/docs/shards).

---

## 9. Troubleshooting [#9-troubleshooting]

Start with \`brok doctor\`: it checks everything and prints the fix.

| Symptom                                     | Fix                                                                                                                                                                                                                                 |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`no answer from the agent\`                  | Start your LLM (open Ollama / LM Studio), then \`brok doctor\`                                                                                                                                                                        |
| \`ollama ... is not installed\`               | \`ollama pull <model>\` as shown by \`brok doctor\`                                                                                                                                                                                     |
| Answers take minutes                        | The model runs on your CPU. Normal for 7b on a laptop without a GPU (a review can take 3 to 5 minutes); for faster answers use 3b: \`ollama pull qwen2.5-coder:3b\`, then \`brok setup llm --provider ollama --model qwen2.5-coder:3b\` |
| Search misses recent code                   | \`brok status\`; if the daemon is stopped, \`brok start\` catches up                                                                                                                                                                    |
| \`another brok process is writing the index\` | \`brok\` is running in the background and already indexes for you; skip \`brok index\`, or \`brok stop\` first                                                                                                                            |
| Results come back as text only              | The search model is missing: \`brok model download\`                                                                                                                                                                                  |
| Agent does not show the brok tools          | \`brok\` must be on \`PATH\`; run \`brok setup agents\` and restart the agent                                                                                                                                                             |
| Odd behavior after an upgrade               | \`brok restart\`; if it persists, \`brok index --rebuild\`                                                                                                                                                                              |
| Windows: errors about long paths            | Enable long paths (\`brok doctor\` shows the command) or use a shorter folder                                                                                                                                                         |

Still stuck? Run \`brok logs -n 100\` and ask in
[Discussions](https://github.com/brokspace/brok/discussions), including the
output of \`brok doctor\`.

---

## 10. Update brok [#10-update-brok]

\`\`\`sh
brok upgrade --check    # is there a new version, and what changed?
brok upgrade            # shows what changed, asks, then upgrades
\`\`\`

\`brok upgrade\` downloads the new \`brok\` and \`brok-agent\`, checks them
against the release checksums, swaps them in and restarts brok in every
workspace where it was running (each workspace's agent is refreshed on
that restart). \`brok doctor\` tells you when a new version is out.

Then run \`brok skill export\` in your workspaces so your coding agents get
the updated built-in skills.

Installed with Cargo? Upgrade with \`cargo install brok-cli brok-agent\`.
Coming from brok 0.2.1 or older (no \`upgrade\` command yet)? Run the install
command from [step 1](#1-install-brok) again, once.

---

## 11. Uninstall [#11-uninstall]

\`\`\`sh
brok stop                    # in each workspace where it runs
\`\`\`

Then delete:

- the \`.brokspace/\` folder of each workspace (plus \`.agents/skills\`,
  \`.claude/skills\` and the MCP files if you no longer want them);
- the shared model cache: \`~/.cache/brokspace\` (Linux),
  \`~/Library/Caches/brokspace\` (macOS), \`%LOCALAPPDATA%\\brokspace\` (Windows);
- your defaults: \`~/.config/brokspace\` (Linux),
  \`~/Library/Application Support/brokspace\` (macOS), \`%APPDATA%\\brokspace\`
  (Windows);
- the \`brok\` and \`brok-agent\` programs (\`~/.local/bin\`, or
  \`%LOCALAPPDATA%\\Programs\\brok\` on Windows; \`cargo uninstall brok-cli brok-agent\`
  if you used Cargo).
`,i={contents:[{heading:void 0,content:`From zero to a productive workspace in about 15 minutes. Each step is short;
skip what you do not need.`},{heading:void 0,content:`Install brok`},{heading:void 0,content:`Get a local LLM (optional)`},{heading:void 0,content:`Set up your first workspace`},{heading:void 0,content:`Use it every day`},{heading:void 0,content:`Connect your coding agent`},{heading:void 0,content:`Configure`},{heading:void 0,content:`Skills`},{heading:void 0,content:`Shards`},{heading:void 0,content:`Troubleshooting`},{heading:void 0,content:`Update brok`},{heading:void 0,content:`Uninstall`},{heading:`1-install-brok`,content:`**macOS / Linux**`},{heading:`1-install-brok`,content:`**Windows (PowerShell)**`},{heading:`1-install-brok`,content:"Both install two programs, `brok` and `brok-agent`, and check their\nchecksums. Open a new terminal and check:"},{heading:`1-install-brok`,content:"**Company laptop blocks the script?** Download `brok-windows-x86_64.exe`\nfrom the brok release\nand `brok-agent-windows-x86_64.exe` from the\nagent release,\nrename them `brok.exe` and `brok-agent.exe`, put both in one folder and add\nthat folder to your `PATH`."},{heading:`1-install-brok`,content:"**Prefer Cargo?** `cargo install brok-cli brok-agent` (needs a C compiler and\n`protoc`), or `cargo install brok-cli brok-agent --no-default-features` for a\nlighter build with text search only."},{heading:`2-get-a-local-llm-optional`,content:"Search works without any LLM. Answers (`brok ask`, `chat`, `review`,\n`commit`) need one. A local model is free, private and works offline."},{heading:`2-get-a-local-llm-optional`,content:`**Ollama** (recommended):`},{heading:`2-get-a-local-llm-optional`,content:`| OS      | Install                        |
| ------- | ------------------------------ |
| Windows | \`winget install Ollama.Ollama\` |`,table:`table-0`},{heading:`2-get-a-local-llm-optional`,content:`| OS    | Install               |
| ----- | --------------------- |
| macOS | \`brew install ollama\` |`,table:`table-0`},{heading:`2-get-a-local-llm-optional`,content:`| OS    | Install                                          |
| ----- | ------------------------------------------------ |
| Linux | \`curl -fsSL https://ollama.com/install.sh \\| sh\` |`,table:`table-0`},{heading:`2-get-a-local-llm-optional`,content:`Pick the model for your machine:`},{heading:`2-get-a-local-llm-optional`,content:"| Your machine | Model                | Download                         |\n| ------------ | -------------------- | -------------------------------- |\n| 8 GB         | `qwen2.5-coder:1.5b` | `ollama pull qwen2.5-coder:1.5b` |",table:`table-1`},{heading:`2-get-a-local-llm-optional`,content:"| Your machine                          | Model              | Download                       |\n| ------------------------------------- | ------------------ | ------------------------------ |\n| 16 GB, no GPU (most business laptops) | `qwen2.5-coder:3b` | `ollama pull qwen2.5-coder:3b` |",table:`table-1`},{heading:`2-get-a-local-llm-optional`,content:"| Your machine                                                   | Model              | Download                       |\n| -------------------------------------------------------------- | ------------------ | ------------------------------ |\n| 16 GB with a GPU (6 GB+) or Apple Silicon; 32 GB without a GPU | `qwen2.5-coder:7b` | `ollama pull qwen2.5-coder:7b` |",table:`table-1`},{heading:`2-get-a-local-llm-optional`,content:"| Your machine                                            | Model               | Download                        |\n| ------------------------------------------------------- | ------------------- | ------------------------------- |\n| A GPU with 12 GB+, or 32 GB with a GPU or Apple Silicon | `qwen2.5-coder:14b` | `ollama pull qwen2.5-coder:14b` |",table:`table-1`},{heading:`2-get-a-local-llm-optional`,content:"Not sure? Skip the pull: `brok init` (next step) measures your machine and\noffers to download the right one."},{heading:`2-get-a-local-llm-optional`,content:"Small models (1.5b, 3b) are fine for questions (`ask`, `chat`); reviews and\ncommit messages are much better with 7b or larger. Without a GPU, a 7b\nmodel takes a few minutes per review, which is why the table suggests 3b\nthere."},{heading:`2-get-a-local-llm-optional`,content:`Prefer a graphical app? LM Studio works too: download a
model, open **Developer / Local Server** and press **Start Server**. More in
Local LLM setup.`},{heading:`3-set-up-your-first-workspace`,content:`Go to your project (one repository, or a folder holding several) and run
(want a sample project first? clone
example-nestjs):`},{heading:`3-set-up-your-first-workspace`,content:`It walks through six steps and asks before anything big:`},{heading:`3-set-up-your-first-workspace`,content:"| Step         | What happens                                      |\n| ------------ | ------------------------------------------------- |\n| 1. Workspace | Creates `.brokspace/` with a commented `brok.yml` |",table:`table-2`},{heading:`3-set-up-your-first-workspace`,content:`| Step     | What happens                                                               |
| -------- | -------------------------------------------------------------------------- |
| 2. Agent | Installs \`brok-agent\`, the helper that tracks changes and talks to the LLM |`,table:`table-2`},{heading:`3-set-up-your-first-workspace`,content:`| Step               | What happens                                                           |
| ------------------ | ---------------------------------------------------------------------- |
| 3. Semantic search | Downloads the search model once (~140 MB, shared by all your projects) |`,table:`table-2`},{heading:`3-set-up-your-first-workspace`,content:`| Step         | What happens                                                      |
| ------------ | ----------------------------------------------------------------- |
| 4. Local LLM | Finds Ollama / LM Studio and picks a model that fits your machine |`,table:`table-2`},{heading:`3-set-up-your-first-workspace`,content:`| Step     | What happens                                                      |
| -------- | ----------------------------------------------------------------- |
| 5. Index | Indexes your code (functions, classes and sections, not raw text) |`,table:`table-2`},{heading:`3-set-up-your-first-workspace`,content:`| Step             | What happens                                                          |
| ---------------- | --------------------------------------------------------------------- |
| 6. Coding agents | Connects Claude Code, Cursor, VS Code or Codex (skills + search tool) |`,table:`table-2`},{heading:`3-set-up-your-first-workspace`,content:"Want no questions? `brok init --yes` accepts every recommendation.\nThen check the result:"},{heading:`3-set-up-your-first-workspace`,content:"Every line is either ✓, or a `!` with the exact command that fixes it."},{heading:`3-set-up-your-first-workspace`,content:"> Your next project is faster: the search model and your LLM choice are\n> remembered, so `brok init` there takes seconds."},{heading:`4-use-it-every-day`,content:"The first `ask`, `chat`, `review` or `commit` starts brok in the background.\nFrom then on the index follows you: saved files, commits, pulls and branch\nswitches are picked up within seconds."},{heading:`4-use-it-every-day`,content:"| You want to...                      | Run                        |\n| ----------------------------------- | -------------------------- |\n| Start / stop the background service | `brok start` / `brok stop` |",table:`table-3`},{heading:`4-use-it-every-day`,content:"| You want to...                      | Run            |\n| ----------------------------------- | -------------- |\n| Restart it after editing `brok.yml` | `brok restart` |",table:`table-3`},{heading:`4-use-it-every-day`,content:`| You want to...       | Run            |
| -------------------- | -------------- |
| See what it is doing | \`brok logs -f\` |`,table:`table-3`},{heading:`4-use-it-every-day`,content:`| You want to...      | Run           |
| ------------------- | ------------- |
| See what is indexed | \`brok status\` |`,table:`table-3`},{heading:`4-use-it-every-day`,content:"| You want to...                          | Run                                                |\n| --------------------------------------- | -------------------------------------------------- |\n| Review only staged changes, or a branch | `brok review --staged` / `brok review --base main` |",table:`table-3`},{heading:`4-use-it-every-day`,content:`| You want to...              | Run                   |
| --------------------------- | --------------------- |
| Just print a commit message | \`brok commit --print\` |`,table:`table-3`},{heading:`4-use-it-every-day`,content:`| You want to...                         | Run                           |
| -------------------------------------- | ----------------------------- |
| Use a different model for one question | \`brok ask -p anthropic "..."\` |`,table:`table-3`},{heading:`4-use-it-every-day`,content:'| You want to...                          | Run                                   |\n| --------------------------------------- | ------------------------------------- |\n| Show whole results, or JSON for scripts | `brok search "..." --full` / `--json` |',table:`table-3`},{heading:`4-use-it-every-day`,content:`| You want to...                 | Run                    |
| ------------------------------ | ---------------------- |
| Rebuild the index from scratch | \`brok index --rebuild\` |`,table:`table-3`},{heading:`4-use-it-every-day`,content:`| You want to... | Run                                                               |
| -------------- | ----------------------------------------------------------------- |
| Tab completion | \`brok completions bash >> ~/.bashrc\` (also zsh, fish, powershell) |`,table:`table-3`},{heading:`4-use-it-every-day`,content:`**About AI reviews.** With a local 7b model, \`brok review\` is a quick first
pass: it catches slips you would rather not push, but it also gets things
wrong (we have seen it invent a missing validation). Read its findings as
questions, not verdicts. For a review you want to rely on, use a 14b model
or a hosted one for that run: \`brok review -p anthropic\` (see
Configure for API keys).`},{heading:`4-use-it-every-day`,content:"Inside `brok chat`: `/skill grill-me` applies a skill to the conversation,\n`/clear` forgets it, `/exit` leaves."},{heading:`5-connect-your-coding-agent`,content:"If you skipped step 6 of `brok init`:"},{heading:`5-connect-your-coding-agent`,content:`It detects your agents and, for each one, adds:`},{heading:`5-connect-your-coding-agent`,content:"a **search tool** (`brok_search`) through MCP, so the agent finds code by\nmeaning before grepping;"},{heading:`5-connect-your-coding-agent`,content:"the **built-in skills**, such as `/ask-brok`, `/grill-me`, `/to-spec`,\n`tdd` and `code-review`."},{heading:`5-connect-your-coding-agent`,content:"| Agent       | Files written                  |\n| ----------- | ------------------------------ |\n| Claude Code | `.mcp.json`, `.claude/skills/` |",table:`table-4`},{heading:`5-connect-your-coding-agent`,content:"| Agent  | Files written                         |\n| ------ | ------------------------------------- |\n| Cursor | `.cursor/mcp.json`, `.agents/skills/` |",table:`table-4`},{heading:`5-connect-your-coding-agent`,content:"| Agent             | Files written                         |\n| ----------------- | ------------------------------------- |\n| VS Code / Copilot | `.vscode/mcp.json`, `.agents/skills/` |",table:`table-4`},{heading:`5-connect-your-coding-agent`,content:"| Agent | Files written                                                       |\n| ----- | ------------------------------------------------------------------- |\n| Codex | `.agents/skills/` (prints the MCP lines for `~/.codex/config.toml`) |",table:`table-4`},{heading:`5-connect-your-coding-agent`,content:"Commit these files and your whole team gets the same setup. In your agent,\nstart with `/ask-brok` and describe what you want to do."},{heading:`6-configure`,content:"Everything lives in **`.brokspace/brok.yml`**. Every key is optional and the\ndefaults are sensible. The settings people change most:"},{heading:`6-configure`,content:`Easier ways to change things:`},{heading:`6-configure`,content:"| Change                        | Command                                                                    |\n| ----------------------------- | -------------------------------------------------------------------------- |\n| Switch the local LLM or model | `brok setup llm` (or `brok setup llm --provider ollama --model llama3:8b`) |",table:`table-5`},{heading:`6-configure`,content:`| Change                     | Command             |
| -------------------------- | ------------------- |
| Connect more coding agents | \`brok setup agents\` |`,table:`table-5`},{heading:`6-configure`,content:`| Change                                   | Command           |
| ---------------------------------------- | ----------------- |
| Share the index (Git LFS, S3, R2, MinIO) | \`brok setup sync\` |`,table:`table-5`},{heading:`6-configure`,content:"After editing `brok.yml`, run `brok restart`. Every key is explained in\nConfiguration reference."},{heading:`6-configure`,content:'**API keys** are never written to files: export them in your shell\n(`export ANTHROPIC_API_KEY=...`, or `$env:ANTHROPIC_API_KEY = "..."` in\nPowerShell) and Brokspace reads them when needed. Secrets found in your code\nare removed from the context before anything is sent to an LLM.'},{heading:`7-skills`,content:"A skill is a small, reusable workflow for AI: a `SKILL.md` file with\ninstructions. Brokspace ships 20 of them."},{heading:`7-skills`,content:"**User-invoked** skills are started by you (type `/name` in your agent, e.g.\n`/grill-me` before a big change). **Model-invoked** skills are picked by the\nagent when the task fits (e.g. `tdd`, `code-review`)."},{heading:`7-skills`,content:`Write your own:`},{heading:`7-skills`,content:`A workspace skill with the same name as a built-in one replaces it, so you
can tailor any built-in to your team. More in Skills.`},{heading:`8-shards`,content:`Shards are small programs that react to what happens in your workspace (a
file changed, a question was asked) and can publish their own events. The
agent you installed is one.`},{heading:`8-shards`,content:"Every shard lists the permissions it wants in `shard.json`, and you approve\nthem when installing. Guide: Shards."},{heading:`9-troubleshooting`,content:"Start with `brok doctor`: it checks everything and prints the fix."},{heading:`9-troubleshooting`,content:"| Symptom                    | Fix                                                          |\n| -------------------------- | ------------------------------------------------------------ |\n| `no answer from the agent` | Start your LLM (open Ollama / LM Studio), then `brok doctor` |",table:`table-6`},{heading:`9-troubleshooting`,content:"| Symptom                       | Fix                                             |\n| ----------------------------- | ----------------------------------------------- |\n| `ollama ... is not installed` | `ollama pull <model>` as shown by `brok doctor` |",table:`table-6`},{heading:`9-troubleshooting`,content:"| Symptom              | Fix                                                                                                                                                                                                                                 |\n| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| Answers take minutes | The model runs on your CPU. Normal for 7b on a laptop without a GPU (a review can take 3 to 5 minutes); for faster answers use 3b: `ollama pull qwen2.5-coder:3b`, then `brok setup llm --provider ollama --model qwen2.5-coder:3b` |",table:`table-6`},{heading:`9-troubleshooting`,content:"| Symptom                   | Fix                                                              |\n| ------------------------- | ---------------------------------------------------------------- |\n| Search misses recent code | `brok status`; if the daemon is stopped, `brok start` catches up |",table:`table-6`},{heading:`9-troubleshooting`,content:"| Symptom                                     | Fix                                                                                                      |\n| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |\n| `another brok process is writing the index` | `brok` is running in the background and already indexes for you; skip `brok index`, or `brok stop` first |",table:`table-6`},{heading:`9-troubleshooting`,content:`| Symptom                        | Fix                                                |
| ------------------------------ | -------------------------------------------------- |
| Results come back as text only | The search model is missing: \`brok model download\` |`,table:`table-6`},{heading:`9-troubleshooting`,content:"| Symptom                            | Fix                                                                     |\n| ---------------------------------- | ----------------------------------------------------------------------- |\n| Agent does not show the brok tools | `brok` must be on `PATH`; run `brok setup agents` and restart the agent |",table:`table-6`},{heading:`9-troubleshooting`,content:"| Symptom                       | Fix                                                    |\n| ----------------------------- | ------------------------------------------------------ |\n| Odd behavior after an upgrade | `brok restart`; if it persists, `brok index --rebuild` |",table:`table-6`},{heading:`9-troubleshooting`,content:`| Symptom                          | Fix                                                                         |
| -------------------------------- | --------------------------------------------------------------------------- |
| Windows: errors about long paths | Enable long paths (\`brok doctor\` shows the command) or use a shorter folder |`,table:`table-6`},{heading:`9-troubleshooting`,content:"Still stuck? Run `brok logs -n 100` and ask in\nDiscussions, including the\noutput of `brok doctor`."},{heading:`10-update-brok`,content:"`brok upgrade` downloads the new `brok` and `brok-agent`, checks them\nagainst the release checksums, swaps them in and restarts brok in every\nworkspace where it was running (each workspace's agent is refreshed on\nthat restart). `brok doctor` tells you when a new version is out."},{heading:`10-update-brok`,content:"Then run `brok skill export` in your workspaces so your coding agents get\nthe updated built-in skills."},{heading:`10-update-brok`,content:"Installed with Cargo? Upgrade with `cargo install brok-cli brok-agent`.\nComing from brok 0.2.1 or older (no `upgrade` command yet)? Run the install\ncommand from step 1 again, once."},{heading:`11-uninstall`,content:`Then delete:`},{heading:`11-uninstall`,content:"the `.brokspace/` folder of each workspace (plus `.agents/skills`,\n`.claude/skills` and the MCP files if you no longer want them);"},{heading:`11-uninstall`,content:"the shared model cache: `~/.cache/brokspace` (Linux),\n`~/Library/Caches/brokspace` (macOS), `%LOCALAPPDATA%\\brokspace` (Windows);"},{heading:`11-uninstall`,content:"your defaults: `~/.config/brokspace` (Linux),\n`~/Library/Application Support/brokspace` (macOS), `%APPDATA%\\brokspace`\n(Windows);"},{heading:`11-uninstall`,content:"the `brok` and `brok-agent` programs (`~/.local/bin`, or\n`%LOCALAPPDATA%\\Programs\\brok` on Windows; `cargo uninstall brok-cli brok-agent`\nif you used Cargo)."}],headings:[{id:`1-install-brok`,content:`1. Install brok`},{id:`2-get-a-local-llm-optional`,content:`2. Get a local LLM (optional)`},{id:`3-set-up-your-first-workspace`,content:`3. Set up your first workspace`},{id:`4-use-it-every-day`,content:`4. Use it every day`},{id:`5-connect-your-coding-agent`,content:`5. Connect your coding agent`},{id:`6-configure`,content:`6. Configure`},{id:`7-skills`,content:`7. Skills`},{id:`8-shards`,content:`8. Shards`},{id:`9-troubleshooting`,content:`9. Troubleshooting`},{id:`10-update-brok`,content:`10. Update brok`},{id:`11-uninstall`,content:`11. Uninstall`}]},a=[{depth:2,url:`#1-install-brok`,title:(0,t.jsx)(t.Fragment,{children:`1. Install brok`})},{depth:2,url:`#2-get-a-local-llm-optional`,title:(0,t.jsx)(t.Fragment,{children:`2. Get a local LLM (optional)`})},{depth:2,url:`#3-set-up-your-first-workspace`,title:(0,t.jsx)(t.Fragment,{children:`3. Set up your first workspace`})},{depth:2,url:`#4-use-it-every-day`,title:(0,t.jsx)(t.Fragment,{children:`4. Use it every day`})},{depth:2,url:`#5-connect-your-coding-agent`,title:(0,t.jsx)(t.Fragment,{children:`5. Connect your coding agent`})},{depth:2,url:`#6-configure`,title:(0,t.jsx)(t.Fragment,{children:`6. Configure`})},{depth:2,url:`#7-skills`,title:(0,t.jsx)(t.Fragment,{children:`7. Skills`})},{depth:2,url:`#8-shards`,title:(0,t.jsx)(t.Fragment,{children:`8. Shards`})},{depth:2,url:`#9-troubleshooting`,title:(0,t.jsx)(t.Fragment,{children:`9. Troubleshooting`})},{depth:2,url:`#10-update-brok`,title:(0,t.jsx)(t.Fragment,{children:`10. Update brok`})},{depth:2,url:`#11-uninstall`,title:(0,t.jsx)(t.Fragment,{children:`11. Uninstall`})}];function o(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:`From zero to a productive workspace in about 15 minutes. Each step is short;
skip what you do not need.`}),`
`,(0,t.jsxs)(n.ol,{children:[`
`,(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:`#1-install-brok`,children:`Install brok`})}),`
`,(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:`#2-get-a-local-llm-optional`,children:`Get a local LLM (optional)`})}),`
`,(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:`#3-set-up-your-first-workspace`,children:`Set up your first workspace`})}),`
`,(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:`#4-use-it-every-day`,children:`Use it every day`})}),`
`,(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:`#5-connect-your-coding-agent`,children:`Connect your coding agent`})}),`
`,(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:`#6-configure`,children:`Configure`})}),`
`,(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:`#7-skills`,children:`Skills`})}),`
`,(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:`#8-shards`,children:`Shards`})}),`
`,(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:`#9-troubleshooting`,children:`Troubleshooting`})}),`
`,(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:`#10-update-brok`,children:`Update brok`})}),`
`,(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:`#11-uninstall`,children:`Uninstall`})}),`
`]}),`
`,(0,t.jsx)(n.hr,{}),`
`,(0,t.jsx)(n.h2,{id:`1-install-brok`,children:`1. Install brok`}),`
`,(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:`macOS / Linux`})}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsx)(n.code,{children:(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`curl`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` -fsSL`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` https://raw.githubusercontent.com/brokspace/brok/main/scripts/install.sh`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:` |`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:` sh`})]})})})}),`
`,(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:`Windows (PowerShell)`})}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z" fill="currentColor" /></svg>`,children:(0,t.jsx)(n.code,{children:(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`irm https:`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:`//`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:`raw.githubusercontent.com`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:`/`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`brokspace`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:`/`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:`/`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`main`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:`/`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`scripts`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:`/`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`install.ps1 `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:`|`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:` iex`})]})})})}),`
`,(0,t.jsxs)(n.p,{children:[`Both install two programs, `,(0,t.jsx)(n.code,{children:`brok`}),` and `,(0,t.jsx)(n.code,{children:`brok-agent`}),`, and check their
checksums. Open a new terminal and check:`]}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsx)(n.code,{children:(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` --version`})]})})})}),`
`,(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:`Company laptop blocks the script?`}),` Download `,(0,t.jsx)(n.code,{children:`brok-windows-x86_64.exe`}),`
from the `,(0,t.jsx)(n.a,{href:`https://github.com/brokspace/brok/releases/latest`,children:`brok release`}),`
and `,(0,t.jsx)(n.code,{children:`brok-agent-windows-x86_64.exe`}),` from the
`,(0,t.jsx)(n.a,{href:`https://github.com/brokspace/brok-agent/releases/latest`,children:`agent release`}),`,
rename them `,(0,t.jsx)(n.code,{children:`brok.exe`}),` and `,(0,t.jsx)(n.code,{children:`brok-agent.exe`}),`, put both in one folder and add
that folder to your `,(0,t.jsx)(n.code,{children:`PATH`}),`.`]}),`
`,(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:`Prefer Cargo?`}),` `,(0,t.jsx)(n.code,{children:`cargo install brok-cli brok-agent`}),` (needs a C compiler and
`,(0,t.jsx)(n.code,{children:`protoc`}),`), or `,(0,t.jsx)(n.code,{children:`cargo install brok-cli brok-agent --no-default-features`}),` for a
lighter build with text search only.`]}),`
`,(0,t.jsx)(n.hr,{}),`
`,(0,t.jsx)(n.h2,{id:`2-get-a-local-llm-optional`,children:`2. Get a local LLM (optional)`}),`
`,(0,t.jsxs)(n.p,{children:[`Search works without any LLM. Answers (`,(0,t.jsx)(n.code,{children:`brok ask`}),`, `,(0,t.jsx)(n.code,{children:`chat`}),`, `,(0,t.jsx)(n.code,{children:`review`}),`,
`,(0,t.jsx)(n.code,{children:`commit`}),`) need one. A local model is free, private and works offline.`]}),`
`,(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:`Ollama`}),` (recommended):`]}),`
`,(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:`OS`}),(0,t.jsx)(n.th,{children:`Install`})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Windows`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`winget install Ollama.Ollama`})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`macOS`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`brew install ollama`})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Linux`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`curl -fsSL https://ollama.com/install.sh | sh`})})]})]})]}),`
`,(0,t.jsx)(n.p,{children:`Pick the model for your machine:`}),`
`,(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:`Your machine`}),(0,t.jsx)(n.th,{children:`Model`}),(0,t.jsx)(n.th,{children:`Download`})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`8 GB`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`qwen2.5-coder:1.5b`})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`ollama pull qwen2.5-coder:1.5b`})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`16 GB, no GPU (most business laptops)`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`qwen2.5-coder:3b`})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`ollama pull qwen2.5-coder:3b`})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`16 GB with a GPU (6 GB+) or Apple Silicon; 32 GB without a GPU`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`qwen2.5-coder:7b`})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`ollama pull qwen2.5-coder:7b`})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`A GPU with 12 GB+, or 32 GB with a GPU or Apple Silicon`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`qwen2.5-coder:14b`})}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`ollama pull qwen2.5-coder:14b`})})]})]})]}),`
`,(0,t.jsxs)(n.p,{children:[`Not sure? Skip the pull: `,(0,t.jsx)(n.code,{children:`brok init`}),` (next step) measures your machine and
offers to download the right one.`]}),`
`,(0,t.jsxs)(n.p,{children:[`Small models (1.5b, 3b) are fine for questions (`,(0,t.jsx)(n.code,{children:`ask`}),`, `,(0,t.jsx)(n.code,{children:`chat`}),`); reviews and
commit messages are much better with 7b or larger. Without a GPU, a 7b
model takes a few minutes per review, which is why the table suggests 3b
there.`]}),`
`,(0,t.jsxs)(n.p,{children:[`Prefer a graphical app? `,(0,t.jsx)(n.a,{href:`https://lmstudio.ai`,children:`LM Studio`}),` works too: download a
model, open `,(0,t.jsx)(n.strong,{children:`Developer / Local Server`}),` and press `,(0,t.jsx)(n.strong,{children:`Start Server`}),`. More in
`,(0,t.jsx)(n.a,{href:`/docs/local-llm`,children:`Local LLM setup`}),`.`]}),`
`,(0,t.jsx)(n.hr,{}),`
`,(0,t.jsx)(n.h2,{id:`3-set-up-your-first-workspace`,children:`3. Set up your first workspace`}),`
`,(0,t.jsxs)(n.p,{children:[`Go to your project (one repository, or a folder holding several) and run
(want a sample project first? clone
`,(0,t.jsx)(n.a,{href:`https://github.com/brokspace/example-nestjs`,children:`example-nestjs`}),`):`]}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:`cd`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` ~/code/my-project`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` init`})]})]})})}),`
`,(0,t.jsx)(n.p,{children:`It walks through six steps and asks before anything big:`}),`
`,(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:`Step`}),(0,t.jsx)(n.th,{children:`What happens`})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`1. Workspace`}),(0,t.jsxs)(n.td,{children:[`Creates `,(0,t.jsx)(n.code,{children:`.brokspace/`}),` with a commented `,(0,t.jsx)(n.code,{children:`brok.yml`})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`2. Agent`}),(0,t.jsxs)(n.td,{children:[`Installs `,(0,t.jsx)(n.code,{children:`brok-agent`}),`, the helper that tracks changes and talks to the LLM`]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`3. Semantic search`}),(0,t.jsx)(n.td,{children:`Downloads the search model once (~140 MB, shared by all your projects)`})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`4. Local LLM`}),(0,t.jsx)(n.td,{children:`Finds Ollama / LM Studio and picks a model that fits your machine`})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`5. Index`}),(0,t.jsx)(n.td,{children:`Indexes your code (functions, classes and sections, not raw text)`})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`6. Coding agents`}),(0,t.jsx)(n.td,{children:`Connects Claude Code, Cursor, VS Code or Codex (skills + search tool)`})]})]})]}),`
`,(0,t.jsxs)(n.p,{children:[`Want no questions? `,(0,t.jsx)(n.code,{children:`brok init --yes`}),` accepts every recommendation.
Then check the result:`]}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsx)(n.code,{children:(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` doctor`})]})})})}),`
`,(0,t.jsxs)(n.p,{children:[`Every line is either ✓, or a `,(0,t.jsx)(n.code,{children:`!`}),` with the exact command that fixes it.`]}),`
`,(0,t.jsxs)(n.blockquote,{children:[`
`,(0,t.jsxs)(n.p,{children:[`Your next project is faster: the search model and your LLM choice are
remembered, so `,(0,t.jsx)(n.code,{children:`brok init`}),` there takes seconds.`]}),`
`]}),`
`,(0,t.jsx)(n.hr,{}),`
`,(0,t.jsx)(n.h2,{id:`4-use-it-every-day`,children:`4. Use it every day`}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` search`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` "where do we validate tokens"`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`     # find code by meaning or by name`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` ask`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` "how does the refresh flow work?"`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`    # an answer from your LLM, with sources`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` chat`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                                     # a conversation with follow-up questions`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` review`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                                   # AI review of your uncommitted changes`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`git`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` add`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` -p`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:` && `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` commit`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                     # commit message written from the staged diff`})]})]})})}),`
`,(0,t.jsxs)(n.p,{children:[`The first `,(0,t.jsx)(n.code,{children:`ask`}),`, `,(0,t.jsx)(n.code,{children:`chat`}),`, `,(0,t.jsx)(n.code,{children:`review`}),` or `,(0,t.jsx)(n.code,{children:`commit`}),` starts brok in the background.
From then on the index follows you: saved files, commits, pulls and branch
switches are picked up within seconds.`]}),`
`,(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:`You want to...`}),(0,t.jsx)(n.th,{children:`Run`})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Start / stop the background service`}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`brok start`}),` / `,(0,t.jsx)(n.code,{children:`brok stop`})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsxs)(n.td,{children:[`Restart it after editing `,(0,t.jsx)(n.code,{children:`brok.yml`})]}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`brok restart`})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`See what it is doing`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`brok logs -f`})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`See what is indexed`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`brok status`})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Review only staged changes, or a branch`}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`brok review --staged`}),` / `,(0,t.jsx)(n.code,{children:`brok review --base main`})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Just print a commit message`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`brok commit --print`})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Use a different model for one question`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`brok ask -p anthropic "..."`})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Show whole results, or JSON for scripts`}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`brok search "..." --full`}),` / `,(0,t.jsx)(n.code,{children:`--json`})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Rebuild the index from scratch`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`brok index --rebuild`})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Tab completion`}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`brok completions bash >> ~/.bashrc`}),` (also zsh, fish, powershell)`]})]})]})]}),`
`,(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:`About AI reviews.`}),` With a local 7b model, `,(0,t.jsx)(n.code,{children:`brok review`}),` is a quick first
pass: it catches slips you would rather not push, but it also gets things
wrong (we have seen it invent a missing validation). Read its findings as
questions, not verdicts. For a review you want to rely on, use a 14b model
or a hosted one for that run: `,(0,t.jsx)(n.code,{children:`brok review -p anthropic`}),` (see
`,(0,t.jsx)(n.a,{href:`#6-configure`,children:`Configure`}),` for API keys).`]}),`
`,(0,t.jsxs)(n.p,{children:[`Inside `,(0,t.jsx)(n.code,{children:`brok chat`}),`: `,(0,t.jsx)(n.code,{children:`/skill grill-me`}),` applies a skill to the conversation,
`,(0,t.jsx)(n.code,{children:`/clear`}),` forgets it, `,(0,t.jsx)(n.code,{children:`/exit`}),` leaves.`]}),`
`,(0,t.jsx)(n.hr,{}),`
`,(0,t.jsx)(n.h2,{id:`5-connect-your-coding-agent`,children:`5. Connect your coding agent`}),`
`,(0,t.jsxs)(n.p,{children:[`If you skipped step 6 of `,(0,t.jsx)(n.code,{children:`brok init`}),`:`]}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsx)(n.code,{children:(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` setup`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` agents`})]})})})}),`
`,(0,t.jsx)(n.p,{children:`It detects your agents and, for each one, adds:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsxs)(n.li,{children:[`a `,(0,t.jsx)(n.strong,{children:`search tool`}),` (`,(0,t.jsx)(n.code,{children:`brok_search`}),`) through MCP, so the agent finds code by
meaning before grepping;`]}),`
`,(0,t.jsxs)(n.li,{children:[`the `,(0,t.jsx)(n.strong,{children:`built-in skills`}),`, such as `,(0,t.jsx)(n.code,{children:`/ask-brok`}),`, `,(0,t.jsx)(n.code,{children:`/grill-me`}),`, `,(0,t.jsx)(n.code,{children:`/to-spec`}),`,
`,(0,t.jsx)(n.code,{children:`tdd`}),` and `,(0,t.jsx)(n.code,{children:`code-review`}),`.`]}),`
`]}),`
`,(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:`Agent`}),(0,t.jsx)(n.th,{children:`Files written`})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Claude Code`}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`.mcp.json`}),`, `,(0,t.jsx)(n.code,{children:`.claude/skills/`})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Cursor`}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`.cursor/mcp.json`}),`, `,(0,t.jsx)(n.code,{children:`.agents/skills/`})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`VS Code / Copilot`}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`.vscode/mcp.json`}),`, `,(0,t.jsx)(n.code,{children:`.agents/skills/`})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Codex`}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`.agents/skills/`}),` (prints the MCP lines for `,(0,t.jsx)(n.code,{children:`~/.codex/config.toml`}),`)`]})]})]})]}),`
`,(0,t.jsxs)(n.p,{children:[`Commit these files and your whole team gets the same setup. In your agent,
start with `,(0,t.jsx)(n.code,{children:`/ask-brok`}),` and describe what you want to do.`]}),`
`,(0,t.jsx)(n.hr,{}),`
`,(0,t.jsx)(n.h2,{id:`6-configure`,children:`6. Configure`}),`
`,(0,t.jsxs)(n.p,{children:[`Everything lives in `,(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:`.brokspace/brok.yml`})}),`. Every key is optional and the
defaults are sensible. The settings people change most:`]}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`llm`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`:`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`  default`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`ollama`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:" # which provider `brok ask` uses"})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`  providers`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`:`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`    ollama`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`:`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`      base_url`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`http://localhost:11434/v1`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`      model`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`qwen2.5-coder:7b`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`    anthropic`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`# hosted models: the key comes from an env var`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`      base_url`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`https://api.anthropic.com/v1`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`      model`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`claude-sonnet-5-5`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`      api_key_env`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`ANTHROPIC_API_KEY`})]}),`
`,(0,t.jsx)(n.span,{className:`line`}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`embeddings`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`:`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`  enabled`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:`true`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:` # false = text search only, less memory`})]}),`
`,(0,t.jsx)(n.span,{className:`line`}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`index`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`:`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`  exclude`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`# .gitignore is always respected too`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`    - `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`"**/node_modules/**"`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`    - `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`"**/*.min.js"`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`    - `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`"docs/archive/**"`})]}),`
`,(0,t.jsx)(n.span,{className:`line`}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`shards`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`:`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`  brok-agent`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`:`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`    settings`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`:`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`      review`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`# optional AI review of matching files on change`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`        enabled`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:`false`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#22863A`,"--shiki-dark":`#85E89D`},children:`        include`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: [`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`"src/api/**"`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`]`})]})]})})}),`
`,(0,t.jsx)(n.p,{children:`Easier ways to change things:`}),`
`,(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:`Change`}),(0,t.jsx)(n.th,{children:`Command`})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Switch the local LLM or model`}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`brok setup llm`}),` (or `,(0,t.jsx)(n.code,{children:`brok setup llm --provider ollama --model llama3:8b`}),`)`]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Connect more coding agents`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`brok setup agents`})})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Share the index (Git LFS, S3, R2, MinIO)`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`brok setup sync`})})]})]})]}),`
`,(0,t.jsxs)(n.p,{children:[`After editing `,(0,t.jsx)(n.code,{children:`brok.yml`}),`, run `,(0,t.jsx)(n.code,{children:`brok restart`}),`. Every key is explained in
`,(0,t.jsx)(n.a,{href:`/docs/configuration`,children:`Configuration reference`}),`.`]}),`
`,(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:`API keys`}),` are never written to files: export them in your shell
(`,(0,t.jsx)(n.code,{children:`export ANTHROPIC_API_KEY=...`}),`, or `,(0,t.jsx)(n.code,{children:`$env:ANTHROPIC_API_KEY = "..."`}),` in
PowerShell) and Brokspace reads them when needed. Secrets found in your code
are removed from the context before anything is sent to an LLM.`]}),`
`,(0,t.jsx)(n.hr,{}),`
`,(0,t.jsx)(n.h2,{id:`7-skills`,children:`7. Skills`}),`
`,(0,t.jsxs)(n.p,{children:[`A skill is a small, reusable workflow for AI: a `,(0,t.jsx)(n.code,{children:`SKILL.md`}),` file with
instructions. Brokspace ships 20 of them.`]}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` list`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                                    # what is available`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` show`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` tdd`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                                # read one`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` run`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` code-review`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` "the session handling"`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`  # run one on your local LLM`})]})]})})}),`
`,(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:`User-invoked`}),` skills are started by you (type `,(0,t.jsx)(n.code,{children:`/name`}),` in your agent, e.g.
`,(0,t.jsx)(n.code,{children:`/grill-me`}),` before a big change). `,(0,t.jsx)(n.strong,{children:`Model-invoked`}),` skills are picked by the
agent when the task fits (e.g. `,(0,t.jsx)(n.code,{children:`tdd`}),`, `,(0,t.jsx)(n.code,{children:`code-review`}),`).`]}),`
`,(0,t.jsx)(n.p,{children:`Write your own:`}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` new`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` release-notes`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`          # creates .brokspace/skills/release-notes/SKILL.md`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` export`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                     # refresh your coding agents with it`})]})]})})}),`
`,(0,t.jsxs)(n.p,{children:[`A workspace skill with the same name as a built-in one replaces it, so you
can tailor any built-in to your team. More in `,(0,t.jsx)(n.a,{href:`/docs/skills`,children:`Skills`}),`.`]}),`
`,(0,t.jsx)(n.hr,{}),`
`,(0,t.jsx)(n.h2,{id:`8-shards`,children:`8. Shards`}),`
`,(0,t.jsx)(n.p,{children:`Shards are small programs that react to what happens in your workspace (a
file changed, a question was asked) and can publish their own events. The
agent you installed is one.`}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` shard`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` list`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                                             # what is installed`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` shard`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` install`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` https://github.com/someone/some-shard`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`    # shows its permissions before installing`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` shard`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` new`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` my-shard`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                                     # start your own (Rust project)`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` shard`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` new`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` my-skills`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` --skills-only`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                      # or just share skills, no code`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` restart`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                                                # start new shards`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` bus`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` tail`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                                               # watch events live while developing`})]})]})})}),`
`,(0,t.jsxs)(n.p,{children:[`Every shard lists the permissions it wants in `,(0,t.jsx)(n.code,{children:`shard.json`}),`, and you approve
them when installing. Guide: `,(0,t.jsx)(n.a,{href:`/docs/shards`,children:`Shards`}),`.`]}),`
`,(0,t.jsx)(n.hr,{}),`
`,(0,t.jsx)(n.h2,{id:`9-troubleshooting`,children:`9. Troubleshooting`}),`
`,(0,t.jsxs)(n.p,{children:[`Start with `,(0,t.jsx)(n.code,{children:`brok doctor`}),`: it checks everything and prints the fix.`]}),`
`,(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:`Symptom`}),(0,t.jsx)(n.th,{children:`Fix`})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`no answer from the agent`})}),(0,t.jsxs)(n.td,{children:[`Start your LLM (open Ollama / LM Studio), then `,(0,t.jsx)(n.code,{children:`brok doctor`})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`ollama ... is not installed`})}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`ollama pull <model>`}),` as shown by `,(0,t.jsx)(n.code,{children:`brok doctor`})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Answers take minutes`}),(0,t.jsxs)(n.td,{children:[`The model runs on your CPU. Normal for 7b on a laptop without a GPU (a review can take 3 to 5 minutes); for faster answers use 3b: `,(0,t.jsx)(n.code,{children:`ollama pull qwen2.5-coder:3b`}),`, then `,(0,t.jsx)(n.code,{children:`brok setup llm --provider ollama --model qwen2.5-coder:3b`})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Search misses recent code`}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`brok status`}),`; if the daemon is stopped, `,(0,t.jsx)(n.code,{children:`brok start`}),` catches up`]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`another brok process is writing the index`})}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`brok`}),` is running in the background and already indexes for you; skip `,(0,t.jsx)(n.code,{children:`brok index`}),`, or `,(0,t.jsx)(n.code,{children:`brok stop`}),` first`]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Results come back as text only`}),(0,t.jsxs)(n.td,{children:[`The search model is missing: `,(0,t.jsx)(n.code,{children:`brok model download`})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Agent does not show the brok tools`}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`brok`}),` must be on `,(0,t.jsx)(n.code,{children:`PATH`}),`; run `,(0,t.jsx)(n.code,{children:`brok setup agents`}),` and restart the agent`]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Odd behavior after an upgrade`}),(0,t.jsxs)(n.td,{children:[(0,t.jsx)(n.code,{children:`brok restart`}),`; if it persists, `,(0,t.jsx)(n.code,{children:`brok index --rebuild`})]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Windows: errors about long paths`}),(0,t.jsxs)(n.td,{children:[`Enable long paths (`,(0,t.jsx)(n.code,{children:`brok doctor`}),` shows the command) or use a shorter folder`]})]})]})]}),`
`,(0,t.jsxs)(n.p,{children:[`Still stuck? Run `,(0,t.jsx)(n.code,{children:`brok logs -n 100`}),` and ask in
`,(0,t.jsx)(n.a,{href:`https://github.com/brokspace/brok/discussions`,children:`Discussions`}),`, including the
output of `,(0,t.jsx)(n.code,{children:`brok doctor`}),`.`]}),`
`,(0,t.jsx)(n.hr,{}),`
`,(0,t.jsx)(n.h2,{id:`10-update-brok`,children:`10. Update brok`}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` upgrade`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` --check`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`    # is there a new version, and what changed?`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` upgrade`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`            # shows what changed, asks, then upgrades`})]})]})})}),`
`,(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:`brok upgrade`}),` downloads the new `,(0,t.jsx)(n.code,{children:`brok`}),` and `,(0,t.jsx)(n.code,{children:`brok-agent`}),`, checks them
against the release checksums, swaps them in and restarts brok in every
workspace where it was running (each workspace's agent is refreshed on
that restart). `,(0,t.jsx)(n.code,{children:`brok doctor`}),` tells you when a new version is out.`]}),`
`,(0,t.jsxs)(n.p,{children:[`Then run `,(0,t.jsx)(n.code,{children:`brok skill export`}),` in your workspaces so your coding agents get
the updated built-in skills.`]}),`
`,(0,t.jsxs)(n.p,{children:[`Installed with Cargo? Upgrade with `,(0,t.jsx)(n.code,{children:`cargo install brok-cli brok-agent`}),`.
Coming from brok 0.2.1 or older (no `,(0,t.jsx)(n.code,{children:`upgrade`}),` command yet)? Run the install
command from `,(0,t.jsx)(n.a,{href:`#1-install-brok`,children:`step 1`}),` again, once.`]}),`
`,(0,t.jsx)(n.hr,{}),`
`,(0,t.jsx)(n.h2,{id:`11-uninstall`,children:`11. Uninstall`}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsx)(n.code,{children:(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` stop`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                    # in each workspace where it runs`})]})})})}),`
`,(0,t.jsx)(n.p,{children:`Then delete:`}),`
`,(0,t.jsxs)(n.ul,{children:[`
`,(0,t.jsxs)(n.li,{children:[`the `,(0,t.jsx)(n.code,{children:`.brokspace/`}),` folder of each workspace (plus `,(0,t.jsx)(n.code,{children:`.agents/skills`}),`,
`,(0,t.jsx)(n.code,{children:`.claude/skills`}),` and the MCP files if you no longer want them);`]}),`
`,(0,t.jsxs)(n.li,{children:[`the shared model cache: `,(0,t.jsx)(n.code,{children:`~/.cache/brokspace`}),` (Linux),
`,(0,t.jsx)(n.code,{children:`~/Library/Caches/brokspace`}),` (macOS), `,(0,t.jsx)(n.code,{children:`%LOCALAPPDATA%\\brokspace`}),` (Windows);`]}),`
`,(0,t.jsxs)(n.li,{children:[`your defaults: `,(0,t.jsx)(n.code,{children:`~/.config/brokspace`}),` (Linux),
`,(0,t.jsx)(n.code,{children:`~/Library/Application Support/brokspace`}),` (macOS), `,(0,t.jsx)(n.code,{children:`%APPDATA%\\brokspace`}),`
(Windows);`]}),`
`,(0,t.jsxs)(n.li,{children:[`the `,(0,t.jsx)(n.code,{children:`brok`}),` and `,(0,t.jsx)(n.code,{children:`brok-agent`}),` programs (`,(0,t.jsx)(n.code,{children:`~/.local/bin`}),`, or
`,(0,t.jsx)(n.code,{children:`%LOCALAPPDATA%\\Programs\\brok`}),` on Windows; `,(0,t.jsx)(n.code,{children:`cargo uninstall brok-cli brok-agent`}),`
if you used Cargo).`]}),`
`]})]})}function s(e={}){let{wrapper:n}=e.components||{};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}export{r as _markdown,s as default,n as frontmatter,i as structuredData,a as toc};