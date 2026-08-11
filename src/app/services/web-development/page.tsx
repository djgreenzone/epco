import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { WEB_DEVELOPMENT_FAQ } from "./faq";

const TITLE = "Web Design & Development That Converts | EPCO";
const DESCRIPTION =
  "Custom web platforms, mobile applications, and AI integrations engineered for conversion and transactional scale.";
const URL = "https://www.eddypham.company/services/web-development";

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
  serviceType: "Web Development",
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
  mainEntity: WEB_DEVELOPMENT_FAQ.map((f) => ({
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
      <ServicesClient />
    </>
  );
}
