import React from 'react';
import { Home, Sparkles, MessageCircle, Calendar } from 'lucide-react';
import { openWhatsApp, getGeneralInquiryMessage } from '../utils/whatsapp';

interface MobileStickyBarProps {
  onNavigate: (page: string) => void;
  activePage?: string;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onNavigate, activePage = 'home' }) => {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FEFCF7]/95 border-t border-[#D5AA63]/30 shadow-[0_-4px_25px_rgba(74,7,24,0.08)] backdrop-blur-xl px-3 pt-2 pb-safe"
    >
      <div className="grid grid-cols-4 gap-1 max-w-md mx-auto h-13 items-center pb-1">
        {/* 1. Home */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`h-full flex flex-col items-center justify-center transition-all text-[11px] font-semibold cursor-pointer ${
            activePage === 'home' ? 'text-[#4A0718] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>

        {/* 2. Services */}
        <button
          onClick={() => {
            onNavigate('services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`h-full flex flex-col items-center justify-center transition-all text-[11px] font-semibold cursor-pointer ${
            activePage === 'services' ? 'text-[#4A0718] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-[#D5AA63]" />
          <span>Services</span>
        </button>

        {/* 3. WhatsApp (Floating Action) */}
        <button
          onClick={() => openWhatsApp(getGeneralInquiryMessage())}
          className="h-full flex flex-col items-center justify-center transition-all cursor-pointer relative -top-2.5"
          aria-label="Chat on WhatsApp"
        >
          <div className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg border-2 border-[#FEFCF7] transform active:scale-95 transition-transform">
            <MessageCircle className="w-5 h-5 drop-shadow" />
          </div>
          <span className="text-[10px] font-bold text-emerald-700 mt-0.5">WhatsApp</span>
        </button>

        {/* 4. Book */}
        <button
          onClick={() => {
            onNavigate('book');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`h-full flex flex-col items-center justify-center transition-all text-[11px] font-semibold cursor-pointer ${
            activePage === 'book' ? 'text-[#4A0718] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Calendar className="w-4 h-4 mb-0.5 text-[#D5AA63]" />
          <span>Book</span>
        </button>
      </div>
    </nav>
  );
};
