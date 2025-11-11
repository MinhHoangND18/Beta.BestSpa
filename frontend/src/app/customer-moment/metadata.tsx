import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Moments | SEN SPA Da Nang – Real Experiences & Photos",

  description:
    "See real customer moments at SEN SPA Da Nang: happy smiles, relaxing treatments, and memorable experiences captured in photos and short videos.",
  keywords: ["Sen Spa", "Spa Da Nang", "Sen Spa Da Nang"],
  robots: {
    index: false,
    follow: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  alternates: {
    canonical: "https://senspadanang.com/customer-moment",
  },
  openGraph: {
    title: "Customer Moments | SEN SPA Da Nang – Real Experiences & Photos",
    description:
      "Authentic customer moments from SEN SPA Da Nang: images and short clips of relaxing, happy experiences.",
    url: "https://senspadanang.com/customer-moment",
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://senspadanang.com/images/senspa-customer-moment.jpg",
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang Customer Moments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Moments | SEN SPA Da Nang – Real Experiences & Photos",
    description:
      "Browse real customer moments in photos and short videos from SEN SPA Da Nang.",
    images: ["https://senspadanang.com/images/senspa-customer-moment.jpg"],
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
