/**
 * Утилита для отправки email через SMTP (nodemailer)
 */

import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

export interface SmtpConfig {
  host: string;
  port: number;
  secure?: boolean;
  user: string;
  pass: string;
}

export function createSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
  };
}

export async function sendEmail(options: EmailOptions) {
  const config = createSmtpConfig();

  if (!config) {
    throw new Error('SMTP is not configured');
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const info = await transporter.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    replyTo: options.replyTo || options.from,
  });

  return info;
}

export async function sendContactFormEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const to = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

  if (!to) {
    throw new Error('CONTACT_EMAIL or SMTP_USER is not configured');
  }

  const text = `
Имя: ${name}
Email: ${email}
Тема: ${subject}

Сообщение:
${message}
  `.trim();

  const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">Новое сообщение с сайта ВЕЛЕС ВОЯЖ</h2>
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Имя:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(name)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Тема:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(subject)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Сообщение:</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${escapeHtml(message)}</td>
    </tr>
  </table>
</div>
  `.trim();

  return sendEmail({
    to,
    from: process.env.SMTP_USER || 'noreply@veles-voyage.ru',
    subject: `[ВЕЛЕС ВОЯЖ] ${subject}`,
    text,
    html,
    replyTo: email,
  });
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m] || m);
}
