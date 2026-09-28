# theboshy.github.io

Personal site of **Peter G. Lobo**, Senior Software Engineer. Live at **[theboshy.github.io](https://theboshy.github.io)**.

A static, bilingual (EN/ES) one-pager with interactive isometric diagrams, built with Astro and a small amount of client-side TypeScript. Its visual language: paper-toned surfaces, hairline grids, a serif with a yellow highlighter, bracket corners on hover.

|                                       |                                                                                   |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| Lighthouse (mobile, production build) | Performance 98 · Accessibility 100 · Best Practices 100 · SEO 100                 |
| Client JS on first load               | ~5 KB gzipped; GSAP (~36 KB gzipped) loads only when a diagram nears the viewport |
| Quality gates                         | `astro check` (strict TS), ESLint, Prettier, Vitest, content checks at build time |

## Highlights

- **Isometric diagrams from data.** Nodes and edges are declared in [`src/content/diagrams.ts`](src/content/diagrams.ts); a pure layout module projects them to SVG at build time ([`src/lib/iso-layout.ts`](src/lib/iso-layout.ts)). The browser only adds hover, keyboard navigation and the animated particle ([`src/scripts/iso`](src/scripts/iso)).
- **Content is data, and it's checked.** Experience, stack and diagrams are typed objects. Tests enforce contracts on them (edges point at real nodes, particle routes follow real edges, dates are valid and ordered), and the build fails on missing translations or unfilled placeholders.
- **Numbers are computed, never typed.** Years, companies and the career timeline derive from the experience data; Stack Overflow reputation is fetched at build time with a committed fallback snapshot.
- **Accessible motion.** Every hover has a focus equivalent, diagrams are keyboard-navigable with a pause button, the chart has a table alternative, and `prefers-reduced-motion` makes the page static.

## Getting started

Requires Node 22+ and pnpm.

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm verify    # types + lint + formatting + unit tests
pnpm build     # static site in dist/
```

Pushing to `main` deploys to GitHub Pages through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which runs `pnpm verify` before building. A weekly scheduled run refreshes the build-time data.

## Project map

```
src/
  content/      typed data: experience, diagrams, stack, principles, profile
  i18n/         en.ts / es.ts dictionaries (es is typed against en)
  lib/          pure logic: iso projection and layout, career metrics, i18n, highlight parser
  scripts/      client behavior: iso/ (diagrams) and motion/ (one module per interaction)
  components/   ui/ primitives, diagrams/, sections/ of the page
  styles/       tokens, base, motion and one stylesheet per component
docs/           design docs and architecture decision records
```

## Documentation

- [Design system](docs/design-system.md): tokens, type, layout, components
- [Motion and interaction](docs/motion.md): every animation, its timing and its reduced-motion fallback
- [Isometric diagrams](docs/isometric-diagrams.md): data model, projection, layout and runtime
- [Architecture](docs/architecture.md): rendering model, build-time data, quality gates, performance
- [Decisions](docs/decisions/): the ADRs behind the main choices

## License

Code is released under the [MIT License](LICENSE). Personal content (text, experience, images) is © Peter G. Lobo and not covered by the license.
