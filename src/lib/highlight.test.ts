import { describe, expect, it } from 'vitest';
import { parseHighlight, stripHighlight } from './highlight';

describe('parseHighlight', () => {
  it('returns plain text untouched', () => {
    expect(parseHighlight('Hello')).toEqual([{ kind: 'text', text: 'Hello' }]);
  });

  it('splits a highlighted phrase into one mark per word', () => {
    expect(parseHighlight('I build systems that [[hold up]] in production.')).toEqual([
      { kind: 'text', text: 'I build systems that ' },
      { kind: 'mark', text: 'hold', index: 0, gap: true },
      { kind: 'mark', text: 'up', index: 1, gap: false },
      { kind: 'text', text: ' in production.' },
    ]);
  });

  it('keeps counting across several highlights (for the staggered paint)', () => {
    const marks = parseHighlight('[[a]] and [[b c]]').filter((p) => p.kind === 'mark');
    expect(marks.map((m) => m.index)).toEqual([0, 1, 2]);
  });
});

describe('stripHighlight', () => {
  it('removes the markup', () => {
    expect(stripHighlight('[[Build, ship, learn]]. Repeat.')).toBe('Build, ship, learn. Repeat.');
  });
});
