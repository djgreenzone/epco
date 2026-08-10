# EPCO Website — Project Handoff

**Live:** https://www.eddypham.company
**Repo:** https://github.com/djgreenzone/epco

> Updated after the Product Development build. Two service pages are now live
> (`/services/web-development`, `/services/product-development`), plus the legal
> pages and site-wide nav.

---

## What this project is

EPCO International (Eddy Pham & Company) is a 30-year product development and direct
response company — George Foreman Grill, Snuggie, Ninja, Magic Bullet, Ped Egg, QVC.
The existing marketing site is a Next.js app on Vercel. We are adding a set of
**service pages** beneath it.

Design brief: take the **functional architecture of dialedweb.com** and paint it in
**EPCO's neon-tech brand** (glassmorphism, cyan/magenta/yellow gradient, `//` mono
eyebrows). Web Development and Product Development are complete and live.

---

## Environments

### Machines
Two laptops, same repo. Always `git pull` on sit-down, `git push` on stand-up.

| Machine | Path |
|---|---|
| Ammon's MacBook Pro (original) | `~/Documents/EPCO/Website Build/epco` |
| Eddy's MacBook M2 Pro 14 | `~/Documents/epco-site` |

### Local setup
```bash
npm install
npm run dev            # keep this terminal tab for the server ONLY
```

`.env.local` is gitignored and must exist on each machine:
```
NEXT_PUBLIC_MEDIA_URL=https://aararlvcotxdutsproxy.supabase.co/storage/v1/object/public/media
```
Same key is set in Vercel → Settings → Environment Variables (all three environments).
`NEXT_PUBLIC_` vars are baked in at build time — changing one requires a redeploy.

---

## Stack

- **Next.js 16.2.4** (App Router, Turbopack), TypeScript, Tailwind
- **framer-motion** for all interaction
- **Supabase Storage** — public `media` bucket, all video and image assets
- **Vercel** — auto-deploys on push to `main`
- Fonts: Geist Sans / Geist Mono via `next/font`, `font-sans` set on `<body>`

---

## Design system

```
Background      #000000
Card surface    bg-white/[0.04] + backdrop-blur-xl   (glassmorphism)
Card border     border-white/[0.12]
Card radius     rounded-[18px]
Inner highlight shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]
Hover           -translate-y-2, border-[#00f2ff]/50, cyan glow

Accent          #00f2ff  (cyan)
Gradient        from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]
Gradient text   GRADIENT + text-transparent bg-clip-text

Eyebrows        font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]
                prefixed with "// "
```

**Section shell** — every section matches this or headlines misalign:
```jsx
<section className="px-8 py-24 md:px-12 md:py-32">
  <div className="mx-auto max-w-6xl"> ... </div>
</section>
```

**Font gotcha:** something overrides raw `<h1>/<h2>/<p>` to a condensed mono face
(root cause never found). Components built with raw markup carry an explicit
`style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}`. Inline style
wins over the stray rule regardless of selector — apply it to text elements.

**Sticky gotcha:** any `overflow: hidden` ancestor breaks `position: sticky`
descendants. Use `overflow-x-clip` (not `overflow-hidden`) on wrappers that need to
contain horizontal bleed but sit above a pinned section.

---

## Routes

```
/                                  homepage (pre-existing)
/services/web-development          DONE — live
/services/product-development      DONE — live
/legal/terms  /legal/privacy       DONE — live
/sitemap.xml  /robots.txt  404     DONE
/services                          DOES NOT EXIST — 404s (hub page, not built)
/work                              DOES NOT EXIST — HeroGallery links point here
```

Each service page is a **server `page.tsx`** (holds `metadata` only) that renders a
`"use client"` client component. Keep this split — a client component can't export
`metadata`, and it's the right shape for a future `[slug]` template.

---

## Components

| File | Notes |
|---|---|
| `Header.tsx` | Desktop nav + mobile hamburger drawer, both read the `LINKS` array. Now lists **Product Development** + **Web Development**. Header must NOT be `relative` or the fixed drawer mis-anchors. |
| `Footer.tsx` | Navigation column: Home · Product Development · Web Development · Contact. Legal → `/legal/privacy`, `/legal/terms`. Connect column: Website · 247Eddy · **LinkedIn** (replaced TikTok). |
| `LegalDoc.tsx` | Shared server-rendered layout for Terms + Privacy (eyebrow, title, effective date, numbered sections). |
| `HeroGallery.tsx` | Web-dev only. 5 tiles. **Infortum + ArmsEzzz still point at `example.com`.** |
| `StackCarousel.tsx` | Web-dev marquee. |
| `PhasePipeline.tsx` | Web-dev phase pipeline. |
| `PhenomenonCTA.tsx` | Web-dev aurora CTA — 3 drifting blobs (22/27/33s) + 48s conic sweep + perspective grid + sheen. All CSS keyframes. **The product-dev final CTA replicates this exactly.** |
| `EngineScrub.tsx` | Web-dev canvas frame-scrub, 96 WebP, `scrollYProgress` → frame. Mobile shows static frame 048. Section `340vh` sticky. **The product-dev rocket launch is the same pattern.** |
| `WorkCarousel.tsx` | **ORPHANED** — nothing imports it. Safe to delete. |
| `lib/media.ts` | `media(service, file)` → `${NEXT_PUBLIC_MEDIA_URL}/services/${service}/${file}`. |

### Product Development page (`ProductDevelopmentClient.tsx`)

Single self-contained client component (no dependency on web-dev components). Section order:

