import type { Metadata, Viewport } from "next";

import "./globals.css";
import ClientLayout from "./ClientLayout";
import { BASE_URL } from "@/constants/links";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Ayush Rameja | Portfolio",
  description:
    "Software Engineer at Quarks building fast, thoughtful web experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="overflow-x-hidden"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@100..900&family=Lora:wght@400..700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Ayush Rameja" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(() => { try { const t = localStorage.getItem('theme'); const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; const next = t === 'dark' ? 'dark' : t === 'light' ? 'light' : prefersDark ? 'dark' : 'light'; if (next === 'dark') { document.documentElement.classList.add('dark'); document.documentElement.style.colorScheme = 'dark'; } else { document.documentElement.classList.remove('dark'); document.documentElement.style.colorScheme = 'light'; } } catch (e) {} })();",
          }}
        />
      </head>
      <body className="min-h-dvh overflow-x-hidden bg-zinc-200 font-sans text-zinc-950 antialiased dark:bg-zinc-900 dark:text-zinc-100">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
