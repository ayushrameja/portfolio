import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW = 60 * 1000;
// NOTE: In-memory rate limiting is per running instance and resets on cold starts.
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0]?.trim();
    if (ip) return ip;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const cfIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  return "127.0.0.1";
}

function checkRateLimit(ip: string): { limited: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return { limited: false };
  }

  if (now - record.lastRequest > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return { limited: false };
  }

  if (record.count >= MAX_REQUESTS) {
    const retryAfterMs = RATE_LIMIT_WINDOW - (now - record.lastRequest);
    const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));
    return { limited: true, retryAfterSeconds };
  }

  record.count++;
  record.lastRequest = now;
  return { limited: false };
}

function sanitize(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getRecipientEmail(): string {
  const contactEmail = process.env.CONTACT_EMAIL?.trim();
  const smtpEmail = process.env.SMTP_EMAIL?.trim();

  if (contactEmail && contactEmail !== "") {
    return contactEmail;
  }

  if (smtpEmail && smtpEmail !== "") {
    return smtpEmail;
  }

  throw new Error(
    "Email configuration error: Neither CONTACT_EMAIL nor SMTP_EMAIL is configured. Please set at least one valid email address in your environment variables."
  );
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const { limited, retryAfterSeconds } = checkRateLimit(ip);

    if (limited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: retryAfterSeconds ? { "Retry-After": retryAfterSeconds.toString() } : undefined,
        }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.length > 100) {
      return NextResponse.json(
        { error: "Invalid name." },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || !isValidEmail(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (typeof message !== "string" || message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 400 }
      );
    }

    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email);
    const sanitizedMessage = sanitize(message);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const recipientEmail = getRecipientEmail();

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: recipientEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${sanitizedName}`,
      text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #18181b; border-bottom: 2px solid #e4e4e7; padding-bottom: 12px;">New Contact Form Submission</h2>
          <div style="background: #fafafa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #52525b;">Name:</strong> ${sanitizedName}</p>
            <p style="margin: 0 0 12px 0;"><strong style="color: #52525b;">Email:</strong> <a href="mailto:${sanitizedEmail}" style="color: #a21caf;">${sanitizedEmail}</a></p>
          </div>
          <div style="background: #fff; border: 1px solid #e4e4e7; padding: 20px; border-radius: 8px;">
            <p style="margin: 0 0 8px 0;"><strong style="color: #52525b;">Message:</strong></p>
            <p style="margin: 0; color: #3f3f46; white-space: pre-wrap;">${sanitizedMessage}</p>
          </div>
          <p style="color: #a1a1aa; font-size: 12px; margin-top: 24px;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
