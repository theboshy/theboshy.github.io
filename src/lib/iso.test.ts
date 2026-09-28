import { describe, expect, it } from 'vitest';
import { U, bounds, iso, isoBox, isoElbow } from './iso';

const COS30 = Math.cos(Math.PI / 6);

describe('iso', () => {
  it('projects the origin to the origin', () => {
    expect(iso(0, 0, 0)).toEqual({ x: 0, y: 0 });
  });

  it('sends +x right-down and +y left-down, at 30°', () => {
    expect(iso(1, 0)).toEqual({ x: COS30 * U, y: 0.5 * U });
    expect(iso(0, 1)).toEqual({ x: -COS30 * U, y: 0.5 * U });
  });

  it('raises points by one unit per z', () => {
    expect(iso(2, 3, 1).y).toBeCloseTo(iso(2, 3, 0).y - U);
  });
});

describe('isoElbow', () => {
  it('draws a straight segment when the points share an axis', () => {
    expect(isoElbow([0, 0], [5, 0])).toHaveLength(2);
    expect(isoElbow([2, 1], [2, 9])).toHaveLength(2);
  });

  it('bends once, travelling along the requested axis first', () => {
    expect(isoElbow([0, 0], [4, 6], 'x')[1]).toEqual(iso(4, 0));
    expect(isoElbow([0, 0], [4, 6], 'y')[1]).toEqual(iso(0, 6));
  });
});

describe('isoBox', () => {
  const box = isoBox(0, 0, 4, 4, 1.5);

  it('produces closed paths for the three visible faces', () => {
    for (const face of [box.top, box.left, box.right, box.shadow]) expect(face).toMatch(/^M.*Z$/);
  });

  it('anchors the label at the lowest on-screen corner', () => {
    expect(box.labelAnchor).toEqual(iso(4, 4));
    const faceBottoms = [box.top, box.left, box.right].join(' ');
    expect(faceBottoms).toContain(`${Math.round(iso(4, 4, 0).y * 100) / 100}`);
  });

  it('centres the icon on the top face', () => {
    const [a, b, c, d, e, f] = box.iconMatrix.match(/-?[\d.]+/g)!.map(Number);
    const centre = { x: a * 12 + c * 12 + e, y: b * 12 + d * 12 + f };
    const expected = iso(2, 2, 1.5);
    expect(centre.x).toBeCloseTo(expected.x, 1);
    expect(centre.y).toBeCloseTo(expected.y, 1);
  });
});

describe('bounds', () => {
  it('pads the extent on every side', () => {
    expect(
      bounds(
        [
          { x: 0, y: 0 },
          { x: 10, y: 20 },
        ],
        5,
      ),
    ).toEqual({ x: -5, y: -5, w: 20, h: 30 });
  });
});
