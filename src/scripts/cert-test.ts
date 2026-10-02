import { ostrovokClient } from '../lib/ostrovok/client';
import { randomUUID } from 'crypto';
import https from 'https';

const TEST_HID = 8526976;
const CHECKIN = '2026-12-01';
const CHECKOUT = '2026-12-05';
const LANGUAGE = 'ru';
const RESIDENCY = 'UZ';

async function getExternalIp(): Promise<string> {
  return new Promise((resolve) => {
    https.get('https://api.ipify.org', (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data.trim() || ''));
    }).on('error', () => resolve(''));
  });
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runCert() {
  console.log('[CERT] Starting API Велес Вояж v3 B2B certification test...');
  console.log(`[CERT] Test hotel HID: ${TEST_HID}`);

  const config = ostrovokClient.getConfig();
  if (!config.apiKey || !config.dKey) {
    console.error('[CERT] Missing API Велес Вояж credentials in .env.local');
    process.exit(1);
  }
  console.log(`[CERT] API Key: ${config.apiKey.slice(0, 8)}...`);
  console.log(`[CERT] DKey: ${config.dKey}`);
  console.log(`[CERT] IsTest: ${config.isTest}`);

  const externalIp = await getExternalIp();
  console.log(`[CERT] External IP: ${externalIp || 'unknown'}`);

  try {
    console.log('\n[CERT] Step 1: getHotelpage (h-... hash)...');
    const hpResponse = await ostrovokClient.getHotelpage({
      hid: TEST_HID,
      checkin: CHECKIN,
      checkout: CHECKOUT,
      guests: [{ adults: 2, children: [5] }],
      residency: RESIDENCY,
      timeout: 45,
    });

    const hpData = (hpResponse as any)?.data?.data || (hpResponse as any)?.data || hpResponse;
    const bookHash = hpData?.book_hash || hpData?.hotels?.[0]?.rates?.[0]?.book_hash;
    const searchHash = hpData?.search_hash || hpData?.hotels?.[0]?.rates?.[0]?.search_hash;
    const rates = hpData?.rates || hpData?.hotels?.[0]?.rates;
    const paymentTypes = rates?.[0]?.payment_options?.payment_types || [];

    if (!bookHash) {
      console.error('[CERT] No book_hash returned from hotelpage');
      console.error('[CERT] Response:', JSON.stringify(hpData, null, 2).slice(0, 2000));
      process.exit(1);
    }
    console.log(`[CERT] book_hash: ${bookHash}`);
    console.log(`[CERT] search_hash: ${searchHash || 'none'}`);
    console.log(`[CERT] rates count: ${rates?.length || 0}`);

    console.log('\n[CERT] Step 2: prebook (p-... hash)...');
    const prebookResponse = await ostrovokClient.prebook({
      bookHash,
      priceIncreasePercent: 0,
      timeout: 45,
    });

    const prebookData = (prebookResponse as any)?.data?.data || (prebookResponse as any)?.data || prebookResponse;
    const prebookHash = prebookData?.book_hash || prebookData?.hotels?.[0]?.rates?.[0]?.book_hash || bookHash;
    console.log(`[CERT] prebook hash: ${prebookHash}`);
    console.log(`[CERT] prebook status: ${prebookData?.status || 'unknown'}`);

    const partnerOrderId = `cert-${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
    console.log(`[CERT] partner_order_id: ${partnerOrderId}`);

    console.log('\n[CERT] Step 3: create booking process...');
    const createParams: any = {
      bookHash: prebookHash,
      partnerOrderId,
      language: LANGUAGE,
    };
    if (externalIp) createParams.userIp = externalIp;
    const createResponse = await ostrovokClient.createBookingProcess(createParams);

    const createData = (createResponse as any)?.data?.data || (createResponse as any)?.data || createResponse;
    console.log(`[CERT] create status: ${createData?.status || 'unknown'}`);
    console.log('[CERT] create payload:', JSON.stringify(createData, null, 2).slice(0, 2000));

    console.log('\n[CERT] Step 4: create credit card token...');
    const testCards = [
      { number: '4111111111111111', holder: 'TEST USER' },
      { number: '5555555555554444', holder: 'TEST USER' },
      { number: '4000000000000002', holder: 'TEST USER' },
      { number: '4387751111111111', holder: 'TEST USER' },
    ];
    let tokenResponse: any = { status: 'error', error: 'no_attempt' };
    let finalPayUuid = '';
    let finalInitUuid = '';
    for (const card of testCards) {
      const payUuid = randomUUID();
      const initUuid = randomUUID();
      tokenResponse = await ostrovokClient.createCreditCardToken({
        objectId: String(createData.item_id),
        payUuid,
        initUuid,
        userFirstName: 'Test',
        userLastName: 'User',
        cvc: '123',
        isCvcRequired: true,
        creditCardDataCore: {
          year: '26',
          cardNumber: card.number,
          cardHolder: card.holder,
          month: '12',
        },
      });
      console.log(`[CERT] token attempt ${card.number}: ${tokenResponse.status} - ${tokenResponse.error || 'ok'}`);
      if (tokenResponse.status === 'ok') {
        finalPayUuid = payUuid;
        finalInitUuid = initUuid;
        break;
      }
    }
    console.log('[CERT] token payload:', JSON.stringify(tokenResponse, null, 2).slice(0, 1000));

    console.log('\n[CERT] Step 5: start booking process...');
    const primaryPaymentType = paymentTypes[0] || { type: 'now', amount: '0', currency_code: 'RUB' };
    const startResponse = await ostrovokClient.startBookingProcess({
      partner: { partnerOrderId },
      language: LANGUAGE,
      rooms: [
        {
          guests: [
            { firstName: 'Test', lastName: 'User', isChild: false, gender: 'male' },
            { firstName: 'Test', lastName: 'Child', isChild: true, age: 5, gender: 'male' },
          ],
        },
      ],
      user: {
        email: 'test@example.com',
        phone: '+998901234567',
        comment: 'Certification test booking',
      },
      paymentType: {
        type: primaryPaymentType.type as 'now' | 'hotel' | 'deposit',
        amount: primaryPaymentType.amount,
        currencyCode: primaryPaymentType.currency_code,
        initUuid: finalInitUuid,
        payUuid: finalPayUuid,
      },
      supplierData: {
        firstNameOriginal: 'Test',
        lastNameOriginal: 'User',
        email: 'test@example.com',
        phone: '+998901234567',
      },
      returnPath: 'https://veles-voyage.ru/api/booking/3ds-callback',
    });

    const startData = (startResponse as any)?.data?.data || (startResponse as any)?.data || startResponse;
    const startStatus = startData?.status || startData?.result?.status;
    console.log(`[CERT] start status: ${startStatus}`);
    console.log('[CERT] start payload:', JSON.stringify(startData, null, 2).slice(0, 3000));

    if (startStatus === '3ds' || startData?.three_ds_url) {
      console.log(`[CERT] 3DS URL: ${startData?.three_ds_url || startData?.data?.three_ds_url}`);
    }

    let bookingFinalStatus = 'unknown';
    if (startStatus === 'ok' || startData?.result?.status === 'ok') {
      console.log('\n[CERT] Step 6: poll booking status...');
      for (let i = 1; i <= 10; i++) {
        await sleep(3000);
        const checkResponse = await ostrovokClient.checkBookingProcess(partnerOrderId);
        const checkData = (checkResponse as any)?.data?.data || (checkResponse as any)?.data || checkResponse;
        bookingFinalStatus = checkData?.status || checkData?.result?.status || 'unknown';
        const checkError = checkData?.error || checkData?.result?.error;
        console.log(`[CERT] poll ${i}: ${bookingFinalStatus} error=${checkError || 'none'}`);
        console.log('[CERT] check payload:', JSON.stringify(checkData, null, 2).slice(0, 2000));

        if (bookingFinalStatus === 'ok') {
          console.log('[CERT] Booking confirmed!');
          break;
        }
        if (['soldout', 'provider', 'book_limit', 'insufficient_b2b_balance', 'block', 'charge'].includes(bookingFinalStatus)) {
          console.log(`[CERT] Booking failed with: ${bookingFinalStatus}`);
          break;
        }
        if (bookingFinalStatus === 'error' && checkError === 'not_allowed') {
          console.log('[CERT] Booking blocked by policy: not_allowed. Stopping polling to avoid spam.');
          break;
        }
      }
    } else {
      bookingFinalStatus = startStatus || 'error';
    }

    console.log('\n[CERT] Step 7: cancel test booking...');
    const cancelResponse = await ostrovokClient.cancelBooking(partnerOrderId);
    const cancelData = (cancelResponse as any)?.data?.data || (cancelResponse as any)?.data || cancelResponse;
    console.log(`[CERT] cancel status: ${cancelData?.status || 'unknown'} error=${cancelData?.error || 'none'}`);

    console.log('\n[CERT] Step 8: multiroom certification test...');
    const multiRoomPartnerOrderId = `cert-multi-${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
    console.log(`[CERT] multiroom partner_order_id: ${multiRoomPartnerOrderId}`);

    const hpResponse2 = await ostrovokClient.getHotelpage({
      hid: TEST_HID,
      checkin: CHECKIN,
      checkout: CHECKOUT,
      guests: [
        { adults: 2, children: [5] },
        { adults: 1 }
      ],
      residency: RESIDENCY,
      timeout: 45,
    });

    const hpData2 = (hpResponse2 as any)?.data?.data || (hpResponse2 as any)?.data || hpResponse2;
    const bookHash2 = hpData2?.book_hash || hpData2?.hotels?.[0]?.rates?.[0]?.book_hash;
    console.log(`[CERT] multiroom book_hash: ${bookHash2}`);

    let multiRoomFinalStatus = 'skipped';

    if (!bookHash2) {
      console.error('[CERT] Multiroom: no book_hash returned from hotelpage');
      console.error('[CERT] Multiroom response:', JSON.stringify(hpData2, null, 2).slice(0, 2000));
      console.log('[CERT] Skipping multiroom test due to missing book_hash');
    } else {
      const prebookResponse2 = await ostrovokClient.prebook({
        bookHash: bookHash2,
        priceIncreasePercent: 0,
        timeout: 45,
      });
      const prebookData2 = (prebookResponse2 as any)?.data?.data || (prebookResponse2 as any)?.data || prebookResponse2;
      const prebookHash2 = prebookData2?.book_hash || prebookData2?.hotels?.[0]?.rates?.[0]?.book_hash || bookHash2;
      console.log(`[CERT] multiroom prebook hash: ${prebookHash2}`);

      const createParams2: any = {
        bookHash: prebookHash2,
        partnerOrderId: multiRoomPartnerOrderId,
        language: LANGUAGE,
      };
      if (externalIp) createParams2.userIp = externalIp;
      const createResponse2 = await ostrovokClient.createBookingProcess(createParams2);

      const createData2 = (createResponse2 as any)?.data?.data || (createResponse2 as any)?.data || createResponse2;
      console.log(`[CERT] multiroom create status: ${createData2?.status || 'unknown'}`);
      console.log('[CERT] multiroom create payload:', JSON.stringify(createData2, null, 2).slice(0, 2000));

      const startResponse2 = await ostrovokClient.startBookingProcess({
        partner: { partnerOrderId: multiRoomPartnerOrderId },
        language: LANGUAGE,
        rooms: [
          {
            guests: [
              { firstName: 'Test', lastName: 'User1', isChild: false, gender: 'male' },
              { firstName: 'Test', lastName: 'Child1', isChild: true, age: 5, gender: 'male' },
            ],
          },
          {
            guests: [
              { firstName: 'Test', lastName: 'User2', isChild: false, gender: 'female' },
            ],
          },
        ],
        user: {
          email: 'test@example.com',
          phone: '+998901234567',
          comment: 'Multiroom certification test booking',
        },
        paymentType: {
          type: primaryPaymentType.type as 'now' | 'hotel' | 'deposit',
          amount: primaryPaymentType.amount,
          currencyCode: primaryPaymentType.currency_code,
          initUuid: finalInitUuid,
          payUuid: finalPayUuid,
        },
        supplierData: {
          firstNameOriginal: 'Test',
          lastNameOriginal: 'User',
          email: 'test@example.com',
          phone: '+998901234567',
        },
        returnPath: 'https://veles-voyage.ru/api/booking/3ds-callback',
      });

      const startData2 = (startResponse2 as any)?.data?.data || (startResponse2 as any)?.data || startResponse2;
      const startStatus2 = startData2?.status || startData2?.result?.status;
      console.log(`[CERT] multiroom start status: ${startStatus2}`);
      console.log('[CERT] multiroom start payload:', JSON.stringify(startData2, null, 2).slice(0, 3000));

      if (startStatus2 === 'ok' || startData2?.result?.status === 'ok') {
        console.log('\n[CERT] Step 9: poll multiroom booking status...');
        for (let i = 1; i <= 10; i++) {
          await sleep(3000);
          const checkResponse2 = await ostrovokClient.checkBookingProcess(multiRoomPartnerOrderId);
          const checkData2 = (checkResponse2 as any)?.data?.data || (checkResponse2 as any)?.data || checkResponse2;
          multiRoomFinalStatus = checkData2?.status || checkData2?.result?.status || 'unknown';
          const checkError2 = checkData2?.error || checkData2?.result?.error;
          console.log(`[CERT] multiroom poll ${i}: ${multiRoomFinalStatus} error=${checkError2 || 'none'}`);

          if (multiRoomFinalStatus === 'ok') {
            console.log('[CERT] Multiroom booking confirmed!');
            break;
          }
          if (['soldout', 'provider', 'book_limit', 'insufficient_b2b_balance', 'block', 'charge'].includes(multiRoomFinalStatus)) {
            console.log(`[CERT] Multiroom booking failed with: ${multiRoomFinalStatus}`);
            break;
          }
          if (multiRoomFinalStatus === 'error' && checkError2 === 'not_allowed') {
            console.log('[CERT] Multiroom booking blocked by policy: not_allowed. Stopping polling.');
            break;
          }
        }
      } else {
        multiRoomFinalStatus = startStatus2 || 'error';
      }

      console.log('\n[CERT] Step 10: cancel multiroom test booking...');
      const cancelResponse2 = await ostrovokClient.cancelBooking(multiRoomPartnerOrderId);
      const cancelData2 = (cancelResponse2 as any)?.data?.data || (cancelResponse2 as any)?.data || cancelResponse2;
      console.log(`[CERT] multiroom cancel status: ${cancelData2?.status || 'unknown'} error=${cancelData2?.error || 'none'}`);
    }

    console.log('\n[CERT] ==============================');
    console.log('[CERT] CERTIFICATION TEST SUMMARY');
    console.log('[CERT] ==============================');
    console.log(`[CERT] Hotel HID: ${TEST_HID}`);
    console.log(`[CERT] Dates: ${CHECKIN} - ${CHECKOUT}`);
    console.log(`[CERT] Guests: 2 adults + 1 child (5yo), residency: ${RESIDENCY}`);
    console.log(`[CERT] book_hash: ${bookHash}`);
    console.log(`[CERT] partner_order_id: ${partnerOrderId}`);
    console.log(`[CERT] Final status: ${bookingFinalStatus}`);
    console.log(`[CERT] Multiroom partner_order_id: ${multiRoomPartnerOrderId}`);
    console.log(`[CERT] Multiroom Final status: ${multiRoomFinalStatus}`);
    console.log('[CERT] Test completed.');
  } catch (error: any) {
    console.error('[CERT] Fatal error:', error.message || error);
    if (error.response?.data) {
      console.error('[CERT] Response data:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

runCert();
