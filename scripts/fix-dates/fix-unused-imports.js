#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Скрипт для автоматического удаления неиспользуемых импортов
 */

const APP_DIR = path.join(__dirname, '../../src/app');

// Файлы для исправления
const filesToFix = [
  'tours/layout.tsx',
  'tours/page.tsx',
  'video-sitemap.ts',
  'visual-sitemap.ts',
  'providers-clean.tsx',
  'providers-simple.tsx',
  'wiki/[country]/[section]/page.tsx',
  'wiki/[country]/CountryNavigation.tsx',
  'wiki/[country]/page.tsx'
];

/**
 * Удаляет неиспользуемые импорты из содержимого файла
 */
function removeUnusedImports(content, filePath) {
  let modifiedContent = content;
  let changes = [];

  // Специальные правила для каждого файла
  if (filePath.includes('tours/layout.tsx')) {
    // Убираем неиспользуемый импорт Metadata
    if (content.includes("import { Metadata }") && !content.includes("export const metadata") && !content.includes(": Metadata")) {
      modifiedContent = modifiedContent.replace(/import \{ Metadata \} from 'next';\s*\n/, '');
      changes.push('Удален неиспользуемый импорт Metadata');
    }
  }

  if (filePath.includes('tours/page.tsx')) {
    // Убираем неиспользуемый импорт Link
    if (content.includes("import Link from 'next/link'") && !content.includes('<Link')) {
      modifiedContent = modifiedContent.replace(/import Link from 'next\/link';\s*\n/, '');
      changes.push('Удален неиспользуемый импорт Link');
    }

    // Убираем полностью неиспользуемые импорты heroicons
    if (content.includes("from '@heroicons/react/24/outline'") &&
        !content.includes('<StarIcon') && !content.includes('<MapPinIcon')) {
      modifiedContent = modifiedContent.replace(/import \{[^}]*\} from '@heroicons\/react\/24\/outline';\s*\n/, '');
      changes.push('Удален неиспользуемый импорт иконок heroicons');
    }

    // Убираем неиспользуемую переменную hreflang
    const hreflangMatch = modifiedContent.match(/(\s+)(\w+Hreflang)\s*$/gm);
    if (hreflangMatch) {
      hreflangMatch.forEach(match => {
        modifiedContent = modifiedContent.replace(match, '');
      });
      changes.push('Удалена неиспользуемая переменная hreflang');
    }
  }

  if (filePath.includes('video-sitemap.ts')) {
    // Убираем неиспользуемый импорт MetadataRoute
    if (content.includes("import { MetadataRoute }") && !content.includes(": MetadataRoute")) {
      modifiedContent = modifiedContent.replace(/import \{ MetadataRoute \} from 'next';\s*\n/, '');
      changes.push('Удален неиспользуемый импорт MetadataRoute');
    }
  }

  if (filePath.includes('visual-sitemap.ts')) {
    // Убираем неиспользуемый импорт MetadataRoute
    if (content.includes("import { MetadataRoute }") && !content.includes(": MetadataRoute")) {
      modifiedContent = modifiedContent.replace(/import \{ MetadataRoute \} from 'next';\s*\n/, '');
      changes.push('Удален неиспользуемый импорт MetadataRoute');
    }
  }

  if (filePath.includes('providers-clean.tsx')) {
    // Убираем неиспользуемый параметр error в getDerivedStateFromError
    modifiedContent = modifiedContent.replace(
      /static getDerivedStateFromError\(error: Error\)/,
      'static getDerivedStateFromError(_error: Error)'
    );

    // Убираем неиспользуемую переменную tonConfig
    if (content.includes('const tonConfig = {') && !content.includes('tonConfig.')) {
      modifiedContent = modifiedContent.replace(/const tonConfig = \{[^}]*\};\s*\n/, '');
      changes.push('Удалена неиспользуемая переменная tonConfig');
    }
  }

  if (filePath.includes('providers-simple.tsx')) {
    // Убираем неиспользуемый импорт useEffect
    if (content.includes("useEffect") && !content.includes("useEffect(")) {
      modifiedContent = modifiedContent.replace(/, useEffect/, '');
      modifiedContent = modifiedContent.replace(/useEffect, /, '');
      modifiedContent = modifiedContent.replace(/\{ useEffect \}/, '{}');
      changes.push('Удален неиспользуемый импорт useEffect');
    }
  }

  if (filePath.includes('wiki/[country]/[section]/page.tsx')) {
    // Заменяем неиспользуемые параметры на подчеркивание
    modifiedContent = modifiedContent.replace(
      /\{ country, section, content, sectionTitles \}/,
      '{ country, section, content: _content, sectionTitles: _sectionTitles }'
    );
    changes.push('Заменены неиспользуемые параметры на _content и _sectionTitles');
  }

  if (filePath.includes('wiki/[country]/CountryNavigation.tsx')) {
    // Заменяем неиспользуемые параметры деструктуризации
    modifiedContent = modifiedContent.replace(
      /const \{ country, activeSection \} = props;/,
      'const { country: _country, activeSection: _activeSection } = props;'
    );
    changes.push('Заменены неиспользуемые параметры в деструктуризации');
  }

  if (filePath.includes('wiki/[country]/page.tsx')) {
    // Убираем неиспользуемый импорт generateCountrySchemas
    if (content.includes('generateCountrySchemas') && !content.includes('generateCountrySchemas(')) {
      modifiedContent = modifiedContent.replace(/, generateCountrySchemas/, '');
      modifiedContent = modifiedContent.replace(/generateCountrySchemas, /, '');
      changes.push('Удален неиспользуемый импорт generateCountrySchemas');
    }

    // Убираем неиспользуемый импорт StructuredData
    if (content.includes("import StructuredData") && !content.includes('<StructuredData')) {
      modifiedContent = modifiedContent.replace(/import StructuredData[^;]*;\s*\n/, '');
      changes.push('Удален неиспользуемый импорт StructuredData');
    }
  }

  return { content: modifiedContent, changes };
}

/**
 * Обрабатывает отдельный файл
 */
function fixFile(filePath) {
  const fullPath = path.join(APP_DIR, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Файл не найден: ${filePath}`);
    return false;
  }

  const originalContent = fs.readFileSync(fullPath, 'utf8');
  const { content: modifiedContent, changes } = removeUnusedImports(originalContent, filePath);

  if (modifiedContent !== originalContent) {
    fs.writeFileSync(fullPath, modifiedContent);
    console.log(`✅ Исправлен файл: ${filePath}`);
    changes.forEach(change => console.log(`   - ${change}`));
    console.log('');
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
  console.log('🚀 Запуск удаления неиспользуемых импортов...\n');

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
  removeUnusedImports
};
