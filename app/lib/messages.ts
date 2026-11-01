import type { Lang } from './i18n';

/**
 * Every string of the landing page and the site chrome, in English and
 * Brazilian Portuguese. `pt-br` must have the same shape as `en`: the type
 * makes a missing translation a build error.
 */
const en = {
  meta: {
    description:
      'Local-first search, agents and skills for every developer. Brokspace indexes your repositories on your machine and gives your LLM and your coding agents the context they need.',
  },
  tagline: 'Your workspace, understood.',
  pitch: 'Local-first search, agents and skills for every developer.',
  nav: {
    skip: 'Skip to content',
    main: 'Main',
    home: 'Brokspace home',
    docs: 'Docs',
    ide: 'IDE',
    hub: 'Hub',
    soon: 'Soon',
    getStarted: 'Get started',
    language: 'Language',
  },
  stars: {
    star: 'Star',
    onGitHub: 'Brokspace on GitHub',
    label: (n: number) => `Star Brokspace on GitHub, ${n} stars`,
  },
  hero: {
    badge: 'New',
    announcement: 'Brokspace IDE: the same workspace, in an IDE',
    titleTop: 'Your workspace,',
    titleAccent: 'understood.',
    lead: 'Brokspace indexes every repository you work in, on your machine, and gives you, your LLM and your coding agents the context they are missing.',
    cta: 'Get started',
  },
  worksWith: {
    title: 'Works with',
    anyApi: 'any OpenAI-compatible API',
  },
  features: {
    eyebrow: 'What it does',
    title: 'Context, everywhere you work.',
    lead: 'One local index of your code, shared by the terminal, the IDE, your LLM and every coding agent you use.',
    search: {
      title: 'Search that reads code like you do',
      body: 'Functions, classes and doc sections are indexed whole, then found by meaning or by name: hybrid BM25 and semantic search over one repository, its submodules, or a folder full of them.',
    },
    answers: {
      title: 'Answers that cite their sources',
      body: 'Ask Ollama, LM Studio or any OpenAI-compatible model about your workspace. Every answer lists the code it was built from.',
    },
    agents: {
      title: 'Context for the agents you already use',
      body: 'One command gives Claude Code, Cursor, Copilot and Codex a search tool over MCP, plus your skills.',
    },
    review: {
      title: 'Reviews and commit messages',
      body: 'A first-pass review of your uncommitted, staged or branch changes, and the commit message written from the staged diff.',
    },
    skills: {
      title: '20 skills, built in',
      body: 'Proven workflows your LLM and your agents follow. Write your own in a SKILL.md and share it with your team.',
    },
    shards: {
      title: 'Shards: your workspace, programmable',
      body: 'Small programs in any language that react to workspace events on a local bus, each limited to the files, programs and network it declares up front. Start from the template, share them as git repositories.',
    },
  },
  localFirst: {
    eyebrow: 'Local-first',
    titleTop: 'Nothing leaves your machine.',
    titleBottom: 'Unless you say so.',
    lead: 'Brokspace runs next to your code. Your repositories are never sent anywhere to be indexed, and answers come from the model you point it at.',
    points: [
      {
        title: 'Indexed on your machine',
        body: 'The index lives in .brokspace/, next to your code. No account, no upload, works offline.',
      },
      {
        title: 'The model you choose',
        body: 'A local model by default. A hosted one only when you pick it, even for a single question.',
      },
      {
        title: 'Always up to date',
        body: 'Saves, commits, pulls and branch switches reach the index within seconds.',
      },
    ],
  },
  modes: {
    eyebrow: 'CLI mode, IDE mode',
    title: 'One workspace. Two ways in.',
    lead: 'Use brok in any terminal and editor, or open the same workspace in Brokspace IDE. Both read the same .brokspace/ folder, so you can switch at any time.',
    cliBody: 'Every feature, scriptable, with JSON output for your own tools.',
    commands: {
      search: 'find code by meaning or by name',
      ask: 'an answer, with sources',
      chat: 'follow-up questions',
      review: 'review your changes',
      commit: 'write the commit message',
      skill: 'run a workflow',
      shard: 'add an integration',
    },
    gettingStarted: 'Getting started',
    ideBody:
      'Built on Eclipse Theia, with brok inside: start from a question, chat with the Brokspace agent, manage shards, review and commit in a click. In English and Portuguese.',
    platforms: 'macOS, Linux and Windows',
    ideAlt: 'Brokspace IDE home page, with a question box and the Brokspace view in the sidebar',
  },
  getStarted: {
    eyebrow: 'Get started',
    title: 'Three commands to a workspace that answers back.',
    lead: 'About fifteen minutes from zero, including a local model. Search works right away, even without one.',
    install: 'Install brok',
    setup: 'Set up your workspace',
    setupNote:
      'Six guided steps: it picks a model that fits your machine, indexes your code and connects your coding agents. It asks before anything big.',
    ask: 'Ask away',
    askCommand: 'brok ask "how does the refresh flow work?"',
    askNoteBefore: 'Or',
    askNoteAfter: 'The index follows your edits from now on.',
  },
  install: {
    tabs: 'Install options',
    unix: 'Installs brok and brok-agent and verifies their checksums.',
    windows: 'In PowerShell. Script blocked by IT? The getting started guide has a manual install.',
    cargo: 'Needs a C compiler and protoc. Add --no-default-features for a text-search-only build.',
    ide: 'Brokspace IDE bundles brok. Also on apt, and as a Windows installer.',
    ideLink: 'All IDE installers',
    manual: 'Manual install',
    releaseNotes: 'Release notes',
  },
  openSource: {
    title: 'Built in the open.',
    lead: 'MIT or Apache-2.0, developed on GitHub. Star the project, open an issue, ask in Discussions, or build a shard.',
    discuss: 'Join the discussion',
    repos: {
      brok: 'The CLI: index, search, ask, review, skills and shards.',
      agent: 'The helper that tracks changes and talks to the LLM.',
      sdk: 'Rust SDK and protocol for the event bus.',
      shardTemplate: 'Start a new shard in minutes.',
      ide: 'Brokspace IDE, built on Eclipse Theia.',
      example: 'A sample project to try Brokspace on.',
    },
  },
  footer: {
    product: 'Product',
    build: 'Build',
    community: 'Community',
    docs: 'Docs',
    gettingStarted: 'Getting started',
    ide: 'Brokspace IDE',
    hub: 'Shard Hub',
    skills: 'Skills',
    shards: 'Shards',
    integrations: 'Integrations',
    discussions: 'Discussions',
    releases: 'Releases',
    license: 'Code under MIT or Apache-2.0.',
  },
  copy: { copy: 'Copy to clipboard', copied: 'Copied' },
  docs: {
    untranslated: 'This page is not translated yet; it is shown in English.',
  },
};

