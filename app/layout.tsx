import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sharrazzcafe.com'),
  title: 'Sharrazz Cafe | Rooftop Dining & Lounge in Satya Niketan',
  description: 'Experience the ultimate rooftop dining and lounge vibe at Sharrazz Cafe in Satya Niketan, Delhi. Featuring stunning views, live music, chic aesthetics, and delicious food open late.',
  openGraph: {
    title: 'Sharrazz Cafe | Rooftop Dining & Lounge',
    description: 'Experience the perfect Instagrammable vibe, great food, and live music at our Satya Niketan rooftop lounge.',
    url: 'https://www.sharrazzcafe.com',
    siteName: 'Sharrazz Cafe',
    images: [
      {
        url: '/home/college.jpg',
        width: 1200,
        height: 630,
        alt: 'Cozy and chic rooftop lounge atmosphere at Sharrazz Cafe',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}