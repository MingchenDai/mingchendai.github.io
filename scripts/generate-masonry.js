const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const COLLECTION_DIR = path.join(ROOT, 'source', 'collections', 'masonry');
const JSON_PATH = path.join(COLLECTION_DIR, 'masonry.json');
const OUTPUT_PATH = path.join(COLLECTION_DIR, 'index.md');

function loadData() {
  if (!fs.existsSync(JSON_PATH)) {
    throw new Error(`JSON file not found: ${JSON_PATH}`);
  }
  const raw = fs.readFileSync(JSON_PATH, 'utf8');
  return JSON.parse(raw);
}

function buildFrontMatter() {
  // Keep your existing front‑matter and intro text.
  return `---
title: Masonry
date: 2025-06-23 22:50:18
template: masonry
---

Collection of footsteps, delicacies and photos.
`;
}

function normalizeDateForFolder(dateStr) {
  // Expect YYYY-MM-DD; keep as is for folder names
  return dateStr;
}

function buildEntry(entry) {
  const { date, tags, locationDetailed, locationCity, locationProvince, description, layout, images, link } = entry;

  if (!date || !Array.isArray(tags) || !tags.length || !locationCity || !locationProvince || !layout || !images || !images.length) {
    throw new Error(`Invalid entry in masonry.json: ${JSON.stringify(entry)}`);
  }

  const folderDate = normalizeDateForFolder(date);
  const locationParts = [locationDetailed, locationCity, locationProvince].filter(Boolean);
  const location = locationParts.join(', ');
  const heading = `### ${date} @ ${location} \n\n`;

  const imageLines = images.map(
    (filename) =>
      `![${path.parse(filename).name.replace(/[-_]/g, ' ')}](collections/masonry/${folderDate}/${filename})`
  );

  const groupBlock =
    `{% grouppicture ${layout} %}\n` +
    imageLines.join('\n') +
    '\n{% endgrouppicture %}\n\n';

  const tagsLine = tags.map(t => `#${t}`).join('\t');
  const tagsBlock = tagsLine ? `> ${tagsLine}\n\n` : '';

  let fullDescription = description || '';
  if (link && typeof link === 'string' && link.trim().length > 0) {
    const safeLink = link.trim();
    fullDescription = fullDescription
      ? `${fullDescription} [Read More.](${safeLink})`
      : `[Read More.](${safeLink})`;
  }

  const descBlock = fullDescription ? `${fullDescription}\n\n` : '';

  return heading + groupBlock + tagsBlock + descBlock;
}

function main() {
  const data = loadData();

  // Optional: sort by date ascending
  data.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  let content = buildFrontMatter();

  // Group entries by year so we can generate dynamic year headers
  const byYear = new Map();
  for (const entry of data) {
    const year = String(entry.date).slice(0, 4);
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year).push(entry);
  }

  // Sort years ascending
  const years = Array.from(byYear.keys()).sort();
  for (const year of years) {
    content += `\n## ${year}\n\n`;
    const entries = byYear.get(year);
    // Ensure entries for each year are sorted by date
    entries.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    for (const entry of entries) {
      content += buildEntry(entry);
    }
  }

  fs.writeFileSync(OUTPUT_PATH, content, 'utf8');
  console.log(`Masonry page generated: ${OUTPUT_PATH}`);
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}