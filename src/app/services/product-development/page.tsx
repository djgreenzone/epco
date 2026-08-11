import type { Metadata } from "next";
import ProductDevelopmentClient from "./ProductDevelopmentClient";
import { PRODUCT_DEVELOPMENT_FAQ } from "./faq";

const TITLE = "Product Development Company | Idea to Retail | EPCO";
const DESCRIPTION =
  "From a sketch, prototype, or problem to a manufacturable, marketable product. EPCO provides the engineering, sourcing, and commercial strategy behind more than 160 product launches.";
const URL = "https://www.eddypham.company/services/product-development";

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
  serviceType: "Product Development",
  name: TITLE,
  description: DESCRIPTION,
  url: URL,
  provider: {
    "@type": "Organization",
    name: "EPCO",
    url: "https://www.eddypham.company",
  },
  areaServed: "Worldwide",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRODUCT_DEVELOPMENT_FAQ.map((f) => ({
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
      <ProductDevelopmentClient />
    </>
  );
}
