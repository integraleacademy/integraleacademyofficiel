import { useEffect, useRef } from 'react';
import { adviserPhone, applicationUrl } from '@/data/parcours-alternance';
import { ParcoursLogo } from './ParcoursLogo';

export function ParcoursHeader() {
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (menu.current?.open && event.target instanceof Node && !menu.current.contains(event.target))
        menu.current.open = false;
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector('summary')?.focus();
      }
    }
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);
  return (
    <header className="academy-header">
      <div className="wrap academy-header-inner">
        <a className="academy-home" href="/" aria-label="Accueil du site Intégrale Academy">
          <ParcoursLogo />
        </a>
        <nav className="academy-navigation" aria-label="Navigation principale">
          <a href="#parcours">Le parcours</a>
          <a href="#calendrier">Ton année</a>
          <a href="#financement">Financement</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="academy-header-actions">
          <a className="header-call" href={adviserPhone}>
            Appeler Aurélie
          </a>
          <a className="button button-gold" href={applicationUrl}>
            Je candidate <span aria-hidden="true">↗</span>
          </a>
        </div>
        <details className="header-menu" ref={menu}>
          <summary>
            Menu <span aria-hidden="true">⌄</span>
          </summary>
          <nav
            aria-label="Navigation mobile"
            onClick={event => {
              if (event.target instanceof Element && event.target.closest('a') && menu.current) menu.current.open = false;
            }}
          >
            <a href="#parcours">Le parcours</a>
            <a href="#calendrier">Ton année 2027</a>
            <a href="#financement">Formation et salaire</a>
            <a href="#entreprise">Ton entreprise</a>
            <a href="#faq">Tes questions</a>
            <a href="#contact">Contacter Aurélie</a>
            <a className="button button-gold" href={applicationUrl}>
              Je candidate ↗
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
