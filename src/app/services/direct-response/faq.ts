// Shared FAQ — rendered visibly on the page AND emitted as FAQPage JSON-LD.
// Keep questions phrased exactly as people search them (feeds featured snippets + AI answers).

export type Faq = { q: string; a: string };

export const DIRECT_RESPONSE_FAQ: Faq[] = [
  {
    q: "What is direct response marketing?",
    a: "Direct response marketing is advertising engineered to drive an immediate, measurable action — a call, a click, or a purchase — rather than long-term brand awareness. Every dollar is tracked to a result. It is the discipline behind infomercials, DRTV, and the direct-to-consumer offers that turned products like the George Foreman Grill and the Snuggie into household names.",
  },
  {
    q: "What is DRTV (direct response television)?",
    a: "DRTV is direct response advertising run on television — short-form spots of 30 to 120 seconds and long-form infomercials of around 28.5 minutes — built around a compelling offer and a clear call to action. EPCO has produced, tested, and scaled DRTV campaigns for more than three decades.",
  },
  {
    q: "How do I get my product on QVC or HSN?",
    a: "Getting onto QVC or HSN takes a product that demonstrates well on camera, a tight on-air pitch, margins that support the channel, and the operational capacity to fulfill demand fast. EPCO has taken products through the QVC and HSN process and can prepare your product, pitch, pricing, and supply chain for it.",
  },
  {
    q: "How is direct response different from brand marketing?",
    a: "Brand marketing builds awareness and affinity over time; direct response drives a measurable action now. Direct response is accountable to a number — cost per acquisition, return on ad spend, units sold — which makes it the fastest path to revenue for a product that can prove itself in an ad.",
  },
  {
    q: "What makes a product a good fit for direct response or as-seen-on-TV?",
    a: "The strongest direct response products solve an obvious everyday problem, demonstrate visually in seconds, carry the margin to sustain media spend, and appeal to a mass market. EPCO evaluates every product against these criteria before recommending a direct response launch.",
  },
  {
    q: "Do you handle media buying?",
    a: "Yes. EPCO plans and buys direct response media across television, digital, and cross-channel, and optimizes to cost-per-acquisition and return on ad spend — not vanity reach. Media is bought against a target return and adjusted continuously on real performance data.",
  },
  {
    q: "What does a direct response marketing agency do?",
    a: "A direct response marketing agency builds the offer, produces the creative (spots, infomercials, and funnels), buys and optimizes the media, and manages the entire path from a customer's response to a completed, fulfilled sale — every step measured against ROI.",
  },
  {
    q: "How long has EPCO been doing direct response marketing?",
    a: "EPCO has run direct response campaigns and product launches for over 30 years, across more than 160 products and over a billion dollars in combined retail sales — including some of the most recognized as-seen-on-TV products ever made.",
  },
];
