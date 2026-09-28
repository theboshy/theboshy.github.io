# 0002 · Isometric diagrams as SVG + GSAP, not Rive

**Status:** Accepted

**Context.** Interactive isometric illustrations are often built in Rive: a binary `.riv` file edited in Rive's editor, played by a ~150 KB WebAssembly runtime, usually swapped for a static image on mobile.

**Decision.** Generate the diagrams as inline SVG from typed data at build time, and add behavior with GSAP (lazy-loaded, ~36 KB gzipped).

**Consequences.**

- Diagrams are code: reviewable in diffs, testable, and themeable through the same CSS tokens (dark mode costs nothing).
- Mobile gets a real, interactive vertical layout instead of a screenshot.
- Richer illustration (shading, character animation) would be harder than in Rive.

**Reverses if:** the diagrams need hand-drawn animation that is impractical to express as geometry.
