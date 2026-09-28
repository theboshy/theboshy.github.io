// Parses the tiny markup used in copy: "I build systems that [[hold up]] in production."

export type HighlightPart =
  | { kind: 'text'; text: string }
  /** `index` staggers the paint animation; `gap` marks words followed by a space inside the same highlight. */
  | { kind: 'mark'; text: string; index: number; gap: boolean };

/**
 * Splits text into plain runs and highlighted words. Each highlighted word becomes its own part
 * so the marker breaks cleanly across lines.
 */
export function parseHighlight(text: string): HighlightPart[] {
  const parts: HighlightPart[] = [];
  let index = 0;
  text.split(/\[\[|\]\]/).forEach((chunk, i) => {
    if (!chunk) return;
    if (i % 2 === 0) {
      parts.push({ kind: 'text', text: chunk });
      return;
    }
    const words = chunk.split(' ');
    words.forEach((word, w) => parts.push({ kind: 'mark', text: word, index: index++, gap: w < words.length - 1 }));
  });
  return parts;
}

/** The same text without markup, for aria-labels and meta tags. */
export const stripHighlight = (text: string) => text.replace(/\[\[|\]\]/g, '');
