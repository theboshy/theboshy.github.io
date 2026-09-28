import { prefersReducedMotion } from '../../lib/motion-prefs';
import { store } from '../../lib/storage';

/** Light/dark toggle, revealed as a circle growing from the button (View Transitions API). */
export function initTheme() {
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) =>
    button.addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      const apply = () => {
        root.dataset.theme = next;
        store.set('theme', next);
      };

      if (!document.startViewTransition || prefersReducedMotion) {
        apply();
        return;
      }
      const r = button.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      document
        .startViewTransition(apply)
        .ready.then(() =>
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 500, easing: 'cubic-bezier(.16,1,.3,1)', pseudoElement: '::view-transition-new(root)' },
          ),
        );
    }),
  );
}
