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
await new Promise(r=>server.listen(5222,r));
const browser=await chromium.launch();
for (const theme of ['dark','light']) {
  const ctx=await browser.newContext({viewport:{width:1280,height:900}});
  const page=await ctx.newPage();
  await page.addInitScript(`localStorage.setItem('theme','${theme}')`);
  await page.goto('http://127.0.0.1:5222/',{waitUntil:'load'});
  await page.waitForTimeout(2200);
  for (let i=0;i<13;i++) await page.keyboard.press('Tab');
  const info = await page.evaluate(()=>{const a=document.activeElement;const cs=getComputedStyle(a);
    return {txt:a.innerText, outline:cs.outline, boxShadow:cs.boxShadow, ring:cs.getPropertyValue('--tw-ring-color')};});
  console.log(theme, JSON.stringify(info,null,1));
  await page.screenshot({path:`/private/tmp/claude-501/-Users-tombutler-Repos-thomasjbutler-github-io/191ba966-b2ca-4d4a-9ecd-25aeece4f6d9/scratchpad/focus-${theme}.png`, clip:{x:40,y:560,width:420,height:90}});
  await ctx.close();
}
await browser.close(); server.close();
