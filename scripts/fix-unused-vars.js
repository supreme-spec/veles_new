#!/usr/bin/env node

/**
 * Script to automatically fix unused imports and variables in TypeScript files
 * Removes common TS6133 errors
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get TypeScript errors
function getTypeScriptErrors() {
  try {
    execSync('npm run type-check', { encoding: 'utf8', stdio: 'pipe' });
    return [];
  } catch (error) {
    return error.stdout || error.stderr || '';
  }
}

// Parse TS6133 errors from output
function parseUnusedErrors(output) {
  const errors = [];
  const lines = output.split('\n');

  for (const line of lines) {
    // Match: src/path/file.tsx(12,10): error TS6133: 'varName' is declared but its value is never read.
    const match = line.match(/^(.+?)\((\d+),(\d+)\): error TS6133: '(.+?)' is declared but its value is never read/);
    if (match) {
      const [, filePath, lineNum, colNum, varName] = match;
      errors.push({
        filePath: filePath.replace(/\\/g, '/'),
        lineNum: parseInt(lineNum),
        colNum: parseInt(colNum),
        varName,
      });
    }
  }

  return errors;
}

// Remove unused import from a line
function removeUnusedImport(line, varName) {
  // Case 1: import { A, B, C } from 'module'
  const namedImportMatch = line.match(/^(\s*import\s+{)([^}]+)(}\s+from\s+['"][^'"]+['"];?\s*)$/);
  if (namedImportMatch) {
    const [, prefix, imports, suffix] = namedImportMatch;
    const importList = imports.split(',').map(i => i.trim()).filter(i => {
      const importName = i.replace(/\s+as\s+.+$/, '').trim();
      return importName !== varName;
    });

    if (importList.length === 0) {
      return null; // Remove entire line
    }
    return `${prefix} ${importList.join(', ')} ${suffix}`;
  }

  // Case 2: import varName from 'module'
  const defaultImportMatch = line.match(/^(\s*import\s+)(\w+)(\s+from\s+['"][^'"]+['"];?\s*)$/);
  if (defaultImportMatch && defaultImportMatch[2] === varName) {
    return null; // Remove entire line
  }

  // Case 3: const { a, b, c } = something
  const destructMatch = line.match(/^(\s*const\s+{)([^}]+)(}\s*=.+)$/);
  if (destructMatch) {
    const [, prefix, vars, suffix] = destructMatch;
    const varList = vars.split(',').map(v => v.trim()).filter(v => {
      const varPart = v.split(':')[0].trim();
      return varPart !== varName;
    });

    if (varList.length === 0) {
      return null; // Remove entire line
    }
    return `${prefix} ${varList.join(', ')} ${suffix}`;
  }

  return line;
}

// Process a single file
function processFile(filePath, unusedVars) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  let modified = false;

  // Sort by line number descending to avoid line number shifts
  const sortedVars = unusedVars.sort((a, b) => b.lineNum - a.lineNum);

  for (const { lineNum, varName } of sortedVars) {
    const lineIndex = lineNum - 1;
    if (lineIndex < 0 || lineIndex >= lines.length) continue;

    const originalLine = lines[lineIndex];
    const newLine = removeUnusedImport(originalLine, varName);

    if (newLine === null) {
      // Remove line
      lines.splice(lineIndex, 1);
      console.log(`  ✓ Removed line ${lineNum}: ${varName}`);
      modified = true;
    } else if (newLine !== originalLine) {
      // Update line
      lines[lineIndex] = newLine;
      console.log(`  ✓ Updated line ${lineNum}: removed ${varName}`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');
    return true;
  }

  return false;
}

// Main execution
function main() {
  console.log('🔍 Analyzing TypeScript errors...\n');

  const output = getTypeScriptErrors();
  const errors = parseUnusedErrors(output);

  if (errors.length === 0) {
    console.log('✅ No unused variable errors found!');
    return;
  }

  console.log(`Found ${errors.length} unused variable/import errors\n`);

  // Group by file
  const fileGroups = {};
  for (const error of errors) {
    if (!fileGroups[error.filePath]) {
      fileGroups[error.filePath] = [];
    }
    fileGroups[error.filePath].push(error);
  }

  let filesProcessed = 0;
  let totalFixed = 0;

  for (const [filePath, fileErrors] of Object.entries(fileGroups)) {
    console.log(`\n📝 Processing: ${filePath}`);
    const fixed = processFile(filePath, fileErrors);
    if (fixed) {
      filesProcessed++;
      totalFixed += fileErrors.length;
    }
  }

  console.log(`\n✨ Complete! Fixed ${totalFixed} errors in ${filesProcessed} files.`);
  console.log('\n💡 Run "npm run type-check" to verify the changes.');
}

main();
