"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import PhenomenonCTA from "@/components/PhenomenonCTA";
import StickyBookingBar from "@/components/StickyBookingBar";

/* ------------------------------------------------------------------ */
/*  TOKENS                                                             */
/* ------------------------------------------------------------------ */

const GRADIENT = "bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]";
const GRADIENT_TEXT = `${GRADIENT} text-transparent bg-clip-text`;

const CARD_BASE =
  "group relative overflow-hidden rounded-[18px] border border-white/[0.12] bg-white/[0.04] p-8 md:p-10 " +
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl " +
  "transition-all duration-300 hover:-translate-y-2 hover:border-[#00f2ff]/50 hover:bg-white/[0.07] " +
  "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_30px_rgba(0,242,255,0.18)]";

/* ------------------------------------------------------------------ */
/*  PRIMITIVES                                                         */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
      {children}
    </span>
  );
}

function SectionHead({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.3, 0.8, 0.3, 1] }}
      className="mb-14 md:mb-20"
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 max-w-[19ch] text-[clamp(2rem,5.2vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
        {title}
      </h2>
      {body && <p className="mt-5 max-w-[58ch] text-gray-400">{body}</p>}
    </motion.div>
  );
}

function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1800,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={`${GRADIENT_TEXT} tabular-nums`}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  KPI DATA                                                           */
/* ------------------------------------------------------------------ */

// NOTE: placeholder figures — replace with EPCO's real, verifiable numbers before production.
type Kpi = {
  prefix?: string;
  to: number;
  suffix?: string;
  decimals?: number;
  label: string;
  body: string;
};

const KPIS: Kpi[] = [
  {
    prefix: "$",
    to: 100,
    suffix: "M+",
    decimals: 0,
    label: "Revenue Driven",
    body: "Tracked revenue generated for the brands we run — not impressions, dollars.",
  },
  {
    to: 2.4,
    suffix: "M+",
    decimals: 1,
    label: "Leads Delivered",
    body: "Qualified, ready-to-buy prospects captured across client funnels.",
  },
  {
    to: 500,
    suffix: "M+",
    decimals: 0,
    label: "Impressions Earned",
    body: "Targeted eyeballs put on our clients across every major channel.",
  },
  {
    to: 4.2,
    suffix: "x",
    decimals: 1,
    label: "Average ROAS",
    body: "Return on ad spend across active accounts, tuned relentlessly.",
  },
];

/* ------------------------------------------------------------------ */
/*  FUNNEL STAGES                                                      */
/* ------------------------------------------------------------------ */

type Stage = "ATTRACT" | "CAPTURE" | "CONVERT" | "SCALE" | "FOUNDATION";

const STAGE_PILL: Record<Stage, string> = {
  ATTRACT: "text-[#00f2ff] border-[#00f2ff]/40",
  CAPTURE: "text-[#ff00ea] border-[#ff00ea]/40",
  CONVERT: "text-[#ffcc00] border-[#ffcc00]/40",
  SCALE: "text-white border-white/40",
  FOUNDATION: "text-gray-300 border-white/25",
};

/* ------------------------------------------------------------------ */
/*  SERVICE DATA — the 9 disciplines                                   */
/* ------------------------------------------------------------------ */

type Service = {
  stage: Stage;
  eyebrow: string;
  title: string;
  body: string;
  detail: string[];
  glyph: string;
  col: 2 | 3 | 4;
  href?: string;
};

const COL: Record<number, string> = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
};

