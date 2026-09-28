import { describe, expect, it } from 'vitest';
import { en } from '../i18n/en';
import { es } from '../i18n/es';
import { findContentProblems, leafKeys, localePath } from './i18n';

describe('leafKeys', () => {
  it('lists dotted paths of leaf values', () => {
    expect(leafKeys({ a: 'x', b: { c: 'y', d: { e: 'z' } } })).toEqual(['a', 'b.c', 'b.d.e']);
  });
});

describe('findContentProblems', () => {
  it('reports keys missing on either side', () => {
    expect(findContentProblems({ a: '1', b: '2' }, { a: '1', c: '3' })).toEqual([
      'missing translation: b',
      'missing translation: c',
    ]);
  });

  it('reports unfilled placeholders, including in extra content', () => {
    expect(findContentProblems({ a: 'ok' }, { a: 'ok' }, [{ deep: ['{{TODO}}'] }])).toEqual([
      'unfilled placeholder: {{TODO}}',
    ]);
  });

  it('passes for the real dictionaries', () => {
    expect(findContentProblems(en, es)).toEqual([]);
  });
});

describe('localePath', () => {
  it('keeps English at the root and Spanish under /es/', () => {
    expect(localePath('en')).toBe('/');
    expect(localePath('es', 'lab')).toBe('/es/#lab');
  });
});
