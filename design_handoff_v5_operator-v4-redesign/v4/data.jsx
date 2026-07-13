/* data.jsx — v4.0 content layer */

const V4_VIDEO = 'https://res.cloudinary.com/depqttzlt/video/upload/q_auto/v1752558251/large_green_banner_dv0bkk.mp4';
const dev = (s, v = 'original') => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${s}/${s}-${v}.svg`;

/* projects — counts: AI&ML 8 · Web 5 · Mobile 1 · Games 1 · Creative 1 · Personal 2 = 18 */
const V4_PROJECTS = [
  { id:'modelviz', title:'ModelViz', cat:'ai', featured:true, lang:'TypeScript', ld:'ld-ts', live:true, repo:true,
    blurb:'Compare AI models across providers with real-time metrics, cost analysis, and 3D visualisations.',
    tags:['Next.js','React 19','TypeScript','Three.js'] },
  { id:'kicker', title:'The Kicker', cat:'web', featured:true, lang:'TypeScript', ld:'ld-ts', live:true, repo:true,
    blurb:'Premier League predictions plus a clean, ad-free football newsreader — five statistical models and an XGBoost ensemble, shown as honest probability bars.',
    tags:['Svelte','TypeScript','XGBoost','FastAPI'] },
  { id:'isq', title:'ISQ Agent', cat:'ai', lang:'Python', ld:'ld-python', live:false, repo:true,
    blurb:'RAG agent that completes supplier security questionnaires — grounding every answer in your own evidence library.',
    tags:['Claude','Pinecone','FastAPI','n8n'] },
  { id:'langchain', title:'LangChain Code Generator', cat:'ai', lang:'Python', ld:'ld-python', live:true, repo:true,
    blurb:'Full-stack code generation platform. Describe what you want, get production-ready code with review and explanation.',
    tags:['LangChain','GPT-4o','Python','React'] },
  { id:'sqlball', title:'SQL Ball Analytics', cat:'ai', lang:'Python', ld:'ld-python', live:true, repo:true,
    blurb:'Football analytics platform converting natural language to SQL queries across 25 years of match data.',
    tags:['Supabase','LangChain','OpenAI','RAG'] },
  { id:'morpheus', title:'Morpheus', cat:'ai', lang:'Python', ld:'ld-python', live:true, repo:true,
    blurb:'Intelligent document Q&A with semantic search and source citations using RAG.',
    tags:['Pinecone','Anthropic','LangChain','FastAPI'] },
  { id:'reviewbot', title:'ReviewBot Protocol', cat:'ai', lang:'TypeScript', ld:'ld-ts', live:false, repo:true,
    blurb:'AI-powered GitHub PR review system with automated code analysis and intelligent, kind suggestions.',
    tags:['Next.js','LangGraph','FastAPI','GitHub API'] },
  { id:'news', title:'News Perspective', cat:'ai', lang:'Python', ld:'ld-python', live:false, repo:true,
    blurb:'AI-powered news analysis that rewrites sensationalised headlines and generates balanced summaries.',
    tags:['Azure OpenAI','AI Search','Python','Streamlit'] },
  { id:'aiportfolio', title:'AI & Agents Portfolio', cat:'ai', lang:'TypeScript', ld:'ld-ts', live:true, repo:true,
    blurb:'Portfolio of AI projects from the Codecademy 6-week bootcamp — agents, RAG and creative experiments.',
    tags:['Next.js','TypeScript','Tailwind','Anime.js'] },
  { id:'commercial', title:'Commercial Portfolio', cat:'web', featured:true, lang:'React', ld:'ld-react', live:true, repo:true,
    blurb:'Professional commercial portfolio showcasing 3+ years of full-stack development. Built with React v2.0 architecture.',
    tags:['React','TypeScript','Vite','Node.js'] },
  { id:'lfc', title:'LFC News App', cat:'web', lang:'JavaScript', ld:'ld-js', live:true, repo:true,
    blurb:'Distraction-free Reddit viewer for LFC content. No ads, no tracking, three kit themes.',
    tags:['React','Redux','Reddit API'] },
  { id:'dotnet', title:'.NET / React Calendar', cat:'web', lang:'C#', ld:'ld-cs', live:true, repo:true,
    blurb:'Full-stack calendar app with .NET Core 9 FastEndpoints backend and React frontend.',
    tags:['.NET','React','C#','Fast Endpoints'] },
  { id:'css', title:'CSS Learning Showcase', cat:'web', lang:'CSS', ld:'ld-css', live:true, repo:true,
    blurb:'Interactive CSS reference with 30+ pages of live demos, playgrounds, and modern features.',
    tags:['CSS',':has()','Container Queries','Responsive'] },
  { id:'arcade', title:'The Matrix Arcade', cat:'games', featured:true, lang:'JavaScript', ld:'ld-js', live:true, repo:true,
    blurb:'Collection of 6 Matrix-themed arcade games: CTRL-S, Snake, Vortex Pong, Matrix Cloud, Matrix Invaders, and Metris.',
    tags:['React','Canvas API','Vite','Game Dev'] },
  { id:'bigbang', title:'Big Bang Canvas', cat:'creative', lang:'JavaScript', ld:'ld-js', live:true, repo:true,
    blurb:'Responsive gallery of 50+ AI-generated cosmic artworks with 3D tilt effects and generative motion.',
    tags:['Canvas','Animation','Creative','Design'] },
  { id:'python', title:'Python Projects Collection', cat:'personal', lang:'Python', ld:'ld-python', live:false, repo:true,
    blurb:'Collection of Python hobby projects: mathematical tools, climate visualisation, algorithms and games.',
    tags:['Python','Algorithms','ML','Games'] },
  { id:'timetravel', title:'Version TimeTravel', cat:'personal', lang:'JavaScript', ld:'ld-js', live:true, repo:true,
    blurb:'Interactive timeline showcasing 9 portfolio versions from static HTML to modern React.',
    tags:['Timeline','Interactive','History'] },
  { id:'sanctuary', title:'Sanctuary', cat:'mobile', featured:true, lang:'Swift', ld:'ld-swift', live:false, repo:false,
    blurb:'Native iOS app for daily neurodiversity functioning — in active build with Swift after roughly two years of research and development.',
    tags:['Swift','Xcode','iOS','Neurodiversity'] },
];

const V4_CATS = {
  ai:{label:'AI & ML', acc:'nt-acc-ai', badge:'cb-ai'},
  web:{label:'Web', acc:'nt-acc-web', badge:'cb-web'},
  games:{label:'Games', acc:'nt-acc-games', badge:'cb-games'},
  creative:{label:'Creative', acc:'nt-acc-creative', badge:'cb-creative'},
  personal:{label:'Personal', acc:'nt-acc-personal', badge:'cb-personal'},
  mobile:{label:'mobile', acc:'nt-acc-mobile', badge:'cb-mobile'},
};
const V4_FILTERS = [
  {id:'all',label:'All'},{id:'ai',label:'AI & ML'},{id:'web',label:'Web'},
  {id:'mobile',label:'Mobile'},{id:'games',label:'Games'},{id:'creative',label:'Creative'},{id:'personal',label:'Personal'},
];

const V4_STATS = [
  { icon:'gitbranch', value:'15+', label:'Projects' },
  { icon:'cpu', value:'7', label:'AI Models' },
  { icon:'globe', value:'20+', label:'Deployments' },
  { icon:'zap', value:'99.9%', label:'Uptime' },
];
const V4_SKILLS = [
  { name:'React / Next.js', pct:95 }, { name:'TypeScript', pct:90 },
  { name:'Python / AI', pct:85 }, { name:'Node.js / APIs', pct:88 }, { name:'Cloud / DevOps', pct:75 },
];
const V4_ACTIVITY = [
  { icon:'robot', text:'Built RAG pipeline with LangChain + Pinecone', tag:'AI', tagcls:'cb-ai', year:'2025' },
  { icon:'code', text:'Shipped ModelViz: AI model comparison platform', tag:'Web', tagcls:'cb-web', year:'2025' },
  { icon:'database', text:'SQL Ball: NL-to-SQL football analytics', tag:'Data', tagcls:'cb-ai', year:'2025' },
  { icon:'terminal', text:'Portfolio redesign with ShadCN + Tailwind v4', tag:'Dev', tagcls:'cb-personal', year:'2025' },
];
const V4_NOW_TAGS = [['LangChain','cyan'],['RAG','cyan'],['Agents','amber'],['ShadCN','']];

const V4_TECH = {
  Frontend: [['React',dev('react')],['JavaScript',dev('javascript')],['TypeScript',dev('typescript')],['HTML/CSS',dev('html5')],['Vite',dev('vitejs')]],
  Backend: [['Node.js',dev('nodejs')],['Python',dev('python')],['PostgreSQL',dev('postgresql')],['.NET',dev('dotnetcore')],['Django',dev('django','plain')],['Flask',dev('flask')]],
  'Cloud & DevOps': [['AWS',dev('amazonwebservices','original-wordmark')],['Azure',dev('azure')],['Docker',dev('docker')],['Vercel',dev('vercel')],['Netlify',dev('netlify')],['GitHub Actions',dev('githubactions')]],
  'AI & ML': [['TensorFlow',dev('tensorflow')],['PyTorch',dev('pytorch')],['LangChain',null],['OpenAI',null],['Pinecone',null],['RAG',null]],
};

const V4_CREDS = [
  { group:'Cloud & Infrastructure', items:[
    {icon:'database', t:'AWS Qualified', s:'Cloud Architecture & Serverless'},
    {icon:'layers', t:'Azure Qualified', s:'Cloud Infrastructure & DevOps'},
    {icon:'share', t:'Cisco Qualified', s:'Network Security & Analytics'},
  ]},
  { group:'Engineering & AI', items:[
    {icon:'robot', t:'ML & LLM Bootcamp', s:'CodeCademy Certificate'},
    {icon:'code', t:'Full Stack Engineer', s:'CodeCademy Certificate'},
    {icon:'graduation', t:'Level 4 Software Dev', s:'Estio Apprenticeship'},
  ]},
  { group:'Platforms', items:[
    {icon:'cogs', t:'HubSpot Qualified', s:'CMS Development & Integration'},
    {icon:'layers', t:'Umbraco Qualified', s:'Enterprise CMS & .NET'},
    {icon:'globe', t:'WordPress Qualified', s:'Theme Development & Customisation'},
  ]},
];

const V4_SERVICES = [
  { icon:'globe', title:'Website & Web Apps', body:'Responsive, performance-first websites and web apps built with modern stacks.',
    feats:['React/Next.js','Performance & SEO','Accessible & Responsive'], tags:['React','TypeScript','WordPress','HubSpot','Next.js'] },
  { icon:'database', title:'Backend & APIs', body:'Robust servers and APIs that scale with your product. Production-ready from day one.',
    feats:['Node.js/Python','PostgreSQL/MongoDB','Auth & Security'], tags:['Node.js','Django','PostgreSQL','GraphQL','Flask'] },
  { icon:'robot', title:'AI & Automation', body:'Practical AI features and automation to save time and make data useful.',
    feats:['GPT Integration','n8n Workflows','Custom ML Models'], tags:['ChatGPT','Claude','PyTorch','TensorFlow','n8n'] },
  { icon:'smartphone', title:'Mobile Applications', body:'Cross-platform apps with native feel and store readiness.',
    feats:['React Native','iOS & Android','Push & Offline'], tags:['React Native','Expo','iOS','Android'] },
  { icon:'palette', title:'Design & Brand', body:'Clear, usable interfaces and identity design that scales with your product.',
    feats:['UI/UX Design','Brand Identity','Design Systems'], tags:['Figma','Adobe XD','UI/UX','Wireframes'] },
  { icon:'headset', title:'Consultancy & Custom', body:'Architecture reviews, training and bespoke engineering for special requirements.',
    feats:['Architecture Review','Team Training','Bespoke Solutions'], tags:['DevOps','Git','Agile','Testing','Cloud'] },
];

const V4_STEPS = [
  { n:1, icon:'chat', title:'Discovery Call', body:'Free consultation to understand your goals, timeline, and requirements.' },
  { n:2, icon:'doc', title:'Detailed Quote', body:'Clear, itemised proposal with no hidden costs or surprises.' },
  { n:3, icon:'rocket', title:'Build & Deliver', body:'Agile development with regular updates and milestone reviews.' },
  { n:4, icon:'headset', title:'Ongoing Support', body:'Post-launch support, maintenance, and future enhancements.' },
];

const V4_JOURNEY = [
  { icon:'terminal', title:'The Beginning', yr:'2000s', body:'Started with HTML/CSS as a kid, fascinated by the web and inspired by The Matrix.' },
  { icon:'code', title:'Learning & Growth', yr:'2010s', body:'Studied computing, learned JavaScript frameworks, and built first real projects.' },
  { icon:'robot', title:'AI Exploration', yr:'2023-24', body:'Dove into AI/ML, completed bootcamps, built RAG applications and intelligent agents.' },
  { icon:'briefcase', title:'Current Focus', yr:'2025', body:'Full stack AI engineering, building production tools and creative experiments.' },
];

const V4_TIMELINE = [
  { year:'2000', title:'First contact', body:'Watched The Matrix as a kid. That green rain rewired me — I wanted to build worlds on a screen.' },
  { year:'2008', title:'View source', body:'Discovered right-click → View Source. Spent weekends pulling pages apart to see how they worked.' },
  { year:'2014', title:'First real pages', body:'Hand-coded HTML & CSS sites. Ugly, proud, and entirely mine. The craft bug bit hard.' },
  { year:'2018', title:'Going full-stack', body:'Learned JavaScript properly, then React and Node. Started thinking in components and data flow.' },
  { year:'2020', title:'Estio apprenticeship', body:'Level 4 Software Development. Production codebases, code review, shipping to real users.' },
  { year:'2021', title:'Commercial work', body:'Client builds in WordPress, Umbraco and .NET. Taste and reliability beat cleverness.' },
  { year:'2022', title:'The Matrix Arcade', body:'Built a Canvas-based arcade themed after my favourite film. This site became my playground.' },
  { year:'2023', title:'Enter the agents', body:'Fell down the AI rabbit hole — LLMs, embeddings, LangChain. Shipping AI into real products.' },
  { year:'2024', title:'ModelViz & Morpheus', body:'Tools to compare AI models and orchestrate agents. The work and the obsession merged.' },
  { year:'2025', title:'Full Stack AI Engineer', body:'Building human-oriented apps with AI at the core — and still rebuilding this site from scratch.' },
  { year:'2026', title:'ShadCN + Tailwind v4', body:'This redesign: glass morphism, circuit-board schematics, terminal polish. Craft over noise.' },
];

Object.assign(window, { V4_VIDEO, V4_PROJECTS, V4_CATS, V4_FILTERS, V4_STATS, V4_SKILLS, V4_ACTIVITY, V4_NOW_TAGS, V4_TECH, V4_CREDS, V4_SERVICES, V4_STEPS, V4_JOURNEY, V4_TIMELINE });
