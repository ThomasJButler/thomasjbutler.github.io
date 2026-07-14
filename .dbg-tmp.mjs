import { chromium } from '@playwright/test';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { extname, join } from 'path';
const DIST = '/Users/tombutler/Repos/thomasjbutler.github.io/dist';
const MIME = {'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ico':'image/x-icon','.txt':'text/plain','.xml':'application/xml','.md':'text/markdown'};
const server = createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  for (const cand of [join(DIST,p), join(DIST,p,'index.html'), join(DIST,p+'.html')]) {
    try { const body = readFileSync(cand);
      res.writeHead(200,{'content-type': MIME[extname(cand)] ?? 'application/octet-stream'});
      res.end(body); return; } catch {}
  }
  console.log('404 for', req.url);
  res.writeHead(404,{'content-type':'text/html'}); res.end('<html><body>nf</body></html>');
});
await new Promise(r=>server.listen(4322,r));
const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
page.on('console', m => console.log('CONSOLE:', m.type(), m.text().slice(0,200)));
page.on('pageerror', e => console.log('PAGEERROR:', String(e).slice(0,300)));
const r = await page.goto('http://localhost:4322/', {waitUntil:'networkidle'});
console.log('status', r.status(), 'title', await page.title());
console.log('h1s', await page.evaluate(()=>[...document.querySelectorAll('h1,h2,h3')].map(h=>h.tagName+':'+h.innerText.slice(0,40))));
await browser.close(); server.close();
