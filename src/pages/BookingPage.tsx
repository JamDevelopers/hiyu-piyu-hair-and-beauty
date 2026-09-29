import React from 'react';
import { BookingForm } from '../components/BookingForm';
import { ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { settings } from '../data/settings';
import { callBusiness } from '../utils/whatsapp';

interface BookingPageProps {
  initialServiceId?: string;
  initialPackageTitle?: string;
  initialPrice?: number;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialServiceId,
  initialPackageTitle,
  initialPrice
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#D8AA55] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D8AA55]" />
          <span>Doorstep Salon Reservation · Surat</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#261316] tracking-tight">
          Book Home Appointment
        </h1>
        <p className="font-serif text-xl text-[#5B071B] italic font-semibold">
          તમારી સુંદરતા... અમારી જવાબદારી
        </p>
        <p className="text-stone-600 text-xs sm:text-sm">
          Select your services and send your booking request directly to Himanshi Patel on WhatsApp.
        </p>
      </div>

      {/* Main Interactive Booking Funnel Component */}
      <BookingForm
        initialServiceId={initialServiceId}
        initialPackageTitle={initialPackageTitle}
        initialPrice={initialPrice}
      />

      {/* Women Club Credential Highlight */}
      <div className="p-4 bg-[#FFF7E9] rounded-2xl border border-[#D5AA63]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#4A0718] text-[#E9CB8A] flex items-center justify-center font-bold text-sm shrink-0 border border-[#D5AA63]/40">
            <ShieldCheck className="w-5 h-5 text-[#D5AA63]" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-serif font-bold text-stone-900 text-sm">
                Certified &amp; Working Member of Women Club
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                Verified
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Himanshi Patel holds official accreditation at <strong className="text-[#4A0718]">womenclub.co.in</strong> for verified excellence in doorstep beauty.
            </p>
          </div>
        </div>
        <a
          href="https://womenclub.co.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white hover:bg-stone-50 text-[#4A0718] text-xs font-bold rounded-xl border border-[#D5AA63]/60 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
        >
          Verify at womenclub.co.in ↗
        </a>
      </div>

      {/* Trust & Policy Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-5 bg-white rounded-3xl border-2 border-[#D8AA55]/30 shadow-luxury-card text-left space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#261316]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Strictly Ladies Only</span>
          </div>
          <p className="text-stone-600 text-xs leading-relaxed">
            Delivered directly by female specialist Himanshi Patel in complete home privacy.
          </p>
        </div>

        <div className="p-5 bg-white rounded-3xl border-2 border-[#D8AA55]/30 shadow-luxury-card text-left space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#261316]">
            <Sparkles className="w-4 h-4 text-[#D8AA55]" />
            <span>Hospital-Grade Hygiene</span>
          </div>
          <p className="text-stone-600 text-xs leading-relaxed">
            Disposable single-use sheets, sanitized implements, and fresh sealed products.
          </p>
        </div>

        <div className="p-5 bg-white rounded-3xl border-2 border-[#D8AA55]/30 shadow-luxury-card text-left space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#261316]">
            <MapPin className="w-4 h-4 text-[#5B071B]" />
            <span>No Advance Payment</span>
          </div>
          <p className="text-stone-600 text-xs leading-relaxed">
            Pay safely via Google Pay, PhonePe, Paytm, or Cash after your service is completed.
          </p>
        </div>
      </div>

      {/* Urgent slot inquiry */}
      <div className="text-center pt-2">
        <p className="text-xs text-stone-500">
          Need an urgent same-day appointment in Surat? Call directly:{' '}
          <button
            onClick={() => callBusiness()}
            className="text-[#5B071B] hover:underline font-mono font-bold cursor-pointer"
          >
            {settings.phone}
          </button>
        </p>
      </div>
    </div>
  );
};
