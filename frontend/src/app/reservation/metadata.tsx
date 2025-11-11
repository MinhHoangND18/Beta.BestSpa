import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservation | SEN SPA Da Nang – Book Your Massage Now",
  description:
    "Reserve your massage at SEN SPA Da Nang. Choose your service, time, and guests. Enjoy 10% off during happy hour from 10 AM to 1 PM. Book now!",
  keywords: ["Sen Spa", "Spa Da Nang", "Sen Spa Da Nang"],
  alternates: {
    canonical: "https://senspadanang.com/reservation",
  },
  openGraph: {
    title: "Reservation | SEN SPA Da Nang – Book Your Massage Now",
    description:
      "Reserve your massage online at SEN SPA Da Nang. Select service, time, and guest numbers. Don't miss 10% happy hour discount (10 AM–1 PM)!",
    url: "https://senspadanang.com/reservation",
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://senspadanang.com/images/seo/reservation.jpeg",
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang Reservation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reservation | SEN SPA Da Nang – Book Your Massage Now",
    description:
      "Select your massage, time, and guest count. 10% off happy hour 10 AM–1 PM. Reserve now!",
    images: [
      "https://senspadanang.com/images/seo/reservation.jpeg",
    ],
  },
  robots: {
    index: false,
    follow: false,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  icons: {
    icon: {
      url: "/images/favicon.ico",
      type: "image/x-icon",
      sizes: "16x16",
    },
  },
  other: {
    "geo.region": "VN-ĐN",
    "geo.placename": "Da Nang",
    "geo.position": "16.0648855;108.2230748",
    ICBM: "16.0648855, 108.2230748",
    "googlebot": "noindex, nofollow",
  },
};
