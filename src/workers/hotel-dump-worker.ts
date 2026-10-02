import fs from 'fs';
import zlib from 'zlib';
import JSONStream from 'JSONStream';
import { db } from '@/db';
import { hotelStatusEnum, hotels } from '@/db/schema';

const BATCH_SIZE = 100;

export class HotelDumpWorker {
  async importStaticDump(filePath: string) {
    console.log(`[DUMP WORKER] Начало потоковой обработки: ${filePath}`);

    const readStream = fs.createReadStream(filePath);
    const gunzip = zlib.createGunzip();
    const parser = JSONStream.parse('hotels.*');

    let batch: any[] = [];

    readStream.pipe(gunzip).pipe(parser);

    parser.on('data', async (hotel: any) => {
      const mappedHotel = {
        ostrovokHid: hotel.hid,
        ostrovokId: String(hotel.id),
        name: hotel.name || '',
        normalizedName: String(hotel.name || '').toLowerCase().trim(),
        slug: this.slugify(`${hotel.name}-${hotel.hid}`),
        country: hotel.country || null,
        region: hotel.region || null,
        city: hotel.city || null,
        district: hotel.district || null,
        address: hotel.address || 'Адрес не указан',
        stars: parseInt(hotel.star_rating || '0', 10),
        propertyType: hotel.kind || 'Hotel',
        description: hotel.description_struct?.[0]?.paragraphs?.join('\n') || '',
        amenities: hotel.amenities || [],
        contacts: hotel.contacts || {},
        images: hotel.images || [],
        status: 'ACTIVE' as typeof hotelStatusEnum.enumValues[number],
        source: 'veles-voyage',
        lastSyncedAt: new Date(),
        lastSeenAt: new Date(),
      };

      batch.push(mappedHotel);

      if (batch.length >= BATCH_SIZE) {
        parser.pause();
        await this.flushBatch(batch);
        batch = [];
        parser.resume();
      }
    });

    parser.on('end', async () => {
      if (batch.length > 0) {
        await this.flushBatch(batch);
      }
      console.log('[DUMP WORKER] Потоковый импорт завершен.');
    });

    parser.on('error', (err: any) => {
      console.error('[DUMP WORKER] Ошибка чтения потока:', err);
    });
  }

  private async flushBatch(hotelsBatch: any[]) {
    for (const hotel of hotelsBatch) {
      await db.insert(hotels).values(hotel).onConflictDoUpdate({
        target: hotels.ostrovokHid,
        set: {
          name: hotel.name,
          address: hotel.address,
          stars: hotel.stars,
          description: hotel.description,
          amenities: hotel.amenities,
          contacts: hotel.contacts,
          images: hotel.images,
          lastSyncedAt: hotel.lastSyncedAt,
          lastSeenAt: hotel.lastSeenAt,
        },
      });
    }
  }

  private slugify(text: string): string {
    const mapping: Record<string, string> = {
      а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
      з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
      п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts',
      ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
    };

    return text
      .toString()
      .toLowerCase()
      .split('')
      .map(char => mapping[char] || char)
      .join('')
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
}
