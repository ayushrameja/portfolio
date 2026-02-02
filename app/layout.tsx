import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Ayush Rameja | Portfolio",
  description: "Software Engineer at Siemens - Blending design and function to craft engaging experiences",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(() => { try { const t = localStorage.getItem('theme'); const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; const next = t === 'dark' ? 'dark' : t === 'light' ? 'light' : prefersDark ? 'dark' : 'light'; if (next === 'dark') document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); } catch (e) {} })();",
          }}
        />
      </head>
      <body className="min-h-dvh bg-zinc-200 text-zinc-950 antialiased font-['Google Sans'] dark:bg-zinc-900 dark:text-zinc-100">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
