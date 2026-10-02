import { ostrovokClient } from '../src/lib/ostrovok/client';

async function testDumpStructure() {
  console.log('🧪 Testing Ostrovok dump structure...\n');

  try {
    const dump = await ostrovokClient.getHotelDump();
    console.log('Dump response structure:');
    console.log(JSON.stringify(dump, null, 2));

    console.log('\n📊 Analysis:');
    console.log('- Has "data" field:', !!dump?.data);
    console.log('- Has "url" field:', !!dump?.url);
    console.log('- Has "hotels" in data:', !!dump?.data?.hotels);
    console.log('- Has "updates" in data:', !!dump?.data?.updates);

    if (dump?.url) {
      console.log('\n⚠️  API returns URL to archive (needs download and parsing)');
      console.log('Archive URL:', dump.url);
    }

    if (dump?.data?.hotels) {
      console.log('\n✅ API returns hotels array directly');
      console.log('Hotels count:', dump.data.hotels.length);
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

testDumpStructure().catch(console.error);
