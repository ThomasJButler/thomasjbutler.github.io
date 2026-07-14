import { chromium } from '@playwright/test';
import { readFileSync, readdirSync, statSync } from 'fs';
import { createServer } from 'http';
import { extname, join, relative } from 'path';
const AXE = readFileSync('./node_modules/axe-core/axe.min.js','utf8');
const DIST = './dist';
const MIME = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ico':'image/x-icon','.txt':'text/plain','.xml':'application/xml','.md':'text/markdown'};
const files = new Map();
(function walk(d){ for (const e of readdirSync(d)) { const f = join(d,e);
  if (statSync(f).isDirectory()) walk(f); else files.set('/'+relative(DIST,f), readFileSync(f)); } })(DIST);
const server = createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const body = files.get(p) ?? files.get(p+'/index.html') ?? files.get(p+'.html');
  if (!body) { res.writeHead(404,{'content-type':'text/html'}); res.end('<html><body>nf</body></html>'); return; }
  const ext = files.has(p) ? extname(p) : '.html';
  res.writeHead(200,{'content-type': MIME[ext] ?? 'application/octet-stream','cache-control':'no-store'});
  res.end(body);
});
await new Promise(r=>server.listen(4600,r));
const ROUTES = ['/', '/services', '/projects', '/about', '/contact', '/case-study', '/updates'];
const browser = await chromium.launch();
for (const theme of ['dark','light']) {
for (const route of ROUTES) {
  const ctx = await browser.newContext({viewport:{width:1280,height:900}});
  const page = await ctx.newPage();
  await page.addInitScript(`try{localStorage.setItem('theme','${theme}');}catch(e){}`);
  const r = await page.goto('http://127.0.0.1:4600'+route, {waitUntil:'load'});
  if (r.status()!==200) { console.log('BAD', theme, route, r.status()); await ctx.close(); continue; }
  await page.waitForTimeout(2500);
  await page.addScriptTag({content: AXE});
  const results = await page.evaluate(async () =>
    await window.axe.run(document, { resultTypes:['violations'],
      rules: { 'color-contrast': { enabled:false } },
      runOnly: { type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice'] } }));
  if (results.violations.length) {
    console.log(`\n=== ${theme} ${route} ===`);
    for (const v of results.violations) {
      console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
      for (const n of v.nodes.slice(0,6)) {
        console.log(`     - ${n.target.join(' ')}`);
        console.log(`       ${(n.failureSummary||'').replace(/\n/g,' | ').slice(0,260)}`);
      }
      if (v.nodes.length>6) console.log(`     ... +${v.nodes.length-6} more`);
    }
  } else console.log(`ok  ${theme} ${route}`);
  await ctx.close();
}}
await browser.close(); server.close();