const SERVICES: Service[] = [
  {
    stage: "ATTRACT",
    eyebrow: "// 01. SOCIAL MEDIA",
    title: "Social Media Management",
    body: "Your feed is a storefront. We run the platforms daily — content, community, and cadence that compounds an audience instead of chasing one.",
    detail: ["Content calendars & posting", "Community management", "Organic growth strategy"],
    glyph: "M12 8a2 2 0 100 4 2 2 0 000-4M6 6a8 8 0 000 12M18 6a8 8 0 010 12M3 3a13 13 0 000 18M21 3a13 13 0 010 18",
    col: 4,
  },
  {
    stage: "ATTRACT",
    eyebrow: "// 02. PRODUCTION",
    title: "End-to-End Production",
    body: "Scroll-stopping video and creative, produced start to finish — the sizzle that earns the click before a word is read.",
    detail: ["Video & photo shoots", "Editing & motion graphics", "Ad-ready creative"],
    glyph: "M4 5h16v14H4zM10 9l5 3-5 3V9z",
    col: 2,
  },
  {
    stage: "ATTRACT",
    eyebrow: "// 03. SEO & SEM",
    title: "SEO & SEM",
    body: "Own the search result — and the AI answer. Technical SEO plus paid search that puts you in front of ready-to-buy intent.",
    detail: ["Technical & on-page SEO", "Google & Bing SEM", "Answer-engine optimization"],
    glyph: "M11 4a7 7 0 100 14 7 7 0 000-14zM16 16l4 4",
    col: 2,
  },
  {
    stage: "CAPTURE",
    eyebrow: "// 04. PAID ADS",
    title: "Paid Ads Optimization",
    body: "Every dollar accountable. Laser-targeted campaigns across Meta, Google, and TikTok, tuned to ROAS — not vanity reach.",
    detail: ["Meta, Google & TikTok ads", "Creative & audience testing", "ROAS-driven scaling"],
    glyph: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 8a4 4 0 100 8 4 4 0 000-8zM12 11.5a0.5 0.5 0 100 1 0.5 0.5 0 000-1",
    col: 2,
  },
  {
    stage: "CAPTURE",
    eyebrow: "// 05. LEAD GEN",
    title: "Lead Generation",
    body: "Predictable pipeline, not luck. Systems that attract and qualify ready-to-buy customers on repeat.",
    detail: ["Lead magnets & landing pages", "Qualification & routing", "CRM integration"],
    glyph: "M4 5h16l-6 8v6l-4-2v-4L4 5z",
    col: 2,
  },
  {
    stage: "CONVERT",
    eyebrow: "// 06. SALES FUNNELS",
    title: "Sales Funnels",
    body: "The path from click to checkout, engineered. Every step strips friction and pulls the buyer one decision closer — the direct-response backbone behind eight-figure launches.",
    detail: ["Funnel architecture & copy", "A/B-tested checkout flows", "Upsells & order bumps"],
    glyph: "M3 5h18M6 10h12M9 15h6M11 20h2",
    col: 4,
  },
  {
    stage: "CONVERT",
    eyebrow: "// 07. EMAIL",
    title: "Email Marketing",
    body: "The one channel you own outright. Lifecycle flows and broadcasts that turn a single purchase into a lifetime of them.",
    detail: ["Automated lifecycle flows", "Broadcast campaigns", "List growth & segmentation"],
    glyph: "M3 6h18v12H3zM3 7l9 6 9-6",
    col: 2,
  },
  {
    stage: "SCALE",
    eyebrow: "// 08. AI AUTOMATION",
    title: "AI Automation",
    body: "Put the busywork on autopilot. AI agents and workflows that cut overhead and compress the sales cycle while you sleep.",
    detail: ["Workflow automation", "AI support & chat agents", "Data & reporting pipelines"],
    glyph: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l3 3m6 6l3 3m0-12l-3 3m-6 6l-3 3",
    col: 3,
  },
  {
    stage: "FOUNDATION",
    eyebrow: "// 09. WEBSITE",
    title: "Website Development",
    body: "The asset every channel points to. High-conversion sites built for speed and direct response — engineered by our web team.",
    detail: ["Custom high-speed builds", "Conversion-first UX", "See full web-dev capability →"],
    glyph: "M8 6l-5 6 5 6M16 6l5 6-5 6",
    col: 3,
    href: "/services/web-development",
  },
];

/* ------------------------------------------------------------------ */
/*  BENTO CARD — hover reveals the "includes" detail overlay           */
/* ------------------------------------------------------------------ */

