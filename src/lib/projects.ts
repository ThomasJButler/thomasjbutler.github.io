import { MEDIA } from './assets';

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  topics: string[];
  language: string;
  category: 'ai' | 'web' | 'mobile' | 'games' | 'portfolio';
  links: {
    demo?: string;
    github?: string;
    video?: string;
    /** A pre-launch signup page, for a project with no live build yet. */
    waitlist?: string;
    /** The company behind the project, when that's worth naming separately from the repo. */
    company?: string;
  };
  images?: {
    cover?: string;
    gallery?: string[];
  };
  /**
   * Short embedded clips (mp4) shown with controls in the modal's Demo section.
   *
   * A bare string is a clip with no poster, which is what the earlier entries are. The
   * object form adds a poster frame, which matters when a clip opens on a near-black frame:
   * without one the player is an empty black box until someone presses play. It stays a
   * union so those existing string entries remain valid instead of needing a migration.
   */
  videos?: Array<string | { src: string; poster?: string }>;
  /**
   * The "Under the hood" block in the detail modal: how the thing actually works.
   *
   * The three parts are one argument in sequence, which is why they are grouped rather than
   * three loose fields. The loop shows the mechanic moving (ISQ's confidence rows flagging
   * amber, The Kicker's probability split), the diagram shows where the data goes, and the
   * wireframe shows the screen it all lands on. The loop is a brand animation, not a
   * screen recording, which is what separates it from `videos` above.
   */
  underTheHood?: {
    loop?: { src: string; poster: string; caption: string };
    diagram?: { src: string; caption: string };
    wireframe?: { src: string; caption: string };
  };
  /**
   * One shot per item, for a project that is a collection rather than a single thing.
   *
   * Only The Matrix Arcade uses this: it is twelve games behind one cabinet, and a roster is
   * the honest way to show that. Separate from `images.gallery` because these are not
   * screenshots OF the product, they ARE the product, and because they are 1.6:1 captures
   * that must not be cropped into the gallery's 16:9 grid.
   */
  games?: Array<{ src: string; title: string }>;
  featured?: boolean;
  status?: 'completed' | 'in-progress' | 'coming-soon';
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: 'modelviz',
    name: 'ModelViz',
    description: 'Compare AI models across providers with real-time metrics, cost analysis, and 3D visualisations.',
    longDescription:
      'Interactive analytics platform for comparing AI models across OpenAI, Anthropic, Google (Gemini) and Perplexity. Test prompts across several models at once, then watch the meter: cost per provider, token efficiency, latency and uptime, all in one dashboard. Your API keys live in your own browser and the usage history stays there too, in IndexedDB, on a 90-day retention policy. Three of the four providers refuse a browser origin, so those calls are relayed by the app’s own routes: the key travels with the request and is never stored.',
    // Stack checked against the repo. Next.js is on 16 and React on 19, so the versions are
    // named the way the other entries name theirs. The 3D is real (`ForceGraph3D` in
    // components/visualisations/network-3d.tsx) but it arrives via react-force-graph-3d;
    // @react-three/fiber is in package.json and never imported, so "R3F" would be a claim
    // about a dependency rather than about the app.
    topics: ['Next.js 16', 'React 19', 'TypeScript', 'Three.js'],
    language: 'TypeScript',
    category: 'ai',
    links: { demo: 'https://modelviz.vercel.app/', github: 'https://github.com/ThomasJButler/ModelViz' },
    images: {
      cover: MEDIA.modelviz.cover,
      // Four real screenshots plus the how-it-works tile. This replaced the 5.5MB GIF that was
      // the last legacy one on the site.
      gallery: MEDIA.modelviz.gallery,
    },
    underTheHood: {
      diagram: {
        src: MEDIA.modelviz.diagram,
        // Says "relayed", not "direct", because for three of the four providers it is. The
        // first version of this diagram claimed keys never touch a server, which is true of
        // OpenAI only: Anthropic, Google and Perplexity refuse a browser origin, so those go
        // through ModelViz's own stateless route. Amber stays on the provider call, which is
        // the metered boundary; the relay is green because it is still your own code.
        caption:
          'Keys are stored only in your browser. Three of the four providers will not take a call from one, so those requests are relayed, and the amber step is the only place the meter runs.',
      },
      wireframe: {
        src: MEDIA.modelviz.wireframe,
        caption:
          'Three regions: the nav, a stat row for spend, and the panel grid the charts sit in. The blueprint numbers those three and nothing else.',
      },
    },
    featured: true,
    status: 'completed',
    // "Real-time streaming with response metrics" was here and is gone: nothing in the repo
    // streams. The 90-day figure is not a guess either, it is `ninetyDaysAgo` in
    // lib/storage/metricsStorage.ts:476.
    highlights: [
      'Multi-provider comparison (OpenAI, Anthropic, Google, Perplexity)',
      'Cost, token efficiency and API health per provider',
      'Keys and history stay in the browser, 90-day retention',
      'Interactive 3D data visualisations',
    ],
  },
  {
    id: 'the-kicker',
    name: 'The Kicker',
    description: 'Premier League predictions as a tabloid broadsheet. The Butler model’s honest probability bars, written up by ten original AI columnists.',
    /*
     * Two corrections here, both from the repo.
     *
     * The links were the Oracle's, which is a different project with its own card below. The
     * Kicker's own repo is not public yet and it has no deployment, so it carries no links at
     * all rather than borrowing someone else's. Add them the moment it ships.
     *
     * The engine description was stale. This said "five statistical models (ELO, Poisson,
     * form, head-to-head and standings) with a trained XGBoost ensemble", which is the
     * pre-swap engine: the five-model framing now survives only in April plan docs under
     * `docs/superpowers/plans/`, and the live code goes through `butlerFacade.ts` to the
     * Butler model. The Oracle's own last commit reads "engine swapped".
     */
    longDescription:
      'The Butler model in a broadsheet. A time-decayed Dixon-Coles engine fitted over 33 seasons produces calibrated probability bars rather than a confident scoreline it cannot back up, and then ten original AI columnists write the fixture up in their own voices, so the numbers arrive as football writing instead of a dashboard. It shares its engine with The Premier League Oracle and its personality with a Sunday paper.',
    topics: ['Svelte 5', 'TypeScript', 'Dixon-Coles', 'FastAPI'],
    language: 'TypeScript',
    category: 'web',
    links: {},
    images: {
      cover: MEDIA['the-kicker'].cover,
      gallery: MEDIA['the-kicker'].gallery,
    },
    underTheHood: {
      loop: {
        src: MEDIA['the-kicker'].loop,
        poster: MEDIA['the-kicker'].poster,
        caption: 'A prediction, split three ways. The bars are the model’s actual confidence, not a scoreline it cannot back up.',
      },
      diagram: {
        src: MEDIA['the-kicker'].diagram,
        caption: 'Five statistical models feed an XGBoost ensemble. The chat retrieves over 33 seasons in the browser, so the questions you ask never leave it.',
      },
      wireframe: {
        src: MEDIA['the-kicker'].wireframe,
        caption: 'Predictions and the newsreader on one screen: the numbers, then the story behind them.',
      },
    },
    featured: true,
    // The code is finished and pushed; what is outstanding is Tom's own admin (key rotation,
    // sign-off) per the repo's TODO. So: not shipped, and honest about it.
    status: 'coming-soon',
    // The diagram and wireframe captions above still describe five models and a newsreader,
    // because that is what those two images actually draw. They are on the re-cut list rather
    // than being contradicted by a caption. These highlights are claims, not descriptions of
    // an image, so they say what the code does now.
    highlights: [
      'The Butler model: Dixon-Coles over 33 seasons',
      'Ten original AI columnists write up the fixtures',
      'Calibrated probability bars, not a fake scoreline',
      'Shares its engine with The Premier League Oracle',
    ],
  },
  /*
   * Back as its own card, which it should always have been. The site had one entry carrying
   * The Kicker's name and the Oracle's repo and demo, so the working, public, deployed project
   * was showing under the name of the unreleased one. They share the Butler model and nothing
   * else: the Oracle is the analytical platform, The Kicker is the broadsheet.
   *
   * Every figure below is from the repo's own README and its committed backtest, not from a
   * press release. The RPS pair is the point of the whole project: 0.2000 against a bookmaker
   * closing-odds ceiling of 0.1939 is a *loss*, stated plainly, and a CI gate fails any change
   * that makes it worse. A prediction tool that publishes the gap to the market is doing the
   * one thing that separates it from the ones that do not.
   *
   * No artwork yet, so it takes ProjectCover's generated fallback panel, which exists for
   * exactly this case.
   */
  {
    id: 'premier-league-oracle',
    name: 'The Premier League Oracle',
    description:
      'Premier League predictions from a Dixon-Coles engine that ships as a few kilobytes of coefficients and runs entirely in your browser.',
    longDescription:
      'A live prediction platform built on the Butler model: a time-decayed, shrinkage-regularised Dixon-Coles engine fitted by penalised maximum likelihood over 33 seasons, then calibrated on walk-forward out-of-sample forecasts. It ships as a few kilobytes of fitted coefficients and runs entirely in the browser, with an optional XGBoost backend blending in on the log-odds scale. Predictions show as calibrated probability bars rather than a confident scoreline, and the displayed scoreline is the modal cell of a grid that agrees with those bars exactly, by construction. It publishes its own track record: RPS 0.2000 over 2,660 matches from 2018 to 2025, against a bookmaker closing-odds ceiling of 0.1939, with a CI gate that fails any change making predictions worse. Your Football-Data.org key stays in your browser. The source is public for transparency rather than for forking, because the clearest answer to "is this cherry-picked" is the code that computes every number.',
    topics: ['Svelte 4', 'Dixon-Coles', 'XGBoost', 'FastAPI'],
    language: 'TypeScript',
    category: 'ai',
    links: {
      demo: 'https://the-premier-league-oracle.vercel.app',
      github: 'https://github.com/ThomasJButler/The-Premier-League-Oracle',
    },
    status: 'completed',
    highlights: [
      'The Butler model, fitted over 33 seasons',
      'RPS 0.2000 vs the bookmaker ceiling of 0.1939',
      'Runs in the browser, your API key stays there',
      'Oracle Chat: ask the 33-season archive anything',
    ],
  },
  {
    id: 'isq-agent',
    name: 'ISQ Agent',
    description: 'RAG agent that completes supplier security questionnaires, grounding every answer in policy, scoring confidence, and flagging weak answers for human review.',
    longDescription: 'An AI-powered RAG agent that ingests supplier security questionnaires (PDF, DOCX or XLSX), grounds each answer in a knowledge base of policies and historical responses, scores confidence across four dimensions, and flags weak answers for human review. It renders completed questionnaires as DOCX, XLSX and JSON and logs tokens, cost and latency per question for full auditability. A two-tier system: a Python/FastAPI RAG engine (Voyage + Pinecone + Claude) with an n8n orchestration tier. A reusable, grounded methodology that adapts well beyond questionnaires (RFPs, compliance, onboarding, support).',
    topics: ['Claude', 'Pinecone', 'FastAPI', 'n8n'],
    language: 'Python',
    category: 'ai',
    // No links: the repo and the deployments were taken down deliberately. Leaving the
    // GitHub URL here would put a 404 on the project card *and* on the case study, which
    // renders this same links object.
    links: {},
    images: {
      cover: MEDIA['isq-agent'].cover,
      gallery: MEDIA['isq-agent'].gallery,
    },
    underTheHood: {
      loop: {
        src: MEDIA['isq-agent'].loop,
        poster: MEDIA['isq-agent'].poster,
        caption: 'Each answer scored as it lands. Anything the agent is not sure of goes amber and waits for a human, rather than being quietly filed as done.',
      },
      diagram: {
        src: MEDIA['isq-agent'].diagram,
        caption: 'A question, grounded in your own policy, then scored. Green is what runs on your side; amber marks the metered boundary, where tokens are billed.',
      },
      wireframe: {
        src: MEDIA['isq-agent'].wireframe,
        caption: 'The review screen: the drafted answer, its sources, and the confidence that decides whether a person needs to look.',
      },
    },
    status: 'completed',
    highlights: ['Grounded answers with four-dimension confidence scoring', 'Outputs DOCX / XLSX / JSON', 'n8n orchestration + per-question cost/latency auditing', '480+ tests, CI, test-driven throughout'],
  },
  {
    id: 'offshore-property-map',
    name: 'Offshore Property Map',
    description: 'Who owns England and Wales, from where? Entity resolution across two government registers that share no common identifier.',
    longDescription: 'HM Land Registry publishes which titles are owned by overseas companies. Companies House publishes who is behind those companies. Neither register carries a key that points at the other, so the join has to be built: normalise the names and addresses, score candidate pairs with Splink, and put every match in front of a human before it counts. The output is FollowTheMoney format, so it drops into the OpenSanctions and OpenAleph ecosystem rather than being another dead-end dataset. The rule the whole pipeline is built around is that nothing publishes on a hunch. A match set is only publishable once the Clopper-Pearson lower bound on precision clears 0.95 over a labelled sample, and that result is written into a certificate hashed against the exact scores file it was measured on. The export refuses to emit machine-made links without one. It publishes what the registers record and nothing beyond that, and it never presents an automated match as fact.',
    topics: ['Splink', 'DuckDB', 'FollowTheMoney', 'Entity resolution'],
    language: 'Python',
    category: 'ai',
    // No links. The repo is private, and the Land Registry licence carries attribution,
    // address-use and deletion duties that a public demo could not honour.
    links: {},
    status: 'in-progress',
    highlights: [
      'Two public registers, no shared key, real consequences for a wrong match',
      'Probabilistic matching with Splink, over DuckDB',
      'A gate certificate: nothing publishes below a 0.95 precision lower bound',
      'Provenance on every row, and human judgements that accumulate',
    ],
  },
  {
    id: 'octopus-job-hunter',
    name: 'OctopusJobHunter',
    description: 'Extra hands for a job search. Sixteen job boards in ten seconds, a tailored CV in four formats, and a tracker you own.',
    longDescription: 'Built from my own job search, which is the only reason it is any good: the rules in it were paid for the hard way. It searches sixteen specialist boards through official licensed feeds, generates a CV tailored to a specific advert in four formats (a designed PDF and Word file for people, plain versions for the parsers), tracks every application in a CSV and an Excel dashboard that never locks or asks you to log in, and preps interview answers from your own material. The intelligence lives in plain markdown playbooks rather than in code, so Claude, Codex or a model running on your own machine can all follow them. That last option is the point: your employment history is sensitive, and it should not have to leave your laptop to be useful. Two things it will not do, deliberately. It will not write experience you do not have, and it will not apply on your behalf.',
    topics: ['Python', 'ReportLab', 'Playbooks', 'Local models'],
    language: 'Python',
    category: 'ai',
    // Private: it holds a real profile and a real application history.
    links: {},
    status: 'completed',
    highlights: [
      'Sixteen specialist boards through official feeds, in about ten seconds',
      'One CV library, four output formats per role',
      'Markdown playbooks, so any agent (or a local model) can run it',
      'Never applies for you. That is a decision, not a gap',
    ],
  },
  {
    id: 'ai-code-generator',
    // The product calls itself AI Code Generator everywhere: the repo, the page h1, the
    // deployed title and all the artwork. Only this record said "LangChain", which put a
    // heading on the card that matched nothing the visitor would then see. LangChain is a
    // dependency, so it belongs in topics, not in the name.
    name: 'AI Code Generator',
    description: 'Full-stack code generation platform. Describe what you want, get production-ready code with tests and docs in 10 languages.',
    // Stack corrected from the repo: the backend is FastAPI, not Flask, and the frontend is
    // Next.js 15. The old copy said "Python Flask backend, and React frontend".
    longDescription: 'Describe what you want in plain English and get production-ready code back. Supports 10 languages: Python, JavaScript, TypeScript, Java, C#, Go, Rust, C++, Ruby, and Swift. Includes automatic test generation with framework detection, inline documentation, and a code analyser that scores complexity and readability. Built as a Next.js 15 frontend over a FastAPI backend using LangChain and tree-sitter.',
    // GPT-4, not GPT-4o. backend/config.py defaults to gpt-4-turbo-preview and the README
    // says "using OpenAI's GPT-4". The app's own How It Works panel claims GPT-4o, and the
    // new artwork repeats it, but neither is the model the generator actually calls.
    topics: ['Next.js', 'FastAPI', 'LangChain', 'GPT-4'],
    language: 'Python',
    category: 'ai',
    links: { github: 'https://github.com/ThomasJButler/AICodeGenerator', demo: 'https://theaigenerator.vercel.app/' },
    images: {
      cover: MEDIA['ai-code-generator'].cover,
      gallery: MEDIA['ai-code-generator'].gallery,
    },
    underTheHood: {
      diagram: {
        src: MEDIA['ai-code-generator'].diagram,
        caption: 'Your stack front to back. Only the generation step calls out to the model provider, which is why it is the one amber node: the analyser that scores the result runs locally.',
      },
      wireframe: {
        src: MEDIA['ai-code-generator'].wireframe,
        caption: 'A sentence in, then the generated code with its tests and docs beside the quality scores, ready to copy or download.',
      },
    },
    highlights: ['10 programming languages supported', 'GPT-4 powered code generation', 'Automatic test generation', 'Local code analyser: complexity and readability'],
  },
  {
    id: 'sql-ball',
    name: 'SQL Ball Analytics',
    description: 'Football analytics platform converting natural language to SQL queries across 22 European leagues and 7,600+ matches.',
    // Stack corrected from the repo: the frontend is Svelte, not React, and the backend is
    // FastAPI with LangChain and ChromaDB. The old copy said "Built with ... React".
    longDescription: 'Ask questions about football in plain English, get SQL queries back. Works across 22 European leagues with 7,600+ matches, spanning 11 countries. Features interactive dashboards with trends and anomaly detection, a FastAPI backend using LangChain and ChromaDB to parse the question, and real-time visualisations via Chart.js. The frontend is Svelte and TypeScript; the data lives in your own Supabase.',
    topics: ['Svelte', 'FastAPI', 'Supabase', 'RAG'],
    // Svelte, not Python: GitHub's own breakdown is 40.6% Svelte to 21% Python, and this
    // field renders as the coloured language dot right beside the Svelte topic badge.
    language: 'Svelte',
    category: 'ai',
    links: { github: 'https://github.com/ThomasJButler/SQL-Ball', demo: 'https://sql-ball.vercel.app/' },
    images: {
      cover: MEDIA['sql-ball'].cover,
      gallery: MEDIA['sql-ball'].gallery,
    },
    underTheHood: {
      diagram: {
        src: MEDIA['sql-ball'].diagram,
        caption: 'Your data stays in your own Supabase. Only the question makes the trip to OpenAI, which is the one amber step: the rest of the pipeline is your stack.',
      },
      wireframe: {
        src: MEDIA['sql-ball'].wireframe,
        // Describes the three regions the wireframe actually numbers. An earlier version of
        // this caption promised a visible generated-SQL panel, which is the one thing the
        // blueprint does not draw.
        caption: 'One input, top right, in plain English. The answer is drawn as a chart in the largest region, with the standings and results underneath.',
      },
    },
    highlights: ['Natural language to SQL conversion', '22 European leagues, 7,600+ matches', 'Interactive dashboards with anomaly detection', 'RAG-powered query parsing'],
  },
  {
    id: 'morpheus',
    name: 'Morpheus',
    description: 'Ask questions about your own documents and get answers where every claim points at a real passage. Runs entirely on your machine.',
    longDescription: 'Upload a PDF, Word file, text or Markdown, ask a question in plain English, and get an answer where every [n] marker points at a passage the model actually read. Retrieval is hybrid, vector search and BM25 keyword search fused, and a local model writes the answer. Ollama runs the models, LanceDB holds the index on disk, and at inference time nothing leaves the machine: upload, indexing, retrieval and generation all talk to 127.0.0.1 and nowhere else. The citation check is the part I am proudest of. Every marker is verified against the retrieved passages while the answer is still streaming, so a marker the model invented never reaches the screen, and an answer that cites nothing is flagged "not grounded" rather than passed off as fact. If the documents do not contain the answer, it says so instead of guessing.',
    topics: ['Ollama', 'LanceDB', 'FastAPI', 'Next.js'],
    language: 'Python',
    category: 'ai',
    links: { demo: 'https://morpheusrag.vercel.app', github: 'https://github.com/ThomasJButler/Morpheus' },
    // The gallery used to be a single 8.8MB GIF (morpheusgif2_zdkku9.gif). Five stills and a
    // 72kB loop say more and cost 2% of the bytes.
    images: {
      cover: MEDIA.morpheus.cover,
      gallery: MEDIA.morpheus.gallery,
    },
    underTheHood: {
      loop: {
        src: MEDIA.morpheus.loop,
        poster: MEDIA.morpheus.poster,
        caption: 'The rain, and the interface it belongs to.',
      },
      diagram: {
        src: MEDIA.morpheus.diagram,
        // The diagram still shows the hosted build this project started as. The green
        // generation step it described as "moving to Ollama" has now moved, along with
        // the vector store; the artwork is the last thing left to redraw.
        caption: 'Your documents, an index that lives on your own disk, and an answer that cites where it came from. Every step of this runs on the machine in front of you.',
      },
      wireframe: {
        src: MEDIA.morpheus.wireframe,
        caption: 'Ask on the left, the answer and its sources on the right. Every claim traceable back to a page.',
      },
    },
    videos: ['https://res.cloudinary.com/depqttzlt/video/upload/vc_auto,q_auto,w_960/v1767706547/2_1080_N_s5t1ww.mp4'],
    status: 'completed',
    featured: true,
    highlights: [
      'Runs entirely on your machine. Nothing leaves it at inference time',
      'Every citation checked against the retrieved passage, as it streams',
      'Hybrid retrieval: vector search and BM25 keyword search, fused',
      'Says "not grounded" rather than guessing',
    ],
  },
  {
    id: 'reviewbot-protocol',
    name: 'ReviewBot Protocol',
    description: 'A GitHub webhook that sends a pull request diff to GPT-4o-mini and posts the review back as a comment.',
    /*
     * Rewritten against the repo, which contradicted almost every claim that was here.
     *
     * It said "LangChain integration, LangGraph workflows for complex AI processing". There is
     * no LangGraph and no LangChain: `grep -ri langgraph` returns nothing repo-wide, and
     * requirements.txt is fastapi, uvicorn, openai, pydantic, requests, python-multipart. The
     * review is one chat.completions.create call in services/review_service.py, with a single
     * system prompt. It also said `language: 'TypeScript'` and topics starting 'Next.js'; the
     * backend is Python and the frontend is Create React App in plain JavaScript.
     *
     * None of that came from Tom: the README and the GitHub description never claimed it. It
     * was invented here, and the v5.2 artwork was then briefed from this copy and rendered the
     * same fiction at 3200px, which is why those tiles are held rather than shipped.
     *
     * What is left is smaller and true, and the teardown framing survives intact because that
     * is genuinely what the project is for.
     */
    longDescription:
      'A working answer to "how does CodeRabbit actually do that?". A GitHub webhook fires on a pull request, a FastAPI service verifies the signature and pulls the diff and changed files from the GitHub API, and one GPT-4o-mini call reviews it for bugs, security, performance and readability. The result goes back to the PR through the reviews endpoint, which supports line-level inline comments. One metered call per review, and it falls back to a local mock review when no API key is set, so you can run the whole loop without spending anything.',
    topics: ['FastAPI', 'GitHub API', 'GPT-4o-mini', 'React'],
    language: 'Python',
    category: 'ai',
    links: { github: 'https://github.com/ThomasJButler/ReviewBot-Protocol' },
    images: {
      cover: MEDIA['reviewbot-protocol'].cover,
      gallery: MEDIA['reviewbot-protocol'].gallery,
    },
    underTheHood: {
      diagram: {
        src: MEDIA['reviewbot-protocol'].diagram,
        caption:
          'Your stack front to back: FastAPI, your GitHub token, your webhook secret. The one amber step is the single GPT-4o-mini call, and with no key set even that is skipped for a local mock review.',
      },
      wireframe: {
        src: MEDIA['reviewbot-protocol'].wireframe,
        // Six regions, and the last one matters: it is an output panel, not a dashboard. The
        // first wireframe drew a nav of Dashboard / History / Pull Requests over analytics and
        // team panels, none of which the app has.
        caption:
          'One screen. A heading, two status pills, three mode tabs, the input for whichever mode is chosen, one button, and the review that comes back as prose.',
      },
    },
    highlights: [
      'Webhook-driven, with HMAC signature verification',
      'One metered GPT-4o-mini call per review',
      'Posts back as an inline PR review',
      'Mock review fallback, so it runs with no API key',
    ],
  },
  {
    id: 'news-perspective',
    name: 'News Perspective',
    description: 'AI-powered news analysis that rewrites sensationalised headlines and generates TLDR summaries across US and UK sources.',
    /*
     * Stack corrected against the repo. This record claimed Azure OpenAI, AI Search and
     * Streamlit, and three of those four topics were wrong: requirements.txt is plain
     * `openai` with OPENAI_MODEL = "gpt-4o-mini", storage is SQLite through SQLAlchemy with
     * no search service anywhere, and the frontend is Next.js 16 with React 19, Tailwind 4
     * and shadcn. Only "Python" survived, and it stays as the `language` because GitHub's own
     * breakdown puts Python first at 264kB against 159kB of TypeScript.
     *
     * The article comparison is new here rather than corrected: the app groups the same story
     * across outlets and has the model analyse the framing difference, and the site had never
     * mentioned it. It is the feature the name actually promises.
     *
     * Fixed ahead of the artwork on purpose. A design brief gets written from this file, so a
     * wrong record here is how the next round of tiles inherits a mistake, which is exactly
     * what happened to ReviewBot.
     */
    longDescription:
      'See the news, not the spin. A self-hosted reader that pulls top headlines from NewsAPI across seven categories in the US and UK, then sends each article through one gpt-4o-mini call: it scores sentiment, rewrites the headline plainly when it has been sensationalised, and writes a TLDR. The original headline is kept and shown, so nothing is hidden. It also groups the same story across outlets and analyses how their framing differs. Content guardrails hide distressing topics, with up to fifty keywords of your own on top, and a Good News filter drops the negative categories entirely. Your NewsAPI key is sent per request and never stored on the server, everything lands in SQLite on your own disk, and reading the archive back needs no key at all. No ads, no tracking, no account.',
    topics: ['Next.js 16', 'FastAPI', 'SQLite', 'NewsAPI'],
    language: 'Python',
    category: 'ai',
    links: { github: 'https://github.com/ThomasJButler/NewsPerspective' },
    images: {
      cover: MEDIA['news-perspective'].cover,
      gallery: MEDIA['news-perspective'].gallery,
    },
    underTheHood: {
      // Wireframe only. The delivered diagram still says a refresh costs about 14 requests,
      // which was the arithmetic before NewsAPI dropped `country=gb` and the UK fetch became a
      // single batched call. It is 8, and tile 05 in the gallery already says so.
      wireframe: {
        src: MEDIA['news-perspective'].wireframe,
        caption:
          'Five regions: the header, the filter bar, the refresh status, then each article card carrying its TLDR with the original headline kept underneath.',
      },
    },
    highlights: [
      'Headline rewritten, original kept and shown',
      'The same story compared across outlets',
      'Guardrails, plus 50 keywords of your own',
      'Your key per request, never stored server side',
    ],
  },
  {
    id: 'mastering-ai-portfolio',
    name: 'AI & Agents Portfolio',
    description: 'Portfolio of AI projects from the Codecademy 6-week bootcamp demonstrating LangChain, RAG, and multi-agent architectures.',
    topics: ['Next.js', 'TypeScript', 'Tailwind', 'Anime.js'],
    language: 'TypeScript',
    category: 'ai',
    links: { demo: 'https://agenticaiprojectsportfolio.vercel.app/', github: 'https://github.com/ThomasJButler/AgenticAICoursePortfolio' },
    images: {
      cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1766595895/dashboardhomepage_xxsk0z.png',
      gallery: MEDIA['mastering-ai-portfolio'].gallery,
    },
    // No project count here on purpose. The live site's own header says "6 Production-Ready
    // Applications" while its README lists five (ModelViz, Code Generator, Morpheus, SQL-Ball,
    // ReviewBot Protocol). Until those agree, a number on this card is a number that can be
    // checked and found wrong, which is the exact bug the arcade had for a whole release.
    featured: true,
  },
  {
    id: 'commercial-portfolio',
    name: 'Commercial Portfolio',
    description: 'Professional commercial portfolio showcasing 3+ years of full-stack development. Built with React v2.0 architecture.',
    topics: ['React', 'TypeScript', 'Vite', 'Node.js'],
    language: 'React',
    category: 'web',
    links: { github: 'https://github.com/ThomasJButler/commercial-portfolio-react', demo: 'https://www.thomasjbutler.me/' },
    images: {
      // Cover is still the bare SVG logo. It is the weakest cover on the page and there is no
      // designed replacement yet, so the gallery is doing the work for now.
      cover: 'https://res.cloudinary.com/depqttzlt/image/upload/v1766580999/logo_ofodr8.svg',
      gallery: MEDIA['commercial-portfolio'].gallery,
    },
  },
  // The LFC News App was here and stays retired. It read r/LiverpoolFC through the Reddit
  // API, the terms changed under it, and its only link is a demo that depends on them. A
  // card with a dead demo is worse than no card.
  {
    id: 'dotnet-react-calendar',
    name: '.NET/React Calendar',
    description: 'Full-stack calendar app with .NET Core 9 FastEndpoints backend and React frontend. Built for a job application, to commercial patterns: SOLID, FluentValidation, a circuit breaker, and xUnit coverage across the layers.',
    topics: ['.NET', 'React', 'C#', 'Fast Endpoints'],
    language: 'C#',
    category: 'portfolio',
    links: { demo: 'https://dotnet-react-calendar.vercel.app/', github: 'https://github.com/ThomasJButler/Dotnet-React-Calendar' },
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1765947576/dotnetcalendar_fiu8p4.jpg' },
  },
  {
    id: 'css-showcase',
    name: 'CSS Learning Showcase',
    description: 'Interactive CSS reference with 30+ pages of live demos, playgrounds, and modern features like container queries and :has().',
    longDescription: 'Comprehensive CSS learning resource built with Next.js and shadcn/ui. Features 30+ pages of live demos, interactive playgrounds, and real code examples covering everything from basic selectors to modern features like container queries, :has() selector, scroll-driven animations, and colour spaces.',
    topics: ['CSS', ':has()', 'Container Queries', 'Responsive'],
    language: 'CSS',
    category: 'portfolio',
    links: { demo: 'https://thomasjbutler.github.io/css-showcase/', github: 'https://github.com/ThomasJButler/css-showcase' },
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1765946936/cssshowcase_ugyvso.webp' },
  },
  {
    id: 'matrix-arcade',
    name: 'The Matrix Arcade',
    // Updated to v2.0 ("The Full Arcade"), which the copy here had missed entirely: it still
    // described the six-game canvas version. Twelve games, Phaser 3 and the shared save
    // system are all from the repo's own release notes, not estimated.
    description: 'Twelve Matrix-themed arcade games in one Phaser-powered cabinet, with a shared save system, achievements and offline play.',
    // Game names are the titles from src/data/gameRegistry.ts, the repo's own single source
    // of truth, not the folder ids: 'snake-classic' is shown to players as Matrix Snake, and
    // 'matrix-cloud' as Matrix Bird.
    longDescription: 'Twelve Matrix-themed arcade games behind a single cabinet, built with React, TypeScript and Phaser 3. The roster runs from CTRL-S (a five-chapter text adventure) through Matrix Snake, Vortex Pong, Matrix Bird, Matrix Invaders and Metris, to the later additions: Matrix Frogger, Cloud Jumper, Code Breaker, Neo Jump, Agent Chase and Rhythm Hacker. Achievements and high scores persist across the whole cabinet, sound comes from a Matrix Trilogy effects kit with a Web Audio synthesis layer behind it, and it installs as a PWA so it plays offline.',
    topics: ['React', 'Phaser 3', 'TypeScript', 'PWA'],
    language: 'TypeScript',
    category: 'games',
    links: { demo: 'https://the-matrix-arcade.vercel.app/', github: 'https://github.com/ThomasJButler/The-Matrix-Arcade' },
    // The gallery was a single 4.8MB GIF. Five stills and a 392kB title sting replace it.
    images: {
      cover: MEDIA['matrix-arcade'].cover,
      gallery: MEDIA['matrix-arcade'].gallery,
    },
    videos: [{ src: MEDIA['matrix-arcade'].video, poster: MEDIA['matrix-arcade'].poster }],
    // Titles are the ones players see, taken from the arcade's gameRegistry.ts (its own stated
    // single source of truth), not the folder ids. That distinction already caught us once:
    // 'snake-classic' is shown as Matrix Snake and 'matrix-cloud' as Matrix Bird.
    games: [
      { src: MEDIA['matrix-arcade'].games['ctrl-s'], title: 'CTRL-S | The World' },
      { src: MEDIA['matrix-arcade'].games.snake, title: 'Matrix Snake' },
      { src: MEDIA['matrix-arcade'].games.pong, title: 'Vortex Pong' },
      { src: MEDIA['matrix-arcade'].games.bird, title: 'Matrix Bird' },
      { src: MEDIA['matrix-arcade'].games.invaders, title: 'Matrix Invaders' },
      { src: MEDIA['matrix-arcade'].games.metris, title: 'Metris' },
      { src: MEDIA['matrix-arcade'].games.frogger, title: 'Matrix Frogger' },
      { src: MEDIA['matrix-arcade'].games['neo-jump'], title: 'Neo Jump' },
      { src: MEDIA['matrix-arcade'].games['agent-chase'], title: 'Agent Chase' },
      { src: MEDIA['matrix-arcade'].games['rhythm-hacker'], title: 'Rhythm Hacker' },
      { src: MEDIA['matrix-arcade'].games['cloud-jumper'], title: 'Cloud Jumper' },
      { src: MEDIA['matrix-arcade'].games['code-breaker'], title: 'Code Breaker' },
    ],
    featured: true,
    status: 'completed',
    highlights: ['12 playable arcade games', 'Phaser 3 engine behind a React shell', 'Matrix Trilogy audio kit, Web Audio synthesis behind it', 'Installable PWA, plays offline'],
  },
  {
    id: 'bigbang-gallery',
    name: 'Big Bang Canvas',
    description: 'Responsive gallery of 50+ AI-generated cosmic artworks with 3D tilt effects, custom cursor, and keyboard navigation.',
    topics: ['Canvas', 'Animation', 'Creative', 'Design'],
    language: 'JavaScript',
    category: 'portfolio',
    links: { demo: 'https://thomasjbutler.github.io/bigbang-gallery/', github: 'https://github.com/ThomasJButler/bigbang-gallery' },
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1765946935/bigbanggallery_ckmaw1.webp' },
  },
  {
    id: 'python-projects',
    name: 'Python Projects Collection',
    description: 'Collection of Python hobby projects: mathematical tools, climate visualisation, AI assistants, and interactive games.',
    topics: ['Python', 'Algorithms', 'ML', 'Games'],
    language: 'Python',
    category: 'portfolio',
    links: { github: 'https://github.com/ThomasJButler/PythonProjects' },
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1765947170/LorenzAttractor_bd2dps.png' },
  },
  {
    id: 'version-timetravel',
    name: 'Version TimeTravel',
    description: 'A working archive of every version of this site since 2024. Every one still runs, in the browser, as it originally shipped.',
    /*
     * "9 portfolio versions" kept, and it is the app's own figure: its hero and its stat line
     * both say nine, and the chronology rail lists nine. `versions.ts` holds ten entries and
     * the thumbnail strip shows ten, because the commercial site is in the archive without
     * being a version of this portfolio. Consistent, but worth a glance during the QA pass.
     *
     * `language` left as JavaScript deliberately. The app's own source is TypeScript, but
     * GitHub's breakdown for the repo is CSS, HTML and JavaScript, because ten archived static
     * sites dwarf the viewer that displays them. The field is a coloured dot, and deferring to
     * GitHub is the rule the other entries follow.
     */
    longDescription:
      'Every version of this site since June 2024, from hand-written HTML to React and shadcn today, and every one of them still runs. Pick any version and the original build loads in a viewer you can resize to 1440, 834 or 390 to see how it behaved on a phone at the time. The builds are unmodified, so some of them reference assets that no longer exist, and the archive says so rather than quietly patching them. It is the clearest record of how fast the work moved: the same person, two years apart.',
    topics: ['Timeline', 'Interactive', 'Archive'],
    language: 'JavaScript',
    category: 'portfolio',
    links: { demo: 'https://thomasjbutler.github.io/version-timetravel/', github: 'https://github.com/ThomasJButler/version-timetravel' },
    images: {
      cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1767710995/portfoliotimetravel_rh7jgr.png',
      gallery: MEDIA['version-timetravel'].gallery,
    },
    highlights: [
      'Every version still runnable, none of them patched',
      'Original builds, unmodified, flagged where assets are gone',
      'Resizable viewer: 1440, 834 and 390',
      'Two years of it, one person',
    ],
  },
  {
    id: 'sanctuary',
    name: 'Sanctuary',
    description: 'Native iOS app for daily neurodiversity functioning, in active build with Swift after roughly two years of research and development.',
    longDescription: 'Sanctuary is a neurodiversity daily-functioning app, built natively in Swift after around two years of research and development. It helps neurodiverse people manage executive function and communicate better, growing out of the same coaching automations built and proven in daily use. Currently in active development, built by AiTomatic.',
    topics: ['Swift', 'Xcode', 'iOS', 'Neurodiversity'],
    language: 'Swift',
    category: 'mobile',
    links: {
      waitlist: 'https://sanctuary-ios.vercel.app/',
      company: 'https://aitomatic.vercel.app/',
    },
    images: {
      cover: MEDIA.sanctuary.cover,
      gallery: MEDIA.sanctuary.gallery,
    },
    underTheHood: {
      loop: {
        src: MEDIA.sanctuary.loop,
        poster: MEDIA.sanctuary.poster,
        caption: 'The orb breathes at the pace you are meant to. It is the whole interface when everything else is too much.',
      },
      diagram: {
        src: MEDIA.sanctuary.diagram,
        caption: 'Everything runs on the device. There is no server to send a bad day to, which for this app is the feature, not a detail.',
      },
      wireframe: {
        src: MEDIA.sanctuary.wireframe,
        caption: 'Built for the days when reading a busy screen is the hard part.',
      },
    },
    featured: true,
    status: 'in-progress',
    highlights: ['Built natively in Swift / Xcode', 'Supports executive function and communication', 'Around two years of research and design', 'In active development, coming soon'],
  },
];

