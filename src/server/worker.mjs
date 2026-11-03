import nodemailer from 'nodemailer';
import { handleContact } from './contact.mjs';

async function sendMail(options, env) {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com', port: 465, secure: true,
    auth: { user: env.SMTP_EMAIL.trim(), pass: env.SMTP_PASSWORD },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  try { return await transport.sendMail(options); }
  finally { transport.close(); }
}

export default {
  fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path === '/api/contact' || path === '/api/contact/') return handleContact(request, env, sendMail);
    return env.ASSETS.fetch(request);
  },
};
