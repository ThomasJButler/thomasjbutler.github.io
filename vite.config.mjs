import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';

const SITE = 'https://thomasjbutler.github.io';

/**
 * Title and description per route, for crawlers and social cards.
 *
 * /services is the one that matters most: it is the page the commercial site links to.
 */
const ROUTE_META = [
  {
    path: '/services',
    title: 'Local & Private AI for business | Tom Butler',
    description:
      'Private AI systems that run on your own hardware. Local LLM setups, private RAG knowledge systems, and honest AI cost and privacy audits. Fixed fees, no per-token bills, and your data never leaves your building.',
  },
  {
    path: '/projects',
    title: 'Projects | Tom Butler, Full Stack AI Engineer',
    description:
      'AI, web and mobile projects: model comparison tooling, natural-language SQL, document Q&A with RAG, automated PR review, and an offline on-device iOS app.',
  },
  {
    path: '/case-study',
    title: 'Case study: private RAG for security questionnaires | Tom Butler',
    description:
      'A RAG agent that drafts supplier security questionnaires, grounds every answer in your own policy, cites its sources, and flags the ones a human needs to check. Runs entirely on infrastructure you control.',
  },
  {
    path: '/about',
    title: 'About | Tom Butler, Full Stack AI Engineer',
    description:
      'Full Stack AI Engineer in York. Local and private AI for businesses, contributor to open source local AI, and building Sanctuary, an offline on-device app for neurodiverse users.',
  },
  {
    path: '/contact',
    title: 'Contact | Tom Butler',
    description:
      'Talk through a project. If local AI is the wrong answer for you, I will say so.',
  },
  {
    path: '/updates',
    title: 'Dev Journey | Tom Butler',
    description:
      'Two and a half decades from a kid watching green code rain to building AI systems for a living.',
  },
];

