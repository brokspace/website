import{t as e}from"./jsx-runtime-LKYXHABd.js";import{t}from"./ide-home-BItkCeoc.js";var n=e(),r={title:`Brokspace IDE`,description:`Uma IDE com o Brokspace embutido, para o modo IDE ao lado da CLI brok.`},i=`A Brokspace IDE é feita sobre o [Eclipse Theia](https://theia-ide.org),
então extensões do VS Code do [Open VSX](https://open-vsx.org) funcionam
nela. Ela já vem com o \`brok\` e o \`brok-agent\` e os coloca no seu \`PATH\`.

![Página inicial da Brokspace IDE](/images/ide-home.png)

## Instalação [#instalação]

<Tabs items={['macOS', 'Debian / Ubuntu', 'Linux (outros)', 'Windows']}>
  <Tab value="macOS">
    \`\`\`sh
    brew install --cask brokspace/tap/brokspace-ide
    \`\`\`
    Na primeira vez, abra com clique direito > **Abrir** enquanto o app ainda
    não é notarizado.
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
  <Tab value="Linux (outros)">
    Baixe o AppImage ou o \`.tar.gz\` da
    [versão mais recente](https://github.com/brokspace/ide/releases/latest).
  </Tab>
  <Tab value="Windows">
    Baixe \`BrokspaceIDE-<versão>-windows-x64-setup.exe\` da
    [versão mais recente](https://github.com/brokspace/ide/releases/latest).
    No SmartScreen, escolha **Mais informações > Executar assim mesmo**
    enquanto o instalador ainda não é assinado.
  </Tab>
</Tabs>

A IDE se atualiza sozinha pelo GitHub Releases. Para receber respostas
escritas você precisa de um LLM: veja [LLM local](/pt-br/docs/local-llm) (a
busca funciona sem ele).

## Seus primeiros minutos [#seus-primeiros-minutos]

A janela começa enxuta: Explorer, Busca, Controle de Código-Fonte e Brokspace
à esquerda, e o **agente Brokspace** fixo à direita. Depuração, Testes e
Extensões ficam a um atalho de distância.

1. **Abra uma pasta** (Arquivo > Abrir Pasta). Se ela ainda não tem um
   workspace Brokspace, a visão Brokspace oferece **Configurar Workspace**:
   ela roda \`brok init\` para você.
2. **Pergunte.** Digite uma pergunta na página inicial ou no painel do
   agente: o agente Brokspace responde com o seu LLM e cita as fontes usadas;
   clique em uma fonte para abrir o arquivo naquela linha. Perguntas de
   acompanhamento mantêm a conversa. Pressione \`Ctrl+Shift+A\`
   (\`Cmd+Shift+A\` no macOS) para o **modo foco no agente**, em que o agente
   ocupa a maior parte da janela.
3. **Busque.** A visão Brokspace (o "B" dobrado na barra de atividades)
   encontra código pelo significado ou pelo nome; clique em um resultado para
   abri-lo.
4. **Revise e faça commit.** Digite \`/review\` no chat (ou \`/review staged\`,
   \`/review base main\`). No Controle de Código-Fonte, o botão ✨ escreve a
   mensagem de commit a partir das alterações preparadas.

## A visão Brokspace [#a-visão-brokspace]

| Seção | O que mostra |
|---|---|
| **Visão Geral** | Se o Brokspace está rodando, o modelo, o índice, a busca e Perguntar / Revisar / Commit |
| **Shards** | Cada shard instalado e seu estado; expanda um para ver o que ele lê e escreve, se usa a rede, os programas que executa, os eventos que escuta e publica, e de onde veio. Instale, crie ou remova shards pela barra de ferramentas |
| **Skills** | Fluxos de trabalho que você executa e as skills que seus agentes usam; clique para executar |

## O agente Brokspace [#o-agente-brokspace]

Toda solicitação passa pelo \`brok\`, que a envia ao LLM definido em
\`.brokspace/brok.yml\` (Ollama, LM Studio ou uma API hospedada compatível com
OpenAI). Sem um LLM, ou quando ele não responde, o agente responde com o que
o índice local encontrou, em forma de links.

| Digite | Ele executa |
|---|---|
| Uma pergunta | \`brok ask\` com a conversa até aqui |
| \`/review\` | Uma revisão das suas alterações não commitadas |
| \`/review staged\` | Uma revisão das alterações preparadas |
| \`/review base <ref>\` | Uma revisão deste branch em relação a \`<ref>\` |
| \`/skill <nome> <entrada>\` | Uma skill no seu LLM, por exemplo \`/skill tdd adicionar um campo de prioridade\` |

## Comandos e idiomas [#comandos-e-idiomas]

Tudo também está no menu **Brokspace** e na paleta de comandos: Configurar
Workspace, Iniciar / Parar / Reiniciar, Reconstruir Índice, Diagnóstico,
Instalar, Criar e Remover Shard, Exportar Skills para Agentes de Código,
Executar Skill, Revisar, Escrever Mensagem de Commit. A barra de status
mostra se o Brokspace está rodando e qual modelo ele usa.

A IDE está em inglês e em português do Brasil. Ela começa em português em um
sistema em português; troque em **Idioma** na página inicial.

## Como funciona [#como-funciona]

A IDE conversa com o Brokspace apenas pela CLI \`brok\` e sua saída JSON (veja
[Integrações](/pt-br/docs/integrations)), então ela mostra exatamente o que o
\`brok\` vê, e tudo o que ela faz você também pode fazer em um terminal. Ela
precisa do brok 0.2.4 ou mais recente; o que vem com ela atende.
`,a={contents:[{heading:void 0,content:"A Brokspace IDE é feita sobre o Eclipse Theia,\nentão extensões do VS Code do Open VSX funcionam\nnela. Ela já vem com o `brok` e o `brok-agent` e os coloca no seu `PATH`."},{heading:`instalação`,content:`Na primeira vez, abra com clique direito > **Abrir** enquanto o app ainda
não é notarizado.`},{heading:`instalação`,content:"Baixe o AppImage ou o `.tar.gz` da\nversão mais recente."},{heading:`instalação`,content:`Baixe \`BrokspaceIDE-<versão>-windows-x64-setup.exe\` da
versão mais recente.
No SmartScreen, escolha **Mais informações > Executar assim mesmo**
enquanto o instalador ainda não é assinado.`},{heading:`instalação`,content:`A IDE se atualiza sozinha pelo GitHub Releases. Para receber respostas
escritas você precisa de um LLM: veja LLM local (a
busca funciona sem ele).`},{heading:`seus-primeiros-minutos`,content:`A janela começa enxuta: Explorer, Busca, Controle de Código-Fonte e Brokspace
à esquerda, e o **agente Brokspace** fixo à direita. Depuração, Testes e
Extensões ficam a um atalho de distância.`},{heading:`seus-primeiros-minutos`,content:`**Abra uma pasta** (Arquivo > Abrir Pasta). Se ela ainda não tem um
workspace Brokspace, a visão Brokspace oferece **Configurar Workspace**:
ela roda \`brok init\` para você.`},{heading:`seus-primeiros-minutos`,content:`**Pergunte.** Digite uma pergunta na página inicial ou no painel do
agente: o agente Brokspace responde com o seu LLM e cita as fontes usadas;
clique em uma fonte para abrir o arquivo naquela linha. Perguntas de
acompanhamento mantêm a conversa. Pressione \`Ctrl+Shift+A\`
(\`Cmd+Shift+A\` no macOS) para o **modo foco no agente**, em que o agente
ocupa a maior parte da janela.`},{heading:`seus-primeiros-minutos`,content:`**Busque.** A visão Brokspace (o "B" dobrado na barra de atividades)
encontra código pelo significado ou pelo nome; clique em um resultado para
abri-lo.`},{heading:`seus-primeiros-minutos`,content:"**Revise e faça commit.** Digite `/review` no chat (ou `/review staged`,\n`/review base main`). No Controle de Código-Fonte, o botão ✨ escreve a\nmensagem de commit a partir das alterações preparadas."},{heading:`a-visão-brokspace`,content:`| Seção           | O que mostra                                                                            |
| --------------- | --------------------------------------------------------------------------------------- |
| **Visão Geral** | Se o Brokspace está rodando, o modelo, o índice, a busca e Perguntar / Revisar / Commit |`,table:`table-0`},{heading:`a-visão-brokspace`,content:`| Seção      | O que mostra                                                                                                                                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shards** | Cada shard instalado e seu estado; expanda um para ver o que ele lê e escreve, se usa a rede, os programas que executa, os eventos que escuta e publica, e de onde veio. Instale, crie ou remova shards pela barra de ferramentas |`,table:`table-0`},{heading:`a-visão-brokspace`,content:`| Seção      | O que mostra                                                                                |
| ---------- | ------------------------------------------------------------------------------------------- |
| **Skills** | Fluxos de trabalho que você executa e as skills que seus agentes usam; clique para executar |`,table:`table-0`},{heading:`o-agente-brokspace`,content:"Toda solicitação passa pelo `brok`, que a envia ao LLM definido em\n`.brokspace/brok.yml` (Ollama, LM Studio ou uma API hospedada compatível com\nOpenAI). Sem um LLM, ou quando ele não responde, o agente responde com o que\no índice local encontrou, em forma de links."},{heading:`o-agente-brokspace`,content:`| Digite       | Ele executa                        |
| ------------ | ---------------------------------- |
| Uma pergunta | \`brok ask\` com a conversa até aqui |`,table:`table-1`},{heading:`o-agente-brokspace`,content:`| Digite    | Ele executa                                    |
| --------- | ---------------------------------------------- |
| \`/review\` | Uma revisão das suas alterações não commitadas |`,table:`table-1`},{heading:`o-agente-brokspace`,content:`| Digite           | Ele executa                           |
| ---------------- | ------------------------------------- |
| \`/review staged\` | Uma revisão das alterações preparadas |`,table:`table-1`},{heading:`o-agente-brokspace`,content:"| Digite               | Ele executa                                   |\n| -------------------- | --------------------------------------------- |\n| `/review base <ref>` | Uma revisão deste branch em relação a `<ref>` |",table:`table-1`},{heading:`o-agente-brokspace`,content:"| Digite                    | Ele executa                                                                     |\n| ------------------------- | ------------------------------------------------------------------------------- |\n| `/skill <nome> <entrada>` | Uma skill no seu LLM, por exemplo `/skill tdd adicionar um campo de prioridade` |",table:`table-1`},{heading:`comandos-e-idiomas`,content:`Tudo também está no menu **Brokspace** e na paleta de comandos: Configurar
Workspace, Iniciar / Parar / Reiniciar, Reconstruir Índice, Diagnóstico,
Instalar, Criar e Remover Shard, Exportar Skills para Agentes de Código,
Executar Skill, Revisar, Escrever Mensagem de Commit. A barra de status
mostra se o Brokspace está rodando e qual modelo ele usa.`},{heading:`comandos-e-idiomas`,content:`A IDE está em inglês e em português do Brasil. Ela começa em português em um
sistema em português; troque em **Idioma** na página inicial.`},{heading:`como-funciona`,content:"A IDE conversa com o Brokspace apenas pela CLI `brok` e sua saída JSON (veja\nIntegrações), então ela mostra exatamente o que o\n`brok` vê, e tudo o que ela faz você também pode fazer em um terminal. Ela\nprecisa do brok 0.2.4 ou mais recente; o que vem com ela atende."}],headings:[{id:`instalação`,content:`Instalação`},{id:`seus-primeiros-minutos`,content:`Seus primeiros minutos`},{id:`a-visão-brokspace`,content:`A visão Brokspace`},{id:`o-agente-brokspace`,content:`O agente Brokspace`},{id:`comandos-e-idiomas`,content:`Comandos e idiomas`},{id:`como-funciona`,content:`Como funciona`}]},o=[{depth:2,url:`#instalação`,title:(0,n.jsx)(n.Fragment,{children:`Instalação`})},{depth:2,url:`#seus-primeiros-minutos`,title:(0,n.jsx)(n.Fragment,{children:`Seus primeiros minutos`})},{depth:2,url:`#a-visão-brokspace`,title:(0,n.jsx)(n.Fragment,{children:`A visão Brokspace`})},{depth:2,url:`#o-agente-brokspace`,title:(0,n.jsx)(n.Fragment,{children:`O agente Brokspace`})},{depth:2,url:`#comandos-e-idiomas`,title:(0,n.jsx)(n.Fragment,{children:`Comandos e idiomas`})},{depth:2,url:`#como-funciona`,title:(0,n.jsx)(n.Fragment,{children:`Como funciona`})}];function s(e){let r={a:`a`,code:`code`,h2:`h2`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...e.components},{Tab:i,Tabs:a}=r;return i||l(`Tab`,!0),a||l(`Tabs`,!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[`A Brokspace IDE é feita sobre o `,(0,n.jsx)(r.a,{href:`https://theia-ide.org`,children:`Eclipse Theia`}),`,
então extensões do VS Code do `,(0,n.jsx)(r.a,{href:`https://open-vsx.org`,children:`Open VSX`}),` funcionam
nela. Ela já vem com o `,(0,n.jsx)(r.code,{children:`brok`}),` e o `,(0,n.jsx)(r.code,{children:`brok-agent`}),` e os coloca no seu `,(0,n.jsx)(r.code,{children:`PATH`}),`.`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{alt:`Página inicial da Brokspace IDE`,src:t})}),`
`,(0,n.jsx)(r.h2,{id:`instalação`,children:`Instalação`}),`
`,(0,n.jsxs)(a,{items:[`macOS`,`Debian / Ubuntu`,`Linux (outros)`,`Windows`],children:[(0,n.jsxs)(i,{value:`macOS`,children:[(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(r.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,n.jsx)(r.code,{children:(0,n.jsxs)(r.span,{className:`line`,children:[(0,n.jsx)(r.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`brew`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` install`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` --cask`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` brokspace/tap/brokspace-ide`})]})})})}),(0,n.jsxs)(r.p,{children:[`Na primeira vez, abra com clique direito > `,(0,n.jsx)(r.strong,{children:`Abrir`}),` enquanto o app ainda
não é notarizado.`]})]}),(0,n.jsx)(i,{value:`Debian / Ubuntu`,children:(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(r.pre,{className:`shiki shiki-themes github-light github-dark`,style:{"--shiki-light":`#24292e`,"--shiki-dark":`#e1e4e8`,"--shiki-light-bg":`#fff`,"--shiki-dark-bg":`#24292e`},tabIndex:`0`,icon:`<svg viewBox="0 0 24 24"><path d="m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z" fill="currentColor" /></svg>`,children:(0,n.jsxs)(r.code,{children:[(0,n.jsxs)(r.span,{className:`line`,children:[(0,n.jsx)(r.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`curl`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` -fsSL`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` https://brokspace.github.io/apt/brokspace-archive-keyring.gpg`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` \\`})]}),`
`,(0,n.jsxs)(r.span,{className:`line`,children:[(0,n.jsx)(r.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:`  |`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:` sudo`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` tee`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` /usr/share/keyrings/brokspace-archive-keyring.gpg`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:` >`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:`/dev/null`})]}),`
`,(0,n.jsxs)(r.span,{className:`line`,children:[(0,n.jsx)(r.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:`echo`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` "deb [signed-by=/usr/share/keyrings/brokspace-archive-keyring.gpg] https://brokspace.github.io/apt stable main"`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#005CC5`,"--shiki-dark":`#79B8FF`},children:` \\`})]}),`
`,(0,n.jsxs)(r.span,{className:`line`,children:[(0,n.jsx)(r.span,{style:{"--shiki-light":`#D73A49`,"--shiki-dark":`#F97583`},children:`  |`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:` sudo`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` tee`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` /etc/apt/sources.list.d/brokspace.list`})]}),`
`,(0,n.jsxs)(r.span,{className:`line`,children:[(0,n.jsx)(r.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`sudo`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` apt`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` update`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#24292E`,"--shiki-dark":`#E1E4E8`},children:` && `}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#6F42C1`,"--shiki-dark":`#B392F0`},children:`sudo`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` apt`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` install`}),(0,n.jsx)(r.span,{style:{"--shiki-light":`#032F62`,"--shiki-dark":`#9ECBFF`},children:` brokspace-ide`})]})]})})})}),(0,n.jsx)(i,{value:`Linux (outros)`,children:(0,n.jsxs)(r.p,{children:[`Baixe o AppImage ou o `,(0,n.jsx)(r.code,{children:`.tar.gz`}),` da
`,(0,n.jsx)(r.a,{href:`https://github.com/brokspace/ide/releases/latest`,children:`versão mais recente`}),`.`]})}),(0,n.jsx)(i,{value:`Windows`,children:(0,n.jsxs)(r.p,{children:[`Baixe `,(0,n.jsx)(r.code,{children:`BrokspaceIDE-<versão>-windows-x64-setup.exe`}),` da
`,(0,n.jsx)(r.a,{href:`https://github.com/brokspace/ide/releases/latest`,children:`versão mais recente`}),`.
No SmartScreen, escolha `,(0,n.jsx)(r.strong,{children:`Mais informações > Executar assim mesmo`}),`
enquanto o instalador ainda não é assinado.`]})})]}),`
`,(0,n.jsxs)(r.p,{children:[`A IDE se atualiza sozinha pelo GitHub Releases. Para receber respostas
escritas você precisa de um LLM: veja `,(0,n.jsx)(r.a,{href:`/pt-br/docs/local-llm`,children:`LLM local`}),` (a
busca funciona sem ele).`]}),`
`,(0,n.jsx)(r.h2,{id:`seus-primeiros-minutos`,children:`Seus primeiros minutos`}),`
`,(0,n.jsxs)(r.p,{children:[`A janela começa enxuta: Explorer, Busca, Controle de Código-Fonte e Brokspace
à esquerda, e o `,(0,n.jsx)(r.strong,{children:`agente Brokspace`}),` fixo à direita. Depuração, Testes e
Extensões ficam a um atalho de distância.`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Abra uma pasta`}),` (Arquivo > Abrir Pasta). Se ela ainda não tem um
workspace Brokspace, a visão Brokspace oferece `,(0,n.jsx)(r.strong,{children:`Configurar Workspace`}),`:
ela roda `,(0,n.jsx)(r.code,{children:`brok init`}),` para você.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Pergunte.`}),` Digite uma pergunta na página inicial ou no painel do
agente: o agente Brokspace responde com o seu LLM e cita as fontes usadas;
clique em uma fonte para abrir o arquivo naquela linha. Perguntas de
acompanhamento mantêm a conversa. Pressione `,(0,n.jsx)(r.code,{children:`Ctrl+Shift+A`}),`
(`,(0,n.jsx)(r.code,{children:`Cmd+Shift+A`}),` no macOS) para o `,(0,n.jsx)(r.strong,{children:`modo foco no agente`}),`, em que o agente
ocupa a maior parte da janela.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Busque.`}),` A visão Brokspace (o "B" dobrado na barra de atividades)
encontra código pelo significado ou pelo nome; clique em um resultado para
abri-lo.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Revise e faça commit.`}),` Digite `,(0,n.jsx)(r.code,{children:`/review`}),` no chat (ou `,(0,n.jsx)(r.code,{children:`/review staged`}),`,
`,(0,n.jsx)(r.code,{children:`/review base main`}),`). No Controle de Código-Fonte, o botão ✨ escreve a
mensagem de commit a partir das alterações preparadas.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{id:`a-visão-brokspace`,children:`A visão Brokspace`}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Seção`}),(0,n.jsx)(r.th,{children:`O que mostra`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.strong,{children:`Visão Geral`})}),(0,n.jsx)(r.td,{children:`Se o Brokspace está rodando, o modelo, o índice, a busca e Perguntar / Revisar / Commit`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.strong,{children:`Shards`})}),(0,n.jsx)(r.td,{children:`Cada shard instalado e seu estado; expanda um para ver o que ele lê e escreve, se usa a rede, os programas que executa, os eventos que escuta e publica, e de onde veio. Instale, crie ou remova shards pela barra de ferramentas`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.strong,{children:`Skills`})}),(0,n.jsx)(r.td,{children:`Fluxos de trabalho que você executa e as skills que seus agentes usam; clique para executar`})]})]})]}),`
`,(0,n.jsx)(r.h2,{id:`o-agente-brokspace`,children:`O agente Brokspace`}),`
`,(0,n.jsxs)(r.p,{children:[`Toda solicitação passa pelo `,(0,n.jsx)(r.code,{children:`brok`}),`, que a envia ao LLM definido em
`,(0,n.jsx)(r.code,{children:`.brokspace/brok.yml`}),` (Ollama, LM Studio ou uma API hospedada compatível com
OpenAI). Sem um LLM, ou quando ele não responde, o agente responde com o que
o índice local encontrou, em forma de links.`]}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`Digite`}),(0,n.jsx)(r.th,{children:`Ele executa`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`Uma pergunta`}),(0,n.jsxs)(r.td,{children:[(0,n.jsx)(r.code,{children:`brok ask`}),` com a conversa até aqui`]})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`/review`})}),(0,n.jsx)(r.td,{children:`Uma revisão das suas alterações não commitadas`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`/review staged`})}),(0,n.jsx)(r.td,{children:`Uma revisão das alterações preparadas`})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`/review base <ref>`})}),(0,n.jsxs)(r.td,{children:[`Uma revisão deste branch em relação a `,(0,n.jsx)(r.code,{children:`<ref>`})]})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`/skill <nome> <entrada>`})}),(0,n.jsxs)(r.td,{children:[`Uma skill no seu LLM, por exemplo `,(0,n.jsx)(r.code,{children:`/skill tdd adicionar um campo de prioridade`})]})]})]})]}),`
`,(0,n.jsx)(r.h2,{id:`comandos-e-idiomas`,children:`Comandos e idiomas`}),`
`,(0,n.jsxs)(r.p,{children:[`Tudo também está no menu `,(0,n.jsx)(r.strong,{children:`Brokspace`}),` e na paleta de comandos: Configurar
Workspace, Iniciar / Parar / Reiniciar, Reconstruir Índice, Diagnóstico,
Instalar, Criar e Remover Shard, Exportar Skills para Agentes de Código,
Executar Skill, Revisar, Escrever Mensagem de Commit. A barra de status
mostra se o Brokspace está rodando e qual modelo ele usa.`]}),`
`,(0,n.jsxs)(r.p,{children:[`A IDE está em inglês e em português do Brasil. Ela começa em português em um
sistema em português; troque em `,(0,n.jsx)(r.strong,{children:`Idioma`}),` na página inicial.`]}),`
`,(0,n.jsx)(r.h2,{id:`como-funciona`,children:`Como funciona`}),`
`,(0,n.jsxs)(r.p,{children:[`A IDE conversa com o Brokspace apenas pela CLI `,(0,n.jsx)(r.code,{children:`brok`}),` e sua saída JSON (veja
`,(0,n.jsx)(r.a,{href:`/pt-br/docs/integrations`,children:`Integrações`}),`), então ela mostra exatamente o que o
`,(0,n.jsx)(r.code,{children:`brok`}),` vê, e tudo o que ela faz você também pode fazer em um terminal. Ela
precisa do brok 0.2.4 ou mais recente; o que vem com ela atende.`]})]})}function c(e={}){let{wrapper:t}=e.components||{};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{i as _markdown,c as default,r as frontmatter,a as structuredData,o as toc};