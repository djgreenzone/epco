"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { href: "/services/product-development", label: "Product Development" },
  { href: "/services/web-development", label: "Web Development" },
  { href: "/services/digital-marketing", label: "Digital Marketing" },
  { href: "/services/direct-response", label: "Direct Response" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const bar = "absolute left-0 block h-[2px] w-full bg-white transition-all duration-300";

  return (
    <header className="z-50 w-full bg-black text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-6 px-8 md:px-12">
        <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <img src="/epco-mark.png" alt="EPCO" className="h-10 w-10 object-contain" />
          <span className="font-heading text-3xl font-black tracking-tighter text-white">EPCO.</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (<a key={l.href} href={l.href} className="font-mono text-sm uppercase text-gray-400 transition-colors hover:text-[#00f2ff]">{l.label}</a>))}
          <a href="/#booking-terminal" className="rounded-xl bg-white px-6 py-2 font-mono text-sm font-bold uppercase text-black transition-opacity hover:opacity-80">Let&apos;s Talk</a>
        </div>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} className="relative z-50 grid h-11 w-11 place-items-center rounded-xl border border-white/15 transition-colors hover:border-[#00f2ff]/50 md:hidden">
          <span className="relative block h-4 w-5">
            <span className={bar + (open ? " top-[7px] rotate-45" : " top-0")} />
            <span className={bar + " top-[7px]" + (open ? " opacity-0" : " opacity-100")} />
            <span className={bar + (open ? " top-[7px] -rotate-45" : " top-[14px]")} />
          </span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden">
            <nav className="flex h-full flex-col justify-center gap-2 px-8 pb-24">
              {LINKS.map((l, i) => (<motion.a key={l.href} href={l.href} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }} className="border-b border-white/10 py-5 text-3xl font-extrabold tracking-tight text-white">{l.label}</motion.a>))}
              <motion.a href="/#booking-terminal" onClick={() => setOpen(false)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] px-7 py-4 font-mono text-sm font-bold uppercase text-black">Let&apos;s Talk</motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
