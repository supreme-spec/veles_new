const fs = require('fs');
const path = require('path');

const countriesDir = path.join(__dirname, '..', 'src', 'content', 'countries');
const files = fs.readdirSync(countriesDir).filter(file => file.endsWith('.mdx'));

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(countriesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // A more robust regex to find the trailing line regardless of its exact position
  const trailingLineRegex = /^\s*\*Последнее обновление:.*?$/gm;

  if (trailingLineRegex.test(content)) {
    const newContent = content.replace(trailingLineRegex, '').trim();
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✓ Fixed trailing content in: ${file}`);
    updatedCount++;
  }
});

console.log(`\n✅ Found and fixed ${updatedCount} files.`);
