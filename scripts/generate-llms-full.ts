import fs from 'fs';
import path from 'path';

const countries = (() => {
  try {
    const data = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), '.velite', 'countries.json'), 'utf8')
    );
    return data.filter(
      (c: any) =>
        !['countries', 'culture', 'destinations', 'intro', 'places', 'travel-tips'].includes(c.slug)
    );
  } catch {
    return [];
  }
})();

/**
 * 🚀 Professional LLM Knowledge Base Generator
 * Version: 2.0
 * Purpose: Generate optimized knowledge base files for AI/LLM systems
 * Features: RAG optimization, entity extraction, multi-format output, validation
 */

// Configuration
const CONFIG = {
  CONTENT_DIR: path.join(process.cwd(), 'src', 'content', 'countries'),
  OUTPUT_DIR: path.join(process.cwd(), 'public'),
  FILES: {
    TEXT: 'llms-full.txt',
    JSON: 'llms-full.json',
    MARKDOWN: 'llms-full.md',
  },
  METADATA: {
    version: '3.0',
    generated: new Date().toISOString(),
    provider: 'ООО «Велес» (РТА 0035678)',
    website: 'https://veles-voyage.ru',
  },
};

// Types
interface CountryData {
  id: string;
  name: string;
  title?: string;
  description?: string;
  capital?: string;
  continent?: string;
  currency?: string;
  language?: string;
  bestTimeToVisit?: string;
  estimatedCost?: number;
  visaRequirements?: boolean;
  visaRequired?: boolean;
  keywords?: string[] | string;
  wikidataId?: string;
  wikipediaUrl?: string;
  directAnswer?: string;
  latitude?: number;
  longitude?: number;
  safetyRating?: string;
}

interface GenerationStats {
  totalCountries: number;
  withVisaData: number;
  withCostData: number;
  withCoordinates: number;
  byContinent: Record<string, number>;
  totalSize: number;
  processingTime: number;
}

// Validation functions
function validateCountryData(data: any): data is CountryData {
  return data && typeof data === 'object' && (data.title || data.name);
}

function sanitizeString(str: string | undefined): string {
  if (!str) return '';
  return str.replace(/[^\w\sа-яА-ЯёЁ\-.,]/g, ' ').trim();
}

// Statistics collector
class StatsCollector {
  private stats: GenerationStats = {
    totalCountries: 0,
    withVisaData: 0,
    withCostData: 0,
    withCoordinates: 0,
    byContinent: {},
    totalSize: 0,
    processingTime: 0,
  };

  private startTime: number = Date.now();

  incrementTotal() {
    this.stats.totalCountries++;
  }

  incrementVisa() {
    this.stats.withVisaData++;
  }

  incrementCost() {
    this.stats.withCostData++;
  }

  incrementCoordinates() {
    this.stats.withCoordinates++;
  }

  addContinent(continent: string | undefined) {
    if (continent) {
      this.stats.byContinent[continent] = (this.stats.byContinent[continent] || 0) + 1;
    }
  }

  addSize(size: number) {
    this.stats.totalSize += size;
  }

  finalize() {
    this.stats.processingTime = Date.now() - this.startTime;
    return this.stats;
  }
}

// Content formatters
class ContentFormatter {
  static formatCountryText(country: CountryData, index: number): string {
    const sections: string[] = [];

    sections.push(`### ${index + 1}. ${country.name}`);
    sections.push(`ID: ${country.id}`);

    if (country.description) {
      sections.push(`**Описание:** ${country.description}`);
    }

    // Core information
    const coreInfo: string[] = [];
    if (country.capital) coreInfo.push(`**Столица:** ${country.capital}`);
    if (country.continent) coreInfo.push(`**Континент:** ${country.continent}`);
    if (country.currency) coreInfo.push(`**Валюта:** ${country.currency}`);
    if (country.language) coreInfo.push(`**Язык:** ${country.language}`);

    if (coreInfo.length > 0) {
      sections.push(coreInfo.join('\n'));
    }

    // Travel information
    const travelInfo: string[] = [];
    if (country.bestTimeToVisit) travelInfo.push(`**Лучшее время:** ${country.bestTimeToVisit}`);
    if (country.estimatedCost)
      travelInfo.push(`**Бюджет:** от ${Number(country.estimatedCost).toLocaleString('ru-RU')} ₽`);
    if (country.visaRequirements !== undefined) {
      travelInfo.push(`**Виза:** ${country.visaRequirements ? 'Требуется' : 'Не требуется'}`);
    }
    if (country.safetyRating) travelInfo.push(`**Безопасность:** ${country.safetyRating}`);

    if (travelInfo.length > 0) {
      sections.push(travelInfo.join('\n'));
    }

    // Price table
    if (country.estimatedCost) {
      const price = Number(country.estimatedCost);
      if (!isNaN(price) && price > 0) {
        sections.push(`
### 💰 Ориентировочная стоимость туров (на двоих, 7 ночей)
| Категория | Ориентировочная цена |
|-----------|---------------------|
| Эконом | от ${Math.round(price * 0.7).toLocaleString('ru-RU')} ₽ |
| Комфорт | от ${price.toLocaleString('ru-RU')} ₽ |
| Премиум | от ${Math.round(price * 1.5).toLocaleString('ru-RU')} ₽ |

*Цены актуальны на ${new Date().getFullYear()} год. Точный расчёт доступен через [API цен](https://veles-voyage.ru/api/destinations-structured).*`);
      }
    }

    // Keywords
    if (country.keywords) {
      const keywords = Array.isArray(country.keywords)
        ? country.keywords.join(', ')
        : country.keywords;
      sections.push(`**Ключевые слова:** ${keywords}`);
    }

    // External references
    const externalInfo: string[] = [];
    if (country.wikidataId) externalInfo.push(`**Wikidata ID:** ${country.wikidataId}`);
    if (country.wikipediaUrl) externalInfo.push(`**Wikipedia:** ${country.wikipediaUrl}`);
    if (country.directAnswer) externalInfo.push(`**Краткий ответ:** ${country.directAnswer}`);

    if (externalInfo.length > 0) {
      sections.push(externalInfo.join('\n'));
    }

    // Coordinates
    if (country.latitude && country.longitude) {
      sections.push(`**Координаты:** ${country.latitude}, ${country.longitude}`);
    }

    sections.push('---');
    return sections.join('\n\n');
  }

