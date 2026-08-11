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
                <li><a href="/services/product-development" className="hover:text-[#00f2ff] transition-colors">Product Development</a></li>
                <li><a href="/services/web-development" className="hover:text-[#00f2ff] transition-colors">Web Development</a></li>
                <li><a href="/services/digital-marketing" className="hover:text-[#00f2ff] transition-colors">Digital Marketing</a></li>
                <li><a href="/services/direct-response" className="hover:text-[#00f2ff] transition-colors">Direct Response</a></li>
                <li><a href="/#booking-terminal" className="hover:text-[#00f2ff] transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[10px] text-white uppercase tracking-widest mb-6">Legal</h4>
              <ul className="text-gray-500 text-sm space-y-4">
                <li><a href="/legal/privacy" className="hover:text-[#ff00ea] transition-colors">Privacy</a></li>
                <li><a href="/legal/terms" className="hover:text-[#ff00ea] transition-colors">Terms</a></li>
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
                  <a href="https://www.linkedin.com/in/eddypham/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors group">
                    <svg className="w-4 h-4 group-hover:text-[#00f2ff] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                    </svg>
                    <span>LinkedIn</span>
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
