import { ostrovokClient } from '../src/lib/ostrovok/client';
import { db } from '../src/db';
import { hotels } from '../src/db/schema';
import { eq } from 'drizzle-orm';

async function loadTestHotel() {
  const hid = 8526976;
  console.log(`[TEST] Loading test hotel HID ${hid}...`);

  try {
    // Сначала получаем полную информацию об отеле
    const hotelInfo = await ostrovokClient.getHotelContent(hid);
    console.log('[TEST] Hotel info received');

    const hotel = hotelInfo?.data;

    if (!hotel) {
      console.error('[TEST] Hotel not found in hotel info response');
      return;
    }

    console.log('[TEST] Hotel data found:', {
      hid: hotel.hid,
      id: hotel.id,
      name: hotel.name,
      city: hotel.region?.name,
      country: hotel.region?.country_code,
    });

    await db.insert(hotels)
      .values({
        ostrovokHid: hotel.hid,
        ostrovokId: String(hotel.id),
        name: hotel.name || `Отель ${hotel.hid}`,
        normalizedName: String(hotel.name || '').toLowerCase().trim(),
        slug: `hotel-${hotel.hid}`,
        seoSlug: `hotel-${hotel.hid}`,
        country: hotel.region?.country_code || 'Россия',
        region: hotel.region?.name || null,
        city: hotel.region?.name || 'Белогорск',
        district: hotel.district?.name || null,
        address: hotel.address || `ул. Московская 123, Белогорск`,
        geo: null, // Координаты нет в hotel info response
        stars: Number(hotel.star_rating || 0),
        propertyType: 'Hotel',
        description: (hotel.description_struct?.[0]?.paragraphs || []).join('\n') || null,
        amenities: hotel.serp_filters || [],
        contacts: {},
        images: Array.isArray(hotel.images) ? hotel.images.map(url => ({ url })) : [],
        cancellationPolicies: hotel.metapolicy_struct?.cancellation_penalties || null,
        roomsData: hotel.metapolicy_struct?.meal
          ? { mealTypes: hotel.metapolicy_struct.meal, taxes: hotel.metapolicy_struct.tax_data?.taxes || [] }
          : null,
        status: 'ACTIVE',
        source: 'test',
        lastSyncedAt: new Date(),
        lastSeenAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [hotels.ostrovokHid],
        set: {
          name: hotel.name || `Отель ${hotel.hid}`,
          description: (hotel.description_struct?.[0]?.paragraphs || []).join('\n') || null,
          amenities: Array.isArray(hotel.amenities) ? hotel.amenities : [],
          images: Array.isArray(hotel.images) ? hotel.images : [],
          cancellationPolicies: hotel.metapolicy_struct?.cancellation_penalties || null,
          roomsData: hotel.metapolicy_struct?.meal
            ? { mealTypes: hotel.metapolicy_struct.meal, taxes: hotel.metapolicy_struct.tax_data?.taxes || [] }
            : null,
          lastSyncedAt: new Date(),
          updatedAt: new Date(),
        },
      });

    console.log(`[TEST] ✅ Test hotel HID ${hid} loaded successfully`);
    console.log(`[TEST] Hotel name: ${hotel.name}`);
    console.log(`[TEST] Address: ${hotel.address}`);
    console.log(`[TEST] Stars: ${hotel.stars}`);
    console.log(`[TEST] Images: ${hotel.images?.length || 0}`);
    console.log(`[TEST] Amenities: ${hotel.amenities?.length || 0}`);
  } catch (error: any) {
    console.error('[TEST] ❌ Error loading test hotel:', error.message);
    if (error.response) {
      console.error('[TEST] Response status:', error.response.status);
      console.error('[TEST] Response data:', error.response.data);
    }
  }
}

loadTestHotel().catch(console.error);
