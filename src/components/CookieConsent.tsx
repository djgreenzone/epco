"use client";

import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  COOKIE CONSENT — dormant until you add trackers.                   */
/*                                                                     */
/*  The site currently runs only Vercel Analytics, which is cookieless */
/*  and consent-exempt — so CONSENT_ENABLED is false and this renders  */
/*  nothing.                                                           */
/*                                                                     */
/*  WHEN YOU ADD GA4 / META PIXEL / GOOGLE ADS / TIKTOK PIXEL:         */
/*    1. Set CONSENT_ENABLED = true below → the banner appears.        */
/*    2. Load each tracker ONLY after consent. Two ways:               */
/*         • guard on import:  if (hasConsent()) { ...inject script }  */
/*         • or listen:        window.addEventListener(                */
/*             "epco-consent-change", (e) => { ... })                  */
/*    3. Keep essential/cookieless analytics (Vercel) running always.  */
/* ------------------------------------------------------------------ */

const CONSENT_ENABLED = false; // ← flip to true the day you add GA4 / ad pixels
const STORAGE_KEY = "epco-consent"; // stored value: "granted" | "denied"

/** Read current marketing/analytics consent. Use this to gate tracker scripts. */
export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "granted";
}

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!CONSENT_ENABLED) return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== "granted" && stored !== "denied") setShow(true);
  }, []);

  const choose = (choice: "granted" | "denied") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
      document.cookie = `${STORAGE_KEY}=${choice}; path=/; max-age=${60 * 60 * 24 * 180}; SameSite=Lax`;
      window.dispatchEvent(new CustomEvent("epco-consent-change", { detail: choice }));
    } catch {
      /* storage blocked — fail closed (no tracking) */
    }
    setShow(false);
  };

  if (!CONSENT_ENABLED || !show) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4">
      <div className="flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-white/[0.14] bg-black/80 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:flex-row sm:items-center sm:gap-6">
        <p className="flex-1 text-[0.9rem] leading-relaxed text-gray-300">
          We use cookies to measure traffic and improve your experience. You can accept or
          decline non-essential cookies. See our{" "}
          <a
            href="/legal/privacy"
            className="text-[#00f2ff] underline underline-offset-2 transition-colors hover:text-white"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-full bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] px-5 py-2.5 text-sm font-semibold leading-none tracking-tight text-black transition-transform duration-300 hover:-translate-y-0.5"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
