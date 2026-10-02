// Русские падежи для топонимов: упрощённые эвристики + словарь исключений

const specialPrepositional: Record<string, string> = {
  'Москва': 'Москве',
  'Санкт-Петербург': 'Санкт-Петербурге',
  'Нижний Новгород': 'Нижнем Новгороде',
  'Ростов-на-Дону': 'Ростове-на-Дону',
  'Набережные Челны': 'Набережных Челнах',
  'Комсомольск-на-Амуре': 'Комсомольске-на-Амуре',
  'Петропавловск-Камчатский': 'Петропавловске-Камчатском',
  'Орехово-Зуево': 'Орехово-Зуево',
  'Нарьян-Мар': 'Нарьян-Маре',
  'Сочи': 'Сочи',
  'Тверь': 'Твери',
  'Омск': 'Омске',
  'Псков': 'Пскове',
  'Казань': 'Казани',
  'Самара': 'Самаре',
  'Екатеринбург': 'Екатеринбурге',
  'Волгоград': 'Волгограде',
  'Новосибирск': 'Новосибирске',
  'Краснодар': 'Краснодаре',
  'Хабаровск': 'Хабаровске',
  'Тайга': 'Тайге'
};

const specialGenitive: Record<string, string> = {
  'Москва': 'Москвы',
  'Санкт-Петербург': 'Санкт-Петербурга',
  'Нижний Новгород': 'Нижнего Новгорода',
  'Ростов-на-Дону': 'Ростова-на-Дону',
  'Набережные Челны': 'Набережных Челнов',
  'Комсомольск-на-Амуре': 'Комсомольска-на-Амуре',
  'Петропавловск-Камчатский': 'Петропавловска-Камчатского',
  'Орехово-Зуево': 'Орехово-Зуево',
  'Нарьян-Мар': 'Нарьян-Мара',
  'Сочи': 'Сочи',
  'Тверь': 'Твери',
  'Омск': 'Омска',
  'Псков': 'Пскова',
  'Казань': 'Казани',
  'Самара': 'Самары',
  'Екатеринбург': 'Екатеринбурга',
  'Волгоград': 'Волгограда',
  'Новосибирск': 'Новосибирска',
  'Краснодар': 'Краснодара',
  'Хабаровск': 'Хабаровска',
  'Тайга': 'Тайги'
};

const specialDative: Record<string, string> = {
  'Москва': 'Москве',
  'Санкт-Петербург': 'Санкт-Петербургу',
  'Нижний Новгород': 'Нижнему Новгороду',
  'Ростов-на-Дону': 'Ростову-на-Дону',
  'Набережные Челны': 'Набережным Челнам',
  'Комсомольск-на-Амуре': 'Комсомольску-на-Амуре',
  'Петропавловск-Камчатский': 'Петропавловску-Камчатскому',
  'Орехово-Зуево': 'Орехово-Зуево',
  'Нарьян-Мар': 'Нарьян-Мару',
  'Сочи': 'Сочи',
  'Тверь': 'Твери',
  'Омск': 'Омску',
  'Псков': 'Пскову',
  'Казань': 'Казани',
  'Самара': 'Самаре',
  'Екатеринбург': 'Екатеринбургу',
  'Волгоград': 'Волгограду',
  'Новосибирск': 'Новосибирску',
  'Краснодар': 'Краснодару',
  'Хабаровск': 'Хабаровску',
  'Тайга': 'Тайге'
};

