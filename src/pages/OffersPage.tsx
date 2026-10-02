import React, { useState } from 'react';
import { Sparkles, Tag, Copy, CheckCheck, MessageCircle, Clock, ShieldCheck, Flame, Gift } from 'lucide-react';
import { offers, Offer, offerCategories } from '../data/offers';
import { promoCodes } from '../data/promoCodes';
import { OfferCard } from '../components/OfferCard';
import { openWhatsApp, getGeneralInquiryMessage } from '../utils/whatsapp';

interface OffersPageProps {
  onBookOffer: (offer: Offer) => void;
  onNavigateToBookingWithPromo?: (code: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  onBookOffer
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Offers');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const filteredOffers = selectedCategory === 'All Offers'
    ? offers
    : offers.filter((o) => o.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <span className="text-xs uppercase tracking-[0.22em] text-[#D8AA55] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D8AA55]" />
          <span>FESTIVE PACKAGES • LUXURY HEALING • SURAT</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#261316] tracking-tight">
          Special Beauty Offers & Packages
        </h1>
        <p className="font-serif text-xl sm:text-2xl text-[#650A20] italic font-semibold">
          તમારી સુંદરતા... અમારી જવાબદારી • Navratri Ma Lago Queen Jevi
        </p>
        <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Exclusive festive Garba bundles, Tibetan sound therapy combos, crystal chakra healing, and separate Oil Massage vs. Cream Body Polish signature packages delivered at your doorstep in Surat.
        </p>

        {/* Advance Notice Ribbon */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FFF7E9] border border-[#D5AA63]/50 text-[#650A20] text-xs font-bold shadow-xs">
          <Clock className="w-4 h-4 text-[#D8AA55] shrink-0" />
          <span>⚠️ Book Your Appointment 2–3 Days in Advance • Slots Filling Fast</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 border-b border-[#D5AA63]/25 pb-5">
        {offerCategories.map((cat) => {
          const count = cat === 'All Offers'
            ? offers.length
            : offers.filter((o) => o.category === cat).length;
          const isSelected = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#650A20] to-[#8E1837] text-white shadow-md shadow-[#650A20]/25'
                  : 'bg-white text-stone-700 hover:text-[#650A20] border border-[#D5AA63]/40 hover:border-[#D5AA63] shadow-xs'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Festive Banner Notice for Navratri / Signature */}
      {selectedCategory === 'Navratri Garba Glow' && (
        <div className="bg-gradient-to-r from-[#650A20] via-[#8E1837] to-[#4A0718] text-white p-5 sm:p-6 rounded-3xl border border-[#D5AA63]/50 shadow-luxury-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8 text-[#E9CB8A] shrink-0 animate-pulse" />
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#E9CB8A]">
                Navratri Garba Glow Special • Limited Time Till Navratri
              </h3>
              <p className="text-xs text-stone-200 mt-0.5">
                Look royal like a queen on the Garba ground. Packages include D-Tan, Facials, Waxing, and Body Polish.
              </p>
            </div>
          </div>
          <button
            onClick={() => openWhatsApp("Hi Himanshi, I want to book a Navratri Garba Glow offer appointment with Hiyupiyu Hair & Beauty!")}
            className="px-5 py-2.5 bg-gradient-to-r from-[#D5AA63] to-[#E9CB8A] text-[#241316] font-bold text-xs rounded-full uppercase tracking-wider whitespace-nowrap shadow-sm hover:brightness-105 transition-all cursor-pointer"
          >
            Enquire on WhatsApp
          </button>
        </div>
      )}

      {(selectedCategory === 'Signature Packages (Oil)' || selectedCategory === 'Signature Packages (Polish)') && (
        <div className="bg-[#FFF7E9] border-2 border-[#D5AA63]/60 p-5 rounded-3xl text-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#650A20]">
              PREMIUM SIGNATURE PACKAGES NOTE:
            </span>
            <p className="text-xs sm:text-sm font-medium">
              Choose <strong>Oil Massage (Series A)</strong> OR <strong>Cream Polish (Series B)</strong> — separate combos curated for total head-to-toe pampering.
            </p>
          </div>
          <span className="text-xs font-bold text-[#650A20] bg-white px-3 py-1.5 rounded-full border border-[#D5AA63]/50 shadow-xs whitespace-nowrap">
            Professional Licensed Therapists
          </span>
        </div>
      )}

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredOffers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onBookOffer={onBookOffer}
          />
        ))}
      </div>

      {/* Static Promo Codes Showcase Section */}
      <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E5] to-[#FDF0DF] border-2 border-[#D8AA55]/40 rounded-3xl p-6 sm:p-10 shadow-luxury-card space-y-6">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-[#5B071B] font-bold flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#5B071B]" />
            <span>Client-Side Promo Discount Coupons</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#261316]">
            Available Booking Promo Codes
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-xl">
            Use these codes in the booking form total calculator. Verified and confirmed directly with Himanshi on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {promoCodes.map((promo) => (
            <div
              key={promo.code}
              className="bg-white rounded-2xl border border-[#D8AA55]/30 p-4 shadow-sm flex flex-col justify-between space-y-3 hover:border-[#D8AA55] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-[#5B071B] tracking-wider">
                    {promo.code}
                  </span>
                  <button
                    onClick={() => handleCopyCode(promo.code)}
                    className="text-stone-400 hover:text-[#5B071B] p-1 cursor-pointer"
                    title="Copy code"
                  >
                    {copiedCode === promo.code ? (
                      <CheckCheck className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#D8AA55]" />
                    )}
                  </button>
                </div>
                <p className="text-stone-600 text-xs mt-1.5 leading-relaxed">
                  {promo.description}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                <span>Min Order: ₹{promo.minimumAmount}</span>
                <span className="text-[#5B071B] font-bold">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#650A20] text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#D5AA63]/50 shadow-luxury-card">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E9CB8A]">
            PERSONALIZED COMBOS & QUESTIONS
          </span>
          <h3 className="font-serif text-2xl font-bold">
            Need a Custom Bridal or Event Package?
          </h3>
          <p className="text-xs text-stone-200 max-w-lg leading-relaxed">
            Himanshi Patel customizes packages for groups, pre-wedding functions, and special festivals in Surat.
          </p>
        </div>

        <button
          onClick={() => openWhatsApp(getGeneralInquiryMessage())}
          className="px-6 py-3.5 bg-gradient-to-r from-[#D5AA63] via-[#E9CB8A] to-[#D5AA63] text-[#241316] font-bold text-xs uppercase tracking-wider rounded-full shadow-md hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 text-[#241316]" />
          <span>Chat on WhatsApp (94266 86048)</span>
        </button>
      </div>
    </div>
  );
};
