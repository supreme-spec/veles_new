'use client';

import { useState } from 'react';

interface CertificationTestCasesProps {
  hotelHid: number;
  hotelName: string;
}

type BookingStep = 'form' | 'prebook' | 'booking' | '3ds' | 'success' | 'error';

interface GuestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface RoomData {
  adults: number;
  childrenAges: number[];
}

export function CertificationTestCases({ hotelHid, hotelName }: CertificationTestCasesProps) {
  const [step, setStep] = useState<BookingStep>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [partnerOrderId, setPartnerOrderId] = useState<string | null>(null);

  const [testCase, setTestCase] = useState<'single_child' | 'multiroom'>('single_child');
  const [guestData, setGuestData] = useState<GuestData>({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@veles-voyage.ru',
    phone: '+79850635134',
  });

  const [rooms, setRooms] = useState<RoomData[]>([
    { adults: 2, childrenAges: [5] }
  ]);

  const updateRoom = (index: number, field: keyof RoomData, value: any) => {
    setRooms(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value } as RoomData;
      return next;
    });
  };

  const loadTestCase = (caseType: 'single_child' | 'multiroom') => {
    setTestCase(caseType);
    setStep('form');
    setError(null);
    setResult(null);

    if (caseType === 'single_child') {
      setRooms([{ adults: 2, childrenAges: [5] }]);
      setGuestData({
        firstName: 'Test',
        lastName: 'User',
        email: 'test.uzbekistan@example.com',
        phone: '+79850635134',
      });
    } else {
      setRooms([
        { adults: 2, childrenAges: [5] },
        { adults: 2, childrenAges: [] }
      ]);
      setGuestData({
        firstName: 'Test',
        lastName: 'User',
        email: 'test.multiroom@example.com',
        phone: '+79850635134',
      });
    }
  };

  const runTestCase = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);

      const bookHash = `cert-${hotelHid}-${Date.now()}`;
      const partnerOrderIdValue = `cert-${Date.now().toString(36)}`;

      const roomsPayload = rooms.map(room => ({
        guests: [
          { adults: room.adults, children: room.childrenAges }
        ]
      }));

      const createRes = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookHash,
          partnerOrderId: partnerOrderIdValue,
          rooms: roomsPayload,
          user: {
            email: guestData.email,
            phone: guestData.phone,
            first_name: guestData.firstName,
            last_name: guestData.lastName,
          },
          partner: { partnerOrderId: partnerOrderIdValue },
          language: 'ru',
          residency: testCase === 'single_child' ? 'UZ' : 'RU',
        }),
      });

      const createData = await createRes.json();
      setResult({ step: 'create', data: createData });

      if (!createRes.ok || createData.result?.status !== 'ok') {
        setError(createData.error || 'Create booking failed');
        setStep('error');
        return;
      }

      const startRes = await fetch('/api/booking/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookHash,
          partnerOrderId: partnerOrderIdValue,
          rooms: roomsPayload,
          user: {
            email: guestData.email,
            phone: guestData.phone,
            first_name: guestData.firstName,
            last_name: guestData.lastName,
          },
          partner: { partnerOrderId: partnerOrderIdValue },
          paymentType: { type: 'hotel' },
          language: 'ru',
        }),
      });

      const startData = await startRes.json();
      setResult({ step: 'start', data: startData });

      if (!startRes.ok) {
        setError(startData.error || 'Start booking failed');
        setStep('error');
        return;
      }

      if (startData.result?.status === '3ds' || startData.result?.three_ds_url) {
        setResult({ step: '3ds', data: startData });
        setError('Требуется 3DS аутентификация. В production это будет redirect на страницу банка.');
        setStep('error');
        return;
      }

      setPartnerOrderId(partnerOrderIdValue);
      setStep('booking');

      for (let i = 0; i < 30; i++) {
        await new Promise(resolve => setTimeout(resolve, 3000));

        const checkRes = await fetch('/api/booking/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ partnerOrderId: partnerOrderIdValue }),
        });

        const checkData = await checkRes.json();
        setResult({ step: 'check', attempt: i + 1, data: checkData });

        if (checkData.result?.status === 'ok') {
          setStep('success');
          return;
        }

        if (checkData.result?.status === '3ds' || checkData.result?.three_ds_url) {
          setResult({ step: '3ds', data: checkData });
          setError('Требуется 3DS аутентификация. В production это будет redirect на страницу банка.');
          setStep('error');
          return;
        }

        if (['soldout', 'provider', 'book_limit', 'insufficient_b2b_balance'].includes(checkData.result?.error)) {
          setError(checkData.result.error || 'Booking failed');
          setStep('error');
          return;
        }
      }

      setError('Timeout waiting for confirmation');
      setStep('error');
    } catch (err) {
      console.error(err);
      setError('Network error');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 border rounded-xl shadow-lg space-y-4">
      <h3 className="text-lg font-bold">Сертификационные тест-кейсы</h3>
      <p className="text-xs text-slate-500">
        Используйте эти сценарии для проверки интеграции перед отправкой на сертификацию.
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => loadTestCase('single_child')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            testCase === 'single_child'
              ? 'bg-blue-900 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Тест 1: 2+1 ребенок (Узбекистан)
        </button>
        <button
          type="button"
          onClick={() => loadTestCase('multiroom')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            testCase === 'multiroom'
              ? 'bg-blue-900 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Тест 2: Multiroom
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">Тестовый отель</label>
          <input
            type="text"
            value={`HID: ${hotelHid} (${hotelName})`}
            disabled
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-slate-50"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1">Состав гостей</label>
          <div className="space-y-2">
            {rooms.map((room, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-3">
                <p className="text-xs font-semibold mb-2">Номер {idx + 1}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Взрослые</label>
                    <select
                      value={room.adults}
                      onChange={(e) => updateRoom(idx, 'adults', Number(e.target.value))}
                      className="w-full px-2 py-1 rounded border border-slate-200 text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Дети (возраст)</label>
                    <input
                      type="number"
                      min="0"
                      max="17"
                      value={room.childrenAges[0] || 0}
                      onChange={(e) => updateRoom(idx, 'childrenAges', [Number(e.target.value)])}
                      className="w-full px-2 py-1 rounded border border-slate-200 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Имя"
            value={guestData.firstName}
            onChange={(e) => setGuestData({ ...guestData, firstName: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
          />
          <input
            type="text"
            placeholder="Фамилия"
            value={guestData.lastName}
            onChange={(e) => setGuestData({ ...guestData, lastName: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={guestData.email}
            onChange={(e) => setGuestData({ ...guestData, email: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={guestData.phone}
            onChange={(e) => setGuestData({ ...guestData, phone: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
          />
        </div>

        <button
          type="button"
          onClick={runTestCase}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? 'Выполнение...' : 'Запустить тест-кейс'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4">
          <p className="text-sm font-semibold">Ошибка:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-semibold mb-2">Результат (шаг: {result.step}{result.attempt ? `, попытка ${result.attempt}` : ''}):</p>
          <pre className="text-xs overflow-auto max-h-96">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}

      {step === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4">
          <p className="text-sm font-semibold">Тест пройден!</p>
          <p className="text-xs mt-1">Partner Order ID: {partnerOrderId}</p>
        </div>
      )}
    </div>
  );
}
