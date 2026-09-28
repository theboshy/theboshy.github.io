import { en, type Dict } from '../i18n/en';
import { es } from '../i18n/es';

export type Locale = 'en' | 'es';
/** A value in both languages, for structured content that lives outside the dictionaries. */
export type L10n<T = string> = { en: T; es: T };

const dicts: Record<Locale, Dict> = { en, es };

/** Dotted paths of every leaf key, e.g. `hero.title`. */
export function leafKeys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? leafKeys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

function allStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

const PLACEHOLDER = /\{\{[^}]+\}\}/;

/** Content problems that must never ship: diverging translations or unfilled `{{PLACEHOLDERS}}`. */
export function findContentProblems(a: object, b: object, extra: unknown[] = []): string[] {
  const problems: string[] = [];
  const ka = new Set(leafKeys(a));
  const kb = new Set(leafKeys(b));
  for (const k of ka) if (!kb.has(k)) problems.push(`missing translation: ${k}`);
  for (const k of kb) if (!ka.has(k)) problems.push(`missing translation: ${k}`);
  for (const s of [a, b, ...extra].flatMap(allStrings))
    if (PLACEHOLDER.test(s)) problems.push(`unfilled placeholder: ${s}`);
  return problems;
}

/** Fails the build (it runs during static rendering) instead of shipping broken copy. */
export function assertContent(extra: unknown[] = []) {
  const problems = findContentProblems(en, es, extra);
  if (problems.length) throw new Error(`Content check failed:\n  ${problems.join('\n  ')}`);
}

export const useT = (locale: Locale) => dicts[locale];

export const pick = <T>(value: L10n<T>, locale: Locale): T => value[locale];

export const localePath = (locale: Locale, hash = '') => `${locale === 'en' ? '/' : '/es/'}${hash ? `#${hash}` : ''}`;
