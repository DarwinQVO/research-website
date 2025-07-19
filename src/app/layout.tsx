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
  title: "Research | Coming Soon",
  description: "The new way to do professional research. Be the first to know about our next-generation research platform.",
  keywords: "research services, professional research, coming soon, data analysis, market research",
  authors: [{ name: "Eugenio Castro" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Research | Coming Soon",
    description: "The new way to do professional research. Be the first to know about our next-generation research platform.",
    type: "website",
    locale: "en_US",
    siteName: "Research",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research | Coming Soon",
    description: "The new way to do professional research. Be the first to know about our next-generation research platform.",
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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <link rel="canonical" href="https://eugeniocastro.com" />
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
