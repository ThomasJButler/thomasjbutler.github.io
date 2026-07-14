import { chromium } from '@playwright/test';
import { readFileSync, readdirSync, statSync } from 'fs';
import { createServer } from 'http';
import { extname, join, relative } from 'path';
const DIST = './dist';
const MIME = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ico':'image/x-icon','.txt':'text/plain','.xml':'application/xml','.md':'text/markdown'};
const files = new Map();
(function walk(d){ for (const e of readdirSync(d)) { const f = join(d,e);
  if (statSync(f).isDirectory()) walk(f); else files.set('/'+relative(DIST,f), readFileSync(f)); } })(DIST);
const server = createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const body = files.get(p) ?? files.get(p+'/index.html') ?? files.get(p+'.html');
  if (!body) { res.writeHead(404); res.end('nf'); return; }
  const ext = files.has(p) ? extname(p) : '.html';
  res.writeHead(200,{'content-type': MIME[ext] ?? 'application/octet-stream','cache-control':'no-store'});
  res.end(body);
});
await new Promise(r=>server.listen(4900,r));
const browser = await chromium.launch();
const ctx = await browser.newContext({ javaScriptEnabled: false, viewport:{width:1280,height:900} });
for (const route of ['/', '/services', '/case-study']) {
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4900'+route, {waitUntil:'load'});
  await page.waitForTimeout(800);
  const name = route === '/' ? 'home' : route.slice(1);
  await page.screenshot({ path: `/private/tmp/claude-501/-Users-tombutler-Repos-thomasjbutler-github-io/191ba966-b2ca-4d4a-9ecd-25aeece4f6d9/scratchpad/nojs-${name}.png`, fullPage: false });
  // is the html.dark class present without JS?
  const cls = await page.evaluate(()=>document.documentElement.className).catch(()=>'(js off)');
  console.log(route, 'htmlClass=', JSON.stringify(cls));
  await page.close();
}
await ctx.close();
// with JS, dark, full page screenshot of case-study to inspect scrim
const ctx2 = await browser.newContext({viewport:{width:1280,height:900}});
const p2 = await ctx2.newPage();
await p2.addInitScript(`localStorage.setItem('theme','dark')`);
await p2.goto('http://127.0.0.1:4900/case-study',{waitUntil:'load'});
await p2.waitForTimeout(2500);
await p2.screenshot({path:'/private/tmp/claude-501/-Users-tombutler-Repos-thomasjbutler-github-io/191ba966-b2ca-4d4a-9ecd-25aeece4f6d9/scratchpad/js-casestudy.png'});
await browser.close(); server.close();