function ServiceIcon({ d }: { d: string }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.06] transition-colors duration-300 group-hover:border-[#00f2ff]/40">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-[#00f2ff]"
      >
        <path d={d} />
      </svg>
    </div>
  );
}

function BentoCard({ s }: { s: Service }) {
  const inner = (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-br from-white/[0.07] via-transparent to-transparent"
      />

      <div className="relative flex h-full flex-col">
        {/* top row: icon + stage tag */}
        <div className="flex items-start justify-between gap-4">
          <ServiceIcon d={s.glyph} />
          <span
            className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${STAGE_PILL[s.stage]}`}
          >
            {s.stage}
          </span>
        </div>

        {/* text block, anchored to the bottom */}
        <div className="mt-auto pt-10">
          <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
            {s.eyebrow}
          </span>
          <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">{s.title}</h3>

          {/* description ↔ includes crossfade in place — title stays put */}
          <div className="relative min-h-[132px]">
            <p className="max-w-[54ch] text-[0.95rem] leading-relaxed text-gray-400 transition-opacity duration-200 group-hover:opacity-0">
              {s.body}
            </p>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:delay-100">
              <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
                Includes
              </span>
              <ul className="space-y-2.5">
                {s.detail.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[0.95rem] text-gray-200">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#00f2ff]" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const cls = `${CARD_BASE} flex h-full min-h-[340px] flex-col`;

  if (s.href) {
    return (
      <a href={s.href} className={cls}>
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}

/* ------------------------------------------------------------------ */
/*  SERVICE ARSENAL — filterable bento (chip filter, Apple-style)      */
/* ------------------------------------------------------------------ */

type Filter = "ALL" | Stage;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "ATTRACT", label: "Attract" },
  { key: "CAPTURE", label: "Capture" },
  { key: "CONVERT", label: "Convert" },
  { key: "SCALE", label: "Scale" },
  { key: "FOUNDATION", label: "Foundation" },
];

const FILTER_ACTIVE: Record<Filter, string> = {
  ALL: "border-white/60 bg-white/[0.08] text-white",
  ATTRACT: "border-[#00f2ff]/60 bg-[#00f2ff]/10 text-[#00f2ff]",
  CAPTURE: "border-[#ff00ea]/60 bg-[#ff00ea]/10 text-[#ff00ea]",
  CONVERT: "border-[#ffcc00]/60 bg-[#ffcc00]/10 text-[#ffcc00]",
  SCALE: "border-white/60 bg-white/[0.08] text-white",
  FOUNDATION: "border-white/40 bg-white/[0.06] text-gray-200",
};

function ServiceArsenal() {
  const [active, setActive] = useState<Filter>("ALL");
  const visible = active === "ALL" ? SERVICES : SERVICES.filter((s) => s.stage === active);

  return (
    <>
      {/* chip filter */}
      <div className="mb-10 flex flex-wrap gap-2.5">
        {FILTERS.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                isActive
                  ? FILTER_ACTIVE[f.key]
                  : "border-white/12 text-gray-500 hover:border-white/25 hover:text-gray-300"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-6">
        <AnimatePresence mode="popLayout">
          {visible.map((s) => (
            <motion.div
              key={s.title}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.3, 0.8, 0.3, 1] }}
              className={COL[s.col]}
            >
              <BentoCard s={s} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  METHOD — four-step process                                         */
/* ------------------------------------------------------------------ */

const METHOD = [
  {
    n: "01",
    title: "Consultation",
    body: "A free strategy session. We audit where revenue leaks and where the fastest wins are hiding.",
    glyph: "M4 5h16v10H9l-5 4V5z",
  },
  {
    n: "02",
    title: "Strategy",
    body: "A custom growth plan mapped to your funnel, your margins, and your market — no recycled playbooks.",
    glyph: "M4 19h16M7 15l4-5 3 3 5-7",
  },
  {
    n: "03",
    title: "Execution",
    body: "We build and launch: creative, campaigns, funnels, and automation — all in house, all accountable.",
    glyph: "M13 3L4 14h7l-1 7 9-11h-7l1-7z",
  },
  {
    n: "04",
    title: "Growth",
    body: "Measure, optimize, scale. Every decision driven by real performance data, not guesswork.",
    glyph: "M4 19h16M6 15l4-4 3 3 6-7",
  },
];

function MethodCard({ m, i }: { m: (typeof METHOD)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.3, 0.8, 0.3, 1] }}
      className="group relative overflow-hidden rounded-[18px] border border-white/[0.12] bg-white/[0.04] p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00f2ff]/50 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_30px_rgba(0,242,255,0.18)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
      <div className="relative">
        <div className="mb-8 flex items-start justify-between">
          <div className="grid h-11 w-11 place-items-center rounded-[12px] border border-white/10 bg-white/[0.06] transition-colors duration-300 group-hover:border-[#00f2ff]/40">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px] text-[#00f2ff]">
              <path d={m.glyph} />
            </svg>
          </div>
          <span className="font-mono text-[11px] tracking-[0.14em] text-white/25">{m.n}</span>
        </div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-white">{m.title}</h3>
        <p className="text-[0.9rem] leading-relaxed text-gray-400">{m.body}</p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  KINETIC FINALE                                                     */
/* ------------------------------------------------------------------ */

const FINALE = [
  { w: "Attention", hot: false },
  { w: "Is", hot: false },
  { w: "Rented.", hot: false },
  { w: "Revenue", hot: true },
  { w: "Is", hot: false },
  { w: "Owned.", hot: true },
];

function KineticWord({
  word,
  hot,
  index,
  total,
  progress,
}: {
  word: string;
  hot: boolean;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * 0.7;
  const opacity = useTransform(progress, [start, start + 0.14], [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.22em] inline-block ${hot ? GRADIENT_TEXT : "text-white"}`}
    >
      {word}
    </motion.span>
  );
}

