import type { Metadata } from "next";

import { BASE_URL } from "@/constants/links";

type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: SocialImage;
};

const defaultImage: SocialImage = {
  url: `${BASE_URL}/og.png`,
  width: 1200,
  height: 630,
  alt: "Ayush Rameja — Senior full-stack engineer",
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  image = defaultImage,
}: PageMetadataInput): Metadata {
  const url = new URL(path, BASE_URL).toString();

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
