const fs = require('fs');
const path = require('path');

const dirs = [
  '/root/www/veles-voyage/src/shared/data/pages',
  '/root/www/veles-voyage/src/shared/data/cruises'
];

const extraFiles = [
  '/root/www/veles-voyage/src/shared/data/seo/places-seo.ts'
];

let changed = 0;

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Remove en/zh/de hreflang entries
  content = content.replace(
    /\{\s*rel:\s*"alternate",\s*hreflang:\s*"(en|zh|de)",\s*href:\s*"[^"]*"\s*\},?\s*\n?/g,
    ''
  );

  if (content !== original) {
    fs.writeFileSync(file, content);
    changed++;
    console.log(`Fixed: ${path.basename(file)}`);
  }
}

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const f of files) {
    processFile(path.join(dir, f));
  }
}

for (const file of extraFiles) {
  if (fs.existsSync(file)) {
    processFile(file);
  }
}

console.log(`\nTotal files changed: ${changed}`);
