import { MEDIA } from './assets';

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  topics: string[];
  language: string;
  category: 'ai' | 'web' | 'mobile' | 'games' | 'creative' | 'personal';
  links: {
    demo?: string;
    github?: string;
    video?: string;
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
  featured?: boolean;
  status?: 'completed' | 'in-progress' | 'coming-soon';
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: 'modelviz',
    name: 'ModelViz',
    description: 'Compare AI models across providers with real-time metrics, cost analysis, and 3D visualisations.',
    longDescription: 'Interactive analytics platform for comparing AI models across OpenAI, Anthropic, Google (Gemini), and Perplexity. Test prompts across multiple models simultaneously, track usage metrics, analyse costs, and visualise API performance with an immersive cyberpunk-themed interface.',
    topics: ['Next.js', 'React 19', 'TypeScript', 'Three.js'],
    language: 'TypeScript',
    category: 'ai',
    links: { demo: 'https://modelviz.vercel.app/', github: 'https://github.com/ThomasJButler/ModelViz' },
    images: {
      cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1767710994/ModelViz_blz9ct.png',
      gallery: ['https://res.cloudinary.com/depqttzlt/image/upload/v1768067110/modelviz2short_ukdyda.gif'],
    },
    featured: true,
    status: 'completed',
    highlights: ['Multi-provider comparison (OpenAI, Anthropic, Google, Perplexity)', 'Real-time streaming with response metrics', 'Interactive 3D data visualisations', 'Cyberpunk-themed interface'],
  },
  {
    id: 'premier-league-oracle',
    name: 'The Kicker',
    description: 'Premier League predictions plus a clean, ad-free football newsreader. Five statistical models and an XGBoost ensemble, shown as honest probability bars.',
    longDescription: 'A rebrand and evolution of the Premier League Oracle. Blends five statistical models (ELO, Poisson, form, head-to-head and standings) with a trained XGBoost ensemble to predict results, shown as honest probability bars rather than over-confident scorelines. It pairs the numbers with a distraction-free newsreader, because sometimes you want the story, not just the prediction: a deliberate antidote to ad-heavy, cluttered sports sites. Includes a Kelly Criterion calculator, value-bet detection and an Oracle Chat with client-side RAG over 33 seasons of data.',
    topics: ['Svelte', 'TypeScript', 'XGBoost', 'FastAPI'],
    language: 'TypeScript',
    category: 'web',
    links: { demo: 'https://the-premier-league-oracle.vercel.app', github: 'https://github.com/ThomasJButler/The-Premier-League-Oracle' },
    images: {
      cover: MEDIA['premier-league-oracle'].cover,
      gallery: MEDIA['premier-league-oracle'].gallery,
    },
    underTheHood: {
      loop: {
        src: MEDIA['premier-league-oracle'].loop,
        poster: MEDIA['premier-league-oracle'].poster,
        caption: 'A prediction, split three ways. The bars are the model’s actual confidence, not a scoreline it cannot back up.',
      },
      diagram: {
        src: MEDIA['premier-league-oracle'].diagram,
        caption: 'Five statistical models feed an XGBoost ensemble. The chat retrieves over 33 seasons in the browser, so the questions you ask never leave it.',
      },
      wireframe: {
        src: MEDIA['premier-league-oracle'].wireframe,
        caption: 'Predictions and the newsreader on one screen: the numbers, then the story behind them.',
      },
    },
    featured: true,
    status: 'completed',
    highlights: ['Five-model ensemble + trained XGBoost', 'Clean, ad-free football newsreader', 'Kelly Criterion calculator + value-bet detection', 'Oracle Chat: client-side RAG over 33 seasons'],
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
    id: 'ai-code-generator',
    name: 'LangChain Code Generator',
    description: 'Full-stack code generation platform. Describe what you want, get production-ready code with tests and docs in 10 languages.',
    // Stack corrected from the repo: the backend is FastAPI, not Flask, and the frontend is
    // Next.js 15. The old copy said "Python Flask backend, and React frontend".
    longDescription: 'Describe what you want in plain English and get production-ready code back. Supports 10 languages: Python, JavaScript, TypeScript, Java, C#, Go, Rust, C++, Ruby, and Swift. Includes automatic test generation with framework detection, inline documentation, and a code analyser that scores complexity and readability. Built as a Next.js 15 frontend over a FastAPI backend using LangChain and tree-sitter.',
    topics: ['Next.js', 'FastAPI', 'LangChain', 'GPT-4o'],
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
    highlights: ['10 programming languages supported', 'GPT-4o powered code generation', 'Automatic test generation', 'Local code analyser: complexity and readability'],
  },
  {
    id: 'sql-ball',
    name: 'SQL Ball Analytics',
    description: 'Football analytics platform converting natural language to SQL queries across 22 European leagues and 7,600+ matches.',
    // Stack corrected from the repo: the frontend is Svelte, not React, and the backend is
    // FastAPI with LangChain and ChromaDB. The old copy said "Built with ... React".
    longDescription: 'Ask questions about football in plain English, get SQL queries back. Works across 22 European leagues with 7,600+ matches, spanning 11 countries. Features interactive dashboards with trends and anomaly detection, a FastAPI backend using LangChain and ChromaDB to parse the question, and real-time visualisations via Chart.js. The frontend is Svelte and TypeScript; the data lives in your own Supabase.',
    topics: ['Svelte', 'FastAPI', 'Supabase', 'RAG'],
    language: 'Python',
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
        caption: 'Ask in plain English, see the SQL it wrote, then the chart. Showing the query is the point: you can check the answer rather than trust it.',
      },
    },
    highlights: ['Natural language to SQL conversion', '22 European leagues, 7,600+ matches', 'Interactive dashboards with anomaly detection', 'RAG-powered query parsing'],
  },
  {
    id: 'morpheus',
    name: 'Morpheus',
    description: 'Intelligent document Q&A with semantic search and source citations using RAG.',
    longDescription: 'An intelligent document reasoning system with a Matrix-themed interface. Upload your private documents and ask questions in natural language. Private by design: fresh Pinecone vector namespace per session, pay only for tokens used. Claude generates accurate answers from your specific documents with source citations.',
    topics: ['Pinecone', 'Anthropic', 'LangChain', 'FastAPI'],
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
        caption: 'Your documents, a vector namespace that exists only for the session, and an answer that cites where it came from. The generation step is drawn green: it is moving to Ollama and local models.',
      },
      wireframe: {
        src: MEDIA.morpheus.wireframe,
        caption: 'Ask on the left, the answer and its sources on the right. Every claim traceable back to a page.',
      },
    },
    videos: ['https://res.cloudinary.com/depqttzlt/video/upload/vc_auto,q_auto,w_960/v1767706547/2_1080_N_s5t1ww.mp4'],
    status: 'completed',
    highlights: ['Private by design: fresh namespace per session', 'Semantic search with Pinecone vectors', 'Source citations for every answer', 'Cost effective: pay only for tokens used'],
  },
  {
    id: 'reviewbot-protocol',
    name: 'ReviewBot Protocol',
    description: 'AI-powered GitHub PR review system with automated code analysis and intelligent feedback via custom dashboard.',
    longDescription: 'Full-stack AI code review system that automatically analyses GitHub pull requests and provides intelligent feedback. Catches common issues before human reviewers need to look at the code. Built with LangChain integration, LangGraph workflows for complex AI processing, GitHub webhook automation, and production-ready error handling. Demonstrates how tools like CodeRabbit work by building one from scratch.',
    topics: ['Next.js', 'LangGraph', 'FastAPI', 'GitHub API'],
    language: 'TypeScript',
    category: 'ai',
    links: { github: 'https://github.com/ThomasJButler/ReviewBot-Protocol' },
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1767707875/ReviewBot2_xzcin9.png' },
    highlights: ['Automated GitHub PR analysis', 'LangChain + LangGraph workflows', 'Webhook-driven reviews', 'Full-stack TypeScript/Python'],
  },
  {
    id: 'news-perspective',
    name: 'News Perspective',
    description: 'AI-powered news analysis that rewrites sensationalised headlines and generates TLDR summaries across US and UK sources.',
    longDescription: 'See the news, not the spin. Uses AI to rewrite sensationalised headlines to be calm and factual, generates TLDR summaries, and analyses sentiment across US and UK news sources. Features a Good News filter, content guardrails for distressing topics, and country/category filters. No ads, no tracking, no account required.',
    topics: ['Azure OpenAI', 'AI Search', 'Python', 'Streamlit'],
    language: 'Python',
    category: 'ai',
    links: { github: 'https://github.com/ThomasJButler/NewsPerspective' },
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1765947185/newsperspective2_ugdtqk.png' },
    highlights: ['AI headline rewriting', 'Sentiment analysis', 'Good News filter', 'No ads, no tracking'],
  },
  {
    id: 'mastering-ai-portfolio',
    name: 'AI & Agents Portfolio',
    description: 'Portfolio of AI projects from the Codecademy 6-week bootcamp demonstrating LangChain, RAG, and multi-agent architectures.',
    topics: ['Next.js', 'TypeScript', 'Tailwind', 'Anime.js'],
    language: 'TypeScript',
    category: 'ai',
    links: { demo: 'https://agenticaiprojectsportfolio.vercel.app/', github: 'https://github.com/ThomasJButler/AgenticAICoursePortfolio' },
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1766595895/dashboardhomepage_xxsk0z.png' },
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
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/v1766580999/logo_ofodr8.svg' },
    featured: true,
  },
  {
    id: 'lfc-news-reddit',
    name: 'LFC News App',
    description: 'Distraction-free Reddit viewer for LFC content. No ads, no tracking, three kit themes, spicy meter for trending posts.',
    longDescription: 'All the LFC content, none of the noise. Pulls posts and comments directly from r/LiverpoolFC and displays them in a clean interface. Features filter by category (match days, transfers, images, videos), threaded comments with inline media, three kit themes (Anfield Red, Away Cream, Keeper Green), a spicy meter for trending posts, and search across everything.',
    topics: ['React', 'Redux', 'Reddit API'],
    language: 'JavaScript',
    category: 'web',
    links: { demo: 'https://liverpoolfcnews.vercel.app/' },
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1765947167/lfcreddit2_wzbqty.png' },
    highlights: ['Distraction-free Reddit reader', 'Three kit themes', 'Threaded comments with inline media', 'No account or ads needed'],
  },
  {
    id: 'dotnet-react-calendar',
    name: '.NET/React Calendar',
    description: 'Full-stack calendar app with .NET Core 9 FastEndpoints backend and React frontend.',
    topics: ['.NET', 'React', 'C#', 'Fast Endpoints'],
    language: 'C#',
    category: 'web',
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
    category: 'web',
    links: { demo: 'https://thomasjbutler.github.io/css-showcase/', github: 'https://github.com/ThomasJButler/css-showcase' },
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1765946936/cssshowcase_ugyvso.webp' },
  },
  {
    id: 'matrix-arcade',
    name: 'The Matrix Arcade',
    // Updated to v2.0 ("The Full Arcade"), which the copy here had missed entirely: it still
    // described the six-game canvas version. Twelve games, Phaser 3 and the shared save
    // system are all from the repo's own release notes, not estimated.
    description: 'Twelve Matrix-themed arcade games in one Phaser-powered cabinet, with a shared save system, procedural audio and offline play.',
    longDescription: 'Twelve Matrix-themed arcade games behind a single cabinet, built with React, TypeScript and Phaser 3. The roster runs from CTRL-S (a five-chapter text adventure) through Snake Classic, Vortex Pong, Matrix Cloud, Matrix Invaders and Metris, to the later additions: Matrix Frogger, Cloud Jumper, Code Breaker, Neo Jump, Agent Chase and Rhythm Hacker. Achievements and high scores persist across the whole cabinet, every bleep is synthesised in the browser with the Web Audio API rather than shipped as audio files, and it installs as a PWA so it plays offline.',
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
    featured: true,
    status: 'completed',
    highlights: ['12 playable arcade games', 'Phaser 3 engine behind a React shell', 'Procedural audio, no audio files shipped', 'Installable PWA, plays offline'],
  },
  {
    id: 'bigbang-gallery',
    name: 'Big Bang Canvas',
    description: 'Responsive gallery of 50+ AI-generated cosmic artworks with 3D tilt effects, custom cursor, and keyboard navigation.',
    topics: ['Canvas', 'Animation', 'Creative', 'Design'],
    language: 'JavaScript',
    category: 'creative',
    links: { demo: 'https://thomasjbutler.github.io/bigbang-gallery/', github: 'https://github.com/ThomasJButler/bigbang-gallery' },
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1765946935/bigbanggallery_ckmaw1.webp' },
  },
  {
    id: 'python-projects',
    name: 'Python Projects Collection',
    description: 'Collection of Python hobby projects: mathematical tools, climate visualisation, AI assistants, and interactive games.',
    topics: ['Python', 'Algorithms', 'ML', 'Games'],
    language: 'Python',
    category: 'personal',
    links: { github: 'https://github.com/ThomasJButler/PythonProjects' },
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1765947170/LorenzAttractor_bd2dps.png' },
  },
  {
    id: 'version-timetravel',
    name: 'Version TimeTravel',
    description: 'Interactive timeline showcasing 9 portfolio versions from static HTML to modern React, with responsive preview viewer.',
    topics: ['Timeline', 'Interactive', 'History'],
    language: 'JavaScript',
    category: 'personal',
    links: { demo: 'https://thomasjbutler.github.io/version-timetravel/', github: 'https://github.com/ThomasJButler/version-timetravel' },
    images: { cover: 'https://res.cloudinary.com/depqttzlt/image/upload/f_auto,q_auto,w_800/v1767710995/portfoliotimetravel_rh7jgr.png' },
  },
  {
    id: 'sanctuary',
    name: 'Sanctuary',
    description: 'Native iOS app for daily neurodiversity functioning, in active build with Swift after roughly two years of research and development.',
    longDescription: 'Sanctuary is a neurodiversity daily-functioning app, built natively in Swift after around two years of research and development. It helps neurodiverse people manage executive function and communicate better, growing out of the same coaching automations built and proven in daily use. Currently in active development.',
    topics: ['Swift', 'Xcode', 'iOS', 'Neurodiversity'],
    language: 'Swift',
    category: 'mobile',
    links: {},
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

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'games', label: 'Games' },
  { id: 'creative', label: 'Creative' },
  { id: 'personal', label: 'Personal' },
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
  creative: 'Creative',
  personal: 'Personal',
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
  creative: 'secondary',
  personal: 'secondary',
};

export const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  'C#': '#178600',
  CSS: '#563d7c',
  React: '#61dafb',
  Swift: '#F05138',
};
