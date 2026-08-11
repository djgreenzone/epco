"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import PhenomenonCTA from "@/components/PhenomenonCTA";
import StickyBookingBar from "@/components/StickyBookingBar";
import { DIRECT_RESPONSE_FAQ } from "./faq";

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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
      {children}
    </span>
  );
}

function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.3, 0.8, 0.3, 1] }}
      className="mb-14 md:mb-20"
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 max-w-[20ch] text-[clamp(2rem,5.2vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
        {title}
      </h2>
      {body && <p className="mt-5 max-w-[60ch] text-gray-400">{body}</p>}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  KPI COUNTER (real, defensible numbers)                            */
/* ------------------------------------------------------------------ */

function Counter({ to, prefix = "", suffix = "", duration = 1800 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setValue(to); return; }
    let raf = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);
  return (
    <span ref={ref} className={`${GRADIENT_TEXT} tabular-nums`}>
      {prefix}{value}{suffix}
    </span>
  );
}

const KPIS = [
  { to: 30, suffix: "+", label: "Years of Direct Response", body: "Three decades launching and scaling as-seen-on-TV products from spot to shelf." },
  { to: 160, suffix: "+", label: "Products Launched", body: "A portfolio of consumer hits taken from concept to national retail." },
  { prefix: "$", to: 1, suffix: "B+", label: "Retail Sales Generated", body: "Combined retail sales driven across the EPCO product portfolio." },
];

/* ------------------------------------------------------------------ */
/*  SERVICES                                                          */
/* ------------------------------------------------------------------ */

type Svc = { eyebrow: string; title: string; body: string; glyph: string; wide?: boolean };

const SERVICES: Svc[] = [
  {
    eyebrow: "// 01. DRTV",
    title: "DRTV & Infomercials",
    body: "Short-form spots and long-form infomercials engineered to sell — a demonstrable offer, a proven script structure, and a call to action that converts viewers into buyers.",
    glyph: "M4 5h16v11H4zM9 20h6M8 16v4M16 16v4M9 9l4 2.5L9 14V9z",
    wide: true,
  },
  {
    eyebrow: "// 02. MEDIA",
    title: "Direct Response Media Buying",
    body: "TV and cross-channel media bought and optimized against cost-per-acquisition and ROAS — never vanity reach.",
    glyph: "M4 19h16M7 15l4-4 3 3 6-7",
  },
  {
    eyebrow: "// 03. RETAIL",
    title: "QVC, HSN & Retail",
    body: "Product, pitch, pricing, and supply chain prepared for QVC, HSN, and national retail distribution.",
    glyph: "M4 6h16l-1.5 12h-13zM9 6V4h6v2",
  },
  {
    eyebrow: "// 04. OFFER",
    title: "Offer & Creative Development",
    body: "The offer is the campaign. We build the price, premium, guarantee, and creative that make a product irresistible on air and online.",
    glyph: "M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z",
  },
  {
    eyebrow: "// 05. DATA",
    title: "Attribution & Analytics",
    body: "Every response tracked from first impression to fulfilled sale, so spend follows what actually works.",
    glyph: "M5 20V10M12 20V4M19 20v-7",
    wide: true,
  },
];

function ServiceIcon({ d }: { d: string }) {
  return (
    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.06] transition-colors duration-300 group-hover:border-[#00f2ff]/40">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#00f2ff]">
        <path d={d} />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PROCESS                                                           */
/* ------------------------------------------------------------------ */

const PROCESS = [
  { n: "01", title: "Validate", body: "We pressure-test the product against the direct response criteria — demonstrability, margin, mass appeal — before a dollar is spent.", glyph: "M4 5h16v10H9l-5 4V5z" },
  { n: "02", title: "Produce", body: "Offer, script, and creative built for response — spots, infomercials, and the funnels that back them.", glyph: "M4 5h16v11H4zM9 9l4 2.5L9 14V9z" },
  { n: "03", title: "Launch", body: "Media bought and tested in market, optimized daily against cost-per-acquisition and ROAS.", glyph: "M13 3L4 14h7l-1 7 9-11h-7l1-7z" },
  { n: "04", title: "Scale", body: "Winners scaled across channels and into retail — QVC, HSN, and the shelf.", glyph: "M4 19h16M6 15l4-4 3 3 6-7" },
];

/* ------------------------------------------------------------------ */
/*  FAQ (accordion) — mirrors the FAQPage schema                      */
/* ------------------------------------------------------------------ */

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative px-8 py-24 md:px-12 md:py-32">
      <div className="relative mx-auto max-w-4xl">
        <SectionHead
          eyebrow="// FAQ"
          title="Direct response, answered."
          body="The questions inventors and brands ask us most about direct response marketing, DRTV, and getting a product to retail."
        />
        <div className="flex flex-col gap-3">
          {DIRECT_RESPONSE_FAQ.map((f, i) => {
            const isOpen = i === open;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen ? "border-white/20 bg-white/[0.06]" : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <h3 className="text-lg font-bold tracking-tight text-white">{f.q}</h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[0.98rem] leading-relaxed text-gray-300">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */

export default function DirectResponseClient() {
  return (
    <main className="min-h-screen bg-black text-white antialiased">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-8 pb-24 pt-40 md:px-12 md:pb-32 md:pt-52">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/4 left-1/2 h-[70vh] w-[120vw] -translate-x-1/2 rounded-full opacity-45 blur-[120px]"
          style={{ background: "radial-gradient(closest-side, rgba(0,242,255,0.20), rgba(255,0,234,0.12) 55%, transparent 75%)" }}
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.3, 0.8, 0.3, 1] }}>
            <span className="mb-6 inline-block rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-300 backdrop-blur-xl">
              // Direct Response Marketing
            </span>
            <h1 className="mx-auto max-w-[22ch] text-[clamp(2rem,6vw,4.5rem)] font-black leading-[1.02] tracking-[-0.04em]">
              Direct response marketing that <span className={GRADIENT_TEXT}>moves product</span>.
            </h1>
            <p className="mx-auto mt-7 max-w-[60ch] text-lg leading-relaxed text-gray-400">
              We are a direct response marketing agency built on 30 years of as-seen-on-TV hits —
              DRTV, infomercials, media buying, and QVC/HSN launches engineered to turn attention
              into measurable, immediate sales.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="/#booking-terminal" className="rounded-full bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] px-7 py-4 text-[15px] font-semibold leading-none tracking-tight text-black transition-transform duration-300 hover:-translate-y-0.5">
                Book a Strategy Call
              </a>
              <a href="#services" className="rounded-full border border-white/15 px-7 py-4 text-[15px] font-semibold leading-none tracking-tight text-white transition-colors duration-300 hover:border-white/40">
                See what we do
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= PROOF / KPIS ================= */}
      <section className="relative px-8 py-24 md:px-12 md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-55 blur-[110px]" style={{ background: "radial-gradient(34% 44% at 18% 40%, rgba(0,242,255,0.17), transparent 70%), radial-gradient(34% 44% at 52% 30%, rgba(255,0,234,0.14), transparent 70%), radial-gradient(32% 42% at 84% 46%, rgba(255,204,0,0.11), transparent 70%)" }} />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-12 md:mb-16">
            <Eyebrow>// THE TRACK RECORD</Eyebrow>
            <h2 className="mt-5 max-w-[22ch] text-[clamp(2rem,5.2vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
              Built by the people behind the hits.
            </h2>
            <p className="mt-5 max-w-[62ch] text-gray-400">
              EPCO has spent three decades turning products into phenomena — the George Foreman Grill,
              the Snuggie, the Ninja, the Magic Bullet, the Ped Egg — through direct response.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {KPIS.map((k) => (
              <div key={k.label} className="group relative overflow-hidden rounded-[18px] border border-white/[0.12] bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00f2ff]/50 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_30px_rgba(0,242,255,0.18)] md:p-10">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
                <div className="relative">
                  <div className="text-[clamp(2.4rem,4vw,3.4rem)] font-black leading-none tracking-[-0.05em]">
                    <Counter to={k.to} prefix={k.prefix} suffix={k.suffix} />
                  </div>
                  <div className="mt-4 text-lg font-semibold text-white">{k.label}</div>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-gray-400">{k.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="relative px-8 py-24 md:px-12 md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 blur-[110px]" style={{ background: "radial-gradient(38% 46% at 20% 24%, rgba(0,242,255,0.18), transparent 70%), radial-gradient(38% 46% at 72% 20%, rgba(255,0,234,0.15), transparent 70%), radial-gradient(34% 42% at 46% 84%, rgba(255,204,0,0.11), transparent 70%)" }} />
        <div className="relative mx-auto max-w-6xl">
          <SectionHead
            eyebrow="// WHAT WE DO"
            title="Everything a direct response launch needs."
            body="From the offer to the airwaves to the shelf — the full direct response stack, run in house and accountable to a number."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SERVICES.map((s) => (
              <article key={s.title} className={`${CARD_BASE} ${s.wide ? "md:col-span-2" : ""}`}>
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
                <div className="relative">
                  <ServiceIcon d={s.glyph} />
                  <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">{s.eyebrow}</span>
                  <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">{s.title}</h3>
                  <p className="max-w-[60ch] text-[0.95rem] leading-relaxed text-gray-400">{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="relative px-8 py-24 md:px-12 md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-55 blur-[110px]" style={{ background: "radial-gradient(36% 44% at 26% 26%, rgba(0,242,255,0.16), transparent 70%), radial-gradient(36% 44% at 74% 30%, rgba(255,0,234,0.13), transparent 70%), radial-gradient(32% 40% at 50% 86%, rgba(255,204,0,0.10), transparent 70%)" }} />
        <div className="relative mx-auto max-w-6xl">
          <SectionHead
            eyebrow="// THE METHOD"
            title="Validate. Produce. Launch. Scale."
            body="The same disciplined route behind every EPCO direct response success — no guesswork, every step measured."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((m, i) => (
              <motion.div
                key={m.n}
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
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <FaqSection />

      {/* ================= CTA ================= */}
      <PhenomenonCTA />

      {/* ================= STICKY BOOKING BAR ================= */}
      <StickyBookingBar
        message="Ready to launch a direct response campaign?"
        messageShort="Launch a direct response campaign."
      />
    </main>
  );
}
