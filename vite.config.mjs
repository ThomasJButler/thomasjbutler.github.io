import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';

// Route metadata (titles, descriptions, the prerender list) lives in scripts/routes.mjs,
// so the build script and the config cannot disagree about what the routes are.

export default defineConfig({
  root: '.',
  base: '/',
  build: {
    outDir: 'dist',
    // Emit dist/.vite/manifest.json so scripts/prerender.mjs can map a route's source
    // module (src/pages/AboutPage.tsx) to its content-hashed chunk and preload it.
    manifest: true,
    rollupOptions: {
      input: {
        // index.html IS the app. It used to be a stub that JS-redirected to
        // react.html, which cost every cold visit a full extra navigation — and meant
        // the page Google and LinkedIn actually crawled was the stub, not the site.
        main: resolve(__dirname, 'index.html'),
        // Legacy blog URLs.
        blog: resolve(__dirname, 'blog.html'),
        // /services, the shelved Local & Private AI offer (August 2026). Still linked from
        // LinkedIn and the commercial site, so it redirects to /about rather than 404ing.
        services: resolve(__dirname, 'services.html'),
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
    // NOTE: the SPA 404 fallback and the per-route meta plugins used to live here.
    // Both now happen in scripts/prerender.mjs, which also injects the rendered markup:
    // two separate things writing the same dist/*.html files is exactly how they drift.
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