function KineticFinale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  return (
    <section ref={ref} className="px-8 py-32 md:px-12 md:py-48">
      <h2 className="mx-auto max-w-[16ch] text-center text-[clamp(2.4rem,9vw,7rem)] font-black leading-[0.92] tracking-[-0.045em]">
        {FINALE.map((f, i) => (
          <KineticWord
            key={`${f.w}-${i}`}
            word={f.w}
            hot={f.hot}
            index={i}
            total={FINALE.length}
            progress={scrollYProgress}
          />
        ))}
      </h2>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BIG-TYPE OUTCOME MOMENT                                             */
/* ------------------------------------------------------------------ */

function BigTypeMoment() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.4"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section ref={ref} className="px-8 py-32 md:px-12 md:py-48">
      <motion.div style={{ opacity, y }} className="mx-auto max-w-5xl text-center">
        <h2 className="text-[clamp(2.4rem,8vw,6rem)] font-black leading-[0.95] tracking-[-0.045em]">
          Traffic is not the goal.{" "}
          <span className={GRADIENT_TEXT}>Revenue is.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-[48ch] text-lg leading-relaxed text-gray-400">
          Clicks, impressions, followers — vanity if they never convert. We build the system
          that turns attention into customers, and customers into compounding revenue.
        </p>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SOLUTIONS SHOWCASE — LL-style headline + Apple accordion/media      */
/*  Left: click-to-expand service accordion.                           */
/*  Right: media panel that swaps with the open item.                  */
/*  media: drop a real image/video path per item when assets arrive.   */
/* ------------------------------------------------------------------ */

type Solution = {
  key: string;
  title: string;
  body: string;
  glyph: string;
  color: string;
  media?: string; // e.g. "/services/digital-marketing/paid.webp" — placeholder until assets land
};

const SOLUTIONS: Solution[] = [
  {
    key: "digital",
    title: "Digital Marketing",
    body: "Research, creative, and relentless performance analysis across paid, search, and social. Integrated campaigns that put you in front of ready-to-buy audiences and turn attention into qualified leads and measurable revenue — not vanity metrics.",
    glyph: "M4 19h16M6 15l4-4 3 3 6-7",
    color: "#00f2ff",
  },
  {
    key: "seo",
    title: "SEO & AIEO Optimization",
    body: "Technical SEO, keyword research, and answer-engine optimization that surface you in Google — and inside ChatGPT, Perplexity, and AI Overviews — pulling qualified traffic that compounds long after the work is done.",
    glyph: "M11 4a7 7 0 100 14 7 7 0 000-14zM16 16l4 4",
    color: "#ff00ea",
  },
  {
    key: "social",
    title: "Social Media Management",
    body: "We run your platforms end to end — compelling content, consistent publishing, and performance-driven optimization that builds brand awareness and an audience you own, not one you rent.",
    glyph: "M12 8a2 2 0 100 4 2 2 0 000-4M6 6a8 8 0 000 12M18 6a8 8 0 010 12",
    color: "#00f2ff",
  },
  {
    key: "web",
    title: "Innovative Web Design",
    body: "Conversion-first sites engineered for speed across every device — award-worthy design wired for direct response, so every campaign lands on a page built to turn clicks into customers.",
    glyph: "M4 5h16v14H4zM4 9h16M7 7h.01M10 7h.01",
    color: "#ffcc00",
  },
  {
    key: "automation",
    title: "AI-Powered Automation",
    body: "AI agents and workflows wired into your funnels, email, and operations — automating the busywork, compressing the sales cycle, and compounding results while your team focuses elsewhere.",
    glyph: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l3 3m6 6l3 3m0-12l-3 3m-6 6l-3 3",
    color: "#ff00ea",
  },
];

function SolutionIcon({ d, color, size = "h-6 w-6" }: { d: string; color: string; size?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={size} style={{ color }}>
      <path d={d} />
    </svg>
  );
}

function MediaPanel({ s }: { s: Solution }) {
  // When assets arrive, swap this block for: <img src={s.media} .../> or <video>.
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 transition-all duration-500"
        style={{ background: `radial-gradient(60% 60% at 50% 40%, ${s.color}26, transparent 70%)` }}
      />
      <div className="relative flex flex-col items-center gap-5 px-8 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-2xl border border-white/[0.12] bg-white/[0.06] backdrop-blur-xl">
          <SolutionIcon d={s.glyph} color={s.color} size="h-9 w-9" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400">{s.title}</span>
      </div>
    </div>
  );
}

