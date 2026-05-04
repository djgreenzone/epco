export default function Home() {
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
          <div className="font-heading font-black text-3xl tracking-tighter">EPCO.</div>
          <nav className="hidden md:flex gap-8 text-sm font-mono uppercase font-semibold text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Our Edge</a>
            <a href="#" className="hover:text-white transition-colors">Solutions</a>
          </nav>
          <button className="text-sm font-mono uppercase bg-white text-black px-6 py-2 rounded-xl hover:opacity-80 transition-opacity">
            Let's Talk
          </button>
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
          <button className="mt-12 bg-white text-black font-bold px-12 py-5 rounded-2xl text-xl hover:bg-[#00f2ff] hover:shadow-[0_0_40px_#00f2ff80] transition-all hover:scale-105 active:scale-95 shadow-2xl">
            Book a Strategy Call
          </button>
        </div>
      </section>

      {/* 4. THE TRUST BAR */}
      <section className="py-6 bg-white flex flex-col items-center overflow-hidden relative z-40 shadow-xl border-b border-gray-100">
        <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-4">// BEHIND 30 YEARS OF CONSUMER PHENOMENA</p>
        <div className="w-full overflow-hidden">
          <div className="flex w-max animate-scroll items-center gap-16 px-8">
            {/* Logos */}
            <img src="/GeorgFormanGrill.png" alt="Foreman" className="h-16 w-auto object-contain" />
            <img src="/Ninja_logo.png" alt="Ninja" className="h-16 w-auto object-contain" />
            <img src="/QVC%20Logo.png" alt="QVC" className="h-16 w-auto object-contain" />
            <img src="/Snuggie.PNG" alt="Snuggie" className="h-16 w-auto object-contain" />
            <img src="/Ped-Egg.png" alt="Ped Egg" className="h-16 w-auto object-contain" />
            <img src="/Magic-Bullet.png" alt="Magic Bullet" className="h-16 w-auto object-contain" />
            <img src="/GeorgFormanGrill.png" alt="Foreman" className="h-16 w-auto object-contain" />
            <img src="/Ninja_logo.png" alt="Ninja" className="h-16 w-auto object-contain" />
            <img src="/QVC%20Logo.png" alt="QVC" className="h-16 w-auto object-contain" />
            <img src="/Snuggie.PNG" alt="Snuggie" className="h-16 w-auto object-contain" />
            <img src="/Ped-Egg.png" alt="Ped Egg" className="h-16 w-auto object-contain" />
            <img src="/Magic-Bullet.png" alt="Magic Bullet" className="h-16 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* --- START THE DARK BLOCK (Bento -> Criteria -> Winners) --- */}
      <div className="bg-[#0b0e14]">
        
        {/* 5. THE BENTO GRID */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[450px]">
            <article className="md:col-span-2 bg-white rounded-3xl p-10 flex flex-col md:flex-row gap-8 justify-between hover:shadow-[0_0_30px_#ff00ea66] transition-all group overflow-hidden">
              <div className="z-10 flex flex-col justify-center w-full md:w-[45%]">
                <p className="font-mono text-xs text-gray-400 mb-4 tracking-wider">// THE FOUNDER'S DESK</p>
                <h2 className="text-3xl font-heading font-bold mb-4 text-black leading-tight">"I’ll say this upfront..."</h2>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">Since 1992, I’ve lived in the trenches of product development. No MBA jargon. Just sound market intelligence.</p>
                <p className="font-black text-black text-lg">- Eddy Pham</p>
              </div>
              <div className="z-10 w-full md:w-[55%] h-full relative rounded-2xl overflow-hidden bg-gray-100">
                <img src="/EddyPham_Professtional_Shoot.png" alt="Eddy Pham" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </article>

            <article className="bg-[#14171c] border border-gray-800 rounded-3xl p-10 flex flex-col justify-center hover:border-transparent hover:shadow-[0_0_30px_#ff00ea66] transition-all group relative overflow-hidden text-white">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] opacity-5"></div>
              <div className="relative z-10">
                <p className="font-mono text-xs text-gray-500 mb-4 tracking-wider">// THE PARTNERSHIP</p>
                <h2 className="text-3xl font-heading font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]">Built for the Relentless.</h2>
                <p className="text-gray-400 text-sm leading-relaxed">Whether you are an inventor or a CEO, we provide the infrastructure to scale brands to eight figures.</p>
              </div>
            </article>

            <article className="bg-white rounded-3xl p-10 flex flex-col justify-between hover:shadow-[0_0_30px_#ff00ea66] transition-all">
              <div className="w-full flex justify-center flex-grow pt-4">
                <img src="/idea.png" alt="Evaluate" className="w-36 h-36 object-contain" />
              </div>
              <div className="mt-8">
                <p className="font-mono text-xs text-gray-400 mb-4 tracking-wider">// 01. EVALUATE & ENGINEER</p>
                <h3 className="text-2xl font-heading font-bold mb-3 text-black">Don't build a product nobody wants.</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Market feasibility and physical prototyping.</p>
              </div>
            </article>

            <article className="bg-white rounded-3xl p-10 flex flex-col justify-between hover:shadow-[0_0_30px_#ff00ea66] transition-all">
              <div className="w-full flex justify-center flex-grow pt-4">
                <img src="/boost.png" alt="Build" className="w-36 h-36 object-contain" />
              </div>
              <div className="mt-8">
                <p className="font-mono text-xs text-gray-400 mb-4 tracking-wider">// 02. BUILD & SOURCE</p>
                <h3 className="text-2xl font-heading font-bold mb-3 text-black">Skip the expensive middlemen.</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Global manufacturing sourcing and logistics.</p>
              </div>
            </article>

            <article className="bg-white rounded-3xl p-10 flex flex-col justify-between hover:shadow-[0_0_30px_#ff00ea66] transition-all">
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
                Over $3B in combined retail sales generated across the portfolio.
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
                <button className="w-full py-3 border border-[#00f2ff] text-[#00f2ff] font-mono text-xs font-bold uppercase rounded-xl hover:bg-[#00f2ff] hover:text-black transition-all">Analyze DRTV Logic</button>
              </article>

              <article className="bg-gradient-to-br from-[#1a1c21] to-black rounded-3xl p-6 transition-all group border border-white/5 hover:border-[#00f2ff55]">
                <div className="relative aspect-square overflow-hidden mb-8 bg-white rounded-2xl flex items-center justify-center p-10 shadow-inner">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/Snuggie_prodct_mockup.jpg')" }} />
                  <img src="/SnuggieLogo.png" alt="Snuggie" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00f2ff] transition-colors">The Snuggie</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Engineered a global cultural phenomenon for retail expansion.</p>
                <button className="w-full py-3 border border-[#00f2ff] text-[#00f2ff] font-mono text-xs font-bold uppercase rounded-xl hover:bg-[#00f2ff] hover:text-black transition-all">Explore Viral Scaling</button>
              </article>

              <article className="bg-gradient-to-br from-[#1a1c21] to-black rounded-3xl p-6 transition-all group border border-white/5 hover:border-[#00f2ff55]">
                <div className="relative aspect-square overflow-hidden mb-8 bg-white rounded-2xl flex items-center justify-center p-10 shadow-inner">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/Ninja.jpg')" }} />
                  <img src="/Ninja_logo.png" alt="Ninja" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00f2ff] transition-colors">The Ninja Blender</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Disrupted the high-end appliance market through strategic pricing.</p>
                <button className="w-full py-3 border border-[#00f2ff] text-[#00f2ff] font-mono text-xs font-bold uppercase rounded-xl hover:bg-[#00f2ff] hover:text-black transition-all">Review Product ROI</button>
              </article>
            </div>
          </div>
        </section>
      </div> 
      {/* --- END THE DARK BLOCK --- */}

      {/* 8. GLOBAL INFRASTRUCTURE: CINEMATIC HORIZON */}
      <section className="w-full bg-[#0b0e14] py-40 relative overflow-hidden border-t border-gray-900">
        
        {/* PARALLAX BACKGROUND ENGINE */}
        <div 
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover opacity-[0.35]"
          style={{ backgroundImage: "url('/Parralax_Epco.png')" }}
        />

        {/* HORIZON GLOW (Overlays the Parallax) */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
            {['United States', 'Shenzhen', 'Vietnam', 'Logistics'].map((city, idx) => (
              <div key={city} className="relative group bg-black/20 p-6 rounded-xl border border-white/5 backdrop-blur-sm hover:bg-black/40 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="status-pulse w-2 h-2 bg-[#00f2ff] rounded-full animate-pulse"></div>
                  <span className="font-mono text-[10px] text-[#00f2ff] uppercase tracking-widest font-bold">Active Hub</span>
                </div>
                <h3 className="text-3xl font-heading font-bold mb-2 group-hover:text-white transition-colors">{city}</h3>
                <div className="h-[1px] w-full bg-gradient-to-r from-[#00f2ff33] to-transparent mb-6"></div>
                <ul className="text-gray-400 text-xs space-y-4 font-medium uppercase tracking-wider">
                  <li><span className="text-[#ff00ea] mr-2">01</span> Product Engineering</li>
                  <li><span className="text-[#ff00ea] mr-2">02</span> Global Sourcing</li>
                  <li><span className="text-[#ff00ea] mr-2">03</span> Final Assembly</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. THE STRATEGIC COMPARISON */}
      <section className="w-full bg-[#0b0e14] py-32 border-t border-gray-900">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          <div className="mb-20">
            <p className="font-mono text-xs text-gray-500 mb-4 tracking-wider uppercase">// COMPETITIVE DIAGNOSTICS</p>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
              Agencies <span className="text-gray-600 font-light italic">talk.</span> <br />
              EPCO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]">builds.</span>
            </h2>
          </div>

          <div className="w-full overflow-hidden rounded-3xl border border-gray-800 bg-[#14171c]/50 backdrop-blur-sm relative group">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent opacity-20 absolute animate-[scan_4s_linear_infinite]"></div>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="p-8 font-mono text-[18px] text-white-500 uppercase tracking-widest w-1/3">Metric</th>
                  <th className="p-8 font-mono text-[18px] text-white-500 uppercase tracking-widest w-1/3">Agency</th>
                  <th className="p-8 font-mono text-[18px] text-[#00f2ff] uppercase tracking-widest w-1/3">EPCO Model</th>
                </tr>
              </thead>
              <tbody className="text-sm text-white">
                <tr className="border-b border-gray-800 hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 text-white-400 font-normal">Supply Chain</td>
                  <td className="p-8 text-white-600">Zero Control.</td>
                  <td className="p-8 font-bold text-[#00f2ff]">Total Control.</td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 text-white-400 font-normal">Speed</td>
                  <td className="p-8 text-white-600">6-12 Months.</td>
                  <td className="p-8 font-bold text-[#00f2ff]">90 Days.</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 text-white-400 font-normal">Focus</td>
                  <td className="p-8 text-white-600">"Likes" & Impressions.</td>
                  <td className="p-8 font-bold text-[#00f2ff]">Direct Response ROI.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-16 flex flex-col items-center">
            <button className="bg-white text-black font-bold px-12 py-5 rounded-2xl text-xl hover:bg-[#00f2ff] hover:shadow-[0_0_30px_#00f2ff80] transition-all">
              Apply for Partnership
            </button>
          </div>
        </div>
      </section>

      {/* 10. THE APPLICATION (Intake Terminal) */}
      <section className="w-full bg-[#0b0e14] py-32 relative overflow-hidden">
        {/* Subtle Background Glow to separate from the table above */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[1px] bg-gradient-to-r from-transparent via-[#00f2ff33] to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-8 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <p className="font-mono text-xs text-gray-500 mb-4 tracking-wider uppercase">// PARTNERSHIP INTAKE</p>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              Start the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00]">Phenomenon.</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              We are selective with our partnerships. If your product meets the EPCO criteria, our team will reach out within 24 hours.
            </p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group relative">
              <label className="block font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-[#00f2ff] transition-colors">Full Name</label>
              <input type="text" className="w-full bg-transparent border-b border-gray-800 py-3 text-white outline-none focus:border-[#00f2ff] transition-all placeholder:text-gray-700" placeholder="John Doe" />
            </div>
            
            <div className="group relative">
              <label className="block font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-[#00f2ff] transition-colors">Company Email</label>
              <input type="email" className="w-full bg-transparent border-b border-gray-800 py-3 text-white outline-none focus:border-[#00f2ff] transition-all placeholder:text-gray-700" placeholder="john@company.com" />
            </div>

            <div className="md:col-span-2 group relative">
              <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-[#ff00ea] transition-colors">Product Description & Current Scale</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-gray-800 py-3 text-white outline-none focus:border-[#ff00ea] transition-all placeholder:text-gray-700 resize-none" placeholder="Tell us about your product and current monthly revenue..."></textarea>
            </div>

            <div className="md:col-span-2 flex justify-center mt-8">
              <button className="group relative bg-white text-black font-bold px-16 py-6 rounded-2xl text-xl overflow-hidden hover:scale-105 transition-all active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                <span className="relative z-10">Submit Application</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-white group-hover:opacity-0 transition-opacity duration-500"></div>
              </button>
            </div>
          </form>
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
            Innovation is <span className="text-gray-600 underline decoration-[#ff00ea]/30">expensive.</span> <br /> 
            Guessing is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#ff00ea] to-[#ffcc00] animate-pulse">more expensive.</span>
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <div className="font-heading font-black text-3xl tracking-tighter text-white mb-4">EPCO.</div>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                Engineering consumer phenomena since 1992. <br /> Built for the relentless.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-16">
              <div>
                <h4 className="font-mono text-[10px] text-white uppercase tracking-widest mb-6">Navigation</h4>
                <ul className="text-gray-500 text-sm space-y-4">
                  <li><a href="#" className="hover:text-[#00f2ff] transition-colors">Home</a></li>
                  <li><a href="#" className="hover:text-[#00f2ff] transition-colors">Our Edge</a></li>
                  <li><a href="#" className="hover:text-[#00f2ff] transition-colors">Infrastructure</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-[10px] text-white uppercase tracking-widest mb-6">Legal</h4>
                <ul className="text-gray-500 text-sm space-y-4">
                  <li><a href="#" className="hover:text-[#ff00ea] transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-[#ff00ea] transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-[10px] font-mono uppercase tracking-widest">© 2026 EPCO INTERNATIONAL. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
               <div className="w-2 h-2 rounded-full bg-[#00f2ff] status-pulse"></div>
               <p className="text-gray-600 text-[10px] font-mono uppercase tracking-widest">System Operational</p>
            </div>
          </div>
        </div>
      </footer>

      

    </main>
  );
}