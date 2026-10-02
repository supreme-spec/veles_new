/**
 * API route для отправки email через формы
 * Защищен CSRF middleware
 */

import { NextRequest, NextResponse } from 'next/server';
import { withCSRFProtection } from '@/shared/middleware/csrf';
import { safeLogger } from '@/shared/utils/safeLogger';
import { sendContactFormEmail } from '@/shared/utils/email';

interface EmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * POST /api/send-email
 * Отправляет email сообщение
 * Защищен CSRF токеном
 */
async function handleSendEmail(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json();

    // Валидация данных
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Отправляем email через SMTP
    const result = await sendContactFormEmail({
      name: body.name,
      email: body.email,
      subject: body.subject || 'Сообщение с сайта ВЕЛЕС ВОЯЖ',
      message: body.message,
    });

    safeLogger.info('Email sent successfully', {
      messageId: result.messageId,
      accepted: result.accepted,
      envelope: result.envelope,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    safeLogger.error('Send email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

// Экспортируем handler с CSRF защитой
export const POST = withCSRFProtection(handleSendEmail);
