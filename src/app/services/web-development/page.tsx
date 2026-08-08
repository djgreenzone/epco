import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

const TITLE = "Web Development | EPCO";
const DESCRIPTION =
  "Custom web platforms, mobile applications, and AI integrations engineered for direct response and transactional scale.";
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

export default function Page() {
  return <ServicesClient />;
}
