import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Home, Award, Calendar, MessageCircle, Phone, Clock, ArrowRight, Check, Star, ChevronDown, ChevronUp, MapPin, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { settings } from '../data/settings';
import { services, Service } from '../data/services';
import { offers, Offer } from '../data/offers';
import { reviews } from '../data/reviews';
import { faqs } from '../data/faqs';
import { galleryItems } from '../data/gallery';
import { ServiceCard } from '../components/ServiceCard';
import { OfferCard } from '../components/OfferCard';
import { ServiceVisual } from '../components/ServiceVisual';
import { openWhatsApp, callBusiness, getGeneralInquiryMessage, getServiceInquiryMessage } from '../utils/whatsapp';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onBookService: (service: Service) => void;
  onBookOffer: (offer: Offer) => void;
  onViewService: (service: Service) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onBookService,
  onBookOffer,
  onViewService
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [activeGalleryModal, setActiveGalleryModal] = useState<any | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const featuredServices = services.filter((s) => s.featured).slice(0, 4);
  const chakraService = services.find((s) => s.id === '7-chakra-facial') || services[0];

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 bg-white">
      {/* 1. HERO SECTION: Full-Screen Luminous Luxury Beauty Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-amber-50/30 to-amber-50/15 text-[#261316] pt-8 pb-14 sm:pt-14 sm:pb-20 border-b border-amber-200/50">
        {/* Subtle Decorative Golden Aura Mesh */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(245,158,11,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[radial-gradient(circle,rgba(251,191,36,0.2),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-[#5B071B] text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>LADIES ONLY • HOME SERVICE • SURAT</span>
              </div>

              {/* Large Heading */}
              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#2B040D] leading-[1.08] text-balance">
                  Your Beauty,
                  <br />
                  <span className="text-[#8E1434] font-bold italic drop-shadow-xs">
                    Our Responsibility
                  </span>
                </h1>
                <p className="font-serif text-2xl sm:text-3xl text-[#8E1434] italic font-semibold">
                  તમારી સુંદરતા... અમારી જવાબદારી
                </p>
              </div>

              {/* Supporting Text */}
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Premium Hair & Beauty Services at Your Doorstep in Surat. Enjoy unhurried, hygienic, and deeply relaxing salon rituals from certified expert Himanshi Patel in complete home privacy.
              </p>

              {/* High-Conversion CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('book')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-105 text-[#261316] rounded-2xl text-sm font-bold uppercase tracking-wider shadow-[0_10px_25px_rgba(245,158,11,0.35)] transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:scale-[1.02]"
                >
                  <Calendar className="w-4 h-4 text-[#261316]" />
                  <span>Book Appointment</span>
                </button>

                <button
                  onClick={() => openWhatsApp(getGeneralInquiryMessage())}
                  className="w-full sm:w-auto px-7 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(16,185,129,0.25)] transition-all cursor-pointer transform hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>WhatsApp Inquiry (94266 86048)</span>
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-amber-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-stone-800 font-semibold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5B071B]" />
                  <span>100% Ladies Only & Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Disposable Sterile Supplies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-[#5B071B]" />
                  <span>Direct Doorstep in Surat</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual inspired by poster */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-300 shadow-[0_15px_45px_rgba(0,0,0,0.1)] p-2.5 bg-white group">
                <div className="relative rounded-2xl overflow-hidden h-[420px] sm:h-[480px]">
                  <img
                    src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1000&q=80"
                    alt="Radiant Indian woman enjoying relaxing beauty treatment"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gentle warm vignette scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#261316]/85 via-[#261316]/20 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-300 text-xs font-bold text-[#5B071B] flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Hiyupiyu Hair & Beauty</span>
                  </div>

                  {/* Bottom Editorial Caption */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#F1D79A]">
                      Signature Luxury Treatment
                    </span>
                    <h3 className="font-serif text-2xl font-bold leading-tight mt-1 text-white">
                      7 Chakra Facial & Stone Eye Mask
                    </h3>
                    <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                      Aura balancing gemstones, acoustic Tibetan sound therapy & pure gold radiance.
                    </p>
                    <div className="mt-3.5 flex items-center justify-between border-t border-white/20 pt-2.5 text-xs">
                      <span className="font-mono font-bold text-[#F1D79A] text-base">₹1,500</span>
                      <button
                        onClick={() => onNavigate('book')}
                        className="text-white hover:text-[#F1D79A] font-bold flex items-center gap-1 cursor-pointer transition-colors uppercase tracking-wider text-[11px]"
                      >
                        <span>Book Slot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND INTRO SECTION with 4 Trust Cards & Gujarati subtext */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D8AA55] font-bold">
            The Hiyupiyu Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#261316]">
            Beauty, Care & Comfort — At Your Doorstep
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Hiyupiyu Hair & Beauty brings the peaceful ambiance and professional precision of a high-end salon directly into your living room. Led by Himanshi Patel, every treatment is tailored for your relaxation and beauty.
          </p>
        </div>

        {/* 4 Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border-2 border-amber-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_35px_rgb(245,158,11,0.15)] hover:border-amber-400 transition-all space-y-3 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center text-[#5B071B]">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#261316]">
                CLEANLINESS
              </h3>
              <p className="text-xs text-[#5B071B] font-semibold font-serif italic mt-0.5">
                "સ્વચ્છતા અમારી પહેલી પ્રાથમિકતા"
              </p>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              Fresh disposable sheets, sanitized stainless steel tools, and hospital-grade hygienic protocols for every client.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border-2 border-amber-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_35px_rgb(245,158,11,0.15)] hover:border-amber-400 transition-all space-y-3 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center text-[#5B071B]">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#261316]">
                QUALITY SERVICE
              </h3>
              <p className="text-xs text-[#5B071B] font-semibold font-serif italic mt-0.5">
                "ઉત્તમ ગુણવત્તાની પ્રીમિયમ સર્વિસ"
              </p>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              Genuine branded products from O3+, Lotus Herbal, L'Oréal Paris, and Ayurvedic botanical formulations.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border-2 border-amber-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_35px_rgb(245,158,11,0.15)] hover:border-amber-400 transition-all space-y-3 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center text-[#5B071B]">
              <Heart className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#261316]">
                TRUST & CARE
              </h3>
              <p className="text-xs text-[#5B071B] font-semibold font-serif italic mt-0.5">
                "વિશ્વાસ, કાળજી અને સંતોષ"
              </p>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              Unhurried, respectful service where your personal comfort, skin sensitivity, and satisfaction come first.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border-2 border-amber-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_35px_rgb(245,158,11,0.15)] hover:border-amber-400 transition-all space-y-3 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center text-[#5B071B]">
              <Home className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#261316]">
                HOME SERVICE
              </h3>
              <p className="text-xs text-[#5B071B] font-semibold font-serif italic mt-0.5">
                "તમારા ઘરે સૌંદર્ય સંભાળ"
              </p>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              No traffic jams, no salon waiting rooms. Relax in your personal space while we pamper you at home in Surat.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3 Visual Steps with Connecting Lines) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E5] to-[#FDF0DF] text-[#261316] rounded-3xl p-8 sm:p-12 shadow-luxury-card relative overflow-hidden border-2 border-[#D8AA55]/40">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#5B071B] font-bold">
              Seamless 3-Step Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#261316]">
              How Doorstep Beauty Works
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              Simple, transparent booking via WhatsApp without passwords or advance payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center space-y-3 relative p-6 bg-white/90 rounded-2xl border border-[#D8AA55]/40 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#D8AA55] to-[#F1D79A] text-[#261316] font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-gold-glow">
                01
              </div>
              <h3 className="font-serif text-xl font-bold text-[#5B071B]">
                Choose Your Service
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Select your preferred facial, hair treatment, body polish, or festive combo bundle from our catalog.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-3 relative p-6 bg-white/90 rounded-2xl border border-[#D8AA55]/40 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#D8AA55] to-[#F1D79A] text-[#261316] font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-gold-glow">
                02
              </div>
              <h3 className="font-serif text-xl font-bold text-[#5B071B]">
                Choose Preferred Time
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Pick your convenient date and preferred time slot for your home in Surat.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-3 relative p-6 bg-white/90 rounded-2xl border border-[#D8AA55]/40 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#D8AA55] to-[#F1D79A] text-[#261316] font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-gold-glow">
                03
              </div>
              <h3 className="font-serif text-xl font-bold text-[#5B071B]">
                Confirm Through WhatsApp
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Our site pre-formats your appointment details directly for WhatsApp. Himanshi verifies schedule and confirms!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION: Our Signature Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 border-b border-[#D8AA55]/20 pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#D8AA55] font-bold">
              Our Signature Services
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#261316] mt-1">
              Popular Home Beauty Services
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Premium beauty services designed around your comfort in Surat.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-bold uppercase tracking-wider text-[#5B071B] hover:text-[#3A0612] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Explore All 15 Services</span>
            <ArrowRight className="w-4 h-4 text-[#D8AA55]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={onBookService}
              onViewDetails={onViewService}
            />
          ))}
        </div>
      </section>

      {/* 5. FEATURED SERVICE: Large Editorial Feature for "7 Chakra Facial" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border-2 border-[#D8AA55]/40 shadow-luxury-hover p-6 sm:p-12 relative overflow-hidden">
          {/* Subtle Corner Gold Ornaments */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D8AA55]/20 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Large Beauty Image */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-2xl border border-[#D8AA55]/30 relative group">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
                alt="7 Chakra Facial therapy and natural spa"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#5B071B]/95 text-[#F1D79A] text-xs font-bold px-3 py-1 rounded-full border border-[#D8AA55] shadow">
                Signature Masterpiece
              </div>
            </div>

            {/* Right: Service Details */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D8AA55] font-bold">
                  Editorial Spotlight
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#261316]">
                  7 Chakra Facial
                </h3>
                <p className="font-serif text-xl text-[#5B071B] italic font-semibold">
                  7 ચક્રા ફેશિયલ • આયુર્વેદિક એન્ડ જેડ સ્ટોન કેર
                </p>
              </div>

              {/* Decorative Gold Line */}
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#D8AA55] to-transparent" />

              <p className="text-stone-700 text-sm leading-relaxed">
                Our signature luxury wellness ritual. Balances facial energy vortexes using organic gemstone extracts, botanical acupressure massage, cooling jade stone rollers, and Tibetan singing bowl resonance for profound inner serenity and luminous skin radiance.
              </p>

              {/* Pricing & Duration */}
              <div className="flex items-baseline gap-4 pt-1">
                <div>
                  <span className="text-xs text-stone-500 uppercase tracking-wider block">Treatment Fee</span>
                  <span className="font-mono text-3xl font-bold text-[#5B071B]">₹1,500</span>
                </div>
                <div className="border-l border-stone-300 pl-4">
                  <span className="text-xs text-stone-500 uppercase tracking-wider block">Duration</span>
                  <span className="text-sm font-semibold text-stone-800 flex items-center gap-1 mt-1">
                    <Clock className="w-3.5 h-3.5 text-[#D8AA55]" />
                    <span>75 minutes</span>
                  </span>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-stone-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D8AA55] shrink-0" />
                  <span>Deep vibrational tension release and calming aura balance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D8AA55] shrink-0" />
                  <span>Cooling jade & rose quartz gemstone lymphatic drainage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D8AA55] shrink-0" />
                  <span>Luminescent gold algae peel-off mask for lasting event glow</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => onBookService(chakraService)}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#D8AA55] via-[#F1D79A] to-[#D8AA55] text-[#261316] font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow cursor-pointer hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#261316]" />
                  <span>Book 7 Chakra Facial</span>
                </button>

                <button
                  onClick={() => openWhatsApp(getServiceInquiryMessage('7 Chakra Facial', 1500))}
                  className="px-6 py-3.5 border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Ask Himanshi on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SPECIAL OFFERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#D8AA55]/20 pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#D8AA55] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D8AA55]" />
              <span>Festive & Bridal Bundles</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#261316] mt-1">
              Special Offers
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Head-to-toe makeover packages with exclusive savings for women in Surat.
            </p>
          </div>

          <button
            onClick={() => onNavigate('offers')}
            className="text-xs font-bold uppercase tracking-wider text-[#5B071B] hover:text-[#3A0612] flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 text-[#D8AA55]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.slice(0, 2).map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onBookOffer={onBookOffer}
            />
          ))}
        </div>
      </section>

      {/* 7. LUXURIOUS TESTIMONIALS CAROUSEL */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D8AA55] font-bold">
            Client Words
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#261316]">
            Loved by Women in Surat
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            Real feedback from clients in Vesu, Adajan, Pal, Althan, and Citylight.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#D8AA55]/30 p-8 sm:p-12 shadow-luxury-card relative overflow-hidden">
          {/* Subtle Quote Symbol Backing */}
          <div className="absolute top-4 right-8 text-8xl font-serif text-[#D8AA55]/15 select-none pointer-events-none">
            “
          </div>

          <div className="relative z-10 space-y-6 text-center">
            {/* Star Rating */}
            <div className="flex items-center justify-center gap-1 text-[#D8AA55]">
              {[...Array(reviews[testimonialIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D8AA55]" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="font-serif text-xl sm:text-2xl text-stone-800 italic leading-relaxed max-w-2xl mx-auto">
              "{reviews[testimonialIndex].comment}"
            </p>

            {/* Author */}
            <div className="pt-2">
              <h4 className="font-bold text-stone-900 text-base">
                {reviews[testimonialIndex].name}
              </h4>
              <p className="text-xs text-[#D8AA55] font-medium font-mono mt-0.5">
                {reviews[testimonialIndex].area} • Service: {reviews[testimonialIndex].serviceTaken}
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-[#D8AA55]/40 hover:bg-[#5B071B] hover:text-white text-stone-700 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1.5">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      testimonialIndex === i ? 'w-6 bg-[#5B071B]' : 'w-2 bg-stone-300'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-[#D8AA55]/40 hover:bg-[#5B071B] hover:text-white text-stone-700 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#D8AA55]/20 pb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#D8AA55] font-bold">
              Visual Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#261316] mt-1">
              Treatment & Hygiene Gallery
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Clean setups, sanitized equipment, and glowing hair and skin results.
            </p>
          </div>

          <button
            onClick={() => onNavigate('gallery')}
            className="text-xs font-bold uppercase tracking-wider text-[#5B071B] hover:text-[#3A0612] flex items-center gap-1.5 cursor-pointer"
          >
            <span>Full Gallery</span>
            <ArrowRight className="w-4 h-4 text-[#D8AA55]" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveGalleryModal(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[#D8AA55]/30 shadow-luxury-card hover:shadow-luxury-hover transition-all bg-white"
            >
              <div className="h-44 sm:h-56 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-[#5B071B]/95 text-[#F1D79A] px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow">
                  {item.tag}
                </div>
              </div>
              <div className="p-3 bg-white text-left">
                <span className="text-[10px] uppercase font-bold text-[#D8AA55]">
                  {item.category}
                </span>
                <h4 className="font-serif text-sm font-bold text-[#261316] group-hover:text-[#5B071B] transition-colors line-clamp-1">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Lightbox Modal */}
        {activeGalleryModal && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setActiveGalleryModal(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 sm:p-8 space-y-4 border border-[#D8AA55]/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden shadow-inner">
                <img
                  src={activeGalleryModal.imageUrl}
                  alt={activeGalleryModal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-[#D8AA55]">
                  {activeGalleryModal.category} • {activeGalleryModal.tag}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#261316] mt-0.5">
                  {activeGalleryModal.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  {activeGalleryModal.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setActiveGalleryModal(null);
                    onNavigate('book');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#D8AA55] to-[#F1D79A] text-[#261316] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
                >
                  Book Treatment
                </button>
                <button
                  onClick={() => setActiveGalleryModal(null)}
                  className="px-4 py-2 text-stone-500 hover:text-stone-800 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 9. SERVICE AREA SECTION: Stylized Location Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white border-2 border-amber-300/70 rounded-3xl p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#5B071B] font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#5B071B]" />
                <span>Coverage Across Surat</span>
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#261316]">
                Home Service Available Across Surat, Gujarat
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Himanshi travels directly to your residential apartment or bungalow with sterilized kit, disposable sheets, and fresh products.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openWhatsApp(getGeneralInquiryMessage())}
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/25 transform hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Check Availability on WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="md:col-span-6 bg-amber-50/50 p-6 rounded-2xl border-2 border-amber-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B071B] block mb-3">
                Key Localities Covered:
              </span>
              <div className="flex flex-wrap gap-2">
                {settings.coverageAreas.map((area, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white text-stone-800 px-3 py-1.5 rounded-lg border border-amber-300 font-semibold shadow-xs hover:border-amber-400 hover:bg-amber-50 transition-all"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION: Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D8AA55] font-bold">
            Questions & Answers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#261316]">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            Everything you need to know about our ladies-only home salon visits.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#D8AA55]/30 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FFF9ED]/60 transition-colors"
                >
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#261316]">
                      {faq.question}
                    </h4>
                    {faq.gujaratiQuestion && (
                      <p className="font-serif text-xs text-[#D8AA55] italic mt-0.5 font-semibold">
                        {faq.gujaratiQuestion}
                      </p>
                    )}
                  </div>
                  <div className="text-stone-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#5B071B]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-[#D8AA55]/20 bg-[#FFF9ED]/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. FINAL CTA: Royal Festive Beauty Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <div className="bg-gradient-to-r from-[#6B0E23] via-[#7B142D] to-[#550618] text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden border-2 border-amber-400">
          {/* Ambient Warm Golden Aura */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(251,191,36,0.35),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(245,158,11,0.2),transparent_70%)] pointer-events-none" />

          <div className="space-y-3 max-w-2xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-amber-300/60 text-xs uppercase tracking-[0.2em] text-[#F1D79A] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{settings.gujaratiBrandName} • સુરત હોમ સર્વિસ</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Your Beauty Journey Starts at Home
            </h2>
            <p className="text-xl sm:text-2xl text-[#F1D79A] font-serif italic">
              તમારી સુંદરતા... અમારી જવાબદારી
            </p>
            <p className="text-stone-100 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed pt-1">
              Book your private appointment with Himanshi Patel today. Experience the perfect blend of cleanliness, authentic products, and soothing care in Surat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
            <button
              onClick={() => onNavigate('book')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-105 text-[#261316] rounded-2xl text-sm font-bold uppercase tracking-wider shadow-[0_10px_25px_rgba(245,158,11,0.35)] transition-transform active:scale-95 cursor-pointer"
            >
              Book Appointment
            </button>
            <button
              onClick={() => openWhatsApp(getGeneralInquiryMessage())}
              className="w-full sm:w-auto px-7 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(16,185,129,0.3)] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us · 94266 86048</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
