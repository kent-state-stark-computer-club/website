// Vercel Serverless Function: Zero-dependency contact handler using native fetch & Resend
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch (_) {
      const params = new URLSearchParams(req.body);
      return Object.fromEntries(params.entries());
    }
  }
  // If streaming body (raw Node request)
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw));
      } catch (_) {
        const params = new URLSearchParams(raw);
        resolve(Object.fromEntries(params.entries()));
      }
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = await parseBody(req);
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !to) {
      console.warn('RESEND_API_KEY or CONTACT_TO_EMAIL is not set in environment.');
      // Graceful fallback redirect so users don't see an ugly 500 error page
      const acceptsJson = req.headers.accept && req.headers.accept.includes('application/json');
      if (acceptsJson) {
        return res.status(200).json({ ok: true, notice: 'Contact form received (pending email setup).' });
      }
      res.writeHead(303, { Location: '/?contact=sent' });
      return res.end();
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: [to],
        subject: `Website message from ${email}`,
        html: `<p><strong>From:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message)}</p>`,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend API failed:', errText);
      return res.status(502).json({ error: 'Failed to send email via Resend' });
    }

    const acceptsJson = req.headers.accept && req.headers.accept.includes('application/json');
    if (acceptsJson) {
      return res.status(200).json({ ok: true });
    }

    res.writeHead(303, { Location: '/?contact=sent' });
    return res.end();
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
