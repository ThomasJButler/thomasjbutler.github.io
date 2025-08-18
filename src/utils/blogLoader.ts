export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: number;
  publishDate: string;
  tags: string[];
  featured: boolean;
}

// Blog metadata mapping
const blogMetadata: Record<string, Partial<BlogPost>> = {
  'ai-that-codes-like-you': {
    title: 'AI That Codes Like You',
    excerpt: 'Building AI systems that understand and replicate individual coding styles',
    tags: ['AI', 'Machine Learning', 'Development'],
    featured: true
  },
  'building-bridges-not-replacements': {
    title: 'Building Bridges, Not Replacements',
    excerpt: 'How technology should empower humans rather than replace them',
    tags: ['Tech Philosophy', 'Human-Centered Design'],
    featured: false
  },
  'context-as-the-new-oil': {
    title: 'Context as the New Oil',
    excerpt: 'Why context is becoming the most valuable resource in AI development',
    tags: ['AI', 'Context Management'],
    featured: true
  },
  'context-engineering-101': {
    title: 'Context Engineering 101',
    excerpt: 'A comprehensive guide to managing context in AI systems',
    tags: ['AI', 'Engineering', 'Tutorial'],
    featured: false
  },
  'context-loss-productivity-killer': {
    title: 'Context Loss: The Productivity Killer',
    excerpt: 'How context loss impacts development productivity and how to prevent it',
    tags: ['Productivity', 'Development'],
    featured: false
  },
  'dehumanization-of-development': {
    title: 'The Dehumanization of Development',
    excerpt: 'Addressing the loss of human touch in modern software development',
    tags: ['Tech Philosophy', 'Development Culture'],
    featured: false
  },
  'democratizing-ai-development': {
    title: 'Democratizing AI Development',
    excerpt: 'Making AI accessible to developers of all skill levels',
    tags: ['AI', 'Accessibility', 'Education'],
    featured: true
  },
  'evolution-of-ai-assistance': {
    title: 'The Evolution of AI Assistance',
    excerpt: 'From simple autocomplete to intelligent coding partners',
    tags: ['AI', 'History', 'Future Tech'],
    featured: false
  },
  'from-prompts-to-context-systems': {
    title: 'From Prompts to Context Systems',
    excerpt: 'The paradigm shift in AI interaction models',
    tags: ['AI', 'System Design'],
    featured: false
  },
  'git-for-ai-memory': {
    title: 'Git for AI Memory',
    excerpt: 'Version control concepts applied to AI context management',
    tags: ['AI', 'Git', 'Innovation'],
    featured: false
  },
  'losing-craftsmanship-to-automation': {
    title: 'Losing Craftsmanship to Automation',
    excerpt: 'Preserving the art of coding in an automated world',
    tags: ['Craftsmanship', 'Automation'],
    featured: false
  },
  'making-ai-more-human': {
    title: 'Making AI More Human',
    excerpt: 'Beyond the uncanny valley of code generation',
    tags: ['AI', 'UX', 'Human-Centered Design'],
    featured: true
  },
  'manifesto-human-first-tech': {
    title: 'Manifesto: Human-First Tech',
    excerpt: 'A call for technology that serves humanity',
    tags: ['Tech Philosophy', 'Manifesto'],
    featured: true
  },
  'solving-ai-amnesia': {
    title: 'Solving AI Amnesia',
    excerpt: 'Addressing the memory problem in current AI systems',
    tags: ['AI', 'Problem Solving'],
    featured: false
  },
  'tech-burnout-crisis': {
    title: 'The Tech Burnout Crisis',
    excerpt: 'Understanding and addressing developer burnout in the AI age',
    tags: ['Mental Health', 'Developer Wellness'],
    featured: false
  },
  'tech-that-adapts-to-humans': {
    title: 'Tech That Adapts to Humans',
    excerpt: 'Building adaptive systems that understand individual needs',
    tags: ['Adaptive Tech', 'UX'],
    featured: false
  },
  'the-copy-paste-culture': {
    title: 'The Copy-Paste Culture',
    excerpt: 'How AI is changing the way we write and think about code',
    tags: ['Development Culture', 'AI Impact'],
    featured: false
  },
  'the-empathy-gap-in-ai': {
    title: 'The Empathy Gap in AI',
    excerpt: 'Why AI lacks emotional intelligence and how to fix it',
    tags: ['AI', 'Emotional Intelligence'],
    featured: false
  },
  'the-personalization-revolution': {
    title: 'The Personalization Revolution',
    excerpt: 'How personalized AI will transform development',
    tags: ['AI', 'Personalization', 'Future Tech'],
    featured: false
  },
  'why-ai-feels-robotic': {
    title: 'Why AI Feels Robotic',
    excerpt: 'Understanding the uncanny valley of AI interactions',
    tags: ['AI', 'UX', 'Psychology'],
    featured: false
  }
};

// Calculate reading time (assuming 200 words per minute)
function calculateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

// Generate excerpt from content if not provided
function generateExcerpt(content: string, maxLength: number = 150): string {
  const cleanContent = content
    .replace(/^#.*$/gm, '') // Remove headers
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/[*_`]/g, '') // Remove formatting
    .trim();
  
  if (cleanContent.length <= maxLength) return cleanContent;
  return cleanContent.substring(0, maxLength).trim() + '...';
}

// Get the correct base path for the current environment
function getBasePath(): string {
  // In development, Vite serves files from root
  if (import.meta.env.DEV) {
    return '';
  }
  // In production, use the configured base path
  return '/ThomasJButler';
}

// Load a single blog post
export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const basePath = getBasePath();
    const response = await fetch(`${basePath}/docs/blog/${slug}.md`);
    if (!response.ok) return null;
    
    const content = await response.text();
    const metadata = blogMetadata[slug] || {};
    
    // Extract title from first H1 if not in metadata
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = metadata.title || (titleMatch ? titleMatch[1] : slug);
    
    return {
      id: slug,
      slug,
      title,
      excerpt: metadata.excerpt || generateExcerpt(content),
      content,
      readTime: calculateReadTime(content),
      publishDate: metadata.publishDate || '2024-01-01',
      tags: metadata.tags || [],
      featured: metadata.featured || false
    };
  } catch (error) {
    console.error(`Failed to load blog post: ${slug}`, error);
    return null;
  }
}

// Load all blog posts
export async function loadAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = Object.keys(blogMetadata);
  const posts = await Promise.all(slugs.map(slug => loadBlogPost(slug)));
  
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      // Featured posts first, then by title
      if (a.featured !== b.featured) return b.featured ? 1 : -1;
      return a.title.localeCompare(b.title);
    });
}

// Search blog posts
export function searchBlogPosts(posts: BlogPost[], query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Filter posts by tag
export function filterByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter(post => post.tags.includes(tag));
}

// Get all unique tags
export function getAllTags(posts: BlogPost[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}