import { describe, expect, it } from 'vitest';
import { highlightAdr } from './adr';

describe('highlightAdr', () => {
  it('escapes HTML before colouring', () => {
    expect(highlightAdr('Status: <b>&')).toContain('&lt;b&gt;&amp;');
  });

  it('colours the title and field names', () => {
    const html = highlightAdr('# ADR 1\nStatus: ok');
    expect(html).toMatch(/<span style="color:[^"]+"># ADR 1<\/span>/);
    expect(html).toMatch(/<span style="color:[^"]+">Status:<\/span>/);
  });
});
