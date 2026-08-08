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
  const [loaded, setLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  // preload every frame before enabling the scrub
  useEffect(() => {
    let alive = true;
    let done = 0;
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= COUNT; i++) {
      const img = new Image();
      img.src = url(i);
      img.onload = img.onerror = () => {
        if (!alive) return;
        done += 1;
        setLoaded(done);
        if (done === COUNT) setReady(true);
      };
      imgs.push(img);
    }
    frames.current = imgs;
    return () => { alive = false; };
  }, []);

  const draw = (index: number) => {
    const c = canvas.current;
    const img = frames.current[index];
    if (!c || !img || !img.width) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (c.width !== c.clientWidth * dpr) {
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
    }
    // cover fit
    const s = Math.max(c.width / img.width, c.height / img.height);
    const w = img.width * s;
    const h = img.height * s;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
  };

  useEffect(() => { if (ready) draw(0); }, [ready]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!ready) return;
    const i = Math.min(COUNT - 1, Math.max(0, Math.round(p * (COUNT - 1))));
    requestAnimationFrame(() => draw(i));
  });

  useEffect(() => {
    const onResize = () => ready && draw(0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ready]);

  return (
    // tall track gives the scrub its runway; the inner panel pins
    <section ref={section} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen items-center px-8 md:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8">
            <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">
              {"// ASSET PIPELINE"}
            </span>
            <h2
              style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}
              className="mt-4 max-w-[17ch] text-[clamp(1.8rem,4.2vw,3.2rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white"
            >
              See the engine in action.
            </h2>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-[18px] border border-white/10 bg-[#14171c]">
            <canvas ref={canvas} className="h-full w-full" />
            {!ready && (
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
                  Loading {Math.round((loaded / COUNT) * 100)}%
                </span>
              </div>
            )}
          </div>

          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
            Scroll to scrub &darr;
          </p>
        </div>
      </div>
    </section>
  );
}
