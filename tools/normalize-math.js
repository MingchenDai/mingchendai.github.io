'use strict';

const fs = require('fs');
const path = require('path');

const RULES = [
  'escapedBraces',
  'escapedHash',
  'nestedParenDelimiter',
  'escapedSubscript',
  'literalTextUnderscore',
  'escapedStar',
  'excessiveLineBreak',
  'displayMathLayout'
];

const TEXT_COMMANDS = new Set([
  'text',
  'textbf',
  'textit',
  'textmd',
  'textnormal',
  'textrm',
  'textsf',
  'textsl',
  'texttt',
  'textup',
  'mbox'
]);

function emptyStats() {
  return Object.fromEntries(RULES.map((rule) => [rule, 0]));
}

function addStats(target, source) {
  for (const rule of RULES) target[rule] += source[rule];
}

function isEscaped(text, index) {
  let count = 0;
  for (let i = index - 1; i >= 0 && text[i] === '\\'; i--) count++;
  return count % 2 === 1;
}

function textContextMask(text) {
  const mask = new Array(text.length).fill(false);
  const stack = [];
  let inText = false;

  for (let i = 0; i < text.length; i++) {
    mask[i] = inText;
    if (text[i] === '{' && !isEscaped(text, i)) {
      const command = text.slice(0, i).match(/\\([A-Za-z]+)\s*$/);
      stack.push(inText);
      inText = inText || Boolean(command && TEXT_COMMANDS.has(command[1]));
    } else if (text[i] === '}' && !isEscaped(text, i) && stack.length) {
      inText = stack.pop();
    }
  }

  return mask;
}

function normalizeMathContent(text) {
  const stats = emptyStats();
  const inText = textContextMask(text);
  let output = '';

  for (let i = 0; i < text.length;) {
    if (text[i] !== '\\') {
      output += text[i++];
      continue;
    }

    let end = i;
    while (text[end] === '\\') end++;
    const count = end - i;
    const next = text[end];
    let replacement = '\\'.repeat(count);

    if ((next === '{' || next === '}') && count >= 2) {
      replacement = '\\';
      stats.escapedBraces++;
    } else if (next === '#' && count >= 2) {
      replacement = '\\';
      stats.escapedHash++;
    } else if ((next === '(' || next === ')') && count === 1) {
      replacement = '';
      stats.nestedParenDelimiter++;
    } else if (next === '_') {
      if (inText[i]) {
        replacement = '\\';
        if (count !== 1) stats.literalTextUnderscore++;
      } else {
        replacement = '';
        stats.escapedSubscript++;
      }
    } else if (next === '*' && count === 1) {
      replacement = '';
      stats.escapedStar++;
    } else if (count >= 4) {
      replacement = '\\\\';
      stats.excessiveLineBreak++;
    }

    output += replacement;
    i = end;
  }

  return { text: output, stats };
}

function fenceMarker(line) {
  const match = line.match(/^ {0,3}(`{3,}|~{3,})(?:[^`~].*)?$/);
  return match ? { char: match[1][0], length: match[1].length } : null;
}

