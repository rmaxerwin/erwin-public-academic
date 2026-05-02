import type { Metadata } from "next";
import { Source_Serif_4, Public_Sans, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Erwin Public · Academic",
    template: "%s · Erwin Public",
  },
  description:
    "Texas Essential Knowledge and Skills, browseable. Public domain, free, and ready to use.",
  openGraph: {
    title: "Erwin Public · Academic",
    description:
      "Texas Essential Knowledge and Skills, browseable. Public domain, free, and ready to use.",
    type: "website",
    siteName: "Erwin Public · Academic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erwin Public · Academic",
    description:
      "Texas Essential Knowledge and Skills, browseable. Public domain, free, and ready to use.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
