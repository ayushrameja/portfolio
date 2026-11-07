import tls from 'node:tls';
import nodemailer from 'nodemailer';
import { handleContact } from './contact.mjs';

const SMTP_HOST = 'smtp.gmail.com';

// Workers can open SMTP to the hostname, but the same connection to Gmail's resolved IP fails.
function openSmtpSocket() {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host: SMTP_HOST, port: 465, servername: SMTP_HOST });
    const fail = error => { socket.destroy(); reject(error); };
    socket.once('error', fail);
    socket.setTimeout(10000, () => fail(Object.assign(new Error('SMTP connection timed out'), { code: 'ETIMEDOUT' })));
    socket.once('secureConnect', () => {
      socket.removeListener('error', fail);
      socket.setTimeout(0);
      socket.pause();
      resolve(socket);
    });
  });
}

export async function sendMail(options, env) {
  const connection = await openSmtpSocket();
  const transport = nodemailer.createTransport({
    host: SMTP_HOST, port: 465, secure: true, secured: true, connection,
    auth: { user: env.SMTP_EMAIL.trim(), pass: env.SMTP_PASSWORD },
    greetingTimeout: 10000, socketTimeout: 15000,
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