function closesFence(line, fence) {
  const match = line.match(/^ {0,3}(`+|~+)\s*$/);
  return Boolean(match && match[1][0] === fence.char && match[1].length >= fence.length);
}

function canOpenInlineMath(line, index) {
  return index + 1 < line.length && !/\s/.test(line[index + 1]);
}

function canCloseInlineMath(content, line, index) {
  const previous = content.at(-1);
  const next = line[index + 1];
  return Boolean(previous && !/\s/.test(previous) && !(next && /\d/.test(next)));
}

function normalizeMathMarkup(source) {
  const eol = source.includes('\r\n') ? '\r\n' : '\n';
  const lines = source.split(/\r?\n/);
  const output = [];
  const stats = emptyStats();
  let frontMatter = /^\uFEFF?---\s*$/.test(lines[0] || '');
  let fence = null;
  let htmlComment = false;
  let codeTicks = 0;
  let math = null;

  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    const line = lines[lineNumber];

    if (frontMatter) {
      output.push(line);
      if (lineNumber > 0 && /^(?:---|\.\.\.)\s*$/.test(line)) frontMatter = false;
      continue;
    }

    if (!math && !htmlComment && !codeTicks) {
      if (fence) {
        output.push(line);
        if (closesFence(line, fence)) fence = null;
        continue;
      }
      const marker = fenceMarker(line);
      if (marker) {
        fence = marker;
        output.push(line);
        continue;
      }
    }

    let rendered = '';
    for (let i = 0; i < line.length;) {
      if (math) {
        const delimiterLength = math.delimiter.length;
        const closes = line.startsWith(math.delimiter, i) && !isEscaped(line, i) &&
          (math.delimiter === '$$' || canCloseInlineMath(math.content, line, i));
        if (closes) {
          const normalized = normalizeMathContent(math.content);
          rendered = math.prefix + normalized.text + math.delimiter;
          addStats(stats, normalized.stats);
          math = null;
          i += delimiterLength;
        } else {
          math.content += line[i++];
        }
        continue;
      }

      if (htmlComment) {
        const end = line.indexOf('-->', i);
        if (end === -1) {
          rendered += line.slice(i);
          i = line.length;
        } else {
          rendered += line.slice(i, end + 3);
          i = end + 3;
          htmlComment = false;
        }
        continue;
      }

      if (codeTicks) {
        const delimiter = '`'.repeat(codeTicks);
        const end = line.indexOf(delimiter, i);
        if (end === -1) {
          rendered += line.slice(i);
          i = line.length;
        } else {
          rendered += line.slice(i, end + codeTicks);
          i = end + codeTicks;
          codeTicks = 0;
        }
        continue;
      }

      if (line.startsWith('<!--', i)) {
        rendered += '<!--';
        htmlComment = true;
        i += 4;
        continue;
      }

      if (line[i] === '`') {
        let end = i;
        while (line[end] === '`') end++;
        codeTicks = end - i;
        rendered += line.slice(i, end);
        i = end;
        continue;
      }

      if (line[i] === '$' && !isEscaped(line, i)) {
        const delimiter = line[i + 1] === '$' ? '$$' : '$';
        if (delimiter === '$$' || canOpenInlineMath(line, i)) {
          math = { delimiter, content: '', prefix: rendered + delimiter };
          rendered = '';
          i += delimiter.length;
          continue;
        }
      }

      rendered += line[i++];
    }

    if (math) {
      if (lineNumber < lines.length - 1) math.content += eol;
    } else {
      output.push(rendered);
    }
  }

  // Leave an unclosed math span byte-for-byte intact. Validation reports it separately.
  if (math) {
    const completed = output.length ? output.join(eol) + eol : '';
    return { text: completed + math.prefix + math.content, stats, unclosedMath: 1 };
  }

  return { text: output.join(eol), stats, unclosedMath: 0 };
}

function formatDisplayMath(source) {
  const eol = source.includes('\r\n') ? '\r\n' : '\n';
  const lines = source.split(/\r?\n/);
  const output = [];
  let frontMatter = /^\uFEFF?---\s*$/.test(lines[0] || '');
  let fence = null;
  let htmlComment = false;
  let displayMath = false;
  let changed = 0;

  for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
    const line = lines[lineNumber];
    if (frontMatter) {
      output.push(line);
      if (lineNumber > 0 && /^(?:---|\.\.\.)\s*$/.test(line)) frontMatter = false;
      continue;
    }
    if (fence) {
      output.push(line);
      if (closesFence(line, fence)) fence = null;
      continue;
    }
    const marker = !htmlComment && fenceMarker(line);
    if (marker) {
      fence = marker;
      output.push(line);
      continue;
    }

    const commentStart = line.indexOf('<!--');
    const commentEnd = line.indexOf('-->');
    if (htmlComment || commentStart !== -1) {
      output.push(line);
      if (htmlComment && commentEnd !== -1) htmlComment = false;
      else if (!htmlComment && commentStart !== -1 && commentEnd < commentStart) htmlComment = true;
      continue;
    }

    const indentation = line.match(/^\s*/)[0];
    const trimmed = line.trim();
    if (!displayMath && trimmed.startsWith('$$')) {
      const remainder = trimmed.slice(2);
      if (!remainder) {
        output.push(line);
        displayMath = true;
      } else if (remainder.endsWith('$$') && !remainder.slice(0, -2).includes('$$')) {
        output.push(`${indentation}$$`, `${indentation}${remainder.slice(0, -2).trim()}`, `${indentation}$$`);
        changed++;
      } else {
        output.push(`${indentation}$$`, `${indentation}${remainder}`);
        displayMath = true;
        changed++;
      }
    } else if (displayMath && trimmed.endsWith('$$') && trimmed !== '$$') {
      output.push(`${indentation}${trimmed.slice(0, -2).trimEnd()}`, `${indentation}$$`);
      displayMath = false;
      changed++;
    } else {
      output.push(line);
      if (displayMath && trimmed === '$$') displayMath = false;
    }
  }

  return { text: output.join(eol), changed };
}