1. **Hero** — gear background video (`epco-hero.mp4`) at 50% opacity + bottom-up black
   gradient + ambient glow. CTA "Book a Call" → `/#booking-terminal` (no arrow).
2. **KPIs** — 3 glass cards (160+ / 30+ / 5+), count-up, gradient numbers. Matches web-dev.
3. **Manifesto** — "Ideas Are Easy. Execution Is Everything."
4. **Process** — 7-step pinned scroll-scrub (EngineScrub-style pin: tall wrapper +
   sticky h-screen, `scrollYProgress` steps the active phase). Heading lives inside the
   pinned panel; content fills the viewport so entry/exit gaps match other sections.
5. **Launch** — scroll-scrubbed rocket, 96 WebP frames on a canvas (`epco-launch-001…096`),
   pinned 300vh. Title bottom-left. Mobile shows static frame 060.
6. **Journey** ("From Sketch to Launch") — glass frame (black, border + inner glow),
   vertical timeline left (staggered reveal), rotating globe video right (`epco-globe.mp4`).
7. **Discipline** — Apple "Get to know" style card carousel (scroll-snap + arrows), 7
   question cards, `+` expands to reveal "why it matters." Image slots ready
   (`epco-disc-*`, portrait 3:4) — currently gradient placeholders.
8. **Partner** — bio + agency clichés struck through by an animated gradient line →
   gradient payoff.
9. **Bring Us What You Have** — cards + the 8 category chips.
10. **Final CTA** — "Start With the Possibility," full PhenomenonCTA aurora + glass +
    sheen. "Book a Call" → `/#booking-terminal`.

---

## Media pipeline

Assets live in Supabase at `media/services/<service>/` (flat, no subfolders).

**Two delivery patterns:**

1. **Background loops** (globe, hero gear) — normal looping MP4. If the source doesn't
   loop, cross-fade the tail into the head for a seamless loop. Encode: `scale`,
   `gradfun` (de-band dark gradients), `yuv420p`, `-movflags +faststart`, strip audio.
2. **Scroll/mouse-scrub sequences** (rocket launch, web-dev EngineScrub) — split the
   video into a **numbered WebP frame sequence** (`epco-*-001.webp`…), preload on a
   canvas, drive the index by `scrollYProgress`. Smoother than seeking a `<video>`.

**Product-development assets in Supabase:**
```
epco-hero.mp4 / epco-hero-poster.webp         gear hero bg loop (1920x1080, seamless)
epco-globe.mp4 / epco-globe-poster.webp        rotating globe loop (1280x1280, seamless)
epco-launch-001…096.webp                        rocket launch frame sequence (1600x900)
epco-launch.mp4                                 UNUSED (superseded by frame sequence) — safe to delete
epco-disc-*                                     NOT YET UPLOADED — discipline card images (optional)
```

Hard-won lessons (still true):
- **Never pre-grade brightness in ffmpeg** — crushing levels before an 8-bit encode
  causes banding. Encode clean; darken with a CSS overlay.
- `-pix_fmt yuv420p` is non-negotiable or Safari shows black.
- A video with a **black background** blends on the page only if the surrounding
  surface is also pure black. If a colored glow sits behind a black-background video,
  it outlines the video's square — remove the glow or match the surface to the video.

---

## Open items

### Blocked on DJ
1. **Testimonials** — biggest remaining gap. No social proof anywhere. Two quotes
   (name, title, company) from SAëF / Infortum / Island City / ArmsEzzz would close it.
2. **Infortum + ArmsEzzz URLs** — HeroGallery tiles still point at `example.com`.
3. **Legal copy** — Terms/Privacy are live but flag: confirm the exact legal entity
   casing (eddyPham&Company vs eddypham&company), the Nevada venue, and update the
   cookie/analytics/vendor language in the Privacy Policy to match what actually runs.
4. **Discipline card images** — optional. Portrait 3:4 (≥800×1200), upload as
   `epco-disc-problem` … `epco-disc-franchise`; then set each card's `img`.

### Quick wins
5. **Vercel Analytics** — one click in the dashboard.
6. Delete orphaned `WorkCarousel.tsx` and the unused `epco-launch.mp4`.
7. OG images per service page.
8. Structured data — `Organization` + `Service` schema.
9. Find and fix the mono-font override at its root.

### Phase 3 — the remaining three services
Planned menu order:
```
Product Development   ← done
Direct Response Marketing
Web Development        ← done
App Development
Digital Marketing
```

Approach: extract copy to `src/content/services.ts`, convert to
`src/app/services/[slug]/page.tsx` with `generateStaticParams` + `generateMetadata`,
then build `/services` as a hub.

**Two things to get right:**
- **Direct Response vs Digital Marketing will cannibalise each other** unless the line
  is drawn hard. Direct Response = DRTV, infomercials, media buying, QVC/HSN, retail
  (offline, 30 years). Digital Marketing = paid social, SEO, email, funnels (online).
- **KPI numbers are per-service and must be defensible.** Web-dev = 100ms / 9-Figures /
  100%. Product-dev = 160+ launches / 30+ years / 5+ manufacturing markets. Each new
  service needs its own three.

---

## Working notes

- **One terminal tab runs `npm run dev` and nothing else.** `Cmd+T` for everything else.
- `npm run build` before every push. Dev mode tolerates what the build won't.
- **`sed` line-range edits are fragile** — print a wide window first, or use Python.
- **Pasting long JSX into a heredoc can silently swallow opening tags** — write one
  element per line, or verify with `npm run build` immediately.
- After renaming a file, close its old tab in VS Code (stale buffers overwrite).
