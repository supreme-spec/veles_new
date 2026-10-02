/**
 * Definitions Schema Generator for SEO
 * Creates structured definitions for travel-related terms
 */

export interface DefinitionTerm {
  name: string;
  description: string;
  category: string;
  url?: string;
}

/**
 * Generate DefinedTermSet Schema for travel terminology
 * This helps AI systems understand travel-specific terms
 */
export function generateDefinitionsSchema(terms: DefinitionTerm[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Туристическая терминология",
    "description": "Словарь терминов и определений для путешествий",
    "hasDefinedTerm": terms.map((term, index) => ({
      "@type": "DefinedTerm",
      "@id": `#term-${index}`,
      "termCode": term.name,
      "name": term.name,
      "description": term.description,
      "inDefinedTermSet": term.category,
      ...(term.url && { "url": term.url })
    }))
  };
}

/**
 * Common travel definitions for the site
 */
export const travelDefinitions: DefinitionTerm[] = [
  {
    name: "Виза",
    description: "Разрешение на въезд в иностранное государство, выдаваемое консульскими учреждениями. Может быть визовой, электронной или оформляться по прилете.",
    category: "Документы"
  },
  {
    name: "Тур всё включено",
    description: "Тип туристического пакета, включающий проживание, питание, трансфер и развлечения по фиксированной цене. Популярен в Турции, Египте и других курортных странах.",
    category: "Типы туров"
  },
  {
    name: "Морской круиз",
    description: "Путешествие на круизном лайнере с посещением нескольких портов. Включает проживание на борту, питание и развлекательную программу.",
    category: "Типы туров"
  },
  {
    name: "Шенгенская виза",
    description: "Виза, дающая право на посещение стран Шенгенской зоны. Действительна для 26 европейских стран, выдается на срок до 90 дней в течение 180 дней.",
    category: "Документы"
  },
  {
    name: "Страховка",
    description: "Медицинская или комплексная страховка, покрывающая расходы на лечение, эвакуацию и другие риски во время путешествия. Обязательна для многих стран.",
    category: "Документы"
  },
  {
    name: "Трансфер",
    description: "Трансфер пассажиров из аэропорта/вокзала в отель и обратно. Может быть включен в стоимость тура или оплачиваться отдельно.",
    category: "Услуги"
  },
  {
    name: "Всесезонный курорт",
    description: "Место, подходящее для посещения в любое время года благодаря климатическим условиям и разнообразию развлечений.",
    category: "Типы мест"
  },
  {
    name: "Безвизовый въезд",
    description: "Возможность посещения страны без оформления визы. Обычно ограничена по времени пребывания (обычно 30-90 дней).",
    category: "Документы"
  },
  {
    name: "Электронная виза",
    description: "Виза, оформляемая онлайн через официальные государственные порталы. Не требует посещения консульства.",
    category: "Документы"
  },
  {
    name: "Индивидуальный тур",
    description: "Персонально составленный маршрут под интересы и бюджет туриста. Включает индивидуальную программу, трансфер и сопровождение.",
    category: "Типы туров"
  }
];

/**
 * Generate country-specific definitions
 */
export function generateCountryDefinitions(_countryName: string, countrySpecificTerms: DefinitionTerm[] = []): object {
  const baseTerms = travelDefinitions.filter(term => 
    term.category === "Документы" || term.category === "Услуги"
  );
  
  return generateDefinitionsSchema([...baseTerms, ...countrySpecificTerms]);
}
