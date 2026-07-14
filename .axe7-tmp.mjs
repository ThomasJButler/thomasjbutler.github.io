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
await new Promise(r=>server.listen(4800,r));

const PROBE = `
(() => {
  const cnv = document.createElement('canvas'); cnv.width=cnv.height=1;
  const cx = cnv.getContext('2d',{willReadFrequently:true});
  const px = (v) => { cx.globalCompositeOperation='source-over'; cx.clearRect(0,0,1,1); cx.fillStyle=v; cx.globalCompositeOperation='copy'; cx.fillRect(0,0,1,1); const d=cx.getImageData(0,0,1,1).data; return [d[0],d[1],d[2],d[3]/255]; };
  const lum = ([r,g,b]) => { const f=(c)=>{c/=255; return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);}; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
  const over = (fg,bg) => [0,1,2].map(i=>Math.round(fg[i]*fg[3]+bg[i]*(1-fg[3]))).concat([1]);
  const bgOf = (el) => {
    let acc = null; let n = el;
    const stack = [];
    while (n && n !== document.documentElement.parentNode) {
      const cs = getComputedStyle(n);
      const c = px(cs.backgroundColor);
      if (c[3] > 0) stack.push(c);
      n = n.parentElement;
    }
    stack.push([0,0,0,1]);
    let base = stack[stack.length-1];
    for (let i = stack.length-2; i >= 0; i--) base = over(stack[i], base);
    return base;
  };
  const ratio = (a,b) => { const l1=lum(a), l2=lum(b); const hi=Math.max(l1,l2), lo=Math.min(l1,l2); return (hi+0.05)/(lo+0.05); };
  window.__probe = (sel) => [...document.querySelectorAll(sel)].map(el => {
    const cs = getComputedStyle(el);
    const fg = px(cs.color);
    const bg = bgOf(el);
    const fgc = over(fg, bg);
    const size = parseFloat(cs.fontSize); const w = parseInt(cs.fontWeight)||400;
    const large = size >= 24 || (size >= 18.66 && w >= 700);
    return { sel, text: (el.textContent||'').trim().slice(0,32), ratio: +ratio(fgc,bg).toFixed(2),
      need: large ? 3 : 4.5, size, weight: w,
      fg: '#'+fgc.slice(0,3).map(x=>x.toString(16).padStart(2,'0')).join(''),
      bg: '#'+bg.slice(0,3).map(x=>x.toString(16).padStart(2,'0')).join('') };
  });
})();
`;

const SELECTORS = {
  '/services': ['.mb-7 > p.font-mono', '.mb-7 > h2', '.mb-7 > p.text-muted-foreground',
    '.text-meter', '.glow-meter', '[data-slot="badge"]', 'header nav a', 'header a', 'header button',
    '[data-slot="card-title"]', '[data-slot="card-description"]', '[data-slot="accordion-trigger"]',
    'button[data-slot="button"]', 'a[data-slot="button"]', '.fx-price', '.fx-kbd'],
  '/': ['.fx-big', '.fx-sub', '.fx-bootline', '.text-meter', '.glow-meter', 'header nav a', '.fx-scrollcue',
    '.mb-7 > h2', '.mb-7 > p'],
  '/case-study': ['.mb-2', '.mb-7 > h2', '.mb-7 > p'],
};
const browser = await chromium.launch();
for (const theme of ['dark','light']) {
  for (const [route, sels] of Object.entries(SELECTORS)) {
    const ctx = await browser.newContext({viewport:{width:1280,height:900}});
    const page = await ctx.newPage();
    await page.addInitScript(`try{localStorage.setItem('theme','${theme}');}catch(e){}`);
    await page.goto('http://127.0.0.1:4800'+route, {waitUntil:'load'});
    await page.waitForTimeout(2000);
    await page.evaluate(PROBE);
    console.log(`\n### ${theme} ${route}`);
    for (const s of sels) {
      const rows = await page.evaluate((sel)=>window.__probe(sel), s);
      const seen = new Set();
      for (const r of rows) {
        const k = r.ratio+'|'+r.fg+'|'+r.bg+'|'+r.size;
        if (seen.has(k)) continue; seen.add(k);
        const bad = r.ratio < r.need ? ' <<< FAIL' : '';
        console.log(`  ${bad?'!':' '} ${s.padEnd(34)} ${String(r.ratio).padStart(6)} need ${r.need}  ${r.size}px/${r.weight}  fg${r.fg} bg${r.bg}  "${r.text}"${bad}`);
      }
    }
    await ctx.close();
  }
}
await browser.close(); server.close();
