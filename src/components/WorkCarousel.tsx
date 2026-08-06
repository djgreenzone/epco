"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { media } from "@/lib/media";

const SERVICE = "web-development";

export type WorkItem = {
  id: string;
  client: string;
  category: string;
  /** base filename, without the -1280 / -720 / .webp suffix */
  asset: string;
};

export const WORK: WorkItem[] = [
  { id: "saef", client: "SAëF", category: "Platform Build", asset: "epco-webdev-02" },
  { id: "island-city", client: "Island City Media Group", category: "Media Platform", asset: "epco-webdev-01" },
];

function WorkCard({ item, canPlay }: { item: WorkItem; canPlay: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setSrc(media(SERVICE, `${item.asset}-${mobile ? 720 : 1280}.mp4`));
  }, [item.asset]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (visible && canPlay) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [visible, canPlay]);

  return (
    <div ref={wrap} className="group w-[300px] shrink-0 select-none md:w-[460px]">
      <div className="relative aspect-video overflow-hidden rounded-[18px] border border-white/10 bg-[#14171c] transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#00f2ff]/50 group-hover:shadow-[0_0_25px_rgba(0,242,255,0.15)]">
        {src && (
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="none"
            poster={media(SERVICE, `${item.asset}.webp`)}
            className="h-full w-full object-cover"
            draggable={false}
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2.5">
        <span className="grid h-[15px] w-[15px] shrink-0 place-items-center rounded-full bg-[#00f2ff]">
          <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="#000" strokeWidth={4}>
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        <span className="text-sm font-semibold text-white">{item.client}</span>
        <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.08em] text-gray-500">
          {item.category}
        </span>
      </div>
    </div>
  );
}

export default function WorkCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);
  const [budget, setBudget] = useState(true);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      setLimit(Math.max(0, track.current.scrollWidth - viewport.current.offsetWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (conn?.saveData || reduce) setBudget(false);
  }, []);

  const stopClickAfterDrag = useCallback((e: React.MouseEvent) => {
    if (track.current?.dataset.dragged === "true") e.preventDefault();
  }, []);

  return (
    <div ref={viewport} className="overflow-hidden" onClickCapture={stopClickAfterDrag}>
      <motion.div
        ref={track}
        drag="x"
        dragConstraints={{ left: -limit, right: 0 }}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={() => { if (track.current) track.current.dataset.dragged = "true"; }}
        onDragEnd={() => { setTimeout(() => { if (track.current) track.current.dataset.dragged = "false"; }, 0); }}
        whileTap={{ cursor: "grabbing" }}
        className="flex w-max cursor-grab gap-6 pb-2"
      >
        {WORK.map((item) => (
          <WorkCard key={item.id} item={item} canPlay={budget} />
        ))}
      </motion.div>
    </div>
  );
}
