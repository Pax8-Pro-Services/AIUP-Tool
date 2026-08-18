// Generates en-gb/index.html (British English) from index.html (US English).
// Run after any edit to index.html:  node tools/localize-en-gb.mjs
//
// Replacements are exact strings with an expected match count, so the script
// fails loudly if index.html changes in a way that breaks a rule, rather than
// silently producing a half-localised page. Code (CSS properties, JS APIs,
// element ids) is never touched — every rule below targets user-visible copy
// or a document-level attribute/path that must differ in the subdirectory.
//
// The legal disclaimer is approved verbatim text and contains no US-specific
// spellings; no rule may alter it.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'index.html'), 'utf8');

const RULES = [
  // document setup for the /en-gb/ subdirectory
  ['<html lang="en">', '<html lang="en-GB">', 1],
  ['src="Pax8-WHT.svg"', 'src="../Pax8-WHT.svg"', 1],
  ['<a class="lang" href="en-gb/">UK English</a>', '<a class="lang" href="../">US English</a>', 1],
  // spelling localisations (user-visible copy only)
  ['Step 1 of 6 · Organization', 'Step 1 of 6 · Organisation', 1],
  ['Organization name — Summit IT Solutions', 'Organisation name — Summit IT Solutions', 1],
  ['Client / organization name', 'Client / organisation name', 1],
  ['placeholder="Organization name"', 'placeholder="Organisation name"', 1],
  ['your own organization', 'your own organisation', 1],
  ['[Organization Name]', '[Organisation Name]', 1],
  ['unauthorized', 'unauthorised', 2],
  ['training &amp; acknowledgment', 'training &amp; acknowledgement', 1],
  ['human judgment', 'human judgement', 1],
  // word-choice localisation
  ['Check the tools the team is allowed to use', 'Tick the tools the team is allowed to use', 1],
];

let out = src;
const errors = [];
for (const [from, to, expected] of RULES) {
  const count = out.split(from).length - 1;
  if (count !== expected) {
    errors.push(`expected ${expected} of ${JSON.stringify(from)}, found ${count}`);
    continue;
  }
  out = out.split(from).join(to);
}

// Safety net: no known US spellings left in visible copy. CSS/JS identifiers
// that legitimately contain these letters are excluded by the patterns.
const LEFTOVER = /organization|unauthorized|acknowledgment|human judgment/i;
const leftover = out.match(LEFTOVER);
if (leftover) errors.push(`US spelling still present after conversion: ${JSON.stringify(leftover[0])}`);

if (errors.length) {
  console.error('en-gb generation FAILED:\n  ' + errors.join('\n  '));
  process.exit(1);
}

mkdirSync(join(root, 'en-gb'), { recursive: true });
writeFileSync(join(root, 'en-gb', 'index.html'), out);
console.log(`en-gb/index.html generated (${RULES.length} rules applied)`);
