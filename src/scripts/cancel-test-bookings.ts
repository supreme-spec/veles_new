import { ostrovokClient } from '@/lib/ostrovok/client';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function cancelAllTestBookings() {
  console.log('[CANCEL TEST BOOKINGS] Starting...');

  const testBookings = await db
    .select()
    .from(bookings)
    .where(eq(bookings.hotelHid, 8526976));

  console.log(`[CANCEL TEST BOOKINGS] Found ${testBookings.length} test bookings`);

  for (const booking of testBookings) {
    try {
      const result = await ostrovokClient.cancelBooking(booking.partnerOrderId);
      console.log(`[CANCEL TEST BOOKINGS] Cancelled: ${booking.partnerOrderId}`, result);
    } catch (e: any) {
      console.error(`[CANCEL TEST BOOKINGS] Failed: ${booking.partnerOrderId}`, e.message || e);
    }
  }

  console.log('[CANCEL TEST BOOKINGS] Done');
  process.exit(0);
}

cancelAllTestBookings();
