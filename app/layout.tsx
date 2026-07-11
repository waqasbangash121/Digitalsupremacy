import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import FooterSocialSync from "@/components/footer-social-sync";
import NavigationSync from "@/components/navigation-sync";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdigitalsupremacy.com";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <NavigationSync />
        <FooterSocialSync />
        <Analytics />
      </body>
    </html>
  );
}
