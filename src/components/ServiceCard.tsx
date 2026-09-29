import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Clock, Calendar, ArrowUpRight, Check } from 'lucide-react';
import { Service } from '../data/services';
import { openWhatsApp, getServiceInquiryMessage } from '../utils/whatsapp';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
  onViewDetails: (service: Service) => void;
  variant?: 'featured' | 'standard';
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onBook,
  onViewDetails,
  variant = 'standard'
}) => {
  const isFeatured = variant === 'featured';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-[#FEFCF7] rounded-3xl border border-[#D5AA63]/30 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(74,7,24,0.12)] hover:border-[#D5AA63]/70 ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Top subtle jewelry gold accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D5AA63] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Visual Image Header */}
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(service)}
      >
        <div className={`w-full overflow-hidden ${isFeatured ? 'h-64 sm:h-72' : 'h-52 sm:h-60'}`}>
          <img
            src={service.imageUrl}
            alt={service.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#241316]/75 via-transparent to-transparent pointer-events-none" />

        {/* Category & Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase bg-white/95 text-[#4A0718] border border-[#D5AA63]/40 shadow-sm backdrop-blur-xs">
            {service.category}
          </span>
          {service.popularTag && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#4A0718]/90 text-[#E9CB8A] border border-[#D5AA63]/40 shadow-sm backdrop-blur-xs">
              {service.popularTag}
            </span>
          )}
        </div>

        {/* Duration badge on image bottom */}
        <div className="absolute bottom-3 right-4 text-white/90 text-xs font-medium flex items-center gap-1.5 z-10">
          <Clock className="w-3.5 h-3.5 text-[#E9CB8A]" />
          <span>{service.duration} mins</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Title with Gujarati support */}
          <div
            onClick={() => onViewDetails(service)}
            className="cursor-pointer group/title"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241316] group-hover/title:text-[#4A0718] transition-colors leading-tight">
                {service.name}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-[#D5AA63] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
            </div>

            {service.gujaratiName && (
              <p className="font-serif text-xs text-[#8E1837] italic font-semibold mt-1">
                {service.gujaratiName}
              </p>
            )}
          </div>

          <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-2">
            {service.description}
          </p>

          {/* Minimal Key Benefits (breathing room) */}
          <div className="mt-4 space-y-1.5">
            {service.benefits.slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                <Check className="w-3.5 h-3.5 text-[#D5AA63] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Focused CTAs */}
        <div className="pt-6 mt-6 border-t border-[#D5AA63]/15">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold block">Home Visit Fee</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-[#4A0718]">
                  ₹{service.price}
                </span>
                {service.originalPrice && service.originalPrice > service.price && (
                  <span className="text-xs text-stone-400 line-through">
                    ₹{service.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onViewDetails(service)}
              className="text-xs font-semibold text-[#8E1837] hover:text-[#4A0718] transition-colors cursor-pointer"
            >
              Details &amp; Steps →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => openWhatsApp(getServiceInquiryMessage(service.name, service.price))}
              className="py-2.5 px-3 rounded-xl border border-[#D5AA63]/50 hover:border-[#D5AA63] text-stone-800 hover:text-[#4A0718] hover:bg-[#FFF7E9] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Enquire</span>
            </button>

            <button
              onClick={() => onBook(service)}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D5AA63] via-[#E9CB8A] to-[#D5AA63] hover:brightness-105 text-[#241316] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(213,170,99,0.25)] transition-all cursor-pointer transform hover:scale-[1.02] active:scale-98"
            >
              <Calendar className="w-3.5 h-3.5 text-[#241316]" />
              <span>Book Slot</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
