import type { Metadata } from "next";
import LegalDoc, { type LegalSection } from "@/components/LegalDoc";

const TITLE = "Terms of Service | EPCO";
const DESCRIPTION =
  "The terms governing your access to and use of the EPCO International website.";
const URL = "https://www.eddypham.company/legal/terms";

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
  robots: { index: true, follow: true },
};

const SANS = { fontFamily: "var(--font-geist-sans), Arial, sans-serif" } as const;

const sections: LegalSection[] = [
  {
    n: "1",
    title: "Acceptance of These Terms",
    body: [
      `These Terms of Service govern your access to and use of www.eddypham.company, including its pages, content, contact forms, scheduling tools, and related online features. By visiting or using the Site, you agree to these Terms and the Privacy Policy. If you do not agree, do not use the Site.`,
      `These Terms apply only to use of the Site. If you become a client of EPCO, your services will be governed by a separate written proposal, invoice, development agreement, transactional agreement, statement of work, nondisclosure agreement, or other signed contract. If a signed contract conflicts with these Terms, the signed contract controls for the services covered by that contract.`,
    ],
  },
  {
    n: "2",
    title: "Company Information",
    body: [
      `The Site is operated by eddyPham&Company, LLC, doing business as EPCO, referred to in these Terms as EPCO, we, us, or our. EPCO provides product evaluation, product design and engineering coordination, prototyping, global manufacturing sourcing, packaging, logistics, direct response strategy, marketing support, and related commercialization services.`,
    ],
  },
  {
    n: "3",
    title: "Eligibility",
    body: [
      `You must be at least 18 years old and legally able to enter into a contract to use the Site. If you use the Site for a company or another organization, you represent that you have authority to act for that organization and bind it to these Terms.`,
    ],
  },
  {
    n: "4",
    title: "Informational Purpose Only",
    body: [
      `The Site provides general information about EPCO, its experience, services, methods, past work, and potential business opportunities. Site content is not a promise that EPCO will accept your project, create a commercially successful product, obtain financing, secure intellectual property protection, locate a suitable manufacturer, meet a particular cost, or achieve any particular sales result.`,
      `No statement on the Site is legal, patent, trademark, tax, accounting, investment, medical, regulatory, engineering certification, or other licensed professional advice. References to patent or trademark assistance mean that EPCO may help coordinate information or introduce qualified professionals. EPCO is not a law firm and does not create an attorney client relationship.`,
    ],
  },
  {
    n: "5",
    title: "No Client Relationship Created by Site Use",
    body: [
      `Visiting the Site, submitting a form, scheduling a call, exchanging introductory messages, or sending materials does not make you an EPCO client and does not require EPCO to accept or perform work. A client relationship begins only when the required parties sign a written agreement or EPCO otherwise confirms the engagement in a signed writing.`,
    ],
  },
  {
    n: "6",
    title: "Product Ideas and Confidential Information",
    body: [
      `Do not send trade secrets, patentable details, unreleased designs, formulas, source files, customer lists, financial records, or other confidential information through the Site unless EPCO has first signed a written nondisclosure agreement that covers the information.`,
      `Unless a signed nondisclosure agreement states otherwise, information submitted through the Site will not be treated as confidential. EPCO may already be developing, reviewing, or working with products, concepts, features, markets, or business models that are similar to an idea you submit. Your submission does not prevent EPCO from continuing that work.`,
      `You remain responsible for deciding what to disclose and for seeking patent counsel before making any public or unprotected disclosure that could affect intellectual property rights.`,
    ],
  },
  {
    n: "7",
    title: "Rights to Submitted Materials",
    body: [
      `You keep ownership of materials you submit through the Site. You give EPCO a limited, nonexclusive, royalty free permission to receive, copy, store, review, and share those materials with EPCO personnel and service providers only as reasonably needed to evaluate your inquiry, respond to you, protect the Site, or comply with law.`,
      `You represent that you own the submitted materials or have permission to provide them, and that EPCO's limited review of them will not violate another person's intellectual property, privacy, contractual, or other legal rights. This section does not transfer ownership of a product idea or development work. Ownership arising from a client project will be controlled only by the applicable signed client agreement.`,
    ],
  },
  {
    n: "8",
    title: "EPCO Intellectual Property",
    body: [
      `The Site and its content, including text, graphics, photographs, illustrations, videos, logos, trademarks, service marks, page designs, methods, presentations, case studies, downloads, and other materials, are owned by or licensed to EPCO and are protected by applicable intellectual property laws.`,
      `You may view the Site for your own lawful evaluation of EPCO. You may not copy, reproduce, modify, publish, distribute, sell, license, scrape, train an artificial intelligence system on, create derivative works from, or commercially exploit Site content without EPCO's prior written permission. No license is granted except the limited right to use the Site under these Terms.`,
    ],
  },
  {
    n: "9",
    title: "References to Past Products and Results",
    body: [
      `The Site may identify products, brands, companies, campaigns, or commercial results associated with Eddy Pham's professional experience. These references are provided to describe past experience and do not claim ownership of third party trademarks. All third party names and marks belong to their respective owners.`,
      `Past performance does not guarantee future results. Product development and commercialization involve risk. Results depend on many factors outside EPCO's control, including funding, consumer demand, product quality, pricing, manufacturing, intellectual property, regulatory requirements, media costs, retailer decisions, market timing, and client performance.`,
    ],
  },
  {
    n: "10",
    title: "Estimates, Timelines, and Business Decisions",
    body: [
      `Any estimate, timeline, budget, unit cost, sales forecast, valuation, return projection, media result, manufacturing quote, or launch plan discussed on the Site or during an introductory conversation is preliminary unless included in a signed agreement. Estimates may change when designs, specifications, quantities, materials, regulations, tariffs, freight costs, exchange rates, testing requirements, or vendor conditions change.`,
      `You are responsible for your own business, funding, investment, manufacturing, legal, regulatory, and launch decisions. You should conduct independent review and use qualified professional advisers when appropriate.`,
    ],
  },
  {
    n: "11",
    title: "Client Fees, Payments, and Refunds",
    body: [
      `The Site does not by itself establish the price or payment terms for EPCO services. Fees, deposits, commencement payments, milestone payments, reimbursable costs, cancellation rights, and refund terms will be stated in the applicable proposal, invoice, or signed client agreement.`,
      `Unless a signed writing states otherwise, EPCO is not required to begin work, reserve personnel, engage engineers, place orders, or incur outside costs until the required payment has cleared. A payment described in an invoice or agreement as a commencement fee, initial payment, retainer, deposit, or nonrefundable payment will be treated according to that written document and applicable law.`,
    ],
  },
  {
    n: "12",
    title: "Third Party Providers and Global Sourcing",
    body: [
      `EPCO may work with or introduce engineers, designers, laboratories, attorneys, manufacturers, suppliers, freight companies, fulfillment centers, media companies, software providers, payment processors, and other independent third parties. Unless a signed agreement expressly states otherwise, these parties are independent providers and are not EPCO employees, partners, agents, or controlled entities.`,
      `EPCO may assist with sourcing and coordination, but cannot guarantee a third party's performance, solvency, security, compliance, workmanship, timing, pricing, intellectual property practices, shipping, or continued availability. Any warranties or remedies relating to third party products or services are subject to the third party's terms and applicable law.`,
    ],
  },
  {
    n: "13",
    title: "Acceptable Use",
    body: [
      `You may use the Site only for lawful purposes. You may not interfere with the Site, attempt unauthorized access, introduce malicious code, collect data through automated means without written permission, impersonate another person, submit false information, infringe intellectual property, violate privacy rights, send unlawful or abusive material, use the Site to compete unfairly, or use the Site in any way that could damage EPCO or another person.`,
      `EPCO may block or end access to the Site when it reasonably believes these Terms have been violated or when needed to protect the Site, EPCO, its clients, or others.`,
    ],
  },
  {
    n: "14",
    title: "Privacy and Electronic Communications",
    body: [
      `EPCO's Privacy Policy explains how information collected through the Site is handled and is incorporated into these Terms. By submitting a form, scheduling a call, or contacting EPCO electronically, you consent to receive communications relating to your inquiry. You may request that marketing communications stop, but EPCO may still send communications needed to respond to a request, administer an engagement, comply with law, or protect legal rights.`,
    ],
  },
  {
    n: "15",
    title: "Third Party Links and Tools",
    body: [
      `The Site may contain links to or integrations with third party websites, scheduling services, social media platforms, videos, forms, or other tools. EPCO does not control these third parties and is not responsible for their content, availability, security, privacy practices, or terms. Your use of a third party service is governed by that provider's rules.`,
    ],
  },
  {
    n: "16",
    title: "Site Availability and Changes",
    body: [
      `EPCO may modify, suspend, restrict, or discontinue any part of the Site at any time. EPCO does not promise that the Site will always be available, secure, current, complete, accurate, or free from errors or harmful components. EPCO may correct mistakes and update information without notice.`,
    ],
  },
  {
    n: "17",
    title: "Disclaimer of Warranties",
    body: [
      `To the fullest extent allowed by law, the Site and its content are provided as is and as available. EPCO disclaims all warranties, whether express, implied, or statutory, including warranties of accuracy, availability, merchantability, fitness for a particular purpose, title, noninfringement, security, and any warranty arising from a course of dealing or industry practice.`,
      `Some laws do not allow certain warranty exclusions. In those places, the exclusions apply only to the greatest extent permitted by law.`,
    ],
  },
  {
    n: "18",
    title: "Limitation of Liability",
    body: [
      `To the fullest extent allowed by law, EPCO and its owners, officers, employees, contractors, affiliates, and service providers will not be liable for indirect, incidental, special, exemplary, punitive, or consequential damages, or for lost profits, lost revenue, lost opportunities, lost data, loss of goodwill, business interruption, or the cost of substitute services arising from or related to the Site.`,
      `To the fullest extent allowed by law, the total liability of EPCO and the other protected parties for all claims relating to the Site will not exceed the greater of one hundred United States dollars or the amount you paid directly to EPCO solely for access to the Site during the six months before the event giving rise to the claim. This limit does not replace or change any liability provision in a signed client agreement.`,
      `Nothing in these Terms excludes liability that cannot legally be excluded.`,
    ],
  },
  {
    n: "19",
    title: "Indemnification",
    body: [
      `To the fullest extent allowed by law, you agree to defend, indemnify, and hold harmless EPCO and its owners, officers, employees, contractors, affiliates, and service providers from claims, losses, liabilities, damages, judgments, penalties, costs, and reasonable legal fees arising from your unlawful use of the Site, your submitted materials, your violation of these Terms, or your violation of another person's rights.`,
      `EPCO may control the defense of a covered claim, and you agree to provide reasonable cooperation. EPCO will not settle a claim in a way that admits your personal wrongdoing or requires a payment from you beyond this indemnity without your consent, which will not be unreasonably withheld.`,
    ],
  },
  {
    n: "20",
    title: "Events Outside EPCO's Control",
    body: [
      `EPCO is not responsible for delay or failure caused by events outside its reasonable control, including natural disasters, fire, flood, war, terrorism, civil unrest, epidemic, government action, labor disruption, transportation interruption, power or communication failure, cyberattack, shortage of materials, supplier failure, customs delay, embargo, tariff change, or failure of a third party platform.`,
    ],
  },
  {
    n: "21",
    title: "Governing Law and Courts",
    body: [
      `These Terms are governed by the laws of the State of Nevada, without regard to its rules about conflicts of laws. Any dispute relating solely to the Site or these Terms must be brought in the state or federal courts located in Clark County, Nevada, and each party consents to those courts.`,
      `This section does not replace a dispute resolution, arbitration, governing law, or venue provision contained in a signed client agreement. That signed provision controls for disputes covered by the client agreement.`,
    ],
  },
  {
    n: "22",
    title: "General Terms",
    body: [
      `If any part of these Terms is found unenforceable, the remaining parts will remain effective. EPCO's failure to enforce a provision is not a waiver. You may not assign your rights under these Terms without EPCO's written permission. EPCO may assign these Terms as part of a merger, reorganization, sale, transfer of assets, or similar business transaction.`,
      `These Terms and the Privacy Policy form the complete agreement concerning use of the Site, except that a signed client agreement controls the services covered by that agreement. Section headings are for convenience only.`,
    ],
  },
  {
    n: "23",
    title: "Changes to These Terms",
    body: [
      `EPCO may update these Terms from time to time. The revised Terms will be posted on the Site with a new effective date. Changes apply prospectively, meaning from that point forward. Your continued use of the Site after revised Terms are posted means you accept the revised Terms.`,
    ],
  },
  {
    n: "24",
    title: "Contact and Legal Notices",
    body: [
      `Questions about these Terms may be submitted through the contact form at www.eddypham.company.`,
      `Legal notices to EPCO must be sent to:`,
      <address key="addr" style={SANS} className="not-italic leading-relaxed text-gray-300">
        eddyPham&amp;Company, LLC, doing business as EPCO
        <br />
        8545 W Warm Springs Road, A4
        <br />
        Las Vegas, NV 89113
        <br />
        <a
          href="mailto:info@eddypham.company"
          className="text-[#00f2ff] transition-colors hover:text-[#ff00ea]"
        >
          info@eddypham.company
        </a>
      </address>,
    ],
  },
];

export default function Page() {
  return (
    <LegalDoc
      eyebrow="// LEGAL"
      title="Terms of Service"
      effectiveDate="Effective August 8, 2026"
      intro="These Terms govern use of this website only. If you become an EPCO client, a separate signed agreement controls the services it covers."
      sections={sections}
    />
  );
}
