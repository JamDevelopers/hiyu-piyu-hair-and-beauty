import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Tag,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Heart,
  Plus,
  Trash2,
  Check,
  Search,
  X,
  SlidersHorizontal,
  Award
} from 'lucide-react';
import { services, Service, serviceCategories } from '../data/services';
import { timeSlots, defaultDate } from '../data/timeSlots';
import { settings } from '../data/settings';
import { validatePromoCode } from '../utils/promo';
import { submitBookingViaWhatsApp, BookingPayload } from '../utils/booking';
import { promoCodes } from '../data/promoCodes';

interface BookingFormProps {
  initialServiceId?: string;
  initialPackageTitle?: string;
  initialPrice?: number;
  onSuccess?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialServiceId,
  initialPackageTitle,
  initialPrice,
  onSuccess
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Multi-select service IDs
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(() => {
    if (initialServiceId) return [initialServiceId];
    if (initialPackageTitle) return [];
    return [services[0].id];
  });

  // Offer package support
  const [customPackageName, setCustomPackageName] = useState<string>(initialPackageTitle || '');
  const [customPackagePrice, setCustomPackagePrice] = useState<number>(initialPrice || 0);

  // Search & category filter in Step 1
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Date & Time
  const [date, setDate] = useState<string>(defaultDate());
  const [timeSlot, setTimeSlot] = useState<string>(timeSlots[0]);

