import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MessageCircle, Menu, X, Sparkles } from 'lucide-react';
import { openWhatsApp, getGeneralInquiryMessage } from '../utils/whatsapp';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
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
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#3A0612]/92 backdrop-blur-md border-b border-[#D5AA63]/30 shadow-xl'
          : 'bg-[#4A0718] border-b border-[#D5AA63]/20'
      }`}
    >
    
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all ${scrolled ? 'py-2' : 'py-3'}`}>
        {/* Brand Wordmark (Preserving exact logo requested by user) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-none flex items-center gap-3"
        >
          <div>
            <span className="font-script text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#E9CB8A] transition-colors block leading-none">
              Hiyupiyu <span className="font-script font-normal text-2xl sm:text-3xl text-[#E9CB8A] ml-1">Hair & Beauty</span>
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D5AA63] font-semibold block mt-1">
              Ladies Home Service · Surat
            </span>
          </div>
        </button>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative py-1.5 cursor-pointer transition-colors whitespace-nowrap tracking-wide hover:text-[#E9CB8A] ${
                activePage === item.id ? 'text-[#E9CB8A] font-semibold' : 'text-stone-200/90'
              }`}
            >
              {item.label}
              {activePage === item.id && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D5AA63] to-transparent rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => openWhatsApp(getGeneralInquiryMessage())}
            className="px-4 py-2 text-xs font-semibold text-[#E9CB8A] hover:text-white border border-[#D5AA63]/50 hover:border-[#D5AA63] rounded-full flex items-center gap-2 transition-all cursor-pointer hover:bg-white/5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => handleNavClick('book')}
            className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-[#241316] bg-gradient-to-r from-[#D5AA63] via-[#E9CB8A] to-[#D5AA63] hover:brightness-110 rounded-full shadow-[0_4px_16px_rgba(213,170,99,0.3)] transition-all flex items-center gap-2 cursor-pointer transform hover:scale-[1.02] active:scale-98"
          >
            <Calendar className="w-3.5 h-3.5 text-[#241316]" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile Hamburger (sm:hidden on Book button prevents duplicate buttons on iPad and rotated phone) */}
        <div className="flex lg:hidden items-center gap-2.5">
          <button
            onClick={() => handleNavClick('book')}
            className="sm:hidden px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#241316] bg-gradient-to-r from-[#D5AA63] to-[#E9CB8A] rounded-full shadow-sm cursor-pointer"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-200 hover:text-white rounded-lg focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#E9CB8A]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-[#3A0612]/98 border-b border-[#D5AA63]/30 px-6 pt-3 pb-6 space-y-4 shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 divide-y divide-white/10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-3 text-base font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    activePage === item.id ? 'text-[#E9CB8A] font-bold' : 'text-stone-200'
                  }`}
                >
                  <span>{item.label}</span>
                  {activePage === item.id && (
                    <span className="w-2 h-2 rounded-full bg-[#D5AA63]" />
                  )}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp(getGeneralInquiryMessage());
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 94266 86048)</span>
              </button>

              <button
                onClick={() => handleNavClick('book')}
                className="w-full py-3 bg-gradient-to-r from-[#D5AA63] to-[#E9CB8A] text-[#241316] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#241316]" />
                <span>Book Doorstep Session</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
