const fs = require('fs');
const path = require('path');

const REPLACEMENTS = [
  // Quotes
  { from: /"Велес"/g, to: '«Велес»' },
  { from: /"велес"/g, to: '«велес»' },
  { from: /ООО "Велес"/g, to: 'ООО «Велес»' },
  { from: /ООО "велес"/g, to: 'ООО «велес»' },
  
  // RTA formatting
  { from: /№РТА/g, to: '№ РТА' },
  { from: /- РТА/g, to: '— № РТА' },
  { from: /— РТА/g, to: '— № РТА' },
  
  // Dashes
  { from: / - /g, to: ' — ' },
  
  // Addresses
  { from: /пр-т\. Керамиков/g, to: 'пр-кт Керамиков' },
  { from: /пр-т\. Московский/g, to: 'пр-кт Московский' },
  { from: /пр-т Керамиков/g, to: 'пр-кт Керамиков' },
  { from: /пр-т Московский/g, to: 'пр-кт Московский' },
];

function applyReplacements(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  for (const repl of REPLACEMENTS) {
    content = content.replace(repl.from, repl.to);
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'scripts') continue;
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.(tsx|ts|jsx|js|md|mdx|json)$/.test(entry.name)) {
      applyReplacements(full);
    }
  }
}

walk(path.join(__dirname, 'src'));
walk(path.join(__dirname, 'public'));

console.log('Sitewide replacements done');
