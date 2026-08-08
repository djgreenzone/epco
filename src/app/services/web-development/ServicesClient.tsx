"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import WorkCarousel from "@/components/WorkCarousel";
import HeroGallery from "@/components/HeroGallery";
import StackCarousel from "@/components/StackCarousel";
import PhenomenonCTA from "@/components/PhenomenonCTA";
import PhasePipeline from "@/components/PhasePipeline";
import EngineScrub from "@/components/EngineScrub";
import { media } from "@/lib/media";

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
/*  SWAP HOVER BUTTON                                                  */
/*  Label is rendered twice; the stack slides up one full height on    */
/*  hover so the duplicate takes its place.                            */
/* ------------------------------------------------------------------ */

function SwapButton({
  label,
  variant = "primary",
  href = "#",
}: {
  label: string;
  variant?: "primary" | "ghost";
  href?: string;
}) {
  const shell =
    variant === "primary"
      ? `${GRADIENT} text-black font-semibold`
      : "bg-transparent text-white border border-white/15 hover:border-white/40";

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[15px] leading-none tracking-tight transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f2ff] ${shell}`}
    >
      <span className="relative block h-[1.15em] overflow-hidden">
        <span className="block transition-transform duration-[420ms] ease-[cubic-bezier(0.6,0,0.2,1)] group-hover/btn:-translate-y-full [a:hover_&]:-translate-y-full">
          <span className="block">{label}</span>
          <span className="block">{label}</span>
        </span>
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        className="h-3.5 w-3.5 transition-transform duration-[420ms] ease-[cubic-bezier(0.6,0,0.2,1)] [a:hover_&]:translate-x-[3px] [a:hover_&]:-translate-y-[3px]"
      >
        <path d="M7 17L17 7M17 7H8M17 7v9" />
      </svg>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  EYEBROW                                                            */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  KPI COUNTER — counts from 0 when scrolled into view                */
/* ------------------------------------------------------------------ */

function Counter({
  to,
  suffix = "",
  duration = 1600,
}: {
  to: number;
  suffix?: string;
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
      // ease-out cubic
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={`${GRADIENT_TEXT} tabular-nums`}>
      {value}
      {suffix}
    </span>
  );
}

const KPIS = [
  {
    to: 100,
    suffix: "ms",
    label: "System Latency",
    body: "Sub-second load times. Every millisecond of lag is lost revenue.",
  },
  {
    to: 9,
    suffix: "-Figures",
    label: "Scale Capacity",
    body: "Infrastructure stress-tested to handle massive direct response traffic.",
  },
  {
    to: 100,
    suffix: "%",
    label: "Custom Stacks",
    body: "Zero templates. Pure, weaponized code built specifically for your category.",
  },
];

/* ------------------------------------------------------------------ */
/*  SERVICE DATA                                                       */
/* ------------------------------------------------------------------ */

type Service = {
  eyebrow: string;
  title: string;
  body: string;
  wide?: boolean;
  glyph: string;
};

const SERVICES: Service[] = [
  {
    eyebrow: "// 01. ARCHITECTURE",
    title: "High-Conversion Web Design",
    body: "We turn passive traffic into active revenue. Frictionless UI/UX engineered strictly for direct response, speed, and transactional scale.",
    wide: true,
    glyph: "M4 6h16M4 12h10M4 18h7",
  },
  {
    eyebrow: "// 02. MOBILE",
    title: "Native App Development",
    body: "iOS and Android applications built for mass-market adoption. Zero lag, infinite scale, and immediate visual sizzle.",
    glyph: "M7 3h10v18H7zM11 18h2",
  },
  {
    eyebrow: "// 03. AUTOMATION",
    title: "AI Integration & ML Workflows",
    body: "Leverage cutting-edge machine learning to automate operations, slash overhead, and compress the sales cycle.",
    glyph: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l3 3m6 6l3 3m0-12l-3 3m-6 6l-3 3",
  },
  {
    eyebrow: "// 04. INFRASTRUCTURE",
    title: "Full-Stack Enterprise Architecture",
    body: "From secure Supabase databases to globally distributed Vercel edge networks. We build the engine so you can drive.",
    wide: true,
    glyph: "M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01",
  },
];

function ServiceIcon({ d }: { d: string }) {
  return (
    <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.06] transition-colors duration-300 group-hover:border-[#00f2ff]/40">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        className="h-6 w-6 text-[#00f2ff]"
      >
        <path d={d} />
      </svg>
    </div>
  );
}

function BentoCard({ s }: { s: Service }) {
  return (
    <div className={`${CARD_BASE} ${s.wide ? "md:col-span-2" : ""}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
      <div className="relative">
        <ServiceIcon d={s.glyph} />
      <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
        {s.eyebrow}
      </span>
      <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">{s.title}</h3>
      <p className="max-w-[52ch] text-[0.95rem] leading-relaxed text-gray-400">{s.body}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DRAG-TO-SCROLL CAROUSEL                                            */
