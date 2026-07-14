import { chromium } from 'playwright';

// Same flow, JS disabled: does the meta-refresh still land somewhere readable?
const b = await chromium.launch();
const ctx = await b.newContext({ javaScriptEnabled: false });
const p = await ctx.newPage();
await p.goto('http://localhost:4599/blog.html', { waitUntil: 'load' });
await p.waitForTimeout(2000);
console.log('NO-JS final url  :', p.url());
console.log('NO-JS title      :', await p.title());
const h1 = await p.locator('h1').first().textContent().catch(() => '(none)');
console.log('NO-JS h1         :', (h1 || '').trim().replace(/\s+/g, ' ').slice(0, 80));
const links = await p.locator('a').count();
console.log('NO-JS links avail:', links);
await b.close();
