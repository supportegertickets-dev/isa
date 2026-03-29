import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'portfolio.json');

function getContactEmail() {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    return data.contact?.email || process.env.ADMIN_EMAIL;
  } catch {
    return process.env.ADMIN_EMAIL;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const recipientEmail = getContactEmail();
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: 'Portfolio Contact Form', email: process.env.BREVO_SENDER_EMAIL || recipientEmail },
        to: [{ email: recipientEmail, name: 'Portfolio Owner' }],
        replyTo: { email, name: safeName },
        subject: `Portfolio Contact: ${safeName}`,
        htmlContent: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e293b, #334155); padding: 32px; border-radius: 16px 16px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Message</h1>
            </div>
            <div style="background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 16px 16px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600; width: 80px;">Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 13px; font-weight: 600;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #2563eb;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #64748b; font-size: 13px; font-weight: 600; vertical-align: top;">Message</td>
                  <td style="padding: 12px 0; color: #1e293b; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</td>
                </tr>
              </table>
            </div>
          </div>
        `,
      }),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errData = await res.json().catch(() => ({}));
      console.error('Brevo API error:', errData);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
