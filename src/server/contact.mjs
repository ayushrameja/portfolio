const MAX_BODY_BYTES = 32768;
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const json = (body, status = 200, headers = {}) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });

export function validateContact(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  if (['name', 'email', 'message'].some(key => typeof body[key] !== 'string')) return null;
  const { name, email, message } = Object.fromEntries(['name', 'email', 'message'].map(key => [key, body[key].trim()]));
  if (!name || name.length > 100 || /[\r\n]/.test(name) || !emailPattern.test(email) || email.length > 254 || !message || message.length > 5000) return null;
  return { name, email, message };
}

async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const chunks = []; let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); throw new RangeError('Request too large'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(bytes);
}

export async function handleContact(request, env, sendMail) {
  if (request.method !== 'POST') return json({ error: 'Use POST to send a message.' }, 405, { Allow: 'POST' });
  if (request.headers.get('Origin') !== new URL(request.url).origin) return json({ error: 'Please send this form from the portfolio.' }, 403);
  const type = request.headers.get('Content-Type')?.split(';')[0].trim();
  if (!['application/json', 'application/x-www-form-urlencoded'].includes(type)) return json({ error: 'Unsupported content type.' }, 415);
  let body;
  try {
    const raw = await readBody(request);
    body = type === 'application/json' ? JSON.parse(raw) : Object.fromEntries(new URLSearchParams(raw));
  } catch (error) { return json({ error: 'Invalid request.' }, error instanceof RangeError ? 413 : 400); }
  const values = validateContact(body);
  if (!values) return json({ error: 'Enter a name, a valid email, and a message under 5,000 characters.' }, 400);
  const sender = env.SMTP_EMAIL?.trim();
  const recipient = env.CONTACT_EMAIL?.trim() || sender;
  if (!sender || !emailPattern.test(sender) || !recipient || !emailPattern.test(recipient) || !env.SMTP_PASSWORD || !env.CONTACT_RATE_LIMITER) return json({ error: 'Email is temporarily unavailable. Please use the email link.' }, 503);
  try {
    const ip = request.headers.get('CF-Connecting-IP') || 'local';
    const { success } = await env.CONTACT_RATE_LIMITER.limit({ key: `portfolio-contact:${ip}` });
    if (!success) return json({ error: 'Too many requests. Please try again in a minute.' }, 429, { 'Retry-After': '60' });
    const result = await sendMail({
      from: sender, to: recipient, replyTo: values.email,
      subject: `Portfolio Contact: ${values.name}`,
      text: `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`,
      disableFileAccess: true, disableUrlAccess: true,
    }, env);
    if (!result.accepted?.includes(recipient)) throw new Error('Recipient not accepted');
    if (type === 'application/x-www-form-urlencoded') {
      return new Response('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Message sent</title><h1>Message sent.</h1><p>Thank you for getting in touch.</p><a href="/#contact">Return to the portfolio</a></html>', { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Security-Policy': "default-src 'none'" } });
    }
    return json({ success: true });
  } catch (error) {
    // Log the SMTP failure code only. Messages can repeat mailbox addresses.
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : 'unknown';
    console.error(JSON.stringify({ event: 'contact_send_failed', code }));
    return json({ error: 'Unable to send your message. Please try again or use the email link.' }, 502);
  }
}
