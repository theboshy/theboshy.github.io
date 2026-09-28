// Build-time icons: lucide-static (UI) and simple-icons (logos). Zero client-side JS.
// Read with fs, on demand: an eager import.meta.glob of ~5,000 SVGs made Vite transform each
// one as a module and the first dev-server load took over 20 s.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// simple-icons doesn't export its package.json, so resolve from the project root
// (Astro runs with cwd = project root in dev, build and CI).
const modules = join(process.cwd(), 'node_modules');
const dirs = {
  lucide: join(modules, 'lucide-static', 'icons'),
  brand: join(modules, 'simple-icons', 'icons'),
};
const cache = new Map<string, string>();

const inner = (svg: string) =>
  svg
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .trim();

function load(kind: keyof typeof dirs, name: string): string {
  const key = `${kind}:${name}`;
  let body = cache.get(key);
  if (body === undefined) {
    try {
      body = inner(readFileSync(join(dirs[kind], `${name}.svg`), 'utf8'));
    } catch {
      throw new Error(`Unknown ${kind} icon: ${name}`);
    }
    cache.set(key, body);
  }
  return body;
}

export const lucideInner = (name: string) => load('lucide', name);
export const brandInner = (slug: string) => load('brand', slug);
