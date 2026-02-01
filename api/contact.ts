import { Resend } from 'resend';
import { z } from 'zod';

type RequestLike = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (payload: unknown) => unknown;
  setHeader: (name: string, value: string) => void;
};

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  budget: z.string().trim().max(80).optional().default(''),
  message: z.string().trim().min(1).max(4000),
  pageUrl: z.string().trim().max(2048).optional(),
  // Honeypot (should be empty)
  company: z.string().trim().max(200).optional(),
});

function getIp(req: RequestLike) {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0]?.trim();
  return undefined;
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  let body: unknown = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'Invalid payload' });
  }

  // Honeypot triggered → pretend success (reduces bot retries)
  if (parsed.data.company) {
    return res.status(200).json({ ok: true });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? from;

  if (!resendKey) return res.status(500).json({ ok: false, error: 'Missing RESEND_API_KEY' });
  if (!from) return res.status(500).json({ ok: false, error: 'Missing CONTACT_FROM_EMAIL' });
  if (!to) return res.status(500).json({ ok: false, error: 'Missing CONTACT_TO_EMAIL' });

  const { name, email, budget, message, pageUrl } = parsed.data;
  const ip = getIp(req);
  const userAgent = req.headers?.['user-agent'];

  const subject = `New inquiry — ${name}${budget ? ` (${budget})` : ''}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    budget ? `Budget: ${budget}` : 'Budget: (not specified)',
    pageUrl ? `Page: ${pageUrl}` : undefined,
    ip ? `IP: ${ip}` : undefined,
    userAgent ? `User-Agent: ${userAgent}` : undefined,
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n');

  const resend = new Resend(resendKey);

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
    });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
}
