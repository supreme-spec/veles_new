#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Скрипт для автоматического исправления проблем с датами в метаданных
 * Заменяет небезопасные вызовы new Date().toISOString().split('T')[0]
 * на безопасные вызовы formatMetadataDates()
 */

const APP_DIR = path.join(__dirname, '../../src/app');

// Паттерны для поиска и замены
const PATTERNS = {
  // Небезопасный паттерн получения даты
  unsafeDate: /new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\]/g,

  // Паттерн для setDates функций
  setDatesCall: /set(\w+)Dates\(\s*\{\s*published:\s*new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\],\s*modified:\s*new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\]\s*\}\s*\)/g,

  // Неиспользуемые импорты
  unusedImports: /CalendarIcon,?\s*|,?\s*CalendarIcon|\s*IdentificationIcon,?|,?\s*IdentificationIcon/g,

  // Неиспользуемые hreflang переменные
  unusedHreflang: /^\s*\w+Hreflang\s*$/gm
};

// Файлы для исправления
const filesToFix = [
  'reviews/page.tsx',
  'support/page.tsx',
  'tours/africa/page.tsx',
  'tours/america/page.tsx',
  'tours/asia/page.tsx',
  'tours/cruise/page.tsx',
  'tours/europe/page.tsx',
  'tours/extreme/page.tsx',
  'values/page.tsx',
  'wiki/places/layout.tsx'
];

/**
 * Проверяет, нужно ли добавить импорт formatMetadataDates
 */
function needsDateUtilImport(content) {
  return content.includes('formatMetadataDates') &&
         !content.includes("import { formatMetadataDates }") &&
         !content.includes("formatMetadataDates } from '@/shared/utils'");
}

/**
 * Добавляет импорт formatMetadataDates
 */
function addDateUtilImport(content) {
  // Ищем существующий импорт из @/shared/utils
  const existingUtilImport = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]@\/shared\/utils['"]/);

  if (existingUtilImport) {
    // Добавляем к существующему импорту
    const imports = existingUtilImport[1].trim();
    const newImports = imports + ', formatMetadataDates';
    return content.replace(
      existingUtilImport[0],
      `import { ${newImports} } from '@/shared/utils'`
    );
  }

  // Добавляем новый импорт после импорта generateMetadata
  const generateMetadataImport = content.match(/import\s+\{[^}]*generateMetadata[^}]*\}[^;]*;/);
  if (generateMetadataImport) {
    return content.replace(
      generateMetadataImport[0],
      generateMetadataImport[0] + '\nimport { formatMetadataDates } from \'@/shared/utils\';'
    );
  }

  return content;
}

/**
 * Убирает неиспользуемые импорты иконок
 */
function removeUnusedIconImports(content) {
  // Убираем CalendarIcon и IdentificationIcon из импортов
  content = content.replace(/,\s*CalendarIcon/g, '');
  content = content.replace(/CalendarIcon,\s*/g, '');
  content = content.replace(/,\s*IdentificationIcon/g, '');
  content = content.replace(/IdentificationIcon,\s*/g, '');

  // Убираем лишние запятые
  content = content.replace(/,\s*,/g, ',');
  content = content.replace(/{\s*,/g, '{');
  content = content.replace(/,\s*}/g, '}');

  return content;
}

/**
 * Убирает неиспользуемые hreflang переменные
 */
function removeUnusedHreflangVariables(content) {
  // Убираем неиспользуемые hreflang переменные из деструктуризации
  const lines = content.split('\n');
  const filteredLines = lines.filter(line => {
    // Убираем строки с неиспользуемыми hreflang переменными
    return !line.trim().match(/^\w+Hreflang\s*$/);
  });

  return filteredLines.join('\n');
}

/**
 * Исправляет вызовы setDates функций
 */
function fixSetDatesCalls(content) {
  return content.replace(PATTERNS.setDatesCall, 'set$1Dates(formatMetadataDates())');
}

/**
 * Исправляет отдельные вызовы небезопасных дат
 */
function fixUnsafeDates(content) {
  return content.replace(PATTERNS.unsafeDate, 'getCurrentDateString()');
}

/**
 * Основная функция исправления файла
 */
function fixFile(filePath) {
  const fullPath = path.join(APP_DIR, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Файл не найден: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  // Сохраняем оригинальный контент для сравнения
  const originalContent = content;

  // Исправляем вызовы setDates функций
  const newContent = fixSetDatesCalls(content);
  if (newContent !== content) {
    content = newContent;
    changed = true;
    console.log(`✅ Исправлены setDates вызовы в ${filePath}`);
  }

  // Исправляем отдельные небезопасные даты
  const fixedDates = fixUnsafeDates(content);
  if (fixedDates !== content) {
    content = fixedDates;
    changed = true;
    console.log(`✅ Исправлены небезопасные даты в ${filePath}`);
  }

  // Убираем неиспользуемые импорты иконок
  const withoutUnusedIcons = removeUnusedIconImports(content);
  if (withoutUnusedIcons !== content) {
    content = withoutUnusedIcons;
    changed = true;
    console.log(`✅ Убраны неиспользуемые импорты иконок в ${filePath}`);
  }

  // Убираем неиспользуемые hreflang переменные
  const withoutUnusedHreflang = removeUnusedHreflangVariables(content);
  if (withoutUnusedHreflang !== content) {
    content = withoutUnusedHreflang;
    changed = true;
    console.log(`✅ Убраны неиспользуемые hreflang переменные в ${filePath}`);
  }

  // Добавляем импорт formatMetadataDates если нужно
  if (needsDateUtilImport(content)) {
    content = addDateUtilImport(content);
    changed = true;
    console.log(`✅ Добавлен импорт formatMetadataDates в ${filePath}`);
  }

  // Сохраняем файл если были изменения
  if (changed) {
    fs.writeFileSync(fullPath, content);
    console.log(`💾 Сохранён файл: ${filePath}\n`);
    return true;
  } else {
    console.log(`➡️  Файл не изменён: ${filePath}\n`);
    return false;
  }
}

/**
 * Основная функция
 */
function main() {
  console.log('🚀 Запуск исправления дат в метаданных...\n');

  let totalFixed = 0;
  let totalProcessed = 0;

  for (const file of filesToFix) {
    totalProcessed++;
    if (fixFile(file)) {
      totalFixed++;
    }
  }

  console.log('📊 Статистика:');
  console.log(`   Обработано файлов: ${totalProcessed}`);
  console.log(`   Исправлено файлов: ${totalFixed}`);
  console.log(`   Без изменений: ${totalProcessed - totalFixed}`);

  if (totalFixed > 0) {
    console.log('\n✨ Исправление завершено! Запустите TypeScript проверку для верификации.');
  } else {
    console.log('\n✅ Все файлы уже актуальны!');
  }
}

// Запускаем скрипт
if (require.main === module) {
  main();
}

module.exports = {
  fixFile,
  fixSetDatesCalls,
  fixUnsafeDates,
  removeUnusedIconImports,
  removeUnusedHreflangVariables,
  addDateUtilImport
};
