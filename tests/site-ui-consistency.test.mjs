import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = p => readFileSync(p, 'utf8');

test('School, Contact and Financements use the same chapter navigation', () => {
  for (const file of ['src/app/ecole/SchoolExperience.tsx', 'src/app/contact/page.tsx', 'src/app/financements/page.tsx']) {
    const source = read(file);
    assert.match(source, /<PageSectionNavigation\b/);
    assert.doesNotMatch(source, /<nav[^>]*chapterNav/);
  }
  for (const page of ['ecole', 'contact', 'financements']) assert.match(read(`src/app/${page}/page.tsx`), /navigation\.scope/);
  const contact = read('src/app/contact/page.tsx');
  assert.ok(contact.indexOf('</section>') < contact.indexOf('<PageSectionNavigation'));
});

test('Shared chapter navigation tracks scrolling, resizing and accessible anchor state', () => {
  const source = read('src/components/PageSectionNavigation.tsx');
  for (const value of ['ResizeObserver', "addEventListener('scroll'", "addEventListener('hashchange'", 'aria-current', 'cancelAnimationFrame', '--section-nav-height']) assert.ok(source.includes(value), value);
  const css = read('src/components/PageSectionNavigation.module.css');
  for (const value of ['position: sticky', 'overflow-x: auto', 'scroll-margin-top:', 'prefers-reduced-motion', "[aria-current='location']"]) assert.ok(css.includes(value), value);
});

test('All FAQ entry points share the APS section and native numbered accordion cards', () => {
  const source = read('src/components/FAQ.tsx');
  for (const value of ['data-faq-design="aps"', 'data-faq-list', '<details', '<summary', "padStart(2, '0')", 'md:open:col-span-2', '<FAQ items={items}']) assert.ok(source.includes(value), value);
  assert.match(read('src/components/ui.tsx'), /export \{ FAQ, PremiumFAQSection \} from '@\/components\/FAQ'/);
  for (const file of ['src/app/financements/page.tsx', 'src/app/entreprises/page.tsx', 'src/app/planning/PlanningHelp.tsx', 'src/components/DespChoiceReferencePage.tsx']) {
    const page = read(file);
    assert.match(page, /<PremiumFAQSection\b/);
    assert.doesNotMatch(page, /styles\.(faqList|questions|question)\b/);
  }
  assert.doesNotMatch(read('src/app/formations-securite/[slug]/page.tsx'), /<FAQ\b/);
});

test('Company brochure, contact form and contextual planning actions are retained', () => {
  const companies = read('src/app/entreprises/page.tsx');
  assert.match(companies, /id="brochure-entreprises"/);
  assert.match(companies, /download="Brochure-Entreprises-Integrale-Academy.pdf"/);
  const planning = read('src/app/planning/PlanningHelp.tsx');
  assert.match(planning, /onClick=\{onClear\}/);
  assert.match(planning, /onClick=\{onRequest\}/);
  assert.match(planning, /id="planning-advice"/);
  assert.match(read('src/app/contact/page.tsx'), /<ContactExperience/);
});

test('FAQ typography is locally scoped; program accordions remain separate', () => {
  const css = read('src/components/FAQ.module.css');
  for (const value of ['.list .summary', '.list .answer', '.section .title', 'color-scheme: light', 'prefers-reduced-motion']) assert.ok(css.includes(value), value);
  assert.match(read('src/app/entreprises/entreprises.module.css'), /\.programBlock > summary/);
  assert.match(read('src/app/ecole/school-experience.module.css'), /\.biography/);
});
