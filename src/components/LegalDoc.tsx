import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  LegalDoc                                                           */
/*  Shared server-rendered layout for the Terms and Privacy pages.     */
/*  No interactivity, so it stays a server component (fast, no JS).    */
/*                                                                     */
/*  Font note: raw <h1>/<h2>/<p> elsewhere in this project get         */
/*  overridden to a condensed mono face (root cause never found), so   */
/*  every text element carries an explicit sans font-family. Inline    */
/*  style wins over the stray stylesheet rule regardless of selector.  */
/* ------------------------------------------------------------------ */

const SANS = { fontFamily: "var(--font-geist-sans), Arial, sans-serif" } as const;

export type LegalSection = {
  n: string;
  title: string;
  body: ReactNode[];
};

export default function LegalDoc({
  eyebrow,
  title,
  effectiveDate,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  intro?: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <section className="px-8 py-24 md:px-12 md:py-32" style={SANS}>
      <div className="mx-auto max-w-3xl">
        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
          {eyebrow}
        </span>

        <h1
          style={SANS}
          className="mt-5 text-[clamp(2.25rem,6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
        >
          {title}
        </h1>

        <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.14em] text-gray-500">
          {effectiveDate}
        </p>

        {intro ? (
          <p
            style={SANS}
            className="mt-8 border-l-2 border-[#00f2ff]/40 pl-5 text-[15px] leading-relaxed text-gray-400"
          >
            {intro}
          </p>
        ) : null}

        <div className="mt-16 space-y-14">
          {sections.map((s) => (
            <div key={s.n} id={`section-${s.n}`} className="scroll-mt-28">
              <h2
                style={SANS}
                className="text-lg font-bold tracking-[-0.01em] text-white md:text-xl"
              >
                <span className="mr-3 font-mono text-[#00f2ff]">{s.n}.</span>
                {s.title}
              </h2>
              <div className="mt-4 space-y-4">
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    style={SANS}
                    className="text-[15px] leading-relaxed text-gray-400"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
