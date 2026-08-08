"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";

type Item = { n: string; eyebrow: string; title: string; body: string; glyph: string };

const STACK: Item[] = [
  { n: "01", eyebrow: "// DESIGN", title: "Web Design",
    body: "Visual direction built around one job: making the buy obvious. No templates, no theme you'll recognize from a competitor.",
    glyph: "M4 6h16M4 12h10M4 18h7" },
  { n: "02", eyebrow: "// EXPERIENCE", title: "UI/UX Design",
    body: "Every click mapped before a line of code is written. Frictionless paths from landing to checkout, tested against real behavior.",
    glyph: "M3 5h18v14H3zM8 5v14M3 10h5" },
  { n: "03", eyebrow: "// INTELLIGENCE", title: "AI Integration",
    body: "Machine learning wired directly into the product - support agents, recommendation engines, and workflows that cut overhead instead of adding headcount.",
    glyph: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l3 3m6 6l3 3m0-12l-3 3m-6 6l-3 3" },
  { n: "04", eyebrow: "// BUILD", title: "Frontend Development",
    body: "Next.js, TypeScript, and Tailwind. Hand-written, version-controlled, and yours to keep. Nothing locked behind a page builder.",
    glyph: "M8 6l-5 6 5 6M16 6l5 6-5 6" },
  { n: "05", eyebrow: "// MESSAGE", title: "Copywriting",
    body: "The words carry the sale. Positioning, headlines, and calls to action written by people who have moved product, not content mills.",
    glyph: "M4 6h16M4 11h16M4 16h9" },
  { n: "06", eyebrow: "// VISIBILITY", title: "SEO & AIO Optimization",
    body: "Technical SEO plus answer-engine optimization, so you surface in Google and inside ChatGPT, Perplexity, and AI Overviews.",
    glyph: "M11 4a7 7 0 100 14 7 7 0 000-14zM16 16l4 4" },
  { n: "07", eyebrow: "// CONVERSION", title: "Conversion Rate Optimization",
    body: "Forms, funnels, and checkout flows tested against each other. Traffic you already have, converting at a higher rate.",
    glyph: "M4 19h16M7 15l4-5 3 3 5-7" },
  { n: "08", eyebrow: "// FOUNDATION", title: "Performance & Infrastructure",
    body: "Vercel edge deployment, global CDN, and a Core Web Vitals budget enforced at build time. Speed is a feature, not a cleanup task.",
    glyph: "M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01" },
  { n: "09", eyebrow: "// MEASUREMENT", title: "Analytics & Integrations",
    body: "GA4, conversion events, and pixels wired correctly the first time - plus CRM, payments, and email connected end to end.",
    glyph: "M5 20V10M12 20V4M19 20v-7" },
];

const SPEED = 34; // px per second

function StackCard({ item }: { item: Item }) {
  return (
    <div className="group relative flex w-[280px] shrink-0 select-none flex-col overflow-hidden rounded-[18px] border border-white/[0.12] bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00f2ff]/50 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_30px_rgba(0,242,255,0.18)] md:w-[360px] md:p-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
      <div className="relative mb-12 flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-[12px] border border-white/10 bg-white/[0.06] transition-colors duration-300 group-hover:border-[#00f2ff]/40">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}
               strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#00f2ff]">
            <path d={item.glyph} />
          </svg>
        </div>
        <span className="font-mono text-[11px] tracking-[0.14em] text-white/20">{item.n}</span>
      </div>
      <span className="relative mb-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">{item.eyebrow}</span>
      <h3 className="relative mb-3 text-2xl font-bold tracking-tight text-white">{item.title}</h3>
      <p className="relative text-[0.95rem] leading-relaxed text-gray-400">{item.body}</p>
    </div>
  );
}

export default function StackCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [half, setHalf] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragging = useRef(false);
  const reduce = useReducedMotion();

  // The list is rendered twice; one full set's width is the wrap point.
  useEffect(() => {
    const measure = () => {
      if (track.current) setHalf(track.current.scrollWidth / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused || dragging.current || reduce || !half) return;
    let next = x.get() - (SPEED * delta) / 1000;
    if (next <= -half) next += half; // seamless wrap
    x.set(next);
  });

  return (
    <div
      className="relative overflow-x-hidden overflow-y-visible py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(40% 60% at 18% 50%, rgba(0,242,255,0.16), transparent 70%), radial-gradient(40% 60% at 58% 40%, rgba(255,0,234,0.13), transparent 70%), radial-gradient(35% 55% at 88% 60%, rgba(255,204,0,0.10), transparent 70%)",
        }}
      />
      <motion.div
        ref={track}
        style={{ x }}
        drag="x"
        dragMomentum={false}
        onDragStart={() => { dragging.current = true; }}
        onDragEnd={() => {
          dragging.current = false;
          // normalise back into the wrap window so motion resumes cleanly
          const v = x.get();
          if (half) x.set(((v % half) + half) % half - half);
        }}
        whileTap={{ cursor: "grabbing" }}
        className="flex w-max cursor-grab items-stretch gap-6"
      >
        {[...STACK, ...STACK].map((item, i) => (
          <StackCard key={`${item.n}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
