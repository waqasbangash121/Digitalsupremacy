import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
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
      <body>{children}</body>
    </html>
  );
}
