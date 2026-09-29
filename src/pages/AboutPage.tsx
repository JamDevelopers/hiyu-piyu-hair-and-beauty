import React from 'react';
import { ShieldCheck, Heart, Sparkles, Award, Calendar, MessageCircle } from 'lucide-react';
import { settings } from '../data/settings';
import { openWhatsApp, getGeneralInquiryMessage } from '../utils/whatsapp';

interface AboutPageProps {
  onNavigateToBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToBooking }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D8AA55] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D8AA55]" />
          <span>Our Story & Philosophy</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#261316] tracking-tight">
          About Hiyupiyu Hair & Beauty
        </h1>
        <p className="font-serif text-2xl text-[#5B071B] italic font-semibold">
          {settings.gujaratiTagline}
        </p>
      </div>

      {/* Main Story Box with Warm Photo Accent */}
      <div className="bg-white rounded-3xl border-2 border-[#D8AA55]/40 p-6 sm:p-10 shadow-luxury-card space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4 text-stone-700 text-sm leading-relaxed">
            <p>
              Welcome to <strong className="text-[#4A0718]">Hiyupiyu Hair & Beauty</strong> (હિયુપીયુ હેર એન્ડ બ્યુટી), a premier ladies-only mobile beauty business established in Surat by certified expert <strong className="text-[#4A0718]">Himanshi Patel</strong>.
            </p>
            <p>
              Himanshi Patel is an officially recognized <a href="https://womenclub.co.in/" target="_blank" rel="noopener noreferrer" className="text-[#8E1837] font-bold underline hover:text-[#4A0718]">Certified Member &amp; Working Member of Women Club (womenclub.co.in)</a>, upholding rigorous standards of professionalism, hygiene, and women empowerment in Surat's beauty and wellness sector.
            </p>
            <p>
              Our core mission is simple yet transformative: to bring the luxury, hygiene, and calming serenity of an elite salon directly to your doorstep. We recognize that modern women in Surat—whether managing busy careers, joint families, or young children—often find it exhausting to battle traffic and wait endlessly in crowded salons.
            </p>
            <p>
              With Hiyupiyu, your home becomes your private spa sanctuary. You relax comfortably in your own space while Himanshi delivers unhurried, meticulous, and deeply soothing treatments.
            </p>
            {/* Women Club Highlight Box */}
            <div className="p-4 rounded-2xl bg-[#FFF7E9] border border-[#D5AA63]/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4A0718] text-[#E9CB8A] flex items-center justify-center font-bold text-sm shrink-0 border border-[#D5AA63]/50">
                  <Award className="w-5 h-5 text-[#D5AA63]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-stone-900 text-sm">
                      Women Club Certified Member
                    </span>
                  </div>
                  <span className="text-xs text-stone-600 block mt-0.5">
                    Official accreditation at <strong className="text-[#4A0718]">womenclub.co.in</strong>
                  </span>
                </div>
              </div>
              <a
                href="https://womenclub.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#4A0718] hover:bg-[#650A20] text-white text-xs font-bold rounded-xl whitespace-nowrap transition-colors shadow-xs"
              >
                Visit Club ↗
              </a>
            </div>
          </div>

          <div className="md:col-span-5 rounded-2xl overflow-hidden shadow-xl border-2 border-[#D8AA55]/40">
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
              alt="Serene beauty care at home"
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>
        </div>

        {/* The 4 Pillar Trust System */}
        <div className="pt-6 border-t border-stone-100">
          <h3 className="font-serif text-2xl font-bold text-[#261316] mb-4">
            Our 4 Trust Promises
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FFF9ED] border border-[#D8AA55]/40 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-[#261316] font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>1. Strictly Ladies Only</span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed">
                Services are performed exclusively for women by female specialist Himanshi Patel, providing peace of mind, modesty, and complete comfort.
              </p>
            </div>

            <div className="p-4 bg-[#FFF9ED] border border-[#D8AA55]/40 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-[#261316] font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#D8AA55]" />
                <span>2. Hospital-Grade Cleanliness</span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed">
                Fresh disposable sheets, sanitized stainless steel tools, and spotless post-treatment cleanup leaving your home spotless.
              </p>
            </div>

            <div className="p-4 bg-[#FFF9ED] border border-[#D8AA55]/40 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-[#261316] font-bold text-sm">
                <Award className="w-4 h-4 text-[#5B071B]" />
                <span>3. Authentic Branded Products</span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed">
                Zero duplicates or cheap substitutes. We strictly use genuine O3+, Lotus Herbals, L'Oréal Paris, and Ayurvedic botanical extracts.
              </p>
            </div>

            <div className="p-4 bg-[#FFF9ED] border border-[#D8AA55]/40 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-[#261316] font-bold text-sm">
                <Heart className="w-4 h-4 text-[#5B071B]" />
                <span>4. Genuine Care & No Rush</span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed">
                We never rush through a massage or facial. Every minute of your selected session is dedicated to your complete relaxation and satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* Coverage statement */}
        <div className="p-4 bg-[#FFF9ED] rounded-2xl border border-[#D8AA55]/50 text-xs text-stone-700">
          <strong className="text-[#5B071B] font-bold">Surat Service Area:</strong> Vesu, Adajan, Pal, Althan, Citylight, Piplod, VIP Road, Ghod Dod Road, Varachha, Katargam, Rander, Dumas Road, and Athwa Lines.
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-[#261316]">
          Ready to experience the Hiyupiyu difference?
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onNavigateToBooking}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D8AA55] via-[#F1D79A] to-[#D8AA55] hover:brightness-105 text-[#261316] rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-gold-glow transition-all"
          >
            <Calendar className="w-4 h-4 text-[#261316]" />
            <span>Book Home Appointment</span>
          </button>
          <button
            onClick={() => openWhatsApp(getGeneralInquiryMessage())}
            className="w-full sm:w-auto px-7 py-4 bg-white border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp Himanshi Directly</span>
          </button>
        </div>
      </div>
    </div>
  );
};
