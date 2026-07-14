import { chromium } from '@playwright/test';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { extname, join } from 'path';
const AXE = readFileSync('./node_modules/axe-core/axe.min.js', 'utf8');
const DIST = './dist';
const MIME = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ico':'image/x-icon','.txt':'text/plain','.xml':'application/xml','.md':'text/markdown'};
const server = createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  for (const cand of [join(DIST,p), join(DIST,p,'index.html'), join(DIST,p+'.html')]) {
    try { const body = readFileSync(cand);
      res.writeHead(200,{'content-type': MIME[extname(cand)] ?? 'application/octet-stream','cache-control':'no-store'});
      res.end(body); return; } catch {}
  }
  res.writeHead(404,{'content-type':'text/html','cache-control':'no-store'}); res.end('<html><body>nf</body></html>');
});
await new Promise(r=>server.listen(4500,r));
const ROUTES = ['/', '/services', '/projects', '/about', '/contact', '/case-study', '/updates'];
const browser = await chromium.launch();
for (const theme of ['dark','light']) {
for (const route of ROUTES) {
  const ctx = await browser.newContext({viewport:{width:1280,height:900}});
  const page = await ctx.newPage();
  await page.addInitScript(`try{localStorage.setItem('theme','${theme}');}catch(e){}`);
  const r = await page.goto('http://127.0.0.1:4500'+route, {waitUntil:'load'});
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
