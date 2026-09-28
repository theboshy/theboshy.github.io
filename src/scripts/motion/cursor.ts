import { finePointer, prefersReducedMotion } from '../../lib/motion-prefs';

/** Easing factor per frame: position chases its target, size morphs a bit faster. */
const FOLLOW = 0.2;
const FOLLOW_FRAME = 0.25;
const MORPH = 0.25;
/** Below this distance (px) everything is considered settled and the loop sleeps. */
const EPSILON = 0.1;
const FRAME_PADDING = 6;
const DOT = 6;

type Target = { x: number; y: number; w: number; h: number };

/**
 * A small dot that trails the native cursor (which stays visible). Over [data-cursor="frame"]
 * it becomes a corner frame around the element; over text it turns into a yellow caret.
 * The rAF loop sleeps once the dot has settled, instead of running every frame forever.
 */
export function initCursor() {
  if (prefersReducedMotion || !finePointer) return;

  const el = document.createElement('div');
  el.className = 'cursor corners';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<span class="cursor-dot"></span><span class="cursor-ext">↗</span>';
  document.body.append(el);

  const pointer = { x: -100, y: -100 };
  const current: Target = { x: -100, y: -100, w: DOT, h: DOT };
  let frame: Element | null = null;
  let mode: 'dot' | 'text' | 'frame' = 'dot';
  let running = false;

  const target = (): Target => {
    if (mode === 'frame' && frame) {
      const r = frame.getBoundingClientRect();
      return {
        x: r.left - FRAME_PADDING,
        y: r.top - FRAME_PADDING,
        w: r.width + FRAME_PADDING * 2,
        h: r.height + FRAME_PADDING * 2,
      };
    }
    if (mode === 'text') return { x: pointer.x + 8, y: pointer.y - 9, w: 2, h: 18 };
    return { x: pointer.x + 8, y: pointer.y + 8, w: DOT, h: DOT };
  };

  const step = () => {
    const t = target();
    const k = mode === 'frame' ? FOLLOW_FRAME : FOLLOW;
    current.x += (t.x - current.x) * k;
    current.y += (t.y - current.y) * k;
    current.w += (t.w - current.w) * MORPH;
    current.h += (t.h - current.h) * MORPH;
    el.style.transform = `translate(${current.x}px, ${current.y}px)`;
    el.style.width = `${current.w}px`;
    el.style.height = `${current.h}px`;

    const settled =
      Math.abs(t.x - current.x) < EPSILON &&
      Math.abs(t.y - current.y) < EPSILON &&
      Math.abs(t.w - current.w) < EPSILON &&
      Math.abs(t.h - current.h) < EPSILON;
    // Framed elements may animate on their own (floating diagram boxes), so keep tracking them.
    running = mode === 'frame' || !settled;
    if (running) requestAnimationFrame(step);
  };
  const wake = () => {
    if (running) return;
    running = true;
    requestAnimationFrame(step);
  };

  addEventListener(
    'pointermove',
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      const t = e.target as Element;
      frame = t.closest('[data-cursor="frame"]');
      const external = !frame && t.closest('a[target="_blank"]');
      mode = frame ? 'frame' : !external && t.closest('p, h1, h2, h3, li, blockquote') ? 'text' : 'dot';
      el.classList.add('is-on');
      el.classList.toggle('is-frame', mode === 'frame');
      el.classList.toggle('is-text', mode === 'text');
      el.classList.toggle('is-ext', !!external);
      wake();
    },
    { passive: true },
  );
  // A framed element can move under a still pointer (scrolling, floating diagram boxes).
  addEventListener('scroll', wake, { passive: true });
  document.addEventListener('pointerleave', () => el.classList.remove('is-on'));
}
