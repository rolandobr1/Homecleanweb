import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { constructMetadata } from "@/lib/metadata";
import { LocalBusinessSchema } from "@/components/seo/JsonLd";
import Script from "next/script";
import WhatsAppTracker from "@/components/analytics/WhatsAppTracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const { alternates: _canonicalDeLaHome, ...baseMetadata } = constructMetadata();
// El canonical lo declara cada página; el layout no lo impone para que ninguna lo herede por error.
export const metadata: Metadata = baseMetadata;

// Barra del navegador en el celular del mismo azul que el header (--primary).
export const viewport: Viewport = {
  themeColor: "#216dc4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="!scroll-smooth">
      <head>
        <LocalBusinessSchema />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RLPF7FYX39"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RLPF7FYX39');
          `}
        </Script>
      </head>
      <body className={`${inter.className} font-body antialiased bg-background`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
        <WhatsAppTracker />
      </body>
    </html>
  );
}
