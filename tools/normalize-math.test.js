'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { transformMarkdown } = require('./normalize-math');

test('normalizes legacy escapes only inside dollar math', () => {
  const input = String.raw`Prose (r), \(r\), and \\{stay\\}.

$E\(r\) = \\\{x\_i : x^\* > 0\\\}$
`;
  const expected = String.raw`Prose (r), \(r\), and \\{stay\\}.

$E(r) = \{x_i : x^* > 0\}$
`;
  assert.equal(transformMarkdown(input).text, expected);
});

test('preserves one escaped underscore inside text commands', () => {
  const input = String.raw`$\text{Opt\\\_cost} + x\_i + \textbf{A\_B}$`;
  const expected = String.raw`$\text{Opt\_cost} + x_i + \textbf{A\_B}$`;
  assert.equal(transformMarkdown(input).text, expected);
});

test('normalizes line breaks and hashes in math', () => {
  const input = String.raw`$$\begin{aligned}a&=b\\\\c&=d\end{aligned}\qquad \\\#\\\{S\\\}$$`;
  const expected = [
    '$$',
    String.raw`\begin{aligned}a&=b\\c&=d\end{aligned}\qquad \#\{S\}`,
    '$$'
  ].join('\n');
  assert.equal(transformMarkdown(input).text, expected);
});

test('skips front matter, fenced code, inline code, and HTML comments', () => {
  const input = String.raw`---
title: "$x\_i$"
---

\`$x\_i$\`

\`\`\`tex
$x\_i = \\\{1\\\}$
\`\`\`

<!-- $x\_i$ -->

$x\_i$
`;
  const expected = input.replace(/\$x\\_i\$\n$/, '$x_i$\n');
  assert.equal(transformMarkdown(input).text, expected);
});

test('formats only standalone one-line display math', () => {
  const input = 'Before $$x+y$$ after\n\n  $$x+y$$\n';
  const expected = 'Before $$x+y$$ after\n\n  $$\n  x+y\n  $$\n';
  assert.equal(transformMarkdown(input).text, expected);
});

test('places attached multiline display delimiters on separate lines', () => {
  const input = '$$\\begin{aligned}\n  a&=b\\\\\n\\end{aligned}$$\n';
  const expected = '$$\n\\begin{aligned}\n  a&=b\\\\\n\\end{aligned}\n$$\n';
  assert.equal(transformMarkdown(input).text, expected);
});

test('preserves CRLF and is idempotent', () => {
  const input = '$$x\\_i = \\\{1\\\}$$\r\n';
  const once = transformMarkdown(input).text;
  assert.match(once, /\r\n/);
  assert.equal(transformMarkdown(once).text, once);
});

test('can leave display math layout unchanged', () => {
  assert.equal(transformMarkdown('$$x+y$$', { formatDisplay: false }).text, '$$x+y$$');
});
