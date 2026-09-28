import { describe, expect, it } from 'vitest';
import type { Diagram } from '../content/diagrams';
import { labDiagram, loopDiagram } from '../content/diagrams';
import { layoutDiagram } from './iso-layout';

const t = { en: 'x', es: 'x' };
const node = (id: string, at: [number, number], atMobile: [number, number] | null = at) => ({
  id,
  at,
  atMobile,
  icon: 'code-xml',
  accent: 'blue' as const,
  label: t,
  title: t,
  body: t,
});

const fixture: Diagram = {
  id: 'fixture',
  nodes: [node('front', [8, 8]), node('back', [0, 0]), node('desktop-only', [16, 0], null)],
  edges: [
    { from: 'back', to: 'front' },
    { from: 'front', to: 'desktop-only' },
    { from: 'back', to: 'desktop-only', mobile: false },
  ],
};

describe('layoutDiagram', () => {
  it('sorts nodes back-to-front so nearer boxes paint over farther ones', () => {
    const ids = layoutDiagram(fixture, 'desktop').nodes.map((n) => n.node.id);
    expect(ids.indexOf('back')).toBeLessThan(ids.indexOf('front'));
  });

  it('draws a floor on desktop only', () => {
    expect(layoutDiagram(fixture, 'desktop').floor).toMatch(/Z$/);
    expect(layoutDiagram(fixture, 'mobile').floor).toBeNull();
  });

  it('hides mobile-less nodes and every edge touching them', () => {
    const mobile = layoutDiagram(fixture, 'mobile');
    expect(mobile.nodes.map((n) => n.node.id)).not.toContain('desktop-only');
    expect(mobile.edges).toEqual([expect.objectContaining({ from: 'back', to: 'front' })]);
  });

  it('produces a finite viewBox', () => {
    const [x, y, w, h] = layoutDiagram(fixture, 'desktop').viewBox.split(' ').map(Number);
    expect([x, y, w, h].every(Number.isFinite)).toBe(true);
    expect(w).toBeGreaterThan(0);
    expect(h).toBeGreaterThan(0);
  });
});

describe.each([loopDiagram, labDiagram])('content contract: $id diagram', (diagram) => {
  const ids = new Set(diagram.nodes.map((n) => n.id));

  it('has unique node ids', () => {
    expect(ids.size).toBe(diagram.nodes.length);
  });

  it('only connects nodes that exist', () => {
    for (const e of diagram.edges) expect([ids.has(e.from), ids.has(e.to)]).toEqual([true, true]);
  });

  it('routes the particle only along existing edges', () => {
    const linked = (a: string, b: string) =>
      diagram.edges.some((e) => (e.from === a && e.to === b) || (e.from === b && e.to === a));
    for (const route of diagram.particle?.routes ?? []) {
      route.slice(1).forEach((to, i) => expect(linked(route[i], to), `${route[i]} → ${to}`).toBe(true));
    }
  });

  it('lays out on both variants', () => {
    expect(layoutDiagram(diagram, 'desktop').nodes).toHaveLength(diagram.nodes.length);
    expect(layoutDiagram(diagram, 'mobile').nodes.length).toBeGreaterThan(0);
  });
});
