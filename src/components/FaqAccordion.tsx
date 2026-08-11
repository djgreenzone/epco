"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  FAQ ACCORDION — shared across service pages.                       */
/*  Pair with the same data emitted as FAQPage JSON-LD in page.tsx.    */
/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

export default function FaqAccordion({
  eyebrow = "// FAQ",
  title,
  body,
  faqs,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  faqs: Faq[];
}) {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative px-8 py-24 md:px-12 md:py-32">
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-14 md:mb-20">
          <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
            {eyebrow}
          </span>
          <h2 className="mt-5 max-w-[20ch] text-[clamp(2rem,5.2vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white">
            {title}
          </h2>
          {body && <p className="mt-5 max-w-[60ch] text-gray-400">{body}</p>}
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = i === open;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-white/20 bg-white/[0.06]"
                    : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <h3 className="text-lg font-bold tracking-tight text-white">{f.q}</h3>
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
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
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
