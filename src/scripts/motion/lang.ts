import { store } from '../../lib/storage';

/**
 * Remembers the chosen language and keeps the current #anchor when switching.
 * First-time visitors whose browser language differs get a dismissible banner, never a redirect
 * (redirects break shared links and confuse crawlers).
 */
export function initLang() {
  document.querySelectorAll<HTMLAnchorElement>('[data-lang]').forEach((link) =>
    link.addEventListener('click', () => {
      store.set('lang', link.dataset.lang!);
      link.href = link.href.split('#')[0] + location.hash;
    }),
  );

  const banner = document.querySelector<HTMLElement>('[data-lang-banner]');
  if (!banner || store.get('lang')) return;
  const pageLang = document.documentElement.lang;
  const browserLang = navigator.language.slice(0, 2);
  if (browserLang !== pageLang && (browserLang === 'es' || browserLang === 'en')) banner.hidden = false;
  banner.querySelector('[data-dismiss]')?.addEventListener('click', () => {
    banner.hidden = true;
    store.set('lang', pageLang);
  });
}
