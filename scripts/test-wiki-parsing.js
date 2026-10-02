
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const countriesDir = path.join(process.cwd(), 'src', 'content', 'countries');

console.log('Countries Dir:', countriesDir);

if (!fs.existsSync(countriesDir)) {
    console.error('Directory does not exist!');
    process.exit(1);
}

const files = fs.readdirSync(countriesDir).filter(file => file.endsWith('.mdx'));
console.log(`Found ${files.length} MDX files.`);

let successCount = 0;
let failCount = 0;

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|\r|$)/;

files.forEach(file => {
    try {
        const filePath = path.join(countriesDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const match = content.trim().match(FRONTMATTER_RE);

        if (!match) {
            console.error(`[ERROR] No frontmatter found in ${file}`);
            failCount++;
            return;
        }

        const data = yaml.load(match[1]);

        if (!data.title) {
            console.warn(`[WARN] File ${file} is missing title.`);
        }

        successCount++;
    } catch (err) {
        console.error(`[ERROR] Failed to parse ${file}:`, err.message);
        failCount++;
    }
});

console.log(`Finished. Success: ${successCount}, Failed: ${failCount}`);
