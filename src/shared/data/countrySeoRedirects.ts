// Редиректы для обратной совместимости старых URL стран
export const countrySeoRedirects: Record<string, string> = {
  // Старые англоязычные ID → новые SEO-friendly ID на русском
  'spain': 'ispaniya-gid',
  'greece': 'gretsiya-gid',
  'netherlands': 'niderlandy-gid',
  'poland': 'polsha-gid',
  'austria': 'avstriya-gid',
  'france': 'frantsiya-gid',
  'italy': 'italiya-gid',
  'turkey': 'turtsiya-gid',
  'thailand': 'tailand-gid',
  'germany': 'germaniya-gid',
  'japan': 'yaponiya-gid',
  'south-korea': 'uzhnaya-koreya-gid',
  'vietnam': 'vetnam-gid',
  'indonesia': 'indoneziya-gid',
  'malaysia': 'malayziya-gid',
  'singapore': 'singapur-gid',
  'switzerland': 'shveitsariya-gid',
  'india': 'indiya-gid',
  'czechia': 'chekhiya-gid',
  'hungary': 'vengriya-gid',
  'croatia': 'horvatiya-gid',
  'portugal': 'portugaliya-gid',
  'slovakia': 'slovakiya-gid',
  'romania': 'rumyniya-gid',
  'uk': 'velikobritaniya-gid',
  'great-britain': 'velikobritaniya-gid',
  'united-kingdom': 'velikobritaniya-gid'
};

export const getCanonicalCountryId = (id: string): string => {
  return countrySeoRedirects[id] || id;
};

export const isOldCountryId = (id: string): boolean => {
  return id in countrySeoRedirects;
};
