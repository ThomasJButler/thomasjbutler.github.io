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
  if (!body) { res.writeHead(404,{'content-type':'text/html'}); res.end('nf'); return; }
  const ext = files.has(p) ? extname(p) : '.html';
  res.writeHead(200,{'content-type': MIME[ext] ?? 'application/octet-stream','cache-control':'no-store'});
  res.end(body);
});
await new Promise(r=>server.listen(4700,r));

// Patch getComputedStyle so any oklch()/color-mix() value resolves to rgb() via canvas.
const PATCH = `
(() => {
  const cnv = document.createElement('canvas'); cnv.width = cnv.height = 1;
  const cx = cnv.getContext('2d', { willReadFrequently: true });
  const cache = new Map();
  const toRgb = (v) => {
    if (!v || typeof v !== 'string') return v;
    if (!/oklch|oklab|lch\\(|lab\\(|color-mix|color\\(/i.test(v)) return v;
    if (cache.has(v)) return cache.get(v);
    let out = v;
    try {
      cx.clearRect(0,0,1,1);
      cx.fillStyle = '#000';
      cx.fillStyle = v;
      cx.globalCompositeOperation = 'copy';
      cx.fillRect(0,0,1,1);
      const d = cx.getImageData(0,0,1,1).data;
      out = d[3] === 255 ? \`rgb(\${d[0]}, \${d[1]}, \${d[2]})\` : \`rgba(\${d[0]}, \${d[1]}, \${d[2]}, \${(d[3]/255).toFixed(3)})\`;
    } catch (e) {}
    cache.set(v, out);
    return out;
  };
  const COLOR_PROPS = new Set(['color','background-color','backgroundColor','border-top-color','border-bottom-color','border-left-color','border-right-color','outline-color','text-shadow','box-shadow']);
  const orig = window.getComputedStyle.bind(window);
  window.getComputedStyle = function(el, ps) {
    const cs = orig(el, ps);
    return new Proxy(cs, {
      get(t, prop) {
        if (prop === 'getPropertyValue') {
          return (name) => COLOR_PROPS.has(name) ? toRgb(t.getPropertyValue(name)) : t.getPropertyValue(name);
        }
        const val = t[prop];
        if (typeof val === 'function') return val.bind(t);
        if (typeof prop === 'string' && COLOR_PROPS.has(prop)) return toRgb(val);
        return val;
      },
    });
  };
})();
`;

const ROUTES = ['/', '/services', '/projects', '/about', '/contact', '/case-study', '/updates'];
const browser = await chromium.launch();
for (const theme of ['dark','light']) {
for (const route of ROUTES) {
  const ctx = await browser.newContext({viewport:{width:1280,height:900}});
  const page = await ctx.newPage();
  await page.addInitScript(`try{localStorage.setItem('theme','${theme}');}catch(e){}`);
  const r = await page.goto('http://127.0.0.1:4700'+route, {waitUntil:'load'});
  if (r.status()!==200) { console.log('BAD', theme, route, r.status()); await ctx.close(); continue; }
  await page.waitForTimeout(2500);
  await page.evaluate(PATCH);
  await page.addScriptTag({content: AXE});
  const results = await page.evaluate(async () =>
    await window.axe.run(document, { resultTypes:['violations','incomplete'],
      runOnly: { type:'rule', values:['color-contrast'] } }));
  const say = (list, label) => {
    for (const v of list) {
      for (const n of v.nodes) {
        const s = (n.any||[]).map(a=>a.data).filter(Boolean)[0];
        console.log(`  ${label} ${route} [${theme}] ${n.target.join(' ').slice(0,90)}`);
        if (s) console.log(`      ratio=${s.contrastRatio} fg=${s.fgColor} bg=${s.bgColor} size=${s.fontSize} weight=${s.fontWeight} need=${s.expectedContrastRatio}`);
        else console.log(`      ${(n.failureSummary||'').replace(/\n/g,' | ').slice(0,200)}`);
      }
    }
  };
  say(results.violations, 'VIOLATION');
  await ctx.close();
}}
await browser.close(); server.close();
