"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase ONCE
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
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

      {/* 2. NAVIGATION */}
      <header className="w-full bg-[#0b0e14] text-white relative z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-6 px-8 md:px-12">
          <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/epco-mark.png" alt="EPCO Logo" className="w-10 h-10 object-contain" />
            <span className="font-heading font-black text-3xl tracking-tighter text-white">EPCO.</span>
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-mono uppercase font-semibold text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Our Edge</a>
            <a href="#" className="hover:text-white transition-colors">Solutions</a>
          </nav>
          {/* UPDATED CTA: Now glides down to the Cal.com terminal */}
          <a href="#booking-terminal" className="text-sm font-mono uppercase bg-white text-black px-6 py-2 rounded-xl hover:opacity-80 transition-opacity">
            Let's Talk
          </a>
        </div>
      </header>

      {/* 3. HERO SECTION: HYPER-MOTION PRISMATIC HORIZON */}
      <section className="w-full bg-[#0b0e14] text-white py-48 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-[60%] left-1/2 w-[180vw] aspect-square rounded-full animate-sweep opacity-60 blur-[100px] z-0"
            style={{ background: 'conic-gradient(from 0deg, #00f2ff, #ff00ea, #ffcc00, #00f2ff)', transformOrigin: '50% 55%' }}
          />
          <div 
            className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[200vw] h-[40vh] animate-aurora z-10 blur-[120px]"
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
            className="inline-flex justify-center items-center gap-3 bg-gradient-to-r from-[#00f2ff] to-[#ff00ea] text-white font-black uppercase tracking-widest px-8 py-5 rounded-lg hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(0,242,255,0.3)] mt-8"
          >
            Book a Strategy Call
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
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
        
        {/* The Scrolling Track Container */}
        <div className="flex w-full group overflow-hidden">
          
          {/* TRACK 1 */}
          <div className="flex w-max min-w-full shrink-0 animate-seamless-marquee items-center justify-around gap-16 px-8">
            <img src="/GeorgFormanGrill.png" alt="Foreman" className="h-16 w-auto object-contain" />
            <img src="/Ninja_logo.png" alt="Ninja" className="h-16 w-auto object-contain" />
            <img src="/QVC%20Logo.png" alt="QVC" className="h-16 w-auto object-contain" />
            {/* CHANGED: .PNG to .png */}
            <img src="/Snuggie.png" alt="Snuggie" className="h-16 w-auto object-contain" />
            <img src="/Ped-Egg.png" alt="Ped Egg" className="h-16 w-auto object-contain" />
            <img src="/Magic-Bullet.png" alt="Magic Bullet" className="h-16 w-auto object-contain" />
          </div>

          {/* TRACK 2 (Identical to Track 1 for the seamless loop) */}
          <div className="flex w-max min-w-full shrink-0 animate-seamless-marquee items-center justify-around gap-16 px-8" aria-hidden="true">
            <img src="/GeorgFormanGrill.png" alt="Foreman" className="h-16 w-auto object-contain" />
            <img src="/Ninja_logo.png" alt="Ninja" className="h-16 w-auto object-contain" />
            <img src="/QVC%20Logo.png" alt="QVC" className="h-16 w-auto object-contain" />
            {/* CHANGED: .PNG to .png */}
            <img src="/Snuggie.png" alt="Snuggie" className="h-16 w-auto object-contain" />
            <img src="/Ped-Egg.png" alt="Ped Egg" className="h-16 w-auto object-contain" />
            <img src="/Magic-Bullet.png" alt="Magic Bullet" className="h-16 w-auto object-contain" />
          </div>

        </div>
      </section>

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
              
              {/* BULLETPROOF IMAGE CONTAINER: Always relative, always absolute inset, explicit 400px mobile height */}
              <div className="z-10 w-full md:w-[55%] h-[400px] md:h-full relative rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 mt-8 md:mt-0">
                <img 
                  src="/EddyPham_Professtional_Shoot.png" 
                  alt="Eddy Pham" 
                  className="absolute inset-0 w-full h-full object-cover object-top" 
                />
              </div>
            </article>

            <article className="bg-[#14171c] border border-gray-800 rounded-3xl p-10 flex flex-col justify-center hover:border-transparent hover:shadow-[0_0_30px_#ff00ea66] transition-all group relative overflow-hidden text-white min-h-[300px] md:min-h-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] opacity-5"></div>
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
            <div className="w-full xl:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-8 h-fit">
              <article className="bg-[#14171c] border border-gray-800 p-8 rounded-3xl hover:border-[#00f2ff80] transition-all">
                <div className="font-mono text-3xl font-black mb-4 text-[#00f2ff]">01.</div>
                <h3 className="text-xl font-heading font-bold mb-3">The 5-to-1 Markup</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Must sustain massive media buying from cost to retail.</p>
              </article>
              <article className="bg-[#14171c] border border-gray-800 p-8 rounded-3xl hover:border-[#00f2ff80] transition-all">
                <div className="font-mono text-3xl font-black mb-4 text-[#00f2ff]">02.</div>
                <h3 className="text-xl font-heading font-bold mb-3">Highly Demonstrable</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Immediate visual "sizzle" for TV or digital ads.</p>
              </article>
              <article className="bg-[#14171c] border border-gray-800 p-8 rounded-3xl hover:border-[#00f2ff80] transition-all">
                <div className="font-mono text-3xl font-black mb-4 text-[#00f2ff]">03.</div>
                <h3 className="text-xl font-heading font-bold mb-3">Mass-Market Appeal</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Does it solve an everyday problem for the masses?</p>
              </article>
              <article className="bg-[#14171c] border border-gray-800 p-8 rounded-3xl hover:border-[#00f2ff80] transition-all">
                <div className="font-mono text-3xl font-black mb-4 text-[#00f2ff]">04.</div>
                <h3 className="text-xl font-heading font-bold mb-3">The Proof</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Clinical studies or strong testimonials required.</p>
              </article>
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
                  Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]">Phenomena.</span>
                </h2>
              </div>
              <p className="text-gray-400 font-mono text-sm border-l-2 border-[#00f2ff] pl-6 max-w-xs">
                Billions in combined retail sales generated across the portfolio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              
              {/* CARD 1: GEORGE FOREMAN */}
              <article className="bg-gradient-to-br from-[#1a1c21] to-black rounded-3xl p-6 transition-all group border border-white/5 hover:border-[#00f2ff55]">
                <div className="relative aspect-square overflow-hidden mb-8 bg-white rounded-2xl flex items-center justify-center p-10 shadow-inner">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/GeorgeFormanGrill.jpg')" }} />
                  <img src="/GeorgFormanGrill.png" alt="Foreman" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00f2ff] transition-colors">George Foreman Grill</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Repositioned a boxing legend into a $1B+ kitchen staple.</p>
                <a 
                  href="#booking-terminal" 
                  className="w-full block text-center py-3 border border-[#00f2ff] text-[#00f2ff] font-mono text-xs font-bold uppercase rounded-xl hover:bg-[#00f2ff] hover:text-black transition-all"
                >
                  Analyze DRTV Logic
                </a>
              </article>

              {/* CARD 2: THE SNUGGIE */}
              <article className="bg-gradient-to-br from-[#1a1c21] to-black rounded-3xl p-6 transition-all group border border-white/5 hover:border-[#00f2ff55]">
                <div className="relative aspect-square overflow-hidden mb-8 bg-white rounded-2xl flex items-center justify-center p-10 shadow-inner">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/Snuggie_prodct_mockup.jpg')" }} />
                  <img src="/SnuggieLogo.png" alt="Snuggie" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00f2ff] transition-colors">The Snuggie</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Engineered a global cultural phenomenon for retail expansion.</p>
                <a 
                  href="#booking-terminal" 
                  className="w-full block text-center py-3 border border-[#00f2ff] text-[#00f2ff] font-mono text-xs font-bold uppercase rounded-xl hover:bg-[#00f2ff] hover:text-black transition-all"
                >
                  Explore Viral Scaling
                </a>
              </article>

              {/* CARD 3: THE NINJA BLENDER */}
              <article className="bg-gradient-to-br from-[#1a1c21] to-black rounded-3xl p-6 transition-all group border border-white/5 hover:border-[#00f2ff55]">
                <div className="relative aspect-square overflow-hidden mb-8 bg-white rounded-2xl flex items-center justify-center p-10 shadow-inner">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/Ninja.jpg')" }} />
                  <img src="/Ninja_logo.png" alt="Ninja" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00f2ff] transition-colors">The Ninja Blender</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Disrupted the high-end appliance market through strategic pricing.</p>
                <a 
                  href="#booking-terminal" 
                  className="w-full block text-center py-3 border border-[#00f2ff] text-[#00f2ff] font-mono text-xs font-bold uppercase rounded-xl hover:bg-[#00f2ff] hover:text-black transition-all"
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
        
        {/* PARALLAX BACKGROUND ENGINE (Preserved) */}
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover opacity-[0.35]"
          style={{ backgroundImage: "url('/Parralax_Epco.png')" }}
        />

        {/* HORIZON GLOW (Preserved) */}
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

          {/* ADVANCED 5-ITEM BENTO GRID */}
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
              /* STEP 1: INTAKE FORM */
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

                  <button type="submit" className="w-full mt-8 bg-gradient-to-r from-[#00f2ff] to-[#ff00ea] text-white font-black uppercase tracking-widest py-4 rounded-lg hover:scale-[1.02] transition-all flex justify-center items-center gap-3 shadow-[0_0_30px_rgba(0,242,255,0.3)]">
                    See Eddy's Availability
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </form>
              </div>
            ) : (
              /* STEP 2: CALENDAR REVEAL */
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
        
        {/* THE SEPARATION ENGINE (The "Light Leak") */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent opacity-40 shadow-[0_0_20px_#00f2ff]"></div>
        </div>

        {/* ORBITAL MOTION ENGINE */}
        <div className="absolute inset-0 pointer-events-none">
          
          {/* TOP GLOW: This creates the separation from the section above */}
          <div 
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[100vw] h-[200px] opacity-30 blur-[100px] z-0"
            style={{
              background: 'linear-gradient(to bottom, #ff00ea, #00f2ff, transparent)',
            }}
          />

          {/* THE PLANET: High-saturation rotating core */}
          <div 
            className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[160vw] aspect-square rounded-full z-0 animate-sweep opacity-80"
            style={{
              background: 'conic-gradient(from 270deg at 50% 50%, #00f2ff, #ff00ea, #ffcc00, #00f2ff)',
              filter: 'blur(100px)',
              transformOrigin: 'center center'
            }}
          />

          {/* THE LIMB: Colorful atmospheric edge */}
          <div 
            className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[160vw] aspect-square rounded-full border-t-[4px] border-white/20 z-10 shadow-[0_-20px_60px_rgba(0,242,255,0.4)]"
            style={{
                borderColor: 'rgba(255, 255, 255, 0.3)'
            }}
          />

          {/* SATELLITE SCAN OVERLAY (Cranked up for tech feel) */}
          <div className="absolute inset-0 opacity-[0.12] z-20" 
               style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00f2ff 2px, #00f2ff 3px)', backgroundSize: '100% 6px' }}>
          </div>
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

      {/* 11. FOOTER */}
      <footer className="w-full bg-[#080a0f] py-20 border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            
            {/* BRAND BIO */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/epco-mark.png" alt="EPCO Logo" className="w-10 h-10 object-contain" />
                <span className="font-heading font-black text-3xl tracking-tighter text-white">EPCO.</span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                Engineering consumer phenomena since 1992. <br /> Built for the relentless.
              </p>
            </div>
            
            {/* 3-COLUMN LINK GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-16">
              
              {/* COL 1: NAVIGATION */}
              <div>
                <h4 className="font-mono text-[10px] text-white uppercase tracking-widest mb-6">Navigation</h4>
                <ul className="text-gray-500 text-sm space-y-4">
                  <li><a href="#" className="hover:text-[#00f2ff] transition-colors">Home</a></li>
                  <li><a href="#" className="hover:text-[#00f2ff] transition-colors">Our Edge</a></li>
                  <li><a href="#" className="hover:text-[#00f2ff] transition-colors">Infrastructure</a></li>
                </ul>
              </div>
              
              {/* COL 2: LEGAL */}
              <div>
                <h4 className="font-mono text-[10px] text-white uppercase tracking-widest mb-6">Legal</h4>
                <ul className="text-gray-500 text-sm space-y-4">
                  <li><a href="#" className="hover:text-[#ff00ea] transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-[#ff00ea] transition-colors">Terms</a></li>
                </ul>
              </div>

              {/* COL 3: CONNECT */}
              <div>
                <h4 className="font-mono text-[10px] text-white uppercase tracking-widest mb-6">Connect</h4>
                <ul className="text-gray-500 text-sm space-y-4">
                  {/* Website */}
                  <li>
                    <a href="https://www.eddypham.company/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                      <svg className="w-4 h-4 group-hover:text-[#ffcc00] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path>
                      </svg>
                      <span>Website</span>
                    </a>
                  </li>
                  {/* Substack */}
                  <li>
                    <a href="https://247eddy.substack.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                      <svg className="w-4 h-4 group-hover:text-[#ff00ea] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                      </svg>
                      <span>247Eddy</span>
                    </a>
                  </li>
                  {/* TikTok */}
                  <li>
                    <a href="https://www.tiktok.com/@eddypham" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                      <svg className="w-4 h-4 group-hover:text-[#00f2ff] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                      <span>@eddypham</span>
                    </a>
                  </li>
                  {/* Facebook */}
                  <li>
                    <a href="https://www.facebook.com/Eddypham" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                      <svg className="w-4 h-4 group-hover:text-[#4267B2] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>EddyPham</span>
                    </a>
                  </li>
                  {/* Instagram */}
                  <li>
                    <a href="https://www.instagram.com/eddypham/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                      <svg className="w-4 h-4 group-hover:text-[#E1306C] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      <span>@eddypham</span>
                    </a>
                  </li>
                  {/* LinkedIn */}
                  <li>
                    <a href="https://www.linkedin.com/in/eddypham/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                      <svg className="w-4 h-4 group-hover:text-[#0077b5] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>EddyPham</span>
                    </a>
                  </li>
                  {/* X (Twitter) */}
                  <li>
                    <a href="https://x.com/eddypham" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                      <svg className="w-4 h-4 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                      </svg>
                      <span>@eddypham</span>
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
          
          {/* BOTTOM COPYRIGHT ROW */}
          <div className="mt-20 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-[10px] font-mono uppercase tracking-widest">© 2026 EPCO INTERNATIONAL. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-3 items-center">
               <div className="w-2 h-2 rounded-full bg-[#00f2ff] status-pulse shadow-[0_0_8px_#00f2ff]"></div>
               <p className="text-gray-600 text-[10px] font-mono uppercase tracking-widest">System Operational</p>
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}