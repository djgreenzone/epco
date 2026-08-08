"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const BASE = process.env.NEXT_PUBLIC_MEDIA_URL ?? "";
const DIR = `${BASE}/services/web-development`;
const COUNT = 96;
const url = (i: number) => `${DIR}/epco-seq-${String(i).padStart(3, "0")}.webp`;

export default function EngineScrub() {
  const section = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(0);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    if (mobile) return;
    let alive = true;
    let d = 0;
    const imgs: HTMLImageElement[] = [];
    const tick = () => { d += 1; setDone(d); if (d === COUNT) setReady(true); };
    for (let i = 1; i <= COUNT; i++) {
      const img = new Image();
      img.src = url(i);
      img.onload = () => alive && tick();
      img.onerror = () => alive && tick();
      imgs.push(img);
    }
    frames.current = imgs;
    return () => { alive = false; };
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
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
    const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);
  };

  useEffect(() => { if (ready) draw(0); }, [ready]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!ready) return;
    const i = Math.min(COUNT - 1, Math.max(0, Math.round(p * (COUNT - 1))));
    requestAnimationFrame(() => draw(i));
  });

  useEffect(() => {
    const onResize = () => { if (ready) draw(0); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ready]);

  return (
    <section ref={section} className={`relative bg-black ${mobile ? "h-screen" : "h-[340vh]"}`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {mobile ? (
          <img
            src={`${DIR}/epco-seq-048.webp`}
            alt=""
            className="absolute inset-0 block h-full w-full object-cover"
          />
        ) : (
          <canvas ref={canvas} className="absolute inset-0 block h-full w-full" />
        )}

        <div aria-hidden className={`pointer-events-none absolute inset-0 ${mobile ? "bg-black/65" : "bg-black/40"}`} />
        <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black to-transparent ${mobile ? "h-[26vh]" : "h-[15vh]"}`} />

        {mobile && (
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[26vh] bg-gradient-to-t from-black to-transparent" />
        )}

        {mobile && (
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[26vh] bg-gradient-to-t from-black to-transparent" />
        )}

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center">
          <h2
            style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}
            className="max-w-[10ch] text-[clamp(2.6rem,11vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)] md:max-w-[18ch]"
          >
            See the engine in action.
          </h2>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-400">
            {mobile ? "" : ready ? "Scroll to scrub" : `Loading ${Math.round((done / COUNT) * 100)}%`}
          </p>
        </div>
      </div>
    </section>
  );
}
