import{t as e}from"./jsx-runtime-LKYXHABd.js";import{t}from"./ide-home-BItkCeoc.js";var n=e(),r={title:`Brokspace IDE`,description:`An IDE with Brokspace built in, for IDE mode next to the brok CLI.`},i=`Brokspace IDE is built on [Eclipse Theia](https://theia-ide.org), so VS
Code extensions from [Open VSX](https://open-vsx.org) work in it. It ships
with \`brok\` and \`brok-agent\`, and puts them on your \`PATH\`.

![Brokspace IDE home](/images/ide-home.png)

## Install [#install]

<Tabs items={['macOS', 'Debian / Ubuntu', 'Linux (other)', 'Windows']}>
  <Tab value="macOS">
    \`\`\`sh
    brew install --cask brokspace/tap/brokspace-ide
    \`\`\`
    The first launch needs right click > **Open** while the app is not
    notarized yet.
  </Tab>
  <Tab value="Debian / Ubuntu">
    \`\`\`sh
    curl -fsSL https://brokspace.github.io/apt/brokspace-archive-keyring.gpg \\
      | sudo tee /usr/share/keyrings/brokspace-archive-keyring.gpg >/dev/null
    echo "deb [signed-by=/usr/share/keyrings/brokspace-archive-keyring.gpg] https://brokspace.github.io/apt stable main" \\
      | sudo tee /etc/apt/sources.list.d/brokspace.list
    sudo apt update && sudo apt install brokspace-ide
    \`\`\`
  </Tab>
  <Tab value="Linux (other)">
    Download the AppImage or the \`.tar.gz\` from the
    [latest release](https://github.com/brokspace/ide/releases/latest).
  </Tab>
  <Tab value="Windows">
    Download \`BrokspaceIDE-<version>-windows-x64-setup.exe\` from the
    [latest release](https://github.com/brokspace/ide/releases/latest). Choose
    **More info > Run anyway** in SmartScreen while the installer is not
    signed yet.
  </Tab>
</Tabs>

The IDE updates itself from GitHub Releases. For answers you need an LLM:
see [Local LLM setup](/docs/local-llm) (search works without one).

## Your first minutes [#your-first-minutes]

The window starts minimal: Explorer, Search, Source Control and Brokspace on
the left, the **Brokspace agent** docked on the right. Debug, Testing and
Extensions stay one shortcut away.

1. **Open a folder** (File > Open Folder). If it has no Brokspace workspace
   yet, the Brokspace view offers **Set Up Workspace**: it runs \`brok init\`
   for you.
2. **Ask.** Type a question on the home page or in the agent panel: the
   Brokspace agent answers from your LLM with the sources it used; click a
   source to open the file at that line. Follow-up questions keep the
   conversation. Press \`Ctrl+Shift+A\` (\`Cmd+Shift+A\` on macOS) for **agent
   focus mode**, where the agent takes most of the window.
3. **Search.** The Brokspace view (the folded "B" in the activity bar) finds
   code by meaning or by name; click a result to open it.
4. **Review and commit.** Type \`/review\` in the chat (or \`/review staged\`,
   \`/review base main\`). In Source Control, the ✨ button writes the commit
   message from the staged changes.

## The Brokspace view [#the-brokspace-view]

| Section | What it shows |
|---|---|
| **Overview** | Whether Brokspace is running, the model, the index, search, and Ask / Review / Commit |
| **Shards** | Each installed shard and its state; expand one to see what it reads and writes, whether it uses the network, the programs it runs, the events it listens to and publishes, and where it came from. Install, create or remove shards from the toolbar |
| **Skills** | Workflows you run and the skills your agents use; click to run one |

## The Brokspace agent [#the-brokspace-agent]

Every request goes through \`brok\`, which sends it to the LLM set in
\`.brokspace/brok.yml\` (Ollama, LM Studio or a hosted OpenAI-compatible API).
Without an LLM, or when it does not answer, the agent replies with what the
local index found, as links.

| Type | It runs |
|---|---|
| A question | \`brok ask\` with the conversation so far |
| \`/review\` | A review of your uncommitted changes |
| \`/review staged\` | A review of the staged changes |
| \`/review base <ref>\` | A review of this branch against \`<ref>\` |
| \`/skill <name> <input>\` | A skill on your LLM, e.g. \`/skill tdd add a priority field\` |

## Commands and languages [#commands-and-languages]

Everything is also in the **Brokspace** menu and the command palette:
Set Up Workspace, Start / Stop / Restart, Rebuild Index, Doctor, Install,
Create and Remove Shard, Export Skills to Coding Agents, Run Skill, Review,
Write Commit Message. The status bar shows whether Brokspace is running and
which model it uses.

The IDE is in English and Brazilian Portuguese. It starts in Portuguese on a
Portuguese system; switch with **Language** on the home page.

## How it works [#how-it-works]

The IDE talks to Brokspace only through the \`brok\` CLI and its JSON output
(see [Integrations](/docs/integrations)), so it shows exactly what \`brok\`
sees, and anything it does you can also do in a terminal. It needs brok
0.2.4 or newer; the one it ships with qualifies.
`,a={contents:[{heading:void 0,content:"Brokspace IDE is built on Eclipse Theia, so VS\nCode extensions from Open VSX work in it. It ships\nwith `brok` and `brok-agent`, and puts them on your `PATH`."},{heading:`install`,content:`The first launch needs right click > **Open** while the app is not
notarized yet.`},{heading:`install`,content:"Download the AppImage or the `.tar.gz` from the\nlatest release."},{heading:`install`,content:`Download \`BrokspaceIDE-<version>-windows-x64-setup.exe\` from the
latest release. Choose
**More info > Run anyway** in SmartScreen while the installer is not
signed yet.`},{heading:`install`,content:`The IDE updates itself from GitHub Releases. For answers you need an LLM:
see Local LLM setup (search works without one).`},{heading:`your-first-minutes`,content:`The window starts minimal: Explorer, Search, Source Control and Brokspace on
the left, the **Brokspace agent** docked on the right. Debug, Testing and
Extensions stay one shortcut away.`},{heading:`your-first-minutes`,content:`**Open a folder** (File > Open Folder). If it has no Brokspace workspace
yet, the Brokspace view offers **Set Up Workspace**: it runs \`brok init\`
for you.`},{heading:`your-first-minutes`,content:`**Ask.** Type a question on the home page or in the agent panel: the
Brokspace agent answers from your LLM with the sources it used; click a
source to open the file at that line. Follow-up questions keep the
conversation. Press \`Ctrl+Shift+A\` (\`Cmd+Shift+A\` on macOS) for **agent
focus mode**, where the agent takes most of the window.`},{heading:`your-first-minutes`,content:`**Search.** The Brokspace view (the folded "B" in the activity bar) finds
code by meaning or by name; click a result to open it.`},{heading:`your-first-minutes`,content:"**Review and commit.** Type `/review` in the chat (or `/review staged`,\n`/review base main`). In Source Control, the ✨ button writes the commit\nmessage from the staged changes."},{heading:`the-brokspace-view`,content:`| Section      | What it shows                                                                         |
| ------------ | ------------------------------------------------------------------------------------- |
| **Overview** | Whether Brokspace is running, the model, the index, search, and Ask / Review / Commit |`,table:`table-0`},{heading:`the-brokspace-view`,content:`| Section    | What it shows                                                                                                                                                                                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shards** | Each installed shard and its state; expand one to see what it reads and writes, whether it uses the network, the programs it runs, the events it listens to and publishes, and where it came from. Install, create or remove shards from the toolbar |`,table:`table-0`},{heading:`the-brokspace-view`,content:`| Section    | What it shows                                                      |
| ---------- | ------------------------------------------------------------------ |
| **Skills** | Workflows you run and the skills your agents use; click to run one |`,table:`table-0`},{heading:`the-brokspace-agent`,content:"Every request goes through `brok`, which sends it to the LLM set in\n`.brokspace/brok.yml` (Ollama, LM Studio or a hosted OpenAI-compatible API).\nWithout an LLM, or when it does not answer, the agent replies with what the\nlocal index found, as links."},{heading:`the-brokspace-agent`,content:`| Type       | It runs                                 |
| ---------- | --------------------------------------- |
| A question | \`brok ask\` with the conversation so far |`,table:`table-1`},{heading:`the-brokspace-agent`,content:`| Type      | It runs                              |
| --------- | ------------------------------------ |
| \`/review\` | A review of your uncommitted changes |`,table:`table-1`},{heading:`the-brokspace-agent`,content:`| Type             | It runs                        |
| ---------------- | ------------------------------ |
| \`/review staged\` | A review of the staged changes |`,table:`table-1`},{heading:`the-brokspace-agent`,content:"| Type                 | It runs                                 |\n| -------------------- | --------------------------------------- |\n| `/review base <ref>` | A review of this branch against `<ref>` |",table:`table-1`},{heading:`the-brokspace-agent`,content:"| Type                    | It runs                                                     |\n| ----------------------- | ----------------------------------------------------------- |\n| `/skill <name> <input>` | A skill on your LLM, e.g. `/skill tdd add a priority field` |",table:`table-1`},{heading:`commands-and-languages`,content:`Everything is also in the **Brokspace** menu and the command palette:
Set Up Workspace, Start / Stop / Restart, Rebuild Index, Doctor, Install,
Create and Remove Shard, Export Skills to Coding Agents, Run Skill, Review,
Write Commit Message. The status bar shows whether Brokspace is running and
which model it uses.`},{heading:`commands-and-languages`,content:`The IDE is in English and Brazilian Portuguese. It starts in Portuguese on a
Portuguese system; switch with **Language** on the home page.`},{heading:`how-it-works`,content:"The IDE talks to Brokspace only through the `brok` CLI and its JSON output\n(see Integrations), so it shows exactly what `brok`\nsees, and anything it does you can also do in a terminal. It needs brok\n0.2.4 or newer; the one it ships with qualifies."}],headings:[{id:`install`,content:`Install`},{id:`your-first-minutes`,content:`Your first minutes`},{id:`the-brokspace-view`,content:`The Brokspace view`},{id:`the-brokspace-agent`,content:`The Brokspace agent`},{id:`commands-and-languages`,content:`Commands and languages`},{id:`how-it-works`,content:`How it works`}]},o=[{depth:2,url:`#install`,title:(0,n.jsx)(n.Fragment,{children:`Install`})},{depth:2,url:`#your-first-minutes`,title:(0,n.jsx)(n.Fragment,{children:`Your first minutes`})},{depth:2,url:`#the-brokspace-view`,title:(0,n.jsx)(n.Fragment,{children:`The Brokspace view`})},{depth:2,url:`#the-brokspace-agent`,title:(0,n.jsx)(n.Fragment,{children:`The Brokspace agent`})},{depth:2,url:`#commands-and-languages`,title:(0,n.jsx)(n.Fragment,{children:`Commands and languages`})},{depth:2,url:`#how-it-works`,title:(0,n.jsx)(n.Fragment,{children:`How it works`})}];function s(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...e.components},{Tab:i,Tabs:a}=r;return i||l(`Tab`,!0),a||l(`Tabs`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[`Brokspace IDE is built on `,(0,n.jsx)(r.a,{href:`https://theia-ide.org`,children:`Eclipse Theia`}),`, so VS
Code extensions from `,(0,n.jsx)(r.a,{href:`https://open-vsx.org`,children:`Open VSX`}),` work in it. It ships
with `,(0,n.jsx)(r.code,{children:`brok`}),` and `,(0,n.jsx)(r.code,{children:`brok-agent`}),`, and puts them on your `,(0,n.jsx)(r.code,{children:`PATH`}),`.`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{alt:`Brokspace IDE home`,src:t})}),`
`,(0,n.jsx)(r.h2,{id:`install`,children:`Install`}),`
`,(0,n.jsxs)(a,{items:[`macOS`,`Debian / Ubuntu`,`Linux (other)`,`Windows`],children:[(0,n.jsxs)(i,{value:`macOS`,children:[(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(r.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,n.jsx)(r.code,{children:(0,n.jsxs)(r.span,{className:`line`,children:[(0,n.jsx)(r.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brew`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` install`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` --cask`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` brokspace/tap/brokspace-ide`})]})})})}),(0,n.jsxs)(r.p,{children:[`The first launch needs right click > `,(0,n.jsx)(r.strong,{children:`Open`}),` while the app is not
notarized yet.`]})]}),(0,n.jsx)(i,{value:`Debian / Ubuntu`,children:(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(r.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,n.jsxs)(r.code,{children:[(0,n.jsxs)(r.span,{className:`line`,children:[(0,n.jsx)(r.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`curl`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` -fsSL`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` https://brokspace.github.io/apt/brokspace-archive-keyring.gpg`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` \\`})]}),`
`,(0,n.jsxs)(r.span,{className:`line`,children:[(0,n.jsx)(r.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:`  |`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:` sudo`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` tee`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` /usr/share/keyrings/brokspace-archive-keyring.gpg`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:` >`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`/dev/null`})]}),`
`,(0,n.jsxs)(r.span,{className:`line`,children:[(0,n.jsx)(r.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:`echo`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` "deb [signed-by=/usr/share/keyrings/brokspace-archive-keyring.gpg] https://brokspace.github.io/apt stable main"`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` \\`})]}),`
`,(0,n.jsxs)(r.span,{className:`line`,children:[(0,n.jsx)(r.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:`  |`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:` sudo`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` tee`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` /etc/apt/sources.list.d/brokspace.list`})]}),`
`,(0,n.jsxs)(r.span,{className:`line`,children:[(0,n.jsx)(r.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`sudo`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` apt`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` update`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:` && `}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`sudo`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` apt`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` install`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` brokspace-ide`})]})]})})})}),(0,n.jsx)(i,{value:`Linux (other)`,children:(0,n.jsxs)(r.p,{children:[`Download the AppImage or the `,(0,n.jsx)(r.code,{children:`.tar.gz`}),` from the
`,(0,n.jsx)(r.a,{href:`https://github.com/brokspace/ide/releases/latest`,children:`latest release`}),`.`]})}),(0,n.jsx)(i,{value:`Windows`,children:(0,n.jsxs)(r.p,{children:[`Download `,(0,n.jsx)(r.code,{children:`BrokspaceIDE-<version>-windows-x64-setup.exe`}),` from the
`,(0,n.jsx)(r.a,{href:`https://github.com/brokspace/ide/releases/latest`,children:`latest release`}),`. Choose
`,(0,n.jsx)(r.strong,{children:`More info > Run anyway`}),` in SmartScreen while the installer is not
signed yet.`]})})]}),`
`,(0,n.jsxs)(r.p,{children:[`The IDE updates itself from GitHub Releases. For answers you need an LLM:
see `,(0,n.jsx)(r.a,{href:`/docs/local-llm`,children:`Local LLM setup`}),` (search works without one).`]}),`
`,(0,n.jsx)(r.h2,{id:`your-first-minutes`,children:`Your first minutes`}),`
`,(0,n.jsxs)(r.p,{children:[`The window starts minimal: Explorer, Search, Source Control and Brokspace on
the left, the `,(0,n.jsx)(r.strong,{children:`Brokspace agent`}),` docked on the right. Debug, Testing and
Extensions stay one shortcut away.`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Open a folder`}),` (File > Open Folder). If it has no Brokspace workspace
yet, the Brokspace view offers `,(0,n.jsx)(r.strong,{children:`Set Up Workspace`}),`: it runs `,(0,n.jsx)(r.code,{children:`brok init`}),`
for you.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Ask.`}),` Type a question on the home page or in the agent panel: the
Brokspace agent answers from your LLM with the sources it used; click a
source to open the file at that line. Follow-up questions keep the
conversation. Press `,(0,n.jsx)(r.code,{children:`Ctrl+Shift+A`}),` (`,(0,n.jsx)(r.code,{children:`Cmd+Shift+A`}),` on macOS) for `,(0,n.jsx)(r.strong,{children:`agent
focus mode`}),`, where the agent takes most of the window.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Search.`}),` The Brokspace view (the folded "B" in the activity bar) finds
code by meaning or by name; click a result to open it.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Review and commit.`}),` Type `,(0,n.jsx)(r.code,{children:`/review`}),` in the chat (or `,(0,n.jsx)(r.code,{children:`/review staged`}),`,
`,(0,n.jsx)(r.code,{children:`/review base main`}),`). In Source Control, the ✨ button writes the commit
message from the staged changes.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{id:`the-brokspace-view`,children:`The Brokspace view`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Section`}),(0,n.jsx)(r.th,{children:`What it shows`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.strong,{children:`Overview`})}),(0,n.jsx)(r.td,{children:`Whether Brokspace is running, the model, the index, search, and Ask / Review / Commit`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.strong,{children:`Shards`})}),(0,n.jsx)(r.td,{children:`Each installed shard and its state; expand one to see what it reads and writes, whether it uses the network, the programs it runs, the events it listens to and publishes, and where it came from. Install, create or remove shards from the toolbar`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.strong,{children:`Skills`})}),(0,n.jsx)(r.td,{children:`Workflows you run and the skills your agents use; click to run one`})]})]})]}),`
`,(0,n.jsx)(r.h2,{id:`the-brokspace-agent`,children:`The Brokspace agent`}),`
`,(0,n.jsxs)(r.p,{children:[`Every request goes through `,(0,n.jsx)(r.code,{children:`brok`}),`, which sends it to the LLM set in
`,(0,n.jsx)(r.code,{children:`.brokspace/brok.yml`}),` (Ollama, LM Studio or a hosted OpenAI-compatible API).
Without an LLM, or when it does not answer, the agent replies with what the
local index found, as links.`]}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Type`}),(0,n.jsx)(r.th,{children:`It runs`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`A question`}),(0,n.jsxs)(r.td,{children:[(0,n.jsx)(r.code,{children:`brok ask`}),` with the conversation so far`]})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`/review`})}),(0,n.jsx)(r.td,{children:`A review of your uncommitted changes`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`/review staged`})}),(0,n.jsx)(r.td,{children:`A review of the staged changes`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`/review base <ref>`})}),(0,n.jsxs)(r.td,{children:[`A review of this branch against `,(0,n.jsx)(r.code,{children:`<ref>`})]})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`/skill <name> <input>`})}),(0,n.jsxs)(r.td,{children:[`A skill on your LLM, e.g. `,(0,n.jsx)(r.code,{children:`/skill tdd add a priority field`})]})]})]})]}),`
`,(0,n.jsx)(r.h2,{id:`commands-and-languages`,children:`Commands and languages`}),`
`,(0,n.jsxs)(r.p,{children:[`Everything is also in the `,(0,n.jsx)(r.strong,{children:`Brokspace`}),` menu and the command palette:
Set Up Workspace, Start / Stop / Restart, Rebuild Index, Doctor, Install,
Create and Remove Shard, Export Skills to Coding Agents, Run Skill, Review,
Write Commit Message. The status bar shows whether Brokspace is running and
which model it uses.`]}),`
`,(0,n.jsxs)(r.p,{children:[`The IDE is in English and Brazilian Portuguese. It starts in Portuguese on a
Portuguese system; switch with `,(0,n.jsx)(r.strong,{children:`Language`}),` on the home page.`]}),`
`,(0,n.jsx)(r.h2,{id:`how-it-works`,children:`How it works`}),`
`,(0,n.jsxs)(r.p,{children:[`The IDE talks to Brokspace only through the `,(0,n.jsx)(r.code,{children:`brok`}),` CLI and its JSON output
(see `,(0,n.jsx)(r.a,{href:`/docs/integrations`,children:`Integrations`}),`), so it shows exactly what `,(0,n.jsx)(r.code,{children:`brok`}),`
sees, and anything it does you can also do in a terminal. It needs brok
0.2.4 or newer; the one it ships with qualifies.`]})]})}function c(e={}){let{wrapper:t}=e.components||{};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{i as _markdown,c as default,r as frontmatter,a as structuredData,o as toc};