import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';

export default defineConfig({
  root: '.',
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Main entry - redirects to React app
        main: resolve(__dirname, 'index.html'),
        // React app - fully migrated v3.5
        react: resolve(__dirname, 'react.html'),
        // Blog redirect for backward compatibility
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
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
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
    open: '/react.html', // Open directly to correct URL to avoid base path warning
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