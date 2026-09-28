import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Tag, MessageCircle, AlertCircle, CheckCircle2, Sparkles, ArrowRight, ArrowLeft, ShieldCheck, Heart } from 'lucide-react';
import { services, Service } from '../data/services';
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
  const defaultService = services.find((s) => s.id === initialServiceId) || services[0];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || (initialPackageTitle ? 'custom-package' : defaultService.id)
  );
  const [customPackageName, setCustomPackageName] = useState<string>(initialPackageTitle || '');
  const [customPackagePrice, setCustomPackagePrice] = useState<number>(initialPrice || 0);

  const [date, setDate] = useState<string>(defaultDate());
  const [timeSlot, setTimeSlot] = useState<string>(timeSlots[0]);
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
      setSelectedServiceId(initialServiceId);
      setCustomPackageName('');
    } else if (initialPackageTitle) {
      setSelectedServiceId('custom-package');
      setCustomPackageName(initialPackageTitle);
      if (initialPrice) setCustomPackagePrice(initialPrice);
    }
  }, [initialServiceId, initialPackageTitle, initialPrice]);

  const currentService = services.find((s) => s.id === selectedServiceId);
  const subtotal = selectedServiceId === 'custom-package'
    ? customPackagePrice
    : currentService ? currentService.price : 0;

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
      setCurrentStep(2);
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
    const serviceTitle = selectedServiceId === 'custom-package'
      ? customPackageName || 'Special Custom Package'
      : currentService ? currentService.name : 'Beauty Service';

    const payload: BookingPayload = {
      serviceName: serviceTitle,
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

  return (
    <div className="bg-white rounded-3xl border border-[#D8AA55]/30 shadow-luxury-card overflow-hidden">
      {/* Luxury Burgundy & Gold Header Banner */}
      <div className="bg-gradient-to-r from-[#5B071B] via-[#4A0615] to-[#3A0612] p-6 sm:p-8 text-white relative border-b border-[#D8AA55]/30">
        <div className="flex items-center gap-2 text-[#F1D79A] text-xs font-bold tracking-wider uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#D8AA55]" />
          <span>Ladies-Only Home Beauty Service • Surat</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Reserve Your Beauty Sanctuary
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
          Fill your appointment request in 4 easy steps. We will prepare your custom WhatsApp message for Himanshi Patel to confirm availability.
        </p>

        {/* Step Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { num: 1, label: 'Service' },
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
                    ? 'text-[#F1D79A] font-bold'
                    : currentStep > step.num
                    ? 'text-stone-300 hover:text-white cursor-pointer'
                    : 'text-stone-500 opacity-60'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep === step.num
                      ? 'bg-gradient-to-r from-[#D8AA55] to-[#F1D79A] text-[#261316] ring-2 ring-[#D8AA55]/50'
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
              className="bg-gradient-to-r from-[#D8AA55] to-[#F1D79A] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8">
        {isSubmitted ? (
          /* Dispatched Confirmation View */
          <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#D8AA55] font-bold">
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
            <div className="max-w-md mx-auto p-5 bg-[#FFF9ED] border border-[#D8AA55]/40 rounded-2xl text-left shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#D8AA55]/20">
                <span className="text-xs text-stone-600 font-medium">Temporary Booking Ref:</span>
                <span className="font-mono text-sm font-bold text-[#5B071B] tracking-wider">
                  {lastBookingRef}
                </span>
              </div>
              <div className="pt-3 text-xs space-y-2 text-stone-700">
                <div className="flex justify-between">
                  <span className="text-stone-500">Client Name:</span>
                  <span className="font-semibold text-stone-900">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Service:</span>
                  <span className="font-semibold text-stone-900">
                    {selectedServiceId === 'custom-package' ? customPackageName : currentService?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Date & Preferred Time:</span>
                  <span className="font-semibold text-stone-900">{date} at {timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Surat Locality:</span>
                  <span className="font-semibold text-stone-900">{area}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#D8AA55]/20 font-bold text-stone-900">
                  <span>Estimated Total:</span>
                  <span className="font-mono text-base text-[#5B071B]">₹{estimatedTotal}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleFinalSubmit}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Continue on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                }}
                className="w-full sm:w-auto px-6 py-3.5 border border-stone-300 hover:border-stone-400 text-stone-700 rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                Edit Details or Book Another
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* STEP 1: Choose Service */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      Step 1: Choose Your Beauty Service
                    </h3>
                    <p className="text-stone-500 text-xs">
                      Select individual treatment or customized package.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D8AA55]">1 of 4</span>
                </div>

                {selectedServiceId === 'custom-package' ? (
                  <div className="p-4 bg-[#FFF9ED] border border-[#D8AA55] rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#D8AA55] font-bold uppercase block">Selected Special Offer</span>
                      <span className="font-serif text-lg font-bold text-stone-900">{customPackageName}</span>
                      <span className="text-xs text-stone-500 block mt-0.5">Fixed package price: ₹{customPackagePrice}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedServiceId(services[0].id)}
                      className="text-xs text-[#5B071B] hover:underline font-bold cursor-pointer"
                    >
                      Change to standard menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                      Select from Services Catalog
                    </label>
                    <select
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D8AA55] cursor-pointer font-medium"
                    >
                      {services.map((svc) => (
                        <option key={svc.id} value={svc.id}>
                          {svc.name} — ₹{svc.price} ({svc.duration} mins) · {svc.category}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {currentService && selectedServiceId !== 'custom-package' && (
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900">{currentService.name}</span>
                      <span className="font-mono font-bold text-[#5B071B] text-sm">₹{currentService.price}</span>
                    </div>
                    <p className="text-stone-600 text-xs leading-relaxed">{currentService.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-stone-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D8AA55]" />
                        <span>{currentService.duration} mins</span>
                      </span>
                      <span>·</span>
                      <span className="text-[#D8AA55] italic font-semibold">{currentService.gujaratiName}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Choose Date & Time */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      Step 2: Preferred Date & Time
                    </h3>
                    <p className="text-stone-500 text-xs">
                      Home visits are scheduled between 9:30 AM and 7:30 PM across Surat.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D8AA55]">2 of 4</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full p-3 bg-stone-50 border ${
                        validationErrors.date ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                      } rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D8AA55]`}
                    />
                    {validationErrors.date && (
                      <p className="text-red-600 text-xs mt-1">{validationErrors.date}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D8AA55] cursor-pointer"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot} (Subject to travel window)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-[#FFF9ED] border border-[#D8AA55]/30 rounded-xl text-xs text-stone-600 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#D8AA55] shrink-0 mt-0.5" />
                  <span>
                    <strong>Note:</strong> Selected time is your preferred travel slot. Himanshi will personally verify availability on WhatsApp so there are no scheduling conflicts.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 3: Your Details & Address */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      Step 3: Your Contact & Address in Surat
                    </h3>
                    <p className="text-stone-500 text-xs">
                      Exclusively for ladies. All details remain strictly confidential.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D8AA55]">3 of 4</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
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
                        } rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D8AA55]`}
                      />
                    </div>
                    {validationErrors.name && (
                      <p className="text-red-600 text-xs mt-1">{validationErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
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
                        } rounded-xl text-stone-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#D8AA55]`}
                      />
                    </div>
                    {validationErrors.mobile && (
                      <p className="text-red-600 text-xs mt-1">{validationErrors.mobile}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Surat Locality / Area *
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D8AA55] cursor-pointer"
                    >
                      {settings.coverageAreas.map((ar) => (
                        <option key={ar} value={ar}>{ar}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Flat / House, Society & Landmark *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 502, Shivalik Heights, VIP Road..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`w-full p-3 bg-stone-50 border ${
                        validationErrors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300'
                      } rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D8AA55]`}
                    />
                    {validationErrors.address && (
                      <p className="text-red-600 text-xs mt-1">{validationErrors.address}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Special Requests / Sensitivities (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Sensitive skin, prefer herbal wax, ring bell gently..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D8AA55]"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Review, Promo Code & WhatsApp Trigger */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      Step 4: Review & Apply Coupon
                    </h3>
                    <p className="text-stone-500 text-xs">
                      Verify your summary before opening WhatsApp.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D8AA55]">4 of 4</span>
                </div>

                {/* Promo Code Box */}
                <div className="p-4 bg-[#FFF9ED] border border-[#D8AA55]/30 rounded-2xl space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Apply Promo Coupon (Static Calculator)
                  </label>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="e.g. WELCOME10, SAVE150"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-800 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#D8AA55]"
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
                        className="px-5 py-2.5 bg-[#5B071B] hover:bg-[#3A0612] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-sm"
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
                        className="text-[11px] font-mono border border-[#D8AA55]/50 px-2 py-0.5 rounded bg-white text-[#5B071B] font-semibold cursor-pointer"
                      >
                        {pc.code}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Final Estimated Bill Summary */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                    Appointment Request Summary
                  </span>
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Client: <strong>{name}</strong> ({mobile})</span>
                    <span>{area}</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Service: <strong>{selectedServiceId === 'custom-package' ? customPackageName : currentService?.name}</strong></span>
                    <span>{date} @ {timeSlot}</span>
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
                    <span className="font-mono text-2xl font-bold text-[#5B071B] tabular-nums">
                      ₹{estimatedTotal}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 italic pt-1">
                    * Final confirmation and payment (Cash / UPI) occur after service completion.
                  </p>
                </div>
              </div>
            )}

            {/* Step Navigation Actions */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-3 border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
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
                  className="px-7 py-3 bg-[#5B071B] hover:bg-[#3A0612] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F1D79A]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Continue on WhatsApp</span>
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
