import { pgTable, uuid, text, integer, timestamp, boolean, jsonb, pgEnum, geometry, decimal } from 'drizzle-orm/pg-core';

export const hotelStatusEnum = pgEnum('hotel_status', [
  'ACTIVE',
  'TEMPORARILY_UNAVAILABLE',
  'STALE',
  'REMOVED',
  'REDIRECTED'
]);

export const bookingStatusEnum = pgEnum('booking_status', [
  'INIT',
  'PREBOOKED',
  'PENDING_PAYMENT',
  'PROCESSING',
  'CONFIRMED',
  'FAILED',
  'CANCELLED',
  'COMPLETED'
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'NEW',
  'PENDING',
  'AUTHORIZED',
  'PAID',
  'FAILED',
  'CANCELLED',
  'REFUND_PENDING',
  'REFUNDED'
]);

export const hotels = pgTable('hotels', {
  id: uuid('id').primaryKey().defaultRandom(),
  ostrovokHid: integer('ostrovok_hid').unique().notNull(),
  ostrovokId: text('ostrovok_id').unique(),
  name: text('name').notNull(),
  normalizedName: text('normalized_name').notNull(),
  slug: text('slug').unique().notNull(),
  seoSlug: text('seo_slug').unique(),
  country: text('country'),
  region: text('region'),
  city: text('city'),
  district: text('district'),
  address: text('address'),
  geo: geometry('geo', { type: 'point', srid: 4326 }),
  stars: integer('stars'),
  propertyType: text('property_type'),
  description: text('description'),
  amenities: jsonb('amenities').$type<string[]>(),
  contacts: jsonb('contacts'),
  images: jsonb('images').$type<string[]>(),
  cancellationPolicies: jsonb('cancellation_policies'),
  roomsData: jsonb('rooms_data'),
  minPrice: decimal('min_price', { precision: 10, scale: 2 }),
  taxesIncluded: boolean('taxes_included').default(false),
  mealType: text('meal_type'),
  freeCancellationBefore: timestamp('free_cancellation_before'),
  paymentOptions: jsonb('payment_options'),
  taxData: jsonb('tax_data'),
  roomDataTrans: jsonb('room_data_trans'),
  rgExt: jsonb('rg_ext'),
  status: hotelStatusEnum('status').default('ACTIVE').notNull(),
  source: text('source').default('ostrovok'),
  lastSyncedAt: timestamp('last_synced_at').notNull(),
  lastSeenAt: timestamp('last_seen_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const hotelRedirects = pgTable('hotel_redirects', {
  id: uuid('id').primaryKey().defaultRandom(),
  oldSlug: text('old_slug').unique().notNull(),
  newSlug: text('new_slug'),
  statusCode: integer('status_code').default(301).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id'),
  partnerOrderId: text('partner_order_id').unique().notNull(),
  ostrovokOrderId: text('ostrovok_order_id').unique(),
  hotelHid: integer('hotel_hid').notNull(),
  hotelName: text('hotel_name').notNull(),
  checkinDate: timestamp('checkin_date').notNull(),
  checkoutDate: timestamp('checkout_date').notNull(),
  nightsCount: integer('nights_count').notNull(),
  guestsCount: integer('guests_count').notNull(),
  roomsCount: integer('rooms_count').notNull(),
  roomsData: jsonb('rooms_data'),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('RUB').notNull(),
  status: bookingStatusEnum('status').default('INIT').notNull(),
  paymentType: text('payment_type').default('now').notNull(),
  ostrovokBookHash: text('ostrovok_book_hash'),
  ostrovokSearchHash: text('ostrovok_search_hash'),
  ostrovokPrebookHash: text('ostrovok_prebook_hash'),
  freeCancellationBefore: timestamp('free_cancellation_before'),
  cancellationPolicies: jsonb('cancellation_policies'),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone'),
  customerResidency: text('customer_residency').default('RU'),
  payUuid: text('pay_uuid'),
  initUuid: text('init_uuid'),
  returnPath: text('return_path'),
  threeDsUrl: text('three_ds_url'),
  threeDsStatus: text('three_ds_status'),
  errorMessage: text('error_message'),
  confirmedAt: timestamp('confirmed_at'),
  cancelledAt: timestamp('cancelled_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  bookingId: uuid('booking_id').references(() => bookings.id),
  hotelHid: integer('hotel_hid').notNull(),
  userId: uuid('user_id'),
  authorName: text('author_name').notNull(),
  rating: integer('rating').notNull(),
  cleanlinessRating: integer('cleanliness_rating'),
  locationRating: integer('location_rating'),
  staffRating: integer('staff_rating'),
  comfortRating: integer('comfort_rating'),
  valueRating: integer('value_rating'),
  facilitiesRating: integer('facilities_rating'),
  wifiRating: integer('wifi_rating'),
  title: text('title'),
  content: text('content').notNull(),
  photos: jsonb('photos').$type<string[]>().default([]),
  verified: boolean('verified').default(false).notNull(),
  source: text('source').default('veles'),
  status: text('status').default('PENDING').notNull(),
  moderationNotes: text('moderation_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  phone: text('phone'),
  residency: text('residency').default('RU'),
  emailVerified: boolean('email_verified').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const auditLog = pgTable('audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull(),
  action: text('action').notNull(),
  oldData: jsonb('old_data'),
  newData: jsonb('new_data'),
  userId: uuid('user_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Hotel = typeof hotels.$inferSelect;
export type NewHotel = typeof hotels.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
