import { ostrovokClient } from '@/lib/ostrovok/client';
import { db } from '@/db';
import { hotels } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function processHotelDump() {
  console.log('[DUMP] Starting hotel dump processing...');
  
  try {
    const dump = await ostrovokClient.getHotelDump();
    const hotelsData = dump?.data?.hotels || [];
    
    console.log(`[DUMP] Processing ${hotelsData.length} hotels...`);
    
    for (const hotel of hotelsData) {
      try {
        await db.insert(hotels)
          .values({
             ostrovokHid: hotel.hid,
             ostrovokId: String(hotel.id),
             name: hotel.name || '',
             normalizedName: String(hotel.name || '').toLowerCase().trim(),
             slug: `hotel-${hotel.hid}`,
             country: hotel.country?.name || 'Неизвестно',
             region: hotel.region?.name || null,
             city: hotel.city?.name || 'Неизвестно',
             district: hotel.district?.name || null,
             address: hotel.address || null,
             geo: hotel.latitude != null && hotel.longitude != null ? [Number(hotel.longitude), Number(hotel.latitude)] as [number, number] : null,
             stars: Number(hotel.stars || 0),
            propertyType: hotel.kind || 'Hotel',
            description: (hotel.description_struct?.[0]?.paragraphs || []).join('\n') || null,
            amenities: Array.isArray(hotel.amenities) ? hotel.amenities : [],
            contacts: hotel.contacts || {},
            images: Array.isArray(hotel.images) ? hotel.images : [],
            cancellationPolicies: hotel.metapolicy_struct?.cancellation_penalties || null,
            roomsData: hotel.metapolicy_struct?.meal ? { mealTypes: hotel.metapolicy_struct.meal, taxes: hotel.metapolicy_struct.tax_data?.taxes || [] } : null,
            status: 'ACTIVE',
            source: 'veles-voyage-dump',
            lastSyncedAt: new Date(),
            lastSeenAt: new Date(),
          })
          .onConflictDoUpdate({
            target: [hotels.ostrovokHid],
            set: {
              name: hotel.name,
              description: (hotel.description_struct?.[0]?.paragraphs || []).join('\n') || null,
              amenities: Array.isArray(hotel.amenities) ? hotel.amenities : [],
              images: Array.isArray(hotel.images) ? hotel.images : [],
              cancellationPolicies: hotel.metapolicy_struct?.cancellation_penalties || null,
              roomsData: hotel.metapolicy_struct?.meal ? { mealTypes: hotel.metapolicy_struct.meal, taxes: hotel.metapolicy_struct.tax_data?.taxes || [] } : null,
              lastSyncedAt: new Date(),
              updatedAt: new Date(),
            },
          });
      } catch (err) {
        console.error(`[DUMP] Error processing hotel ${hotel.hid}:`, err);
      }
    }
    
    console.log('[DUMP] Hotel dump completed');
  } catch (error) {
    console.error('[DUMP] Error:', error);
  }
}

async function processIncrementalDump() {
  console.log('[DUMP] Starting incremental dump processing...');
  
  try {
    const dump = await ostrovokClient.getIncrementalDump();
    const updates = dump?.data?.updates || [];
    
    console.log(`[DUMP] Processing ${updates.length} incremental updates...`);
    
    for (const update of updates) {
      try {
        const payload: any = {
          lastSyncedAt: new Date(),
          lastSeenAt: new Date(),
          updatedAt: new Date(),
        };

        if (update.name) payload.name = update.name;
        if (update.description_struct?.[0]?.paragraphs) {
          payload.description = update.description_struct[0].paragraphs.join('\n');
        }
        if (Array.isArray(update.amenities)) payload.amenities = update.amenities;
        if (Array.isArray(update.images)) payload.images = update.images;
        if (update.metapolicy_struct?.cancellation_penalties) {
          payload.cancellationPolicies = update.metapolicy_struct.cancellation_penalties;
        }
        if (update.metapolicy_struct?.meal) {
          payload.roomsData = {
            mealTypes: update.metapolicy_struct.meal,
            taxes: update.metapolicy_struct.tax_data?.taxes || [],
          };
        }

        await db.update(hotels)
          .set(payload)
          .where(eq(hotels.ostrovokHid, Number(update.hid)));
      } catch (err) {
        console.error(`[DUMP] Error processing update for hotel ${update.hid}:`, err);
      }
    }
    
    console.log('[DUMP] Incremental dump completed');
  } catch (error) {
    console.error('[DUMP] Error:', error);
  }
}

async function processRegionsDump() {
  console.log('[DUMP] Starting regions dump processing...');
  
  try {
    const dump = await ostrovokClient.getRegionsDump();
    const regions = dump?.data?.regions || [];
    
    console.log(`[DUMP] Processing ${regions.length} regions...`);
    
    for (const region of regions) {
      try {
        await db.insert(hotels)
          .values({
            ostrovokHid: region.id,
            ostrovokId: String(region.id),
            name: region.name,
            normalizedName: region.name?.toLowerCase().trim() || `region ${region.id}`,
            slug: `region-${region.id}`,
            country: region.country?.name || 'Неизвестно',
            region: region.name,
            city: region.name,
            address: region.address || null,
             geo: region.latitude != null && region.longitude != null ? [Number(region.longitude), Number(region.latitude)] as [number, number] : null,
            stars: 0,
            description: region.description || null,
            amenities: [],
            contacts: {},
            images: [],
            status: 'ACTIVE',
            source: 'veles-voyage-regions',
            lastSyncedAt: new Date(),
            lastSeenAt: new Date(),
          })
          .onConflictDoUpdate({
            target: [hotels.ostrovokHid],
            set: {
              name: region.name,
              description: region.description,
              lastSyncedAt: new Date(),
              updatedAt: new Date(),
            },
          });
      } catch (err) {
        console.error(`[DUMP] Error processing region ${region.id}:`, err);
      }
    }
    
    console.log('[DUMP] Regions dump completed');
  } catch (error) {
    console.error('[DUMP] Error:', error);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const type = args[0] || 'all';

  console.log(`[DUMP] Starting dump processing: ${type}`);

  switch (type) {
    case 'hotel':
      await processHotelDump();
      break;
    case 'incremental':
      await processIncrementalDump();
      break;
    case 'regions':
      await processRegionsDump();
      break;
    case 'all':
    default:
      await processIncrementalDump();
      await processHotelDump();
      await processRegionsDump();
      break;
  }

  console.log('[DUMP] All dumps processed');
  process.exit(0);
}

main().catch((err) => {
  console.error('[DUMP] Fatal error:', err);
  process.exit(1);
});
