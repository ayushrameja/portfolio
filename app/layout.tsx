import type { Metadata, Viewport } from "next";

import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./portfolio.css";
import ClientLayout from "./ClientLayout";
import { BASE_URL } from "@/constants/links";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Ayush Rameja | Engineer + Maker",
  description:
    "Full-stack engineer building scalable web platforms with React, Next.js, Node.js, and AWS. Based in Bangalore, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
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
      </head>
      <body className="min-h-dvh overflow-x-hidden font-sans antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
