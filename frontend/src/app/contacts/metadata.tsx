import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact SEN SPA Da Nang | Book Massage – Best Spa Da Nang',
  description: 'Contact SEN SPA Da Nang to book your massage. Phone +84 976 591 515 • senspa.dn@gmail.com • 21 Thai Phien Street, Hai Chau, Da Nang. Open daily 10:00–21:00.',
  keywords: 'Sen Spa, Spa Da Nang, Sen Spa Da Nang',
  robots: {
    index: false,
    follow: false,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://senspadanang.com/contact',
  },
  openGraph: {
    title: 'Contact SEN SPA Da Nang | Book Massage – Best Spa Da Nang',
    description: 'Call, email or visit SEN SPA Da Nang to book your massage: +84 976 591 515 • senspa.dn@gmail.com • 21 Thai Phien Street. Open daily 10:00–21:00.',
    url: 'https://senspadanang.com/contact',
    siteName: 'SEN SPA Da Nang',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://senspadanang.com/images/seo/contact-us.jpeg',
        width: 1200,
        height: 630,
        alt: 'Contact SEN SPA Da Nang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact SEN SPA Da Nang | Book Massage – Best Spa Da Nang',
    description: 'Phone, email & address to book at SEN SPA Da Nang. Open daily 10:00–21:00.',
    images: ['https://senspadanang.com/images/seo/contact-us.jpeg'],
  },
  icons: {
    icon: '/images/favicon.ico',
  },
  other: {
    'geo.region': 'VN-ĐN',
    'geo.placename': 'Da Nang',
    'geo.position': '16.0648855;108.2230748',
    'ICBM': '16.0648855, 108.2230748',
    "googlebot": "noindex, nofollow", 
 
  },
};