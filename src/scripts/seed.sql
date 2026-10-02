INSERT INTO hotels (id, ostrovok_hid, ostrovok_id, name, normalized_name, slug, country, city, address, stars, description, amenities, status, source, last_synced_at, last_seen_at, created_at, updated_at)
VALUES
  (gen_random_uuid(), 8526977, 'sochi_resort', 'Резорт Сочи', 'резорт сочи', 'sochi-resort', 'Россия', 'Сочи', 'ул. Курортный проспект, 1', 4, 'Пляжный курорт на Чёрном море.', '["Пляж","Спа","Wi-Fi"]'::jsonb, 'ACTIVE', 'seed', now(), now(), now(), now()),
  (gen_random_uuid(), 7654321, 'kazan_hotel', 'Казан Кремль Отель', 'казан кремль отель', 'kazan-kremlin-hotel', 'Россия', 'Казань', 'ул. Кремлёвская, 10', 4, 'Отель с видом на Казанский кремль.', '["Ресторан","Фитнес","Wi-Fi"]'::jsonb, 'ACTIVE', 'seed', now(), now(), now(), now());
