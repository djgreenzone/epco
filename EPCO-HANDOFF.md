# EPCO Website — Project Handoff

**Live:** https://www.eddypham.company
**Repo:** https://github.com/djgreenzone/epco
**Latest commit at handoff:** `77c2f28` — "Restore gradient on KPI numbers"

---

## What this project is

EPCO International (Eddy Pham & Company) is a 30-year product development and direct
response company — George Foreman Grill, Snuggie, Ninja, Magic Bullet, Ped Egg, QVC.
The existing marketing site is a Next.js app on Vercel. We are adding a set of
**service pages** beneath it, starting with Web Development.

The design brief was to take the **functional architecture of dialedweb.com** and paint
it in **EPCO's neon-tech brand**. The Web Development page is complete and live.

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
                prefixed with "// " — inherited from EPCO's terminal voice
```

**Section shell — every section must match this or headlines misalign:**
```jsx
<section className="px-8 py-24 md:px-12 md:py-32">
  <div className="mx-auto max-w-6xl"> ... </div>
</section>
```

**Font gotcha:** something in the project overrides raw `<h2>`/`<p>` to a condensed
mono face. Components built with raw markup need an explicit
`style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}`.
Root cause never found — worth tracking down.

---

## Routes

```
/                                  homepage (pre-existing)
/services/web-development          DONE — live
/sitemap.xml  /robots.txt  404     DONE
/services                          DOES NOT EXIST — 404s (hub page, not built)
/work                              DOES NOT EXIST — HeroGallery links point here
```

### Page structure (`/services/web-development`)

`page.tsx` is a **server component** holding `metadata` only; it renders
`ServicesClient.tsx` which is `"use client"`. This split exists because a client
component cannot export `metadata`. Keep this shape — it's also the right structure
for the `[slug]` template.

Section order in `ServicesClient.tsx`:
1. Hero — earth video bg, centred H1, `<HeroGallery />`
2. KPIs — glass cards, count-up on scroll, gradient numbers
3. Bento grid — 4 capabilities, glass, asymmetric spans
4. `<StackCarousel />` — 9 disciplines, autoplay marquee
5. `<PhasePipeline />` — 4 phases → SVG connectors → "Your Brand"
6. `<EngineScrub />` — scroll-scrubbed 96-frame sequence
7. `<KineticFinale />` — scroll-lit word stack
8. `<PhenomenonCTA />` — animated aurora + glass card

---

## Components

| File | Notes |
|---|---|
| `Header.tsx` | Desktop nav + mobile hamburger drawer. Add services to the `LINKS` array — both breakpoints read from it. Header must NOT be `relative` or the fixed drawer mis-anchors. |
| `Footer.tsx` | Privacy + Terms still `href="#"` — dead links. |
| `HeroGallery.tsx` | 5 tiles: 2 left, centre montage (lifted 20px, overhangs), 2 right. Outer 4 are external `<a>` links. **Infortum + ArmsEzzz still point at `example.com`.** |
| `StackCarousel.tsx` | Continuous marquee, list rendered twice for seamless wrap. Pauses on hover, drag overrides, static on reduced-motion. `SPEED` const at top. |
| `PhasePipeline.tsx` | Design/Build/Optimize/Launch. SVG connectors with staggered `stroke-dashoffset` pulses. Connectors hidden below `lg`. |
| `PhenomenonCTA.tsx` | Aurora field — 3 drifting blobs on 22s/27s/33s cycles + 48s conic sweep + perspective grid. All CSS keyframes. |
| `EngineScrub.tsx` | Canvas frame-scrub, 96 WebP preloaded, `useMotionValueEvent` maps scroll → frame. **Mobile skips the preload entirely** via `matchMedia` and shows frame 048 static. Section is `340vh` desktop / `100vh` mobile. |
| `WorkCarousel.tsx` | **ORPHANED** — nothing imports it. Safe to delete. |
| `lib/media.ts` | `media(service, file)` resolves Supabase paths. |

---

## Media pipeline

All assets live in Supabase at `media/services/web-development/` (flat, no subfolders).

**Encoding recipe** — dark 3D mockup footage, tuned to avoid banding:
```bash
ffmpeg -i src.mp4 -an \
 -vf "scale=1280:-2:flags=lanczos,gradfun=strength=1.1:radius=16,\
      fade=t=in:st=0:d=0.5,fade=t=out:st=END:d=0.5,fps=30" \
 -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 25 -preset medium \
 -x264-params "aq-mode=3:aq-strength=1.1:psy-rd=1.0,0.15" \
 -movflags +faststart out.mp4
