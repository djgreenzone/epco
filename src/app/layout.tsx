// 1. Necessary Imports
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 2. Font Loading (High-end tech aesthetic)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 3. YOUR OPTIMIZED METADATA OBJECT
// Controls everything the scrapers see (Google, X, LinkedIn)
export const metadata: Metadata = {
  title: "EPCO | From Scribbles to Scale",
  description: "We engineer physical products, source global manufacturing, and deploy full-stack direct response campaigns. Turning product ideas into eight-figure phenomena.",
  keywords: ["Product Engineering", "Global Manufacturing", "Direct Response Marketing", "Eddy Pham", "EPCO"],
  authors: [{ name: "Eddy Pham" }],
  // Important for absolute paths in social sharing
  metadataBase: new URL("https://epco.vercel.app"),
  
  // OpenGraph (Facebook, LinkedIn, Discord previews)
  openGraph: {
    title: "EPCO | From Scribbles to Scale",
    description: "We engineer physical products, source global manufacturing, and deploy full-stack direct response campaigns.",
    url: "https://epco.vercel.app",
    siteName: "EPCO International",
    images: [
      {
        // Points to /public/epco-og-scribbles-to-scale.jpg
        url: "/epco-og-scribbles-to-scale.jpg", 
        width: 1200, 
        height: 630, 
        alt: "EPCO - From Scribbles to Scale",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter / X Card Previews
  twitter: {
    card: "summary_large_image",
    title: "EPCO | From Scribbles to Scale",
    description: "Engineering physical products and eight-figure direct response campaigns.",
    // Points to /public/epco-og-scribbles-to-scale.jpg
    images: ["/epco-og-scribbles-to-scale.jpg"], 
  },
};

// 4. THE REQUIRED DEFAULT EXPORT FUNCTION (The Website Skeleton)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // scroll-smooth activates the internal glide engine. h-full ensures full height.
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      {/* 5. Established dark mode theme base for EPCO */}
      <body className="bg-[#0b0e14] text-white min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}