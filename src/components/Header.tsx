"use client";

export default function Header() {
  return (
    <header className="w-full bg-[#0b0e14] text-white relative z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-6 px-8 md:px-12">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/epco-mark.png" alt="EPCO Logo" className="w-10 h-10 object-contain" />
          <span className="font-heading font-black text-3xl tracking-tighter text-white">EPCO.</span>
        </a>
        
        <div className="flex items-center gap-6">
          <a href="/services" className="text-sm font-mono uppercase text-gray-400 hover:text-[#00f2ff] transition-colors">
            Web Development
          </a>
          <a href="/#booking-terminal" className="text-sm font-mono uppercase bg-white text-black px-6 py-2 rounded-xl hover:opacity-80 transition-opacity font-bold">
            Let's Talk
          </a>
        </div>
      </div>
    </header>
  );
}