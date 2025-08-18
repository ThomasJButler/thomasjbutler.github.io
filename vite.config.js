import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs';

export default defineConfig({
  root: '.',
  base: '/ThomasJButler/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Main static portfolio site
        main: resolve(__dirname, 'index.html'),
        // React app (for gradual migration)
        react: resolve(__dirname, 'react.html'),
        // Other HTML pages
        about: resolve(__dirname, 'about.html'),
        skills: resolve(__dirname, 'skills.html'),
        projects: resolve(__dirname, 'projects.html'),
        services: resolve(__dirname, 'services.html'),
        contact: resolve(__dirname, 'contact.html'),
        sitemap: resolve(__dirname, 'sitemap.html'),
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
  // Custom plugin to copy blog markdown files
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    {
      name: 'copy-blog-files',
      writeBundle() {
        const blogSrcDir = resolve(__dirname, 'docs/blog');
        const blogDestDir = resolve(__dirname, 'dist/docs/blog');
        
        // Ensure destination directory exists
        if (!existsSync(resolve(__dirname, 'dist/docs'))) {
          mkdirSync(resolve(__dirname, 'dist/docs'), { recursive: true });
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
    open: true,
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