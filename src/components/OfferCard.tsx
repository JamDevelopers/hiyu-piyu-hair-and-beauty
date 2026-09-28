import React, { useState } from 'react';
import { Sparkles, Calendar, MessageCircle, Check, Tag, Copy, CheckCheck } from 'lucide-react';
import { Offer } from '../data/offers';
import { openWhatsApp, getOfferInquiryMessage } from '../utils/whatsapp';

interface OfferCardProps {
  offer: Offer;
  onBookOffer: (offer: Offer) => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, onBookOffer }) => {
  const [copied, setCopied] = useState(false);
  const sampleCode = offer.popular ? 'WELCOME10' : 'SAVE150';

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group relative bg-white rounded-3xl border-2 ${
        offer.popular
          ? 'border-[#D8AA55] shadow-luxury-hover ring-2 ring-[#D8AA55]/20'
          : 'border-[#D8AA55]/30 shadow-luxury-card'
      } flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5`}
    >
      {/* Visual Header if image is present */}
      {offer.imageUrl && (
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
          <img
            src={offer.imageUrl}
            alt={offer.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
          
          {/* Top Badge */}
          <div className="absolute top-3 left-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#261316] flex items-center gap-1.5 bg-gradient-to-r from-[#D8AA55] via-[#F1D79A] to-[#D8AA55] px-3 py-1 rounded-full shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#261316]" />
              <span>{offer.badge}</span>
            </span>
          </div>

          {/* Validity Badge */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
            <span className="font-mono text-[11px] text-[#F1D79A] bg-[#3A0612]/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-[#D8AA55]/40">
              Valid: {offer.validUntil}
            </span>
            <span className="text-xs font-bold text-white bg-emerald-700/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-emerald-400/40">
              Save ₹{offer.savings}
            </span>
          </div>
        </div>
      )}

      {/* Card Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-white">
        <div>
          {!offer.imageUrl && (
            <div className="flex items-center justify-between gap-2 mb-3.5">
              <span className="text-xs font-bold tracking-wider uppercase text-[#261316] flex items-center gap-1.5 bg-gradient-to-r from-[#D8AA55] to-[#F1D79A] px-3 py-1 rounded-full shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#261316]" />
                <span>{offer.badge}</span>
              </span>
              <span className="text-[11px] text-stone-500 font-mono">
                Valid: {offer.validUntil}
              </span>
            </div>
          )}

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#261316] leading-snug">
            {offer.title}
          </h3>
          {offer.gujaratiTitle && (
            <p className="font-serif text-sm text-[#5B071B] italic mt-0.5 font-bold">
              {offer.gujaratiTitle}
            </p>
          )}

          <p className="text-stone-600 text-xs mt-2 italic font-serif">
            "{offer.tagline}"
          </p>

          <p className="text-stone-600 text-xs mt-2 leading-relaxed">
            {offer.description}
          </p>

          {/* Promo Code Highlight Box with Soft Glowing Accent */}
          <div className="mt-4 p-3 rounded-xl bg-[#FFF9ED] border border-[#D8AA55]/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#5B071B]" />
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Apply Code:</span>
                <span className="font-mono text-xs font-bold text-[#5B071B] tracking-wider">{sampleCode}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="px-2.5 py-1 text-[11px] font-bold text-[#5B071B] hover:bg-[#D8AA55]/20 rounded-md border border-[#D8AA55]/40 flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D8AA55]" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Included Services list */}
          <div className="mt-4 pt-4 border-t border-stone-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B071B] block mb-2">
              Package Inclusions:
            </span>
            <ul className="space-y-1.5 text-xs text-stone-700">
              {offer.includedServices.map((inc, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D8AA55] shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing and CTAs */}
        <div className="mt-6 pt-4 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-semibold">Special Offer</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#7C132B] font-mono tabular-nums">
                  ₹{offer.offerPrice}
                </span>
                <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                  ₹{offer.originalPrice}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                Save ₹{offer.savings}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => openWhatsApp(getOfferInquiryMessage(offer.title, offer.offerPrice))}
              className="py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-whatsapp-glow cursor-pointer transform hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span className="whitespace-nowrap">Claim on WhatsApp</span>
            </button>

            <button
              onClick={() => onBookOffer(offer)}
              className="py-3 px-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-gold-glow transition-all cursor-pointer transform hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span className="whitespace-nowrap">Book Combo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
