import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  Home,
  Award,
  Calendar,
  MessageCircle,
  Phone,
  Clock,
  ArrowRight,
  Check,
  Star,
  ChevronDown,
  ChevronUp,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Heart,
  Droplets,
  ArrowUpRight
} from 'lucide-react';
import { settings } from '../data/settings';
import { services, Service } from '../data/services';
import { offers, Offer } from '../data/offers';
import { reviews } from '../data/reviews';
import { faqs } from '../data/faqs';
import { galleryItems } from '../data/gallery';
import { ServiceCard } from '../components/ServiceCard';
import { OfferCard } from '../components/OfferCard';
import { PriceListTable } from '../components/PriceListTable';
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

  // Parallax scroll hooks
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const heroDecoX = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const featuredServices = services.filter((s) => s.featured).slice(0, 4);
  const chakraService = services.find((s) => s.id === '7-chakra-facial') || services[0];
  const soundTherapyService = services.find((s) => s.id === 'sound-therapy-facial') || services[1];

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
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // Motion easing curve
  const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Headline word animation items
  const headlineWords = [
    { text: 'Your', accent: false },
    { text: 'Beauty,', accent: false },
    { text: 'Our', accent: true },
    { text: 'Responsibility', accent: true },
  ];

  return (
    <div className="bg-[#FFFDF9] text-[#241316] overflow-hidden selection:bg-[#4A0718] selection:text-white">
      {/* ============================================================ */}
      {/* 1. CINEMATIC EDITORIAL HERO SECTION */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF5ED] to-[#FFF7E9] border-b border-[#D5AA63]/25"
      >
        {/* Ambient Subtle Aura Glows */}
        <div className="absolute top-10 right-10 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(213,170,99,0.15),transparent_70%)] pointer-events-none blur-2xl" />
        <div className="absolute -bottom-10 left-5 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(101,10,32,0.06),transparent_70%)] pointer-events-none blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Hero Editorial Typography */}
            <motion.div
              style={{ y: heroTextY }}
              className="lg:col-span-7 space-y-7 text-center lg:text-left"
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: luxuryEase, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF7E9] border border-[#D5AA63]/40 text-[#4A0718] text-xs font-bold tracking-[0.24em] uppercase shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D5AA63]" />
                <span>LADIES ONLY • HOME SERVICE • SURAT</span>
              </motion.div>

              {/* H1 Headline with Staggered Words */}
              <div className="space-y-3">
                <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5.25rem] font-bold text-[#241316] leading-[1.02] tracking-tight">
                  <div className="flex flex-wrap justify-center lg:justify-start gap-x-4">
                    {headlineWords.slice(0, 2).map((item, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          ease: luxuryEase,
                          delay: 0.2 + idx * 0.12
                        }}
                        className="inline-block"
                      >
                        {item.text}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-x-4">
                    {headlineWords.slice(2).map((item, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          ease: luxuryEase,
                          delay: 0.44 + idx * 0.12
                        }}
                        className="inline-block text-[#650A20] italic font-serif font-bold"
                      >
                        {item.text}
                      </motion.span>
                    ))}
                  </div>
                </h1>

                {/* Supporting Gujarati Line */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: luxuryEase, delay: 0.65 }}
                  className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#8E1837] italic font-semibold tracking-wide"
                >
                  તમારી સુંદરતા, અમારી જવાબદારી
                </motion.p>
              </div>

              {/* Supporting Copy */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: luxuryEase, delay: 0.75 }}
                className="text-stone-700 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
              >
                Premium beauty care delivered to your doorstep in Surat. Experience unhurried, hygienic, and deeply restorative salon rituals by certified expert Himanshi Patel in complete home comfort.
              </motion.p>

              {/* Focused CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: luxuryEase, delay: 0.85 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <button
                  onClick={() => onNavigate('book')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D5AA63] via-[#E9CB8A] to-[#D5AA63] hover:brightness-105 text-[#241316] rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_8px_24px_rgba(213,170,99,0.35)] transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:scale-[1.02] active:scale-98"
                >
                  <Calendar className="w-4 h-4 text-[#241316]" />
                  <span>Book Appointment</span>
                </button>

                <button
                  onClick={() => openWhatsApp(getGeneralInquiryMessage())}
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-[0_8px_24px_rgba(16,185,129,0.25)] transition-all cursor-pointer transform hover:scale-[1.02] active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>WhatsApp Us (+91 94266 86048)</span>
                </button>
              </motion.div>

              {/* Women Club Certified & Working Member Showcase Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.95 }}
                className="pt-2 flex justify-center lg:justify-start"
              >
                <a
                  href="https://womenclub.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3.5 px-4.5 py-3 rounded-2xl bg-gradient-to-r from-[#FFF7E9] via-[#FAF5ED] to-[#FFFDF9] border-2 border-[#D5AA63]/70 shadow-luxury-card hover:border-[#D5AA63] hover:shadow-md transition-all text-left max-w-md"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#4A0718] to-[#650A20] text-[#E9CB8A] flex items-center justify-center shrink-0 border border-[#D5AA63]/50 shadow-sm group-hover:scale-105 transition-transform">
                    <Award className="w-5 h-5 text-[#E9CB8A]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900 group-hover:text-[#4A0718] transition-colors">
                        Himanshi Patel
                      </span>
                      <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full shadow-2xs">
                        Official Verified
                      </span>
                    </div>
                    <span className="text-xs text-stone-700 block mt-0.5 leading-snug">
                      <strong className="text-[#8E1837] font-bold">Certified &amp; Working Member</strong> of <strong className="underline decoration-[#D5AA63]">womenclub.co.in</strong> ↗
                    </span>
                    <span className="text-[10px] text-stone-500 block">Surat's accredited doorstep women's wellness specialist</span>
                  </div>
                </a>
              </motion.div>

              {/* Decorative Trust Line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="pt-6 border-t border-[#D5AA63]/30 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-semibold text-stone-600 tracking-wider uppercase"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#4A0718]" />
                  HOME SERVICE
                </span>
                <span className="text-[#D5AA63]">·</span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#4A0718]" />
                  SURAT, GUJARAT
                </span>
                <span className="text-[#D5AA63]">·</span>
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#8E1837]" />
                  LADIES ONLY
                </span>
              </motion.div>
            </motion.div>

            {/* Right Column: Editorial Hero Visual (45-50% screen) */}
            <motion.div
              style={{ y: heroImageY }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              {/* Organic Jewelry Gold Frame */}
              <motion.div
                style={{ x: heroDecoX }}
                className="absolute -top-6 -right-6 w-full h-full rounded-[2.5rem] border border-[#D5AA63]/50 pointer-events-none hidden sm:block"
              />

              {/* Main Model Portrait with Organic Editorial Crop */}
              <div className="relative w-full max-w-md sm:max-w-lg rounded-[2.5rem] overflow-hidden p-2 sm:p-2.5 bg-gradient-to-b from-[#FFFDF9] via-white to-[#FFF7E9] border border-[#D5AA63]/60 shadow-[0_25px_60px_-15px_rgba(74,7,24,0.18)] group">
                <motion.div
                  initial={{ clipPath: 'inset(10% 0% 0% 0%)', scale: 1.08, opacity: 0 }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1.0, opacity: 1 }}
                  transition={{ duration: 1.1, ease: luxuryEase, delay: 0.3 }}
                  className="relative rounded-[2rem] overflow-hidden h-[450px] sm:h-[530px]"
                >
                  <img
                    src="https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/0.jpg"
                    alt="Radiant Indian beauty woman enjoying relaxing home facial"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241316]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Floating Glass Badge */}
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#D5AA63]/40 text-xs font-bold text-[#4A0718] flex items-center gap-2 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#D5AA63]" />
                    <span>Hiyupiyu Hair & Beauty</span>
                  </div>

                  {/* Bottom Editorial Caption */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E9CB8A] block">
                      SIGNATURE RITUAL
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                      7 Chakra Facial
                    </h3>
                    <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs">
                      <span className="font-mono text-lg font-bold text-[#E9CB8A]">₹1,500</span>
                      <button
                        onClick={() => onNavigate('book')}
                        className="text-white hover:text-[#E9CB8A] font-bold flex items-center gap-1 cursor-pointer transition-colors uppercase tracking-wider text-[11px]"
                      >
                        <span>Book Session</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. BRAND INTRO: Large Editorial Statement & 4 Trust Items */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Dramatic Large Editorial Statement Words */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D5AA63] font-bold block">
              THE HIYUPIYU ESSENCE
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#241316] leading-[1.08] tracking-tight">
              Beauty,
              <br />
              Care &amp;
              <br />
              Comfort —
              <br />
              <span className="text-[#650A20] italic font-serif">
                At Your Doorstep.
              </span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#D5AA63] to-transparent" />
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We bring the tranquil sanctuary and exacting standards of a luxury beauty lounge straight into your home. Led by certified expert <strong className="text-stone-900 font-bold">Himanshi Patel</strong>—an accredited <strong className="text-[#8E1837] font-semibold">Certified Member &amp; Working Member</strong> of <a href="https://womenclub.co.in/" target="_blank" rel="noopener noreferrer" className="text-[#8E1837] font-bold underline hover:text-[#4A0718]">Women Club (womenclub.co.in)</a>—every ritual is unhurried, private, and tailored to celebrate your natural glow.
            </p>
            <div className="pt-2">
              <a
                href="https://womenclub.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#FFF7E9] to-[#FAF5ED] border border-[#D5AA63]/60 text-xs text-[#4A0718] font-bold hover:bg-[#D5AA63]/20 transition-all shadow-xs group"
              >
                <div className="w-5 h-5 rounded-full bg-[#4A0718] text-[#E9CB8A] flex items-center justify-center shrink-0">
                  <Award className="w-3 h-3 text-[#E9CB8A]" />
                </div>
                <span>Himanshi Patel: Women Club Certified &amp; Working Member ↗</span>
              </a>
            </div>
          </div>

          {/* Right: Four Elegant Vertical Trust Items (NO generic white cards) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {/* 01 CLEANLINESS */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: luxuryEase }}
              className="space-y-3 pb-6 border-b border-[#D5AA63]/25"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[#D5AA63]">01</span>
                <div className="w-9 h-9 rounded-full bg-[#FFF7E9] border border-[#D5AA63]/40 flex items-center justify-center text-[#4A0718]">
                  <Sparkles className="w-4 h-4 text-[#D5AA63]" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#241316] tracking-wide">
                  CLEANLINESS
                </h3>
                <p className="text-xs text-[#8E1837] italic font-serif font-semibold mt-0.5">
                  "સ્વચ્છતા અમારી પહેલી પ્રાથમિકતા"
                </p>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Hospital-grade sanitized stainless steel tools, disposable bedsheets, fresh sanitized towels, and single-use applicator kits for every client.
              </p>
            </motion.div>

            {/* 02 QUALITY SERVICE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: luxuryEase, delay: 0.1 }}
              className="space-y-3 pb-6 border-b border-[#D5AA63]/25"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[#D5AA63]">02</span>
                <div className="w-9 h-9 rounded-full bg-[#FFF7E9] border border-[#D5AA63]/40 flex items-center justify-center text-[#4A0718]">
                  <Award className="w-4 h-4 text-[#D5AA63]" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#241316] tracking-wide">
                  QUALITY SERVICE
                </h3>
                <p className="text-xs text-[#8E1837] italic font-serif font-semibold mt-0.5">
                  "ઉત્તમ ગુણવત્તાની પ્રીમિયમ સર્વિસ"
                </p>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                100% authentic branded products from O3+, L'Oréal Paris, Lotus Professional, and certified Ayurvedic cold-pressed botanical oils.
              </p>
            </motion.div>

            {/* 03 TRUST & CARE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: luxuryEase, delay: 0.2 }}
              className="space-y-3 pb-6 border-b border-[#D5AA63]/25"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[#D5AA63]">03</span>
                <div className="w-9 h-9 rounded-full bg-[#FFF7E9] border border-[#D5AA63]/40 flex items-center justify-center text-[#4A0718]">
                  <Heart className="w-4 h-4 text-[#8E1837]" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#241316] tracking-wide">
                  TRUST &amp; CARE
                </h3>
                <p className="text-xs text-[#8E1837] italic font-serif font-semibold mt-0.5">
                  "વિશ્વાસ, કાળજી અને સંતોષ"
                </p>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Respectful, gentle, and unhurried salon sessions designed exclusively for ladies in Surat. Your skin safety and peace of mind come first.
              </p>
            </motion.div>

            {/* 04 HOME SERVICE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: luxuryEase, delay: 0.3 }}
              className="space-y-3 pb-6 border-b border-[#D5AA63]/25"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-[#D5AA63]">04</span>
                <div className="w-9 h-9 rounded-full bg-[#FFF7E9] border border-[#D5AA63]/40 flex items-center justify-center text-[#4A0718]">
                  <Home className="w-4 h-4 text-[#D5AA63]" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#241316] tracking-wide">
                  HOME SERVICE
                </h3>
                <p className="text-xs text-[#8E1837] italic font-serif font-semibold mt-0.5">
                  "તમારા ઘરે સૌંદર્ય સંભાળ"
                </p>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Skip Surat city traffic, parking troubles, and crowded waiting rooms. Relax in your private space while we bring the complete salon experience to you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. HOW IT WORKS: Horizontal Editorial Timeline with Lines */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-[#FAF5ED] border-y border-[#D5AA63]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D5AA63] font-bold block">
              EFFORTLESS PROCESS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#241316]">
              How Doorstep Beauty Works
            </h2>
            <p className="text-stone-600 text-sm">
              Direct booking via WhatsApp with zero advance payments or tedious sign-ups.
            </p>
          </div>

          {/* Editorial Horizontal Timeline on Desktop, Vertical on Mobile */}
          <div className="relative">
            {/* Connecting Gold Line across desktop */}
            <div className="hidden md:block absolute top-7 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-[#D5AA63]/20 via-[#D5AA63] to-[#D5AA63]/20 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 relative z-10">
              {/* Step 01 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: luxuryEase }}
                className="text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D5AA63] to-[#E9CB8A] text-[#241316] font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-[0_4px_16px_rgba(213,170,99,0.35)] ring-4 ring-[#FAF5ED]">
                  01
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A0718]">
                  Choose Your Service
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                  Browse our catalog of signature facials, hair spa, waxing, manicures, pedicures, or bridal packages.
                </p>
              </motion.div>

              {/* Step 02 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: luxuryEase, delay: 0.15 }}
                className="text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D5AA63] to-[#E9CB8A] text-[#241316] font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-[0_4px_16px_rgba(213,170,99,0.35)] ring-4 ring-[#FAF5ED]">
                  02
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A0718]">
                  Choose Preferred Time
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                  Select the convenient date and morning/afternoon slot that best fits your private routine in Surat.
                </p>
              </motion.div>

              {/* Step 03 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: luxuryEase, delay: 0.3 }}
                className="text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D5AA63] to-[#E9CB8A] text-[#241316] font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-[0_4px_16px_rgba(213,170,99,0.35)] ring-4 ring-[#FAF5ED]">
                  03
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A0718]">
                  Confirm Through WhatsApp
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                  Our system pre-formats your appointment details directly for WhatsApp. Himanshi confirms instantly.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SERVICES SECTION: Editorial Grid with Alternating Cards */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 border-b border-[#D5AA63]/25 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D5AA63] font-bold block">
              POPULAR HOME BEAUTY SERVICES
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#241316]">
              Beauty Care, Brought Home.
            </h2>
            <p className="text-stone-600 text-sm max-w-xl">
              Clean, unhurried salon services brought directly to your home in Surat with sterilized kits.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#4A0718] hover:text-[#650A20] flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap"
          >
            <span>Explore All {services.length} Services</span>
            <ArrowRight className="w-4 h-4 text-[#D5AA63]" />
          </button>
        </div>

        {/* Editorial Mixed Grid Layout: Featured large + standard cards + photographic pause */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1: Large Featured Card */}
          <div className="md:col-span-2">
            <ServiceCard
              service={featuredServices[0] || chakraService}
              onBook={onBookService}
              onViewDetails={onViewService}
              variant="featured"
            />
          </div>

          {/* Service 2: Standard Card */}
          <div>
            <ServiceCard
              service={featuredServices[1] || soundTherapyService}
              onBook={onBookService}
              onViewDetails={onViewService}
            />
          </div>

          {/* Service 3: Standard Card */}
          <div>
            <ServiceCard
              service={featuredServices[2] || services[2]}
              onBook={onBookService}
              onViewDetails={onViewService}
            />
          </div>

          {/* Editorial Visual Pause Banner (Magazine feel) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden relative min-h-[300px] flex flex-col justify-end p-8 text-white bg-[#4A0718] border border-[#D5AA63]/40 group"
          >
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
              alt="Ayurvedic beauty oils and gentle skin treatment"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241316] via-[#241316]/50 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E9CB8A]">
                AYURVEDA &amp; BOTANICALS
              </span>
              <h3 className="font-serif text-2xl font-bold leading-snug">
                Pure Natural Ingredients for Lasting Glow
              </h3>
              <p className="text-xs text-stone-200 leading-relaxed">
                Free from harmful chemicals. Safe for sensitive skin and expectant mothers in Surat.
              </p>
              <button
                onClick={() => onNavigate('services')}
                className="pt-2 text-xs font-bold text-[#E9CB8A] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <span>Browse All Treatments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Service 4: Standard Card */}
          <div>
            <ServiceCard
              service={featuredServices[3] || services[3]}
              onBook={onBookService}
              onViewDetails={onViewService}
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FEATURED SERVICE: Editorial Feature for "7 Chakra Facial" */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 bg-[#FAF5ED] border-y border-[#D5AA63]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FEFCF7] rounded-[2.5rem] border border-[#D5AA63]/40 p-8 sm:p-14 shadow-[0_20px_50px_-15px_rgba(74,7,24,0.12)] relative overflow-hidden">
            {/* Subtle decorative gold line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D5AA63] to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left: Large Editorial Image with Clip Path */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1.0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: luxuryEase }}
                className="lg:col-span-6 relative"
              >
                <div className="relative rounded-[2rem] overflow-hidden border border-[#D5AA63]/50 shadow-xl group">
                  <img
                    src="https://raw.githubusercontent.com/JamDevelopers/hiyu-piyu-hair-and-beauty/refs/heads/main/public/0.jpg"
                    alt="7 Chakra Facial signature therapy"
                    referrerPolicy="no-referrer"
                    className="w-full h-80 sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241316]/75 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 bg-[#4A0718]/90 text-[#E9CB8A] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#D5AA63]/50 backdrop-blur-xs">
                    SIGNATURE EXPERIENCE
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs font-mono text-[#E9CB8A]">
                      Ayurvedic Gemstones • Tibetan Acoustic Resonance
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right: Service Details */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: luxuryEase, delay: 0.2 }}
                className="lg:col-span-6 space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#D5AA63] font-bold block">
                    SIGNATURE EXPERIENCE
                  </span>
                  <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#241316] leading-tight">
                    7 Chakra Facial
                  </h3>
                  <p className="font-serif text-xl sm:text-2xl text-[#8E1837] italic font-semibold">
                    7 ચક્રા ફેશિયલ • આયુર્વેદિક એન્ડ જેડ સ્ટોન કેર
                  </p>
                </div>

                <div className="w-16 h-0.5 bg-gradient-to-r from-[#D5AA63] to-transparent" />

                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  Our premier holistic beauty experience. Harmonizes facial energy vortexes using precious gemstone extracts, Vedic acupressure point massage, cooling jade stone rollers, and Tibetan singing bowl sound therapy for profound inner serenity and luminous skin clarity.
                </p>

                {/* Price & Duration */}
                <div className="flex items-baseline gap-6 pt-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold block">Experience Fee</span>
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#4A0718]">₹1,500</span>
                  </div>
                  <div className="border-l border-[#D5AA63]/30 pl-6">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold block">Session Duration</span>
                    <span className="text-sm font-semibold text-stone-800 flex items-center gap-1.5 mt-1">
                      <Clock className="w-4 h-4 text-[#D5AA63]" />
                      <span>75 minutes</span>
                    </span>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-stone-700">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#D5AA63] shrink-0 mt-0.5" />
                    <span>Deep vibrational tension release and calming aura balance</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#D5AA63] shrink-0 mt-0.5" />
                    <span>Cooling jade & rose quartz gemstone lymphatic drainage</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#D5AA63] shrink-0 mt-0.5" />
                    <span>Luminescent gold algae peel-off mask for lasting event glow</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3.5 pt-4">
                  <button
                    onClick={() => onBookService(chakraService)}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#D5AA63] via-[#E9CB8A] to-[#D5AA63] text-[#241316] font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_4px_16px_rgba(213,170,99,0.35)] hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.02] active:scale-98"
                  >
                    <Calendar className="w-4 h-4 text-[#241316]" />
                    <span>Book This Service</span>
                  </button>

                  <button
                    onClick={() => openWhatsApp(getServiceInquiryMessage('7 Chakra Facial', 1500))}
                    className="px-6 py-3.5 border border-[#D5AA63]/60 hover:border-[#D5AA63] text-[#4A0718] hover:bg-[#FFF7E9] rounded-full text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Enquire on WhatsApp</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. SPECIAL OFFERS: Navratri & Luxury Healing Packages */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 border-b border-[#D5AA63]/25 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D5AA63] font-bold block">
              FESTIVE &amp; SIGNATURE OFFERS
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#241316]">
              Festive Glow &amp; Healing Combos
            </h2>
            <p className="text-stone-600 text-sm max-w-xl">
              Limited-time Navratri Garba glow bundles, authentic Tibetan sound bowl therapies, and signature crystal chakra packages.
            </p>
          </div>

          <button
            onClick={() => onNavigate('offers')}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#4A0718] hover:text-[#650A20] flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>View All {offers.length} Packages</span>
            <ArrowRight className="w-4 h-4 text-[#D5AA63]" />
          </button>
        </div>

        {/* Featured Festive & Healing Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {offers.slice(0, 4).map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onBookOffer={onBookOffer}
            />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6B. OFFICIAL PRICE LIST POSTER & TABLE */}
      {/* ============================================================ */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceListTable
          onBookService={(serviceId) => {
            const found = services.find((s) => s.id === serviceId);
            if (found) onBookService(found);
          }}
        />
      </section>

      {/* ============================================================ */}
      {/* 7. CLIENT WORDS / TESTIMONIALS */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-24 bg-[#FAF5ED] border-y border-[#D5AA63]/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D5AA63] font-bold block mb-3">
            CLIENT WORDS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#241316] mb-12">
            Loved by Women in Surat
          </h2>

          <div className="bg-[#FEFCF7] rounded-[2rem] border border-[#D5AA63]/40 p-8 sm:p-14 shadow-lg relative overflow-hidden">
            {/* Elegant Quotation Mark Watermark */}
            <div className="absolute top-2 right-6 font-serif text-9xl text-[#D5AA63]/10 select-none pointer-events-none">
              “
            </div>

            <div className="relative z-10 space-y-6">
              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1.5 text-[#D5AA63]">
                {[...Array(reviews[testimonialIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D5AA63]" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-xl sm:text-2xl text-stone-800 italic leading-relaxed max-w-2xl mx-auto">
                "{reviews[testimonialIndex].comment}"
              </p>

              {/* Author */}
              <div className="pt-2">
                <h4 className="font-bold text-stone-900 text-base">
                  {reviews[testimonialIndex].name}
                </h4>
                <p className="text-xs text-[#D5AA63] font-medium tracking-wider uppercase mt-1">
                  {reviews[testimonialIndex].area} • {reviews[testimonialIndex].serviceTaken}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-[#D5AA63]/40 hover:bg-[#4A0718] hover:text-white text-stone-700 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        testimonialIndex === i ? 'w-6 bg-[#4A0718]' : 'w-2 bg-stone-300'
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full border border-[#D5AA63]/40 hover:bg-[#4A0718] hover:text-white text-stone-700 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. TREATMENT & HYGIENE GALLERY */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 border-b border-[#D5AA63]/25 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D5AA63] font-bold block">
              VISUAL PORTFOLIO
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#241316]">
              Treatment &amp; Hygiene Gallery
            </h2>
            <p className="text-stone-600 text-sm max-w-xl">
              Authentic setups, sterilized single-use supplies, and glowing results.
            </p>
          </div>

          <button
            onClick={() => onNavigate('gallery')}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#4A0718] hover:text-[#650A20] flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>Full Gallery</span>
            <ArrowRight className="w-4 h-4 text-[#D5AA63]" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setActiveGalleryModal(item)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[#D5AA63]/30 shadow-sm hover:shadow-lg bg-[#FEFCF7] transition-all"
            >
              <div className="h-48 sm:h-64 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-[#4A0718]/90 text-[#E9CB8A] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
                  {item.tag}
                </div>
              </div>
              <div className="p-4 bg-[#FEFCF7] text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D5AA63] block">
                  {item.category}
                </span>
                <h4 className="font-serif text-base font-bold text-[#241316] group-hover:text-[#4A0718] transition-colors line-clamp-1 mt-0.5">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Lightbox Modal */}
        {activeGalleryModal && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setActiveGalleryModal(null)}
          >
            <div
              className="bg-[#FEFCF7] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 sm:p-8 space-y-4 border border-[#D5AA63]/60"
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
                <span className="text-xs uppercase font-bold tracking-wider text-[#D5AA63]">
                  {activeGalleryModal.category} • {activeGalleryModal.tag}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#241316] mt-1">
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
                  className="px-6 py-2.5 bg-gradient-to-r from-[#D5AA63] to-[#E9CB8A] text-[#241316] text-xs font-bold uppercase tracking-wider rounded-full shadow-md cursor-pointer"
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

      {/* ============================================================ */}
      {/* 9. COVERAGE ACROSS SURAT */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-24 bg-[#FAF5ED] border-y border-[#D5AA63]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D5AA63] font-bold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4A0718]" />
                <span>COVERAGE IN SURAT</span>
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#241316] leading-tight">
                Doorstep Beauty Across Surat, Gujarat
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Himanshi travels directly to your residential home, apartment, or bungalow with sterilized professional equipment, disposable supplies, and authentic salon products.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openWhatsApp(getGeneralInquiryMessage())}
                  className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/25 transform hover:scale-[1.02] active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Check Availability for Your Area</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#FEFCF7] p-8 rounded-3xl border border-[#D5AA63]/40 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#4A0718] block">
                Primary Localities Served:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {settings.coverageAreas.map((area, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#FFF7E9] text-stone-800 px-3.5 py-1.5 rounded-full border border-[#D5AA63]/40 font-semibold shadow-xs"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D5AA63] font-bold block">
            QUESTIONS &amp; ANSWERS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#241316]">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 text-sm">
            Everything you need to know about our ladies-only home salon visits in Surat.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#FEFCF7] rounded-2xl border border-[#D5AA63]/30 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF5ED] transition-colors"
                >
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#241316]">
                      {faq.question}
                    </h4>
                    {faq.gujaratiQuestion && (
                      <p className="font-serif text-xs text-[#8E1837] italic mt-1 font-semibold">
                        {faq.gujaratiQuestion}
                      </p>
                    )}
                  </div>
                  <div className="text-stone-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#4A0718]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-[#D5AA63]/20 bg-[#FAF5ED]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. FINAL INVITATION CTA BANNER */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-[#4A0718] via-[#650A20] to-[#241316] text-white rounded-[2.5rem] p-8 sm:p-16 text-center space-y-7 shadow-2xl relative overflow-hidden border border-[#D5AA63]/40">
          {/* Subtle Golden Glow Ornaments */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(213,170,99,0.25),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(233,203,138,0.15),transparent_70%)] pointer-events-none" />

          <div className="space-y-4 max-w-2xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-[#D5AA63]/50 text-xs uppercase tracking-[0.2em] text-[#E9CB8A] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#E9CB8A]" />
              <span>{settings.gujaratiBrandName} • સુરત હોમ સર્વિસ</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Your Beauty Journey Starts at Home
            </h2>
            <p className="text-xl sm:text-2xl text-[#E9CB8A] font-serif italic">
              તમારી સુંદરતા, અમારી જવાબદારી
            </p>
            <p className="text-stone-200 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed pt-1">
              Book your private session with Himanshi Patel today. Experience the perfect harmony of pristine cleanliness, authentic products, and soothing care in Surat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
            <button
              onClick={() => onNavigate('book')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D5AA63] via-[#E9CB8A] to-[#D5AA63] hover:brightness-105 text-[#241316] rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_8px_24px_rgba(213,170,99,0.35)] transition-all cursor-pointer transform hover:scale-[1.02] active:scale-98"
            >
              Book Appointment
            </button>
            <button
              onClick={() => openWhatsApp(getGeneralInquiryMessage())}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-[0_8px_24px_rgba(16,185,129,0.25)] transition-all cursor-pointer transform hover:scale-[1.02] active:scale-98"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp Us · 94266 86048</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
