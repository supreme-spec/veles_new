import { z } from 'zod';

export const searchQuerySchema = z.object({
  q: z.string().trim().min(2, 'Слишком короткий запрос').max(120, 'Слишком длинный запрос'),
  checkin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Дата заезда должна быть в формате YYYY-MM-DD'),
  checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Дата выезда должна быть в формате YYYY-MM-DD'),
  adults: z.coerce.number().int().min(1, 'Минимум 1 взрослый').max(10, 'Максимум 10 взрослых').default(2),
  children: z.string().optional().transform((val) => {
    if (!val) return [];
    try {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((a: any) => Number(a)).filter((age: number) => !Number.isNaN(age) && age >= 0 && age <= 17);
    } catch {
      return [];
    }
  }),
  residency: z.string().regex(/^[A-Z]{2}$/, 'Код резиденции должен состоять из 2 заглавных букв').default('RU'),
  testMode: z.enum(['1']).optional(),
  hotelId: z.coerce.number().int().positive().optional(),
}).refine((data) => new Date(data.checkout) > new Date(data.checkin), {
  message: 'Дата выезда должна быть позже даты заезда',
  path: ['checkout'],
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;

export const hotelSearchSchema = z.object({
  city: z.string().trim().min(2).max(100).optional(),
  country: z.string().trim().min(2).max(100).optional(),
  stars: z.coerce.number().int().min(1).max(5).optional(),
  slug: z.string().trim().min(2).max(120).optional(),
  name: z.string().trim().min(2).max(200).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export type HotelSearchQuery = z.infer<typeof hotelSearchSchema>;

export const ratesRequestSchema = z.object({
  checkin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkout: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.array(
    z.object({
      adults: z.number().int().min(1).max(10).default(2),
      children: z.array(z.number().int().min(0).max(17)).default([]).optional(),
    })
  ).default([{ adults: 2 }]),
  residency: z.string().regex(/^[A-Z]{2}$/).default('RU'),
  timeout: z.coerce.number().int().min(5).max(100).default(30),
}).refine((data) => new Date(data.checkout) > new Date(data.checkin), {
  message: 'Дата выезда должна быть позже даты заезда',
  path: ['checkout'],
});

export type RatesRequest = z.infer<typeof ratesRequestSchema>;

export const bookingCreateSchema = z.object({
  bookHash: z.string().min(10, 'Некорректный bookHash'),
  partnerOrderId: z.string().min(3, 'Некорректный partnerOrderId').max(256, 'partnerOrderId слишком длинный'),
  userIp: z.string().regex(/^(?:\d{1,3}\.){3}\d{1,3}$|^(?:[0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/, 'Некорректный IP-адрес'),
  language: z.string().length(2).default('ru'),
});

export type BookingCreateRequest = z.infer<typeof bookingCreateSchema>;

export const bookingStartSchema = z.object({
  partnerOrderId: z.string().min(3).max(256),
  rooms: z.array(
    z.object({
      guests: z.array(
        z.object({
          firstName: z.string().min(1).max(50),
          lastName: z.string().min(1).max(50),
          isChild: z.boolean().optional(),
          age: z.number().int().min(0).max(17).optional(),
          gender: z.enum(['male', 'female', 'unknown']).optional(),
        })
      ).min(1, 'В каждом номере должен быть хотя бы один гость'),
    })
  ).min(1, 'Нужен хотя бы 1 номер'),
  user: z.object({
    email: z.string().email(),
    phone: z.string().min(5).max(35),
    comment: z.string().max(256).optional(),
  }),
  paymentType: z.object({
    type: z.enum(['now', 'hotel', 'deposit']),
    amount: z.string().optional(),
    currencyCode: z.string().length(3).optional(),
    initUuid: z.string().uuid().optional(),
    payUuid: z.string().uuid().optional(),
  }),
  supplierData: z.object({
    firstNameOriginal: z.string().min(1).max(50),
    lastNameOriginal: z.string().min(1).max(50),
    email: z.string().email(),
    phone: z.string().min(5).max(35),
  }),
  returnPath: z.string().url().optional(),
  upsellData: z.array(
    z.object({
      name: z.string(),
      uid: z.string(),
      ruleId: z.number().int().optional(),
      attributes: z.string().optional(),
      checkinDatetime: z.string().optional(),
      checkoutDatetime: z.string().optional(),
    })
  ).optional(),
  arrivalDatetime: z.string().optional(),
  language: z.string().length(2).default('ru'),
});

export type BookingStartRequest = z.infer<typeof bookingStartSchema>;
