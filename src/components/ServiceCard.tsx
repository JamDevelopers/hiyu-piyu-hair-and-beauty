import React from 'react';
import { MessageCircle, Clock, Calendar, ChevronRight, Check } from 'lucide-react';
import { Service } from '../data/services';
import { ServiceVisual } from './ServiceVisual';
import { openWhatsApp, getServiceInquiryMessage } from '../utils/whatsapp';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
  onViewDetails: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onBook,
  onViewDetails
}) => {
  return (
    <div className="group bg-white rounded-2xl border-2 border-amber-200/70 shadow-[0_6px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_35px_rgba(245,158,11,0.15)] transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1.5 hover:border-amber-400">
      {/* Visual Header with authentic photo */}
      <div
        className="cursor-pointer overflow-hidden relative"
        onClick={() => onViewDetails(service)}
      >
        <ServiceVisual
          theme={service.visualTheme}
          badge={service.popularTag}
          imageUrl={service.imageUrl}
          title={service.name}
          heightClass="h-48"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Unboxed Metadata with Typographic Separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 font-medium">
            <span className="text-[#5B071B] font-bold">{service.category}</span>
            <span aria-hidden="true" className="text-[#D8AA55]/50">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D8AA55]" />
              <span className="tabular-nums">{service.duration} mins</span>
            </span>
            <span aria-hidden="true" className="text-[#D8AA55]/50">·</span>
            <span>Surat Home Visit</span>
          </div>

          {/* Titles */}
          <button
            onClick={() => onViewDetails(service)}
            className="text-left group-hover:text-[#5B071B] transition-colors w-full cursor-pointer"
          >
            <h3 className="font-serif text-xl font-bold text-[#261316] tracking-tight leading-snug">
              {service.name}
            </h3>
            {service.gujaratiName && (
              <p className="font-serif text-xs text-[#D8AA55] italic mt-0.5 font-semibold">
                {service.gujaratiName}
              </p>
            )}
          </button>

          {/* Description snippet */}
          <p className="text-stone-600 text-xs mt-2.5 line-clamp-2 leading-relaxed">
            {service.description}
          </p>

          {/* Key Benefits */}
          <ul className="mt-3 space-y-1 text-[11px] text-stone-600">
            {service.benefits.slice(0, 2).map((benefit, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <Check className="w-3 h-3 text-[#D8AA55] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-4 mt-4 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-3.5">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-medium">Fee</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#5B071B] font-mono tabular-nums">
                  ₹{service.price}
                </span>
                {service.originalPrice && service.originalPrice > service.price && (
                  <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                    ₹{service.originalPrice}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => onViewDetails(service)}
              className="text-xs text-[#5B071B] hover:text-[#3A0612] font-bold flex items-center gap-0.5 cursor-pointer"
            >
              <span>View Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => openWhatsApp(getServiceInquiryMessage(service.name, service.price))}
              className="py-2.5 px-2 rounded-xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Inquire on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="whitespace-nowrap truncate">Enquire</span>
            </button>

            <button
              onClick={() => onBook(service)}
              className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-[#261316] text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 hover:brightness-105 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#261316] shrink-0" />
              <span className="whitespace-nowrap truncate">Book Slot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
