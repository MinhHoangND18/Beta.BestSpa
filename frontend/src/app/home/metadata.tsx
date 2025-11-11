import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEN SPA Da Nang | Best Spa Da Nang for Massage & Relaxation",
  description:
    "Discover SEN SPA – the best spa Da Nang for massage, relaxation & wellness. Experience luxury treatments in Da Nang's most trusted spa.",
  keywords: ["Sen Spa", "Spa Da Nang", "Sen Spa Da Nang"],
  alternates: {
    canonical: "https://senspadanang.com/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "SEN SPA Da Nang | Best Spa Da Nang for Massage & Relaxation",
    description:
      "Discover SEN SPA – the best spa Da Nang for massage, relaxation & wellness. Book your spa experience today.",
    url: "https://senspadanang.com/",
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/home.jpg",
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEN SPA Da Nang | Best Spa Da Nang for Massage & Relaxation",
    description:
      "Discover SEN SPA – the best spa Da Nang for massage, relaxation & wellness. Book your spa experience today.",
    images: ["https://senspadanang.com/images/home.jpg"],
  },
  icons: {
    icon: { url: "./images/favicon.ico", type: "image/x-icon", sizes: "16x16" },
  },
  other: {
    "geo.region": "VN-ĐN",
    "geo.placename": "Da Nang",
    "geo.position": "16.0648855;108.2230748",
    ICBM: "16.0648855, 108.2230748",
  },
};
