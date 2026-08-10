import type { Metadata } from "next";
import ProductDevelopmentClient from "./ProductDevelopmentClient";

const TITLE = "Product Development | EPCO";
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

export default function Page() {
  return <ProductDevelopmentClient />;
}
