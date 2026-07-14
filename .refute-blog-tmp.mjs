import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage();

const nav = [];
p.on('framenavigated', (f) => { if (f === p.mainFrame()) nav.push(f.url()); });
const docs = [];
p.on('response', (r) => {
  if (r.request().resourceType() === 'document') docs.push(`${r.status()}  ${r.url()}`);
});
const errs = [];
p.on('pageerror', (e) => errs.push(String(e).split('\n')[0]));

await p.goto('http://localhost:4599/blog.html', { waitUntil: 'networkidle' });
await p.waitForTimeout(3000);

console.log('--- document responses (in order) ---');
docs.forEach((s) => console.log('   ', s));
console.log('--- main-frame navigations ---');
nav.forEach((u) => console.log('   ', u));
console.log('--- page errors ---');
console.log(errs.length ? errs.map((e) => '    ' + e).join('\n') : '    (none)');
console.log('--- FINAL STATE ---');
console.log('    url   :', p.url());
console.log('    title :', await p.title());
const h1 = await p.locator('h1').first().textContent().catch(() => '(none)');
console.log('    h1    :', (h1 || '').trim().replace(/\s+/g, ' ').slice(0, 100));
const body = (await p.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 200);
console.log('    body  :', body);
console.log('    header/nav links:', await p.locator('header a, nav a').count());

await p.screenshot({
  path: '/private/tmp/claude-501/-Users-tombutler-Repos-thomasjbutler-github-io/191ba966-b2ca-4d4a-9ecd-25aeece4f6d9/scratchpad/refute-blog-final.png',
});
await b.close();
