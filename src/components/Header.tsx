import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { settings } from '../data/settings';
import { openWhatsApp, callBusiness, getGeneralInquiryMessage } from '../utils/whatsapp';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'offers', label: 'Offers' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#3A0612]/95 backdrop-blur-md border-b border-[#D8AA55]/30 text-white shadow-lg py-1'
          : 'bg-[#5B071B] border-b border-[#D8AA55]/25 text-white py-1.5'
      }`}
    >
      {/* Main Bar */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'h-16' : 'h-20'
      }`}>
        {/* Brand Zone */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-none flex items-center gap-3"
        >
          <div>
            <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#F1D79A] transition-colors block leading-none">
              Hiyupiyu <span className="font-script font-normal text-2xl text-[#F1D79A] ml-1">Hair & Beauty</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#D8AA55] font-semibold block mt-1">
              Ladies Home Service · Surat
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative py-1.5 cursor-pointer transition-colors whitespace-nowrap hover:text-[#F1D79A] ${
                activePage === item.id ? 'text-[#F1D79A] font-semibold' : ''
              }`}
            >
              {item.label}
              {activePage === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D8AA55] to-transparent rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop Action Zone */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => openWhatsApp(getGeneralInquiryMessage())}
            className="px-4 py-2 text-xs font-semibold text-[#F1D79A] hover:text-white border border-[#D8AA55]/50 hover:border-[#D8AA55] rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => handleNavClick('book')}
            className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-[#261316] bg-gradient-to-r from-[#D8AA55] via-[#F1D79A] to-[#D8AA55] hover:brightness-110 rounded-xl shadow-gold-glow transition-all flex items-center gap-1.5 cursor-pointer transform hover:scale-[1.02]"
          >
            <Calendar className="w-3.5 h-3.5 text-[#261316]" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => handleNavClick('book')}
            className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#261316] bg-gradient-to-r from-[#D8AA55] to-[#F1D79A] rounded-lg cursor-pointer"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-200 hover:text-white rounded-lg focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#F1D79A]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#3A0612]/98 border-b border-[#D8AA55]/30 px-5 pt-3 pb-6 space-y-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 divide-y divide-white/10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-3 text-base font-medium transition-colors cursor-pointer flex items-center justify-between ${
                  activePage === item.id ? 'text-[#F1D79A] font-bold' : 'text-stone-200'
                }`}
              >
                <span>{item.label}</span>
                {activePage === item.id && (
                  <span className="w-2 h-2 rounded-full bg-[#D8AA55]" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => openWhatsApp(getGeneralInquiryMessage())}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp (94266 86048)</span>
            </button>
            <button
              onClick={() => callBusiness()}
              className="w-full py-2.5 px-4 border border-[#D8AA55]/60 text-[#F1D79A] rounded-xl text-sm font-medium flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#D8AA55]" />
              <span>Direct Call: 94266 86048</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
