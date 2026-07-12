import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import CalendlyPopup from "@/components/calendly-popup";
import FooterSocialSync from "@/components/footer-social-sync";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import NavigationSync from "@/components/navigation-sync";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdigitalsupremacy.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Digital Supremacy — Email Marketing for DTC Brands",
  description:
    "Retention marketing for DTC ecommerce brands. Digital Supremacy builds email systems that turn traffic, subscribers, and customers into consistent revenue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://calendly.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <NavigationSync />
        <FooterSocialSync />
        <MobileBottomNav />
        <CalendlyPopup />
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XF72L4DM0W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XF72L4DM0W');
          `}
        </Script>
      </body>
    </html>
  );
}