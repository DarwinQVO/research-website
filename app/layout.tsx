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
  title: "Eugenio Castro",
  description: "Professional research services for content creators. Spend less time digging and more time creating.",
  keywords: "research, content creation, podcast research, interview preparation",
  authors: [{ name: "Eugenio Castro" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Eugenio Castro - Research Services",
    description: "Professional research services for content creators. Spend less time digging and more time creating.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eugenio Castro - Research Services",
    description: "Professional research services for content creators.",
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/jpeg" sizes="32x32" href="/eugenio-icon.jpeg" />
        <link rel="icon" type="image/jpeg" sizes="16x16" href="/eugenio-icon.jpeg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/eugenio-icon.jpeg" />
        <link rel="shortcut icon" href="/favicon.ico" />
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
