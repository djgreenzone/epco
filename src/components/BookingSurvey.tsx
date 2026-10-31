"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Multi-step qualification survey for the homepage booking terminal.
// Light-card redesign: a near-white form that visibly lifts off the dark
// section, with numbered questions and high-contrast selectable options so
// it unmistakably reads as "a form to fill out." On completion it posts the
// full lead to /api/lead (Supabase insert + email to Eddy) and calls
// onComplete, which reveals the cal.com embed in the parent.

type Choice = { value: string; label: string };

type ChoiceStep = {
  key: string;
  label: string;
  options: Choice[];
};

// A "slide" holds one or two question steps shown together. The numbering
// below is assigned sequentially across all slides at render time.
const SLIDES: ChoiceStep[][] = [
  [
    {
      key: "help",
      label: "What can I help you with?",
      options: [
        "Product Development",
        "Website",
        "Ecommerce",
        "Branding",
        "Marketing",
        "Manufacturing",
        "Prototype",
        "Sourcing",
        "Launch Strategy",
        "Other",
      ].map((v) => ({ value: v, label: v })),
    },
    {
      key: "stage",
      label: "What stage are you at?",
      options: [
        "Just an Idea",
        "Concept Developed",
        "Prototype",
        "Manufacturing Ready",
        "Already Selling",
        "Looking to Scale",
      ].map((v) => ({ value: v, label: v })),
    },
  ],
  [
    {
      key: "selling",
      label: "Are you currently selling the product or service?",
      options: [
        { value: "Not Yet", label: "Not Yet" },
        { value: "Under $10K/month", label: "Under $10K / month" },
        { value: "$10K to $50K/month", label: "$10K – $50K / month" },
        { value: "$50K to $250K/month", label: "$50K – $250K / month" },
        { value: "$250K+/month", label: "$250K+ / month" },
      ],
    },
    {
      key: "goal",
      label: "What is your primary goal?",
      options: [
        "Develop My Idea",
        "Get to Manufacturing",
        "Launch",
        "Increase Sales",
        "Build My Brand",
        "Fix What I Already Have",
        "Raise Capital",
        "Other",
      ].map((v) => ({ value: v, label: v })),
    },
  ],
  [
    {
      key: "budget",
      label: "What budget have you allocated?",
      options: [
        { value: "Under $5K", label: "Under $5K" },
        { value: "$5K to $15K", label: "$5K – $15K" },
        { value: "$15K to $50K", label: "$15K – $50K" },
        { value: "$50K to $100K", label: "$50K – $100K" },
        { value: "$100K+", label: "$100K+" },
        { value: "Need Guidance", label: "Need Guidance" },
      ],
    },
    {
      key: "timeline",
      label: "When are you ready to start?",
      options: [
        { value: "Immediately", label: "Immediately" },
        { value: "Within 30 Days", label: "Within 30 Days" },
        { value: "1 to 3 Months", label: "1 – 3 Months" },
        { value: "3 to 6 Months", label: "3 – 6 Months" },
        { value: "Just Exploring", label: "Just Exploring" },
      ],
    },
  ],
];

// Total questions across all slides, for the "Question N of 9" labels.
const TOTAL_QUESTIONS =
  SLIDES.reduce((n, slide) => n + slide.length, 0) + 1; // + final contact
const TOTAL_SLIDES = SLIDES.length + 1;

// Precompute the global question number for each step.
const QUESTION_NUMBERS: number[][] = (() => {
  let n = 0;
  return SLIDES.map((slide) => slide.map(() => ++n));
})();
const CONTACT_QUESTION_NUMBER = TOTAL_QUESTIONS;

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
  </svg>
);

export default function BookingSurvey({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isContactSlide = slide === SLIDES.length;

  const select = (key: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const currentSlideComplete = isContactSlide
    ? name.trim() !== "" && /\S+@\S+\.\S+/.test(email)
    : SLIDES[slide].every((step) => answers[step.key]);

  const go = (next: number) => {
    setDirection(next > slide ? 1 : -1);
    setSlide(next);
  };

  const submit = async () => {
    setSubmitting(true);
    const payload = { ...answers, name: name.trim(), email: email.trim(), details: details.trim() };
    onComplete();
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Lead submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const answeredThisSlide = isContactSlide
    ? (currentSlideComplete ? 1 : 0)
    : SLIDES[slide].filter((s) => answers[s.key]).length / SLIDES[slide].length;
  const progress = ((slide + answeredThisSlide) / TOTAL_SLIDES) * 100;

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 36 : -36 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -36 : 36 }),
  };

  // --- Light form card -----------------------------------------------------
  return (
    <div className="relative">
      {/* The light card itself, lifting off the dark section */}
      <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] ring-1 ring-black/5 overflow-hidden text-slate-900">
        {/* Header: announces that this is a form */}
        <div className="px-6 md:px-10 pt-8 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#0891b2]">
                Project Intake
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Tell us about your project
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                A few quick questions — takes about 30 seconds. Then pick a time with Eddy.
              </p>
            </div>
            <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Step {slide + 1} of {TOTAL_SLIDES}
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-5 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#00c2d6] to-[#d6008f]"
              animate={{ width: `${Math.max(progress, 4)}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="px-6 md:px-10 py-8 min-h-[380px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="space-y-10"
            >
              {!isContactSlide ? (
                SLIDES[slide].map((step, idx) => {
                  const qNum = QUESTION_NUMBERS[slide][idx];
                  return (
                    <fieldset key={step.key} className="space-y-4">
                      <legend className="flex items-center gap-3 mb-1">
                        <span className="grid place-items-center h-7 w-7 rounded-full bg-slate-900 text-white text-sm font-bold">
                          {qNum}
                        </span>
                        <span className="text-lg md:text-xl font-semibold text-slate-900">
                          {step.label}
                        </span>
                      </legend>
                      <div className="flex flex-wrap gap-2.5 pl-10">
                        {step.options.map((opt) => {
                          const active = answers[step.key] === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => select(step.key, opt.value)}
                              aria-pressed={active}
                              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                                active
                                  ? "border-[#0891b2] bg-[#ecfeff] text-[#0e7490] ring-2 ring-[#0891b2]/30"
                                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-900 hover:bg-slate-50"
                              }`}
                            >
                              {active && (
                                <span className="text-[#0891b2]">
                                  <CheckIcon />
                                </span>
                              )}
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  );
                })
              ) : (
                <fieldset className="space-y-6">
                  <legend className="flex items-center gap-3 mb-2">
                    <span className="grid place-items-center h-7 w-7 rounded-full bg-slate-900 text-white text-sm font-bold">
                      {CONTACT_QUESTION_NUMBER}
                    </span>
                    <span className="text-lg md:text-xl font-semibold text-slate-900">
                      Where should Eddy send the details?
                    </span>
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pl-10">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Work Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 pl-10">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      In one or two sentences, what do you want to accomplish?
                    </label>
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      rows={3}
                      placeholder="The more specific, the better Eddy can prep for your call..."
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/20 outline-none transition-all resize-none"
                    />
                  </div>
                </fieldset>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer / nav */}
        <div className="flex items-center justify-between gap-4 px-6 md:px-10 py-6 border-t border-slate-100 bg-slate-50">
          {slide > 0 ? (
            <button
              type="button"
              onClick={() => go(slide - 1)}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}

          {!isContactSlide ? (
            <button
              type="button"
              onClick={() => go(slide + 1)}
              disabled={!currentSlideComplete}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              Continue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={!currentSlideComplete || submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#00c2d6] to-[#d6008f] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#d6008f]/20 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              {submitting ? "Sending..." : "See Eddy's Availability"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
