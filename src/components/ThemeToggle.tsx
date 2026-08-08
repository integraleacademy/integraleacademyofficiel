'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const storageKey = 'integrale-academy-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const savedTheme = window.localStorage.getItem(storageKey);
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return <button
    type="button"
    onClick={() => setTheme(nextTheme)}
    className="group relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-academy-line bg-academy-surface text-academy-muted shadow-soft transition hover:-translate-y-0.5 hover:border-academy-gold hover:text-academy-ink focus:outline-none focus:ring-2 focus:ring-academy-gold focus:ring-offset-2 focus:ring-offset-academy-bg"
    aria-label={`Passer en mode ${nextTheme === 'dark' ? 'sombre' : 'clair'}`}
    title={`Mode ${nextTheme === 'dark' ? 'sombre' : 'clair'}`}
  >
    <span className="absolute inset-1 rounded-full border border-stone-200 transition group-hover:border-stone-300 dark:border-academy-gold/35 dark:group-hover:border-academy-gold/60" aria-hidden="true" />
    <svg className="relative h-6 w-6 transition-transform duration-300 group-hover:-rotate-12 dark:hidden" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.2 14.3A7.6 7.6 0 0 1 9.7 3.8 8.2 8.2 0 1 0 20.2 14.3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <svg className="relative hidden h-6 w-6 transition-transform duration-300 group-hover:rotate-45 dark:block" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M18.4 5.6l1.4-1.4M4.2 19.8l1.4-1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  </button>
}
