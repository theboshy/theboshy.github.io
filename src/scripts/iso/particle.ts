// Builds the looping timeline of the particle that travels along a diagram's edges.
import type { gsap as GSAP } from 'gsap';
import type { ParticlePlan } from '../../content/diagrams';

/** Particle speed: seconds per 200 px of path, and the shortest hop allowed. */
const SECONDS_PER_200PX = 1;
const MIN_HOP = 0.5;
const PULSE_MS = 380;

export function buildParticleTimeline(gsap: typeof GSAP, svg: SVGSVGElement, plan?: ParticlePlan) {
  const particle = svg.querySelector<SVGGElement>('.iso-particle')!;
  const nodeEl = (id: string) => svg.querySelector<SVGGElement>(`.iso-node[data-node="${id}"]`);

  /** The edge between two nodes, in either direction (the particle can travel it backwards). */
  const edgeBetween = (from: string, to: string) => {
    const forward = svg.querySelector<SVGPathElement>(`.iso-edge[data-from="${from}"][data-to="${to}"]`);
    if (forward) return { path: forward, reverse: false };
    const backward = svg.querySelector<SVGPathElement>(`.iso-edge[data-from="${to}"][data-to="${from}"]`);
    return backward ? { path: backward, reverse: true } : null;
  };

  const pulse = (id: string) => {
    const node = nodeEl(id);
    node?.classList.add('is-pulse');
    setTimeout(() => node?.classList.remove('is-pulse'), PULSE_MS);
  };

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, paused: true });

  const hop = (from: string, to: string) => {
    const edge = edgeBetween(from, to);
    if (!edge) return; // the edge may not exist in this layout (e.g. hidden on mobile)
    const color = nodeEl(from)?.style.getPropertyValue('--accent');
    tl.set(particle, { '--p-color': color } as gsap.TweenVars);
    tl.to(particle, {
      duration: Math.max(MIN_HOP, (edge.path.getTotalLength() / 200) * SECONDS_PER_200PX),
      ease: 'power1.inOut',
      motionPath: {
        path: edge.path,
        align: edge.path,
        alignOrigin: [0.5, 0.5],
        start: edge.reverse ? 1 : 0,
        end: edge.reverse ? 0 : 1,
      },
    });
    tl.call(() => pulse(to));
    const rest = plan?.dwell?.[to];
    if (rest) tl.to({}, { duration: rest });
  };

  tl.set(particle, { opacity: 1 });
  if (plan) {
    for (const route of plan.routes) {
      route.slice(1).forEach((to, i) => hop(route[i], to));
      tl.to(particle, { opacity: 0, duration: 0.25 }).to({}, { duration: 0.6 }).set(particle, { opacity: 1 });
    }
  } else {
    svg.querySelectorAll<SVGPathElement>('.iso-edge').forEach((e) => hop(e.dataset.from!, e.dataset.to!));
  }
  return tl;
}
