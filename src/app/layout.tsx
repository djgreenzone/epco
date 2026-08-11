// 1. Necessary Imports
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
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
  title: "EPCO | Product Development & Direct Response Marketing",
  description: "We engineer physical products, source global manufacturing, and deploy full-stack direct response campaigns. Turning product ideas into eight-figure phenomena.",
  keywords: ["Product Engineering", "Global Manufacturing", "Direct Response Marketing", "Eddy Pham", "EPCO"],
  authors: [{ name: "Eddy Pham" }],
  metadataBase: new URL("https://www.eddypham.company"),
  
  openGraph: {
    title: "EPCO | From Scribbles to Scale",
    description: "We engineer physical products, source global manufacturing, and deploy full-stack direct response campaigns.",
    url: "https://www.eddypham.company",
    siteName: "EPCO International",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "EPCO | From Scribbles to Scale",
    description: "Engineering physical products and eight-figure direct response campaigns.",
  },
};

// Organization structured data (JSON-LD) — helps search engines and AI answer engines
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EPCO",
  legalName: "EPCO International",
  url: "https://www.eddypham.company",
  logo: "https://www.eddypham.company/icon.png",
  description:
    "EPCO engineers physical products, sources global manufacturing, and deploys full-stack direct response campaigns — turning product ideas into eight-figure phenomena.",
  founder: {
    "@type": "Person",
    name: "Eddy Pham",
  },
  sameAs: [
    "https://www.linkedin.com/in/eddypham/",
    "https://247eddy.substack.com/",
  ],
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
      <body className="bg-black text-white min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}