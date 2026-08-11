import type { Metadata } from "next";
import DigitalMarketingClient from "./DigitalMarketingClient";
import { DIGITAL_MARKETING_FAQ } from "./faq";

const TITLE = "Data-Driven Digital Marketing Agency | EPCO";
const DESCRIPTION =
  "Nine growth channels run as one revenue engine — social, SEO & SEM, paid ads, lead generation, sales funnels, email, production, and AI automation. Full-funnel, data-driven marketing built to scale brands to eight figures.";
const URL = "https://www.eddypham.company/services/digital-marketing";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "EPCO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Digital Marketing",
  name: TITLE,
  description: DESCRIPTION,
  url: URL,
  provider: {
    "@type": "Organization",
    name: "EPCO",
    url: "https://www.eddypham.company",
  },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Marketing Services",
    itemListElement: [
      "Social Media Management",
      "End-to-End Production",
      "SEO & SEM",
      "Paid Ads Optimization",
      "Lead Generation",
      "Sales Funnels",
      "Email Marketing",
      "AI Automation",
      "Website Development",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DIGITAL_MARKETING_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DigitalMarketingClient />
    </>
  );
}
