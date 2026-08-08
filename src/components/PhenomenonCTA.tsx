"use client";

export default function PhenomenonCTA() {
  return (
    <section id="contact" className="relative overflow-hidden px-8 py-24 md:px-12 md:py-32">
      <style>{`
        @keyframes epco-drift-a {
          0%,100% { transform: translate3d(-12%, -6%, 0) scale(1); }
          33%     { transform: translate3d(14%, 10%, 0) scale(1.25); }
          66%     { transform: translate3d(6%, -14%, 0) scale(0.9); }
        }
        @keyframes epco-drift-b {
          0%,100% { transform: translate3d(18%, 8%, 0) scale(1.1); }
          40%     { transform: translate3d(-16%, -10%, 0) scale(0.85); }
          70%     { transform: translate3d(-4%, 16%, 0) scale(1.3); }
        }
        @keyframes epco-drift-c {
          0%,100% { transform: translate3d(4%, 16%, 0) scale(0.95); }
          50%     { transform: translate3d(-14%, -8%, 0) scale(1.2); }
        }
        @keyframes epco-sweep { to { transform: rotate(360deg); } }
        @keyframes epco-grid  { to { transform: translateY(48px); } }
        @keyframes epco-sheen {
          0%   { transform: translateX(-120%); }
          55%  { transform: translateX(220%); }
          100% { transform: translateX(220%); }
        }
        @media (prefers-reduced-motion: reduce) { .epco-anim { animation: none !important; } }
      `}</style>

      <div aria-hidden className="epco-anim pointer-events-none absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.16] blur-[100px]"
        style={{ background: "conic-gradient(from 0deg, transparent 0deg, #00f2ff 60deg, transparent 130deg, #ff00ea 210deg, transparent 280deg, #ffcc00 330deg, transparent 360deg)", animation: "epco-sweep 48s linear infinite" }} />

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="epco-anim absolute left-[6%] top-[8%] h-[46vmax] w-[46vmax] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(0,242,255,0.42), transparent 66%)", animation: "epco-drift-a 22s ease-in-out infinite" }} />
        <div className="epco-anim absolute right-[4%] top-[18%] h-[42vmax] w-[42vmax] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(255,0,234,0.34), transparent 66%)", animation: "epco-drift-b 27s ease-in-out infinite" }} />
        <div className="epco-anim absolute bottom-[-8%] left-1/3 h-[38vmax] w-[38vmax] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(255,204,0,0.24), transparent 66%)", animation: "epco-drift-c 33s ease-in-out infinite" }} />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden opacity-[0.22]"
        style={{ maskImage: "linear-gradient(to top, #000 10%, transparent 85%)", WebkitMaskImage: "linear-gradient(to top, #000 10%, transparent 85%)", perspective: "260px" }}>
        <div className="epco-anim absolute inset-x-[-50%] bottom-0 h-[220%]"
          style={{ backgroundImage: "linear-gradient(rgba(0,242,255,0.30) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.18) 1px, transparent 1px)", backgroundSize: "48px 48px", transform: "rotateX(66deg)", transformOrigin: "bottom center", animation: "epco-grid 2.6s linear infinite" }} />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/35" />

      <div className="relative mx-auto max-w-6xl">
        <div className="group relative overflow-hidden rounded-[18px] border border-white/[0.14] bg-white/[0.05] p-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:p-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.10] via-transparent to-transparent" />
          <div aria-hidden className="epco-anim pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
            style={{ animation: "epco-sheen 7s ease-in-out infinite" }} />

          <div className="relative">
            <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#00f2ff]">{"// SECURE UPLINK"}</span>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold leading-[0.96] tracking-[-0.04em] text-white">
              Start the phenomenon.
            </h2>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-gray-300">
              Thirty minutes. Bring the sketch, the sample, or the spreadsheet &mdash; whatever stage you&apos;re at.
            </p>
            <a href="#booking" className="group/btn mt-9 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] px-7 py-4 text-[15px] font-semibold leading-none tracking-tight text-black transition-transform duration-300 hover:-translate-y-0.5">
              <span className="relative block h-[1.15em] overflow-hidden">
                <span className="block transition-transform duration-[420ms] ease-[cubic-bezier(0.6,0,0.2,1)] group-hover/btn:-translate-y-full">
                  <span className="block">Deploy a Project</span>
                  <span className="block">Deploy a Project</span>
                </span>
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-3.5 w-3.5 transition-transform duration-[420ms] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