function transformMarkdown(source, options = {}) {
  const normalized = normalizeMathMarkup(source);
  const stats = normalized.stats;
  let text = normalized.text;
  if (options.formatDisplay !== false) {
    const formatted = formatDisplayMath(text);
    text = formatted.text;
    stats.displayMathLayout += formatted.changed;
  }
  return { text, stats, unclosedMath: normalized.unclosedMath };
}

function markdownFiles(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return target.endsWith('.md') ? [target] : [];
  return fs.readdirSync(target, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => markdownFiles(path.join(target, entry.name)));
}

function usage() {
  return `Usage: node tools/normalize-math.js [options] [file-or-directory ...]

Options:
  --check               Report files that need normalization (default)
  --write               Rewrite files in place
  --no-format-display   Keep existing $$ delimiter layout unchanged
  --verbose             Print rule counts for every changed file
  --help                Show this help

With no paths, source/_posts is scanned recursively.`;
}

function parseArguments(argv) {
  const options = { mode: 'check', formatDisplay: true, verbose: false, targets: [] };
  let explicitMode = null;
  for (const argument of argv) {
    if (argument === '--check' || argument === '--write') {
      const mode = argument.slice(2);
      if (explicitMode && explicitMode !== mode) throw new Error('--check and --write cannot be combined');
      options.mode = explicitMode = mode;
    } else if (argument === '--no-format-display') {
      options.formatDisplay = false;
    } else if (argument === '--verbose') {
      options.verbose = true;
    } else if (argument === '--help') {
      options.help = true;
    } else if (argument.startsWith('-')) {
      throw new Error(`Unknown option: ${argument}`);
    } else {
      options.targets.push(argument);
    }
  }
  return options;
}

function formatStats(stats) {
  return RULES.filter((rule) => stats[rule]).map((rule) => `${rule}=${stats[rule]}`).join(', ');
}

function main(argv = process.argv.slice(2)) {
  let options;
  try {
    options = parseArguments(argv);
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    return 2;
  }
  if (options.help) {
    console.log(usage());
    return 0;
  }

  const targets = options.targets.length ? options.targets : ['source/_posts'];
  let files;
  try {
    files = [...new Set(targets.flatMap((target) => markdownFiles(path.resolve(target))))].sort();
  } catch (error) {
    console.error(error.message);
    return 2;
  }

  const total = emptyStats();
  let changedFiles = 0;
  let unclosedFiles = 0;
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    const result = transformMarkdown(source, options);
    const changed = result.text !== source;
    addStats(total, result.stats);
    if (result.unclosedMath) {
      unclosedFiles++;
      console.error(`UNCLOSED ${path.relative(process.cwd(), file)}`);
    }
    if (!changed) continue;
    changedFiles++;
    const relative = path.relative(process.cwd(), file);
    if (options.mode === 'write') fs.writeFileSync(file, result.text, 'utf8');
    console.log(`${options.mode === 'write' ? 'UPDATED' : 'WOULD UPDATE'} ${relative}`);
    if (options.verbose) console.log(`  ${formatStats(result.stats)}`);
  }

  const action = options.mode === 'write' ? 'updated' : 'need normalization';
  console.log(`${changedFiles} of ${files.length} Markdown files ${action}.`);
  if (formatStats(total)) console.log(`Changes: ${formatStats(total)}`);
  if (unclosedFiles) console.error(`${unclosedFiles} file(s) contain unclosed dollar math.`);

  if (unclosedFiles) return 2;
  return options.mode === 'check' && changedFiles ? 1 : 0;
}

if (require.main === module) process.exitCode = main();

module.exports = {
  formatDisplayMath,
  normalizeMathContent,
  normalizeMathMarkup,
  parseArguments,
  transformMarkdown
};