/* ------------------------------------------------------------------ */

function ServiceCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      setLimit(Math.max(0, track.current.scrollWidth - viewport.current.offsetWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={viewport} className="overflow-hidden">
      <motion.div
        ref={track}
        drag="x"
        dragConstraints={{ left: -limit, right: 0 }}
        dragElastic={0.08}
        dragMomentum={false}
        whileTap={{ cursor: "grabbing" }}
        className="flex w-max cursor-grab gap-6 pb-2"
      >
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className={`${CARD_BASE} w-[300px] shrink-0 select-none md:w-[440px]`}
          >
            <ServiceIcon d={s.glyph} />
            <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
              {s.eyebrow}
            </span>
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">{s.title}</h3>
            <p className="text-[0.95rem] leading-relaxed text-gray-400">{s.body}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  KINETIC SCROLL FINALE                                              */
/* ------------------------------------------------------------------ */

const FINALE = [
  { w: "Good", hot: false },
  { w: "Design", hot: false },
  { w: "Is", hot: false },
  { w: "Expected.", hot: false },
  { w: "Unreasonable", hot: true },
  { w: "ROI", hot: true },
  { w: "Is", hot: false },
  { w: "Mandatory.", hot: true },
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
  // Each word lights across its own slice of the scroll range, staggered.
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
/*  SECTION HEADING                                                    */
/* ------------------------------------------------------------------ */

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
      <h2 className="mt-5 max-w-[17ch] text-[clamp(2rem,5.2vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
        {title}
      </h2>
      {body && <p className="mt-5 max-w-[54ch] text-gray-400">{body}</p>}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ServicesClient() {
  return (
    <main className="min-h-screen bg-black text-white antialiased">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-8 pb-24 pt-40 md:px-12 md:pb-32 md:pt-52">
        {/* Background video — drop the Supabase CDN URL into src */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={media("web-development", "epco-hero-earth.webp")}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.35]"
        >
          <source src={media("web-development", "epco-hero-earth-1920.mp4")} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/4 left-1/2 h-[70vh] w-[120vw] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,242,255,0.18), rgba(255,0,234,0.10) 55%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.3, 0.8, 0.3, 1] }}
          >
            <h1 className="mx-auto max-w-[30ch] text-center text-[clamp(1.5rem,4.2vw,3.75rem)] font-black leading-[1.05] tracking-[-0.035em]">
              We don&apos;t build websites. We design{" "}
              <span className={GRADIENT_TEXT}>digital experiences</span> for your customer.
            </h1>
          </motion.div>

          <HeroGallery />
        </div>
      </section>

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
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
          {KPIS.map((k, i) => (
            <div
              key={k.label}
              className="group relative overflow-hidden rounded-[18px] border border-white/[0.12] bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00f2ff]/50 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_30px_rgba(0,242,255,0.18)] md:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent"
              />
              <div className="relative">
              <div className="text-[clamp(2rem,3.6vw,3.2rem)] font-black leading-none tracking-[-0.05em]">
                <Counter to={k.to} suffix={k.suffix} />
              </div>
              <div className="mt-4 text-lg font-semibold text-white">{k.label}</div>
              <p className="mt-2 max-w-[32ch] text-[0.93rem] leading-relaxed text-gray-400">
                {k.body}
              </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BENTO GRID ================= */}
      <section id="stack" className="relative px-8 py-24 md:px-12 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 blur-[110px]"
          style={{
            background:
              "radial-gradient(38% 46% at 20% 30%, rgba(0,242,255,0.18), transparent 70%), radial-gradient(38% 46% at 72% 24%, rgba(255,0,234,0.15), transparent 70%), radial-gradient(34% 42% at 46% 82%, rgba(255,204,0,0.11), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionHead
            eyebrow="// THE ARSENAL"
            title="Four capabilities. One engine."
            body="Every build ships on infrastructure we own end to end — no subcontractors, no handoffs, no excuses."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <BentoCard key={s.title} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= DRAG CAROUSEL ================= */}
      <section className="py-24 md:py-32">
        <div className="mx-auto mb-4 max-w-6xl px-8 md:px-12">
          <SectionHead
            eyebrow="// THE FULL STACK"
            title="Everything a site needs. One team."
            body="Nine disciplines most agencies subcontract out. We run all of them in house."
          />
        </div>
        <div className="pl-8 md:pl-12">
          <StackCarousel />
        </div>
        <div className="mx-auto mt-6 max-w-6xl px-8 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500 md:px-12">
          Drag →

      {/* ================= PIPELINE ================= */}
      <PhasePipeline />
        </div>
      </section>

      {/* ================= ENGINE SCRUB ================= */}
      <EngineScrub />

      {/* ================= KINETIC FINALE ================= */}
      <KineticFinale />

      {/* ================= CTA ================= */}
      <PhenomenonCTA />
    </main>
  );
}
