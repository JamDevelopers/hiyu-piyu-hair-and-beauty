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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-amber-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl px-2 py-1.5"
    >
      <div className="grid grid-cols-4 gap-1 max-w-md mx-auto h-13 items-center">
        {/* 1. Home */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`h-full flex flex-col items-center justify-center transition-all text-[11px] font-semibold cursor-pointer ${
            activePage === 'home' ? 'text-[#7C132B] font-bold' : 'text-stone-600 hover:text-stone-900'
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
            activePage === 'services' ? 'text-[#7C132B] font-bold' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-amber-600" />
          <span>Services</span>
        </button>

        {/* 3. WhatsApp (Visually Prominent) */}
        <button
          onClick={() => openWhatsApp(getGeneralInquiryMessage())}
          className="h-full flex flex-col items-center justify-center transition-all cursor-pointer relative -top-2"
          aria-label="Chat on WhatsApp"
        >
          <div className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg border-2 border-white transform hover:scale-105 transition-transform">
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
            activePage === 'book' ? 'text-amber-700 font-bold' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Calendar className="w-4 h-4 mb-0.5 text-amber-600" />
          <span>Book</span>
        </button>
      </div>
    </nav>
  );
};
