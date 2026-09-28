// Wires one diagram: node selection (hover, focus, tap, arrow keys), idle motion and playback.
import type { gsap as GSAP } from 'gsap';
import type { ParticlePlan } from '../../content/diagrams';
import { U } from '../../lib/iso';
import { prefersReducedMotion } from '../../lib/motion-prefs';
import { createPanel } from './panel';
import { buildParticleTimeline } from './particle';
import { createPlayback } from './playback';

/** How far a selected box rises, in iso units. */
const LIFT = 0.75;
const ARROWS: Record<string, 1 | -1> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

export function mountDiagram(root: HTMLElement, gsap: typeof GSAP) {
  const svgs = [...root.querySelectorAll<SVGSVGElement>('[data-iso-svg]')];
  const panel = createPanel(root.querySelector<HTMLElement>('[data-iso-panel]')!);
  const plan: ParticlePlan | undefined = root.dataset.particle ? JSON.parse(root.dataset.particle) : undefined;
  const playback = createPlayback();
  const duration = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  let active: SVGGElement | null = null;

  const highlight = (node: SVGGElement, on: boolean) => {
    const svg = node.ownerSVGElement!;
    const id = node.dataset.node!;
    node.classList.toggle('is-active', on);
    svg.classList.toggle('iso-dim', on);
    svg.querySelector(`[data-label-for="${id}"]`)?.classList.toggle('is-active', on);
    svg.querySelectorAll<SVGPathElement>(`.iso-edge[data-from="${id}"], .iso-edge[data-to="${id}"]`).forEach((edge) => {
      edge.classList.toggle('is-hot', on);
      edge.style.setProperty('--accent-hot', node.style.getPropertyValue('--accent'));
    });
    gsap.to(
      node.querySelector('.iso-lift'),
      on
        ? { y: -LIFT * U, duration: duration(0.4), ease: 'back.out(1.4)' }
        : { y: 0, duration: duration(0.35), ease: 'power3.out' },
    );
  };

  const select = (node: SVGGElement | null) => {
    if (node === active) return;
    if (active) highlight(active, false);
    active = node;
    if (node) {
      highlight(node, true);
      panel.show(node.dataset.title!, node.dataset.body!);
    } else {
      panel.reset();
    }
    playback.update({ inspecting: !!node });
  };

  svgs.forEach((svg) => {
    const nodes = [...svg.querySelectorAll<SVGGElement>('.iso-node')];
    // Arrow keys follow the flow of the diagram: the order edges are declared in.
    const flowOrder = [...svg.querySelectorAll<SVGPathElement>('.iso-edge')].map((e) => e.dataset.from);
    const keyboardOrder = [...nodes].sort(
      (a, b) => flowOrder.indexOf(a.dataset.node) - flowOrder.indexOf(b.dataset.node),
    );

    nodes.forEach((node) => {
      node.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && select(node));
      node.addEventListener('pointerleave', (e) => e.pointerType === 'mouse' && select(null));
      node.addEventListener('click', () => select(active === node ? null : node));
      node.addEventListener('focus', () => select(node));
      // Defer so focus moving to a sibling node doesn't flash the idle state.
      node.addEventListener('blur', () => setTimeout(() => !svg.contains(document.activeElement) && select(null)));
      node.addEventListener('keydown', (e) => {
        const step = ARROWS[e.key];
        if (!step) return;
        e.preventDefault();
        const i = keyboardOrder.indexOf(node);
        keyboardOrder[(i + step + keyboardOrder.length) % keyboardOrder.length].focus();
      });
    });

    if (prefersReducedMotion) return;

    // Idle float: each box bobs 2px, phase-shifted so they don't move in unison.
    nodes.forEach((node, i) =>
      gsap.to(node.querySelector('.iso-float'), {
        y: -2,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.35,
      }),
    );
    playback.add(buildParticleTimeline(gsap, svg, plan));
  });

  new IntersectionObserver(([entry]) => playback.update({ inView: entry.isIntersecting })).observe(root);
  document.addEventListener('visibilitychange', () => playback.update({ tabHidden: document.hidden }));

  const toggle = root.querySelector<HTMLButtonElement>('[data-iso-toggle]');
  toggle?.addEventListener('click', () => {
    playback.update({ userPaused: !playback.userPaused });
    toggle.setAttribute('aria-pressed', String(playback.userPaused));
    toggle.querySelector('[data-label]')!.textContent = playback.userPaused
      ? toggle.dataset.playLabel!
      : toggle.dataset.pauseLabel!;
  });
}
