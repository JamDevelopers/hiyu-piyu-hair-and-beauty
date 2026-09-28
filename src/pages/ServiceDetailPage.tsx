import React from 'react';
import { ArrowLeft, Clock, Check, MessageCircle, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { Service } from '../data/services';
import { ServiceVisual } from '../components/ServiceVisual';
import { openWhatsApp, getServiceInquiryMessage } from '../utils/whatsapp';

interface ServiceDetailPageProps {
  service: Service;
  onBack: () => void;
  onBook: (service: Service) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBack,
  onBook
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-in fade-in duration-200">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-[#5B071B] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Services Catalog</span>
      </button>

      {/* Main Detail Container */}
      <div className="bg-white rounded-3xl border-2 border-[#D8AA55]/40 shadow-luxury-card overflow-hidden">
        {/* Visual Banner */}
        <ServiceVisual
          theme={service.visualTheme}
          badge={service.popularTag}
          imageUrl={service.imageUrl}
          title={service.name}
          heightClass="h-72 sm:h-96"
        />

        <div className="p-6 sm:p-10 space-y-8">
          {/* Header Info */}
          <div className="space-y-3 pb-6 border-b border-[#D8AA55]/20">
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <span className="text-[#5B071B] font-bold">{service.category}</span>
              <span aria-hidden="true" className="text-[#D8AA55]/50">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#D8AA55]" />
                <span className="tabular-nums">{service.duration} mins session</span>
              </span>
              <span aria-hidden="true" className="text-[#D8AA55]/50">·</span>
              <span>Surat Doorstep Service</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#261316] tracking-tight leading-tight">
              {service.name}
            </h1>

            {service.gujaratiName && (
              <p className="font-serif text-xl text-[#5B071B] italic font-semibold">
                {service.gujaratiName}
              </p>
            )}

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-bold text-[#5B071B] font-mono tabular-nums">
                ₹{service.price}
              </span>
              {service.originalPrice && service.originalPrice > service.price && (
                <span className="text-base text-stone-400 line-through font-mono tabular-nums">
                  ₹{service.originalPrice}
                </span>
              )}
              <span className="text-xs text-stone-500 font-normal">
                (Inclusive of all products & single-use disposable supplies)
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#261316]">
              About This Treatment
            </h2>
            <p className="text-stone-700 text-sm leading-relaxed">
              {service.description}
            </p>
            {service.gujaratiDescription && (
              <p className="text-stone-700 text-xs italic bg-[#FFF9ED] p-4 rounded-2xl border border-[#D8AA55]/40 font-medium">
                {service.gujaratiDescription}
              </p>
            )}
          </div>

          {/* What's Included */}
          {service.includes && service.includes.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#261316]">
                Step-by-Step Protocol Included
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {service.includes.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#5B071B]/10 text-[#5B071B] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expected Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#261316]">
                Key Beauty & Wellness Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs sm:text-sm text-stone-700">
                    <Check className="w-4 h-4 text-[#D8AA55] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hygiene Assurance */}
          <div className="p-4 bg-[#FFF9ED] border border-[#D8AA55]/40 rounded-2xl flex items-center gap-3 text-xs text-stone-700">
            <ShieldCheck className="w-5 h-5 text-[#5B071B] shrink-0" />
            <span>
              <strong>Hygiene Guarantee:</strong> Fresh disposable bed sheets, sterile sealed kits, and non-toxic skin-tested cosmetics used for every home appointment in Surat.
            </span>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onBook(service)}
              className="flex-1 py-4 bg-gradient-to-r from-[#D8AA55] via-[#F1D79A] to-[#D8AA55] hover:brightness-105 text-[#261316] font-bold text-sm uppercase tracking-wider rounded-2xl shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer transition-transform transform active:scale-98"
            >
              <Calendar className="w-4 h-4 text-[#261316]" />
              <span>Book Appointment For ₹{service.price}</span>
            </button>

            <button
              onClick={() => openWhatsApp(getServiceInquiryMessage(service.name, service.price))}
              className="py-4 px-6 border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 font-bold text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
