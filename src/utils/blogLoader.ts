/**
 * @author Tom Butler
 * @date 2025-10-27
 * @description Blog post loading and management utilities.
 *              Handles fetching markdown blog posts, metadata parsing,
 *              and post filtering/searching functionality.
 */

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
    publishDate: '2025-09-20'
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
    publishDate: '2025-10-15'
  }
};

/**
 * Calculates reading time based on average reading speed
 * @param {string} content - Markdown content to analyse
 * @return {number} Estimated reading time in minutes
 */
function calculateReadTime(content: string): number {
  // Uses industry standard 200 words per minute
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

/**
 * Generates excerpt from markdown content
 * @param {string} content - Full markdown content
 * @param {number} [maxLength=150] - Maximum excerpt length in characters
 * @return {string} Clean excerpt with ellipsis if truncated
 */
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

/**
 * Determines correct base path for current environment
 * @return {string} Base path for asset loading
 */
function getBasePath(): string {
  // In development, use the Vite dev server root
  if (import.meta.env.DEV) {
    return '';
  }
  // In production, use root path
  return '';
}

/**
 * Loads a single blog post by slug
 * @param {string} slug - URL-friendly post identifier
 * @return {Promise<BlogPost|null>} Blog post data or null if not found
 */
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

/**
 * Loads all available blog posts
 * @return {Promise<BlogPost[]>} Array of blog posts sorted by date descending
 */
export async function loadAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = Object.keys(blogMetadata);
  const posts = await Promise.all(slugs.map(slug => loadBlogPost(slug)));
  
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      // Sort by date descending (most recent first)
      // YYYY-MM-DD format works directly with Date constructor
      const dateA = new Date(a.publishDate);
      const dateB = new Date(b.publishDate);
      return dateB.getTime() - dateA.getTime();
    });
}

/**
 * Searches blog posts by query string
 * @param {BlogPost[]} posts - Posts to search through
 * @param {string} query - Search query (case-insensitive)
 * @return {BlogPost[]} Filtered posts matching query
 */
export function searchBlogPosts(posts: BlogPost[], query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  
  // Searches across title, excerpt, and tags
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Filters posts by specific tag
 * @param {BlogPost[]} posts - Posts to filter
 * @param {string} tag - Tag to filter by (exact match)
 * @return {BlogPost[]} Posts containing the specified tag
 */
export function filterByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter(post => post.tags.includes(tag));
}

/**
 * Extracts all unique tags from posts
 * @param {BlogPost[]} posts - Posts to extract tags from
 * @return {string[]} Sorted array of unique tags
 */
export function getAllTags(posts: BlogPost[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}
