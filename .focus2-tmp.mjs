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
await new Promise(r=>server.listen(5333,r));
const browser=await chromium.launch();
const ctx=await browser.newContext({viewport:{width:1280,height:900}});
const page=await ctx.newPage();
await page.addInitScript(`localStorage.setItem('theme','dark')`);
await page.goto('http://127.0.0.1:5333/',{waitUntil:'load'});
await page.waitForTimeout(2200);
for (let i=0;i<13;i++) await page.keyboard.press('Tab');
console.log(await page.evaluate(()=>{
  const a=document.activeElement; const cs=getComputedStyle(a);
  return { tag:a.tagName, cls:a.className.slice(0,120),
    focusVisible: a.matches(':focus-visible'), focus: a.matches(':focus'),
    ringShadow: cs.getPropertyValue('--tw-ring-shadow'),
    ringColor: cs.getPropertyValue('--tw-ring-color'),
    outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth,
    boxShadow: cs.boxShadow };
}));
// same for the ⌘K plain button (not a shadcn Button)
await page.evaluate(()=>document.querySelector('.fx-kbd').focus());
console.log('fx-kbd', await page.evaluate(()=>{const a=document.activeElement;const cs=getComputedStyle(a);
  return {outline:cs.outlineStyle+' '+cs.outlineWidth+' '+cs.outlineColor, fv:a.matches(':focus-visible')};}));
// header nav link (plain <a>)
await page.evaluate(()=>document.querySelectorAll('header nav a')[0].focus());
console.log('nav a', await page.evaluate(()=>{const a=document.activeElement;const cs=getComputedStyle(a);
  return {outline:cs.outlineStyle+' '+cs.outlineWidth+' '+cs.outlineColor, fv:a.matches(':focus-visible')};}));
// accordion trigger on services
await page.goto('http://127.0.0.1:5333/services',{waitUntil:'load'});
await page.waitForTimeout(2200);
await page.evaluate(()=>document.querySelector('[data-slot="accordion-trigger"]').focus());
console.log('accordion', await page.evaluate(()=>{const a=document.activeElement;const cs=getComputedStyle(a);
  return {outline:cs.outlineStyle+' '+cs.outlineWidth, boxShadow:cs.boxShadow.slice(0,120), fv:a.matches(':focus-visible')};}));
// tabs trigger on projects
await page.goto('http://127.0.0.1:5333/projects',{waitUntil:'load'});
await page.waitForTimeout(2200);
await page.evaluate(()=>document.querySelector('[data-slot="tabs-trigger"]')?.focus());
console.log('tabs', await page.evaluate(()=>{const a=document.activeElement;const cs=getComputedStyle(a);
  return {tag:a.tagName, outline:cs.outlineStyle+' '+cs.outlineWidth, boxShadow:cs.boxShadow.slice(0,120)};}));
await browser.close(); server.close();
