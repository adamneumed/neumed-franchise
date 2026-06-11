import type { VercelRequest, VercelResponse } from '@vercel/node';
import { config as loadEnv } from 'dotenv';
import { resolve } from 'node:path';
import { Resend } from 'resend';

// vercel dev does not always inject .env.local into /api handlers
loadEnv({ path: resolve(process.cwd(), '.env.local') });
loadEnv({ path: resolve(process.cwd(), '.env') });

const FROM_EMAIL = 'forms@neumed.com';
const TO_EMAIL = 'franchise@neumed.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  market?: string;
  capital?: string;
  currentState?: string;
  background?: string;
  message?: string;
  consent?: string;
  _gotcha?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatHtml(data: Required<Pick<ContactPayload, 'name' | 'email' | 'phone' | 'market' | 'capital' | 'currentState'>> & ContactPayload): string {
  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Target market', data.market],
    ['Liquid capital', data.capital],
    ['Current state', data.currentState],
    ['Background', data.background || '(not provided)'],
    ['Message', data.message || '(none)'],
    ['Consent', data.consent ? 'Yes' : 'No'],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#244258;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#5E7686">${escapeHtml(String(value))}</td></tr>`,
    )
    .join('');

  return `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#244258"><h2 style="color:#244258">New franchise inquiry</h2><table style="border-collapse:collapse;width:100%;max-width:560px">${body}</table></body></html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (req.body ?? {}) as ContactPayload;

  if (body._gotcha?.trim()) {
    return res.status(400).json({ error: 'Invalid submission' });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const market = body.market?.trim();
  const capital = body.capital?.trim();
  const currentState = body.currentState?.trim();

  if (!name || !email || !phone || !market || !capital || !currentState) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return res.status(500).json({ error: 'Email service is not configured' });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New franchise inquiry from ${name}`,
      html: formatHtml({ ...body, name, email, phone, market, capital, currentState }),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
