import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";
import ClientLayout from "./ClientLayout";
import { BASE_URL } from "@/constants/links";

const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  display: "optional",
  weight: "200 800",
});

const ibmPlexMono = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-600-normal.woff2",
      weight: "600",
    },
  ],
  variable: "--font-ibm-plex-mono",
  display: "optional",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Ayush Rameja | Senior Full-Stack Engineer",
  description:
    "Senior full-stack engineer building reliable product platforms across interfaces, backend services, cloud delivery, and performance.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ayush Rameja | Senior Full-Stack Engineer",
    description:
      "Reliable product platforms from interface to infrastructure.",
    type: "website",
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "Ayush Rameja — Senior full-stack engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Rameja | Senior Full-Stack Engineer",
    description: "Reliable product platforms from interface to infrastructure.",
    images: [`${BASE_URL}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      <body className={`${manrope.variable} ${ibmPlexMono.variable} min-h-dvh font-sans antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
