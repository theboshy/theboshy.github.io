# Architecture

## Rendering model

Astro renders every page to static HTML at build time ([ADR 0001](decisions/0001-static-astro.md)). Components are `.astro` files; the only client code is two small bundles, one for page interactions (`scripts/motion`, ~2 KB gzipped) and one for the diagrams (`scripts/iso`, ~3 KB, which lazy-loads GSAP). Stylesheets are inlined into the HTML to avoid a render-blocking request.

```
content/*.ts  ──►  lib/* (pure)  ──►  components/*.astro  ──►  static HTML
     ▲                                                            │
build-time data (Stack Overflow API, fallback snapshot)            ▼
                                              scripts/* enhance it in the browser
```

## Layers

| Layer         | Rule                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| `content/`    | Data only, typed. No markup, no logic.                                                                   |
| `lib/`        | Pure functions, no DOM. Everything here is unit-tested.                                                  |
| `components/` | Presentation. They read content and call `lib/`, nothing else.                                           |
| `scripts/`    | Browser behavior. One module per behavior; progressive enhancement only, so the page works without them. |

## Internationalization

English at `/`, Spanish at `/es/` (Astro i18n routing). UI copy lives in `i18n/en.ts` and `i18n/es.ts`, with `es` typed against `en`. Structured content carries `{ en, es }` pairs. Visitors whose browser language differs see a dismissible banner, never a redirect.

## Build-time data

Numbers on the page are derived, not written: years, companies and the career timeline come from `content/experience.ts` (`lib/data/career.ts`). Stack Overflow reputation is fetched during the build; if the API fails, the last committed snapshot is used, so a network hiccup can't break a deploy. A weekly scheduled workflow keeps it fresh.

## Quality gates

`pnpm verify` runs in CI before every deploy:

1. `astro check`: strict TypeScript across `.ts` and `.astro`.
2. ESLint with `typescript-eslint` strict and `eslint-plugin-astro`.
3. Prettier.
4. Vitest: unit tests for `lib/` and contract tests on the content.

The build itself also fails on missing translations or unfilled `{{placeholders}}` ([ADR 0004](decisions/0004-content-checks-fail-the-build.md)), and a local, git-ignored denylist blocks confidential terms from ever reaching the generated site.

## Performance budget

| Metric                               | Budget          | Current (mobile, production) |
| ------------------------------------ | --------------- | ---------------------------- |
| Lighthouse performance               | ≥ 95            | 98                           |
| Accessibility / Best practices / SEO | 100             | 100 / 100 / 100              |
| JS on first load                     | < 30 KB gzipped | ~5 KB                        |
| CLS                                  | < 0.02          | 0                            |
