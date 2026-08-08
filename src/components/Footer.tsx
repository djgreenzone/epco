"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-[#080a0f] py-20 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/epco-mark.png" alt="EPCO Logo" className="w-10 h-10 object-contain" />
              <span className="font-heading font-black text-3xl tracking-tighter text-white">EPCO.</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Engineering consumer phenomena since 1992. <br /> Built for the relentless.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-16">
            
            <div>
              <h4 className="font-mono text-[10px] text-white uppercase tracking-widest mb-6">Navigation</h4>
              <ul className="text-gray-500 text-sm space-y-4">
                <li><a href="/" className="hover:text-[#00f2ff] transition-colors">Home</a></li>
                <li><a href="/services/web-development" className="hover:text-[#00f2ff] transition-colors">Services</a></li>
                <li><a href="/#booking-terminal" className="hover:text-[#00f2ff] transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-mono text-[10px] text-white uppercase tracking-widest mb-6">Legal</h4>
              <ul className="text-gray-500 text-sm space-y-4">
                <li><a href="#" className="hover:text-[#ff00ea] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#ff00ea] transition-colors">Terms</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[10px] text-white uppercase tracking-widest mb-6">Connect</h4>
              <ul className="text-gray-500 text-sm space-y-4">
                <li>
                  <a href="https://www.eddypham.company/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                    <svg className="w-4 h-4 group-hover:text-[#ffcc00] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path>
                    </svg>
                    <span>Website</span>
                  </a>
                </li>
                <li>
                  <a href="https://247eddy.substack.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                    <svg className="w-4 h-4 group-hover:text-[#ff00ea] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                    </svg>
                    <span>247Eddy</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@eddypham" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                    <svg className="w-4 h-4 group-hover:text-[#00f2ff] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                    </svg>
                    <span>TikTok</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}