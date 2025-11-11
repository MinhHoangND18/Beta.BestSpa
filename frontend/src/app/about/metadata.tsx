import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SEN SPA Da Nang – Best Spa Da Nang",
  description:
    "Learn about SEN SPA Da Nang – a hidden oasis of tranquility where therapists nurture the body, mind, and soul through expert massage therapies.",
  keywords: ["Sen Spa", "Spa Da Nang", "Sen Spa Da Nang"],
  robots: {
    index: false, // Tương đương với <meta name="robots" content="noindex">
    follow: false,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://senspadanang.com/about-us",
  },
  openGraph: {
    title: "About Us | SEN SPA Da Nang – Best Spa Da Nang",
    description:
      "Discover SEN SPA Da Nang, a hidden relaxing oasis where your body, mind, and spirit are pampered by professional therapists.",
    url: "https://senspadanang.com/about-us",
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://senspadanang.com/images/about-us.jpeg",
        width: 1200,
        height: 630,
        alt: "About SEN SPA Da Nang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | SEN SPA Da Nang – Best Spa Da Nang",
    description:
      "Discover SEN SPA Da Nang, an oasis of tranquility where body, mind, and spirit are pampered by professional therapists.",
    images: ["https://senspadanang.com/images/seo/about-us.jpeg"],
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
