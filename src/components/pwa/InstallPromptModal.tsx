import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sparkles, Smartphone, Download } from 'lucide-react';

interface InstallPromptModalProps {
  isOpen: boolean;
  onInstall: () => void;
  onDismiss: () => void;
}

export const InstallPromptModal: React.FC<InstallPromptModalProps> = ({
  isOpen,
  onInstall,
  onDismiss,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard accessibility (Escape key closes dialog)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Focus the primary install button when dialog opens
    setTimeout(() => {
      primaryButtonRef.current?.focus();
    }, 150);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onDismiss]);

  const benefits = [
    { text: 'Quick 1-tap home screen access', icon: '✦' },
    { text: 'App-like mobile experience', icon: '✦' },
    { text: 'Fast, smooth appointment booking', icon: '✦' },
    { text: 'Direct WhatsApp booking with Himanshi Patel', icon: '✦' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-title"
          aria-describedby="pwa-install-desc"
        >
          {/* Backdrop with subtle blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={onDismiss}
            className="fixed inset-0 bg-[#160206]/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal / Bottom Sheet Box */}
          <motion.div
            ref={modalRef}
            initial={{ y: 90, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1], // Luxury cubic bezier curve
            }}
            className="relative w-full max-w-md bg-gradient-to-b from-[#3D0513] via-[#4A0718] to-[#2B030D] text-white rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.65)] border-2 border-[#D5AA63]/50 overflow-hidden my-auto"
          >
            {/* Top Gold Corner Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#D5AA63]/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-radial from-[#D5AA63]/15 via-transparent to-transparent pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Close install prompt"
              className="absolute top-4 right-4 p-2 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* App Icon & Branding */}
            <div className="flex flex-col items-center text-center pt-2">
              <div className="relative mb-3.5 group">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl border-2 border-[#D5AA63] ring-4 ring-[#D5AA63]/25 bg-[#4A0718]">
                  <img
                    src="/pwa-192x192.png"
                    alt="Hiyupiyu App Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md border-2 border-[#3D0513]">
                  <Sparkles className="w-3 h-3 text-[#E9CB8A]" />
                </div>
              </div>

              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D5AA63] font-bold">
                Android App Experience
              </span>
              <h3
                id="pwa-install-title"
                className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1"
              >
                Install Hiyupiyu
              </h3>
              <p
                id="pwa-install-desc"
                className="text-stone-200/90 text-xs sm:text-sm mt-1.5 max-w-xs font-medium"
              >
                Your beauty care, always one tap away. Enjoy a faster, app-like booking experience.
              </p>
            </div>

            {/* Benefits List */}
            <div className="mt-5 pt-4 border-t border-[#D5AA63]/25 space-y-2.5">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-stone-200">
                  <div className="w-5 h-5 rounded-full bg-[#D5AA63]/20 text-[#E9CB8A] flex items-center justify-center shrink-0 border border-[#D5AA63]/40">
                    <Check className="w-3 h-3 text-[#E9CB8A]" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 space-y-2.5">
              <button
                ref={primaryButtonRef}
                type="button"
                onClick={onInstall}
                className="w-full py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-[#241316] bg-gradient-to-r from-[#D5AA63] via-[#E9CB8A] to-[#D5AA63] hover:brightness-110 shadow-[0_6px_20px_rgba(213,170,99,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.01] active:scale-98"
              >
                <Download className="w-4 h-4 text-[#241316]" />
                <span>Install App</span>
              </button>

              <button
                type="button"
                onClick={onDismiss}
                className="w-full py-2.5 text-xs text-stone-400 hover:text-stone-200 font-medium transition-colors cursor-pointer"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
