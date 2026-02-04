import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ayush Rameja | Portfolio",
  description: "Software Engineer at Autodesk building fast, thoughtful web experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Ayush Rameja" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(() => { try { const t = localStorage.getItem('theme'); const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; const next = t === 'dark' ? 'dark' : t === 'light' ? 'light' : prefersDark ? 'dark' : 'light'; if (next === 'dark') document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); } catch (e) {} document.documentElement.dataset.initialLoad = 'true'; })();",
          }}
        />
      </head>
      <body className="min-h-dvh bg-zinc-200 font-sans text-zinc-950 antialiased dark:bg-zinc-900 dark:text-zinc-100">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
