# 0003 · No chart library

**Status:** Accepted

**Context.** The page has one chart (a career timeline) and a row of stat tiles. Chart libraries add 40–200 KB and their own styling to override.

**Decision.** Compute bar positions in `lib/data/career.ts` and render them as HTML/CSS at build time. Tooltips are CSS; a visually hidden table is the accessible view.

**Consequences.**

- Zero chart JS, identical look to the rest of the design system.
- A chart only ships if its data passes an inclusion rule (e.g. at least 5 dated roles). Thin data becomes a stat tile or nothing.

**Reverses if:** the site needs several interactive, data-heavy charts.
