import { Metadata } from "next";
import { siteConfig } from "./data";

export function constructMetadata({
  title,
  description,
  image,
  icons,
  path = "",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  /** Ruta de la página, p. ej. "/products/jabon-de-cuaba". Vacío = home. */
  path?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const pageUrl = `${siteConfig.url}${path}`;

  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    openGraph: {
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [{ url: image || "/images/logoweb.png" }],
      url: pageUrl,
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
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {
          alternates: {
            canonical: pageUrl,
          },
        }),
  };
}
