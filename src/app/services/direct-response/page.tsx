import type { Metadata } from "next";
import DirectResponseClient from "./DirectResponseClient";
import { DIRECT_RESPONSE_FAQ } from "./faq";

const TITLE = "Direct Response Marketing Agency | DRTV & Infomercials | EPCO";
const DESCRIPTION =
  "EPCO is a direct response marketing agency behind 30+ years of as-seen-on-TV hits — DRTV, infomercials, media buying, and QVC/HSN launches. 160+ products, $1B+ in retail sales.";
const URL = "https://www.eddypham.company/services/direct-response";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "direct response marketing agency",
    "DRTV agency",
    "direct response television",
    "infomercial production company",
    "as seen on tv marketing",
    "direct response media buying",
    "QVC HSN agency",
    "EPCO",
  ],
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
  serviceType: "Direct Response Marketing",
  name: TITLE,
  description: DESCRIPTION,
  url: URL,
  provider: {
    "@type": "Organization",
    name: "EPCO",
    url: "https://www.eddypham.company",
  },
  areaServed: "US",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Direct Response Marketing Services",
    itemListElement: [
      "DRTV & Infomercial Production",
      "Direct Response Media Buying",
      "QVC & HSN Launch Prep",
      "Offer & Creative Development",
      "Retail Distribution",
      "Attribution & Analytics",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DIRECT_RESPONSE_FAQ.map((f) => ({
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
      <DirectResponseClient />
    </>
  );
}
