"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { media } from "@/lib/media";

const SERVICE = "web-development";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/*  video → {asset}-1280.mp4 + {asset}.webp poster                     */
/*  image → {asset}.webp                                               */
/*  logo  → /public/logos/{logo}                                       */
/*  href  → the live client site (outer tiles only)                    */
/* ------------------------------------------------------------------ */

type Tile = {
  id: string;
  kind: "video" | "image";
  asset: string;
  /** set when the filename already carries its own resolution suffix */
  exact?: boolean;
  /** absolute image URL — overrides the media()-built src (image tiles only) */
  imageUrl?: string;
  client: string;
  logo?: string;
  verified?: boolean;
  sublabel?: string;
  href?: string;
};

const LEFT_TOP: Tile = {
  id: "epco-saef",
  kind: "video",
  asset: "epco-saef",
  client: "SAëF",
  verified: true,
  href: "https://saef.app",
};

const LEFT_BOTTOM: Tile = {
  id: "epco-islandcity",
  kind: "video",
  asset: "epco-islandcity",
  client: "Island City Media",
  verified: true,
  href: "https://islandcitymediagroup.com",
};

const CENTER: Tile = {
  id: "montage",
  kind: "video",
  asset: "epco-montage",
  client: "EPCO Showreel",
  sublabel: "Preview",
};

const RIGHT_TOP: Tile = {
  id: "epco-infortum",
  kind: "video",
  asset: "epco-infortum",
  client: "Infortum",
  verified: true,
  href: "https://infortum.io",
};

const RIGHT_BOTTOM: Tile = {
  id: "epco-armsezzz",
  kind: "video",
  asset: "epco-armsezzz",
  client: "ArmsEzzz",
  verified: true,
  href: "https://armsezzz.com",
};

const RIGHT_THIRD: Tile = {
  id: "epco-keyskilled",
  kind: "image",
  asset: "epco-keyskilled",
  imageUrl: media("digital-marketing", "web-design.webp"),
  client: "Key Skilled Personnel",
  verified: true,
};

/* ------------------------------------------------------------------ */
/*  LABEL                                                              */
/* ------------------------------------------------------------------ */

function Label({ tile }: { tile: Tile }) {
  return (
    <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2.5">
      {tile.logo && (
        <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-lg bg-white/95 p-1.5">
          <img
            src={`/logos/${tile.logo}`}
            alt=""
            className="max-h-full max-w-full object-contain"
          />
        </span>
      )}

      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[15px] font-semibold leading-tight text-white">
          <span className="truncate">{tile.client}</span>
          {tile.verified && (
            <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] shrink-0" aria-label="Verified">
              <path
                fill="#00f2ff"
                d="M12 1.5l2.4 2.1 3.2-.3.9 3.1 2.9 1.4-1.2 3 1.2 3-2.9 1.4-.9 3.1-3.2-.3L12 22.5l-2.4-2.1-3.2.3-.9-3.1L2.6 16l1.2-3-1.2-3 2.9-1.4.9-3.1 3.2.3z"
              />
              <path
                fill="none"
                stroke="#000"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.2 12.2l2.5 2.5 5-5.2"
              />
            </svg>
          )}
        </div>
        {tile.sublabel && (
          <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400">
            {tile.sublabel}
          </div>
        )}
      </div>

      {/* visit affordance — only on tiles that link out */}
      {tile.href && (
        <span className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:bg-white group-hover:text-black">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4}>
            <path d="M7 17L17 7M17 7H8M17 7v9" />
          </svg>
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MEDIA — plays only while in viewport                               */
/* ------------------------------------------------------------------ */

function Media({ tile }: { tile: Tile }) {
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible]);

  const posterName = tile.asset;
  const videoName = tile.exact ? `${tile.asset}.mp4` : `${tile.asset}-${["epco-saef","epco-armsezzz"].includes(tile.asset) ? 1024 : 1280}.mp4`;

  const shared =
    "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]";

  if (tile.kind === "image") {
    return <img src={tile.imageUrl ?? media(SERVICE, `${tile.asset}.webp`)} alt={tile.client} className={shared} />;
  }

  return (
    <video
      ref={video}
      muted
      loop
      playsInline
      preload="none"
      poster={media(SERVICE, `${posterName}.webp`)}
      className={shared}
    >
      <source src={media(SERVICE, videoName)} type="video/mp4" />
    </video>
  );
}

/* ------------------------------------------------------------------ */
/*  TILE — anchor when it links out, div otherwise                     */
/* ------------------------------------------------------------------ */

function TileCard({ tile, className = "" }: { tile: Tile; className?: string }) {
  const shell = `group relative block overflow-hidden rounded-[18px] border border-white/10 bg-[#14171c] transition-all duration-300 hover:border-[#00f2ff]/50 hover:shadow-[0_0_25px_rgba(0,242,255,0.15)] ${className}`;

  const inner = (
    <>
      <Media tile={tile} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <Label tile={tile} />
    </>
  );

  if (!tile.href) {
    return <div className={shell}>{inner}</div>;
  }

  return (
    <a
      href={tile.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${tile.client}`}
      className={shell}
    >
      {inner}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  GALLERY                                                            */
/* ------------------------------------------------------------------ */

export default function HeroGallery() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, ease: [0.3, 0.8, 0.3, 1] }}
      className="mt-16 md:mt-24"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:h-[720px] md:grid-cols-[24%_1fr_24%]">
        {/* LEFT — tall, then short */}
        <div className="flex flex-col gap-4">
          <TileCard tile={LEFT_TOP} className="aspect-[4/5] md:aspect-auto md:flex-[1.35]" />
          <TileCard tile={LEFT_BOTTOM} className="aspect-[4/3] md:aspect-auto md:flex-1" />
        </div>

        {/* CENTER — montage. Order pulls it above the columns on mobile. */}
        <div className="order-first sm:col-span-2 md:order-none md:col-span-1">
          <TileCard tile={CENTER} className="aspect-[4/5] md:aspect-auto md:h-[calc(100%+2.5rem)] md:-translate-y-5" />
        </div>

        {/* RIGHT — three equal cards */}
        <div className="flex flex-col gap-4">
          <TileCard tile={RIGHT_TOP} className="aspect-[4/3] md:aspect-auto md:flex-1" />
          <TileCard tile={RIGHT_BOTTOM} className="aspect-[4/3] md:aspect-auto md:flex-1" />
          <TileCard tile={RIGHT_THIRD} className="aspect-[4/3] md:aspect-auto md:flex-1" />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500 transition-colors hover:text-white"
        >
          View all work
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}