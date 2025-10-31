/**
 * @author Tom Butler
 * @date 2025-10-27
 * @description Career timeline data and category management for professional journey.
 *              Comprehensive chronicle of education, projects, career milestones,
 *              and personal growth from 2022 to present.
 */

export interface TimelineEntry {
  id: number;
  date: string; // Formatted UK date like "September 2025"
  year: number;
  month: number;
  title: string;
  location: string; // "Liverpool, UK"
  institution: string;
  description: string;
  achievements: string[];
  links?: Array<{
    href: string;
    label: string;
    icon: string;
  }>;
  icon: string; // FontAwesome class or emoji
  iconBg: string; // Background colour for icon
  category: 'education' | 'project' | 'career' | 'ai-ml' | 'personal' | 'creative';
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Formats year and month into readable UK date string
 * @param {number} year - Year value
 * @param {number} month - Month value (1-12)
 * @return {string} Formatted date string (e.g. "September 2025")
 */
const formatDate = (year: number, month: number): string => {
  return `${MONTHS[month - 1]} ${year}`;
};

export const timelineData: TimelineEntry[] = [
  {
    id: 1,
    year: 2025,
    month: 9,
    date: formatDate(2025, 9),
    title: 'CodeCademy Mastering AI for Developers',
    location: 'Liverpool, UK',
    institution: 'CodeCademy',
    description: 'Completed intensive bootcamp focused on mastering AI development, advanced machine learning techniques, and building production-ready AI applications.',
    achievements: [
      'Mastered generative AI and LLM development',
      'Built production-ready AI applications',
      'Advanced machine learning implementation techniques',
      'AI ethics and responsible AI development'
    ],
    links: [],
    icon: 'fa-graduation-cap',
    iconBg: '#8B5CF6',
    category: 'ai-ml'
  },
  {
    id: 2,
    year: 2025,
    month: 7,
    date: formatDate(2025, 7),
    title: 'Updated Commercial Portfolio to v2.0',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Successfully migrated my commercial portfolio website to React v2.0 with significant improvements. A key feature of this update is the comprehensive Web Agency Showcase - detailed documentation of 10+ commercial projects specifically designed for employers and recruiters to review my professional work.',
    achievements: [
      'Migrated from v1.x to v2.0 framework with complete refactor',
      'Achieved 95+ Lighthouse scores for performance',
      'Implemented SEO optimisations and accessibility features',
      'Added multilingual support (EN, FR, RU, JA)',
      'Published comprehensive Web Agency Showcase documenting 10+ commercial projects'
    ],
    links: [
      {
        href: 'https://www.thomasjbutler.me/',
        label: 'Visit Portfolio',
        icon: 'fa-arrow-up-right-from-square'
      },
      {
        href: 'https://tombutler.notion.site/Web-Agency-Showcase-1a11b94bcaea80ffa87ae2fb8994e4de',
        label: 'Agency Showcase',
        icon: 'fa-briefcase'
      }
    ],
    icon: 'fa-rocket',
    iconBg: '#6366F1',
    category: 'project'
  },
  {
    id: 3,
    year: 2025,
    month: 7,
    date: formatDate(2025, 7),
    title: 'Completed ICT Bootcamp Certification',
    location: 'Liverpool, UK',
    institution: 'Professional Development',
    description: 'Successfully completed an intensive ICT bootcamp, gaining comprehensive knowledge in hardware, cloud computing, networking, and Azure services. This certification has significantly expanded my technical skillset.',
    achievements: [
      'Mastered hardware troubleshooting and system administration',
      'Achieved Azure Fundamentals certification',
      'Learnt advanced networking concepts and protocols',
      'Gained hands-on experience with cloud infrastructure deployment'
    ],
    links: [],
    icon: 'fa-certificate',
    iconBg: '#F59E0B',
    category: 'education'
  },
  {
    id: 4,
    year: 2025,
    month: 6,
    date: formatDate(2025, 6),
    title: 'Built AI Comparison Showcase',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Created an innovative platform to compare responses from multiple AI models side-by-side in real-time. Features GPT-4, Claude 3.5, DeepSeek, and Perplexity with performance metrics and visualisations.',
    achievements: [
      'Integrated multiple AI APIs (OpenAI, Anthropic, DeepSeek, Perplexity)',
      'Built with Next.js 15 and TypeScript for optimal performance',
      'Implemented real-time response streaming and comparison',
      'Created beautiful data visualisations for performance metrics'
    ],
    links: [
      {
        href: 'https://ai-comparison-showcase.vercel.app/',
        label: 'View Demo',
        icon: 'fa-arrow-up-right-from-square'
      },
      {
        href: 'https://github.com/ThomasJButler/AI-Comparison-Showcase-',
        label: 'View on GitHub',
        icon: 'fa-brands fa-github'
      }
    ],
    icon: 'fa-brain',
    iconBg: '#00F5FF',
    category: 'ai-ml'
  },
  {
    id: 5,
    year: 2025,
    month: 5,
    date: formatDate(2025, 5),
    title: 'Built NewsPerspective - AI News Analysis',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Developed NewsPerspective, an innovative application that uses Azure and OpenAI to analyse news articles and rewrite headlines based on actual content to combat misinformation.',
    achievements: [
      'Integrated Azure Cognitive Services for content analysis',
      'Implemented OpenAI API for intelligent headline generation',
      'Built Python backend with Flask for API endpoints',
      'Created system to detect and flag misleading headlines'
    ],
    links: [
      {
        href: 'https://github.com/ThomasJButler/NewsPerspective',
        label: 'View on GitHub',
        icon: 'fa-brands fa-github'
      }
    ],
    icon: 'fa-newspaper',
    iconBg: '#3B82F6',
    category: 'ai-ml'
  },
  {
    id: 6,
    year: 2025,
    month: 4,
    date: formatDate(2025, 4),
    title: 'Created SQL-Ball Football Analytics',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Built an advanced football data analytics platform with natural language queries and AI insights. RAG-powered NL-to-SQL using a custom collated dataset of European football results.',
    achievements: [
      'Integrated Supabase and PostgreSQL for data management',
      'Implemented LangChain for natural language processing',
      'Built RAG system for intelligent query generation',
      'Created React frontend with data visualisations'
    ],
    links: [
      {
        href: 'https://github.com/ThomasJButler/SQL-Ball',
        label: 'View on GitHub',
        icon: 'fa-brands fa-github'
      }
    ],
    icon: 'fa-database',
    iconBg: '#10B981',
    category: 'ai-ml'
  },
  {
    id: 7,
    year: 2025,
    month: 3,
    date: formatDate(2025, 3),
    title: 'Launched Premier League Oracle',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Created The Premier League Oracle, a comprehensive football prediction platform that uses data science and machine learning to provide objective match predictions.',
    achievements: [
      'Built with Python, Svelte, TypeScript, and PostgreSQL',
      'Integrated historical match data from Football-Data.co.uk',
      'Implemented statistical anomaly detection algorithms',
      'Designed responsive UI with data visualisations'
    ],
    links: [
      {
        href: 'https://github.com/ThomasJButler/The-Premier-League-Oracle',
        label: 'View on GitHub',
        icon: 'fa-brands fa-github'
      }
    ],
    icon: 'fa-futbol',
    iconBg: '#10B981',
    category: 'project'
  },
  {
    id: 8,
    year: 2025,
    month: 2,
    date: formatDate(2025, 2),
    title: 'Built AI Code Generator',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Created a production-ready code generation tool with AI assistance. Built with LangChain and React to generate code, unit tests, and documentation across multiple programming languages.',
    achievements: [
      'Integrated LangChain with GPT-4o for code generation',
      'Built Python Flask backend with React frontend',
      'Implemented multi-language support (Python, JavaScript, Java, etc.)',
      'Added automated unit test and documentation generation'
    ],
    links: [
      {
        href: 'https://github.com/ThomasJButler/AICodeGenerator',
        label: 'View on GitHub',
        icon: 'fa-brands fa-github'
      }
    ],
    icon: 'fa-code',
    iconBg: '#3572A5',
    category: 'ai-ml'
  },
  {
    id: 9,
    year: 2025,
    month: 1,
    date: formatDate(2025, 1),
    title: 'Updated Matrix Arcade with New Games',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Expanded the Matrix Arcade project with new games including Matrix Invaders. The arcade now features a comprehensive collection of retro-style games built with modern web technologies.',
    achievements: [
      'Added Matrix Invaders - a space invaders clone with Matrix theme',
      'Improved game performance and responsiveness',
      'Enhanced UI/UX with better navigation between games',
      'Implemented high score tracking and leaderboards'
    ],
    links: [
      {
        href: 'https://github.com/ThomasJButler/matrix-arcade',
        label: 'View on GitHub',
        icon: 'fa-brands fa-github'
      },
      {
        href: 'https://the-matrix-arcade.vercel.app/',
        label: 'Play Games',
        icon: 'fa-gamepad'
      }
    ],
    icon: 'fa-gamepad',
    iconBg: '#EC4899',
    category: 'creative'
  },
  {
    id: 10,
    year: 2024,
    month: 12,
    date: formatDate(2024, 12),
    title: 'Career Transition & New Ventures',
    location: 'Liverpool, UK',
    institution: 'Entrepreneurship',
    description: 'After being made redundant, I transformed this challenge into an opportunity. Created my Matrix-themed personal portfolio as my primary showcase, founded AiTomatic company, and began developing this commercial portfolio.',
    achievements: [
      'Made redundant from previous position in December',
      'Created custom HTML/CSS/JS personal portfolio with Matrix theme',
      'Founded AiTomatic company for AI consulting and development',
      'Began development of this commercial React portfolio for professional presence'
    ],
    links: [
      {
        href: 'https://thomasjbutler.github.io/',
        label: 'Visit Portfolio',
        icon: 'fa-arrow-up-right-from-square'
      },
      {
        href: 'https://aitomatic.com',
        label: 'AiTomatic',
        icon: 'fa-building'
      }
    ],
    icon: 'fa-lightbulb',
    iconBg: '#F59E0B',
    category: 'career'
  },
  {
    id: 11,
    year: 2024,
    month: 12,
    date: formatDate(2024, 12),
    title: 'Created Personal Portfolio',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Built my first portfolio website from scratch using custom HTML, CSS, and JavaScript. Designed with a Matrix theme inspired by my favourite films, this became my primary showcase until transitioning to this professional commercial site.',
    achievements: [
      'Custom-built with pure HTML, CSS, and JavaScript',
      'Matrix-themed design with green digital rain effects',
      'Served as main portfolio and skills practice ground',
      'Features interactive elements and smooth animations'
    ],
    links: [
      {
        href: 'https://thomasjbutler.github.io/ThomasJButler',
        label: 'Visit Site',
        icon: 'fa-arrow-up-right-from-square'
      },
      {
        href: 'https://github.com/ThomasJButler/thomasjbutler.github.io',
        label: 'View on GitHub',
        icon: 'fa-brands fa-github'
      }
    ],
    icon: 'fa-code',
    iconBg: '#00FF41',
    category: 'project'
  },
  {
    id: 12,
    year: 2024,
    month: 11,
    date: formatDate(2024, 11),
    title: 'Completed CSS Showcase Project',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Finished development of CSS Showcase, an interactive demonstration of advanced CSS animations and effects. This project serves as both a learning resource and a portfolio piece showcasing modern CSS capabilities.',
    achievements: [
      'Created 20+ unique CSS animation demonstrations',
      'Implemented pure CSS solutions without JavaScript',
      'Built responsive design that works on all devices',
      'Added interactive tutorials for each animation technique'
    ],
    links: [
      {
        href: 'https://github.com/ThomasJButler/css-showcase',
        label: 'View on GitHub',
        icon: 'fa-brands fa-github'
      },
      {
        href: 'https://thomasjbutler.github.io/css-showcase/',
        label: 'Visit Site',
        icon: 'fa-arrow-up-right-from-square'
      }
    ],
    icon: 'fa-palette',
    iconBg: '#06B6D4',
    category: 'creative'
  },
  {
    id: 13,
    year: 2024,
    month: 10,
    date: formatDate(2024, 10),
    title: 'Built Python Backend Collection',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Developed a comprehensive suite of Python applications showcasing various backend development skills. This collection demonstrates proficiency in API development, data processing, and machine learning implementations.',
    achievements: [
      'Created RESTful APIs using Flask and FastAPI frameworks',
      'Implemented data processing pipelines and ETL workflows',
      'Built machine learning models for predictive analytics',
      'Demonstrated best practices in Python backend development'
    ],
    links: [
      {
        href: 'https://github.com/ThomasJButler/PythonProjects',
        label: 'View on GitHub',
        icon: 'fa-brands fa-github'
      }
    ],
    icon: 'fa-brands fa-python',
    iconBg: '#3776AB',
    category: 'project'
  },
  {
    id: 14,
    year: 2024,
    month: 9,
    date: formatDate(2024, 9),
    title: 'Created Big Bang Gallery',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Built a creative image gallery inspired by the big bang. This visual gallery showcases design work and creative experiments with stunning animations and interactive elements.',
    achievements: [
      'Implemented canvas-based animations and particle effects',
      'Created responsive gallery layout with smooth transitions',
      'Built interactive visual experiments and design showcases',
      'Optimised performance for smooth 60fps animations'
    ],
    links: [
      {
        href: 'https://thomasjbutler.github.io/bigbang-gallery/',
        label: 'View Demo',
        icon: 'fa-arrow-up-right-from-square'
      },
      {
        href: 'https://github.com/ThomasJButler/bigbang-gallery',
        label: 'View on GitHub',
        icon: 'fa-brands fa-github'
      }
    ],
    icon: 'fa-star',
    iconBg: '#FF6400',
    category: 'creative'
  },
  {
    id: 15,
    year: 2024,
    month: 8,
    date: formatDate(2024, 8),
    title: 'Built Dotnet React Calendar',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Created a full-stack calendar application using .NET and React. Initially started as a code assessment, continued development to master .NET backend development and C# programming.',
    achievements: [
      'Built .NET backend with Fast Endpoints architecture',
      'Implemented React frontend with modern UI/UX',
      'Integrated C# backend with React SPA',
      'Deployed to Vercel with live demo'
    ],
    links: [
      {
        href: 'https://dotnet-react-calendar.vercel.app/',
        label: 'View Demo',
        icon: 'fa-arrow-up-right-from-square'
      },
      {
        href: 'https://github.com/ThomasJButler/Dotnet-React-Calendar',
        label: 'View on GitHub',
        icon: 'fa-brands fa-github'
      }
    ],
    icon: 'fa-calendar-alt',
    iconBg: '#178600',
    category: 'project'
  },
  {
    id: 16,
    year: 2024,
    month: 7,
    date: formatDate(2024, 7),
    title: 'Building AI Models',
    location: 'Liverpool, UK',
    institution: 'AI Development',
    description: 'Started creating custom AI models and applying machine learning knowledge practically. This marked a significant milestone in my AI journey, moving from theory to hands-on implementation.',
    achievements: [
      'Developed custom AI models for various use cases',
      'Applied machine learning concepts to real-world problems',
      'Created AI-powered solutions and integrations',
      'Built foundation for future AI consulting work'
    ],
    links: [],
    icon: 'fa-robot',
    iconBg: '#8B5CF6',
    category: 'ai-ml'
  },
  {
    id: 17,
    year: 2024,
    month: 7,
    date: formatDate(2024, 7),
    title: 'Created LFC News Reddit App',
    location: 'Liverpool, UK',
    institution: 'Personal Project',
    description: 'Built a minimal Reddit app using React, Redux, and Reddit API to aggregate the latest transfer rumours across various football subreddits. Showcases state management and API integration skills.',
    achievements: [
      'Implemented Redux for state management',
      'Integrated Reddit API for real-time news aggregation',
      'Built responsive React UI for news display',
      'Created multi-subreddit aggregation system'
    ],
    links: [
      {
        href: 'https://github.com/ThomasJButler/LFC-News-Reddit-App',
        label: 'View on GitHub',
        icon: 'fa-brands fa-github'
      }
    ],
    icon: 'fa-comments',
    iconBg: '#FF4500',
    category: 'project'
  },
  {
    id: 18,
    year: 2024,
    month: 6,
    date: formatDate(2024, 6),
    title: 'Started ML and Python Deep Dive',
    location: 'Liverpool, UK',
    institution: 'Self-Study',
    description: 'Began an intensive self-study programme focused on Machine Learning and advanced Python programming. Currently working through comprehensive courses and building practical ML projects.',
    achievements: [
      'Studying neural networks and deep learning fundamentals',
      'Working with TensorFlow and PyTorch frameworks',
      'Building predictive models using scikit-learn',
      'Exploring natural language processing and computer vision'
    ],
    links: [],
    icon: 'fa-book-open',
    iconBg: '#14B8A6',
    category: 'personal'
  },
  {
    id: 19,
    year: 2024,
    month: 5,
    date: formatDate(2024, 5),
    title: 'Started CodePen Journey',
    location: 'Liverpool, UK',
    institution: 'Creative Coding',
    description: 'Joined CodePen to practise and showcase creative coding experiments. This platform became my playground for exploring ideas beyond client requirements and CMS limitations encountered at work.',
    achievements: [
      'Created custom CSS animations and interactive components',
      'Practised skills learnt in professional environment',
      'Experimented with creative coding beyond work constraints',
      'Still actively creating and sharing code snippets'
    ],
    links: [
      {
        href: 'https://codepen.io/thomasbutler',
        label: 'View CodePen',
        icon: 'fa-brands fa-codepen'
      }
    ],
    icon: 'fa-pen-fancy',
    iconBg: '#000000',
    category: 'creative'
  },
  {
    id: 20,
    year: 2024,
    month: 4,
    date: formatDate(2024, 4),
    title: 'Experimenting with AI Tools',
    location: 'Liverpool, UK',
    institution: 'Self-Study',
    description: 'Began deep exploration of AI tools and models, staying on top of the rapidly evolving AI industry. This period marked the beginning of my journey into practical AI implementation and understanding.',
    achievements: [
      'Explored various AI platforms and models extensively',
      'Kept current with latest AI industry trends and developments',
      'Experimented with prompt engineering and model fine-tuning',
      'Started integrating AI tools into development workflow'
    ],
    links: [],
    icon: 'fa-wand-magic-sparkles',
    iconBg: '#A855F7',
    category: 'ai-ml'
  },
  {
    id: 21,
    year: 2023,
    month: 9,
    date: formatDate(2023, 9),
    title: 'Secured First Professional Role',
    location: 'Liverpool, UK',
    institution: 'Professional Career',
    description: 'Landed my first job in the tech industry, marking a significant milestone in my career transition. This role provided invaluable real-world experience and the opportunity to apply my self-taught skills in a professional environment.',
    achievements: [
      'Applied coding skills in a professional setting',
      'Gained experience working in agile development teams',
      'Contributed to production-level code and systems',
      'Expanded technical knowledge through on-the-job learning'
    ],
    links: [],
    icon: 'fa-briefcase',
    iconBg: '#3B82F6',
    category: 'career'
  },
  {
    id: 22,
    year: 2023,
    month: 6,
    date: formatDate(2023, 6),
    title: 'Python Development & First Projects',
    location: 'Liverpool, UK',
    institution: 'Personal Projects',
    description: 'Focused intensively on Python development, creating my first scripts and web applications. This period marked significant growth in practical programming skills and creative exploration with AI tools.',
    achievements: [
      'Practised Python and created automation scripts',
      'Built and launched first website using GoDaddy (now retired)',
      'Explored AI creative tools like Midjourney and DALL-E',
      'Developed understanding of web development fundamentals'
    ],
    links: [],
    icon: 'fa-brands fa-python',
    iconBg: '#FFD43B',
    category: 'project'
  },
  {
    id: 23,
    year: 2023,
    month: 2,
    date: formatDate(2023, 2),
    title: 'Cloud & Data Engineering Bootcamp',
    location: 'Liverpool, UK',
    institution: 'Professional Training',
    description: 'Enrolled in an intensive Cloud and Data Engineering bootcamp from February to April 2023. This comprehensive programme provided hands-on experience with modern cloud technologies and data processing frameworks.',
    achievements: [
      'Learnt cloud infrastructure fundamentals on AWS and Azure',
      'Studied data engineering principles and ETL pipelines',
      'Built projects using Python for data processing',
      'Gained experience with SQL and NoSQL databases'
    ],
    links: [],
    icon: 'fa-cloud',
    iconBg: '#0078D4',
    category: 'education'
  },
  {
    id: 24,
    year: 2022,
    month: 11,
    date: formatDate(2022, 11),
    title: 'Started My Coding Journey',
    location: 'Liverpool, UK',
    institution: 'Self-Directed Learning',
    description: 'Embarked on my programming journey, discovering a passion for technology and software development. This marked the beginning of an intensive self-learning period that would transform my career path.',
    achievements: [
      'Began learning programming fundamentals and computer science basics',
      'Discovered ChatGPT and used it as a learning companion',
      'Studied online through various platforms and tutorials',
      'Started exploring game development concepts and engines'
    ],
    links: [],
    icon: 'fa-flag-checkered',
    iconBg: '#10B981',
    category: 'personal'
  },
  {
    id: 25,
    year: 2000,
    month: 1,
    date: formatDate(2000, 1),
    title: 'Early Tech Passion & Life Journey',
    location: 'Liverpool, UK',
    institution: 'Life Experience',
    description: 'From childhood, I was fascinated by technology and gaming, loving the simplicity and UI design of classic games. Despite this passion, life took me on different paths - pursuing professional cricket and later commercial diving. It wasn\'t until AI emerged that I realised I could finally pursue my true calling.',
    achievements: [
      'Childhood obsession with tech - jailbreaking iPod Touch, installing Cydia repos',
      'Always the person with app ideas but no way to build them',
      'Pursued professional cricket, then commercial diving careers',
      'ADHD diagnosis brought clarity - realised I\'d always wanted to be a developer',
      'AI tools like ChatGPT bridged the gap, making programming accessible',
      'Now making up for lost time with intense dedication to coding'
    ],
    links: [],
    icon: 'fa-heart',
    iconBg: '#EF4444',
    category: 'personal'
  }
];

/**
 * Maps category to its corresponding colour code
 * @param {TimelineEntry['category']} category - Timeline entry category
 * @return {string} Hex colour code for the category
 */
export const getCategoryColor = (category: TimelineEntry['category']): string => {
  const colors = {
    'education': '#F59E0B',
    'project': '#6366F1',
    'career': '#3B82F6',
    'ai-ml': '#8B5CF6',
    'personal': '#10B981',
    'creative': '#EC4899'
  };
  return colors[category];
};
