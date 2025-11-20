import type { Metadata } from "next";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Open_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import theme from "@/app/theme/theme";
import I18nProvider from "@/components/I18nProvider";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["300", "400", "600", "700"],
});

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Multi-Page Next.js App",
  description: "Example with App Router and shared layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
         */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body
        className={`${openSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <ThemeProvider theme={theme}> */}
          <I18nProvider>
            <CssBaseline />
            <Header />
            <main>{children}</main>
            <Footer />
          </I18nProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
