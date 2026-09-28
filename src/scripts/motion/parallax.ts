import { finePointer, prefersReducedMotion } from '../../lib/motion-prefs';
import { rafThrottle } from '../../lib/raf';

/** Max offset of the hero dot grid, in px, when the pointer reaches a screen edge. */
const RANGE = 12;

/** The hero's dot grid drifts slightly against the pointer (desktop only). */
export function initParallax() {
  const grid = document.querySelector<HTMLElement>('[data-parallax]');
  if (!grid || prefersReducedMotion || !finePointer) return;
  const move = rafThrottle((x: number, y: number) => {
    grid.style.translate = `${(x / innerWidth - 0.5) * RANGE}px ${(y / innerHeight - 0.5) * RANGE}px`;
  });
  addEventListener('pointermove', (e) => move(e.clientX, e.clientY), { passive: true });
}