function SolutionAccordion() {
  const [open, setOpen] = useState(0);
  const active = SOLUTIONS[open];

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_1.15fr]">
      {/* accordion */}
      <div className="flex flex-col gap-3">
        {SOLUTIONS.map((s, i) => {
          const isOpen = i === open;
          return (
            <div
              key={s.key}
              className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                isOpen
                  ? "border-white/20 bg-white/[0.06]"
                  : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-white/10 bg-white/[0.06]">
                    <SolutionIcon d={s.glyph} color={isOpen ? s.color : "#9aa4b0"} size="h-5 w-5" />
                  </span>
                  <span className="text-lg font-bold tracking-tight text-white">{s.title}</span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.3, 0.8, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-6 text-[0.95rem] leading-relaxed text-gray-300 md:px-6">
                      {s.body}
                    </p>
                    {/* media on mobile lives inside the open panel */}
                    <div className="px-5 pb-6 md:hidden">
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.03]">
                        <MediaPanel s={s} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* synced media panel (desktop) */}
      <div className="hidden md:block">
        <div className="sticky top-24 aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.3, 0.8, 0.3, 1] }}
              className="absolute inset-0"
            >
              <MediaPanel s={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SolutionsShowcase() {
  return (
    <section className="relative px-8 py-24 md:px-12 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(34% 44% at 18% 30%, rgba(0,242,255,0.16), transparent 70%), radial-gradient(34% 44% at 82% 40%, rgba(255,0,234,0.13), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl md:mb-20">
          <Eyebrow>// WHAT WE DO</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,5.6vw,4.25rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">
            Attract customers. Drive leads.{" "}
            <span className={GRADIENT_TEXT}>Grow revenue.</span>
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-gray-400">
            We build integrated campaigns that put you in front of the right audience, turn
            attention into qualified leads, and compound into measurable revenue — data-driven,
            relentlessly optimized, and engineered to scale.
          </p>
        </div>
        <SolutionAccordion />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PINNED FUNNEL — sticky section; stages light up as you scroll      */
/* ------------------------------------------------------------------ */

const FUNNEL_STAGES = [
  { key: "ATTRACT", n: "01", label: "Attract", color: "#00f2ff", copy: "Get seen. Content, search, and creative that put you in front of ready-to-buy attention." },
  { key: "CAPTURE", n: "02", label: "Capture", color: "#ff00ea", copy: "Turn interest into contacts. Ads, lead systems, and funnels that collect intent before it cools." },
  { key: "CONVERT", n: "03", label: "Convert", color: "#ffcc00", copy: "Close the sale. Funnels and email that walk the buyer from first click to checkout." },
  { key: "SCALE", n: "04", label: "Scale", color: "#ffffff", copy: "Compound it. Automation and optimization that grow results without growing overhead." },
];

function PinnedFunnel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.floor(v * FUNNEL_STAGES.length);
    setActive(Math.max(0, Math.min(FUNNEL_STAGES.length - 1, idx)));
  });

  const stage = FUNNEL_STAGES[active];

  return (
    <section ref={ref} className="relative h-[360vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-8 md:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 blur-[120px] transition-all duration-700"
          style={{ background: `radial-gradient(45% 50% at 50% 50%, ${stage.color}22, transparent 70%)` }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          {/* left: changing copy */}
          <div>
            <Eyebrow>// THE FUNNEL</Eyebrow>
            <div className="mt-5 min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.3, 0.8, 0.3, 1] }}
                >
                  <div className="font-mono text-sm tracking-[0.24em]" style={{ color: stage.color }}>
                    {stage.n}
                  </div>
                  <h2 className="mt-3 text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.04em] text-white">
                    {stage.label}.
                  </h2>
                  <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-gray-300">{stage.copy}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex gap-2">
              {FUNNEL_STAGES.map((s, i) => (
                <span
                  key={s.key}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === active ? 28 : 10,
                    background: i <= active ? s.color : "rgba(255,255,255,0.18)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* right: funnel bars */}
          <div className="flex flex-col items-center gap-3">
            {FUNNEL_STAGES.map((s, i) => {
              const isActive = i === active;
              const passed = i < active;
              return (
                <div
                  key={s.key}
                  className="relative flex items-center justify-center rounded-2xl border transition-all duration-500"
                  style={{
                    width: `${100 - i * 17}%`,
                    height: 74,
                    borderColor: isActive ? s.color : "rgba(255,255,255,0.10)",
                    background: isActive ? `${s.color}1f` : passed ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                    boxShadow: isActive ? `0 0 34px ${s.color}55` : "none",
                    opacity: isActive ? 1 : passed ? 0.72 : 0.4,
                  }}
                >
                  <span
                    className="font-mono text-xs uppercase tracking-[0.16em]"
                    style={{ color: isActive ? s.color : "rgba(255,255,255,0.6)" }}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function DigitalMarketingClient() {
  return (
    <main className="min-h-screen bg-black text-white antialiased">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-8 pb-24 pt-40 md:px-12 md:pb-32 md:pt-52">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/4 left-1/2 h-[70vh] w-[120vw] -translate-x-1/2 rounded-full opacity-45 blur-[120px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,242,255,0.20), rgba(255,0,234,0.12) 55%, transparent 75%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.3, 0.8, 0.3, 1] }}
          >
            <span className="mb-6 inline-block rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-300 backdrop-blur-xl">
              // Digital Marketing
            </span>
            <h1 className="mx-auto max-w-[24ch] text-[clamp(2rem,6vw,4.5rem)] font-black leading-[1.02] tracking-[-0.04em]">
              We don&apos;t run campaigns. We build{" "}
              <span className={GRADIENT_TEXT}>growth engines</span>.
            </h1>
            <p className="mx-auto mt-7 max-w-[56ch] text-lg leading-relaxed text-gray-400">
              Every channel that turns attention into owned revenue — strategy, creative, media,
              and automation — run by one team under one roof.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/#booking-terminal"
                className="group/btn inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] px-7 py-4 text-[15px] font-semibold leading-none tracking-tight text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                Book a Strategy Call
              </a>
              <a
                href="#arsenal"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-[15px] font-semibold leading-none tracking-tight text-white transition-colors duration-300 hover:border-white/40"
              >
                See the arsenal
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= BIG-TYPE OUTCOME MOMENT ================= */}
      <BigTypeMoment />

      {/* ================= SOLUTIONS SHOWCASE (accordion + media) ================= */}
      <SolutionsShowcase />

      {/* ================= PINNED FUNNEL ================= */}
      <PinnedFunnel />

      {/* ================= KPIS ================= */}
      <section className="relative px-8 py-24 md:px-12 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-55 blur-[110px]"
          style={{
            background:
              "radial-gradient(34% 44% at 18% 40%, rgba(0,242,255,0.17), transparent 70%), radial-gradient(34% 44% at 52% 30%, rgba(255,0,234,0.14), transparent 70%), radial-gradient(32% 42% at 84% 46%, rgba(255,204,0,0.11), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-12 md:mb-16">
            <Eyebrow>// BY THE NUMBERS</Eyebrow>
            <h2 className="mt-5 max-w-[20ch] text-[clamp(2rem,5.2vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
              Results, not promises.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {KPIS.map((k) => (
              <div
                key={k.label}
                className="group relative overflow-hidden rounded-[18px] border border-white/[0.12] bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00f2ff]/50 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_30px_rgba(0,242,255,0.18)]"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
                <div className="relative">
                  <div className="text-[clamp(2.4rem,4vw,3.4rem)] font-black leading-none tracking-[-0.05em]">
                    <Counter to={k.to} prefix={k.prefix} suffix={k.suffix} decimals={k.decimals} />
                  </div>
                  <div className="mt-4 text-lg font-semibold text-white">{k.label}</div>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-gray-400">
                    {k.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= THE ARSENAL (BENTO) ================= */}
      <section id="arsenal" className="relative px-8 py-24 md:px-12 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 blur-[110px]"
          style={{
            background:
              "radial-gradient(38% 46% at 20% 24%, rgba(0,242,255,0.18), transparent 70%), radial-gradient(38% 46% at 72% 20%, rgba(255,0,234,0.15), transparent 70%), radial-gradient(34% 42% at 46% 84%, rgba(255,204,0,0.11), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionHead
            eyebrow="// THE GROWTH ARSENAL"
            title="Drive your business with our marketing engine."
            body="We engineer data-driven campaigns that turn attention into action. From search visibility to social engagement, every channel is wired into one system built to generate qualified leads and measurable revenue — not vanity metrics. Filter by funnel stage; hover any card to see what's inside."
          />

          <ServiceArsenal />
        </div>
      </section>

      {/* ================= METHOD ================= */}
      <section className="relative px-8 py-24 md:px-12 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-55 blur-[110px]"
          style={{
            background:
              "radial-gradient(36% 44% at 26% 26%, rgba(0,242,255,0.16), transparent 70%), radial-gradient(36% 44% at 74% 30%, rgba(255,0,234,0.13), transparent 70%), radial-gradient(32% 40% at 50% 86%, rgba(255,204,0,0.10), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionHead
            eyebrow="// THE METHOD"
            title="Four steps. Compounding growth."
            body="Every engagement runs the same route — from first audit to scaling what works. No handoffs, no black boxes."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {METHOD.map((m, i) => (
              <MethodCard key={m.n} m={m} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= KINETIC FINALE ================= */}
      <KineticFinale />

      {/* ================= CTA ================= */}
      <PhenomenonCTA />

      {/* ================= STICKY BOOKING BAR ================= */}
      <StickyBookingBar
        message="Ready to build your growth engine?"
        messageShort="Build your growth engine."
      />
    </main>
  );
}
