// Isometric projection primitives.
// Iso space: x → right-down, y → left-down, z → up. One unit = U screen pixels.

export const U = 24;
const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;

export type Pt = { x: number; y: number };
export type Axis = 'x' | 'y';

export const iso = (x: number, y: number, z = 0): Pt => ({
  x: (x - y) * COS * U,
  y: (x + y) * SIN * U - z * U,
});

const round = (n: number) => Math.round(n * 100) / 100;
const pointList = (pts: Pt[]) => pts.map((p) => `${round(p.x)},${round(p.y)}`).join('L');

/** Open SVG path through the given points. */
export const pathD = (pts: Pt[]) => `M${pointList(pts)}`;
/** Closed SVG path (polygon). */
export const polygonD = (pts: Pt[]) => `${pathD(pts)}Z`;

export interface BoxGeometry {
  top: string;
  left: string;
  right: string;
  shadow: string;
  /** SVG `matrix()` that maps a 24×24 icon onto the top face. */
  iconMatrix: string;
  /** Lowest on-screen corner of the box: where its label goes. */
  labelAnchor: Pt;
  /** Every projected point, for bounding-box calculations. */
  points: Pt[];
}

/**
 * Projects a box with its corner at (x, y), footprint w×d, height h, floating z units above
 * the floor. Only the three faces visible from this camera angle are generated.
 */
export function isoBox(x: number, y: number, w: number, d: number, h: number, z = 0, iconSize = 2): BoxGeometry {
  const zTop = z + h;
  const top = [iso(x, y, zTop), iso(x + w, y, zTop), iso(x + w, y + d, zTop), iso(x, y + d, zTop)];
  const left = [iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, zTop), iso(x, y + d, zTop)];
  const right = [iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, zTop), iso(x + w, y, zTop)];
  const m = 0.3; // shadow margin around the footprint
  const shadow = [iso(x - m, y - m), iso(x + w + m, y - m), iso(x + w + m, y + d + m), iso(x - m, y + d + m)];

  // Basis vectors of the top face, scaled so a 24-unit icon spans `iconSize` iso units.
  const k = iconSize / 24;
  const ex = { x: COS * U * k, y: SIN * U * k };
  const ey = { x: -COS * U * k, y: SIN * U * k };
  const center = iso(x + w / 2, y + d / 2, zTop);
  const e = center.x - 12 * ex.x - 12 * ey.x;
  const f = center.y - 12 * ex.y - 12 * ey.y;

  return {
    top: polygonD(top),
    left: polygonD(left),
    right: polygonD(right),
    shadow: polygonD(shadow),
    iconMatrix: `matrix(${[ex.x, ex.y, ey.x, ey.y, e, f].map(round).join(' ')})`,
    labelAnchor: iso(x + w, y + d),
    points: [...top, ...left, ...right, ...shadow],
  };
}

/**
 * Floor-level connector between two iso points. Aligned points get a straight segment;
 * otherwise it bends once at 90°, travelling along `first` axis before the other one.
 */
export function isoElbow(a: [number, number], b: [number, number], first: Axis = 'x'): Pt[] {
  const [ax, ay] = a;
  const [bx, by] = b;
  if (ax === bx || ay === by) return [iso(ax, ay), iso(bx, by)];
  const corner = first === 'x' ? iso(bx, ay) : iso(ax, by);
  return [iso(ax, ay), corner, iso(bx, by)];
}

export function bounds(pts: Pt[], pad = 24) {
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const x = Math.min(...xs) - pad;
  const y = Math.min(...ys) - pad;
  return { x, y, w: Math.max(...xs) - x + pad, h: Math.max(...ys) - y + pad };
}
