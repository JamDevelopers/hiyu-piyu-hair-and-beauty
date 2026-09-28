import React, { useState } from 'react';
import { Sparkles, Tag, Copy, CheckCheck, MessageCircle } from 'lucide-react';
import { offers, Offer } from '../data/offers';
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
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D8AA55] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D8AA55]" />
          <span>Exclusive Packages & Combos · Surat</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#261316] tracking-tight">
          Special Beauty Offers
        </h1>
        <p className="font-serif text-xl text-[#5B071B] italic font-semibold">
          તમારી સુંદરતા... અમારી જવાબદારી
        </p>
        <p className="text-stone-600 text-xs sm:text-sm">
          Head-to-toe beauty packages designed for weddings, festivals, and self-care days. Delivered directly at your doorstep in Surat.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offers.map((offer) => (
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
            <span>Static Client-Side Promo Codes</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#261316]">
            Available Discount Coupons
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-xl">
            Use these codes in the booking form calculator. Discounts are verified and confirmed manually with Himanshi on WhatsApp.
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
                <span>Min: ₹{promo.minimumAmount}</span>
                <span className="text-[#5B071B] font-bold">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Help CTA */}
      <div className="text-center p-6 bg-white rounded-3xl border border-[#D8AA55]/30 shadow-sm max-w-xl mx-auto space-y-3">
        <h3 className="font-serif text-xl font-bold text-[#261316]">
          Need a Custom Combination or Bridal Party Package?
        </h3>
        <p className="text-stone-600 text-xs leading-relaxed">
          Himanshi can create customized group packages for mother-daughter combos, sangeet prep, or family wedding functions.
        </p>
        <button
          onClick={() => openWhatsApp(getGeneralInquiryMessage())}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat with Himanshi on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