export type Messages = typeof en;

const ptBr: Messages = {
  meta: {
    description:
      'Busca, agentes e skills local-first para todo desenvolvedor. O Brokspace indexa seus repositórios na sua máquina e dá ao seu LLM e aos seus agentes de código o contexto de que precisam.',
  },
  tagline: 'Seu workspace, compreendido.',
  pitch: 'Busca, agentes e skills local-first para todo desenvolvedor.',
  nav: {
    skip: 'Pular para o conteúdo',
    main: 'Principal',
    home: 'Início do Brokspace',
    docs: 'Docs',
    ide: 'IDE',
    hub: 'Hub',
    soon: 'Em breve',
    getStarted: 'Começar',
    language: 'Idioma',
  },
  stars: {
    star: 'Star',
    onGitHub: 'Brokspace no GitHub',
    label: (n: number) => `Dê uma estrela ao Brokspace no GitHub, ${n} estrelas`,
  },
  hero: {
    badge: 'Novo',
    announcement: 'Brokspace IDE: o mesmo workspace, em uma IDE',
    titleTop: 'Seu workspace,',
    titleAccent: 'compreendido.',
    lead: 'O Brokspace indexa cada repositório em que você trabalha, na sua máquina, e dá a você, ao seu LLM e aos seus agentes de código o contexto que falta.',
    cta: 'Começar',
  },
  worksWith: {
    title: 'Funciona com',
    anyApi: 'qualquer API compatível com OpenAI',
  },
  features: {
    eyebrow: 'O que ele faz',
    title: 'Contexto, onde quer que você trabalhe.',
    lead: 'Um único índice local do seu código, compartilhado pelo terminal, pela IDE, pelo seu LLM e por todos os agentes de código que você usa.',
    search: {
      title: 'Busca que lê código como você',
      body: 'Funções, classes e seções de documentação são indexadas inteiras e encontradas pelo significado ou pelo nome: busca híbrida BM25 e semântica em um repositório, nos seus submódulos ou em uma pasta cheia deles.',
    },
    answers: {
      title: 'Respostas que citam as fontes',
      body: 'Pergunte ao Ollama, ao LM Studio ou a qualquer modelo compatível com OpenAI sobre o seu workspace. Toda resposta lista o código de onde veio.',
    },
    agents: {
      title: 'Contexto para os agentes que você já usa',
      body: 'Um comando dá ao Claude Code, Cursor, Copilot e Codex uma ferramenta de busca via MCP, além das suas skills.',
    },
    review: {
      title: 'Revisões e mensagens de commit',
      body: 'Uma primeira revisão das suas alterações não commitadas, preparadas ou do branch, e a mensagem de commit escrita a partir do diff preparado.',
    },
    skills: {
      title: '20 skills, já incluídas',
      body: 'Fluxos de trabalho comprovados que seu LLM e seus agentes seguem. Escreva as suas em um SKILL.md e compartilhe com o time.',
    },
    shards: {
      title: 'Shards: seu workspace, programável',
      body: 'Pequenos programas em qualquer linguagem que reagem a eventos do workspace em um barramento local, cada um limitado aos arquivos, programas e rede que declara de antemão. Comece pelo template e compartilhe como repositórios git.',
    },
  },
  localFirst: {
    eyebrow: 'Local-first',
    titleTop: 'Nada sai da sua máquina.',
    titleBottom: 'A menos que você queira.',
    lead: 'O Brokspace roda ao lado do seu código. Seus repositórios nunca são enviados a lugar nenhum para indexação, e as respostas vêm do modelo que você escolher.',
    points: [
      {
        title: 'Indexado na sua máquina',
        body: 'O índice fica em .brokspace/, ao lado do seu código. Sem conta, sem upload, funciona offline.',
      },
      {
        title: 'O modelo que você escolhe',
        body: 'Um modelo local por padrão. Um hospedado só quando você escolher, até para uma única pergunta.',
      },
      {
        title: 'Sempre atualizado',
        body: 'Salvamentos, commits, pulls e trocas de branch chegam ao índice em segundos.',
      },
    ],
  },
  modes: {
    eyebrow: 'Modo CLI, modo IDE',
    title: 'Um workspace. Duas portas de entrada.',
    lead: 'Use o brok em qualquer terminal e editor, ou abra o mesmo workspace na Brokspace IDE. Os dois leem a mesma pasta .brokspace/, então você pode alternar a qualquer momento.',
    cliBody: 'Todos os recursos, scriptáveis, com saída JSON para as suas ferramentas.',
    commands: {
      search: 'encontre código pelo significado ou pelo nome',
      ask: 'uma resposta, com fontes',
      chat: 'perguntas de acompanhamento',
      review: 'revise suas alterações',
      commit: 'escreva a mensagem de commit',
      skill: 'execute um fluxo de trabalho',
      shard: 'adicione uma integração',
    },
    gettingStarted: 'Primeiros passos',
    ideBody:
      'Feita sobre o Eclipse Theia, com o brok dentro: comece por uma pergunta, converse com o agente Brokspace, gerencie shards, revise e faça commit em um clique. Em português e inglês.',
    platforms: 'macOS, Linux e Windows',
    ideAlt: 'Página inicial da Brokspace IDE, com uma caixa de pergunta e a visão Brokspace na barra lateral',
  },
  getStarted: {
    eyebrow: 'Começar',
    title: 'Três comandos até um workspace que responde.',
    lead: 'Cerca de quinze minutos do zero, incluindo um modelo local. A busca funciona na hora, mesmo sem ele.',
    install: 'Instale o brok',
    setup: 'Configure seu workspace',
    setupNote:
      'Seis passos guiados: ele escolhe um modelo adequado à sua máquina, indexa seu código e conecta seus agentes de código. Pergunta antes de qualquer coisa grande.',
    ask: 'Pergunte',
    askCommand: 'brok ask "como funciona o fluxo de refresh?"',
    askNoteBefore: 'Ou',
    askNoteAfter: 'A partir de agora, o índice acompanha suas edições.',
  },
  install: {
    tabs: 'Opções de instalação',
    unix: 'Instala o brok e o brok-agent e verifica os checksums.',
    windows: 'No PowerShell. Script bloqueado pela TI? O guia de primeiros passos tem uma instalação manual.',
    cargo:
      'Precisa de um compilador C e do protoc. Use --no-default-features para uma versão só com busca textual.',
    ide: 'A Brokspace IDE já inclui o brok. Também no apt e como instalador para Windows.',
    ideLink: 'Todos os instaladores da IDE',
    manual: 'Instalação manual',
    releaseNotes: 'Notas da versão',
  },
  openSource: {
    title: 'Feito em código aberto.',
    lead: 'MIT ou Apache-2.0, desenvolvido no GitHub. Dê uma estrela, abra uma issue, pergunte nas Discussions ou crie um shard.',
    discuss: 'Participe da conversa',
    repos: {
      brok: 'A CLI: índice, busca, perguntas, revisão, skills e shards.',
      agent: 'O auxiliar que acompanha as alterações e conversa com o LLM.',
      sdk: 'SDK em Rust e protocolo do barramento de eventos.',
      shardTemplate: 'Comece um shard novo em minutos.',
      ide: 'Brokspace IDE, feita sobre o Eclipse Theia.',
      example: 'Um projeto de exemplo para experimentar o Brokspace.',
    },
  },
  footer: {
    product: 'Produto',
    build: 'Construir',
    community: 'Comunidade',
    docs: 'Docs',
    gettingStarted: 'Primeiros passos',
    ide: 'Brokspace IDE',
    hub: 'Shard Hub',
    skills: 'Skills',
    shards: 'Shards',
    integrations: 'Integrações',
    discussions: 'Discussions',
    releases: 'Versões',
    license: 'Código sob MIT ou Apache-2.0.',
  },
  copy: { copy: 'Copiar para a área de transferência', copied: 'Copiado' },
  docs: {
    untranslated: 'Esta página ainda não foi traduzida; ela aparece em inglês.',
  },
};

