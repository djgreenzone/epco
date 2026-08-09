import type { Metadata } from "next";
import LegalDoc, { type LegalSection } from "@/components/LegalDoc";

const TITLE = "Privacy Policy | EPCO";
const DESCRIPTION =
  "How EPCO International collects, uses, discloses, and protects personal information submitted through its website.";
const URL = "https://www.eddypham.company/legal/privacy";

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

function Lead({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <strong className="font-semibold text-gray-200">{label}</strong> {children}
    </>
  );
}

const sections: LegalSection[] = [
  {
    n: "1",
    title: "Scope of This Policy",
    body: [
      `This Privacy Policy explains how eddyPham&Company, LLC, doing business as EPCO, collects, uses, discloses, stores, and protects personal information through www.eddypham.company and related contact forms, scheduling tools, and online communications. In this Policy, EPCO, we, us, and our refer to the company, and Site refers to www.eddypham.company.`,
      `This Policy applies to visitors, prospective clients, business contacts, and people who submit inquiries through the Site. It does not replace the privacy, confidentiality, ownership, or data provisions in a signed client agreement, nondisclosure agreement, development agreement, transactional agreement, statement of work, or other contract. A signed agreement controls for information covered by that agreement.`,
      `This Policy does not apply to websites, platforms, applications, or services operated by other companies, even when the Site links to or uses them.`,
    ],
  },
  {
    n: "2",
    title: "Personal Information We May Collect",
    body: [
      <Lead key="a" label="Contact information.">
        We may collect your name, work email address, telephone number, mailing address, company name, job title, and preferred method of communication.
      </Lead>,
      <Lead key="b" label="Business and professional information.">
        We may collect information about your company, industry, role, website, business experience, current monthly revenue range, funding status, product category, commercial goals, and other information you choose to provide.
      </Lead>,
      <Lead key="c" label="Inquiry and project information.">
        We may collect descriptions of a product, prototype, campaign, business opportunity, problem, requested service, budget, timeline, drawings, photographs, videos, documents, or other materials submitted with an inquiry.
      </Lead>,
      <Lead key="d" label="Scheduling and communications information.">
        We may collect appointment details, meeting preferences, messages, emails, call notes, and records of our communications with you.
      </Lead>,
      <Lead key="e" label="Device and Site activity information.">
        We and our service providers may automatically collect Internet Protocol address, browser type, device type, operating system, referring page, pages viewed, links selected, approximate location based on Internet Protocol address, dates and times of visits, and similar technical information.
      </Lead>,
      <Lead key="f" label="Cookie and similar technology information.">
        The Site may use cookies, pixels, local storage, logs, analytics tools, and similar technology to operate the Site, remember settings, understand Site use, prevent abuse, and measure performance.
      </Lead>,
      <Lead key="g" label="Information from other sources.">
        We may receive information from a referral source, professional contact, social media platform, scheduling provider, analytics provider, public source, or service provider when permitted by law.
      </Lead>,
    ],
  },
  {
    n: "3",
    title: "Information We Do Not Intend to Collect Through the Site",
    body: [
      `The Site is not designed to collect Social Security numbers, government identification numbers, bank account numbers, payment card numbers, medical records, biometric information, precise geolocation, account passwords, or other highly sensitive personal information. Do not submit this information through the Site or ordinary email.`,
      `The Site does not currently provide an online store or payment checkout. If EPCO later accepts online payments, this Policy must be updated to identify the payment provider and explain how payment information is handled.`,
    ],
  },
  {
    n: "4",
    title: "Product Ideas and Confidential Materials",
    body: [
      `Do not send trade secrets, patentable details, unreleased designs, formulas, source files, customer lists, financial records, or other confidential information through the Site unless EPCO has first signed a written nondisclosure agreement covering that information.`,
      `Information submitted before a nondisclosure agreement is signed may not be treated as confidential. EPCO may already be reviewing or developing similar products, features, categories, markets, or business models. The Terms of Service provide additional rules for product submissions and ownership.`,
      `If an engagement begins, confidentiality, ownership, access, retention, use, and disclosure of client project information will be controlled by the applicable signed client agreement.`,
    ],
  },
  {
    n: "5",
    title: "How We Use Personal Information",
    body: [
      `We may use personal information to respond to inquiries, evaluate possible projects, schedule meetings, communicate with you, prepare proposals, determine whether EPCO's services fit your needs, and administer a business relationship.`,
      `We may also use personal information to operate and improve the Site, understand Site traffic, maintain security, prevent fraud or abuse, keep business records, manage vendors, protect legal rights, comply with law, and resolve disputes.`,
      `With your permission or as otherwise allowed by law, we may send information about EPCO services, projects, articles, events, or business opportunities. You may ask us to stop promotional email at any time.`,
    ],
  },
  {
    n: "6",
    title: "Cookies and Similar Technologies",
    body: [
      `Cookies are small files placed on a browser or device. The Site may use cookies and similar technologies that are necessary for Site operation, contact forms, scheduling, security, preferences, analytics, and embedded content.`,
      `You can usually control cookies through your browser settings. Blocking some cookies may prevent parts of the Site, forms, videos, scheduling tools, or other features from working correctly.`,
      `Some browsers offer a Do Not Track setting. Because there is no single accepted standard for responding to that setting, the Site may not respond to it. Where applicable law requires recognition of a valid Global Privacy Control signal, EPCO will treat the signal as a request to opt out of covered sale or sharing for that browser or device.`,
    ],
  },
  {
    n: "7",
    title: "How We Disclose Personal Information",
    body: [
      <Lead key="a" label="Service providers.">
        We may provide information to companies and individuals that host the Site, operate forms, schedule meetings, provide email, store files, maintain security, analyze Site performance, support communications, provide professional advice, or perform other services for EPCO. They may use the information only as permitted by their agreements and applicable law.
      </Lead>,
      <Lead key="b" label="Project evaluation and business operations.">
        When reasonably necessary and consistent with your request, we may disclose information to EPCO personnel, contractors, engineers, designers, manufacturers, laboratories, attorneys, accountants, consultants, or other professional providers. Confidential project information will be handled according to any applicable signed agreement.
      </Lead>,
      <Lead key="c" label="Legal and safety purposes.">
        We may disclose information when reasonably necessary to comply with law, legal process, court orders, government requests, professional obligations, enforce agreements, investigate misconduct, prevent fraud, protect security, or protect the rights, property, or safety of EPCO or others.
      </Lead>,
      <Lead key="d" label="Business transfers.">
        Personal information may be reviewed, transferred, or disclosed as part of a proposed or completed merger, financing, acquisition, reorganization, bankruptcy, sale of assets, or similar transaction, subject to applicable law.
      </Lead>,
    ],
  },
  {
    n: "8",
    title: "Sale and Sharing of Personal Information",
    body: [
      `EPCO does not knowingly sell personal information for money. EPCO does not currently use personal information for advertising based on activity across unrelated websites, sometimes called cross context behavioral advertising.`,
      `Certain analytics, embedded content, or advertising technologies may be treated as sale or sharing under some privacy laws even when no money is exchanged. If EPCO begins selling or sharing personal information as those terms are defined by applicable law, EPCO will update this Policy and provide any legally required choice or opt out method.`,
      `EPCO does not knowingly sell or share the personal information of anyone under 16 years old.`,
    ],
  },
  {
    n: "9",
    title: "Data Retention",
    body: [
      `EPCO keeps personal information only as long as reasonably needed for the purposes described in this Policy, including responding to inquiries, evaluating projects, maintaining business and tax records, administering agreements, protecting intellectual property and legal rights, resolving disputes, and complying with law.`,
      `Retention periods may differ based on the type of information, the nature of the relationship, legal requirements, potential claims, security needs, and any applicable client agreement. EPCO may retain information longer when required by law, needed for a legal claim, or preserved in secure backup systems until ordinary deletion cycles are completed.`,
    ],
  },
  {
    n: "10",
    title: "Data Security",
    body: [
      `EPCO uses reasonable administrative, technical, and physical measures designed to protect personal information. These measures may include access controls, passwords, secure service providers, encryption where appropriate, backups, and limiting access to people who need the information for legitimate business purposes.`,
      `No Internet transmission, email, storage system, or security method can be guaranteed to be completely secure. Do not send payment card information, bank information, government identification numbers, passwords, or sensitive project details through ordinary email or an unsecured form.`,
    ],
  },
  {
    n: "11",
    title: "Your Choices",
    body: [
      <Lead key="a" label="Email choices.">
        You may ask EPCO to stop sending promotional email by following an unsubscribe instruction when provided or by contacting EPCO. EPCO may continue sending messages needed to respond to an inquiry, administer a relationship, comply with law, or protect legal rights.
      </Lead>,
      <Lead key="b" label="Cookie choices.">
        You may use browser settings or any cookie control displayed on the Site to manage certain cookies. Your settings may apply only to the browser and device where you make the choice.
      </Lead>,
      <Lead key="c" label="Updating information.">
        You may contact EPCO to request correction of inaccurate contact or business information.
      </Lead>,
    ],
  },
  {
    n: "12",
    title: "Privacy Rights",
    body: [
      `Depending on where you live and whether the applicable law covers EPCO, you may have the right to request access to personal information, correction of inaccurate information, deletion, a portable copy, information about categories and sources, or a list of certain disclosures. You may also have rights to opt out of sale, sharing, targeted advertising, or certain profiling.`,
      `EPCO will not unlawfully discriminate against you for exercising an applicable privacy right. Some rights are subject to exceptions. For example, EPCO may keep information needed to complete a requested service, maintain records, detect security incidents, protect legal rights, comply with law, or honor a signed agreement.`,
      `To submit a request, use the contact information in Section 20. Describe the request and provide enough information for EPCO to locate the relevant records. EPCO may need to verify your identity and authority before responding. An authorized agent may submit a request when permitted by law, but EPCO may require proof of authorization and identity.`,
      `EPCO will respond within the time required by applicable law. If EPCO denies a request, you may have a right to appeal. Instructions for an available appeal will be included in the response.`,
    ],
  },
  {
    n: "13",
    title: "Nevada Privacy Rights",
    body: [
      `Nevada law may allow a Nevada consumer to submit a verified request directing an operator not to make a covered sale of certain personal information. EPCO does not knowingly engage in covered sales of personal information. A Nevada consumer may still submit a request using the contact information in Section 20.`,
      `This Policy identifies the categories of covered information EPCO may collect, the categories of parties with whom information may be disclosed, the process for requesting review or correction, how material changes are communicated, and whether third party technology may collect information about online activity.`,
    ],
  },
  {
    n: "14",
    title: "California Privacy Notice",
    body: [
      `California privacy rights apply only when the relevant law covers EPCO and the person or information involved. California residents may have rights to know, access, correct, delete, or obtain a copy of personal information, and to opt out of sale, sharing, or certain uses of sensitive personal information.`,
      `During the preceding 12 months, EPCO may have collected the categories described in Section 2 from the sources described there, used them for the purposes in Section 5, and disclosed them to the categories of recipients described in Section 7.`,
      `EPCO does not knowingly sell personal information for money and does not currently use personal information for cross context behavioral advertising. EPCO does not offer a financial incentive in exchange for personal information through the Site.`,
      `California residents may submit a request using Section 20. EPCO will verify and respond to covered requests as required by law. California residents may also request information concerning certain disclosures of personal information to third parties for their own direct marketing purposes when that law applies.`,
    ],
  },
  {
    n: "15",
    title: "International Visitors",
    body: [
      `EPCO is based in the United States. If you access the Site from another country, your information may be transferred to, stored in, and processed in the United States and other countries where EPCO or its service providers operate. Those countries may have privacy laws different from the laws where you live.`,
      `The Site is directed primarily to business contacts in the United States.`,
    ],
  },
  {
    n: "16",
    title: "Children",
    body: [
      `The Site is intended for business users and is not directed to children under 13 years old. EPCO does not knowingly collect personal information from children under 13 through the Site. If you believe a child has provided personal information, contact EPCO so the information can be reviewed and deleted when appropriate.`,
      `People under 18 should not submit product ideas, request services, or enter into agreements through the Site without involvement of a parent or legal guardian.`,
    ],
  },
  {
    n: "17",
    title: "Third Party Websites and Social Media",
    body: [
      `The Site may link to or display content from scheduling services, video providers, social media platforms, Substack, TikTok, or other third party services. Those providers may collect information under their own privacy policies. EPCO does not control their privacy, security, or data practices. Review the provider's policy before using the service.`,
      `Information you post publicly on social media or another public service may be viewed, copied, or used by others. Do not post confidential product or business information in public comments or messages.`,
    ],
  },
  {
    n: "18",
    title: "Changes to This Policy",
    body: [
      `EPCO may update this Privacy Policy when its practices, technology, vendors, services, or legal obligations change. The revised Policy will be posted on the Site with a new effective date. Material changes will be communicated in a manner reasonably appropriate to the change and applicable law.`,
    ],
  },
  {
    n: "19",
    title: "Relationship to the Terms of Service",
    body: [
      <span key="a">
        This Privacy Policy should be read with EPCO&apos;s{" "}
        <a
          href="/legal/terms"
          className="text-[#00f2ff] transition-colors hover:text-[#ff00ea]"
        >
          Terms of Service
        </a>
        . The Terms provide additional rules concerning Site use, product idea submissions, confidentiality, intellectual property, third party services, and disputes. If you become a client, the applicable signed client agreement controls information and services covered by that agreement.
      </span>,
    ],
  },
  {
    n: "20",
    title: "Contact EPCO",
    body: [
      `Questions, privacy requests, Nevada opt out requests, and other privacy communications may be submitted through the contact form at www.eddypham.company, or sent to:`,
      <address key="addr" style={SANS} className="not-italic leading-relaxed text-gray-300">
        eddyPham&amp;Company, LLC, doing business as EPCO
        <br />
        Attention: Privacy
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
      title="Privacy Policy"
      effectiveDate="Effective August 8, 2026"
      intro="This Policy explains what information this website collects, how it is used, and the choices you have. It should be read together with the Terms of Service."
      sections={sections}
    />
  );
}