export default defineConfig({
  root: '.',
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // index.html IS the app. It used to be a stub that JS-redirected to
        // react.html, which cost every cold visit a full extra navigation — and meant
        // the page Google and LinkedIn actually crawled was the stub, not the site.
        main: resolve(__dirname, 'index.html'),
        // Legacy blog URLs.
        blog: resolve(__dirname, 'blog.html'),
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,  // Keep console logs for debugging
        drop_debugger: true
      }
    }
  },
  // Custom plugins
  plugins: [
    react(),
    tailwindcss(),
    // In dev, rewrite / to serve react.html so React Router sees clean paths
    {
      name: 'spa-rewrite',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          // Rewrite clean SPA routes to the app entry so React Router sees them.
          if (req.url === '/' || (!req.url.includes('.') && !req.url.startsWith('/@') && !req.url.startsWith('/src') && !req.url.startsWith('/node_modules'))) {
            req.url = '/index.html';
          }
          next();
        });
      }
    },
    // Development middleware to serve blog markdown files
    {
      name: 'serve-blog-files',
      configureServer(server) {
        // Serve markdown files from /src/content/blog path
        server.middlewares.use((req, res, next) => {
          // Check if this is a request for a blog markdown file
          const url = req.url;
          let blogPath = null;

          if (url.startsWith('/src/content/blog/')) {
            blogPath = url.replace('/src/content/blog/', '');
          } else if (url.startsWith('/src/content/blog/')) {
            blogPath = url.replace('/src/content/blog/', '');
          }

          if (blogPath && blogPath.endsWith('.md')) {
            const filePath = resolve(__dirname, 'src/content/blog', blogPath);
            
            if (existsSync(filePath)) {
              try {
                const content = readFileSync(filePath, 'utf-8');
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Cache-Control', 'no-cache');
                res.end(content);
                return;
              } catch (error) {
                console.error('Error serving blog file:', error);
              }
            }
          }
          
          next();
        });

        // Redirect blog article routes to React app with hash
        server.middlewares.use('/blog/', (req, res, next) => {
          // Extract the blog slug from the URL
          const path = req.url;
          const slug = path.split('/').pop();
          
          if (slug && slug !== 'blog') {
            // Redirect to react.html with hash routing
            const redirectUrl = `/react.html#/blog/${slug}`;
            res.writeHead(302, { Location: redirectUrl });
            res.end();
          } else {
            // For /blog route, redirect to blog list
            const redirectUrl = `/react.html#/blog`;
            res.writeHead(302, { Location: redirectUrl });
            res.end();
          }
        });
      }
    },
    // SPA fallback: GitHub Pages serves 404.html for any path it has no file for, so
    // a copy of the app entry there is what makes deep links (/services) resolve.
    {
      name: 'spa-fallback',
      writeBundle() {
        const entry = resolve(__dirname, 'dist/index.html');
        const fallback = resolve(__dirname, 'dist/404.html');
        if (existsSync(entry)) {
          copyFileSync(entry, fallback);
          console.log('Created 404.html SPA fallback');
        }
      }
    },
    // Per-route social meta.
    //
    // This is a SPA with one set of <meta> tags, and LinkedIn, X, Facebook and Slack
    // do not run JavaScript — so sharing /services previewed as the homepage ("Hey,
    // I'm Tom"), which matters a lot now the commercial site links here.
    //
    // For each route we write dist/<route>/index.html: the same built app, with the
    // title, description and og:* swapped. The app still hydrates and takes over, so
    // nothing about the SPA changes. It also means a direct hit on /services is served
    // its own file instead of going through the 404 fallback.
    {
      name: 'per-route-meta',
      writeBundle() {
        const entryPath = resolve(__dirname, 'dist/index.html');
        if (!existsSync(entryPath)) return;
        const entry = readFileSync(entryPath, 'utf-8');

        for (const route of ROUTE_META) {
          const html = entry
            .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
            .replace(
              /(<meta\s+name="description"\s+content=")[^"]*(")/,
              `$1${route.description}$2`
            )
            .replace(
              /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
              `$1${route.title}$2`
            )
            .replace(
              /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
              `$1${route.description}$2`
            )
            .replace(
              /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
              `$1${route.title}$2`
            )
            .replace(
              /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
              `$1${route.description}$2`
            )
            .replace(
              /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
              `$1${SITE}${route.path}$2`
            )
            .replace(
              /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
              `$1${SITE}${route.path}$2`
            );

          const dir = resolve(__dirname, 'dist', route.path.replace(/^\//, ''));
          mkdirSync(dir, { recursive: true });
          writeFileSync(resolve(dir, 'index.html'), html);
        }
        console.log(`Wrote per-route meta for ${ROUTE_META.length} routes`);
      }
    },
    // Build-time plugin to copy blog markdown files
    {
      name: 'copy-blog-files',
      writeBundle() {
        const blogSrcDir = resolve(__dirname, 'src/content/blog');
        const blogDestDir = resolve(__dirname, 'dist/src/content/blog');

        // Ensure destination directory exists
        if (!existsSync(resolve(__dirname, 'dist/src'))) {
          mkdirSync(resolve(__dirname, 'dist/src/content'), { recursive: true });
        }
        if (!existsSync(blogDestDir)) {
          mkdirSync(blogDestDir, { recursive: true });
        }
        
        // Copy all markdown files
        if (existsSync(blogSrcDir)) {
          const files = readdirSync(blogSrcDir);
          files.forEach(file => {
            if (file.endsWith('.md')) {
              copyFileSync(resolve(blogSrcDir, file), resolve(blogDestDir, file));
              console.log(`Copied blog file: ${file}`);
            }
          });
        }
      }
    }
  ],
  server: {
    port: 3000,
    open: '/',
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@css': resolve(__dirname, './src/css'),
      '@js': resolve(__dirname, './src/js'),
      '@images': resolve(__dirname, './src/images')
    }
  }
});