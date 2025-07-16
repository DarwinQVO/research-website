import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// Import custom fonts
import { Inter, Crimson_Text } from "next/font/google";

const crimsonText = Crimson_Text({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-et-book",
  display: "swap",
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-gill-sans",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Research Services | Strategic Insights & Analysis",
  description: "Transform your business with world-class research services. We deliver comprehensive market analysis, consumer insights, and strategic intelligence for industry leaders.",
  keywords: "research services, market analysis, consumer insights, business intelligence, strategic consulting, competitive analysis",
  authors: [{ name: "Research Excellence Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Premium Research Services | Strategic Insights & Analysis",
    description: "Transform your business with world-class research services. We deliver comprehensive market analysis, consumer insights, and strategic intelligence for industry leaders.",
    type: "website",
    locale: "en_US",
    siteName: "Research Excellence",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Research Services | Strategic Insights & Analysis",
    description: "Transform your business with world-class research services. We deliver comprehensive market analysis, consumer insights, and strategic intelligence for industry leaders.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <link rel="canonical" href="https://research-excellence.pages.dev" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${crimsonText.variable} ${inter.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