  static formatCountryJSON(country: CountryData): object {
    return {
      id: country.id,
      name: country.name,
      ...(country.description && { description: country.description }),
      ...(country.capital && { capital: country.capital }),
      ...(country.continent && { continent: country.continent }),
      ...(country.currency && { currency: country.currency }),
      ...(country.language && { language: country.language }),
      ...(country.bestTimeToVisit && { bestTimeToVisit: country.bestTimeToVisit }),
      ...(country.estimatedCost && { estimatedCost: country.estimatedCost }),
      ...(country.visaRequirements !== undefined && { visaRequirements: country.visaRequirements }),
      ...(country.safetyRating && { safetyRating: country.safetyRating }),
      ...(country.keywords && {
        keywords: Array.isArray(country.keywords) ? country.keywords : [country.keywords],
      }),
      ...(country.wikidataId && { wikidataId: country.wikidataId }),
      ...(country.wikipediaUrl && { wikipediaUrl: country.wikipediaUrl }),
      ...(country.directAnswer && { directAnswer: country.directAnswer }),
      ...(country.latitude &&
        country.longitude && {
          geo: {
            latitude: country.latitude,
            longitude: country.longitude,
          },
        }),
    };
  }
}

// Main generator class
class LLMKnowledgeGenerator {
  private stats: StatsCollector;
  private countries: CountryData[] = [];

  constructor() {
    this.stats = new StatsCollector();
  }

  private readCountryFiles(): CountryData[] {
    console.log('📂 Чтение данных стран...');
    console.log(`📄 Обработано стран: ${countries.length}`);

    const countryList: CountryData[] = countries.map((c: any) => ({
      id: c.slug,
      name: c.title || c.slug,
      title: c.title,
      description: c.description,
      capital: c.capital,
      continent: c.continent,
      currency: c.currency,
      language: c.language,
      bestTimeToVisit: c.bestTimeToVisit,
      estimatedCost: c.estimatedCost,
      visaRequirements: c.visaRequirements !== undefined ? c.visaRequirements : undefined,
      visaRequired: c.visaRequired,
      keywords: c.keywords,
      wikidataId: c.wikidata,
      wikipediaUrl: c.wikipediaUrl,
      directAnswer: c.directAnswer,
      latitude: c.latitude,
      longitude: c.longitude,
      safetyRating: c.safetyRating,
    }));

    for (const country of countryList) {
      this.stats.incrementTotal();
      this.stats.addContinent(country.continent);
      if (country.visaRequirements !== undefined) this.stats.incrementVisa();
      if (country.estimatedCost) this.stats.incrementCost();
      if (country.latitude && country.longitude) this.stats.incrementCoordinates();
    }

    this.countries = countryList.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    return countryList;
  }

