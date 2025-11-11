import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Spa Packages | SEN SPA Da Nang – Best Spa Da Nang",
  description:
    "Explore SEN SPA Da Nang's featured spa products & packages: signature massages, couple rooms & seasonal offers. Experience the best spa in Da Nang.",
  keywords: ["Sen Spa", "Spa Da Nang", "Sen Spa Da Nang"],
  alternates: {
    canonical: "https://senspadanang.com/featured-products",
  },
  openGraph: {
    title: "Featured Spa Packages | SEN SPA Da Nang – Best Spa Da Nang",
    description:
      "Discover featured spa services, signature treatments and special packages at SEN SPA Da Nang.",
    url: "https://senspadanang.com/featured-products",
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://senspadanang.com/images/products.jpg",
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang Featured Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Featured Spa Packages | SEN SPA Da Nang – Best Spa Da Nang",
    description: "Highlighted spa services & packages at SEN SPA Da Nang.",
    images: [
      "https://senspadanang.com/images/seo/products.jpg",
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
