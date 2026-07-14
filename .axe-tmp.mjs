import { chromium } from '@playwright/test';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { extname, join } from 'path';

const DIST = '/Users/tombutler/Repos/thomasjbutler.github.io/dist';
const AXE = readFileSync(
  '/Users/tombutler/Repos/thomasjbutler.github.io/node_modules/axe-core/axe.min.js',
  'utf8'
);

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.md': 'text/markdown',
};

const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  let file = join(DIST, p);
  try {
    const body = readFileSync(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
    return;
  } catch {}
  try {
    const body = readFileSync(join(DIST, p, 'index.html'));
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(body);
    return;
  } catch {}
  try {
    const body = readFileSync(join(DIST, p + '.html'));
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(body);
    return;
  } catch {}
  res.writeHead(404);
  res.end('nf');
});
await new Promise((r) => server.listen(4321, r));

const ROUTES = ['/', '/services', '/projects', '/about', '/contact', '/case-study', '/updates'];
const browser = await chromium.launch();

for (const theme of ['dark', 'light']) {
  for (const route of ROUTES) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(`localStorage.setItem('theme', ${JSON.stringify(theme)});`);
    const _r = await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' }); console.log('LOAD', route, _r.status(), JSON.stringify(await page.title()));
    await page.waitForTimeout(1500);
    await page.addScriptTag({ content: AXE });
    const results = await page.evaluate(async () => {
      return await window.axe.run(document, {
        resultTypes: ['violations'],
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
      });
    });
    if (results.violations.length) {
      console.log(`\n=== ${theme} ${route} ===`);
      for (const v of results.violations) {
        console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
        for (const n of v.nodes.slice(0, 4)) {
          console.log(`     - ${n.target.join(' ')}`);
          console.log(`       ${n.failureSummary?.replace(/\n/g, ' | ').slice(0, 400)}`);
        }
        if (v.nodes.length > 4) console.log(`     ... +${v.nodes.length - 4} more`);
      }
    } else {
      console.log(`ok  ${theme} ${route}`);
    }
    await ctx.close();
  }
}

await browser.close();
server.close();
