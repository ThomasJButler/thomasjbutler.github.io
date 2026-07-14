import { chromium } from '@playwright/test';
import { readFileSync } from 'fs';
const AXE = readFileSync('./node_modules/axe-core/axe.min.js', 'utf8');
const ROUTES = ['/', '/services', '/projects', '/about', '/contact', '/case-study', '/updates'];
const browser = await chromium.launch();
for (const theme of ['dark', 'light']) {
  for (const route of ROUTES) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(`try{localStorage.setItem('theme', ${JSON.stringify(theme)});}catch(e){}`);
    const r = await page.goto(`http://localhost:4400${route}`, { waitUntil: 'load' });
    await page.waitForTimeout(2500);
    const t = await page.title();
    if (r.status() !== 200 || !t) { console.log('BAD LOAD', theme, route, r.status()); await ctx.close(); continue; }
    await page.addScriptTag({ content: AXE });
    const results = await page.evaluate(async () =>
      await window.axe.run(document, { resultTypes: ['violations'],
        runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice'] } }));
    if (results.violations.length) {
      console.log(`\n=== ${theme} ${route} ===`);
      for (const v of results.violations) {
        console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
        for (const n of v.nodes.slice(0, 5)) {
          console.log(`     - ${n.target.join(' ')}`);
          console.log(`       ${(n.failureSummary||'').replace(/\n/g,' | ').slice(0,300)}`);
        }
        if (v.nodes.length > 5) console.log(`     ... +${v.nodes.length - 5} more`);
      }
    } else console.log(`ok  ${theme} ${route}`);
    await ctx.close();
  }
}
await browser.close();
