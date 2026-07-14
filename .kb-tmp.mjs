import { chromium } from '@playwright/test';
import { readFileSync, readdirSync, statSync } from 'fs';
import { createServer } from 'http';
import { extname, join, relative } from 'path';
const DIST='./dist';
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ico':'image/x-icon','.txt':'text/plain','.xml':'application/xml','.md':'text/markdown'};
const files=new Map();
(function walk(d){for(const e of readdirSync(d)){const f=join(d,e);if(statSync(f).isDirectory())walk(f);else files.set('/'+relative(DIST,f),readFileSync(f));}})(DIST);
const server=createServer((req,res)=>{let p=decodeURIComponent(req.url.split('?')[0]);if(p==='/')p='/index.html';
 const b=files.get(p)??files.get(p+'/index.html')??files.get(p+'.html');
 if(!b){res.writeHead(404);res.end('nf');return;}
 res.writeHead(200,{'content-type':MIME[files.has(p)?extname(p):'.html']??'application/octet-stream','cache-control':'no-store'});res.end(b);});
await new Promise(r=>server.listen(5111,r));
const browser=await chromium.launch();
const ctx=await browser.newContext({viewport:{width:1280,height:900}});
const page=await ctx.newPage();
await page.addInitScript(`localStorage.setItem('theme','dark')`);
await page.goto('http://127.0.0.1:5111/services',{waitUntil:'load'});
await page.waitForTimeout(2000);

console.log('--- role=region elements on /services:');
console.log(await page.evaluate(()=>[...document.querySelectorAll('[role="region"]')].map(e=>({
  tag:e.tagName, cls:e.className.slice(0,40), label:e.getAttribute('aria-label'), lb:e.getAttribute('aria-labelledby'), hidden:e.hasAttribute('hidden')}))));

console.log('\n--- landmarks:');
console.log(await page.evaluate(()=>[...document.querySelectorAll('header,nav,main,footer,aside,[role]')].map(e=>e.tagName+'['+(e.getAttribute('role')||'')+'] '+(e.getAttribute('aria-label')||'')).slice(0,25)));

console.log('\n--- headings on each route:');
for (const r of ['/','/services','/projects','/about','/contact','/case-study','/updates']) {
  await page.goto('http://127.0.0.1:5111'+r,{waitUntil:'load'});
  await page.waitForTimeout(1800);
  const hs = await page.evaluate(()=>[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h=>h.tagName+' '+(h.innerText||'').replace(/\s+/g,' ').trim().slice(0,44)));
  console.log(' '+r);
  hs.forEach(h=>console.log('    '+h));
}

console.log('\n--- tab order on / (first 16):');
await page.goto('http://127.0.0.1:5111/',{waitUntil:'load'});
await page.waitForTimeout(2000);
for (let i=0;i<16;i++){
  await page.keyboard.press('Tab');
  const info = await page.evaluate(()=>{const a=document.activeElement; if(!a) return 'none';
    const cs=getComputedStyle(a);
    return `${a.tagName}.${(a.className||'').toString().split(' ')[0]} "${(a.innerText||a.getAttribute('aria-label')||'').slice(0,26).replace(/\n/g,' ')}" outline=${cs.outlineWidth} ${cs.outlineStyle}`;});
  console.log('  '+(i+1)+'. '+info);
}
await browser.close(); server.close();
