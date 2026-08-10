"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  STICKY BOOKING BAR                                                 */
/*  Persistent CTA that slides in after the hero scrolls off.          */
/*  `message` / `messageShort` let each page match its own voice.      */
/* ------------------------------------------------------------------ */

export default function StickyBookingBar({
  message,
  messageShort,
  ctaLabel = "Book a Strategy Call",
  href = "/#booking-terminal",
}: {
  message: string;
  messageShort?: string;
  ctaLabel?: string;
  href?: string;
}) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.3, 0.8, 0.3, 1] }}
          className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
        >
          <div className="flex w-full max-w-2xl items-center gap-4 rounded-full border border-white/[0.14] bg-black/70 py-2.5 pl-6 pr-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
            <span className="hidden flex-1 text-[0.95rem] font-medium text-gray-200 sm:block">
              {message}
            </span>
            <span className="flex-1 text-[0.95rem] font-medium text-gray-200 sm:hidden">
              {messageShort ?? message}
            </span>
            <a
              href={href}
              className="shrink-0 rounded-full bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] px-6 py-3 text-[14px] font-semibold leading-none tracking-tight text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              {ctaLabel}
            </a>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-gray-500 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
