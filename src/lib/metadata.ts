
import { Metadata } from "next";
import { siteConfig } from "./data";

export function constructMetadata({
  title,
  description,
  image,
  icons,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    openGraph: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [{ url: image || "/images/logoweb.png" }],
      url: siteConfig.url,
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [image || "/images/logoweb.png"],
      creator: "@homecleanrd",
    },
    icons: icons || "/favicon.ico",
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    alternates: {
      canonical: siteConfig.url,
    },
  };
}
