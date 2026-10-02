import { defineConfig, defineCollection, s, context } from 'velite';

export default defineConfig({
  root: 'src/content',
  output: {
    data: '.velite',
  },
  collections: {
    countries: defineCollection({
      name: 'Country',
      pattern: 'countries/**/*.mdx',
      fullPath: false,
      schema: s.object({
        slug: s.custom<string>(() => true).transform(() => context().file.stem),
        name: s.custom<string>(() => true).transform(() => context().file.stem),
        path: s.custom<string>(() => true).transform(() => context().file.path),
        title: s.string(),
        description: s.string(),
        body: s.raw(),
        image: s.string().optional(),
        datePublished: s.string().optional(),
        dateModified: s.string().optional(),
        author: s.string().optional(),
        wordCount: s
          .union([s.number(), s.string()])
          .optional()
          .transform((val) => {
            if (!val) return undefined;
            if (typeof val === 'string') return parseInt(val, 10) || undefined;
            return val;
          }),
        inLanguage: s.string().optional(),
        keywords: s
          .union([s.string(), s.array(s.string())])
          .optional()
          .transform((val) => {
            if (!val) return [];
            return Array.isArray(val) ? val : val.split(',').map((k) => k.trim());
          }),
        latitude: s.number().optional(),
        longitude: s.number().optional(),
        capital: s.string().optional(),
        continent: s.string().optional(),
        wikidata: s.string().optional(),
        currency: s.string().optional(),
        language: s.string().optional(),
        timezone: s.string().optional(),
        visaRequirements: s.boolean().optional(),
        schengenArea: s.boolean().optional(),
        vaccinations: s.string().optional(),
        bestTimeToVisit: s.string().optional(),
        estimatedCost: s
          .string()
          .optional()
          .transform((val) => {
            if (!val) return undefined;
            const num = Number(val.replace(/[^\d]/g, ''));
            return Number.isNaN(num) ? undefined : num;
          }),
        seasons: s.string().optional(),
        politicalStatus: s.string().optional(),
        faqs: s.string().optional(),
        relatedCountries: s.array(s.string()).optional(),
        attractions: s.array(s.any()).optional(),
        video: s.string().optional(),
        videoDuration: s.string().optional(),
        videoUrl: s.string().optional(),
        videoEmbed: s.string().optional(),
        countryCode: s.string().optional(),
        socialTags: s
          .union([
            s.object({
              ogImage: s.string().url().optional(),
              description: s.string().max(160),
            }),
            s.string(),
          ])
          .optional()
          .transform((val) => {
            if (!val) return undefined;
            if (typeof val === 'string') {
              const tags = val
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean);
              return {
                ogImage: undefined,
                description: tags.join(' '),
                tags,
              };
            }
            return val;
          }),
        infoBlock: s
          .object({
            visa: s.string(),
            currency: s.string(),
            safetyLevel: s.enum(['low', 'medium', 'high']),
          })
          .optional(),
      }),
    }),
  },
});
