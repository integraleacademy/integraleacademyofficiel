from pathlib import Path

# Targeted substitutions only: never rewrite a page or its questions/answers.
def replace(path, old, new, count=1):
    p = Path(path)
    s = p.read_text()
    assert s.count(old) == count, (path, 'expected', count, 'matches, got', s.count(old), old)
    p.write_text(s.replace(old, new))
    print('Updated', path)

replace('src/components/FAQ.tsx', "theme = 'blue'", "theme = 'gold'", 2)
replace('src/components/FAQ.tsx', 'data-faq-list>', 'data-faq-list data-faq-theme={theme}>')
replace('src/app/page.tsx', '<PremiumFAQSection badge="FAQ"', '<PremiumFAQSection theme="gold" badge="FAQ"')
replace('src/app/financements/page.tsx', '<PremiumFAQSection\n', '<PremiumFAQSection theme="gold"\n')
replace('src/app/entreprises/page.tsx', '<PremiumFAQSection\n', '<PremiumFAQSection theme="gold"\n')
replace('src/app/planning/PlanningHelp.tsx', '<PremiumFAQSection\n', '<PremiumFAQSection theme="gold"\n')
replace('src/components/SstReferencePage.tsx', '<PremiumFAQSection badge="FAQ SST"', '<PremiumFAQSection theme="green" badge="FAQ SST"')
replace('src/app/faq/page.tsx', '<PremiumFAQSection theme="blue"', '<PremiumFAQSection theme="bts"')
replace('src/app/bts/[slug]/page.tsx', '<PremiumFAQSection\n', '<PremiumFAQSection theme="bts"\n')
replace('src/app/formations-securite/[slug]/page.tsx', '<PremiumFAQSection badge="FAQ APS"', '<PremiumFAQSection theme="blue" badge="FAQ APS"')
replace('src/app/formations-securite/[slug]/page.tsx', '<PremiumFAQSection badge={`FAQ ${label}`}', '<PremiumFAQSection theme={slug.startsWith(\'ssiap\') ? \'red\' : slug.includes(\'desp\') ? \'orange\' : slug.includes(\'a3p\') || slug.includes(\'sst\') ? \'green\' : slug.includes(\'aps\') ? \'blue\' : \'gold\'} badge={`FAQ ${label}`}')

# Keyboard focus follows the same palette, including standalone FAQ lists.
replace('src/components/FAQ.module.css', 'outline: 3px solid #2563eb;', 'outline: 3px solid var(--faq-focus, rgb(var(--accent-strong)));')
p = Path('src/components/FAQ.module.css')
p.write_text(p.read_text() + '''
/* Keep the APS layout, but use the host page's selected accent for focus. */
.section[data-faq-theme='gold'], .list[data-faq-theme='gold'] { --faq-focus: rgb(var(--accent-strong)); }
.section[data-faq-theme='blue'], .list[data-faq-theme='blue'] { --faq-focus: #2563eb; }
.section[data-faq-theme='green'], .list[data-faq-theme='green'] { --faq-focus: #059669; }
.section[data-faq-theme='red'], .list[data-faq-theme='red'] { --faq-focus: #dc2626; }
.section[data-faq-theme='orange'], .list[data-faq-theme='orange'] { --faq-focus: #ea580c; }
.section[data-faq-theme='violet'], .list[data-faq-theme='violet'] { --faq-focus: #7c3aed; }
.section[data-faq-theme='bts'], .list[data-faq-theme='bts'] { --faq-focus: rgb(var(--bts-700)); }
''')
