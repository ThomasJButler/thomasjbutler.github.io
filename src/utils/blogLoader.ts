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
    featured: true,
    publishDate: '2025-08-15'
  },
  'building-bridges-not-replacements': {
    title: 'Building Bridges, Not Replacements',
    excerpt: 'How technology should empower humans rather than replace them',
    tags: ['Tech Philosophy', 'Human-Centered Design'],
    featured: false,
    publishDate: '2024-11-28'
  },
  'context-engineering-101': {
    title: 'Context Engineering 101',
    excerpt: 'A comprehensive guide to managing context in AI systems',
    tags: ['AI', 'Engineering', 'Tutorial'],
    featured: false,
    publishDate: '2025-03-14'
  },
  'context-loss-productivity-killer': {
    title: 'Context Loss: The Productivity Killer',
    excerpt: 'How context loss impacts development productivity and how to prevent it',
    tags: ['Productivity', 'Development'],
    featured: false,
    publishDate: '2025-01-08'
  },
  'from-prompts-to-context-systems': {
    title: 'From Prompts to Context Systems',
    excerpt: 'The paradigm shift in AI interaction models',
    tags: ['AI', 'System Design'],
    featured: false,
    publishDate: '2025-04-25'
  },
  'losing-craftsmanship-to-automation': {
    title: 'Losing Craftsmanship to Automation',
    excerpt: 'Preserving the art of coding in an automated world',
    tags: ['Craftsmanship', 'Automation'],
    featured: false,
    publishDate: '2024-11-05'
  },
  'making-ai-more-human': {
    title: 'Making AI More Human',
    excerpt: 'Beyond the uncanny valley of code generation',
    tags: ['AI', 'UX', 'Human-Centered Design'],
    featured: true,
    publishDate: '2025-08-03'
  },
  'manifesto-human-first-tech': {
    title: 'Manifesto: Human-First Tech',
    excerpt: 'A call for technology that serves humanity',
    tags: ['Tech Philosophy', 'Manifesto'],
    featured: true,
    publishDate: '2025-07-10'
  },
  'tech-burnout-crisis': {
    title: 'The Tech Burnout Crisis',
    excerpt: 'Understanding and addressing developer burnout in the AI age',
    tags: ['Mental Health', 'Developer Wellness'],
    featured: false,
    publishDate: '2024-10-08'
  },
  'the-personalization-revolution': {
    title: 'The Personalisation Revolution',
    excerpt: 'How personalised AI will transform development',
    tags: ['AI', 'Personalisation', 'Future Tech'],
    featured: false,
    publishDate: '2025-08-20'
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
  // In development, use the Vite dev server
  if (import.meta.env.DEV) {
    // In development, files are served from the root
    return '';
  }
  // In production, use the full base path
  return '/ThomasJButler';
}

// Load a single blog post
export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const basePath = getBasePath();
    const url = `${basePath}/src/content/blog/${slug}.md`;
    
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to fetch blog post: ${slug}, Status: ${response.status}`);
      return null;
    }
    
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
      // Sort by date descending (most recent first)
      const dateA = new Date(a.publishDate.split('/').reverse().join('-'));
      const dateB = new Date(b.publishDate.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
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