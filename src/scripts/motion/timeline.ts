import { prefersReducedMotion } from '../../lib/motion-prefs';
import { rafThrottle } from '../../lib/raf';

/** The Work timeline draws itself as you scroll; each dot lights up when the line reaches it. */
export function initTimeline() {
  const timeline = document.querySelector<HTMLElement>('[data-timeline]');
  if (!timeline) return;
  const items = [...timeline.querySelectorAll<HTMLElement>('.tl-item')];

  if (prefersReducedMotion) {
    items.forEach((item) => item.classList.add('is-lit'));
    return;
  }

  const update = () => {
    const mark = innerHeight * 0.6; // the "pen" sits at 60% of the viewport height
    const rect = timeline.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (mark - rect.top) / rect.height));
    timeline.style.setProperty('--tl-progress', String(progress));
    items.forEach((item) => item.classList.toggle('is-lit', item.getBoundingClientRect().top + 12 < mark));
  };
  addEventListener('scroll', rafThrottle(update), { passive: true });
  update();
}
