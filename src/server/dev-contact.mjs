import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { handleContact } from './contact.mjs';
import { sendMail } from './worker.mjs';

const hits = new Map();
const limiter = {
  async limit({ key }) {
    const now = Date.now();
    const recent = (hits.get(key) || []).filter(time => now - time < 60000);
    if (recent.length >= 3) {
      hits.set(key, recent);
      return { success: false };
    }
    recent.push(now);
    hits.set(key, recent);
    return { success: true };
  },
};

function readDevVars() {
  const path = resolve('.dev.vars');
  if (!existsSync(path)) return {};
  const env = {};
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    env[key] = value;
  }
  return env;
}

function mailEnv() {
  const file = readDevVars();
  return {
    SMTP_EMAIL: process.env.SMTP_EMAIL || file.SMTP_EMAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || file.SMTP_PASSWORD,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL || file.CONTACT_EMAIL,
    CONTACT_RATE_LIMITER: limiter,
  };
}

async function proxyToLive(request) {
  const upstream = await fetch('https://ayush.im/api/contact', {
    method: 'POST',
    headers: {
      'content-type': request.headers.get('content-type') || 'application/json',
      accept: 'application/json',
      origin: 'https://ayush.im',
      'user-agent': 'Mozilla/5.0',
    },
    body: await request.arrayBuffer(),
  });
  return new Response(await upstream.arrayBuffer(), {
    status: upstream.status,
    headers: {
      'content-type': upstream.headers.get('content-type') || 'application/json',
      'cache-control': 'no-store',
    },
  });
}

// Astro dev serves pages only. Use local SMTP when it is configured, and otherwise
// deliver through the live contact endpoint that already has the mail secrets.
export async function handleDevContact(request) {
  const env = mailEnv();
  if (env.SMTP_EMAIL && env.SMTP_PASSWORD) return handleContact(request, env, sendMail);
  return proxyToLive(request);
}
