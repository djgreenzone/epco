"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase ONCE
// Initialize Supabase ONCE (with build-safe fallbacks)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() { 
  const [showCalendar, setShowCalendar] = useState(false);

  const handleGatekeeperSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const revenue = formData.get("revenue") as string;

    setShowCalendar(true);

    try {
      await supabase.from("leads").insert([{ name, email, revenue }]);
    } catch (err) {
      console.error("Supabase Error:", err);
    }
  };

  return (
    <main className="min-h-screen bg-white text-obsidian font-sans overflow-x-hidden">
      
      {/* 1. GLOBAL ANIMATION ENGINE */}
      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes sweep { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(360deg); } }
        @keyframes aurora { 0%, 100% { transform: translateX(-15%) scale(1); opacity: 0.3; } 50% { transform: translateX(15%) scale(1.1); opacity: 0.5; } }
        @keyframes comet { 0% { transform: rotate(-120deg) translateX(75vw) scale(0); opacity: 0; } 20% { opacity: 1; scale: 1; } 80% { opacity: 1; scale: 1; } 100% { transform: rotate(120deg) translateX(75vw) scale(0); opacity: 0; } }
        @keyframes pulse-cyan { 0% { box-shadow: 0 0 0 0 rgba(0, 242, 255, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(0, 242, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 242, 255, 0); } }
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        
        .animate-scroll { animation: scroll 40s linear infinite; }
        .animate-sweep { animation: sweep 20s linear infinite; }
        .animate-aurora { animation: aurora 12s ease-in-out infinite; }
        .animate-comet { animation: comet 8s linear infinite; }
        .status-pulse { border-radius: 50%; animation: pulse-cyan 2s infinite; }
      `}</style>

      {/* 3. HERO SECTION: HYPER-MOTION PRISMATIC HORIZON */}
      <section className="w-full bg-[#0b0e14] text-white py-48 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-[20%] left-1/2 w-[180vw] aspect-square rounded-full animate-sweep opacity-60 blur-[100px] z-0"
            style={{ background: 'conic-gradient(from 0deg, #00f2ff, #ff00ea, #ffcc00, #00f2ff)', transformOrigin: '50% 55%' }}
          />
          <div 
            className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[200vw] h-[40vh] animate-aurora z-10 blur-[120px]"
            style={{ background: 'linear-gradient(90deg, transparent, #00f2ff, #ff00ea, transparent)' }}
          />
          <div className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[150vw] aspect-square rounded-full border-t-[2px] border-white/30 z-20 shadow-[0_-10px_40px_rgba(255,255,255,0.1)]" />
          <div className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[150vw] aspect-square rounded-full z-30">
             <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_#fff] animate-comet"></div>
             <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#00f2ff] rounded-full shadow-[0_0_15px_#00f2ff] animate-comet" style={{ animationDelay: '-4s', animationDuration: '12s' }}></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 md:px-12 flex flex-col items-center text-center relative z-40">
          <h1 className="text-7xl md:text-9xl font-black font-heading tracking-tighter max-w-5xl leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            From Scribbles <br /> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]">Scale.</span>
          </h1>
          <p className="mt-10 text-xl text-gray-400 max-w-2xl leading-relaxed font-medium">
            We engineer physical products, source global manufacturing, and deploy full-stack direct response campaigns. No fluff. Just real work and proven ROI.
          </p>
          <a 
            href="#booking-terminal" 
            className="inline-flex justify-center items-center gap-3 bg-gradient-to-r from-[#00f2ff] to-[#ff00ea] text-white font-black uppercase tracking-widest px-8 py-5 rounded-full hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(0,242,255,0.3)] mt-8"
          >
            Book a Strategy Call
          </a>
        </div>
      </section>

      {/* SEAMLESS LOOP ANIMATION */}
      <style>{`
        @keyframes seamless-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-seamless-marquee {
          animation: seamless-marquee 35s linear infinite;
        }
      `}</style>

      {/* 4. THE TRUST BAR */}
      <section className="py-6 bg-white flex flex-col items-center overflow-hidden relative z-40 shadow-xl border-b border-gray-100">
        <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-4">// BEHIND 30 YEARS OF CONSUMER PHENOMENA</p>
        
        <div className="flex w-full group overflow-hidden">
          <div className="flex w-max min-w-full shrink-0 animate-seamless-marquee items-center justify-around gap-16 px-8">
            <img src="/GeorgFormanGrill.png" alt="Foreman" className="h-16 w-auto object-contain" />
            <img src="/Ninja_logo.png" alt="Ninja" className="h-16 w-auto object-contain" />
            <img src="/QVC%20Logo.png" alt="QVC" className="h-16 w-auto object-contain" />
            <img src="/Snuggie.png" alt="Snuggie" className="h-16 w-auto object-contain" />
            <img src="/Ped-Egg.png" alt="Ped Egg" className="h-16 w-auto object-contain" />
            <img src="/Magic-Bullet.png" alt="Magic Bullet" className="h-16 w-auto object-contain" />
            <img src="/Armsezzlogo.png" alt="ArmsEzzz" className="h-16 w-auto object-contain" />
          </div>

          <div className="flex w-max min-w-full shrink-0 animate-seamless-marquee items-center justify-around gap-16 px-8" aria-hidden="true">
            <img src="/GeorgFormanGrill.png" alt="Foreman" className="h-16 w-auto object-contain" />
            <img src="/Ninja_logo.png" alt="Ninja" className="h-16 w-auto object-contain" />
            <img src="/QVC%20Logo.png" alt="QVC" className="h-16 w-auto object-contain" />
            <img src="/Snuggie.png" alt="Snuggie" className="h-16 w-auto object-contain" />
            <img src="/Ped-Egg.png" alt="Ped Egg" className="h-16 w-auto object-contain" />
            <img src="/Magic-Bullet.png" alt="Magic Bullet" className="h-16 w-auto object-contain" />
            <img src="/Armsezzlogo.png" alt="ArmsEzzz" className="h-16 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* --- START THE DARK BLOCK --- */}
      <div className="bg-black">

        {/* 5. THE BENTO GRID */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:auto-rows-[450px]">
            
            <article className="md:col-span-2 bg-white rounded-3xl p-10 flex flex-col md:flex-row gap-8 justify-between hover:shadow-[0_0_30px_#ff00ea66] transition-all group overflow-hidden">
              <div className="z-10 flex flex-col justify-center w-full md:w-[45%]">
                <p className="font-mono text-xs text-gray-400 mb-4 tracking-wider">// THE FOUNDER'S DESK</p>
                <h2 className="text-3xl font-heading font-bold mb-4 text-black leading-tight">"I’ll say this upfront..."</h2>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">Since 1992, I’ve lived in the trenches of product development. No MBA jargon. Just sound market intelligence.</p>
                <p className="font-black text-black text-lg">- Eddy Pham</p>
              </div>
              
              {/* THE FIX: 'aspect-square' forces a tall, unbreakable box on mobile. 'object-center' ensures the face is targeted. */}
              <div className="z-10 w-full md:w-[55%] aspect-square md:aspect-auto md:h-full relative rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 mt-8 md:mt-0">
                <img 
                  src="/EddyPham_Professtional_Shoot.png" 
                  alt="Eddy Pham" 
                  className="absolute inset-0 w-full h-full object-cover object-center" 
                />
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.04] p-10 flex flex-col justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00f2ff]/50 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_30px_rgba(0,242,255,0.18)] text-white min-h-[300px] md:min-h-0">
              <div aria-hidden className="pointer-events-none absolute -inset-10 opacity-70 blur-[90px]"
                style={{ background: "radial-gradient(45% 55% at 22% 20%, rgba(0,242,255,0.16), transparent 70%), radial-gradient(45% 55% at 82% 30%, rgba(255,0,234,0.15), transparent 70%), radial-gradient(50% 55% at 50% 88%, rgba(255,204,0,0.10), transparent 70%)" }} />
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
              <div className="relative z-10">
                <p className="font-mono text-xs text-gray-500 mb-4 tracking-wider">// THE PARTNERSHIP</p>
                <h2 className="text-3xl font-heading font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]">Built for the Relentless.</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Whether you are an inventor or a CEO, we provide the infrastructure to scale brands to eight figures.</p>
              </div>
            </article>

            <article className="bg-white rounded-3xl p-10 flex flex-col justify-between hover:shadow-[0_0_30px_#ff00ea66] transition-all min-h-[350px] md:min-h-0">
              <div className="w-full flex justify-center flex-grow pt-4">
                <img src="/idea.png" alt="Evaluate" className="w-36 h-36 object-contain" />
              </div>
              <div className="mt-8">
                <p className="font-mono text-xs text-gray-400 mb-4 tracking-wider">// 01. EVALUATE & ENGINEER</p>
                <h3 className="text-2xl font-heading font-bold mb-3 text-black">Don't build a product nobody wants.</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Market feasibility and physical prototyping.</p>
              </div>
            </article>

            <article className="bg-white rounded-3xl p-10 flex flex-col justify-between hover:shadow-[0_0_30px_#ff00ea66] transition-all min-h-[350px] md:min-h-0">
              <div className="w-full flex justify-center flex-grow pt-4">
                <img src="/boost.png" alt="Build" className="w-36 h-36 object-contain" />
              </div>
              <div className="mt-8">
                <p className="font-mono text-xs text-gray-400 mb-4 tracking-wider">// 02. BUILD & SOURCE</p>
                <h3 className="text-2xl font-heading font-bold mb-3 text-black">Skip the expensive middlemen.</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Global manufacturing sourcing and logistics.</p>
              </div>
            </article>

            <article className="bg-white rounded-3xl p-10 flex flex-col justify-between hover:shadow-[0_0_30px_#ff00ea66] transition-all min-h-[350px] md:min-h-0">
              <div className="w-full flex justify-center flex-grow pt-4">
                <img src="/analytics.png" alt="Deploy" className="w-36 h-36 object-contain" />
              </div>
              <div className="mt-8">
                <p className="font-mono text-xs text-gray-400 mb-4 tracking-wider">// 03. DEPLOY & SCALE</p>
                <h3 className="text-2xl font-heading font-bold mb-3 text-black">Turn passive viewers into buyers.</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Full-stack direct response campaigns with proven ROI.</p>
              </div>
            </article>
          </div>
        </section>

        {/* 5.5 THE PROCESS PIPELINE — four stages converging on one phenomenon */}
        <section className="relative w-full px-8 py-32 md:px-12 text-white overflow-hidden">
          <style>{`
            @keyframes epco-pipe-flow { to { stroke-dashoffset: -220; } }
            @keyframes epco-node-glow {
              0%,100% { box-shadow: 0 0 0 0 rgba(0,242,255,0.35); }
              50%     { box-shadow: 0 0 34px 6px rgba(0,242,255,0.18); }
            }
            @media (prefers-reduced-motion: reduce) {
              .epco-pipe-path, .epco-node { animation: none !important; }
            }
          `}</style>

          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-55 blur-[110px]"
            style={{ background: "radial-gradient(36% 44% at 26% 26%, rgba(0,242,255,0.16), transparent 70%), radial-gradient(36% 44% at 74% 30%, rgba(255,0,234,0.13), transparent 70%), radial-gradient(32% 40% at 50% 86%, rgba(255,204,0,0.10), transparent 70%)" }} />

          <div className="relative mx-auto max-w-6xl">
            <div className="mb-14 md:mb-20">
              <p className="font-mono text-xs text-[#00f2ff] mb-4 tracking-wider">// THE PROCESS</p>
              <h2 className="text-4xl md:text-6xl font-heading font-bold leading-[0.95] tracking-tight max-w-[16ch]">
                4 easy steps to launch your product
              </h2>
              <p className="mt-5 max-w-[60ch] text-gray-400 text-lg leading-relaxed">
                EPCO provides end-to-end solutions for brands to launch consumer and digital products into the marketplace at scale.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "01", title: "Design",     body: "Sketch to engineered CAD spec, built to exact tolerance.", glyph: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" },
                { n: "02", title: "Prototype",  body: "Made real by hand, validated for performance and cost.", glyph: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" },
                { n: "03", title: "Production", body: "Tooled for repeatable manufacturing, packaged for retail.", glyph: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
                { n: "04", title: "Launch",     body: "Into the market, built to scale.", glyph: "M12 3l7 18-7-4-7 4 7-18z" },
              ].map((phase, i) => (
                <motion.div
                  key={phase.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.3, 0.8, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-[18px] border border-white/[0.12] bg-white/[0.04] p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00f2ff]/50 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_30px_rgba(0,242,255,0.18)]"
                >
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
                  <div className="relative">
                    <div className="mb-8 flex items-start justify-between">
                      <div className="grid h-11 w-11 place-items-center rounded-[12px] border border-white/10 bg-white/[0.06] transition-colors duration-300 group-hover:border-[#00f2ff]/40">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px] text-[#00f2ff]">
                          <path d={phase.glyph} />
                        </svg>
                      </div>
                      <span className="font-mono text-[11px] tracking-[0.14em] text-white/25">{phase.n}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-heading font-bold tracking-tight text-white">{phase.title}</h3>
                    <p className="text-[0.9rem] leading-relaxed text-gray-400">{phase.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* connectors — desktop only; the four columns converge on one point */}
            <div className="hidden lg:block" aria-hidden>
              <svg viewBox="0 0 1000 130" preserveAspectRatio="none" className="h-[130px] w-full">
                <defs>
                  <linearGradient id="epco_home_pipe" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00f2ff" /><stop offset="0.5" stopColor="#ff00ea" /><stop offset="1" stopColor="#ffcc00" />
                  </linearGradient>
                </defs>
                {[125, 375, 625, 875].map((x, i) => (
                  <g key={x}>
                    <path d={`M${x} 0 C ${x} 62, 500 46, 500 126`} stroke="url(#epco_home_pipe)" strokeWidth="1.5" fill="none" opacity="0.28" />
                    <path className="epco-pipe-path" d={`M${x} 0 C ${x} 62, 500 46, 500 126`}
                      stroke="url(#epco_home_pipe)" strokeWidth="2.5" fill="none" strokeLinecap="round"
                      strokeDasharray="14 206"
                      style={{ animation: `epco-pipe-flow 3.2s linear infinite`, animationDelay: `${i * 0.55}s` }} />
                  </g>
                ))}
              </svg>
            </div>

            {/* phenomenon node */}
            <div className="mt-10 flex justify-center lg:mt-0">
              <a href="#booking-terminal"
                className="epco-node group/b relative inline-flex items-center gap-3 rounded-full border border-white/[0.16] bg-white/[0.06] px-9 py-5 text-[17px] font-bold tracking-tight text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00f2ff]/60"
                style={{ animation: "epco-node-glow 3.4s ease-in-out infinite" }}>
                <span className="h-2 w-2 rounded-full bg-[#00f2ff]" />
                Your Phenomenon
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-4 w-4 transition-transform duration-300 group-hover/b:translate-x-1 group-hover/b:-translate-y-1">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* 6. THE EPCO CRITERIA */}
        <section className="w-full py-32 text-white">
          <div className="max-w-6xl mx-auto px-8 md:px-12 flex flex-col xl:flex-row gap-20">
            <div className="w-full xl:w-2/5">
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-wider">// THE EPCO CRITERIA</p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-8">
                Do you have a phenomenon, or just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]">product?</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">To scale to eight figures, your product must meet strict transactional marketing rules.</p>
            </div>
            <div className="w-full xl:w-3/5 relative">
              <div aria-hidden className="pointer-events-none absolute -inset-10 opacity-70 blur-[90px]"
                style={{ background: "radial-gradient(40% 55% at 20% 22%, rgba(0,242,255,0.16), transparent 70%), radial-gradient(42% 55% at 82% 24%, rgba(255,0,234,0.14), transparent 70%), radial-gradient(45% 55% at 30% 82%, rgba(255,0,234,0.12), transparent 70%), radial-gradient(45% 55% at 85% 84%, rgba(255,204,0,0.10), transparent 70%)" }} />
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 h-fit">
                {[
                  { n: "01.", title: "The 5-to-1 Markup", body: "Must sustain massive media buying from cost to retail." },
                  { n: "02.", title: "Highly Demonstrable", body: "Immediate visual \"sizzle\" for TV or digital ads." },
                  { n: "03.", title: "Mass-Market Appeal", body: "Does it solve an everyday problem for the masses?" },
                  { n: "04.", title: "The Proof", body: "Clinical studies or strong testimonials required." },
                ].map((c) => (
                  <article key={c.n} className="group relative overflow-hidden rounded-3xl border border-white/[0.12] bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00f2ff]/50 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_30px_rgba(0,242,255,0.18)]">
                    <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
                    <div className="relative">
                      <div className="font-mono text-3xl font-black mb-4 text-[#00f2ff]">{c.n}</div>
                      <h3 className="text-xl font-heading font-bold mb-3">{c.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{c.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. THE WINNER'S CIRCLE */}
        <section className="w-full py-32 text-white">
          <div className="max-w-6xl mx-auto px-8 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <p className="font-mono text-xs text-gray-500 mb-4 tracking-wider">// THE WINNER'S CIRCLE</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold">
                  Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]">Phenomena</span> we built
                </h2>
              </div>
              <p className="text-gray-400 font-mono text-sm border-l-2 border-[#00f2ff] pl-6 max-w-xs">
                Billions in combined retail sales generated across the portfolio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              
              <article className="bg-gradient-to-br from-[#1a1c21] to-black rounded-3xl p-6 transition-all group border border-white/5 hover:border-[#00f2ff55]">
                <div className="relative aspect-square overflow-hidden mb-8 bg-white rounded-2xl flex items-center justify-center p-10 shadow-inner">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/GeorgeFormanGrill.jpg')" }} />
                  <img src="/GeorgFormanGrill.png" alt="Foreman" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00f2ff] transition-colors">George Foreman Grill</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Repositioned a boxing legend into a $1B+ kitchen staple.</p>
                <a 
                  href="#booking-terminal" 
                  className="w-full block text-center py-3 border border-[#00f2ff] text-[#00f2ff] font-mono text-xs font-bold uppercase rounded-full hover:bg-[#00f2ff] hover:text-black transition-all"
                >
                  Analyze DRTV Logic
                </a>
              </article>

              <article className="bg-gradient-to-br from-[#1a1c21] to-black rounded-3xl p-6 transition-all group border border-white/5 hover:border-[#00f2ff55]">
                <div className="relative aspect-square overflow-hidden mb-8 bg-white rounded-2xl flex items-center justify-center p-10 shadow-inner">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/Snuggie_prodct_mockup.jpg')" }} />
                  <img src="/SnuggieLogo.png" alt="Snuggie" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00f2ff] transition-colors">The Snuggie</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Engineered a global cultural phenomenon for retail expansion.</p>
                <a 
                  href="#booking-terminal" 
                  className="w-full block text-center py-3 border border-[#00f2ff] text-[#00f2ff] font-mono text-xs font-bold uppercase rounded-full hover:bg-[#00f2ff] hover:text-black transition-all"
                >
                  Explore Viral Scaling
                </a>
              </article>

              <article className="bg-gradient-to-br from-[#1a1c21] to-black rounded-3xl p-6 transition-all group border border-white/5 hover:border-[#00f2ff55]">
                <div className="relative aspect-square overflow-hidden mb-8 bg-white rounded-2xl flex items-center justify-center p-10 shadow-inner">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/Ninja.jpg')" }} />
                  <img src="/Ninja_logo.png" alt="Ninja" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00f2ff] transition-colors">The Ninja Blender</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Disrupted the high-end appliance market through strategic pricing.</p>
                <a 
                  href="#booking-terminal" 
                  className="w-full block text-center py-3 border border-[#00f2ff] text-[#00f2ff] font-mono text-xs font-bold uppercase rounded-full hover:bg-[#00f2ff] hover:text-black transition-all"
                >
                  Review Product ROI
                </a>
              </article>

            </div>
          </div>
        </section>
      </div> 
      {/* --- END THE DARK BLOCK --- */}

      {/* 8. GLOBAL INFRASTRUCTURE: CINEMATIC HORIZON */}
      <section className="w-full bg-[#0b0e14] py-40 relative overflow-hidden border-t border-gray-900">
        
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover opacity-[0.35]"
          style={{ backgroundImage: "url('/Parralax_Epco.png')" }}
        />

        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[200%] md:w-[150%] opacity-40 blur-[80px]">
            <path d="M0 600C0 268.629 268.629 0 600 0H840C1171.37 0 1440 268.629 1440 600V600H0V600Z" fill="url(#inf_horizon_gradient)" />
            <defs>
              <linearGradient id="inf_horizon_gradient" x1="0" y1="300" x2="1440" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00f2ff" /><stop offset="0.5" stopColor="#ff00ea" /><stop offset="1" stopColor="#ffcc00" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-8 md:px-12 relative z-10 text-white">
          <div className="mb-24 text-center">
            <p className="font-mono text-xs text-[#00f2ff] mb-4 tracking-wider uppercase font-bold">// INFRASTRUCTURE SCALE</p>
            <h2 className="text-5xl md:text-7xl font-heading font-bold leading-tight drop-shadow-xl">
              Global Reach. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]">Local Presence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 text-left">
            {[
              {
                title: 'United States',
                span: 'lg:col-span-2 md:col-span-1',
                items: ['Product Design & Engineering', 'Patent & Trademark Assistance', 'Final Product Assembly']
              },
              {
                title: 'China',
                span: 'lg:col-span-2 md:col-span-1',
                items: ['Product Engineering', 'Rapid Prototyping', 'Finished Goods Manufacturing']
              },
              {
                title: 'Vietnam',
                span: 'lg:col-span-2 md:col-span-1',
                items: ['Textile Manufacturing', 'Soft Goods Production', 'Packaging & Final Assembly']
              },
              {
                title: 'Mexico',
                span: 'lg:col-span-3 md:col-span-1',
                items: ['Nearshore Manufacturing', 'Injection Molding & Components', 'Cross Border Fulfillment']
              },
              {
                title: 'Assembly & Logistics',
                span: 'lg:col-span-3 md:col-span-2',
                items: ['US Finished Goods Distribution', 'Product Testing & Compliance', 'Customer Service & Contact Center']
              }
            ].map((hub) => (
              <div key={hub.title} className={`relative group bg-black/20 p-6 rounded-xl border border-white/5 backdrop-blur-sm hover:bg-black/40 transition-all ${hub.span}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="status-pulse w-2 h-2 bg-[#00f2ff] rounded-full animate-pulse"></div>
                  <span className="font-mono text-[10px] text-[#00f2ff] uppercase tracking-widest font-bold">
                    {hub.title === 'Assembly & Logistics' ? 'Operations Hub' : 'Active Hub'}
                  </span>
                </div>
                <h3 className="text-3xl font-heading font-bold mb-2 group-hover:text-white transition-colors">{hub.title}</h3>
                <div className="h-[1px] w-full bg-gradient-to-r from-[#00f2ff33] to-transparent mb-6"></div>
                <ul className="text-gray-400 text-xs space-y-4 font-medium uppercase tracking-wider">
                  {hub.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#00f2ff] mr-2">0{idx + 1}</span> 
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PARTNERSHIP INTAKE (The Gatekeeper) */}
      <section id="booking-terminal" className="w-full bg-[#0b0e14] py-32 relative">
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          
          <div className="text-center mb-16">
            <p className="font-mono text-xs text-[#00f2ff] mb-4 tracking-wider uppercase font-bold">// SECURE UPLINK</p>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              Start the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]">Phenomenon.</span>
            </h2>
          </div>

          <div className="bg-[#121620] border border-[#00f2ff]/20 rounded-2xl shadow-[0_0_50px_rgba(0,242,255,0.15)] relative overflow-hidden min-h-[600px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent shadow-[0_0_20px_#00f2ff]"></div>

            {!showCalendar ? (
              <div className="p-8 md:p-12 animate-in fade-in duration-500">
                <form onSubmit={handleGatekeeperSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Full Name</label>
                      <input type="text" name="name" placeholder="John Doe" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#00f2ff] transition-all" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Work Email</label>
                      <input type="email" name="email" placeholder="john@company.com" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#00f2ff] transition-all" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Current Monthly Revenue</label>
                    <select name="revenue" defaultValue="" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-[#00f2ff] appearance-none" required>
                      <option value="" disabled>Select your current scale...</option>
                      <option value="Pre-Revenue">Pre-Revenue / Prototype Stage</option>
                      <option value="$10k - $50k/mo">$10k - $50k / month</option>
                      <option value="$100k+/mo">$100k+ / month</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full mt-8 bg-gradient-to-r from-[#00f2ff] to-[#ff00ea] text-white font-black uppercase tracking-widest py-4 rounded-full hover:scale-[1.02] transition-all flex justify-center items-center gap-3 shadow-[0_0_30px_rgba(0,242,255,0.3)]">
                    See Eddy's Availability
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </form>
              </div>
            ) : (
              <div className="w-full h-[700px] p-2 animate-in fade-in duration-700">
                <iframe 
                  src="https://cal.com/eddypham/a-little-more?embed=true" 
                  className="w-full h-full border-none rounded-xl bg-transparent"
                  title="Book a call with Eddy"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 10. THE MANIFESTO (High-Contrast Prismatic Break) */}
      <section className="w-full bg-[#0b0e14] py-32 relative overflow-hidden flex items-center justify-center border-t border-white/5">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent opacity-40 shadow-[0_0_20px_#00f2ff]"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          
          <div 
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[100vw] h-[200px] opacity-30 blur-[100px] z-0"
            style={{ background: 'linear-gradient(to bottom, #ff00ea, #00f2ff, transparent)' }}
          />

          <div 
            className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[160vw] aspect-square rounded-full z-0 animate-sweep opacity-80"
            style={{
              background: 'conic-gradient(from 270deg at 50% 50%, #00f2ff, #ff00ea, #ffcc00, #00f2ff)',
              filter: 'blur(100px)',
              transformOrigin: 'center center'
            }}
          />

          <div 
            className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[160vw] aspect-square rounded-full border-t-[4px] border-white/20 z-10 shadow-[0_-20px_60px_rgba(0,242,255,0.4)]"
            style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
          />

          <div className="absolute inset-0 opacity-[0.12] z-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00f2ff 2px, #00f2ff 3px)', backgroundSize: '100% 6px' }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-8 md:px-12 relative z-30 text-center">
          <p className="font-mono text-[10px] text-[#00f2ff] mb-8 tracking-[0.5em] uppercase font-black animate-pulse">// ORBITAL LOGIC</p>
          
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight uppercase tracking-tighter drop-shadow-[0_10px_40px_rgba(0,0,0,1)]">
            An Expert is <span className="text-gray-600 underline decoration-[#ff00ea]/30">expensive.</span> <br /> 
            An Amateur is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] animate-pulse">a Fortune.</span>
          </h2>
          
          <div className="mt-12 flex justify-center items-center gap-6">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              <div className="w-2 h-2 bg-[#00f2ff] rounded-full animate-ping"></div>
              <p className="font-mono text-[10px] text-[#00f2ff] uppercase tracking-widest font-bold">Uplink: Active</p>
            </div>
            <div className="w-[1px] h-6 bg-gray-800"></div>
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Global Intake Protocol</p>
          </div>
        </div>
      </section>
    </main>
  );
}