/**
 * Portfolio is the tag for builds that were about learning the thing rather than solving a
 * problem: the CSS showcase, the Python collection, the archived site versions, the
 * take-home calendar. It lets a reader see the progression instead of a flat pile.
 *
 * Creative and Personal used to sit here. Creative was already (0), and once the learning
 * projects moved to Portfolio, Personal was (0) too. An empty tab is a question nobody
 * asked. This array is a plain list, not a Record, so it will NOT fail type-check if a
 * category is added to the union and forgotten here.
 */
export const categories = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'games', label: 'Games' },
  { id: 'portfolio', label: 'Portfolio' },
] as const;

/**
 * Presentation maps for a project's category and language.
 *
 * They live here, beside the data they describe, because ProjectsPage and
 * ProjectDetailModal each used to carry their own copy — and both copies were
 * missing `mobile`, so Sanctuary's badge rendered the raw string "mobile".
 */
export const categoryLabel: Record<Project['category'], string> = {
  ai: 'AI & ML',
  web: 'Web',
  mobile: 'Mobile',
  games: 'Games',
  portfolio: 'Portfolio',
};

/*
 * One variant, on purpose.
 *
 * These used to be 'cyan' for AI and 'amber' for mobile/games/creative, which encoded
 * nothing a reader could use: the colour of a chip did not tell you anything you could not
 * read in the chip. Amber now means exactly one thing on this site (the meter running: API
 * spend, per-token bills, data leaving), and spending it on a category label would empty it
 * of that meaning.
 */
export const categoryBadgeVariant: Record<Project['category'], string> = {
  ai: 'secondary',
  web: 'secondary',
  mobile: 'secondary',
  games: 'secondary',
  portfolio: 'secondary',
};

export const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  'C#': '#178600',
  CSS: '#563d7c',
  React: '#61dafb',
  // GitHub's own linguist colour. Without an entry here the dot silently falls back to a
  // grey #666, which reads as "language unknown" rather than as the language.
  Svelte: '#ff3e00',
  Swift: '#F05138',
};
