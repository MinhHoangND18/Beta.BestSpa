import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking | SEN SPA Da Nang",
  description:
    "Booking endpoint for SEN SPA Da Nang. This page redirects to the homepage.",
  keywords: ["Sen Spa", "Spa Da Nang", "Sen Spa Da Nang"],
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
  },
  alternates: {
    canonical: "https://senspadanang.com/",
  },
  openGraph: {
    title: "SEN SPA Da Nang",
    description: "Redirecting to SEN SPA Da Nang.",
    url: "https://senspadanang.com/",
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/booking.jpeg",
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEN SPA Da Nang",
    description: "Redirecting to SEN SPA Da Nang.",
    images: ["https://senspadanang.com/images/seo/booking.jpeg"],
  },
  icons: {
    icon: {
      url: "/images/favicon.ico",
      type: "image/x-icon",
      sizes: "16x16",
    },
  },
  other: {
    "googlebot": "noindex, nofollow", // Tương đương với <meta name="googlebot" content="noindex, nofollow">
  },
};
