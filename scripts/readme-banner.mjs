// Exports the "Build, ship, learn" diagram from the built site as two standalone, animated SVGs
// (light and dark) for the GitHub profile README, which allows images but no CSS or JS.
// Usage: pnpm build && node scripts/readme-banner.mjs [outDir]
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.argv[2] ?? 'dist/readme';
const html = readFileSync('dist/index.html', 'utf8');

// The desktop variant of the loop diagram, exactly as the site renders it.
const root = html.indexOf('data-diagram="loop"');
const start = html.indexOf('<svg', root);
const svg = html.slice(start, html.indexOf('</svg>', start) + '</svg>'.length);
const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
const inner = svg
  .slice(svg.indexOf('>') + 1, -'</svg>'.length)
  .replace(/ data-astro-cid-\w+(="")?/g, '')
  .replace(/ (tabindex|role|aria-label|data-cursor|data-title|data-body)="[^"]*"/g, '');

// The particle travels the whole loop: chain the edges (declared in cycle order) into one path.
const cycle = [...inner.matchAll(/<path class="iso-edge" d="([^"]+)"/g)]
  .map((m, i) => (i === 0 ? m[1] : m[1].replace(/^M/, 'L')))
  .join('');

const THEMES = {
  light: {
    surface: '#f6f6f3',
    surface1: '#edede8',
    surface2: '#e5e5e1',
    line: '#bebeb6',
    strong: '#404039',
    text: '#222220',
    label: '#70706a',
    accents: { violet: '#8a7fe0', blue: '#438aa5', orange: '#c17e2e', pink: '#d05376', green: '#538a2e' },
  },
  dark: {
    surface: '#161b22',
    surface1: '#1c2128',
    surface2: '#22272e',
    line: '#ffffff29',
    strong: '#8c8c8c',
    text: '#ebebeb',
    label: '#9a9a94',
    accents: { violet: '#a79ff0', blue: '#5ba5c0', orange: '#d8964a', pink: '#e0708f', green: '#6fa84a' },
  },
};

const style = (t) => `
  svg { ${Object.entries(t.accents)
    .map(([k, v]) => `--accent-${k}:${v};`)
    .join('')} }
  .iso-floor { fill: ${t.surface1}; fill-opacity: .5; stroke: ${t.line}; stroke-dasharray: 4 4; }
  .iso-edge { fill: none; stroke: ${t.line}; stroke-width: 1.25; }
  .iso-shadow { fill: ${t.text}; opacity: .06; }
  .iso-top, .iso-left, .iso-right { stroke: ${t.strong}; stroke-opacity: .7; stroke-width: 1; stroke-linejoin: round; }
  .iso-top { fill: ${t.surface}; } .iso-left { fill: ${t.surface1}; } .iso-right { fill: ${t.surface2}; }
  .iso-icon { fill: none; stroke: var(--accent); stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
  .iso-label { font: 11px ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .04em; text-transform: uppercase; fill: ${t.label}; }
  .iso-particle-core { fill: ${t.text}; } .iso-particle-halo { fill: ${t.text}; opacity: .18; }
  @keyframes float { 50% { transform: translateY(-3px); } }
  .iso-float { animation: float 4s ease-in-out infinite; }
  .iso-node:nth-of-type(2) .iso-float { animation-delay: -.8s; }
  .iso-node:nth-of-type(3) .iso-float { animation-delay: -1.6s; }
  .iso-node:nth-of-type(4) .iso-float { animation-delay: -2.4s; }
  .iso-node:nth-of-type(5) .iso-float { animation-delay: -3.2s; }
  @media (prefers-reduced-motion: reduce) { .iso-float { animation: none; } .iso-particle { display: none; } }`;

// SMIL <animateMotion> is the most widely supported way to move along a path inside an <img>.
const particle = `<g class="iso-particle"><circle r="7" class="iso-particle-halo"/><circle r="3.5" class="iso-particle-core"/><animateMotion dur="9s" repeatCount="indefinite" path="${cycle}"/></g>`;
const body = inner.replace(/<g class="iso-particle"[\s\S]*?<\/g>/, particle);

mkdirSync(outDir, { recursive: true });
for (const [name, theme] of Object.entries(THEMES)) {
  const file = join(outDir, `loop-${name}.svg`);
  writeFileSync(
    file,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="720" role="img" aria-label="Build, ship, learn. Repeat.">` +
      `<style>${style(theme)}</style>${body}</svg>\n`,
  );
  console.log(`✓ ${file}`);
}
