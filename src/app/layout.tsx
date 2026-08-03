// 1. Necessary Imports
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
export const metadata: Metadata = {
  title: "EPCO | From Scribbles to Scale",
  description: "We engineer physical products, source global manufacturing, and deploy full-stack direct response campaigns. Turning product ideas into eight-figure phenomena.",
  keywords: ["Product Engineering", "Global Manufacturing", "Direct Response Marketing", "Eddy Pham", "EPCO"],
  authors: [{ name: "Eddy Pham" }],
  metadataBase: new URL("https://www.eddypham.company"),
  
  openGraph: {
    title: "EPCO | From Scribbles to Scale",
    description: "We engineer physical products, source global manufacturing, and deploy full-stack direct response campaigns.",
    url: "https://www.eddypham.company",
    siteName: "EPCO International",
    images: [
      {
        url: "/epco-og-scribbles-to-scale.jpg", 
        width: 1200, 
        height: 630, 
        alt: "EPCO - From Scribbles to Scale",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "EPCO | From Scribbles to Scale",
    description: "Engineering physical products and eight-figure direct response campaigns.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="bg-[#0b0e14] text-white min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}