import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { settings } from '../data/settings';
import { openWhatsApp, callBusiness } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryArea, setInquiryArea] = useState(settings.coverageAreas[0]);
  const [inquiryMessage, setInquiryMessage] = useState('');

  const handleSendWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hello Hiyupiyu Hair & Beauty,

Name: ${inquiryName.trim() || 'Valued Client'}
Surat Area: ${inquiryArea}

Message / Inquiry:
${inquiryMessage.trim() || 'I want to inquire about available appointment slots and beauty treatments.'}

Thank you!`;
    openWhatsApp(formatted);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#D8AA55] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D8AA55]" />
          <span>Get in Touch</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#261316] tracking-tight">
          Contact & Inquiries
        </h1>
        <p className="font-serif text-xl text-[#5B071B] italic font-semibold">
          તમારી સુંદરતા... અમારી જવાબદારી
        </p>
        <p className="text-stone-600 text-xs sm:text-sm">
          Reach Himanshi Patel directly via WhatsApp or phone call for consultations, queries, and appointment bookings in Surat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border-2 border-[#D8AA55]/40 p-6 shadow-luxury-card space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B071B] block">
              Direct Contact
            </span>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 block font-medium">WhatsApp (Fastest Response)</span>
                  <button
                    onClick={() => openWhatsApp('Hello Hiyupiyu Hair & Beauty, I would like to inquire about services.')}
                    className="font-mono text-base font-bold text-emerald-800 hover:underline cursor-pointer"
                  >
                    +91 94266 86048
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF9ED] border border-[#D8AA55]/40 text-[#5B071B] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 block font-medium">Direct Phone Call</span>
                  <button
                    onClick={() => callBusiness()}
                    className="font-mono text-base font-bold text-[#5B071B] hover:underline cursor-pointer"
                  >
                    +91 94266 86048
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border-2 border-[#D8AA55]/40 p-6 shadow-luxury-card space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B071B] block">
              Business Hours & Location
            </span>
            <div className="space-y-2.5 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D8AA55]" />
                <span className="text-stone-900 font-semibold">{settings.timing}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D8AA55] shrink-0 mt-0.5" />
                <span>Doorstep Home Service across Surat, Gujarat</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Exclusively for Ladies</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#FFF9ED] rounded-2xl border border-[#D8AA55]/40 text-xs text-stone-700 space-y-1">
            <span className="font-bold text-[#5B071B] block">
              Direct Client-Side WhatsApp Dispatch:
            </span>
            <p>
              When you send an inquiry, your message opens directly in WhatsApp for end-to-end encrypted, immediate communication with Himanshi.
            </p>
          </div>
        </div>

        {/* WhatsApp Direct Message Composer */}
        <div className="bg-white rounded-3xl border-2 border-[#D8AA55]/40 p-6 sm:p-8 shadow-luxury-card">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D8AA55]">
              Instant WhatsApp Message
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#261316] mt-1">
              Send an Inquiry
            </h3>
            <p className="text-stone-600 text-xs mt-1">
              Compose your question below to send directly to 94266 86048.
            </p>
          </div>

          <form onSubmit={handleSendWhatsAppInquiry} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Priyal Shah"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D8AA55]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-stone-700">
                  Surat Locality
                </label>
                <span className="text-[11px] text-stone-500">
                  Selected: <strong className="text-[#4A0718]">{inquiryArea}</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1 bg-stone-50 rounded-2xl border border-stone-200">
                {settings.coverageAreas.map((area) => {
                  const isSelected = inquiryArea === area;
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setInquiryArea(area)}
                      className={`p-2 rounded-xl text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between gap-1 ${
                        isSelected
                          ? 'bg-[#4A0718] text-[#E9CB8A] shadow-xs font-bold'
                          : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
                      }`}
                    >
                      <span className="truncate">{area}</span>
                      {isSelected && <span className="text-[10px] text-[#E9CB8A]">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Inquiry or Question
              </label>
              <textarea
                rows={4}
                placeholder="e.g. Which facial is best for sensitive skin? Do you have availability this Saturday afternoon?"
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D8AA55]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send via WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
