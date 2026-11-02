import{t as e}from"./jsx-runtime-LKYXHABd.js";var t=e(),n={title:`Skills`,description:`A skill is a small, reusable workflow written for AI agents: a folder with a SKILL.md (YAML frontmatter name + description, then instructions) and optional reference files.`},r=`<!-- Generated from https://github.com/brokspace/brok/blob/main/docs/skills.md by scripts/sync-docs.mjs. Edit it there. -->

A **skill** is a small, reusable workflow written for AI agents: a folder
with a \`SKILL.md\` (YAML frontmatter \`name\` + \`description\`, then
instructions) and optional reference files. Brokspace uses the same
[Agent Skills](https://github.com/mattpocock/skills) format as Claude Code,
Codex, Cursor and GitHub Copilot, so a skill written once works everywhere.

\`\`\`text
code-review/
├── SKILL.md            name, description, instructions
├── agents/openai.yaml  display metadata for Codex (optional)
└── CHECKLIST.md        reference material linked from SKILL.md (optional)
\`\`\`

## Two kinds [#two-kinds]

|               | User-invoked                                | Model-invoked                                |
| ------------- | ------------------------------------------- | -------------------------------------------- |
| Who starts it | Only you, by typing \`/name\`                 | You, or the agent when the task fits         |
| Frontmatter   | \`disable-model-invocation: true\`            | (default)                                    |
| Role          | Orchestrates a flow (\`/to-spec\`, \`/triage\`) | A reusable discipline (\`tdd\`, \`code-review\`) |
| Description   | One human-facing line                       | Rich "Use when..." triggers                  |

## Built-in skills [#built-in-skills]

\`brok\` ships a curated set, embedded in the binary (source:
[skills/](https://github.com/brokspace/brok/blob/main/skills/README.md)). They cover the whole development loop that
Brokspace itself uses: align, specify, slice, build test-first, review, ship.

\`\`\`sh
brok skill list          # everything available, with its source
brok skill show tdd      # read one
\`\`\`

Not sure where to start? Type \`/ask-brok\` in your coding agent and describe
your situation.

## Using skills [#using-skills]

**In your coding agent** (the main way):

\`\`\`sh
brok setup agents        # skills + MCP search tool, for the agents it detects
brok skill export        # skills only; --agent claude|agents|cursor|vscode|codex, --global
\`\`\`

Skills land in \`.claude/skills/\` and the portable \`.agents/skills/\` (read by
Codex, Cursor, Copilot and others). Folders are marked \`.brokspace-managed\`
and refreshed on every export; brok never overwrites a folder it did not
create. Commit them to share with your team.

**On your local LLM**, through \`brok-agent\` (needs \`brok run\`):

\`\`\`sh
brok skill run code-review "the changes in src/api since main"
brok skill run grill-me "plan: move sessions to redis"
\`\`\`

The skill's instructions (and the reference files it links) become the
system prompt; Brokspace adds relevant code from the index as context.

## Writing your own [#writing-your-own]

\`\`\`sh
brok skill new release-notes                  # model-invoked, in .brokspace/skills/
brok skill new deploy --user-invoked          # a /deploy workflow only you trigger
\`\`\`

Workspace skills in \`.brokspace/skills/<name>/\` **override** built-ins with
the same name, so you can tailor any built-in to your team. Keep skills
short and explicit: small local models follow them too. The built-in
\`write-skill\` skill walks your agent through it.

## Sharing skills: skill shards [#sharing-skills-skill-shards]

A **skill shard** is a shard with no process, just skills. Publish it as a
git repository and anyone can install it:

\`\`\`sh
brok shard new acme-skills --skills-only      # shard.json + skills/example/
# edit, push to GitHub, then on any machine:
brok shard install https://github.com/acme/acme-skills
brok skill list                               # source: shard:acme-skills
\`\`\`

\`shard.json\` of a skill shard:

\`\`\`json
{ "name": "acme-skills", "version": "0.1.0", "skills": ["skills"] }
\`\`\`

A shard can also ship skills next to its process (\`entrypoint\` + \`skills\`).

## Precedence [#precedence]

When names collide, the first wins: workspace (\`.brokspace/skills/\`) >
installed shards > built-in. \`brok skill list\` reports shadowed skills.

## Credits [#credits]

The built-in workflows are adapted from
[mattpocock/skills](https://github.com/mattpocock/skills) (MIT); see
[skills/CREDITS.md](https://github.com/brokspace/brok/blob/main/skills/CREDITS.md).
`,i={contents:[{heading:void 0,content:"A **skill** is a small, reusable workflow written for AI agents: a folder\nwith a `SKILL.md` (YAML frontmatter `name` + `description`, then\ninstructions) and optional reference files. Brokspace uses the same\nAgent Skills format as Claude Code,\nCodex, Cursor and GitHub Copilot, so a skill written once works everywhere."},{heading:`two-kinds`,content:`|               | User-invoked                | Model-invoked                        |
| ------------- | --------------------------- | ------------------------------------ |
| Who starts it | Only you, by typing \`/name\` | You, or the agent when the task fits |`,table:`table-0`},{heading:`two-kinds`,content:`|             | User-invoked                     | Model-invoked |
| ----------- | -------------------------------- | ------------- |
| Frontmatter | \`disable-model-invocation: true\` | (default)     |`,table:`table-0`},{heading:`two-kinds`,content:"|      | User-invoked                                | Model-invoked                                |\n| ---- | ------------------------------------------- | -------------------------------------------- |\n| Role | Orchestrates a flow (`/to-spec`, `/triage`) | A reusable discipline (`tdd`, `code-review`) |",table:`table-0`},{heading:`two-kinds`,content:`|             | User-invoked          | Model-invoked               |
| ----------- | --------------------- | --------------------------- |
| Description | One human-facing line | Rich "Use when..." triggers |`,table:`table-0`},{heading:`built-in-skills`,content:`\`brok\` ships a curated set, embedded in the binary (source:
skills/). They cover the whole development loop that
Brokspace itself uses: align, specify, slice, build test-first, review, ship.`},{heading:`built-in-skills`,content:"Not sure where to start? Type `/ask-brok` in your coding agent and describe\nyour situation."},{heading:`using-skills`,content:`**In your coding agent** (the main way):`},{heading:`using-skills`,content:"Skills land in `.claude/skills/` and the portable `.agents/skills/` (read by\nCodex, Cursor, Copilot and others). Folders are marked `.brokspace-managed`\nand refreshed on every export; brok never overwrites a folder it did not\ncreate. Commit them to share with your team."},{heading:`using-skills`,content:"**On your local LLM**, through `brok-agent` (needs `brok run`):"},{heading:`using-skills`,content:`The skill's instructions (and the reference files it links) become the
system prompt; Brokspace adds relevant code from the index as context.`},{heading:`writing-your-own`,content:"Workspace skills in `.brokspace/skills/<name>/` **override** built-ins with\nthe same name, so you can tailor any built-in to your team. Keep skills\nshort and explicit: small local models follow them too. The built-in\n`write-skill` skill walks your agent through it."},{heading:`sharing-skills-skill-shards`,content:`A **skill shard** is a shard with no process, just skills. Publish it as a
git repository and anyone can install it:`},{heading:`sharing-skills-skill-shards`,content:"`shard.json` of a skill shard:"},{heading:`sharing-skills-skill-shards`,content:"A shard can also ship skills next to its process (`entrypoint` + `skills`)."},{heading:`precedence`,content:"When names collide, the first wins: workspace (`.brokspace/skills/`) >\ninstalled shards > built-in. `brok skill list` reports shadowed skills."},{heading:`credits`,content:`The built-in workflows are adapted from
mattpocock/skills (MIT); see
skills/CREDITS.md.`}],headings:[{id:`two-kinds`,content:`Two kinds`},{id:`built-in-skills`,content:`Built-in skills`},{id:`using-skills`,content:`Using skills`},{id:`writing-your-own`,content:`Writing your own`},{id:`sharing-skills-skill-shards`,content:`Sharing skills: skill shards`},{id:`precedence`,content:`Precedence`},{id:`credits`,content:`Credits`}]},a=[{depth:2,url:`#two-kinds`,title:(0,t.jsx)(t.Fragment,{children:`Two kinds`})},{depth:2,url:`#built-in-skills`,title:(0,t.jsx)(t.Fragment,{children:`Built-in skills`})},{depth:2,url:`#using-skills`,title:(0,t.jsx)(t.Fragment,{children:`Using skills`})},{depth:2,url:`#writing-your-own`,title:(0,t.jsx)(t.Fragment,{children:`Writing your own`})},{depth:2,url:`#sharing-skills-skill-shards`,title:(0,t.jsx)(t.Fragment,{children:`Sharing skills: skill shards`})},{depth:2,url:`#precedence`,title:(0,t.jsx)(t.Fragment,{children:`Precedence`})},{depth:2,url:`#credits`,title:(0,t.jsx)(t.Fragment,{children:`Credits`})}];function o(e){let n={a:`a`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:[`A `,(0,t.jsx)(n.strong,{children:`skill`}),` is a small, reusable workflow written for AI agents: a folder
with a `,(0,t.jsx)(n.code,{children:`SKILL.md`}),` (YAML frontmatter `,(0,t.jsx)(n.code,{children:`name`}),` + `,(0,t.jsx)(n.code,{children:`description`}),`, then
instructions) and optional reference files. Brokspace uses the same
`,(0,t.jsx)(n.a,{href:`https://github.com/mattpocock/skills`,children:`Agent Skills`}),` format as Claude Code,
Codex, Cursor and GitHub Copilot, so a skill written once works everywhere.`]}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsx)(n.span,{className:`line`,children:(0,t.jsx)(n.span,{children:`code-review/`})}),`
`,(0,t.jsx)(n.span,{className:`line`,children:(0,t.jsx)(n.span,{children:`├── SKILL.md            name, description, instructions`})}),`
`,(0,t.jsx)(n.span,{className:`line`,children:(0,t.jsx)(n.span,{children:`├── agents/openai.yaml  display metadata for Codex (optional)`})}),`
`,(0,t.jsx)(n.span,{className:`line`,children:(0,t.jsx)(n.span,{children:`└── CHECKLIST.md        reference material linked from SKILL.md (optional)`})})]})})}),`
`,(0,t.jsx)(n.h2,{id:`two-kinds`,children:`Two kinds`}),`
`,(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{}),(0,t.jsx)(n.th,{children:`User-invoked`}),(0,t.jsx)(n.th,{children:`Model-invoked`})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Who starts it`}),(0,t.jsxs)(n.td,{children:[`Only you, by typing `,(0,t.jsx)(n.code,{children:`/name`})]}),(0,t.jsx)(n.td,{children:`You, or the agent when the task fits`})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Frontmatter`}),(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:`disable-model-invocation: true`})}),(0,t.jsx)(n.td,{children:`(default)`})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Role`}),(0,t.jsxs)(n.td,{children:[`Orchestrates a flow (`,(0,t.jsx)(n.code,{children:`/to-spec`}),`, `,(0,t.jsx)(n.code,{children:`/triage`}),`)`]}),(0,t.jsxs)(n.td,{children:[`A reusable discipline (`,(0,t.jsx)(n.code,{children:`tdd`}),`, `,(0,t.jsx)(n.code,{children:`code-review`}),`)`]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:`Description`}),(0,t.jsx)(n.td,{children:`One human-facing line`}),(0,t.jsx)(n.td,{children:`Rich "Use when..." triggers`})]})]})]}),`
`,(0,t.jsx)(n.h2,{id:`built-in-skills`,children:`Built-in skills`}),`
`,(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:`brok`}),` ships a curated set, embedded in the binary (source:
`,(0,t.jsx)(n.a,{href:`https://github.com/brokspace/brok/blob/main/skills/README.md`,children:`skills/`}),`). They cover the whole development loop that
Brokspace itself uses: align, specify, slice, build test-first, review, ship.`]}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` list`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`          # everything available, with its source`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` show`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` tdd`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`      # read one`})]})]})})}),`
`,(0,t.jsxs)(n.p,{children:[`Not sure where to start? Type `,(0,t.jsx)(n.code,{children:`/ask-brok`}),` in your coding agent and describe
your situation.`]}),`
`,(0,t.jsx)(n.h2,{id:`using-skills`,children:`Using skills`}),`
`,(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:`In your coding agent`}),` (the main way):`]}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` setup`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` agents`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`        # skills + MCP search tool, for the agents it detects`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` export`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`        # skills only; --agent claude|agents|cursor|vscode|codex, --global`})]})]})})}),`
`,(0,t.jsxs)(n.p,{children:[`Skills land in `,(0,t.jsx)(n.code,{children:`.claude/skills/`}),` and the portable `,(0,t.jsx)(n.code,{children:`.agents/skills/`}),` (read by
Codex, Cursor, Copilot and others). Folders are marked `,(0,t.jsx)(n.code,{children:`.brokspace-managed`}),`
and refreshed on every export; brok never overwrites a folder it did not
create. Commit them to share with your team.`]}),`
`,(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:`On your local LLM`}),`, through `,(0,t.jsx)(n.code,{children:`brok-agent`}),` (needs `,(0,t.jsx)(n.code,{children:`brok run`}),`):`]}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` run`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` code-review`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` "the changes in src/api since main"`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` run`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` grill-me`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` "plan: move sessions to redis"`})]})]})})}),`
`,(0,t.jsx)(n.p,{children:`The skill's instructions (and the reference files it links) become the
system prompt; Brokspace adds relevant code from the index as context.`}),`
`,(0,t.jsx)(n.h2,{id:`writing-your-own`,children:`Writing your own`}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` new`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` release-notes`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                  # model-invoked, in .brokspace/skills/`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` new`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` deploy`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` --user-invoked`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`          # a /deploy workflow only you trigger`})]})]})})}),`
`,(0,t.jsxs)(n.p,{children:[`Workspace skills in `,(0,t.jsx)(n.code,{children:`.brokspace/skills/<name>/`}),` `,(0,t.jsx)(n.strong,{children:`override`}),` built-ins with
the same name, so you can tailor any built-in to your team. Keep skills
short and explicit: small local models follow them too. The built-in
`,(0,t.jsx)(n.code,{children:`write-skill`}),` skill walks your agent through it.`]}),`
`,(0,t.jsx)(n.h2,{id:`sharing-skills-skill-shards`,children:`Sharing skills: skill shards`}),`
`,(0,t.jsxs)(n.p,{children:[`A `,(0,t.jsx)(n.strong,{children:`skill shard`}),` is a shard with no process, just skills. Publish it as a
git repository and anyone can install it:`]}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,t.jsxs)(n.code,{children:[(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` shard`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` new`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` acme-skills`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` --skills-only`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`      # shard.json + skills/example/`})]}),`
`,(0,t.jsx)(n.span,{className:`line`,children:(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`# edit, push to GitHub, then on any machine:`})}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` shard`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` install`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` https://github.com/acme/acme-skills`})]}),`
`,(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brok`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` skill`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` list`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#6A737D`,"--shiki-dark":`#6A737D`},children:`                               # source: shard:acme-skills`})]})]})})}),`
`,(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:`shard.json`}),` of a skill shard:`]}),`
`,(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(n.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z" fill="currentColor" /></svg>`,children:(0,t.jsx)(n.code,{children:(0,t.jsxs)(n.span,{className:`line`,children:[(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`{ `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:`"name"`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`"acme-skills"`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`, `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:`"version"`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`"0.1.0"`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`, `}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:`"skills"`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`: [`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`"skills"`}),(0,t.jsx)(n.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:`] }`})]})})})}),`
`,(0,t.jsxs)(n.p,{children:[`A shard can also ship skills next to its process (`,(0,t.jsx)(n.code,{children:`entrypoint`}),` + `,(0,t.jsx)(n.code,{children:`skills`}),`).`]}),`
`,(0,t.jsx)(n.h2,{id:`precedence`,children:`Precedence`}),`
`,(0,t.jsxs)(n.p,{children:[`When names collide, the first wins: workspace (`,(0,t.jsx)(n.code,{children:`.brokspace/skills/`}),`) >
installed shards > built-in. `,(0,t.jsx)(n.code,{children:`brok skill list`}),` reports shadowed skills.`]}),`
`,(0,t.jsx)(n.h2,{id:`credits`,children:`Credits`}),`
`,(0,t.jsxs)(n.p,{children:[`The built-in workflows are adapted from
`,(0,t.jsx)(n.a,{href:`https://github.com/mattpocock/skills`,children:`mattpocock/skills`}),` (MIT); see
`,(0,t.jsx)(n.a,{href:`https://github.com/brokspace/brok/blob/main/skills/CREDITS.md`,children:`skills/CREDITS.md`}),`.`]})]})}function s(e={}){let{wrapper:n}=e.components||{};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}export{r as _markdown,s as default,n as frontmatter,i as structuredData,a as toc};