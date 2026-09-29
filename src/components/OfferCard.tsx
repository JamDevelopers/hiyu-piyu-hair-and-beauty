import React, { useState } from 'react';
import { motion } from 'motion/react';
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-[#FEFCF7] rounded-3xl border ${
        offer.popular
          ? 'border-[#D5AA63] shadow-[0_20px_45px_-15px_rgba(213,170,99,0.25)] ring-1 ring-[#D5AA63]/30'
          : 'border-[#D5AA63]/30 shadow-[0_15px_35px_-15px_rgba(74,7,24,0.08)]'
      } flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-15px_rgba(74,7,24,0.15)]`}
    >
      {/* Top subtle jewelry gold line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D5AA63] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Large Editorial Visual Header */}
      {offer.imageUrl && (
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
          <img
            src={offer.imageUrl}
            alt={offer.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241316]/80 via-[#241316]/20 to-transparent" />

          {/* Top Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#241316] flex items-center gap-1.5 bg-gradient-to-r from-[#D5AA63] via-[#E9CB8A] to-[#D5AA63] px-3.5 py-1.5 rounded-full shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#241316]" />
              <span>{offer.badge}</span>
            </span>
          </div>

          {/* Validity & Savings Pill */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs z-10">
            <span className="text-[11px] text-[#E9CB8A] bg-[#241316]/80 backdrop-blur-xs px-3 py-1 rounded-full border border-[#D5AA63]/40">
              Valid: {offer.validUntil}
            </span>
            <span className="text-xs font-bold text-white bg-emerald-700/90 backdrop-blur-xs px-3 py-1 rounded-full border border-emerald-400/40">
              Save ₹{offer.savings}
            </span>
          </div>
        </div>
      )}

      {/* Card Content Body */}
      <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241316] leading-tight">
            {offer.title}
          </h3>
          {offer.gujaratiTitle && (
            <p className="font-serif text-sm text-[#8E1837] italic mt-1 font-semibold">
              {offer.gujaratiTitle}
            </p>
          )}

          <p className="text-stone-500 text-xs italic font-serif mt-2">
            "{offer.tagline}"
          </p>

          <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">
            {offer.description}
          </p>

          {/* Promo Code Badge */}
          <div className="mt-5 p-3.5 rounded-2xl bg-[#FFF7E9] border border-[#D5AA63]/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Tag className="w-4 h-4 text-[#4A0718]" />
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block">Promo Code</span>
                <span className="font-mono text-sm font-bold text-[#4A0718] tracking-wider">{sampleCode}</span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-semibold text-[#4A0718] hover:bg-[#D5AA63]/20 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D5AA63]" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Included Services List */}
          <div className="mt-5 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.18em] text-stone-400 font-semibold block">Included in Package</span>
            <div className="space-y-1.5">
              {offer.includedServices.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-3.5 h-3.5 text-[#D5AA63] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-6 mt-6 border-t border-[#D5AA63]/20">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold block">All-Inclusive Bundle</span>
              <div className="flex items-baseline gap-2.5">
                <span className="font-serif text-3xl font-bold text-[#4A0718]">
                  ₹{offer.offerPrice}
                </span>
                <span className="text-sm text-stone-400 line-through">
                  ₹{offer.originalPrice}
                </span>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ₹{offer.savings} OFF
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => openWhatsApp(getOfferInquiryMessage(offer.title, offer.offerPrice))}
              className="py-3 px-3 rounded-xl border border-[#D5AA63]/50 hover:border-[#D5AA63] text-stone-800 hover:text-[#4A0718] hover:bg-[#FFF7E9] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => onBookOffer(offer)}
              className="py-3 px-3 rounded-xl bg-gradient-to-r from-[#D5AA63] via-[#E9CB8A] to-[#D5AA63] hover:brightness-105 text-[#241316] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(213,170,99,0.3)] transition-all cursor-pointer transform hover:scale-[1.02] active:scale-98"
            >
              <Calendar className="w-4 h-4 text-[#241316]" />
              <span>Book Bundle</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