  // Client Details
  const [name, setName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [area, setArea] = useState<string>(settings.coverageAreas[0]);
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Promo code states
  const [promoInput, setPromoInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
    message: string;
  } | null>(null);
  const [promoError, setPromoError] = useState<string>('');

  // Submission state
  const [lastBookingRef, setLastBookingRef] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceIds([initialServiceId]);
      setCustomPackageName('');
      setCustomPackagePrice(0);
    } else if (initialPackageTitle) {
      setCustomPackageName(initialPackageTitle);
      if (initialPrice) setCustomPackagePrice(initialPrice);
    }
  }, [initialServiceId, initialPackageTitle, initialPrice]);

  // Derived list of selected services
  const selectedServices = services.filter((s) => selectedServiceIds.includes(s.id));

  // Multi-service calculations
  const servicesSubtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const subtotal = servicesSubtotal + (customPackageName ? customPackagePrice : 0);
  const totalDuration =
    selectedServices.reduce((sum, s) => sum + s.duration, 0) + (customPackageName ? 90 : 0);

  // Promo code re-validation on subtotal change
  useEffect(() => {
    if (appliedPromo) {
      const res = validatePromoCode(appliedPromo.code, subtotal);
      if (res.valid) {
        setAppliedPromo({
          code: appliedPromo.code,
          discount: res.discount,
          message: res.message
        });
      } else {
        setAppliedPromo(null);
        setPromoError(res.message);
      }
    }
  }, [subtotal]);

  const discount = appliedPromo ? appliedPromo.discount : 0;
  const estimatedTotal = Math.max(0, subtotal - discount);

  // Multi-selection Handlers
  const handleToggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
    setValidationErrors((errs) => {
      const copy = { ...errs };
      delete copy.services;
      return copy;
    });
  };

  const handleRemoveService = (serviceId: string) => {
    setSelectedServiceIds((prev) => prev.filter((id) => id !== serviceId));
  };

  const handleClearAllServices = () => {
    setSelectedServiceIds([]);
    setCustomPackageName('');
    setCustomPackagePrice(0);
  };

  // Promo Handlers
  const handleApplyPromo = () => {
    setPromoError('');
    if (!promoInput.trim()) {
      setPromoError('Please enter a coupon code.');
      return;
    }
    const res = validatePromoCode(promoInput, subtotal);
    if (res.valid) {
      setAppliedPromo({
        code: promoInput.trim().toUpperCase(),
        discount: res.discount,
        message: res.message
      });
      setPromoError('');
    } else {
      setAppliedPromo(null);
      setPromoError(res.message);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError('');
  };

  const handleApplySamplePromo = (code: string) => {
    setPromoInput(code);
    setPromoError('');
    const res = validatePromoCode(code, subtotal);
    if (res.valid) {
      setAppliedPromo({
        code,
        discount: res.discount,
        message: res.message
      });
    } else {
      setPromoError(res.message);
    }
  };

  // Step Validation
  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (selectedServiceIds.length === 0 && !customPackageName) {
      errors.services = 'Please select at least one beauty service to continue.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!date) errors.date = 'Please pick a preferred date.';
    if (!timeSlot) errors.timeSlot = 'Please select a preferred time slot.';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Please provide your full name.';
    if (!mobile.trim() || !/^\d{10}$/.test(mobile.trim().replace(/\D/g, ''))) {
      errors.mobile = 'Please enter a valid 10-digit WhatsApp number.';
    }
    if (!address.trim()) errors.address = 'Please provide your home address / apartment details in Surat.';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) setCurrentStep(4);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = () => {
    const selectedList = [
      ...(customPackageName
        ? [{ name: `${customPackageName} (Package)`, price: customPackagePrice, duration: 90 }]
        : []),
      ...selectedServices.map((s) => ({ name: s.name, price: s.price, duration: s.duration }))
    ];

    const serviceSummaryTitle = selectedList.map((s) => s.name).join(', ');

    const payload: BookingPayload = {
      serviceName: serviceSummaryTitle || 'Beauty Home Rituals',
      selectedServices: selectedList,
      totalDuration,
      name,
      mobile,
      date,
      timeSlot,
      area,
      address,
      notes,
      subtotal,
      promoCode: appliedPromo?.code,
      discount,
      estimatedTotal
    };

    const { reference } = submitBookingViaWhatsApp(payload);
    setLastBookingRef(reference);
    setIsSubmitted(true);
    if (onSuccess) onSuccess();
  };

  // Filtered services for the catalog cards in Step 1
  const filteredCatalog = services.filter((svc) => {
    const matchesCategory = activeCategory === 'All' || svc.category === activeCategory;
    const matchesSearch =
      svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (svc.gujaratiName && svc.gujaratiName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FEFCF7] rounded-3xl border border-[#D5AA63]/40 shadow-xl overflow-hidden">
      {/* Luxury Burgundy & Gold Header Banner */}
      <div className="bg-gradient-to-r from-[#4A0718] via-[#650A20] to-[#241316] p-6 sm:p-8 text-white relative border-b border-[#D5AA63]/30">
        <div className="flex items-center gap-2 text-[#E9CB8A] text-xs font-bold tracking-[0.2em] uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#D5AA63]" />
          <span>Ladies-Only Home Beauty Service • Surat</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Reserve Your Beauty Sanctuary
        </h2>
        <p className="text-stone-200 text-xs sm:text-sm mt-1 max-w-xl">
          Select multiple treatments for a complete home pampering session. We prepare your pre-formatted WhatsApp request for Himanshi Patel to confirm your time.
        </p>

        {/* Step Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { num: 1, label: 'Services (Multi)' },
              { num: 2, label: 'Date & Time' },
              { num: 3, label: 'Your Details' },
              { num: 4, label: 'Review & Send' }
            ].map((step) => (
              <button
                key={step.num}
                type="button"
                onClick={() => {
                  if (step.num < currentStep) setCurrentStep(step.num);
                }}
                disabled={step.num > currentStep}
                className={`flex flex-col items-center gap-1 transition-all ${
                  currentStep === step.num
                    ? 'text-[#E9CB8A] font-bold'
                    : currentStep > step.num
                    ? 'text-stone-300 hover:text-white cursor-pointer'
                    : 'text-stone-500 opacity-60'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep === step.num
                      ? 'bg-gradient-to-r from-[#D5AA63] to-[#E9CB8A] text-[#241316] ring-2 ring-[#D5AA63]/50'
                      : currentStep > step.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/10 text-stone-300'
                  }`}
                >
                  {currentStep > step.num ? '✓' : step.num}
                </div>
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">{step.label}</span>
              </button>
            ))}
          </div>

          <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#D5AA63] to-[#E9CB8A] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Official Women Club Credential Bar */}
      <div className="bg-[#FFF7E9] border-b border-[#D5AA63]/40 px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#4A0718] text-[#E9CB8A] flex items-center justify-center shrink-0">
            <Award className="w-3.5 h-3.5 text-[#E9CB8A]" />
          </div>
          <span className="text-stone-700">
            <strong>Himanshi Patel</strong> is an officially verified <strong className="text-[#8E1837]">Certified &amp; Working Member</strong> of <strong className="text-stone-900">Women Club</strong>.
          </span>
        </div>
        <a
          href="https://womenclub.co.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4A0718] font-bold hover:underline inline-flex items-center gap-1 text-[11px] whitespace-nowrap bg-white px-3 py-1 rounded-full border border-[#D5AA63]/40 shadow-2xs"
        >
          <span>Verify at womenclub.co.in</span>
          <span>↗</span>
        </a>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8">
        {isSubmitted ? (
          /* Dispatched Confirmation View */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8 space-y-6"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#D5AA63] font-bold">
                WhatsApp Request Generated
              </span>
              <h3 className="font-serif text-3xl font-bold text-stone-900 mt-1">
                Appointment Request Ready!
              </h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto mt-2">
                Your appointment request is loaded into WhatsApp. Tap <strong>Continue on WhatsApp</strong> below to transmit your details to Himanshi Patel.
              </p>
            </div>

            {/* Reference Summary Receipt */}
            <div className="max-w-md mx-auto p-5 bg-[#FFF7E9] border border-[#D5AA63]/40 rounded-2xl text-left shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#D5AA63]/20">
                <span className="text-xs text-stone-600 font-medium">Temporary Booking Ref:</span>
                <span className="font-mono text-sm font-bold text-[#4A0718] tracking-wider">
                  {lastBookingRef}
                </span>
              </div>
              <div className="text-xs space-y-2 text-stone-700">
                <div className="flex justify-between">
                  <span className="text-stone-500">Client Name:</span>
                  <span className="font-semibold text-stone-900">{name}</span>
                </div>
                <div>
                  <span className="text-stone-500 block mb-1">
                    Booked Services ({selectedServices.length + (customPackageName ? 1 : 0)}):
                  </span>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-[#D5AA63]/25 space-y-1">
                    {customPackageName && (
                      <div className="flex justify-between font-medium text-stone-800">
                        <span>• {customPackageName} (Package)</span>
                        <span className="font-mono">₹{customPackagePrice}</span>
                      </div>
                    )}
                    {selectedServices.map((svc) => (
                      <div key={svc.id} className="flex justify-between font-medium text-stone-800">
                        <span>• {svc.name} ({svc.duration}m)</span>
                        <span className="font-mono">₹{svc.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Date & Preferred Time:</span>
                  <span className="font-semibold text-stone-900">{date} at {timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Surat Locality:</span>
                  <span className="font-semibold text-stone-900">{area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Duration:</span>
                  <span className="font-semibold text-stone-900">~{totalDuration} mins</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#D5AA63]/20 font-bold text-stone-900">
                  <span>Estimated Total:</span>
                  <span className="font-mono text-base text-[#4A0718]">₹{estimatedTotal}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleFinalSubmit}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </button>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto px-6 py-3.5 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-full text-xs font-semibold cursor-pointer"
              >
                Modify Booking
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* ============================================================ */}
            {/* STEP 1: CHOOSE BEAUTY SERVICES (100% CARD-BASED WITH MOTION) */}
            {/* ============================================================ */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                      Step 1: Choose Your Beauty Services
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                      Tap any card to select or deselect. You can book multiple services in one visit.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D5AA63] self-start sm:self-auto">1 of 4</span>
                </div>

                {/* Special Package Card (if user clicked offer) */}
                {customPackageName && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[#FFF7E9] border-2 border-[#D5AA63] rounded-2xl flex items-center justify-between shadow-xs"
                  >
                    <div>
                      <span className="text-[10px] text-[#D5AA63] font-bold uppercase tracking-wider block">
                        Selected Special Offer Bundle
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#4A0718]">{customPackageName}</h4>
                      <div className="flex items-center gap-3 text-xs text-stone-600 mt-1">
                        <span className="font-mono font-bold text-[#4A0718]">₹{customPackagePrice}</span>
                        <span>•</span>
                        <span>Full package included</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomPackageName('');
                        setCustomPackagePrice(0);
                      }}
                      className="text-xs text-stone-400 hover:text-red-700 flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </motion.div>
                )}

                {/* Multi-Select Explanation Banner */}
                <div className="p-3.5 bg-gradient-to-r from-[#FFF7E9] to-[#FAF5ED] border border-[#D5AA63]/50 rounded-2xl flex items-center justify-between gap-3 text-xs text-stone-700 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#4A0718] text-[#E9CB8A] flex items-center justify-center font-bold text-xs shrink-0">
                      ✦
                    </div>
                    <div>
                      <span className="font-bold text-[#4A0718] block">
                        Multi-Service Booking Enabled
                      </span>
                      <span className="text-[11px] text-stone-600">
                        Select multiple treatments below to combine them into one relaxed home visit. Tap any card to add or remove.
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#8E1837] bg-white px-2.5 py-1 rounded-full border border-[#D5AA63]/40 shrink-0 hidden sm:inline-block">
                    {selectedServices.length} Selected
                  </span>
                </div>

                {/* 1. SELECTED SERVICES TRAY (Real-Time Animated Summary with 1-Click Remove) */}
                <div className="bg-gradient-to-r from-[#FFFDF9] via-[#FAF5ED] to-[#FFF7E9] rounded-2xl p-4 sm:p-5 border border-[#D5AA63]/40 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm sm:text-base font-bold text-[#4A0718]">
                        Your Selected Treatments
                      </span>
                      <motion.span
                        key={selectedServices.length}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#4A0718] text-[#E9CB8A]"
                      >
                        {selectedServices.length + (customPackageName ? 1 : 0)}
                      </motion.span>
                    </div>

                    {(selectedServices.length > 0 || customPackageName) && (
                      <button
                        type="button"
                        onClick={handleClearAllServices}
                        className="text-xs text-stone-400 hover:text-red-700 font-semibold underline cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {selectedServices.length === 0 && !customPackageName ? (
                    <div className="py-4 text-center text-xs text-stone-500">
                      Tap any treatment card below to add it to your appointment.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Animated List of Selected Service Chips */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        <AnimatePresence>
                          {selectedServices.map((svc) => (
                            <motion.div
                              key={svc.id}
                              initial={{ opacity: 0, scale: 0.85, y: -6 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                              layout
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-[#D5AA63]/50 shadow-xs text-xs"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span className="font-semibold text-stone-900 truncate max-w-[180px] sm:max-w-[240px]">
                                {svc.name}
                              </span>
                              <span className="font-mono text-[#4A0718] font-bold">₹{svc.price}</span>
                              <span className="text-[10px] text-stone-400">({svc.duration}m)</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveService(svc.id);
                                }}
                                className="w-4 h-4 rounded-full text-stone-400 hover:text-red-600 hover:bg-stone-100 flex items-center justify-center transition-colors cursor-pointer ml-1"
                                title="Remove"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* Summary Metrics Bar */}
                      <div className="pt-2 border-t border-[#D5AA63]/25 flex items-center justify-between text-xs sm:text-sm font-semibold text-stone-800">
                        <span className="text-stone-600 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#D5AA63]" />
                          <span>Estimated Duration: <strong>~{totalDuration} mins</strong></span>
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="text-stone-500 font-normal">Subtotal:</span>
                          <span className="font-serif text-lg font-bold text-[#4A0718]">₹{subtotal}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {validationErrors.services && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-600 text-xs font-medium flex items-center gap-1 mt-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{validationErrors.services}</span>
                    </motion.p>
                  )}
                </div>

                {/* 2. SEARCH & CATEGORY FILTER TABS */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D5AA63]" />
                      <span>Select Treatments from Catalog</span>
                    </span>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-72">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Search facial, hair, waxing..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 bg-white border border-stone-300 rounded-full text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#D5AA63]"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Pills */}
                 <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
                    {['All', ...serviceCategories.filter((cat) => cat !== 'All')].map((cat) => {
                      const isActive = activeCategory === cat;

                      const count =
                        cat === 'All'
                          ? services.length
                          : services.filter((s) => s.category === cat).length;

                      return (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`relative px-3.5 py-1.5 rounded-full whitespace-nowrap text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-[#4A0718] text-[#E9CB8A] shadow-sm font-semibold'
                              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                          }`}
                        >
                          <span>{cat}</span>

                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-stone-100 text-stone-500'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. CARD-BASED SERVICE SELECTION GRID WITH MOTION */}
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  <AnimatePresence>
                    {filteredCatalog.map((svc) => {
                      const isSelected = selectedServiceIds.includes(svc.id);

                      return (
                        <motion.div
                          key={svc.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          whileHover={{ y: -4, transition: { duration: 0.2 } }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleToggleService(svc.id)}
                          className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#FFF7E9] border-[#D5AA63] shadow-md ring-2 ring-[#D5AA63]/40'
                              : 'bg-white border-stone-200 hover:border-[#D5AA63]/60 hover:shadow-sm'
                          }`}
                        >
                          {/* Image Header with Badge & Duration */}
                          <div className="relative h-36 w-full overflow-hidden bg-stone-100">
                            <img
                              src={svc.imageUrl}
                              alt={svc.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />

                            {/* Category Pill on Image */}
                            <div className="absolute top-2.5 left-2.5">
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-white/95 text-[#4A0718] border border-[#D5AA63]/40 shadow-xs backdrop-blur-xs">
                                {svc.category}
                              </span>
                            </div>

                            {/* Duration Badge */}
                            <div className="absolute bottom-2 left-2.5 text-white text-[11px] font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#E9CB8A]" />
                              <span>{svc.duration} mins</span>
                            </div>

                            {/* Selected Checkmark Overlay */}
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md border border-white"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </motion.div>
                            )}
                          </div>

                          {/* Card Content Body */}
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#4A0718] transition-colors leading-tight">
                                  {svc.name}
                                </h4>
                              </div>

                              {svc.gujaratiName && (
                                <p className="text-xs text-[#8E1837] italic font-serif mt-0.5 font-semibold">
                                  {svc.gujaratiName}
                                </p>
                              )}

                              <p className="text-stone-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                                {svc.description}
                              </p>
                            </div>

                            {/* Price & Action Button */}
                            <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-mono text-base font-bold text-[#4A0718]">
                                  ₹{svc.price}
                                </span>
                                {svc.originalPrice && svc.originalPrice > svc.price && (
                                  <span className="text-[11px] text-stone-400 line-through">
                                    ₹{svc.originalPrice}
                                  </span>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleService(svc.id);
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                  isSelected
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-stone-100 text-stone-700 hover:bg-[#4A0718] hover:text-white'
                                }`}
                              >
                                {isSelected ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Added</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Add</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {filteredCatalog.length === 0 && (
                  <div className="py-12 text-center text-stone-400 text-sm">
                    No services matched your search "{searchQuery}". Try a different keyword or category.
                  </div>
                )}
              </motion.div>
            )}

            {/* ============================================================ */}
            {/* STEP 2: PREFERRED DATE & TIME */}
            {/* ============================================================ */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                      Step 2: Preferred Date &amp; Time
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                      Home visits scheduled across Surat between 9:30 AM and 7:30 PM (All 7 Days).
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D5AA63]">2 of 4</span>
                </div>

                {/* Multi-Service Duration Notice */}
                <div className="p-3.5 bg-[#FFF7E9] border border-[#D5AA63]/40 rounded-2xl flex items-center justify-between text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D5AA63] shrink-0" />
                    <span>
                      Booking <strong>{selectedServices.length + (customPackageName ? 1 : 0)} services</strong> • Estimated total duration: <strong>~{totalDuration} mins</strong>.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-[#4A0718] underline hover:text-[#650A20] cursor-pointer"
                  >
                    Edit Services
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full p-3.5 bg-stone-50 border ${
                        validationErrors.date ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                      } rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D5AA63]`}
                    />
                    {validationErrors.date && (
                      <p className="text-red-600 text-xs mt-1">{validationErrors.date}</p>
                    )}
                  </div>

                  {/* Interactive Time Slot Cards with Motion (No old dropdown) */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                        Preferred Time Slot *
                      </label>
                      <span className="text-xs text-stone-500 font-medium">
                        Selected: <strong className="text-[#4A0718] font-bold">{timeSlot}</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {timeSlots.map((slot) => {
                        const isSelected = timeSlot === slot;
                        const isMorning = slot.includes('AM');
                        const isEvening = slot.includes('05:') || slot.includes('06:');
                        const period = isMorning ? 'Morning' : isEvening ? 'Evening' : 'Afternoon';

                        return (
                          <motion.button
                            key={slot}
                            type="button"
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setTimeSlot(slot)}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                              isSelected
                                ? 'bg-gradient-to-br from-[#FFF7E9] to-[#FAF5ED] border-2 border-[#D5AA63] shadow-md ring-2 ring-[#D5AA63]/40'
                                : 'bg-white border-stone-200 hover:border-[#D5AA63]/60 hover:shadow-xs'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#8E1837]' : 'text-stone-400'}`}>
                                {period}
                              </span>
                              {isSelected ? (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow-2xs"
                                >
                                  ✓
                                </motion.span>
                              ) : (
                                <Clock className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#D5AA63] transition-colors" />
                              )}
                            </div>

                            <div className="mt-2.5">
                              <span className={`font-mono text-base font-bold tracking-tight block ${isSelected ? 'text-[#4A0718]' : 'text-stone-900'}`}>
                                {slot}
                              </span>
                              <span className="text-[10px] text-stone-500 block mt-0.5">
                                Travel window
                              </span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-[#D5AA63]/30 rounded-2xl text-xs text-stone-600 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#D5AA63] shrink-0 mt-0.5" />
                  <span>
                    <strong>Note:</strong> Himanshi Patel personally travels to your home with a sterilized kit and fresh supplies. Time slots are verified on WhatsApp so there are no scheduling delays.
                  </span>
                </div>
              </motion.div>
            )}

            {/* ============================================================ */}
            {/* STEP 3: CONTACT & HOME ADDRESS IN SURAT */}
            {/* ============================================================ */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                      Step 3: Your Contact &amp; Address in Surat
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                      Exclusively for ladies. All details remain strictly confidential.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D5AA63]">3 of 4</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="e.g. Heena Shah"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full pl-10 pr-3.5 py-3 bg-stone-50 border ${
                          validationErrors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                        } rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D5AA63]`}
                      />
                    </div>
                    {validationErrors.name && (
                      <p className="text-red-600 text-xs mt-1">{validationErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      10-Digit WhatsApp Mobile *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        placeholder="WhatsApp Number"
                        value={mobile}
                        maxLength={10}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        className={`w-full pl-10 pr-3.5 py-3 bg-stone-50 border ${
                          validationErrors.mobile ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                        } rounded-xl text-stone-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#D5AA63]`}
                      />
                    </div>
                    {validationErrors.mobile && (
                      <p className="text-red-600 text-xs mt-1">{validationErrors.mobile}</p>
                    )}
                  </div>
                </div>

                {/* Interactive Surat Locality Cards with Motion (No old dropdown) */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                      Surat Locality / Area *
                    </label>
                    <span className="text-xs text-stone-500 font-medium">
                      Selected: <strong className="text-[#4A0718] font-bold">{area}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {settings.coverageAreas.map((ar) => {
                      const isSelected = area === ar;
                      return (
                        <motion.button
                          key={ar}
                          type="button"
                          whileHover={{ y: -2, transition: { duration: 0.15 } }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setArea(ar)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                            isSelected
                              ? 'bg-gradient-to-br from-[#FFF7E9] to-[#FAF5ED] border-2 border-[#D5AA63] shadow-xs ring-2 ring-[#D5AA63]/40 text-[#4A0718] font-bold'
                              : 'bg-white border-stone-200 hover:border-[#D5AA63]/50 hover:bg-[#FFFDF9] text-stone-700'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#D5AA63]' : 'text-stone-400'}`} />
                            <span className="text-xs truncate">{ar}</span>
                          </div>
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0"
                            >
                              ✓
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Flat / House, Society &amp; Landmark in Surat *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 502, Shivalik Heights, VIP Road, Near City Mall..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full p-3.5 bg-stone-50 border ${
                      validationErrors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                    } rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D5AA63]`}
                  />
                  {validationErrors.address && (
                    <p className="text-red-600 text-xs mt-1">{validationErrors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Special Requests / Sensitivities (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Sensitive skin, prefer herbal wax, ring bell gently..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D5AA63]"
                  />
                </div>
              </motion.div>
            )}

            {/* ============================================================ */}
            {/* STEP 4: REVIEW & APPLY PROMO COUPON */}
            {/* ============================================================ */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                      Step 4: Review &amp; Apply Coupon
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                      Verify your multiple services summary before dispatching via WhatsApp.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D5AA63]">4 of 4</span>
                </div>

                {/* Itemized Services Breakdown */}
                <div className="bg-white border border-[#D5AA63]/40 rounded-2xl p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4A0718]">
                      Selected Treatments ({selectedServices.length + (customPackageName ? 1 : 0)})
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-semibold text-[#D5AA63] hover:text-[#4A0718] underline cursor-pointer"
                    >
                      + Add / Edit Services
                    </button>
                  </div>

                  <div className="space-y-2 text-xs divide-y divide-stone-100">
                    {customPackageName && (
                      <div className="flex justify-between items-center pt-1.5">
                        <div>
                          <span className="font-bold text-stone-900">{customPackageName} (Package)</span>
                          <span className="text-stone-400 block text-[10px]">Head-to-toe makeover combo</span>
                        </div>
                        <span className="font-mono font-bold text-[#4A0718]">₹{customPackagePrice}</span>
                      </div>
                    )}
                    {selectedServices.map((svc) => (
                      <div key={svc.id} className="flex justify-between items-center pt-2">
                        <div>
                          <span className="font-bold text-stone-900">{svc.name}</span>
                          <span className="text-stone-500 block text-[10px]">
                            {svc.duration} mins • {svc.category}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-[#4A0718]">₹{svc.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex justify-between text-xs text-stone-600">
                    <span>Total Session Time</span>
                    <span className="font-semibold text-stone-900">~{totalDuration} mins</span>
                  </div>
                </div>

                {/* Promo Code Box */}
                <div className="p-4 bg-[#FFF7E9] border border-[#D5AA63]/40 rounded-2xl space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Apply Promo Coupon
                  </label>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. WELCOME10, SAVE150"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-800 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#D5AA63]"
                      />
                    </div>
                    {appliedPromo ? (
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="px-4 py-2.5 border border-red-300 text-red-700 hover:bg-red-50 text-xs font-semibold rounded-xl cursor-pointer"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-5 py-2.5 bg-[#4A0718] hover:bg-[#650A20] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-sm"
                      >
                        Apply
                      </button>
                    )}
                  </div>

                  {appliedPromo && (
                    <p className="text-xs text-emerald-700 font-medium">
                      ✓ {appliedPromo.message} (₹{appliedPromo.discount} savings applied)
                    </p>
                  )}
                  {promoError && (
                    <p className="text-xs text-red-600">{promoError}</p>
                  )}

                  <div className="flex items-center gap-1.5 flex-wrap text-xs text-stone-500 pt-1">
                    <span className="text-[11px] font-medium text-stone-400">Available:</span>
                    {promoCodes.map((pc) => (
                      <button
                        type="button"
                        key={pc.code}
                        onClick={() => handleApplySamplePromo(pc.code)}
                        className="text-[11px] font-mono border border-[#D5AA63]/50 px-2 py-0.5 rounded bg-white text-[#4A0718] font-semibold cursor-pointer"
                      >
                        {pc.code}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Final Estimated Bill Summary */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                    Appointment Details
                  </span>
                  <div className="flex justify-between text-xs sm:text-sm text-stone-600">
                    <span>Client: <strong>{name}</strong> ({mobile})</span>
                    <span>{area}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-stone-600">
                    <span>Date &amp; Slot:</span>
                    <span><strong>{date} @ {timeSlot}</strong></span>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex justify-between text-sm text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-700 font-semibold">
                      <span>Discount ({appliedPromo?.code})</span>
                      <span className="font-mono tabular-nums">-₹{discount}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-stone-300 flex justify-between items-baseline">
                    <span className="font-bold text-stone-900 text-base">Estimated Total</span>
                    <span className="font-mono text-2xl font-bold text-[#4A0718] tabular-nums">
                      ₹{estimatedTotal}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 italic pt-1">
                    * Confirmed manually on WhatsApp. Payment (Cash / UPI) after treatments are completed.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step Navigation Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-3 border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#D5AA63] via-[#E9CB8A] to-[#D5AA63] hover:brightness-105 text-[#241316] rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer transition-all transform hover:scale-[1.02] active:scale-98"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#241316]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer transform hover:scale-[1.02] active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
