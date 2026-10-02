'use client';

import React from 'react';

interface MdxContentRendererProps {
  content: string;
  currentCountryId?: string | undefined;
}

/**
 * Рабочий рендерер MDX контента с поддержкой основных компонентов
 */
export function MdxContentRenderer({ content }: MdxContentRendererProps) {
  // Обрабатываем контент, заменяя MDX компоненты на HTML
  const processedContent = content
    .replace(/<WikiHero[^>]*\/>/g, '') // Удаляем Hero компонент
    .replace(/<SocialLinks\s*\/>/g, '') // Удаляем социальные ссылки
    .replace(/<div\s+id="[^"]*"\s*\/>/g, '') // Удаляем якоря
    .replace(
      /<CountryMap[^>]*\/>/g,
      `
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
        <div class="flex items-center">
          <span class="text-2xl mr-3">🗺️</span>
          <div>
            <p class="font-medium text-blue-800">Карта страны</p>
            <p class="text-sm text-blue-600">Интерактивная карта будет добавлена в следующем обновлении</p>
          </div>
        </div>
      </div>
    `
    )
    .replace(
      /<InteractiveMap[^>]*\/>/g,
      `
      <div class="bg-green-50 border border-green-200 rounded-lg p-6 my-6">
        <div class="flex items-center">
          <span class="text-2xl mr-3">📍</span>
          <div>
            <p class="font-medium text-green-800">Интерактивная карта</p>
            <p class="text-sm text-green-600">Карта с точками интереса будет добавлена позже</p>
          </div>
        </div>
      </div>
    `
    )
    .replace(
      /<MdxImage[^>]*\/>/g,
      `
      <div class="bg-purple-50 border border-purple-200 rounded-lg p-6 my-6">
        <div class="flex items-center">
          <span class="text-2xl mr-3">🖼️</span>
          <div>
            <p class="font-medium text-purple-800">Изображение</p>
            <p class="text-sm text-purple-600">Фотографии будут добавлены в следующем обновлении</p>
          </div>
        </div>
      </div>
    `
    )
    .replace(
      /<FeatureGrid[^>]*>([\s\S]*?)<\/FeatureGrid>/g,
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">$1</div>'
    )
    .replace(
      /<FeatureItem[^>]*>([\s\S]*?)<\/FeatureItem>/g,
      '<div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">$1</div>'
    )
    .replace(
      /<InfoBlock[^>]*type="([^"]*)"[^>]*>([\s\S]*?)<\/InfoBlock>/g,
      (_match, type, content) => {
        const bgColor = type === 'info' ? 'blue' : type === 'warning' ? 'yellow' : 'gray';
        const emoji = type === 'info' ? 'ℹ️' : type === 'warning' ? '⚠️' : '📝';
        return `
        <div class="bg-${bgColor}-50 border border-${bgColor}-200 rounded-lg p-6 my-6">
          <div class="font-semibold text-${bgColor}-800 mb-2">${emoji} ${(content.match(/title="([^"]*)"/) || [])[1] || ''}</div>
          <div class="text-${bgColor}-700">${content.replace(/<[^>]*>/g, '').trim()}</div>
        </div>
      `;
      }
    )
    .replace(
      /<PriceList[^>]*>([\s\S]*?)<\/PriceList>/g,
      '<div class="bg-gray-50 rounded-lg p-6 my-8">$1</div>'
    )
    .replace(
      /<PriceItem[^>]*>([\s\S]*?)<\/PriceItem>/g,
      '<div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">$1</div>'
    )
    .replace(/\{\{\{[^}]*\}\}\}/g, '') // Удаляем тройные фигурные скобки
    .replace(/\{[^}]*\}/g, ''); // Удаляем фигурные скобки с выражениями

  return (
    <div className="mdx-content-renderer">
      <div
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  );
}
