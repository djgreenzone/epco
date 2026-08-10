"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { media } from "@/lib/media";

/* ------------------------------------------------------------------ */
/*  TOKENS                                                             */
/* ------------------------------------------------------------------ */

const SANS = "var(--font-geist-sans), Arial, sans-serif";
const sans = { fontFamily: SANS } as const;

const GRADIENT = "bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]";
const GRADIENT_TEXT = `${GRADIENT} bg-clip-text text-transparent`;

const CARD_BASE =
  "group relative overflow-hidden rounded-[18px] border border-white/[0.12] bg-white/[0.04] p-8 " +
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 " +
  "hover:-translate-y-1.5 hover:border-[#00f2ff]/50 hover:bg-white/[0.07] " +
  "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_30px_rgba(0,242,255,0.16)]";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/*  PRIMITIVES                                                         */
/* ------------------------------------------------------------------ */

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff] ${className}`}
    >
      {children}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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

function CTAButton({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={sans}
      className={`inline-flex items-center justify-center rounded-full ${GRADIENT} px-8 py-4 text-[15px] font-semibold leading-none tracking-tight text-black transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f2ff]`}
    >
      <span>{label}</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTENT                                                            */
/* ------------------------------------------------------------------ */

type Step = { n: string; title: string; body: string[] };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Evaluate",
    body: [
      "Before spending heavily on engineering or inventory, we evaluate the idea, the consumer problem, competitive products, market demand, pricing, margins, and sales potential.",
      "Not every idea should be built. Knowing that early can save time, money, and frustration.",
    ],
  },
  {
    n: "02",
    title: "Design and Engineer",
    body: [
      "We translate the idea into product specifications, technical drawings, materials, dimensions, features, and functional requirements.",
      "Every design decision considers performance, usability, manufacturing, cost, and the final customer experience.",
    ],
  },
  {
    n: "03",
    title: "Prototype and Refine",
    body: [
      "Prototypes allow us to test how the product looks, feels, and performs before committing to production.",
      "We identify problems, improve functionality, simplify manufacturing, and refine the product until it is ready for the next stage.",
    ],
  },
  {
    n: "04",
    title: "Source and Manufacture",
    body: [
      "Through our global network, we identify qualified manufacturers, compare capabilities, review pricing, coordinate samples, and prepare the product for scalable production.",
      "Our sourcing capabilities include the United States, China, Vietnam, Mexico, and other manufacturing markets.",
    ],
  },
  {
    n: "05",
    title: "Cost and Validate",
    body: [
      "A product must do more than work. It must support a profitable business.",
      "We evaluate product cost, packaging, freight, fulfillment, returns, marketing expenses, retail pricing, and projected margins before recommending commercialization.",
    ],
  },
  {
    n: "06",
    title: "Position and Package",
    body: [
      "Consumers rarely buy features alone. They buy solutions, benefits, convenience, and stories they understand.",
      "We develop the product positioning, offer structure, name, packaging direction, demonstrations, and sales message needed to make the value immediately clear.",
    ],
  },
  {
    n: "07",
    title: "Launch and Scale",
    body: [
      "Once the product is ready, EPCO can help coordinate manufacturing, inventory, fulfillment, digital assets, direct response marketing, customer acquisition, and retail expansion.",
      "The objective is not simply to launch a product. The objective is to build a sustainable brand.",
    ],
  },
];


type DisciplineCard = { tag: string; q: string; why: string; img?: string };

const DISCIPLINE_ACCENTS = ["#00f2ff", "#ff00ea", "#ffcc00"];

const DISCIPLINE_CARDS: DisciplineCard[] = [
  {
    tag: "Problem",
    q: "Does it solve a real and understandable problem?",
    why: "No problem, no sale. If people can't name the pain, they won't pay for the cure.",
  },
  {
    tag: "Demonstration",
    q: "Can the benefit be demonstrated quickly?",
    why: "Direct response is won in seconds. If you can't show it fast, you can't sell it.",
  },
  {
    tag: "Clarity",
    q: "Will consumers understand why they need it?",
    why: "If the value isn't obvious, the sale is already lost. Clarity beats cleverness.",
  },
  {
    tag: "Manufacturing",
    q: "Can it be manufactured consistently?",
    why: "A product that can't be built the same way every time can't scale, or survive returns.",
  },
  {
    tag: "Margin",
    q: "Does the pricing support healthy margins?",
    why: "Revenue is vanity. Margin is what's left after media, freight, and returns, and it's what keeps you alive.",
  },
  {
    tag: "Endurance",
    q: "Can the product survive media, fulfillment, returns, and scale?",
    why: "Launching is easy. Surviving volume, logistics, and returns is what separates a product from a business.",
  },
  {
    tag: "Franchise",
    q: "Can it become more than a single item?",
    why: "One SKU is a product. A line is a brand. We build toward the second.",
  },
];

const NEGATIVES: string[] = [
  "Inflated agency structures",
  "Endless chains of account managers",
  "Theories from people who have never built anything",
];

const BRING: string[] = [
  "A sketch on paper.",
  "A handmade prototype.",
  "An existing product that needs improvement.",
  "A sample that costs too much.",
  "A category you believe should exist.",
  "A problem nobody has solved correctly.",
];

const CATEGORIES: string[] = [
  "Consumer products",
  "Housewares and appliances",
  "Textile and comfort products",
  "Travel and accessibility products",
  "Tools and professional equipment",
  "Health and wellness concepts",
  "Safety and emergency products",
  "Connected products and applications",
];

const JOURNEY: { label: string; note: string }[] = [
  { label: "Sketch", note: "The idea on paper." },
  { label: "CAD Design", note: "Engineered to exact specification." },
  { label: "Prototype", note: "Made real and tested by hand." },
  { label: "Tooling", note: "Built for repeatable production." },
  { label: "Testing", note: "Validated for performance and cost." },
  { label: "Packaging", note: "Designed to sell on the shelf." },
  { label: "Launch", note: "Into the market, built to scale." },
];

/* ------------------------------------------------------------------ */
/*  SECTION SHELL                                                      */
/* ------------------------------------------------------------------ */

function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`px-8 py-24 md:px-12 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROCESS — pinned scroll-scrub                                      */
/*  Desktop: the section pins to the viewport; the left 01–07 rail     */
/*  stays visible while the right panel advances stage by stage as     */
/*  you scroll. Mobile / reduced-motion: a plain stacked list.         */
/* ------------------------------------------------------------------ */

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function ProcessRail({ active }: { active: number }) {
  return (
    <ul className="space-y-5 border-l border-white/10">
      {STEPS.map((s, i) => {
        const on = i === active;
        const done = i < active;
        return (
          <li key={s.n} className="relative">
            <span
              className={`absolute -left-px top-1/2 h-7 w-[2px] -translate-y-1/2 rounded-full transition-all duration-300 ${
                on ? "bg-[#00f2ff] opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`flex items-baseline gap-3 pl-6 transition-all duration-300 ${
                on ? "opacity-100" : done ? "opacity-50" : "opacity-30"
              }`}
            >
              <span className="font-mono text-[12px] tracking-widest text-[#00f2ff]">
                {s.n}
              </span>
              <span
                style={sans}
                className="text-[15px] font-semibold tracking-tight text-white"
              >
                {s.title}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ProcessPinned() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
    setActive(idx);
  });

  return (
    <div
      ref={wrapRef}
      style={{ height: `${STEPS.length * 85}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden px-8 pb-16 pt-20 md:px-12 md:pt-24">
        <div className="mx-auto w-full max-w-6xl">
          <Eyebrow>{"// THE PROCESS"}</Eyebrow>
          <h2
            style={sans}
            className="mt-4 max-w-3xl text-[clamp(1.75rem,4vw,2.85rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
          >
            The Product Development Process
          </h2>
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-6xl flex-1 items-center">
          <div className="grid w-full grid-cols-[280px_1fr] gap-16 xl:gap-24">
            <div>
              <ProcessRail active={active} />
            </div>

            <div className="relative min-h-[340px]">
              {STEPS.map((s, i) => {
                const on = i === active;
                return (
                  <motion.div
                    key={s.n}
                    aria-hidden={!on}
                    initial={false}
                    animate={{ opacity: on ? 1 : 0, y: on ? 0 : 28 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={`absolute inset-0 ${on ? "" : "pointer-events-none"}`}
                  >
                    <span className="font-mono text-[12px] tracking-[0.2em] text-gray-500">
                      {s.n} / {STEPS[STEPS.length - 1].n}
                    </span>
                    <span
                      aria-hidden
                      className={`mt-2 block text-[64px] font-black leading-none tracking-[-0.04em] md:text-[84px] ${GRADIENT_TEXT}`}
                      style={sans}
                    >
                      {s.n}
                    </span>
                    <h3
                      style={sans}
                      className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl"
                    >
                      {s.title}
                    </h3>
                    <div className="mt-5 max-w-xl space-y-4">
                      {s.body.map((p, j) => (
                        <p
                          key={j}
                          style={sans}
                          className="text-base leading-relaxed text-gray-400"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessStacked() {
  return (
    <div className="mx-auto max-w-6xl px-8 md:px-12">
      <div className="space-y-16">
        {STEPS.map((s) => (
          <Reveal key={s.n}>
            <div className="scroll-mt-28">
              <span
                aria-hidden
                className={`block text-[56px] font-black leading-none tracking-[-0.04em] ${GRADIENT_TEXT}`}
                style={sans}
              >
                {s.n}
              </span>
              <h3
                style={sans}
                className="mt-4 text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl"
              >
                {s.title}
              </h3>
              <div className="mt-5 max-w-xl space-y-4">
                {s.body.map((p, j) => (
                  <p
                    key={j}
                    style={sans}
                    className="text-[15px] leading-relaxed text-gray-400"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ProcessSection() {
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();
  const pinned = isDesktop && !reduce;

  if (pinned) {
    return (
      <section className="relative">
        <ProcessPinned />
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto mb-12 max-w-6xl px-8 md:px-12">
        <Reveal>
          <Eyebrow>{"// THE PROCESS"}</Eyebrow>
          <h2
            style={sans}
            className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
          >
            The Product Development Process
          </h2>
        </Reveal>
      </div>

      <ProcessStacked />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  DISCIPLINE — question card carousel (Apple "Get to know" style)     */
/* ------------------------------------------------------------------ */

function QuestionCard({ card, index }: { card: DisciplineCard; index: number }) {
  const [open, setOpen] = useState(false);
  const accent = DISCIPLINE_ACCENTS[index % DISCIPLINE_ACCENTS.length];
  return (
    <li className="relative h-[440px] w-[280px] shrink-0 snap-start overflow-hidden rounded-[22px] border border-white/10 md:h-[500px] md:w-[340px]">
      {/* background — image drops in later, gradient placeholder for now */}
      {card.img ? (
        <img
          src={media("product-development", card.img)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 18% 0%, ${accent}2e, transparent 55%), linear-gradient(180deg, #0c0d12, #060608)`,
          }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/40"
      />

      {/* front */}
      <div className="relative z-10 flex h-full flex-col p-6 md:p-7">
        <div
          className="font-mono text-[11px] uppercase tracking-[0.14em]"
          style={{ color: accent }}
        >
          {card.tag}
        </div>
        <h3
          style={sans}
          className="mt-3 max-w-[14ch] text-xl font-bold leading-snug tracking-[-0.01em] text-white md:text-[1.6rem]"
        >
          {card.q}
        </h3>
      </div>

      {/* reveal — why it matters */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-end bg-black/85 p-6 backdrop-blur-md transition-opacity duration-300 md:p-7 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="font-mono text-[11px] uppercase tracking-[0.14em]"
          style={{ color: accent }}
        >
          {card.tag}
        </div>
        <h3 style={sans} className="mt-3 text-lg font-bold leading-snug text-white md:text-xl">
          {card.q}
        </h3>
        <p style={sans} className="mt-4 text-[14.5px] leading-relaxed text-gray-300">
          {card.why}
        </p>
      </div>

      {/* toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? `Close ${card.tag}` : `Why ${card.tag} matters`}
        className="absolute bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </li>
  );
}

function DisciplineSection() {
  const scroller = useRef<HTMLUListElement>(null);
  const page = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <Eyebrow>{"// DISCIPLINE"}</Eyebrow>
          <h2
            style={sans}
            className="mt-5 text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
          >
            Built With Commercial Discipline
          </h2>
          <p style={sans} className="mt-6 max-w-xl text-[15px] leading-relaxed text-gray-400">
            Every product is evaluated against the questions that matter. Open each one to
            see why.
          </p>
        </Reveal>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => page(-1)}
            aria-label="Previous questions"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40 hover:bg-white/5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            aria-label="Next questions"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40 hover:bg-white/5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <ul
        ref={scroller}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {DISCIPLINE_CARDS.map((c, i) => (
          <QuestionCard key={c.q} card={c} index={i} />
        ))}
      </ul>

      {/* Verdict bar */}
      <Reveal delay={0.05}>
        <div className="relative mt-12 overflow-hidden rounded-[18px] border border-white/[0.12] bg-white/[0.03] p-8 backdrop-blur-xl md:p-10">
          <div aria-hidden className={`absolute left-0 top-0 h-full w-1.5 ${GRADIENT}`} />
          <div className="pl-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
              {"// The verdict"}
            </div>
            <p style={sans} className="mt-4 text-lg leading-relaxed text-gray-200 md:text-xl">
              A product is not ready because everyone loves the prototype. It is ready when
              the product, economics, manufacturing, positioning, and customer experience{" "}
              <span className={GRADIENT_TEXT}>work together</span>.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  LAUNCH — scroll-scrubbed rocket frame sequence                      */
/*  EngineScrub-style: pinned section, scroll drives the 96 frames.     */
/* ------------------------------------------------------------------ */

const LAUNCH_BASE = process.env.NEXT_PUBLIC_MEDIA_URL ?? "";
const LAUNCH_DIR = `${LAUNCH_BASE}/services/product-development`;
const LAUNCH_COUNT = 96;
const launchUrl = (i: number) =>
  `${LAUNCH_DIR}/epco-launch-${String(i).padStart(3, "0")}.webp`;

function LaunchScrubSection() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(0);
  const [mobile, setMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  // preload frames (desktop only)
  useEffect(() => {
    if (mobile) return;
    let alive = true;
    let d = 0;
    const imgs: HTMLImageElement[] = [];
    const tick = () => {
      d += 1;
      setDone(d);
      if (d === LAUNCH_COUNT) setReady(true);
    };
    for (let i = 1; i <= LAUNCH_COUNT; i++) {
      const img = new Image();
      img.src = launchUrl(i);
      img.onload = () => alive && tick();
      img.onerror = () => alive && tick();
      imgs.push(img);
    }
    frames.current = imgs;
    return () => {
      alive = false;
    };
  }, [mobile]);

  const draw = (index: number) => {
    const c = canvas.current;
    const img = frames.current[index];
    if (!c || !img || !img.naturalWidth) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(c.clientWidth * dpr);
    const h = Math.round(c.clientHeight * dpr);
    if (c.width !== w || c.height !== h) {
      c.width = w;
      c.height = h;
    }
    const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);
  };

  useEffect(() => {
    if (ready) draw(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // scroll progress -> frame index (section pins while it plays)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!ready) return;
    const i = Math.min(LAUNCH_COUNT - 1, Math.max(0, Math.round(p * (LAUNCH_COUNT - 1))));
    requestAnimationFrame(() => draw(i));
  });

  // redraw on resize
  useEffect(() => {
    const onResize = () => {
      if (ready) draw(Math.round(scrollYProgress.get() * (LAUNCH_COUNT - 1)));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <section
      ref={section}
      className={`relative bg-black ${mobile ? "h-screen" : "h-[300vh]"}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {mobile ? (
          <img
            src={launchUrl(60)}
            alt=""
            className="absolute inset-0 block h-full w-full object-cover"
          />
        ) : (
          <canvas ref={canvas} className="absolute inset-0 block h-full w-full" />
        )}

        {/* scrim: darken lower-left for the title, keep the rocket bright */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/85 via-black/15 to-transparent"
        />

        <div className="absolute inset-0 z-10 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-8 pb-16 md:px-12 md:pb-24">
            <h2
              style={sans}
              className="max-w-3xl text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1.0] tracking-[-0.045em] text-white"
            >
              From Idea to <span className={GRADIENT_TEXT}>Global Launch</span>
            </h2>
            <p style={sans} className="mt-5 max-w-xl text-lg leading-relaxed text-gray-200">
              Creative design, engineering, and development — carried all the way to
              launch. EPCO is with you at every step.
            </p>
            {!mobile && !ready ? (
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
                {"// Loading "}
                {Math.round((done / LAUNCH_COUNT) * 100)}%
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ProductDevelopmentClient() {
  const reduce = useReducedMotion();

  return (
    <main style={sans} className="overflow-x-clip bg-black text-white">
      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden px-8 py-32 md:px-12">
        {/* background video */}
        <video
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
          src={media("product-development", "epco-hero.mp4")}
          poster={media("product-development", "epco-hero-poster.webp")}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        {/* black gradient from the bottom up */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
        />
        {/* ambient glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            initial={false}
            animate={reduce ? {} : { opacity: [0.25, 0.5, 0.25], scale: [1, 1.08, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-[-10%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[#00f2ff]/20 blur-[120px]"
          />
          <motion.div
            initial={false}
            animate={reduce ? {} : { opacity: [0.2, 0.4, 0.2], scale: [1.05, 1, 1.05] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[10%] top-[30%] h-[45vh] w-[45vh] rounded-full bg-[#ff00ea]/15 blur-[120px]"
          />
        </div>

        <div className="relative mx-auto w-full max-w-5xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Eyebrow>{"// PRODUCT DEVELOPMENT"}</Eyebrow>
            <h1
              style={sans}
              className="mt-6 text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-white"
            >
              From an Idea to{" "}
              <span className={GRADIENT_TEXT}>a Product People Want</span>
            </h1>
            <p
              style={sans}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
            >
              A great idea is only the beginning. EPCO provides the experience,
              engineering, sourcing, and commercial strategy required to turn that idea
              into a product that can be manufactured, marketed, and scaled.
            </p>
            <p
              style={sans}
              className="mt-5 max-w-2xl text-[15px] leading-relaxed text-gray-500"
            >
              Bring us your sketch, prototype, sample, or simply the problem you want to
              solve. We will help determine what the product should become and whether
              the opportunity makes commercial sense.
            </p>
            <div className="mt-10">
              <CTAButton href="/#booking-terminal" label="Book a Call" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- KPIS ---------------- */}
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
          {[
            {
              to: 160,
              suffix: "+",
              label: "Product Launches",
              body: "Consumer products taken from sketch to shelf since 1992.",
            },
            {
              to: 30,
              suffix: "+",
              label: "Years of Experience",
              body: "Three decades behind product development, manufacturing, and marketing.",
            },
            {
              to: 5,
              suffix: "+",
              label: "Manufacturing Markets",
              body: "Qualified sourcing across the United States, China, Vietnam, Mexico, and beyond.",
            },
          ].map((k) => (
            <div
              key={k.label}
              className="group relative overflow-hidden rounded-[18px] border border-white/[0.12] bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00f2ff]/50 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_30px_rgba(0,242,255,0.18)] md:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent"
              />
              <div className="relative">
                <div
                  style={sans}
                  className="text-[clamp(2rem,3.6vw,3.2rem)] font-black leading-none tracking-[-0.05em]"
                >
                  <Counter to={k.to} suffix={k.suffix} />
                </div>
                <div style={sans} className="mt-4 text-lg font-semibold text-white">
                  {k.label}
                </div>
                <p
                  style={sans}
                  className="mt-2 max-w-[32ch] text-[0.93rem] leading-relaxed text-gray-400"
                >
                  {k.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- MANIFESTO ---------------- */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{"// EXECUTION"}</Eyebrow>
            <h2
              style={sans}
              className="mt-5 text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
            >
              Ideas Are Easy.
              <br />
              <span className={GRADIENT_TEXT}>Execution Is Everything.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 lg:pt-2">
            <p style={sans} className="text-[15px] leading-relaxed text-gray-400 md:text-base">
              Most products do not fail because the original idea was bad. They fail
              because the development process ignored cost, manufacturing, positioning,
              consumer behavior, or the realities of bringing a product to market.
            </p>
            <p style={sans} className="text-[15px] leading-relaxed text-gray-400 md:text-base">
              Since 1992, Eddy Pham has worked behind more than 160 product launches,
              helping inventors, entrepreneurs, investors, and established companies
              transform concepts into marketable products.
            </p>
            <p style={sans} className="text-[15px] leading-relaxed text-gray-300 md:text-base">
              We do more than make something look good. We help build something that
              works, solves a real problem, supports a profitable business model, and
              gives consumers a reason to buy.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- PROCESS ---------------- */}
      <ProcessSection />

      {/* ---------------- JOURNEY ---------------- */}
      <Section>
        {/* Heading — outside the container */}
        <Reveal>
          <Eyebrow>{"// THE JOURNEY"}</Eyebrow>
          <h2
            style={sans}
            className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
          >
            From Sketch to Launch
          </h2>
          <p style={sans} className="mt-6 max-w-xl text-[15px] leading-relaxed text-gray-400">
            Every product travels the same road, from a first rough idea to a unit on the
            shelf. This is the path we walk with you.
          </p>
        </Reveal>

        {/* Container — timeline + globe */}
        <Reveal delay={0.05}>
          <div className="relative mt-12 overflow-hidden rounded-[28px] border border-white/15 bg-black shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_30px_80px_-30px_rgba(0,0,0,0.9)] lg:mt-16">
            <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-2 lg:items-center lg:gap-6">
              {/* Left: timeline (reveals in sequence, Sketch → Launch) */}
              <div className="relative">
                <motion.div
                  aria-hidden
                  className={`absolute bottom-2 left-[15px] top-2 w-[2px] origin-top ${GRADIENT} opacity-30`}
                  initial={reduce ? false : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: EASE }}
                />
                <motion.ul
                  className="space-y-6"
                  initial={reduce ? "show" : "hidden"}
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
                >
                  {JOURNEY.map((j) => (
                    <motion.li
                      key={j.label}
                      className="relative flex items-start gap-5 pl-1"
                      variants={{
                        hidden: { opacity: 0, x: -14 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
                      }}
                    >
                      <span className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                        <span className={`h-3 w-3 rounded-full ${GRADIENT} ring-4 ring-black`} />
                      </span>
                      <div>
                        <div
                          style={sans}
                          className="text-base font-bold tracking-[-0.01em] text-white md:text-lg"
                        >
                          {j.label}
                        </div>
                        <div
                          style={sans}
                          className="mt-0.5 text-[13.5px] leading-relaxed text-gray-400"
                        >
                          {j.note}
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Right: rotating globe */}
              <div className="relative flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-[540px]">
                  <video
                    className="relative h-full w-full object-contain"
                    src={media("product-development", "epco-globe.mp4")}
                    poster={media("product-development", "epco-globe-poster.webp")}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ---------------- LAUNCH (mouse-scrub) ---------------- */}
      <LaunchScrubSection />

      {/* ---------------- COMMERCIAL DISCIPLINE ---------------- */}
      <DisciplineSection />

      {/* ---------------- WORK DIRECTLY WITH EXPERIENCE ---------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{"// THE PARTNER"}</Eyebrow>
            <h2
              style={sans}
              className="mt-5 text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
            >
              Work Directly With Experience
            </h2>
            <div className="mt-6 space-y-5">
              <p style={sans} className="text-[15px] leading-relaxed text-gray-400 md:text-base">
                Eddy has spent more than 30 years behind product development,
                manufacturing, marketing, and commercialization.
              </p>
              <p style={sans} className="text-[15px] leading-relaxed text-gray-400 md:text-base">
                He has never needed to be the face of every success. His focus has always
                been doing the work, protecting the client&apos;s opportunity, solving
                problems, and helping the finished product reach the consumer.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-gray-500">
              {"// What you won't find"}
            </div>
            <ul className="mt-6 space-y-3">
              {NEGATIVES.map((n, i) => (
                <li key={n}>
                  <span className="relative inline-block">
                    <span
                      style={sans}
                      className="text-xl font-semibold leading-snug tracking-[-0.01em] text-gray-500 md:text-2xl"
                    >
                      {n}
                    </span>
                    <motion.span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 rounded-full bg-gradient-to-r from-[#ff00ea] to-[#00f2ff]"
                      initial={reduce ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.14 }}
                    />
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
                {"// What you get"}
              </div>
              <p
                style={sans}
                className={`mt-4 text-2xl font-extrabold leading-tight tracking-[-0.02em] md:text-[2rem] ${GRADIENT_TEXT}`}
              >
                Just experience, judgment, execution, and accountability.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- BRING US WHAT YOU HAVE ---------------- */}
      <Section>
        <Reveal>
          <Eyebrow>{"// START HERE"}</Eyebrow>
          <h2
            style={sans}
            className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
          >
            Bring Us What You Have
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BRING.map((b, i) => (
            <Reveal key={b} delay={(i % 3) * 0.06}>
              <div className={`${CARD_BASE} flex h-full items-start gap-4`}>
                <span
                  className={`mt-1 block h-2.5 w-2.5 shrink-0 rounded-full ${GRADIENT}`}
                />
                <span style={sans} className="text-[15px] font-medium text-gray-200">
                  {b}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.05}>
          <p
            style={sans}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-gray-300"
          >
            You do not need to have every answer. That is why product development exists.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 border-t border-white/[0.08] pt-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
              {"// What we help develop"}
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {CATEGORIES.map((c) => (
                <span
                  key={c}
                  style={sans}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-gray-300 transition-colors duration-300 hover:border-[#00f2ff]/40 hover:text-white"
                >
                  {c}
                </span>
              ))}
              <span
                style={sans}
                className="rounded-full border border-[#00f2ff]/40 bg-white/[0.03] px-4 py-2 text-[13px] font-semibold text-[#00f2ff]"
              >
                Categories that don&apos;t exist yet
              </span>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ---------------- FINAL CTA (aurora — matches web-dev PhenomenonCTA) ---------------- */}
      <section id="book" className="relative overflow-hidden px-8 py-24 md:px-12 md:py-32">
        <style>{`
          @keyframes epco-drift-a {
            0%,100% { transform: translate3d(-12%, -6%, 0) scale(1); }
            33%     { transform: translate3d(14%, 10%, 0) scale(1.25); }
            66%     { transform: translate3d(6%, -14%, 0) scale(0.9); }
          }
          @keyframes epco-drift-b {
            0%,100% { transform: translate3d(18%, 8%, 0) scale(1.1); }
            40%     { transform: translate3d(-16%, -10%, 0) scale(0.85); }
            70%     { transform: translate3d(-4%, 16%, 0) scale(1.3); }
          }
          @keyframes epco-drift-c {
            0%,100% { transform: translate3d(4%, 16%, 0) scale(0.95); }
            50%     { transform: translate3d(-14%, -8%, 0) scale(1.2); }
          }
          @keyframes epco-sweep { to { transform: rotate(360deg); } }
          @keyframes epco-grid  { to { transform: translateY(48px); } }
          @keyframes epco-sheen {
            0%   { transform: translateX(-120%); }
            55%  { transform: translateX(220%); }
            100% { transform: translateX(220%); }
          }
          @media (prefers-reduced-motion: reduce) { .epco-anim { animation: none !important; } }
        `}</style>

        <div
          aria-hidden
          className="epco-anim pointer-events-none absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.16] blur-[100px]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, #00f2ff 60deg, transparent 130deg, #ff00ea 210deg, transparent 280deg, #ffcc00 330deg, transparent 360deg)",
            animation: "epco-sweep 48s linear infinite",
          }}
        />

        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="epco-anim absolute left-[6%] top-[8%] h-[46vmax] w-[46vmax] rounded-full blur-[110px]"
            style={{
              background: "radial-gradient(circle, rgba(0,242,255,0.42), transparent 66%)",
              animation: "epco-drift-a 22s ease-in-out infinite",
            }}
          />
          <div
            className="epco-anim absolute right-[4%] top-[18%] h-[42vmax] w-[42vmax] rounded-full blur-[110px]"
            style={{
              background: "radial-gradient(circle, rgba(255,0,234,0.34), transparent 66%)",
              animation: "epco-drift-b 27s ease-in-out infinite",
            }}
          />
          <div
            className="epco-anim absolute bottom-[-8%] left-1/3 h-[38vmax] w-[38vmax] rounded-full blur-[110px]"
            style={{
              background: "radial-gradient(circle, rgba(255,204,0,0.24), transparent 66%)",
              animation: "epco-drift-c 33s ease-in-out infinite",
            }}
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden opacity-[0.22]"
          style={{
            maskImage: "linear-gradient(to top, #000 10%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to top, #000 10%, transparent 85%)",
            perspective: "260px",
          }}
        >
          <div
            className="epco-anim absolute inset-x-[-50%] bottom-0 h-[220%]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,242,255,0.30) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.18) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              transform: "rotateX(66deg)",
              transformOrigin: "bottom center",
              animation: "epco-grid 2.6s linear infinite",
            }}
          />
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="group relative overflow-hidden rounded-[18px] border border-white/[0.14] bg-white/[0.05] p-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.10] via-transparent to-transparent"
            />
            <div
              aria-hidden
              className="epco-anim pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
              style={{ animation: "epco-sheen 7s ease-in-out infinite" }}
            />

            <div className="relative max-w-2xl">
              <span
                style={sans}
                className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]"
              >
                {"// LET'S BUILD"}
              </span>
              <h2
                style={sans}
                className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-white"
              >
                Start With the Possibility
              </h2>
              <p style={sans} className="mt-6 text-lg leading-relaxed text-gray-200">
                Thirty minutes. Bring the idea, the sketch, the sample, or the spreadsheet.
              </p>
              <p style={sans} className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-400">
                We will discuss where the product is today, what it may take to move
                forward, and whether EPCO is the right partner to help build it.
              </p>
              <a
                href="/#booking-terminal"
                style={sans}
                className="group/btn mt-9 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] px-7 py-4 text-[15px] font-semibold leading-none tracking-tight text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="relative block h-[1.15em] overflow-hidden">
                  <span className="block transition-transform duration-[420ms] ease-[cubic-bezier(0.6,0,0.2,1)] group-hover/btn:-translate-y-full">
                    <span className="block">Book a Call</span>
                    <span className="block">Book a Call</span>
                  </span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  className="h-3.5 w-3.5 transition-transform duration-[420ms] group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1"
                >
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
            </div>
          </div>

          <p
            style={sans}
            className="mt-16 text-center text-[clamp(1.5rem,4vw,2.75rem)] font-extrabold tracking-[-0.03em]"
          >
            <span className={GRADIENT_TEXT}>An Expert Is Expensive.</span>{" "}
            <span className="text-white">An Amateur Is a Fortune.</span>
          </p>
        </div>
      </section>
    </main>
  );
}
