from pathlib import Path
import re

def read(p): return Path(p).read_text()
def write(p,s): Path(p).write_text(s)
def swap(p,a,b):
    s=read(p)
    assert a in s, (p,a[:80])
    write(p,s.replace(a,b))

# Keep the original course colour accents and extract their definitions before replacing the old implementations.
p='src/components/ui.tsx';s=read(p);a=s.index('const premiumFaqThemes:');b=s.index('export function LocationCard',a)
themes=s[a:s.index('\nexport function FAQ',a)].replace("UiAccent | 'bts'",'FAQTheme')
swap('src/components/FAQ.tsx','/* INSERT_ORIGINAL_FAQ_THEMES */',themes)
write(p,s[:a]+"// All FAQ variants use the APS reference component.\nexport { FAQ, PremiumFAQSection } from '@/components/FAQ';\n\n"+s[b:])

p='src/app/ecole/SchoolExperience.tsx';s=read(p)
s=s.replace("import Image from 'next/image';", "import Image from 'next/image';\nimport { PageSectionNavigation } from '@/components/PageSectionNavigation';")
a=s.index('export function SchoolNavigation()');b=s.index('\nconst approaches',a)
s=s[:a]+'''export function SchoolNavigation() {
  return <PageSectionNavigation chapters={chapters} label="Faisons connaissance" ariaLabel="Découvrir notre école" />;
}
'''+s[b:];write(p,s)
p='src/app/ecole/page.tsx'
swap(p,"import styles from './ecole.module.css';","import styles from './ecole.module.css';\nimport navigation from '@/components/PageSectionNavigation.module.css';")
swap(p,'${styles.page} ${experience.guidedPage}', '${styles.page} ${experience.guidedPage} ${navigation.scope}')

p='src/app/contact/page.tsx';s=read(p)
s="import { PageSectionNavigation } from '@/components/PageSectionNavigation';\nimport navigation from '@/components/PageSectionNavigation.module.css';\n"+s
pos=s.index('const projectLinks');s=s[:pos]+'''const contactChapters = [
  ['coordonnees', 'Nous joindre'], ['demande', 'Votre demande'],
  ['venir', 'Venir à l’école'], ['reperes', 'Liens utiles'],
] as const;

'''+s[pos:]
s=s.replace('${school.page} ${styles.page}', '${school.page} ${styles.page} ${navigation.scope}')
a=s.index('        <nav className=');b=s.index('        </nav>',a)+len('        </nav>');s=s[:a]+s[b:]
needle='      </section>\n\n      <section id="coordonnees"';assert needle in s
s=s.replace(needle,'''      </section>

      <PageSectionNavigation chapters={contactChapters} label="Faisons le premier pas" ariaLabel="Les rubriques de la page Contact" />

      <section id="coordonnees"''');write(p,s)
p='src/app/contact/contact.module.css'
swap(p,'.page { min-width: 0; }','.page { min-width: 0; }\n.page .hero { padding-bottom: 44px; }')
swap(p,'@media (max-width: 800px) {','@media (max-width: 800px) {\n  .page .hero { padding-bottom: 30px; }')