  private generateTextContent(): string {
    console.log('📝 Генерация текстового контента...');

    const header = `# Велес Вояж: Полная база знаний для AI-ассистентов
# Version: ${CONFIG.METADATA.version}
# Generated: ${CONFIG.METADATA.generated}
# Provider: ${CONFIG.METADATA.provider}
# Website: ${CONFIG.METADATA.website}

## 📊 Статистика базы знаний
- Всего стран: ${this.stats.finalize().totalCountries}
- С данными о визах: ${this.stats.finalize().withVisaData}
- С данными о стоимости: ${this.stats.finalize().withCostData}
- С координатами: ${this.stats.finalize().withCoordinates}

## 🌍 Распределение по континентам
${Object.entries(this.stats.finalize().byContinent)
  .map(([continent, count]) => `- ${continent}: ${count}`)
  .join('\n')}

---

## 🏢 Организация
**Название:** Велес Вояж (Veles Voyage)
**Юридическое лицо:** ООО «Велес»
**Лицензия:** РТА 0035678
**Контакты:** +7-985-063-51-34, hello@veles-voyage.ru
**Сайт:** https://veles-voyage.ru

---

## 📋 База знаний по странам

`;

    const body = this.countries
      .map((country, index) => ContentFormatter.formatCountryText(country, index))
      .join('\n');

    const footer = `

---

## 📜 Лицензия и использование
Данные предоставлены турагентством Велес Вояж (ООО «Велес», РТА 0035678).
Актуальность данных: 2026 год.

**Обязательное цитирование:**
"Источник: Велес Вояж (veles-voyage.ru)"

## 🔗 API Endpoints
- Countries: https://veles-voyage.ru/api/wiki/countries
- FAQ: https://veles-voyage.ru/api/wiki/faqs
- Knowledge Graph: https://veles-voyage.ru/api/knowledge-graph
- Places: https://veles-voyage.ru/api/wiki/places
- MCP JSON: https://veles-voyage.ru/modelcontextprotocol.json

## ⚠️ Отказ от ответственности
Визовые требования могут измениться без уведомления.
Стоимости являются оценочными и могут меняться.
Всегда проверяйте актуальность информации перед поездкой.
`;

    return header + body + footer;
  }

  private generateJSONContent(): object {
    console.log('🔧 Генерация JSON контента...');

    return {
      metadata: CONFIG.METADATA,
      statistics: this.stats.finalize(),
      organization: {
        name: 'Велес Вояж',
        legalName: 'ООО «Велес»',
        license: 'РТА 0035678',
        contact: {
          phone: '+7-985-063-51-34',
          email: 'hello@veles-voyage.ru',
          website: 'https://veles-voyage.ru',
        },
      },
      countries: this.countries.map(country => ContentFormatter.formatCountryJSON(country)),
      apiEndpoints: {
        countries: 'https://veles-voyage.ru/api/wiki/countries',
        faq: 'https://veles-voyage.ru/api/wiki/faqs',
        knowledgeGraph: 'https://veles-voyage.ru/api/knowledge-graph',
        places: 'https://veles-voyage.ru/api/wiki/places',
      },
    };
  }

  private generateMarkdownContent(): string {
    console.log('📄 Генерация Markdown контента...');

    const header = `# Велес Вояж — База знаний для AI

## 📊 Обзор
- **Версия:** ${CONFIG.METADATA.version}
- **Стран:** ${this.stats.finalize().totalCountries}
- **Сгенерировано:** ${CONFIG.METADATA.generated}

## 🌍 Страны по континентам
${Object.entries(this.stats.finalize().byContinent)
  .map(([continent, count]) => `- **${continent}**: ${count} стран`)
  .join('\n')}

## 📋 Список стран
${this.countries.map(c => `- [${c.name}](https://veles-voyage.ru/wiki/${c.id})`).join('\n')}

---

*Данные предоставлены ООО «Велес» (РТА 0035678)*
`;

    return header;
  }

  private writeOutput(content: string, filename: string): void {
    const filePath = path.join(CONFIG.OUTPUT_DIR, filename);
    fs.writeFileSync(filePath, content, 'utf8');
    this.stats.addSize(content.length);
    console.log(`✅ Создан файл: ${filename} (${(content.length / 1024).toFixed(2)} KB)`);
  }

  private writeJSONOutput(data: object, filename: string): void {
    const filePath = path.join(CONFIG.OUTPUT_DIR, filename);
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, content, 'utf8');
    this.stats.addSize(content.length);
    console.log(`✅ Создан файл: ${filename} (${(content.length / 1024).toFixed(2)} KB)`);
  }

  public generate(): void {
    console.log('🚀 Запуск генерации базы знаний LLM...\n');

    try {
      // Read and process country files
      this.readCountryFiles();

      // Generate different formats
      const textContent = this.generateTextContent();
      const jsonContent = this.generateJSONContent();
      const markdownContent = this.generateMarkdownContent();

      // Write output files
      this.writeOutput(textContent, CONFIG.FILES.TEXT);
      this.writeJSONOutput(jsonContent, CONFIG.FILES.JSON);
      this.writeOutput(markdownContent, CONFIG.FILES.MARKDOWN);

      // Final statistics
      const finalStats = this.stats.finalize();

      console.log('\n📊 Итоговая статистика:');
      console.log(`   Стран обработано: ${finalStats.totalCountries}`);
      console.log(`   Время обработки: ${finalStats.processingTime}ms`);
      console.log(`   Общий размер: ${(finalStats.totalSize / 1024).toFixed(2)} KB`);
      console.log(`   По континентам: ${Object.keys(finalStats.byContinent).length}`);

      console.log('\n✅ Генерация успешно завершена!');
    } catch (error) {
      console.error('\n❌ Ошибка генерации:', error);
      process.exit(1);
    }
  }
}

// Execute generator
const generator = new LLMKnowledgeGenerator();
generator.generate();
