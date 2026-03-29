export interface Project {
  id: string;
  name: string;
  description: string;
  topics: string[];
  language: string;
  category: 'ai' | 'web' | 'games' | 'creative' | 'personal';
  links: {
    demo?: string;
    github?: string;
  };
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'modelviz',
    name: 'ModelViz',
    description: 'Compare AI models across providers with real-time metrics, cost analysis, and 3D visualisations.',
    topics: ['Next.js', 'React 19', 'TypeScript', 'Three.js'],
    language: 'TypeScript',
    category: 'ai',
    links: { demo: 'https://modelviz.vercel.app/', github: 'https://github.com/ThomasJButler/ModelViz' },
    featured: true,
  },
  {
    id: 'ai-code-generator',
    name: 'LangChain Code Generator',
    description: 'Generate production-ready code with AI. Choose your language and generate code, tests, and docs.',
    topics: ['LangChain', 'GPT-4o', 'Python', 'React'],
    language: 'Python',
    category: 'ai',
    links: { github: 'https://github.com/ThomasJButler/AICodeGenerator', demo: 'https://theaigenerator.vercel.app/' },
  },
  {
    id: 'sql-ball',
    name: 'SQL Ball Analytics',
    description: 'Football data analytics with natural language queries. RAG-powered NL-to-SQL using a custom dataset.',
    topics: ['Supabase', 'LangChain', 'OpenAI', 'RAG'],
    language: 'Python',
    category: 'ai',
    links: { github: 'https://github.com/ThomasJButler/SQL-Ball', demo: 'https://sql-ball.vercel.app/' },
  },
  {
    id: 'morpheus',
    name: 'Morpheus',
    description: 'Intelligent document Q&A with semantic search and source citations using RAG.',
    topics: ['Pinecone', 'Anthropic', 'LangChain', 'FastAPI'],
    language: 'Python',
    category: 'ai',
    links: { demo: 'https://morpheusrag.vercel.app', github: 'https://github.com/ThomasJButler/Morpheus' },
  },
  {
    id: 'reviewbot-protocol',
    name: 'ReviewBot Protocol',
    description: 'AI-powered GitHub PR reviews with automated code analysis and intelligent feedback.',
    topics: ['Next.js', 'LangGraph', 'FastAPI', 'GitHub API'],
    language: 'TypeScript',
    category: 'ai',
    links: { github: 'https://github.com/ThomasJButler/ReviewBot-Protocol' },
  },
  {
    id: 'news-perspective',
    name: 'News Perspective',
    description: 'Fetch headlines and rewrite them in a factual tone using Azure AI to reduce doomscrolling.',
    topics: ['Azure OpenAI', 'AI Search', 'Python', 'Streamlit'],
    language: 'Python',
    category: 'ai',
    links: { github: 'https://github.com/ThomasJButler/NewsPerspective' },
  },
  {
    id: 'mastering-ai-portfolio',
    name: 'AI & Agents Portfolio',
    description: 'Interactive portfolio showcasing AI course projects and learning journey.',
    topics: ['Next.js', 'TypeScript', 'Tailwind', 'Anime.js'],
    language: 'TypeScript',
    category: 'ai',
    links: { demo: 'https://agenticaiprojectsportfolio.vercel.app/', github: 'https://github.com/ThomasJButler/AgenticAICoursePortfolio' },
  },
  {
    id: 'commercial-portfolio',
    name: 'Commercial Portfolio',
    description: 'Professional showcase of 3+ years full-stack development with 90+ Lighthouse score.',
    topics: ['React', 'TypeScript', 'Vite', 'Node.js'],
    language: 'React',
    category: 'web',
    links: { github: 'https://github.com/ThomasJButler/commercial-portfolio-react', demo: 'https://www.thomasjbutler.me/' },
    featured: true,
  },
  {
    id: 'lfc-news-reddit',
    name: 'LFC News App',
    description: 'Reddit-powered news aggregator for football transfer rumours across multiple subreddits.',
    topics: ['React', 'Redux', 'Reddit API'],
    language: 'JavaScript',
    category: 'web',
    links: { github: 'https://github.com/ThomasJButler/LFC-News-Reddit-App', demo: 'https://lfc-news-reddit-app.vercel.app/' },
  },
  {
    id: 'dotnet-react-calendar',
    name: '.NET/React Calendar',
    description: 'Full-stack calendar app built with .NET Fast Endpoints and React.',
    topics: ['.NET', 'React', 'C#', 'Fast Endpoints'],
    language: 'C#',
    category: 'web',
    links: { demo: 'https://dotnet-react-calendar.vercel.app/', github: 'https://github.com/ThomasJButler/Dotnet-React-Calendar' },
  },
  {
    id: 'css-showcase',
    name: 'CSS Learning Showcase',
    description: 'Interactive showcase of modern CSS foundations. Pure CSS, no frameworks.',
    topics: ['CSS', ':has()', 'Container Queries', 'Responsive'],
    language: 'CSS',
    category: 'web',
    links: { demo: 'https://thomasjbutler.github.io/css-showcase/', github: 'https://github.com/ThomasJButler/css-showcase' },
  },
  {
    id: 'matrix-arcade',
    name: 'The Matrix Arcade',
    description: 'A collection of playable mini-games in the style of The Matrix movies.',
    topics: ['React', 'Canvas API', 'Vite', 'Game Dev'],
    language: 'JavaScript',
    category: 'games',
    links: { demo: 'https://the-matrix-arcade.vercel.app/', github: 'https://github.com/ThomasJButler/The-Matrix-Arcade' },
    featured: true,
  },
  {
    id: 'bigbang-gallery',
    name: 'Big Bang Canvas',
    description: 'Creative image gallery inspired by the big bang with visual experiments.',
    topics: ['Canvas', 'Animation', 'Creative', 'Design'],
    language: 'JavaScript',
    category: 'creative',
    links: { demo: 'https://thomasjbutler.github.io/bigbang-gallery/', github: 'https://github.com/ThomasJButler/bigbang-gallery' },
  },
  {
    id: 'python-projects',
    name: 'Python Projects Collection',
    description: 'From climate visualisations in Project Aetheris to terminal text adventures.',
    topics: ['Python', 'Algorithms', 'ML', 'Games'],
    language: 'Python',
    category: 'personal',
    links: { github: 'https://github.com/ThomasJButler/PythonProjects' },
  },
  {
    id: 'version-timetravel',
    name: 'Version TimeTravel',
    description: 'Visual timeline documenting the evolution of this portfolio website.',
    topics: ['Timeline', 'Interactive', 'History'],
    language: 'JavaScript',
    category: 'personal',
    links: { demo: 'https://thomasjbutler.github.io/version-timetravel/', github: 'https://github.com/ThomasJButler/version-timetravel' },
  },
];

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'web', label: 'Web' },
  { id: 'games', label: 'Games' },
  { id: 'creative', label: 'Creative' },
  { id: 'personal', label: 'Personal' },
] as const;
