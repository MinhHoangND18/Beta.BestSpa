import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu & Prices | SEN SPA Da Nang – Best Spa Da Nang",
  description:
    "See SEN SPA Da Nang's full menu & prices: aroma, hot stone, Thai stretch (no oil), foot massage, couple rooms. Book the best spa in Da Nang today.",
  keywords: [
    "best spa da nang",
    "da nang massage",
    "spa menu",
    "spa prices da nang",
    "couple massage da nang",
    "aroma massage da nang",
    "hot stone da nang",
  ],
  alternates: {
    canonical: "https://senspadanang.com/menu",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Menu & Prices | SEN SPA Da Nang – Best Spa Da Nang",
    description:
      "Explore our full spa menu and prices in Da Nang: aroma, hot stone, Thai stretch, foot massage, couple massage. Book now.",
    url: "https://senspadanang.com/menu",
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://senspadanang.com/images/menu.jpeg",
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang Menu & Prices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Massage Menu & Prices | SEN SPA Da Nang – Best Spa Da Nang",
    description:
      "See our full service menu & prices. Luxury treatments for couples & families in Da Nang.",
    images: ["https://senspadanang.com/images/seo/menu.jpeg"],
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