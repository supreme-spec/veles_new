import { NextResponse } from 'next/server';
import { ostrovokClient } from '@/lib/ostrovok/client';
import { checkRateLimit, getUserKey } from '@/lib/rate-limiter';
import { bookingStartSchema } from '@/lib/validation';

export const runtime = 'nodejs';

const RETRYABLE_ERRORS = ['timeout', 'unknown', 'duplicate_reservation', 'double_booking_form'];

export async function POST(req: Request) {
  const userKey = getUserKey(req);
  if (!(await checkRateLimit(`booking:start:${userKey}`, 10, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = bookingStartSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid booking params', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      partnerOrderId,
      rooms,
      user,
      paymentType,
      supplierData,
      returnPath,
      upsellData,
      arrivalDatetime,
      language,
    } = parsed.data;

    const maxRetries = 10;
    let lastError: any = null;
    let currentPartnerOrderId = partnerOrderId;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 1) {
          currentPartnerOrderId = `order-${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
        }

        const result = await ostrovokClient.startBookingProcess({
          partner: { partnerOrderId: currentPartnerOrderId },
          rooms,
          user,
          paymentType,
          supplierData,
          returnPath,
          upsellData,
          arrivalDatetime,
          language: language || 'ru',
        });

        if (result.status === 'ok' || result.result?.status === 'ok') {
          return NextResponse.json({ result, attempt, partnerOrderId: currentPartnerOrderId });
        }

        lastError = result;

        const isRetryable = result.status === 'error' && RETRYABLE_ERRORS.some(e => result.error?.includes(e));

        if (!isRetryable) {
          return NextResponse.json(
            {
              error: result.error || 'Start booking failed',
              status: result.status,
              attempt,
              message: getErrorMessage(result.error),
            },
            { status: 400 }
          );
        }
      } catch (error: any) {
        lastError = error;
        const ostrovokError = error?.response?.data?.error || error?.response?.data?.message || error.message;
        const debugPayload = error?.response?.data?.debug?.request || error?.response?.data;
        console.error(`[START BOOKING ERROR attempt ${attempt}]:`, ostrovokError, JSON.stringify(debugPayload));
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          continue;
        }
        return NextResponse.json(
          {
            error: ostrovokError || 'Start booking failed',
            message: getErrorMessage(ostrovokError),
            status: error?.response?.status || 400,
            attempt,
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        error: lastError?.error || lastError?.message || 'Start booking failed after retries',
        attempts: maxRetries,
        message: getErrorMessage(lastError?.error || lastError?.message),
      },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('[START BOOKING ERROR]:', error);
    const ostrovokError = error?.response?.data?.error || error?.response?.data?.message || error.message;
    const debugPayload = error?.response?.data?.debug?.request || error?.response?.data;
    console.error('[START BOOKING OSTROVOK RESPONSE]:', JSON.stringify(debugPayload));
    return NextResponse.json(
      {
        error: ostrovokError || 'Start booking failed',
        message: getErrorMessage(ostrovokError),
      },
      { status: 400 }
    );
  }
}

function getErrorMessage(errorCode: string): string {
  const messages: Record<string, string> = {
    timeout: 'Сервис временно недоступен. Попробуйте позже.',
    unknown: 'Неизвестная ошибка. Попробуйте ещё раз.',
    duplicate_reservation: 'Этот заказ уже создан.',
    double_booking_form: 'Форма бронирования уже открыта.',
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
