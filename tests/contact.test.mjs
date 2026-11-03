import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleContact } from '../src/server/contact.mjs';
import { fieldError } from '../src/scripts/contact-form.ts';
const data = { name: 'Portfolio test', email: 'visitor@example.com', message: 'Synthetic delivery test.' };
const env = { SMTP_EMAIL: 'sender@example.com', SMTP_PASSWORD: 'fake-test-value', CONTACT_EMAIL: 'inbox@example.com', CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) } };
const request = (body = data, headers = {}, method = 'POST') => new Request('https://portfolio.test/api/contact', { method, headers: { Origin: 'https://portfolio.test', 'Content-Type': 'application/json', ...headers }, ...(method === 'POST' ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}) });

test('contact validation rejects malformed requests before sending', async () => {
  let sends = 0; const send = async () => { sends++; };
  for (const [req, status] of [
    [request(data, {}, 'GET'), 405], [request(data, { Origin: 'https://elsewhere.test' }), 403],
    [request(data, { 'Content-Type': 'text/plain' }), 415], [request('{'), 400],
    [request(null), 400], [request({ ...data, name: ' ' }), 400],
    [request({ ...data, name: 'Name\r\nBcc: target@example.com' }), 400],
    [request({ ...data, email: 'not-email' }), 400], [request({ ...data, message: 'x'.repeat(5001) }), 400],
    [request('x'.repeat(32769)), 413],
  ]) assert.equal((await handleContact(req, env, send)).status, status);
  assert.equal(sends, 0);
});

test('rate limits and missing configuration never invoke SMTP', async () => {
  let sends = 0; const send = async () => { sends++; };
  assert.equal((await handleContact(request(), { ...env, SMTP_PASSWORD: '' }, send)).status, 503);
  assert.equal((await handleContact(request(), { ...env, CONTACT_RATE_LIMITER: null }, send)).status, 503);
  const limited = await handleContact(request(), { ...env, CONTACT_RATE_LIMITER: { limit: async () => ({ success: false }) } }, send);
  assert.equal(limited.status, 429); assert.equal(limited.headers.get('Retry-After'), '60'); assert.equal(sends, 0);
});

test('SMTP envelope uses configured identities and a plain-text visitor message', async () => {
  let mail;
  const response = await handleContact(request({ ...data, message: '<script>test</script>' }), env, async options => { mail = options; return { accepted: [env.CONTACT_EMAIL] }; });
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(mail.to, env.CONTACT_EMAIL); assert.equal(mail.from, env.SMTP_EMAIL); assert.equal(mail.replyTo, data.email);
  assert.equal(mail.html, undefined); assert.match(mail.text, /<script>test<\/script>/);
});

test('rejected SMTP responses do not produce a false success or expose errors', async () => {
  for (const send of [async () => { throw new Error('private SMTP credential details'); }, async () => ({ accepted: [] })]) {
    const response = await handleContact(request(), env, send);
    assert.equal(response.status, 502); assert.doesNotMatch(await response.text(), /private SMTP/);
  }
});

test('native no-JavaScript form submission sends then renders a confirmation', async () => {
  const response = await handleContact(request(new URLSearchParams(data).toString(), { 'Content-Type': 'application/x-www-form-urlencoded' }), env, async () => ({ accepted: [env.CONTACT_EMAIL] }));
  assert.equal(response.status, 200); assert.match(response.headers.get('Content-Type'), /text\/html/); assert.match(await response.text(), /Message sent/);
});

test('field validation provides specific errors and accepts trimmed valid input', () => {
  assert.ok(fieldError('name', ' ')); assert.ok(fieldError('email', 'incomplete@'));
  assert.ok(fieldError('message', 'x'.repeat(5001)));
  for (const [name, value] of Object.entries(data)) assert.equal(fieldError(name, ` ${value} `), '');
});
