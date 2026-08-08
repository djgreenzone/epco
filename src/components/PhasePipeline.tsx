"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  PHASE PIPELINE                                                     */
/*  Four phases converging into one outcome. SVG connectors carry      */
/*  flowing pulses down toward the brand node.                         */
/* ------------------------------------------------------------------ */

type Phase = {
  n: string;
  title: string;
  body: string;
  glyph: string;
};

const PHASES: Phase[] = [
  { n: "01", title: "Design",   body: "Positioning, wireframes, and visual direction.", glyph: "M4 6h16M4 12h10M4 18h7" },
  { n: "02", title: "Build",    body: "Next.js, TypeScript, Supabase. Written by hand.", glyph: "M8 6l-5 6 5 6M16 6l5 6-5 6" },
  { n: "03", title: "Optimize", body: "Speed, search, and conversion tuned on real data.", glyph: "M4 19h16M7 15l4-5 3 3 5-7" },
  { n: "04", title: "Launch",   body: "Edge deployment, analytics wired, support after launch.", glyph: "M12 3l7 18-7-4-7 4 7-18z" },
];

function Node({ phase, i }: { phase: Phase; i: number }) {
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}
                 strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px] text-[#00f2ff]">
              <path d={phase.glyph} />
            </svg>
          </div>
          <span className="font-mono text-[11px] tracking-[0.14em] text-white/25">{phase.n}</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }} className="mb-2 text-xl font-bold tracking-tight text-white">{phase.title}</h3>
        <p style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif", letterSpacing: "normal" }} className="text-[0.9rem] leading-relaxed text-gray-400">{phase.body}</p>
      </div>
    </motion.div>
  );
}

export default function PhasePipeline() {
  return (
    <section className="relative px-8 py-24 md:px-12 md:py-32">
      <style>{`
        @keyframes epco-flow { to { stroke-dashoffset: -220; } }
        @keyframes epco-brand-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,242,255,0.35); }
          50%     { box-shadow: 0 0 34px 6px rgba(0,242,255,0.18); }
        }
        @media (prefers-reduced-motion: reduce) {
          .epco-flow-path, .epco-brand { animation: none !important; }
        }
      `}</style>

      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-55 blur-[110px]"
        style={{ background: "radial-gradient(36% 44% at 26% 26%, rgba(0,242,255,0.16), transparent 70%), radial-gradient(36% 44% at 74% 30%, rgba(255,0,234,0.13), transparent 70%), radial-gradient(32% 40% at 50% 86%, rgba(255,204,0,0.10), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 md:mb-20">
          <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">{"// THE PIPELINE"}</span>
          <h2 style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif", textTransform: "none" }}
            className="mt-5 max-w-[17ch] text-[clamp(2rem,5.2vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
            Four phases. One outcome.
          </h2>
          <p style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif", letterSpacing: "normal" }} className="mt-5 max-w-[54ch] text-gray-400">
            Every build runs the same route. No handoffs, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((p, i) => <Node key={p.n} phase={p} i={i} />)}
        </div>

        {/* connectors — desktop only; the four columns converge on one point */}
        <div className="hidden lg:block" aria-hidden>
          <svg viewBox="0 0 1000 130" preserveAspectRatio="none" className="h-[130px] w-full">
            <defs>
              <linearGradient id="epco_pipe" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00f2ff" /><stop offset="0.5" stopColor="#ff00ea" /><stop offset="1" stopColor="#ffcc00" />
              </linearGradient>
            </defs>
            {[125, 375, 625, 875].map((x, i) => (
              <g key={x}>
                <path d={`M${x} 0 C ${x} 62, 500 46, 500 126`} stroke="url(#epco_pipe)" strokeWidth="1.5" fill="none" opacity="0.28" />
                <path className="epco-flow-path" d={`M${x} 0 C ${x} 62, 500 46, 500 126`}
                  stroke="url(#epco_pipe)" strokeWidth="2.5" fill="none" strokeLinecap="round"
                  strokeDasharray="14 206"
                  style={{ animation: `epco-flow 3.2s linear infinite`, animationDelay: `${i * 0.55}s` }} />
              </g>
            ))}
          </svg>
        </div>

        {/* brand node */}
        <div className="mt-10 flex justify-center lg:mt-0">
          <a href="#contact"
            className="epco-brand group/b relative inline-flex items-center gap-3 rounded-full border border-white/[0.16] bg-white/[0.06] px-9 py-5 text-[17px] font-bold tracking-tight text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00f2ff]/60"
            style={{ animation: "epco-brand-glow 3.4s ease-in-out infinite" }}>
            <span className="h-2 w-2 rounded-full bg-[#00f2ff]" />
            Your Brand
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}
                 className="h-4 w-4 transition-transform duration-300 group-hover/b:translate-x-1 group-hover/b:-translate-y-1">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
