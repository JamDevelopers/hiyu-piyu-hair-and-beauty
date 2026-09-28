import React from 'react';
import { Phone, MessageCircle, MapPin, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import { settings } from '../data/settings';
import { openWhatsApp, callBusiness, getGeneralInquiryMessage } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gradient-to-br from-[#4A0A19] via-[#3B0713] to-[#2B040D] text-stone-200 pt-16 pb-28 md:pb-16 border-t-2 border-amber-400/50 relative overflow-hidden">
      {/* Decorative Golden Ambient Backing */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(245,158,11,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                Hiyupiyu Hair & Beauty
              </h3>
              <p className="text-amber-300 font-bold text-sm tracking-wider uppercase mt-1">
                Ladies Only • Home Service • Surat
              </p>
              <p className="text-sm text-amber-200/90 font-serif italic mt-0.5 font-bold">
                {settings.gujaratiBrandName}
              </p>
            </div>
            <p className="text-stone-200 text-sm leading-relaxed">
              Premium doorstep salon treatments tailored exclusively for ladies across Surat. Led by expert beautician Himanshi Patel.
            </p>
            <div className="pt-2 text-xs text-amber-200 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{settings.gujaratiTagline}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-serif text-lg font-bold tracking-wide border-b border-[#D8AA55]/30 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#F1D79A] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#F1D79A] transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="hover:text-[#F1D79A] transition-colors cursor-pointer text-[#F1D79A] font-bold"
                >
                  Offers & Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#F1D79A] transition-colors cursor-pointer"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#F1D79A] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#F1D79A] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-serif text-lg font-bold tracking-wide border-b border-[#D8AA55]/30 pb-2">
              Contact & Hours
            </h4>
            <div className="space-y-3 text-sm text-stone-300">
              <p className="flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-[#D8AA55] shrink-0 mt-0.5" />
                <span>Doorstep Home Service across Surat, Gujarat</span>
              </p>
              <p className="flex items-center gap-2 text-xs">
                <Clock className="w-4 h-4 text-[#D8AA55] shrink-0" />
                <span>9:30 AM – 7:30 PM (All 7 Days)</span>
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => callBusiness()}
                  className="inline-flex items-center gap-2 text-white hover:text-[#F1D79A] transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#D8AA55]" />
                  <span className="font-mono text-base font-bold">94266 86048</span>
                </button>
                <button
                  onClick={() => openWhatsApp(getGeneralInquiryMessage())}
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: 94266 86048</span>
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Trust & Coverage */}
          <div className="space-y-3">
            <h4 className="text-white font-serif text-lg font-bold tracking-wide border-b border-[#D8AA55]/30 pb-2">
              Coverage & Trust
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2 text-[#F1D79A] font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Ladies Only & Verified</span>
              </div>
              <p className="text-stone-300/80">
                Single-use disposable sheets, sanitized tools, and zero travel hassle.
              </p>
              <div className="pt-2">
                <span className="text-[#D8AA55] font-bold block mb-1">Serving All Major Surat Areas:</span>
                <p className="text-[11px] text-stone-300/80 leading-relaxed">
                  Vesu · Adajan · Pal · Althan · Citylight · Piplod · VIP Road · Ghod Dod Rd · Katargam · Varachha · Rander · Dumas Rd
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Gold Divider */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D8AA55] to-transparent my-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Hiyupiyu Hair & Beauty. All rights reserved.</p>
          <p className="text-center sm:text-right text-stone-400">
            Appointments confirmed manually via WhatsApp. No advance online payments required.
          </p>
        </div>
      </div>
    </footer>
  );
};
