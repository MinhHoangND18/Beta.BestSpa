import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | SEN SPA Da Nang – Photos of Our Spa & Treatments",
  description:
    "Explore SEN SPA Da Nang's gallery: interior, private couple rooms, and treatment highlights. See why we are rated among the best spas in Da Nang.",
  keywords: ["Sen Spa", "Spa Da Nang", "Sen Spa Da Nang"],
  alternates: {
    canonical: "https://senspadanang.com/gallery",
  },
  robots: {
    index: false,
    follow: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  openGraph: {
    title: "Gallery | SEN SPA Da Nang – Photos of Our Spa & Treatments",
    description:
      "View our spa interiors, couple rooms and treatment highlights in the SEN SPA Da Nang gallery.",
    url: "https://senspadanang.com/gallery",
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://senspadanang.com/images/senspa-gallery-cover.jpg",
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | SEN SPA Da Nang – Photos of Our Spa & Treatments",
    description:
      "See our gallery of interiors, private rooms and massage highlights.",
    images: [
      "https://senspadanang.com/images/senspa-gallery-cover.jpg",
    ],
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
