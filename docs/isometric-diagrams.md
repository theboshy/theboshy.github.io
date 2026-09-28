# Isometric diagrams

The diagrams are plain SVG generated from data, plus a small GSAP layer for interaction. See [ADR 0002](decisions/0002-svg-and-gsap-over-rive.md) for why.

## Data model

Declared in [`src/content/diagrams.ts`](../src/content/diagrams.ts):

- **Node**: `id`, position in iso units for desktop (`at`) and mobile (`atMobile`, or `null` to hide it on phones), optional `size`, a Lucide `icon`, an `accent`, and bilingual `label`, `title` and `body`.
- **Edge**: `from`, `to`, optional `via` (which axis the elbow travels first) and `mobile: false` to drop it on phones.
- **Particle plan** (optional): `routes` (node-id paths played in sequence) and `dwell` (seconds to rest at a node). Without a plan the particle walks the edges in declaration order, which is how the loop diagram cycles.

Tests check the contract: node ids are unique, edges connect existing nodes, and every particle route follows existing edges.

## Projection and layout (build time)

- [`lib/iso.ts`](../src/lib/iso.ts): a true isometric projection (x at +30°, y at −30°, z up; 1 unit = 24px), box faces, the matrix that lays a 24×24 icon flat on a top face, and 90° floor connectors.
- [`lib/iso-layout.ts`](../src/lib/iso-layout.ts): turns a diagram into render-ready geometry. Boxes are sorted back to front (painter's algorithm), edges are resolved to paths, a dashed floor wraps the scene on desktop, and the viewBox reserves room for labels.

Both layouts are rendered into the HTML and CSS shows one, so there is no layout shift and no script decides it. Labels are drawn in a top layer so no box ever covers them.

## Runtime (browser)

[`src/scripts/iso`](../src/scripts/iso), loaded only when a diagram is within one viewport:

| Module        | Responsibility                                                                                                                |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `index.ts`    | Lazy-loads GSAP + MotionPathPlugin and mounts each diagram once                                                               |
| `mount.ts`    | Selection by hover, focus, tap or arrow keys: the box rises, its edges light up, the rest dims                                |
| `panel.ts`    | The caption under the diagram (`aria-live`), idle vs. selected text                                                           |
| `particle.ts` | Builds the looping timeline from the particle plan, traversing edges in either direction                                      |
| `playback.ts` | One state object decides whether idle animation runs: not while inspecting, paused by the user, off-screen or in a hidden tab |

Animations longer than five seconds have a visible pause button (WCAG 2.2.2).