```

Hard-won lessons:
- **Never pre-grade brightness in ffmpeg.** Crushing levels before an 8-bit encode
  causes banding. Encode clean, darken with a CSS overlay.
- `aq-mode=3` biases bits toward dark regions — essential for this footage.
- `-pix_fmt yuv420p` is non-negotiable or Safari shows black.
- Encode to the **slot's aspect ratio** rather than letting `object-cover` crop.
- Clips rarely loop; fade both ends unless the source starts and ends on black.
- Shoot mockup backdrops **dark** — bright backdrops are unusable against `#000000`.

Compression achieved: ~300MB of source → ~25MB delivered.

---

## Open items

### Blocked on DJ
1. **Testimonials** — the biggest remaining gap. Zero social proof anywhere on a page
   that looks like a top-tier agency and asks for a call. Two quotes (name, title,
   company) from SAëF / Infortum / Island City / ArmsEzzz would close it.
2. **Infortum + ArmsEzzz URLs** — those tiles link to `example.com`.
3. **Privacy + Terms text** — pages can be built; the legal copy should come from a
   template DJ trusts or a lawyer.
4. **Copy for the other four services** — the Phase 3 bottleneck.

### Quick wins, no decisions needed
5. **Vercel Analytics** — one click in the dashboard. Currently no way to know whether
   anyone reaches the CTA.
6. Delete orphaned `WorkCarousel.tsx`.
7. OG image for the services page (currently inherits the homepage card).
8. Structured data — `Organization` + `Service` schema. Relevant because AIO is a
   service being sold on that page.
9. Find and fix the mono-font override at its root.
10. Better `EngineScrub` mobile poster frame — 048 is a bright malasadas close-up that
    fights the headline. Scan `epco-seq-001…096.webp` for a dark UI frame.

### Phase 3 — the other four services
Planned menu order:
```
Product Development
Direct Response Marketing
Web Development     ← done
App Development
Digital Marketing
```

Approach: extract copy to `src/content/services.ts`, convert to
`src/app/services/[slug]/page.tsx` with `generateStaticParams` + `generateMetadata`,
then build `/services` as a hub.

**Two things to get right:**
- **Direct Response vs Digital Marketing will cannibalise each other** unless the line
  is drawn hard. Direct Response = DRTV, infomercials, media buying, QVC/HSN, retail
  placement (offline, 30 years of receipts). Digital Marketing = paid social, SEO,
  email, funnels (online, performance).
- **KPI numbers are per-service.** `100ms / 9-Figures / 100%` are web-dev claims and
  can't be reused. Each service needs its own three, and they need to be defensible.

---

## Working notes

- **One terminal tab runs `npm run dev` and nothing else.** Running any other command
  in it kills the server. `Cmd+T` for everything else.
- **`sed` line-range replacements are fragile** — line numbers shift between edits and
  we clipped closing JSX tags twice. Print a wide window first, or use Python.
- **Pasting long JSX into a heredoc can silently swallow opening tags** (`<a`). Write
  components with one element per line, or verify with `npm run build` immediately.
- **After renaming a file, close its old tab in VS Code.** A stale buffer nearly
  overwrote the metadata wrapper with 500 lines of client component.
- `npm run build` before every push. Dev mode tolerates what the build won't.
