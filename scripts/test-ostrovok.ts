import { ostrovokClient } from '../src/lib/ostrovok/client';

async function testOstrovokConnection() {
  console.log('🧪 Testing Ostrovok API connection...\n');

  // Test 1: Connection test
  console.log('1️⃣ Testing connection with test hotel HID 8526976...');
  const connectionTest = await ostrovokClient.testConnection();
  console.log('Connection test result:', JSON.stringify(connectionTest, null, 2));

  if (!connectionTest.success) {
    console.error('❌ Connection failed!');
    return;
  }

  console.log('✅ Connection successful!\n');

  // Test 2: Search by hotel IDs
  console.log('2️⃣ Testing search by hotel IDs (HID 8526976)...');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 3);

  const searchResult = await ostrovokClient.searchByHotelIds({
    hotelIds: ['8526976'],
    checkin: tomorrow.toISOString().split('T')[0],
    checkout: dayAfter.toISOString().split('T')[0],
    guests: [{ adults: 2 }],
    residency: 'RU',
  });
  console.log('Search result:', JSON.stringify(searchResult, null, 2));

  if (searchResult?.status === 'ok' && Array.isArray(searchResult.data?.hotels)) {
    console.log(`✅ Search successful! Found ${searchResult.data.hotels.length} hotels\n`);

    // Test 3: Get hotelpage
    console.log('3️⃣ Testing hotelpage endpoint...');
    const hotelpageResult = await ostrovokClient.getHotelpage({
      hid: 8526976,
      checkin: tomorrow.toISOString().split('T')[0],
      checkout: dayAfter.toISOString().split('T')[0],
      guests: [{ adults: 2 }],
      residency: 'RU',
    });
    console.log('Hotelpage result:', JSON.stringify(hotelpageResult, null, 2));

    if (hotelpageResult?.status === 'ok' && Array.isArray(hotelpageResult.data?.hotels)) {
      console.log(`✅ Hotelpage successful! Found ${hotelpageResult.data.hotels.length} hotels\n`);

      // Test 4: Check rates
      if (hotelpageResult.data.hotels[0]?.rates) {
        console.log('4️⃣ Rates found:', hotelpageResult.data.hotels[0].rates.length);
        console.log('Sample rate:', JSON.stringify(hotelpageResult.data.hotels[0].rates[0], null, 2));
      }

      console.log('\n✅ All tests passed!');
    } else {
      console.error('❌ Hotelpage failed!');
    }
  } else {
    console.error('❌ Search failed!');
  }
}

testOstrovokConnection().catch(console.error);