const messages: Record<Lang, Messages> = { en, 'pt-br': ptBr };

export function t(lang: Lang): Messages {
  return messages[lang];
}

/** Fumadocs UI (search, sidebar, table of contents, page actions) in Portuguese. */
export const uiPtBr: Record<string, string> = {
  displayName: 'Português (Brasil)',
  'Ask AI(AI chat button)': 'Perguntar à IA',
  'Back to Home(404 not found page)': 'Voltar ao início',
  'Choose a language(language switcher)': 'Escolha um idioma',
  'Choose a language(language switcher)(aria-label)': 'Escolha um idioma',
  'Close Banner(banner)(aria-label)': 'Fechar aviso',
  'Close Search(search dialog)(aria-label)': 'Fechar busca',
  'Close Sidebar(aria-label)': 'Fechar barra lateral',
  'Close Sidebar(sidebar)(aria-label)': 'Fechar barra lateral',
  'Close(image zoom)(aria-label)': 'Fechar',
  'Collapse Sidebar(sidebar)(aria-label)': 'Recolher barra lateral',
  'Copied Anchor Link(heading anchor)(aria-label)': 'Link da seção copiado',
  'Copied Link(accordion)(aria-label)': 'Link copiado',
  'Copied Markdown(page actions)': 'Markdown copiado',
  'Copied Text(code block)(aria-label)': 'Texto copiado',
  'Copy Anchor Link(heading anchor)(aria-label)': 'Copiar link da seção',
  'Copy Link(accordion)(aria-label)': 'Copiar link',
  'Copy Markdown(page actions)': 'Copiar Markdown',
  'Copy Text(code block)(aria-label)': 'Copiar texto',
  'Dark(theme switcher)(aria-label)': 'Escuro',
  'Default(type table)': 'Padrão',
  'Edit on GitHub(edit page)': 'Editar no GitHub',
  'Hide Sidebar(sidebar)': 'Ocultar barra lateral',
  'Image Viewer(image zoom)(aria-label)': 'Visualizador de imagens',
  'Language(language switcher)': 'Idioma',
  'Last updated on(page footer)': 'Atualizado em',
  'Layout Tab(layout tab trigger)': 'Aba de layout',
  'Light(theme switcher)(aria-label)': 'Claro',
  'Next Image(image zoom)(aria-label)': 'Próxima imagem',
  'Next Page(pagination)': 'Próxima página',
  'No Headings(table of contents)': 'Sem seções',
  'No results found(search dialog)': 'Nenhum resultado encontrado',
  'On this page(table of contents)': 'Nesta página',
  'Open Search(search trigger)(aria-label)': 'Abrir busca',
  'Open Sidebar(aria-label)': 'Abrir barra lateral',
  'Open Sidebar(sidebar)(aria-label)': 'Abrir barra lateral',
  'Open in ChatGPT(page actions)': 'Abrir no ChatGPT',
  'Open in Claude(page actions)': 'Abrir no Claude',
  'Open in Cursor(page actions)': 'Abrir no Cursor',
  'Open in GitHub(page actions)': 'Abrir no GitHub',
  'Open in Scira AI(page actions)': 'Abrir no Scira AI',
  'Open(page actions)': 'Abrir',
  'Options(aria-label)': 'Opções',
  'Page Not Found(404 not found page)': 'Página não encontrada',
  'Parameters(type table)': 'Parâmetros',
  'Previous Image(image zoom)(aria-label)': 'Imagem anterior',
  'Previous Page(pagination)': 'Página anterior',
  'Prop(type table)': 'Propriedade',
  'Read {url}, I want to ask questions about it.(page actions)':
    'Leia {url}, quero fazer perguntas sobre ela.',
  'Returns(type table)': 'Retorna',
  'Search failed(search dialog)': 'A busca falhou',
  'Search failed, showing results for {query}(search dialog)':
    'A busca falhou; mostrando resultados para {query}',
  'Search(search dialog)': 'Buscar',
  'Search(search trigger)': 'Buscar',
  'Show Sidebar(sidebar)': 'Mostrar barra lateral',
  'System(theme switcher)(aria-label)': 'Sistema',
  'Table of Contents(inline table of contents)': 'Sumário',
  'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 not found page)':
    'A página que você procura pode ter sido removida, mudado de nome ou estar temporariamente indisponível.',
  'Theme(site menu)': 'Tema',
  'Toggle Menu(home layout header)(aria-label)': 'Abrir ou fechar menu',
  'Toggle Theme(theme switcher)(aria-label)': 'Alternar tema',
  'Type(type table)': 'Tipo',
  'View as Markdown(page actions)': 'Ver como Markdown',
};
