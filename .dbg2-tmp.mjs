import { chromium } from '@playwright/test';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { extname, join } from 'path';
const DIST = './dist';
const MIME = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ico':'image/x-icon','.txt':'text/plain','.xml':'application/xml','.md':'text/markdown'};
const server = createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  for (const cand of [join(DIST,p), join(DIST,p,'index.html'), join(DIST,p+'.html')]) {
    try { const body = readFileSync(cand);
      res.writeHead(200,{'content-type': MIME[extname(cand)] ?? 'application/octet-stream', 'cache-control':'no-store'});
      res.end(body); return; } catch(e) { if (e.code !== 'ENOENT' && e.code !== 'EISDIR' && e.code !== 'ENOTDIR') console.log('ERR', cand, e.code); }
  }
  console.log('>>> 404', req.url, JSON.stringify(req.headers['sec-fetch-dest']||''));
  res.writeHead(404,{'content-type':'text/html','cache-control':'no-store'}); res.end('<html><body>nf</body></html>');
});
await new Promise(r=>server.listen(4500,r));
const ROUTES = ['/', '/services', '/projects', '/about', '/contact', '/case-study', '/updates'];
const browser = await chromium.launch();
for (const route of ROUTES) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const r = await page.goto('http://127.0.0.1:4500'+route, {waitUntil:'load'});
  console.log(route, r.status(), JSON.stringify((await page.title()).slice(0,30)));
  await ctx.close();
}
await browser.close(); server.close();
