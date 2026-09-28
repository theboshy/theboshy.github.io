# Design system

A warm paper surface, hairline structure, one serif for headings, and a yellow highlighter as the only loud color. Tokens live in [`src/styles/tokens.css`](../src/styles/tokens.css) and are exposed to Tailwind v4 through `@theme`.

## Color

| Token                          | Light                             | Dark                    | Use                                    |
| ------------------------------ | --------------------------------- | ----------------------- | -------------------------------------- |
| `--surface-bg`                 | `#f6f6f3`                         | `#121212`               | Page and card background               |
| `--surface-1` / `-2`           | `#edede8` / `#e5e5e1`             | `#191919` / `#212121`   | Recessed areas, iso box faces          |
| `--line-structure`             | `#cfcfc9`                         | `#ffffff1f`             | Borders and the shared grid            |
| `--line-strong`                | `#404039`                         | `#8c8c8c`               | Hover borders, bracket corners         |
| `--text-primary` / `-tertiary` | `#222220` / `#6b6b66`             | `#ebebeb` / `#b3b3b3cc` | Headings / body                        |
| `--text-disabled`              | `#70706a`                         | `#82827c`               | Mono labels and metadata               |
| `--highlight`                  | `#fbff7a`                         | `#fbff7a`               | Marker behind headings, text selection |
| `--accent-*`                   | blue, pink, orange, green, violet | +8% lightness           | Diagram nodes only                     |

Rules:

- Yellow stays under ~5% of any screen: the heading marker, the primary button, selection, active states.
- Every text token meets WCAG AA (4.5:1) on its surface. The label gray (`--text-disabled`) is the lightest value that still passes.
- Dark mode is a separate set of steps, not an inversion. The highlighter keeps its color and the text on top of it stays dark.

## Type

| Role               | Font                                 | Notes                              |
| ------------------ | ------------------------------------ | ---------------------------------- |
| Headings           | Newsreader (variable, optical sizes) | Editorial serif with optical sizes |
| Body and UI        | Inter (variable)                     | 15px / 150%, tracking −0.075px     |
| Labels, data, code | Geist Mono (variable)                | 11–12px, uppercase for eyebrows    |

All fonts are self-hosted; the two used above the fold are preloaded.

## Layout

- A single column: 680px, 840px from 1280px up. 16px gutters on phones.
- Sections are separated by 120px (80px on phones).
- **Shared hairlines**: adjacent boxes overlap by 1px (`.grid-lines`), so a grid of cards reads as one continuous line drawing, never double borders.
- Radii are almost square (2px); only status pills are round. Cards have no shadow: depth comes from lines.

## Components

| Component                           | What it does                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `Highlight`                         | Renders `[[...]]` in copy as one marker span per word, so the marker breaks cleanly across lines and can be painted word by word.     |
| Corner box (`.cbox`, `.cbox-hover`) | Hairline box. On hover or focus, four bracket corners appear slightly outside it and the background turns into 315° diagonal stripes. |
| `Button`                            | 32px, 2px radius, soft shadow, wrapped in a bracket-corner frame on hover. The primary variant carries a `border-beam`.               |
| `SectionHead`                       | Mono eyebrow, serif heading with highlight, body paragraph.                                                                           |
| Chip                                | Mono 11px tag with a hairline border (stacks, statuses).                                                                              |

## Writing style

- No em dashes and no dashed dividers: colons, parentheses, periods, `→` for date ranges, solid hairlines or whitespace.
- Emojis are accents, at most one per block, only in labels and eyebrows, never in headings or body text.
