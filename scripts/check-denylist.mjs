// Fails the build if a confidential term shows up anywhere in the generated site.
// The term list (.content-denylist) is local and git-ignored, so in CI the check is skipped:
// it is meant to run on the author's machine before pushing.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const LIST = '.content-denylist';
const SCANNED = /\.(html|js|json|xml|txt)$/;

if (!existsSync(LIST)) {
  console.warn(`⚠ ${LIST} not found: confidentiality check skipped (expected in CI).`);
  process.exit(0);
}

const terms = readFileSync(LIST, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'));

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : SCANNED.test(entry.name) ? [join(dir, entry.name)] : [],
  );

const hits = [];
for (const file of walk('dist')) {
  const text = readFileSync(file, 'utf8').toLowerCase();
  for (const term of terms) if (text.includes(term.toLowerCase())) hits.push(`${file}: "${term}"`);
}

if (hits.length) {
  console.error(`✖ Confidential terms found in the build:\n  ${hits.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ Denylist: ${terms.length} terms, 0 matches.`);
