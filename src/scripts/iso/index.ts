// Entry point: mounts every diagram lazily. GSAP is only fetched once a diagram is
// within one viewport of the screen, so it never competes with the first paint.
import { mountDiagram } from './mount';

export function initIsoDiagrams() {
  document.querySelectorAll<HTMLElement>('[data-iso-root]:not([data-iso-ready])').forEach((root) => {
    root.dataset.isoReady = '';
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const [{ gsap }, { MotionPathPlugin }] = await Promise.all([import('gsap'), import('gsap/MotionPathPlugin')]);
        gsap.registerPlugin(MotionPathPlugin);
        mountDiagram(root, gsap);
      },
      { rootMargin: '100% 0px' },
    );
    io.observe(root);
  });
}
