import fs from 'fs';
import path from 'path';

const countriesDir = path.join(process.cwd(), 'src', 'content', 'countries');
const files = fs.readdirSync(countriesDir).filter(f => f.endsWith('.mdx'));

let totalFixed = 0;

for (const file of files) {
  const filePath = path.join(countriesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Process line by line to avoid multi-line p tag issues
  const lines = content.split('\n');
  const newLines = lines.map(line => {
    if (!/<p>.*\*\*.*\*\*/.test(line)) return line;
    
    // Replace **text** with <strong>text</strong> inside p tags
    const newLine = line.replace(/(<p[^>]*>)(.*?)(<\/p>)/g, (match, open, inner, close) => {
      if (!inner.includes('**')) return match;
      const fixed = inner.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      if (fixed !== inner) changed = true;
      return open + fixed + close;
    });
    
    if (newLine !== line) changed = true;
    return newLine;
  });

  if (changed) {
    fs.writeFileSync(filePath, newLines.join('\n'));
    totalFixed++;
    console.log(`Fixed: ${file}`);
  }
}

console.log(`\nTotal files fixed: ${totalFixed}`);
