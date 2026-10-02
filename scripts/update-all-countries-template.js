const fs = require('fs');
const path = require('path');

// Directory containing country MDX files
const countriesDir = path.join(__dirname, '../src/content/countries');

// Read all country files
const countryFiles = fs.readdirSync(countriesDir).filter(file => file.endsWith('.mdx'));

console.log(`Found ${countryFiles.length} country files to process`);

// Template structure for each country
function generateCountryTemplate(countryId, countryName) {
  const capitalizedCountryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);
  
  return `---
title: "${capitalizedCountryName} - Путеводитель 2026 | Велес Вояж"
description: "Полный путеводитель по ${countryName} 2026: достопримечательности, культура, кухня, виза, безопасность, климат, отели, экскурсии, советы туристам от Велес Вояж"
image: "https://veles-voyage.ru/images/countries/${countryId}.jpg"
datePublished: "dynamic"
dateModified: "dynamic"
author: "Велес Вояж | Экспертная редакция"
wordCount: 8000
inLanguage: "ru-RU"
keywords: "путеводитель по ${countryName}, туризм в ${countryName}, достопримечательности ${countryName}, отдых в ${countryName}, ${countryName} 2026, путешествия в ${countryName}, виза в ${countryName}, безопасность в ${countryName}, климат ${countryName}, валюта ${countryName}, язык в ${countryName}, ${countryName} города, ${countryName} столица, что посмотреть в ${countryName}"
latitude: 0.0000
longitude: 0.0000
capital: "Столица"
continent: "Континент"
currency: "Валюта"
language: "Язык"
timezone: "Часовой пояс"
visaRequirements: false
schengenArea: false
vaccinations: ""
bestTimeToVisit: ""
estimatedCost: "100000"
seasons: "spring: March-May, summer: June-August, autumn: September-November, winter: December-February"
culture: ""
religion: ""
population: ""
area: ""
faqs: []
categories: "tourism, travel-guide, destinations, culture, history, geography, practical-info"
---

<WikiHero 
  src="https://images.unsplash.com/photo-placeholder" 
  alt="${capitalizedCountryName}" 
  title="${capitalizedCountryName} 2026" 
  subtitle="Путеводитель по ${countryName}"
/>

<SocialLinks />

<div className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
  **${capitalizedCountryName}** — краткое описание страны, её основные характеристики, столица, население и площадь.
</div>

<FeatureGrid>
  <FeatureItem icon="🏛️" title="Государство">
    Полное название государства и краткая характеристика.
  </FeatureItem>
  <FeatureItem icon="🏯" title="Памятники">
    Основные достопримечательности страны.
  </FeatureItem>
  <FeatureItem icon="🍚" title="Кухня">
    Традиционные блюда и кулинарные особенности.
  </FeatureItem>
  <FeatureItem icon="🎭" title="Культура">
    Культурные традиции и особенности.
  </FeatureItem>
</FeatureGrid>

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## 🌍 Географическое положение {#географическое-положение}

Краткое описание географического положения страны, границ, рельефа и климата.

### Климат и погода

Описание климата, сезонов и погодных условий.

> **Интересный факт**: Уникальная особенность страны.

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## 🎨 История и культура {#история-и-культура}

Краткий обзор истории и культуры страны.

### Язык и общение

Информация об официальных языках и полезные фразы.

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## 📅 Лучшее время для посещения {#лучшее-время-для-посещения}

Рекомендации по лучшему времени для посещения.

### Сезонные особенности:
- **Весна (Март-Май)**: Особенности весеннего сезона
- **Лето (Июнь-Август)**: Особенности летнего сезона
- **Осень (Сентябрь-Ноябрь)**: Особенности осеннего сезона
- **Зима (Декабрь-Февраль)**: Особенности зимнего сезона

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## 🎫 Виза и въездные требования {#виза-и-въездные-требования}

Информация о визовых требованиях и необходимых документах.

<MdxImage 
  src="https://images.unsplash.com/photo-placeholder" 
  alt="Документы для путешествия в ${capitalizedCountryName}" 
  caption="Виза и документы для посещения ${countryName}"
/>

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## ✈️ Транспорт {#транспорт}

### Международные перелеты
Основные аэропорты страны.

### Внутренний транспорт
Описание внутреннего транспорта.

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## 💰 Жилье и отели {#жилье-и-отели}

Информация о вариантах размещения.

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## 🍽️ Кухня и гастрономия {#кухня-и-гастрономия}

Традиционные блюда и кулинарные особенности.

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## 🏛️ Достопримечательности ${capitalizedCountryName} {#достопримечательности}

### 1. Основная достопримечательность
Описание первой важной достопримечательности.

### 2. Вторая достопримечательность
Описание второй важной достопримечательности.

## ⚠️ Безопасность {#безопасность}

Информация о безопасности и экстренных службах.

> **Важно**: Рекомендации по безопасности.

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## 🛍️ Шопинг и сувениры {#шопинг-и-сувениры}

Что можно купить в качестве сувениров.

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## ❓ Часто задаваемые вопросы {#часто-задаваемые-вопросы}

### Какие документы нужны для поездки в ${capitalizedCountryName}?
Ответ на первый FAQ.

### Сколько дней стоит провести в ${capitalizedCountryName}?
Ответ на второй FAQ.

### Можно ли использовать кредитные карты?
Ответ на третий FAQ.

### Как одеваться в ${capitalizedCountryName}?
Ответ на четвертый FAQ.

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## 🗺️ Города и регионы {#города-и-регионы}

### Столица
Описание столицы страны.

### Другой важный город
Описание другого значимого города.

## 🎭 Культура и традиции {#культурные-традиции}

Описание культурных традиций и обычаев.

### Праздники:
* Основной праздник (месяц)
* Еще один праздник (месяц)

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## 💡 Практические советы туристам {#практические-советы}

Полезные советы для туристов.

<hr className="my-8 border-gray-300 dark:border-gray-600" />

## 📝 Заключение {#заключение}

Заключение о стране и рекомендации для путешественников.

---

*Последнее обновление: {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' })} | Автор: Велес Вояж | Источники: официальные данные, путеводители, консульские рекомендации*
`;
}

// Process each country file
countryFiles.forEach((file, index) => {
  const countryId = path.basename(file, '.mdx');
  const countryName = countryId.replace(/-/g, ' ');
  
  console.log(`Processing ${index + 1}/${countryFiles.length}: ${countryId}`);
  
  try {
    // Generate new content based on template
    const newContent = generateCountryTemplate(countryId, countryName);
    
    // Write to file
    const filePath = path.join(countriesDir, file);
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    console.log(`✓ Updated ${file}`);
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log('All country files have been updated to the template structure!');