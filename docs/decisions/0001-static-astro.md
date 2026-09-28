# 0001 · Static site with Astro

**Status:** Accepted

**Context.** The site is a single page of content with a few interactive islands (diagrams, cursor, theme). It is hosted on GitHub Pages, which only serves files. Speed and SEO matter more than app-like navigation.

**Decision.** Astro with `output: 'static'`. Everything that can be computed at build time is (diagram geometry, metrics, icons, translations); the browser receives HTML plus two small scripts.

**Consequences.**

- First load ships ~5 KB of JS; Lighthouse performance is 98 on mobile.
- No runtime framework to hydrate. Interactions are plain TypeScript modules.
- Data that changes (Stack Overflow reputation) needs a rebuild, handled by a weekly scheduled workflow.

**Reverses if:** the site needs per-visitor content or authenticated areas.
