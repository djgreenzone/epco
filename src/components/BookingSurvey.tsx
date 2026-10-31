"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Multi-step qualification survey for the homepage booking terminal.
// Replaces the old 3-field gatekeeper form. On completion it posts the full
// lead to /api/lead (Supabase insert + email to Eddy) and calls onComplete,
// which reveals the cal.com embed in the parent.

type Choice = { value: string; label: string };

type ChoiceStep = {
  kind: "choice";
  key: string;
  label: string;
  options: Choice[];
};

// A "slide" holds one or two question steps shown together.
const SLIDES: ChoiceStep[][] = [
  [
    {
      kind: "choice",
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
      kind: "choice",
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
      kind: "choice",
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
      kind: "choice",
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
      kind: "choice",
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
      kind: "choice",
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

const TOTAL_SLIDES = SLIDES.length + 1; // + the final contact slide

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

  // A question slide is complete once every question on it is answered.
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
    // Reveal the calendar immediately; the network call is best-effort.
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

  const progress = ((slide + (currentSlideComplete ? 1 : 0)) / TOTAL_SLIDES) * 100;

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <div className="p-8 md:p-12">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="font-mono text-[10px] text-[#00f2ff] uppercase tracking-[0.2em] font-bold">
            Intake Protocol
          </span>
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.2em]">
            Step {slide + 1} / {TOTAL_SLIDES}
          </span>
        </div>
        <div className="h-[3px] w-full bg-black/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00f2ff] to-[#ff00ea]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="min-h-[360px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-10"
          >
            {!isContactSlide ? (
              SLIDES[slide].map((step) => (
                <div key={step.key} className="space-y-4">
                  <h3
                    className="text-xl md:text-2xl font-heading font-bold text-white"
                    style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}
                  >
                    {step.label}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {step.options.map((opt) => {
                      const active = answers[step.key] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => select(step.key, opt.value)}
                          className={`px-5 py-3 rounded-full border text-sm font-medium transition-all ${
                            active
                              ? "border-[#00f2ff] bg-[#00f2ff]/10 text-white shadow-[0_0_20px_rgba(0,242,255,0.25)]"
                              : "border-gray-700 bg-black/40 text-gray-300 hover:border-[#00f2ff]/50 hover:text-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-8">
                <h3
                  className="text-xl md:text-2xl font-heading font-bold text-white"
                  style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}
                >
                  Last step — where do we send the details?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#00f2ff] transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Work Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#00f2ff] transition-all outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    In one or two sentences, what do you want to accomplish?
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={3}
                    placeholder="The more specific, the better Eddy can prep for your call..."
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#00f2ff] transition-all outline-none resize-none"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between mt-10 gap-4">
        {slide > 0 ? (
          <button
            type="button"
            onClick={() => go(slide - 1)}
            className="px-6 py-3 rounded-full border border-gray-700 text-gray-300 text-sm font-mono uppercase tracking-wider hover:border-gray-500 hover:text-white transition-all"
          >
            Back
          </button>
        ) : (
          <span />
        )}

        {!isContactSlide ? (
          <button
            type="button"
            onClick={() => go(slide + 1)}
            disabled={!currentSlideComplete}
            className="px-8 py-3 bg-gradient-to-r from-[#00f2ff] to-[#ff00ea] text-white font-black uppercase tracking-widest text-sm rounded-full transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(0,242,255,0.3)] disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:scale-[1.03]"
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
            className="px-8 py-3 bg-gradient-to-r from-[#00f2ff] to-[#ff00ea] text-white font-black uppercase tracking-widest text-sm rounded-full transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(0,242,255,0.3)] disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:scale-[1.03]"
          >
            {submitting ? "Sending..." : "See Eddy's Availability"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
