// Turns a declarative diagram (nodes + edges) into ready-to-render SVG geometry.
// Pure and DOM-free, so it runs at build time and is unit-tested.
import type { Diagram, IsoNode } from '../content/diagrams';
import { bounds, iso, isoBox, isoElbow, pathD, polygonD, type BoxGeometry, type Pt } from './iso';

export type Variant = 'desktop' | 'mobile';

const DEFAULT_SIZE: [number, number, number] = [4, 4, 1.5];
/** Boxes float slightly above the floor so their shadow reads as depth. */
const FLOAT = 0.35;
/** Icon size relative to the smaller side of the box's footprint. */
const ICON_RATIO = 0.55;
/** Floor margin around the outermost boxes, in iso units. */
const FLOOR_MARGIN = 1.6;
/** Room reserved around each label anchor (px), so labels are never clipped by the viewBox. */
const LABEL_BOX = { halfWidth: 50, below: 26 };

export interface LaidOutNode {
  node: IsoNode;
  box: BoxGeometry;
}

export interface LaidOutEdge {
  from: string;
  to: string;
  d: string;
}

export interface Layout {
  /** Sorted back-to-front (painter's algorithm). */
  nodes: LaidOutNode[];
  edges: LaidOutEdge[];
  /** null on mobile: the floor widens the viewBox and shrinks every box. */
  floor: string | null;
  viewBox: string;
}

export function layoutDiagram(diagram: Diagram, variant: Variant): Layout {
  const mobile = variant === 'mobile';
  const shown = diagram.nodes.filter((n) => !mobile || n.atMobile);
  const byId = new Map(shown.map((n) => [n.id, n]));

  const position = (n: IsoNode) => (mobile ? n.atMobile! : n.at);
  const size = (n: IsoNode) => n.size ?? DEFAULT_SIZE;
  const center = (n: IsoNode): [number, number] => {
    const [x, y] = position(n);
    const [w, d] = size(n);
    return [x + w / 2, y + d / 2];
  };

  const nodes = shown
    .map((node) => {
      const [x, y] = position(node);
      const [w, d, h] = size(node);
      return { node, box: isoBox(x, y, w, d, h, FLOAT, Math.min(w, d) * ICON_RATIO), depth: x + y + (w + d) / 2 };
    })
    .sort((a, b) => a.depth - b.depth)
    .map(({ node, box }) => ({ node, box }));

  const edges = diagram.edges
    .filter((e) => byId.has(e.from) && byId.has(e.to) && !(mobile && e.mobile === false))
    .map((e) => ({
      from: e.from,
      to: e.to,
      d: pathD(isoElbow(center(byId.get(e.from)!), center(byId.get(e.to)!), e.via)),
    }));

  const xs = shown.flatMap((n) => [position(n)[0], position(n)[0] + size(n)[0]]);
  const ys = shown.flatMap((n) => [position(n)[1], position(n)[1] + size(n)[1]]);
  const [x0, x1] = [Math.min(...xs) - FLOOR_MARGIN, Math.max(...xs) + FLOOR_MARGIN];
  const [y0, y1] = [Math.min(...ys) - FLOOR_MARGIN, Math.max(...ys) + FLOOR_MARGIN];
  const floorCorners = [iso(x0, y0), iso(x1, y0), iso(x1, y1), iso(x0, y1)];

  const extent: Pt[] = [
    ...nodes.flatMap(({ box }) => [
      ...box.points,
      { x: box.labelAnchor.x - LABEL_BOX.halfWidth, y: box.labelAnchor.y + LABEL_BOX.below },
      { x: box.labelAnchor.x + LABEL_BOX.halfWidth, y: box.labelAnchor.y },
    ]),
    ...(mobile ? [] : floorCorners),
  ];
  const b = bounds(extent, 12);

  return {
    nodes,
    edges,
    floor: mobile ? null : polygonD(floorCorners),
    viewBox: `${b.x} ${b.y} ${b.w} ${b.h}`,
  };
}
