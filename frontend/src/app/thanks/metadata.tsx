import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank you for booking service at SEN SPA Da Nang!",
  description: "We have received your reservation.",
  keywords: ["Sen Spa", "Spa Da Nang", "Sen Spa Da Nang"],
  icons: {
    icon: [
      { url: "/images/favicon.ico", type: "image/x-icon", sizes: "16x16" },
    ],
  },
  openGraph: {
    title: "Thank you for booking service at SEN SPA Da Nang!",
    description: "We have received your reservation.",
    type: "website",
  },
  other: {
    // Nếu muốn thêm tag meta hoặc script thủ công
    "data-precedence": "next",
  },
};