p='src/app/financements/page.tsx';s=read(p)
s="import { PageSectionNavigation } from '@/components/PageSectionNavigation';\nimport navigation from '@/components/PageSectionNavigation.module.css';\nimport { PremiumFAQSection } from '@/components/FAQ';\n"+s
pos=s.index('const fundingOptions');s=s[:pos]+'''const financingChapters = [
  ['solutions', 'Les solutions'], ['simulateur', 'Le simulateur'],
  ['accompagnement', 'L’accompagnement'], ['questions-frequentes', 'Questions fréquentes'],
  ['contact-financement', 'Parlons-en'],
] as const;

'''+s[pos:]
s=s.replace('<div className={styles.page}>','<div className={`${styles.page} ${navigation.scope}`}>')
a=s.index('    <nav className={styles.chapterNav}');b=s.index('    </nav>',a)+len('    </nav>')
s=s[:a]+'''    <PageSectionNavigation chapters={financingChapters} label="Financer votre projet" ariaLabel="Les rubriques de la page Financements" />'''+s[b:]
a=s.index('    <section id="questions-frequentes"');b=s.index('    </section>',a)+len('    </section>')
s=s[:a]+'''    <PremiumFAQSection
      id="questions-frequentes" badge="Les réponses utiles" title={<>Encore une question ?</>}
      description="Quelques repères avant de vous lancer."
      items={faqItems.map(({ question, answer }) => ({ q: question, a: answer }))}
      contactHref="#contact-financement" contactLabel="Parlons-en ensemble"
    />'''+s[b:];write(p,s)

p='src/app/entreprises/page.tsx';s="import { PremiumFAQSection } from '@/components/FAQ';\n"+read(p)
a=s.index('    <section id="diagnostic"');b=s.index('    </section>',a)+len('    </section>');block=s[a:b]
aside=block[block.index('          <aside'):block.index('          </aside>')+len('          </aside>')]
s=s[:a]+'''    <PremiumFAQSection
      id="diagnostic" badge="Les réponses à vos questions" title="Avant de se lancer."
      description="Retrouvez les réponses utiles pour préparer votre projet de recrutement ou de formation."
      items={faqItems.map(({ question, answer }) => ({ q: question, a: answer }))}
      contactHref="#contact-entreprises"
      contactContent={
'''+aside+'''
      }
    />'''+s[b:];write(p,s)

p='src/app/planning/PlanningHelp.tsx';s="import { PremiumFAQSection } from '@/components/FAQ';\n"+read(p)
a=s.index('      <div className={styles.helpGrid}>');b=s.index('\n    </section>',a);block=s[a:b]
aside=block[block.index('        <aside'):block.index('        </aside>')+len('        </aside>')]
s=s[:a]+'''      <PremiumFAQSection
        contained badge="Questions fréquentes" title="Avant de réserver une place"
        description="Les réponses pour choisir votre prochaine session."
        items={questions.map(([q, a]) => ({ q, a }))}
        contactContent={
'''+aside+'''
        }
      />'''+s[b:];write(p,s)

p='src/components/DespChoiceReferencePage.tsx';s=read(p).replace('ConversionStrip, FAQ, Hero','ConversionStrip, PremiumFAQSection, Hero')
a=s.index('      <section className="page-container py-10">\n        <SectionTitle title="FAQ formation"');b=s.index('      </section>',a)+len('      </section>')
s=s[:a]+'''      <PremiumFAQSection badge="FAQ formation" title="Vos questions sur la formation DESP" description="Les réponses utiles avant de choisir votre parcours." items={formationFaq} theme="orange" contactHref="/contact?formation=desp" />'''+s[b:];write(p,s)
p='src/app/formations-securite/[slug]/page.tsx';s=read(p).replace(' FAQ,',' ').replace('ConversionStrip,  FeatureCard','ConversionStrip, FeatureCard')
old=re.search(r'^function SsiapFaq\(\).*$',s,re.M).group(0)
s=s.replace(old,'''function SsiapFaq(){return <PremiumFAQSection badge="FAQ SSIAP 1" title="Questions fréquentes SSIAP 1" description="Les réponses utiles avant de vous inscrire." items={ssiapFaq.map(([q,a])=>({q,a}))} theme="red" contactHref="/contact?formation=ssiap1"/>}''')
s=s.replace('<section className="page-container py-10"><SectionTitle title="FAQ formation"/><FAQ items={formationFaq}/></section>','<PremiumFAQSection badge="FAQ formation" title="Vos questions sur la formation DESP" description="Les réponses utiles avant de choisir votre parcours." items={formationFaq} theme="orange" contactHref="/contact?formation=desp"/>');write(p,s)
