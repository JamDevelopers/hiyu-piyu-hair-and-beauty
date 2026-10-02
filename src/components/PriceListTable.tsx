import React, { useState } from 'react';
import { Sparkles, Check, Phone, MessageCircle, Heart, Star, ShieldCheck } from 'lucide-react';
import { services } from '../data/services';
import { openWhatsApp, callBusiness } from '../utils/whatsapp';

interface PriceListTableProps {
  onBookService?: (serviceId: string) => void;
}

export const PriceListTable: React.FC<PriceListTableProps> = ({ onBookService }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Filter categories
  const categories = [
    'All',
    'Luxury Healing & Body',
    'Facials & Skin Glow',
    'Waxing Care',
    'Hands & Feet',
    'Hair Rituals',
    'Threading'
  ];

  const displayedServices = filterCategory === 'All'
    ? services
    : services.filter(s => s.category === filterCategory);

  return (
    <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF5ED] to-[#FFF7E9] rounded-3xl border-2 border-[#D5AA63]/50 p-6 sm:p-10 shadow-luxury-card space-y-8">
      {/* Official Poster Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#650A20] text-[#E9CB8A] text-xs font-bold uppercase tracking-[0.2em] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D5AA63]" />
          <span>OFFICIAL SERVICE MENU • SURAT</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#241316]">
          Hiyupiyu Hair & Beauty Price List
        </h2>

        <p className="font-serif text-lg sm:text-xl text-[#650A20] italic font-semibold">
          તમારી સુંદરતા... અમારી જવાબદારી • HOME SERVICE ONLY FOR LADIES
        </p>

        <p className="text-stone-600 text-xs sm:text-sm">
          Transparent, fixed doorstep salon pricing across Surat. No hidden costs. Sterilized single-use disposable kits and licensed expert care.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterCategory === cat
                ? 'bg-[#650A20] text-[#E9CB8A] shadow-sm'
                : 'bg-white text-stone-700 hover:text-[#650A20] border border-[#D5AA63]/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive Price Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-[#D5AA63]/35 p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-[#D5AA63] hover:shadow-md transition-all group"
          >
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-serif text-base sm:text-lg font-bold text-[#241316] group-hover:text-[#650A20] transition-colors">
                  {service.name}
                </span>
                {service.popularTag && (
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[#FFF7E9] text-[#650A20] px-2 py-0.5 rounded-md border border-[#D5AA63]/40">
                    {service.popularTag}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="font-serif text-[#8E1837] font-semibold">
                  {service.gujaratiName}
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-stone-500">{service.duration} mins</span>
              </div>

              <p className="text-stone-600 text-xs line-clamp-1">
                {service.description}
              </p>
            </div>

            <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
              <div>
                {service.startingPrice && (
                  <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                    Start From
                  </span>
                )}
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#650A20]">
                  ₹{service.price}
                </span>
                {service.originalPrice && (
                  <span className="text-xs text-stone-400 line-through ml-1.5">
                    ₹{service.originalPrice}
                  </span>
                )}
              </div>

              {onBookService && (
                <button
                  onClick={() => onBookService(service.id)}
                  className="px-3 py-1 bg-gradient-to-r from-[#D5AA63] to-[#E9CB8A] text-[#241316] text-[11px] font-bold rounded-lg uppercase tracking-wider hover:brightness-105 shadow-2xs transition-all cursor-pointer"
                >
                  Book
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Triad (From Image 1 Footer) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#D5AA63]/30">
        <div className="bg-white/80 p-4 rounded-2xl border border-[#D5AA63]/25 text-center space-y-1">
          <ShieldCheck className="w-5 h-5 text-[#650A20] mx-auto" />
          <h4 className="font-serif text-sm font-bold text-[#241316]">CLEANLINESS (સ્વચ્છતા)</h4>
          <p className="text-[11px] text-stone-600">સ્વચ્છતા અમારી પ્રાથમિકતા • Sterilized Single-Use Supplies</p>
        </div>

        <div className="bg-white/80 p-4 rounded-2xl border border-[#D5AA63]/25 text-center space-y-1">
          <Star className="w-5 h-5 text-[#D5AA63] mx-auto" />
          <h4 className="font-serif text-sm font-bold text-[#241316]">QUALITY SERVICE (ગુણવત્તા)</h4>
          <p className="text-[11px] text-stone-600">ઉચ્ચ ગુણવત્તાની પ્રીમિયમ સેવા • 100% Branded Products</p>
        </div>

        <div className="bg-white/80 p-4 rounded-2xl border border-[#D5AA63]/25 text-center space-y-1">
          <Heart className="w-5 h-5 text-[#650A20] mx-auto" />
          <h4 className="font-serif text-sm font-bold text-[#241316]">TRUST & CARE (ભરોસો)</h4>
          <p className="text-[11px] text-stone-600">ભરોસો, કાળજી અને સંતોષ • Only Ladies Specialists</p>
        </div>
      </div>

      {/* Instant Action Strip */}
      <div className="bg-[#650A20] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#D5AA63]/40">
        <div className="text-center sm:text-left">
          <span className="text-[11px] uppercase tracking-wider text-[#E9CB8A] font-bold block">
            HOME SERVICE AVAILABLE ACROSS SURAT
          </span>
          <p className="text-sm font-medium">
            Contact <strong>Himanshi Patel</strong> to confirm your slot or request custom treatments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => callBusiness()}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
          >
            <Phone className="w-3.5 h-3.5 text-[#E9CB8A]" />
            <span>Call 94266 86048</span>
          </button>

          <button
            onClick={() => openWhatsApp("Hi Himanshi Patel, I am checking the Hiyupiyu Hair & Beauty Price List and would like to book a service at my home in Surat.")}
            className="px-5 py-2.5 bg-gradient-to-r from-[#D5AA63] to-[#E9CB8A] text-[#241316] rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm hover:brightness-105 transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#241316]" />
            <span>WhatsApp Booking</span>
          </button>
        </div>
      </div>
    </div>
  );
};
