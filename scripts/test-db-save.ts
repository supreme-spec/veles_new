import { db } from '../src/db';
import { hotels } from '../src/db/schema';
import { eq } from 'drizzle-orm';

async function testDatabaseSave() {
  console.log('🧪 Testing database save...\n');

  try {
    // Check if test hotel exists
    const existing = await db
      .select()
      .from(hotels)
      .where(eq(hotels.ostrovokHid, 8526976))
      .limit(1);

    if (existing.length > 0) {
      console.log('✅ Test hotel found in database:');
      console.log(JSON.stringify(existing[0], null, 2));
    } else {
      console.log('❌ Test hotel not found in database');
    }
  } catch (error: any) {
    console.error('❌ Database error:', error.message);
  }
}

testDatabaseSave().catch(console.error);
