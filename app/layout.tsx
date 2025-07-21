import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Content Research",
  description: "Research assistance for content creators. Spend less time digging and more time creating.",
  keywords: "research, content creation, podcast research, interview preparation",
  authors: [{ name: "Eugenio Castro" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Content Research",
    description: "Research assistance for content creators. Spend less time digging and more time creating.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Content Research",
    description: "Research assistance for content creators."
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/eugenio-icon.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/eugenio-icon.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/eugenio-icon.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <meta name="msapplication-config" content="none" />
        <meta name="theme-color" content="#f8fafc" />
        <meta name="msapplication-TileColor" content="#f8fafc" />
        <meta name="google" content="notranslate" />
        <meta name="robots" content="notranslate" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
