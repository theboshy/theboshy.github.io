// Minimal syntax colouring for the ADR sample in "How I work": no highlighter library needed.
const rules: [RegExp, string][] = [
  [/^(# .*)$/m, '#fbff7a'], // título
  [/^(\w[\w ]*:)/gm, '#c9a26b'], // campos (Status:, Context:…)
  [/^( {2}\+)/gm, '#8fbf6a'], // consecuencia positiva
  [/^( {2}-)/gm, '#e0708f'], // consecuencia negativa
];

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const highlightAdr = (text: string) =>
  rules.reduce((html, [re, color]) => html.replace(re, `<span style="color:${color}">$1</span>`), escape(text));
