import { NextResponse } from 'next/server';
import { ostrovokClient } from '@/lib/ostrovok/client';
import { checkRateLimit, getUserKey } from '@/lib/rate-limiter';

export const runtime = 'nodejs';

const FINAL_ERRORS = [
  'block',
  'charge',
  'soldout',
  'provider',
  'book_limit',
  'contract_mismatch',
  'hotel_not_found',
  'rate_not_found',
  'insufficient_b2b_balance',
  'not_allowed',
];
const RETRYABLE_ERRORS = ['timeout', 'unknown'];

export async function POST(req: Request) {
  const userKey = getUserKey(req);
  if (!(await checkRateLimit(`booking:check:${userKey}`, 30, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { partnerOrderId, maxAttempts = 30, intervalMs = 3000, singleCall = false } = body;

    if (!partnerOrderId) {
      return NextResponse.json({ error: 'partnerOrderId is required' }, { status: 400 });
    }

    if (singleCall) {
      const result = await ostrovokClient.checkBookingProcess(partnerOrderId);
      return NextResponse.json({ result, mode: 'single' });
    }

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const result = await ostrovokClient.checkBookingProcess(partnerOrderId);
        const status = result?.result?.status || result?.status;
        const error = result?.result?.error || result?.error;
        const threeDsUrl = result?.result?.three_ds_url || result?.result?.data?.three_ds_url;

        if (status === 'ok') {
          return NextResponse.json({
            success: true,
            confirmed: true,
            attempt,
            result: result.result || result,
            partnerOrderId: result.result?.partner_order_id || partnerOrderId,
            ostrovokOrderId: result.result?.ostrovok_order_id,
          });
        }

        if (status === '3ds' || threeDsUrl) {
          return NextResponse.json({
            success: false,
            needs3ds: true,
            threeDsUrl,
            status,
            attempt,
            result: result.result || result,
          });
        }

        if (status === 'processing' || (error && RETRYABLE_ERRORS.includes(error))) {
          if (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, intervalMs));
            continue;
          }
        }

        if (error && FINAL_ERRORS.includes(error)) {
          return NextResponse.json(
            {
              success: false,
              failed: true,
              error,
              message: getErrorMessage(error),
              attempt,
              result: result.result || result,
            },
            { status: 400 }
          );
        }

        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, intervalMs));
          continue;
        }

        return NextResponse.json(
          {
            success: false,
            stillProcessing: true,
            status,
            error,
            attempt,
            maxAttempts,
            message: 'Бронирование ещё обрабатывается',
            result: result.result || result,
          },
          { status: 202 }
        );
      } catch (error: any) {
        if ((error.response?.status >= 500 || !error.response?.status) && attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, intervalMs));
          continue;
        }
        throw error;
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: 'booking_timeout',
        maxAttempts,
        partnerOrderId,
        message: 'Превышено время ожидания подтверждения',
      },
      { status: 504 }
    );
  } catch (error: any) {
    console.error('[CHECK BOOKING ERROR]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

function getErrorMessage(errorCode: string): string {
  const messages: Record<string, string> = {
    block: 'Бронирование отклонено. Свяжитесь с поддержкой.',
    charge: 'Ошибка оплаты. Деньги не списаны.',
    soldout: 'Номер больше недоступен.',
    provider: 'Ошибка поставщика. Попробуйте позже.',
    book_limit: 'Превышен лимит бронирований.',
    contract_mismatch: 'Ошибка контракта. Свяжитесь с поддержкой.',
    hotel_not_found: 'Отель не найден.',
    rate_not_found: 'Тариф больше недоступен.',
    insufficient_b2b_balance: 'Ошибка бронирования. Свяжитесь с поддержкой.',
    not_allowed: 'Бронирование недоступно для выбранного аккаунта/отеля. Свяжитесь с поддержкой Велес Вояж.',
  };
  return messages[errorCode] || `Ошибка: ${errorCode}`;
}