export function toPrepositional(name: string): string {
  const trimmed = name.trim();
  if (specialPrepositional[trimmed]) return specialPrepositional[trimmed];
  if (/^Республика\s+/i.test(trimmed)) {
    const rest = trimmed.replace(/^Республика\s+/i, '');
    const restInflected = rest.replace(/ия$/i, 'ии');
    return `Республике ${restInflected}`;
  }
  if (/край$/i.test(trimmed)) return trimmed.replace(/край$/i, 'крае');
  if (/область$/i.test(trimmed)) {
    return trimmed
      .replace(/ская\s+область$/i, 'ской области')
      .replace(/область$/i, 'области');
  }
  if (/автономный округ$/i.test(trimmed)) return trimmed.replace(/автономный округ$/i, 'автономном округе');
  if (/автономная область$/i.test(trimmed)) return trimmed.replace(/автономная область$/i, 'автономной области');
  if (/ия$/i.test(trimmed)) return trimmed.replace(/ия$/i, 'ии');
  if (/а$/i.test(trimmed)) return trimmed.replace(/а$/i, 'е');
  if (/я$/i.test(trimmed)) return trimmed.replace(/я$/i, 'е');
  if (/ь$/i.test(trimmed)) return trimmed.replace(/ь$/i, 'и');
  if (/й$/i.test(trimmed)) return trimmed.replace(/й$/i, 'е');
  if (/(ск|град|бург|польск|чск)$/i.test(trimmed)) return `${trimmed}е`;
  if (/[бвгджзйклмнпрстфхцчшщ]$/i.test(trimmed)) return `${trimmed}е`;
  return trimmed;
}

export function toGenitive(name: string): string {
  const trimmed = name.trim();
  if (specialGenitive[trimmed]) return specialGenitive[trimmed];
  if (/^Республика\s+/i.test(trimmed)) {
    const rest = trimmed.replace(/^Республика\s+/i, '');
    const restInflected = rest.replace(/ия$/i, 'ии');
    return `Республики ${restInflected}`;
  }
  if (/край$/i.test(trimmed)) return trimmed.replace(/край$/i, 'края');
  if (/область$/i.test(trimmed)) {
    return trimmed
      .replace(/ская\s+область$/i, 'ской области')
      .replace(/область$/i, 'области');
  }
  if (/автономный округ$/i.test(trimmed)) return trimmed.replace(/автономный округ$/i, 'автономного округа');
  if (/автономная область$/i.test(trimmed)) return trimmed.replace(/автономная область$/i, 'автономной области');
  if (/ия$/i.test(trimmed)) return trimmed.replace(/ия$/i, 'ии');
  if (/а$/i.test(trimmed)) return trimmed.replace(/а$/i, 'ы');
  if (/я$/i.test(trimmed)) return trimmed.replace(/я$/i, 'и');
  if (/ь$/i.test(trimmed)) return trimmed.replace(/ь$/i, 'я');
  if (/й$/i.test(trimmed)) return trimmed.replace(/й$/i, 'я');
  if (/(ск|град|бург|польск|чск)$/i.test(trimmed)) return `${trimmed}а`;
  if (/[бвгджзйклмнпрстфхцчшщ]$/i.test(trimmed)) return `${trimmed}а`;
  return trimmed;
}

export function toDative(name: string): string {
  const trimmed = name.trim();
  if (specialDative[trimmed]) return specialDative[trimmed];
  if (/^Республика\s+/i.test(trimmed)) {
    const rest = trimmed.replace(/^Республика\s+/i, '');
    const restInflected = rest.replace(/ия$/i, 'ии');
    return `Республике ${restInflected}`;
  }
  if (/край$/i.test(trimmed)) return trimmed.replace(/край$/i, 'краю');
  if (/область$/i.test(trimmed)) {
    return trimmed
      .replace(/ская\s+область$/i, 'ской области')
      .replace(/область$/i, 'области');
  }
  if (/автономный округ$/i.test(trimmed)) return trimmed.replace(/автономный округ$/i, 'автономному округу');
  if (/автономная область$/i.test(trimmed)) return trimmed.replace(/автономная область$/i, 'автономной области');
  if (/ия$/i.test(trimmed)) return trimmed.replace(/ия$/i, 'ии');
  if (/а$/i.test(trimmed)) return trimmed.replace(/а$/i, 'е');
  if (/я$/i.test(trimmed)) return trimmed.replace(/я$/i, 'е');
  if (/ь$/i.test(trimmed)) return trimmed.replace(/ь$/i, 'и');
  if (/й$/i.test(trimmed)) return trimmed.replace(/й$/i, 'ю');
  if (/(ск|град|бург|польск|чск)$/i.test(trimmed)) return `${trimmed}у`;
  if (/[бвгджзйклмнпрстфхцчшщ]$/i.test(trimmed)) return `${trimmed}у`;
  return trimmed;
}